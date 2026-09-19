import { Footer } from "../components/Footer";
import { SiteHeader } from "../components/SiteHeader";
import { SqlWorkbench } from "../components/SqlWorkbench";

export default function SqlPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell page-shell--inner page-shell--wide">
        <header className="page-header">
          <p className="eyebrow">SQL</p>
          <h1>Query the data</h1>
          <p>Queries run entirely in this browser and cannot alter the fixed data files or the working Google Sheet.</p>
        </header>
        <div className="notice notice--plain">The three table names are <code>ai_capability_aggregate</code>, <code>ai_products</code>, and <code>industry_group_autonomy_aggregate</code>. CSV fields begin as text; use <code>TRY_CAST</code> when calculating with ratings.</div>
        <SqlWorkbench />
      </main>
      <Footer />
    </>
  );
}
