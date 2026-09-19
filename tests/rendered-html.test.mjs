import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the current research homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Tech and Labor Data Research Group<\/title>/i);
  assert.match(html, /Goal of Research Group/);
  assert.match(html, /encouraging technological progress while ensuring progress benefits society as a whole/);
  assert.doesNotMatch(html, />Database</);
  assert.doesNotMatch(html, /What can AI do—and what are products built to do\?|Current data coverage/);
  assert.doesNotMatch(html, /Research proposal|Research preview|not publication-validated|codex-preview/i);
});

test("homepage uses the current role-level comparison dataset", async () => {
  const dashboard = await readFile(new URL("../app/components/CurrentResearchDashboard.tsx", import.meta.url), "utf8");
  const header = await readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8");
  const homepage = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(header, />Tech and Labor Data Research Group<\/span>/);
  assert.doesNotMatch(header, /D·L|Daniel Kyu Lee/);
  assert.doesNotMatch(homepage, /<p className="eyebrow">Tech and Labor Data Research Group<\/p>/);
  assert.match(dashboard, /ai_capability_aggregate\.json/);
  assert.match(dashboard, /industry_group_autonomy_aggregate\.json/);
  assert.doesNotMatch(dashboard, /fetch\("\/data\/current\/ai_products\.json"\)/);
  assert.match(dashboard, /overall_ai_capability_rating/);
  assert.match(dashboard, /<h2>Understanding the Gap Between Technical AI Capability and What AI Product is Designed to Do\.<\/h2>/);
  assert.match(dashboard, /The work-weighted estimate of how autonomously current AI could perform the job role/);
  assert.match(dashboard, /Technical AI capability minus the highest product-autonomy rating/);
  assert.match(dashboard, /The gap is the difference between them and can range from −4 to 4/);
  assert.match(dashboard, /capability-table__overall capability-table__primary/);
  assert.match(dashboard, /capability-table__product capability-table__primary/);
  assert.match(dashboard, /capability-table__gap capability-table__primary/);
  assert.match(dashboard, /job_role_name/);
  assert.match(dashboard, /industry_group/);
  assert.match(dashboard, /employment_count/);
  assert.match(dashboard, /median_wage/);
  assert.match(dashboard, /education_most_common_level/);
  assert.match(dashboard, /product_with_highest_autonomy_rating/);
  assert.match(dashboard, /gap_between_highest_and_capability/);
  assert.match(dashboard, /average_autonomy_all_products/);
  assert.match(dashboard, /gap_between_average_and_capability/);
  assert.match(dashboard, /median_autonomy_all_products/);
  assert.match(dashboard, /gap_between_median_and_capability/);
  assert.match(dashboard, /total_products/);
  assert.match(dashboard, /\{stage\}_scope/);
  assert.match(dashboard, /\{stage\}_weight/);
  assert.match(dashboard, /\{stage\}_rating/);
  assert.match(dashboard, /CapabilityTable rows=\{capabilityRows\}/);
  assert.match(dashboard, /Industry Group Summary/);
  assert.match(dashboard, /Average Technical Capability/);
  assert.match(dashboard, /Average Product Autonomy Design/);
  assert.doesNotMatch(dashboard, /Highest product autonomy|Each job role receives equal weight/);
  assert.match(dashboard, /fullDatabase \? "" : "5"/);
  assert.match(dashboard, /fullDatabase \? "" : "50000"/);
  assert.match(dashboard, /Filter this table/);
  assert.doesNotMatch(dashboard, /Select a metric header to sort/);
  assert.doesNotMatch(dashboard, /topEmploymentRows|200 largest measured BLS occupations/);
  assert.doesNotMatch(dashboard, /Each orange point|ProductPlot|Products mapped to/);
  assert.doesNotMatch(dashboard, /equality line|ComparisonPlot|Technical capability and product autonomy by job role/);
  assert.doesNotMatch(dashboard, /Main_GapAnalysis|canonical task/i);
});

test("ships all current downloadable tables and their previews", async () => {
  for (const name of ["ai_capability_aggregate", "ai_products", "industry_group_autonomy_aggregate"]) {
    await access(new URL(`../public/data/current/${name}.csv`, import.meta.url));
    await access(new URL(`../public/data/current/${name}.json`, import.meta.url));
    await access(new URL(`../public/data/current/${name}.preview.json`, import.meta.url));
  }
  await access(new URL("../public/data/current/release.json", import.meta.url));
});

test("capability data joins scopes and occupation measures without changing the rating unit", async () => {
  const payload = JSON.parse(await readFile(new URL("../public/data/current/ai_capability_aggregate.json", import.meta.url), "utf8"));
  const index = Object.fromEntries(payload.columns.map((column, columnIndex) => [column, columnIndex]));
  const requiredColumns = [
    "job_role_name",
    "industry_group",
    "overall_ai_capability_rating",
    "product_with_highest_autonomy_rating",
    "gap_between_highest_and_capability",
    "average_autonomy_all_products",
    "gap_between_average_and_capability",
    "median_autonomy_all_products",
    "gap_between_median_and_capability",
    "total_products",
    "employment_count",
    "median_wage",
    "education_most_common_level",
    "acquire_scope",
    "interpret_scope",
    "decide_scope",
    "act_scope",
    "acquire_rating",
    "interpret_rating",
    "decide_rating",
    "act_rating",
    "acquire_weight",
    "interpret_weight",
    "decide_weight",
    "act_weight",
  ];
  for (const column of requiredColumns) assert.ok(column in index, `missing ${column}`);
  assert.equal(payload.rows.length, 1216);
  const expectedIndustryGroups = [
    "Construction",
    "Finance, Insurance, Real Estate, & Leasing",
    "Government & Public Sector",
    "Healthcare & Social Assistance",
    "Information & Tech Platforms",
    "Leisure, Hospitality, & Other",
    "Manufacturing",
    "Professional & Business Services",
    "Transportation & Warehousing",
    "Wholesale & Retail Trade",
  ];
  assert.deepEqual([...new Set(payload.rows.map((row) => row[index.industry_group]))].sort(), expectedIndustryGroups);
  assert.equal(payload.rows.filter((row) => ["acquire_scope", "interpret_scope", "decide_scope", "act_scope"].some((column) => !row[index[column]])).length, 0);
  assert.equal(payload.rows.filter((row) => ["acquire_weight", "interpret_weight", "decide_weight", "act_weight"].reduce((sum, column) => sum + Number(row[index[column]]), 0) !== 100).length, 0);
  assert.equal(payload.rows.filter((row) => row[index.education_data_date] && !/^\d{4}-\d{2}-\d{2}$/.test(String(row[index.education_data_date]))).length, 0);

  const productCoveredRows = payload.rows.filter((row) => Number(row[index.total_products]) > 0);
  assert.equal(productCoveredRows.length, 1137);
  assert.equal(payload.rows.length - productCoveredRows.length, 79);
  assert.equal(productCoveredRows.reduce((sum, row) => sum + Number(row[index.total_products]), 0), 8501);
  for (const row of productCoveredRows) {
    for (const column of requiredColumns.slice(2, 8)) {
      assert.ok(Number.isFinite(Number(row[index[column]])), `invalid ${column}`);
    }
  }

  const topRows = payload.rows.filter((row) => row[index.top_200_employment_occupation] === true);
  assert.equal(topRows.length, 354);
  assert.equal(new Set(topRows.map((row) => row[index.bls_soc_code])).size, 200);
  assert.equal(Math.min(...topRows.map((row) => Number(row[index.employment_count]))), 167000);
});

test("industry aggregates use equal job-role weight and cover all ten groups", async () => {
  const capabilityPayload = JSON.parse(await readFile(new URL("../public/data/current/ai_capability_aggregate.json", import.meta.url), "utf8"));
  const capabilityIndex = Object.fromEntries(capabilityPayload.columns.map((column, columnIndex) => [column, columnIndex]));
  const industryPayload = JSON.parse(await readFile(new URL("../public/data/current/industry_group_autonomy_aggregate.json", import.meta.url), "utf8"));
  const industryIndex = Object.fromEntries(industryPayload.columns.map((column, columnIndex) => [column, columnIndex]));

  assert.equal(industryPayload.rows.length, 10);
  assert.equal(industryPayload.rows.reduce((sum, row) => sum + Number(row[industryIndex.total_job_roles]), 0), 1216);
  assert.equal(industryPayload.rows.reduce((sum, row) => sum + Number(row[industryIndex.job_roles_with_products]), 0), 1137);
  assert.equal(industryPayload.rows.reduce((sum, row) => sum + Number(row[industryIndex.total_products]), 0), 8501);

  for (const industryRow of industryPayload.rows) {
    const group = industryRow[industryIndex.industry_group];
    const coveredRoles = capabilityPayload.rows.filter((row) =>
      row[capabilityIndex.industry_group] === group && Number(row[capabilityIndex.total_products]) > 0);
    const meanCapability = coveredRoles.reduce((sum, row) => sum + Number(row[capabilityIndex.overall_ai_capability_rating]), 0) / coveredRoles.length;
    assert.ok(Math.abs(meanCapability - Number(industryRow[industryIndex.overall_ai_capability_rating])) < 0.001);
  }
});

test("server-renders the current method and data pages", async () => {
  const [methodResponse, dataResponse, databaseResponse] = await Promise.all([render("/methods"), render("/data"), render("/explore")]);
  assert.equal(methodResponse.status, 200);
  assert.equal(dataResponse.status, 200);
  assert.equal(databaseResponse.status, 200);
  assert.match(await methodResponse.text(), /Ten isolated synthetic expert responses/);
  const dataHtml = await dataResponse.text();
  assert.match(dataHtml, /AI Capability — Aggregate/);
  assert.match(dataHtml, /AI Products by Job Role/);
  const databaseHtml = await databaseResponse.text();
  assert.match(databaseHtml, /All job-role ratings/);
  assert.match(databaseHtml, /Search and filter every role/);
});
