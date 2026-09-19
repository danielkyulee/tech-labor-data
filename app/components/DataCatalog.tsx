"use client";

import { useState } from "react";
import { DatasetEntry, datasets, datasetPath, datasetPreviewPath } from "../data/catalog";

type Cell = string | number | boolean | null;
type DatasetPayload = { columns: string[]; rows: Cell[][] };

function displayValue(value: Cell) {
  if (value === null || value === "") return "—";
  const result = String(value);
  return result.length > 180 ? `${result.slice(0, 179)}…` : result;
}

export function DataCatalog() {
  const [selected, setSelected] = useState<DatasetEntry>(datasets[0]);
  const [preview, setPreview] = useState<DatasetPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function openPreview(dataset: DatasetEntry) {
    setSelected(dataset);
    setPreview(null);
    setError("");
    setLoading(true);
    try {
      const response = await fetch(datasetPreviewPath(dataset.slug));
      if (!response.ok) throw new Error("Preview unavailable.");
      setPreview(await response.json() as DatasetPayload);
      requestAnimationFrame(() => document.getElementById("table-preview")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Preview unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="dataset-list dataset-list--current">
        {datasets.map((dataset) => (
          <article className="dataset-row" key={dataset.slug}>
            <div className="dataset-row__name">
              <h3>{dataset.name}</h3>
              <span>{dataset.rows.toLocaleString()} rows · {dataset.columns} columns</span>
            </div>
            <div className="dataset-row__description">
              <p>{dataset.description}</p>
              <p className="microcopy"><strong>One row:</strong> {dataset.unit}</p>
            </div>
            <div className="dataset-row__actions">
              <button type="button" className="text-button" onClick={() => openPreview(dataset)}>Preview</button>
              <a href={datasetPath(dataset.slug, "csv")} download>CSV</a>
              <a href={datasetPath(dataset.slug, "json")} download>JSON</a>
            </div>
          </article>
        ))}
      </div>

      <section className="data-preview" id="table-preview">
        <div className="section-rule-heading">
          <div>
            <p className="eyebrow">Table preview</p>
            <h2>{selected.name}</h2>
          </div>
          <span>First 25 rows</span>
        </div>
        {loading && <p className="dashboard-loading">Loading preview…</p>}
        {error && <div className="notice notice--error">{error}</div>}
        {preview && (
          <>
            <div className="table-shell table-shell--preview">
              <table>
                <thead><tr>{preview.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
                <tbody>
                  {preview.rows.slice(0, 25).map((row, rowIndex) => (
                    <tr key={rowIndex}>{preview.columns.map((column, columnIndex) => <td key={column}><span title={String(row[columnIndex] ?? "")}>{displayValue(row[columnIndex])}</span></td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="table-footnote">Showing {Math.min(25, preview.rows.length)} of {selected.rows.toLocaleString()} rows. Download the table for the complete data.</p>
          </>
        )}
        {!preview && !loading && !error && <p className="empty-state">Select “Preview” beside either table.</p>}
      </section>
    </>
  );
}
