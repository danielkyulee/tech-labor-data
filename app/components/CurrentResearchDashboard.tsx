"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { datasetPath } from "../data/catalog";

type Cell = string | number | boolean | null;
type DatasetPayload = { columns: string[]; rows: Cell[][] };
type DataRow = Record<string, Cell>;

const stages = ["acquire", "interpret", "decide", "act"] as const;

type SortColumn =
  | "overall_ai_capability_rating"
  | "product_with_highest_autonomy_rating"
  | "gap_between_highest_and_capability"
  | "average_autonomy_all_products"
  | "gap_between_average_and_capability"
  | "median_autonomy_all_products"
  | "gap_between_median_and_capability"
  | "total_products"
  | "employment_count"
  | "median_wage";
type SortDirection = "ascending" | "descending";

function asRecords(payload: DatasetPayload): DataRow[] {
  return payload.rows.map((row) =>
    Object.fromEntries(payload.columns.map((column, index) => [column, row[index] ?? ""])),
  );
}

function text(value: Cell | undefined) {
  return String(value ?? "");
}

function number(value: Cell | undefined): number | null {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function score(value: number | null, digits = 2) {
  if (value === null) return "NA";
  return Number(value.toFixed(digits)).toString();
}

function metric(value: Cell | undefined, digits = 3) {
  const parsed = number(value);
  return parsed === null ? "—" : score(parsed, digits);
}

function wholeNumber(value: number | null) {
  return value === null ? "—" : Math.round(value).toLocaleString("en-US");
}

function annualWage(value: number | null) {
  return value === null
    ? "—"
    : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function educationLabel(value: string) {
  if (value.startsWith("High School Diploma")) return "High school diploma";
  if (value.startsWith("Associate's Degree")) return "Associate's degree";
  if (value.startsWith("Post-Secondary Certificate")) return "Post-secondary certificate";
  if (value.startsWith("Post-Baccalaureate Certificate")) return "Post-baccalaureate certificate";
  if (value.startsWith("Post-Master's Certificate")) return "Post-master's certificate";
  if (value.startsWith("First Professional Degree")) return "First professional degree";
  return value;
}

function roleKey(row: DataRow) {
  return `${text(row.occupation_soc_code)}::${text(row.job_role_name)}`;
}

function CapabilityTable({ rows, fullDatabase = false }: { rows: DataRow[]; fullDatabase?: boolean }) {
  const defaultMinimumProducts = fullDatabase ? "" : "5";
  const defaultMinimumEmployment = fullDatabase ? "" : "50000";
  const [query, setQuery] = useState("");
  const [minimumCapability, setMinimumCapability] = useState("");
  const [minimumProducts, setMinimumProducts] = useState(defaultMinimumProducts);
  const [minimumEmployment, setMinimumEmployment] = useState(defaultMinimumEmployment);
  const [education, setEducation] = useState("");
  const [page, setPage] = useState(0);
  const [sortColumn, setSortColumn] = useState<SortColumn>("overall_ai_capability_rating");
  const [sortDirection, setSortDirection] = useState<SortDirection>("descending");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const deferredQuery = useDeferredValue(query);
  const sortedRows = useMemo(() => [...rows]
    .filter((row) => number(row.overall_ai_capability_rating) !== null)
    .sort((first, second) => {
      const firstValue = number(first[sortColumn]);
      const secondValue = number(second[sortColumn]);
      if (firstValue === null && secondValue !== null) return 1;
      if (firstValue !== null && secondValue === null) return -1;
      if (firstValue !== null && secondValue !== null && firstValue !== secondValue) {
        return sortDirection === "descending" ? secondValue - firstValue : firstValue - secondValue;
      }
      return text(first.job_role_name).localeCompare(text(second.job_role_name));
    }), [rows, sortColumn, sortDirection]);
  const educationOptions = useMemo(() => [...new Set(rows
    .map((row) => text(row.education_most_common_level))
    .filter(Boolean))]
    .sort((first, second) => educationLabel(first).localeCompare(educationLabel(second))), [rows]);
  const needle = deferredQuery.trim().toLowerCase();
  const visibleRows = sortedRows.filter((row) => {
    const matchesText = !needle || `${text(row.job_role_name)} ${text(row.occupation_name)} ${text(row.industry_group)}`.toLowerCase().includes(needle);
    const capability = number(row.overall_ai_capability_rating);
    const products = number(row.total_products);
    const employment = number(row.employment_count);
    return matchesText
      && (!minimumCapability || (capability !== null && capability >= Number(minimumCapability)))
      && (!minimumProducts || (products !== null && products >= Number(minimumProducts)))
      && (!minimumEmployment || (employment !== null && employment >= Number(minimumEmployment)))
      && (!education || text(row.education_most_common_level) === education);
  });
  const filtersChanged = Boolean(
    query
      || minimumCapability
      || education
      || minimumProducts !== defaultMinimumProducts
      || minimumEmployment !== defaultMinimumEmployment,
  );
  const pageSize = 100;
  const pageCount = Math.max(1, Math.ceil(visibleRows.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const renderedRows = fullDatabase
    ? visibleRows.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    : visibleRows;

  function resetFilters() {
    setQuery("");
    setMinimumCapability("");
    setMinimumProducts(defaultMinimumProducts);
    setMinimumEmployment(defaultMinimumEmployment);
    setEducation("");
    setPage(0);
    requestAnimationFrame(() => searchRef.current?.focus());
  }

  function chooseSort(column: SortColumn) {
    if (column === sortColumn) {
      setSortDirection((current) => current === "descending" ? "ascending" : "descending");
    } else {
      setSortColumn(column);
      setSortDirection("descending");
    }
    setPage(0);
  }

  function sortableHeader(column: SortColumn, className = "") {
    const active = sortColumn === column;
    return (
      <th
        scope="col"
        aria-sort={active ? sortDirection : "none"}
        className={`capability-table__sortable ${className}`.trim()}
      >
        <button type="button" onClick={() => chooseSort(column)}>
          <span>{column}</span>
          <b aria-hidden="true">{active ? (sortDirection === "descending" ? "↓" : "↑") : "↕"}</b>
        </button>
      </th>
    );
  }

  return (
    <>
      <div className="capability-table-toolbar capability-table-toolbar--filters">
        <label className="capability-filter capability-filter--search" htmlFor={`capability-role-search-${fullDatabase ? "full" : "home"}`}>
          <span>Find a job role</span>
          <input
            id={`capability-role-search-${fullDatabase ? "full" : "home"}`}
            ref={searchRef}
            value={query}
            onChange={(event) => { setQuery(event.target.value); setPage(0); }}
            placeholder="Search roles or occupations"
            autoComplete="off"
          />
        </label>
        <label className="capability-filter">
          <span>Minimum capability</span>
          <select value={minimumCapability} onChange={(event) => { setMinimumCapability(event.target.value); setPage(0); }}>
            <option value="">Any rating</option>
            <option value="1">1 or higher</option>
            <option value="2">2 or higher</option>
            <option value="3">3 or higher</option>
            <option value="4">4</option>
          </select>
        </label>
        <label className="capability-filter">
          <span>Minimum products</span>
          <select value={minimumProducts} onChange={(event) => { setMinimumProducts(event.target.value); setPage(0); }}>
            <option value="">Any number</option>
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
        <label className="capability-filter">
          <span>Minimum employment</span>
          <select value={minimumEmployment} onChange={(event) => { setMinimumEmployment(event.target.value); setPage(0); }}>
            <option value="">Any or unavailable</option>
            <option value="50000">50,000</option>
            <option value="100000">100,000</option>
            <option value="250000">250,000</option>
            <option value="500000">500,000</option>
            <option value="1000000">1,000,000</option>
          </select>
        </label>
        <label className="capability-filter">
          <span>Most common education</span>
          <select value={education} onChange={(event) => { setEducation(event.target.value); setPage(0); }}>
            <option value="">Any level</option>
            {educationOptions.map((value) => <option key={value} value={value}>{educationLabel(value)}</option>)}
          </select>
        </label>
        <div className="capability-table-toolbar__status" role="status" aria-live="polite">
          <span>{visibleRows.length.toLocaleString()} of {rows.length.toLocaleString()} roles</span>
          {filtersChanged && (
            <button type="button" onClick={resetFilters}>Reset filters</button>
          )}
        </div>
      </div>
      <div
        className="capability-table-wrap"
        role="region"
        aria-label="AI capability ratings by job role"
        tabIndex={0}
      >
        <table className="capability-table">
          <caption>AI technical capability, product autonomy, gaps, occupation characteristics, AIDA scopes, ratings, and workshare weights by job role</caption>
          <thead>
            <tr>
              <th scope="col">job_role_name</th>
              <th scope="col" className="capability-table__industry">industry_group</th>
              {sortableHeader("overall_ai_capability_rating", "capability-table__overall capability-table__primary")}
              {sortableHeader("product_with_highest_autonomy_rating", "capability-table__product capability-table__primary")}
              {sortableHeader("gap_between_highest_and_capability", "capability-table__gap capability-table__primary")}
              {sortableHeader("average_autonomy_all_products", "capability-table__product")}
              {sortableHeader("gap_between_average_and_capability", "capability-table__gap")}
              {sortableHeader("median_autonomy_all_products", "capability-table__product")}
              {sortableHeader("gap_between_median_and_capability", "capability-table__gap")}
              {sortableHeader("total_products", "capability-table__product-count")}
              {sortableHeader("employment_count", "capability-table__labor")}
              {sortableHeader("median_wage", "capability-table__labor")}
              <th scope="col" className="capability-table__education">education_most_common_level</th>
              {stages.map((stage) => <th className="capability-table__scope" key={`${stage}-scope`} scope="col">{stage}_scope</th>)}
              {stages.map((stage) => <th className="capability-table__stage-number" key={`${stage}-rating`} scope="col">{stage}_rating</th>)}
              {stages.map((stage) => <th className="capability-table__stage-number" key={`${stage}-weight`} scope="col">{stage}_weight</th>)}
            </tr>
          </thead>
          <tbody>
            {renderedRows.map((row) => (
              <tr key={roleKey(row)}>
                <th scope="row">{text(row.job_role_name)}</th>
                <td className="capability-table__industry">{text(row.industry_group)}</td>
                <td className="capability-table__overall capability-table__primary">{score(number(row.overall_ai_capability_rating), 3)}</td>
                <td className="capability-table__product capability-table__primary">{metric(row.product_with_highest_autonomy_rating)}</td>
                <td className="capability-table__gap capability-table__primary">{metric(row.gap_between_highest_and_capability)}</td>
                <td className="capability-table__product">{metric(row.average_autonomy_all_products)}</td>
                <td className="capability-table__gap">{metric(row.gap_between_average_and_capability)}</td>
                <td className="capability-table__product">{metric(row.median_autonomy_all_products)}</td>
                <td className="capability-table__gap">{metric(row.gap_between_median_and_capability)}</td>
                <td className="capability-table__product-count">{wholeNumber(number(row.total_products))}</td>
                <td className="capability-table__labor">{wholeNumber(number(row.employment_count))}</td>
                <td className="capability-table__labor">{annualWage(number(row.median_wage))}</td>
                <td className="capability-table__education">{text(row.education_most_common_level) || "—"}</td>
                {stages.map((stage) => <td className="capability-table__scope" key={`${stage}-scope`}>{text(row[`${stage}_scope`]) || "—"}</td>)}
                {stages.map((stage) => <td className="capability-table__stage-number" key={`${stage}-rating`}>{score(number(row[`${stage}_rating`]), 2)}</td>)}
                {stages.map((stage) => <td className="capability-table__stage-number" key={`${stage}-weight`}>{score(number(row[`${stage}_weight`]), 0)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        {visibleRows.length === 0 && <p className="capability-table-empty">No job roles match these filters.</p>}
      </div>
      {fullDatabase && pageCount > 1 && (
        <nav className="capability-table-pagination" aria-label="Capability table pages">
          <button type="button" disabled={currentPage === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>Previous</button>
          <span>Page {currentPage + 1} of {pageCount}</span>
          <button type="button" disabled={currentPage === pageCount - 1} onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}>Next</button>
        </nav>
      )}
    </>
  );
}

function IndustryGroupTable({ rows }: { rows: DataRow[] }) {
  const sortedRows = useMemo(
    () => [...rows].sort((first, second) =>
      (number(second.overall_ai_capability_rating) ?? -1) - (number(first.overall_ai_capability_rating) ?? -1)),
    [rows],
  );

  return (
    <article className="comparison-card industry-summary-card">
      <header className="comparison-card__header comparison-card__header--simple">
        <h2>Industry Group Summary</h2>
      </header>
      <div className="industry-summary-table-wrap" role="region" aria-label="AI capability and product autonomy by industry group" tabIndex={0}>
        <table className="industry-summary-table">
          <caption>AI technical capability and product autonomy aggregated by industry group</caption>
          <thead>
            <tr>
              <th scope="col">Industry Group</th>
              <th scope="col">Average Technical Capability</th>
              <th scope="col">Average Product Autonomy Design</th>
              <th scope="col">Average Gap</th>
              <th scope="col">Products</th>
              <th scope="col">Roles Covered</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => (
              <tr key={text(row.industry_group)}>
                <th scope="row">{text(row.industry_group)}</th>
                <td>{metric(row.overall_ai_capability_rating)}</td>
                <td>{metric(row.average_autonomy_all_products)}</td>
                <td>{metric(row.gap_average_technical_capability)}</td>
                <td>{wholeNumber(number(row.total_products))}</td>
                <td>{wholeNumber(number(row.job_roles_with_products))} / {wholeNumber(number(row.total_job_roles))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="comparison-card__note">
        Industry groups describe the primary occupational market for each job role; they are not employer-industry classifications.
      </p>
    </article>
  );
}

function ResearchCharts({ capabilityRows, industryRows }: { capabilityRows: DataRow[]; industryRows: DataRow[] }) {
  return (
    <div className="research-comparison">
      <article className="comparison-card">
        <header className="comparison-card__header comparison-card__header--simple">
          <h2>Understanding the Gap Between Technical AI Capability and What AI Product is Designed to Do.</h2>
          <div className="metric-guide">
            <p>In the table below, we highlight three metrics:</p>
            <ul>
              <li><code>overall_ai_capability_rating</code>: The work-weighted estimate of how autonomously current AI could perform the job role across Acquire, Interpret, Decide, and Act.</li>
              <li><code>product_with_highest_autonomy_rating</code>: The highest work-weighted autonomy rating among the AI products mapped to the job role, based on what each product is designed and presented to do.</li>
              <li><code>gap_between_highest_and_capability</code>: Technical AI capability minus the highest product-autonomy rating. A positive value means technical capability is ahead of product design.</li>
            </ul>
            <p>Capability and product autonomy use a scale from 0 to 4. The gap is the difference between them and can range from −4 to 4.</p>
            <ul>
              <li><strong>0:</strong> AI cannot contribute meaningfully.</li>
              <li><strong>1:</strong> AI provides narrow assistance.</li>
              <li><strong>2:</strong> AI contributes substantially, but a human materially completes the work.</li>
              <li><strong>3:</strong> AI completes the work, but routine substantive human review or correction remains necessary.</li>
              <li><strong>4:</strong> AI completes the work at acceptable performance without routine substantive human intervention.</li>
            </ul>
          </div>
        </header>
        <CapabilityTable rows={capabilityRows} />
        <div className="comparison-card__footer">
          <p className="comparison-card__note">Gap = technical capability minus product autonomy; a positive value means capability is ahead. Product statistics are blank when no matched product was found.</p>
          <Link href="/explore">Filter this table →</Link>
        </div>
      </article>
      <IndustryGroupTable rows={industryRows} />
    </div>
  );
}

export function CurrentResearchDashboard() {
  const [capabilityRows, setCapabilityRows] = useState<DataRow[]>([]);
  const [industryRows, setIndustryRows] = useState<DataRow[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    Promise.all([
      fetch(datasetPath("ai_capability_aggregate", "json")),
      fetch(datasetPath("industry_group_autonomy_aggregate", "json")),
    ])
      .then(async ([capabilityResponse, industryResponse]) => {
        if (!capabilityResponse.ok || !industryResponse.ok) throw new Error("The current data could not be loaded.");
        return Promise.all([
          capabilityResponse.json() as Promise<DatasetPayload>,
          industryResponse.json() as Promise<DatasetPayload>,
        ]);
      })
      .then(([capabilityPayload, industryPayload]) => {
        setCapabilityRows(asRecords(capabilityPayload));
        setIndustryRows(asRecords(industryPayload));
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <div className="dashboard-state">Loading the current data…</div>;
  if (status === "error") return <div className="dashboard-state dashboard-state--error">The current data could not be loaded.</div>;

  return <ResearchCharts capabilityRows={capabilityRows} industryRows={industryRows} />;
}

export function FullCapabilityDatabase() {
  const [capabilityRows, setCapabilityRows] = useState<DataRow[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetch(datasetPath("ai_capability_aggregate", "json"))
      .then(async (response) => {
        if (!response.ok) throw new Error("The current data could not be loaded.");
        return response.json() as Promise<DatasetPayload>;
      })
      .then((payload) => {
        setCapabilityRows(asRecords(payload));
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <div className="dashboard-state">Loading the current data…</div>;
  if (status === "error") return <div className="dashboard-state dashboard-state--error">The current data could not be loaded.</div>;

  return <CapabilityTable rows={capabilityRows} fullDatabase />;
}
