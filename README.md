# Tech and Labor Data Research Group

A public research site comparing estimated technical AI capability with the autonomy that AI products are designed to exercise across job roles and industries.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```bash
npm run build
```

## Data snapshot

The downloadable files are under `public/data/`. The dashboard uses a frozen data export and does not write to or query the live Google Sheets.

The local site includes:

- a concise research homepage
- an interactive job-role comparison table and industry summary
- per-table previews and CSV/JSON downloads
- methodology and limitations
- downloadable full protocol files
- a browser-only DuckDB SQL Lab
