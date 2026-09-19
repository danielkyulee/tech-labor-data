export type DatasetEntry = {
  slug: "ai_capability_aggregate" | "ai_products" | "industry_group_autonomy_aggregate";
  name: string;
  description: string;
  unit: string;
  rows: number;
  columns: number;
};

export const release = {
  id: "current",
  label: "Current dataset",
  snapshotDate: "29 August 2026",
  snapshotDateIso: "2026-08-29",
  occupations: 1016,
  jobRoles: 1216,
  industryGroups: 10,
  chartedJobRoles: 1161,
  reviewFlaggedRoles: 55,
  distinctProducts: 6566,
  companies: 5670,
  productRoleRecords: 8501,
  rolesWithProducts: 1137,
  rolesWithoutQualifyingProducts: 24,
  topEmploymentOccupations: 200,
  topEmploymentJobRoles: 354,
  topEmploymentCutoff: 167000,
} as const;

export const datasets: DatasetEntry[] = [
  {
    slug: "ai_capability_aggregate",
    name: "AI Capability — Aggregate",
    description: "Aggregate AIDA-stage and workshare-weighted AI capability ratings, product-autonomy comparisons, scopes, and linked occupation characteristics for every defined O*NET job role.",
    unit: "One job role within one O*NET occupation.",
    rows: 1216,
    columns: 39,
  },
  {
    slug: "ai_products",
    name: "AI Products by Job Role",
    description: "Documented AI products mapped to job roles, with AIDA-stage and workshare-weighted product-autonomy ratings.",
    unit: "One AI product mapped to one job role.",
    rows: 8501,
    columns: 25,
  },
  {
    slug: "industry_group_autonomy_aggregate",
    name: "Autonomy by Industry Group",
    description: "Equal-job-role aggregates of technical AI capability and AI product autonomy for the ten primary occupational-market groups.",
    unit: "One primary occupational-market group.",
    rows: 10,
    columns: 11,
  },
];

export const datasetPath = (slug: string, extension: "csv" | "json") =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/data/current/${slug}.${extension}`;

export const datasetPreviewPath = (slug: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/data/current/${slug}.preview.json`;
