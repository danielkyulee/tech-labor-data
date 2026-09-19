"use client";

import { useEffect, useRef, useState } from "react";
import type { AsyncDuckDB, AsyncDuckDBConnection, DuckDBBundles } from "@duckdb/duckdb-wasm";
import { datasets, datasetPath } from "../data/catalog";

const sampleQueries = {
  coverage: `SELECT
  occupation_name,
  COUNT(*) AS job_roles,
  ROUND(AVG(TRY_CAST(overall_ai_capability_rating AS DOUBLE)), 2) AS mean_capability
FROM ai_capability_aggregate
WHERE LOWER(review_flag) NOT IN ('true', '1')
GROUP BY occupation_name
ORDER BY mean_capability DESC;`,
  products: `SELECT
  occupation_name,
  COUNT(*) AS product_role_mappings,
  COUNT(DISTINCT company || '::' || product_id) AS distinct_products,
  ROUND(AVG(TRY_CAST(overall_product_autonomy_rating AS DOUBLE)), 2) AS mean_product_autonomy
FROM ai_products
GROUP BY occupation_name
ORDER BY distinct_products DESC;`,
  comparison: `WITH product_frontier AS (
  SELECT occupation_soc_code, job_role_name,
         MAX(TRY_CAST(overall_product_autonomy_rating AS DOUBLE)) AS highest_product_autonomy
  FROM ai_products
  GROUP BY occupation_soc_code, job_role_name
)
SELECT c.occupation_name, c.job_role_name,
       TRY_CAST(c.overall_ai_capability_rating AS DOUBLE) AS ai_capability,
       p.highest_product_autonomy,
       ROUND(TRY_CAST(c.overall_ai_capability_rating AS DOUBLE) - p.highest_product_autonomy, 2) AS difference
FROM ai_capability_aggregate c
JOIN product_frontier p USING (occupation_soc_code, job_role_name)
WHERE LOWER(c.review_flag) NOT IN ('true', '1')
ORDER BY difference DESC;`,
};

type ResultCell = string | number | boolean | null;
type ResultRow = Record<string, ResultCell>;

function safeValue(value: unknown): ResultCell {
  if (value === null || value === undefined) return null;
  if (typeof value === "bigint") return Number(value);
  if (value instanceof Date) return value.toISOString();
  if (["string", "number", "boolean"].includes(typeof value)) return value as ResultCell;
  return String(value);
}

function downloadResults(columns: string[], rows: ResultRow[]) {
  const escape = (value: ResultCell) => {
    const text = String(value ?? "").replace(/\r?\n/g, " ");
    return /[",]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const csv = [columns.join(","), ...rows.map((row) => columns.map((column) => escape(row[column])).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "query-results.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export function SqlWorkbench() {
  const connectionRef = useRef<AsyncDuckDBConnection | null>(null);
  const databaseRef = useRef<AsyncDuckDB | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "running" | "error">("loading");
  const [message, setMessage] = useState("Loading the local query engine and public tables…");
  const [query, setQuery] = useState(sampleQueries.coverage);
  const [columns, setColumns] = useState<string[]>([]);
  const [resultRows, setResultRows] = useState<ResultRow[]>([]);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function initialize() {
      try {
        const duckdb = await import("@duckdb/duckdb-wasm");
        const bundles: DuckDBBundles = duckdb.getJsDelivrBundles();
        const bundle = await duckdb.selectBundle(bundles);
        const workerUrl = URL.createObjectURL(new Blob([
          `importScripts(${JSON.stringify(bundle.mainWorker)});`,
        ], { type: "text/javascript" }));
        const worker = new Worker(workerUrl);
        const database = new duckdb.AsyncDuckDB(new duckdb.VoidLogger(), worker);
        await database.instantiate(bundle.mainModule, bundle.pthreadWorker);
        URL.revokeObjectURL(workerUrl);
        const connection = await database.connect();
        for (const dataset of datasets) {
          const filename = `${dataset.slug}.csv`;
          await database.registerFileURL(filename, `${window.location.origin}${datasetPath(dataset.slug, "csv")}`, duckdb.DuckDBDataProtocol.HTTP, false);
          await connection.query(`CREATE OR REPLACE VIEW "${dataset.slug}" AS SELECT * FROM read_csv_auto('${filename}', header = true, all_varchar = true, sample_size = -1);`);
        }
        if (cancelled) {
          await connection.close();
          await database.terminate();
          worker.terminate();
          return;
        }
        connectionRef.current = connection;
        databaseRef.current = database;
        workerRef.current = worker;
        setState("ready");
        setMessage(`${datasets.length} read-only public tables loaded in this browser.`);
      } catch (reason) {
        setState("error");
        setMessage(reason instanceof Error ? reason.message : "The SQL engine could not be started.");
      }
    }
    initialize();
    return () => {
      cancelled = true;
      const connection = connectionRef.current;
      const database = databaseRef.current;
      connectionRef.current = null;
      databaseRef.current = null;
      connection?.close();
      database?.terminate();
      workerRef.current?.terminate();
    };
  }, []);

  async function runQuery() {
    const connection = connectionRef.current;
    if (!connection) return;
    setState("running");
    setMessage("Running query…");
    try {
      const result = await connection.query(query);
      const resultColumns = result.schema.fields.map((field) => field.name);
      const allRows = result.toArray().map((row) => {
        const raw = row.toJSON() as Record<string, unknown>;
        return Object.fromEntries(resultColumns.map((column) => [column, safeValue(raw[column])])) as ResultRow;
      });
      setColumns(resultColumns);
      setResultRows(allRows.slice(0, 200));
      setTotalRows(allRows.length);
      setState("ready");
      setMessage(allRows.length > 200 ? `Query returned ${allRows.length.toLocaleString()} rows; the first 200 are shown.` : `Query returned ${allRows.length.toLocaleString()} row${allRows.length === 1 ? "" : "s"}.`);
    } catch (reason) {
      setState("error");
      setMessage(reason instanceof Error ? reason.message : "The query could not be completed.");
    }
  }

  return (
    <div className="sql-workbench">
      <aside className="sql-sidebar">
        <p className="eyebrow">Examples</p>
        <button type="button" onClick={() => setQuery(sampleQueries.coverage)}>Capability by occupation</button>
        <button type="button" onClick={() => setQuery(sampleQueries.products)}>Products by occupation</button>
        <button type="button" onClick={() => setQuery(sampleQueries.comparison)}>Capability and product frontier</button>
        <div className="sql-tables">
          <p className="eyebrow">Available tables</p>
          {datasets.map((dataset) => <code key={dataset.slug}>{dataset.slug}</code>)}
        </div>
      </aside>
      <div className="sql-main">
        <label className="sql-editor">
          <span>SQL query</span>
          <textarea value={query} onChange={(event) => setQuery(event.target.value)} spellCheck={false} />
        </label>
        <div className="sql-actions">
          <button className="button" type="button" onClick={runQuery} disabled={state === "loading" || state === "running"}>{state === "running" ? "Running…" : "Run query"}</button>
          {resultRows.length > 0 && <button className="button button--secondary" type="button" onClick={() => downloadResults(columns, resultRows)}>Download shown results</button>}
          <span className={`sql-status sql-status--${state}`}>{message}</span>
        </div>
        <div className="table-shell table-shell--sql">
          {columns.length ? (
            <table>
              <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
              <tbody>{resultRows.map((row, rowIndex) => <tr key={rowIndex}>{columns.map((column) => <td key={column}>{String(row[column] ?? "—")}</td>)}</tr>)}</tbody>
            </table>
          ) : <p className="empty-state">Run a query to see results. A maximum of 200 rows is displayed.</p>}
        </div>
        {totalRows > 200 && <p className="table-footnote">Showing 200 of {totalRows.toLocaleString()} returned rows.</p>}
      </div>
    </div>
  );
}
