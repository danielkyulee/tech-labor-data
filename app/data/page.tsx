import { DataCatalog } from "../components/DataCatalog";
import { Footer } from "../components/Footer";
import { SiteHeader } from "../components/SiteHeader";

export default function DataPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell page-shell--inner">
        <header className="page-header page-header--narrow">
          <p className="eyebrow">Data</p>
          <h1>Three tables behind the charts</h1>
          <p>Preview any table here or download the complete CSV or JSON file.</p>
        </header>
        <DataCatalog />
      </main>
      <Footer />
    </>
  );
}
