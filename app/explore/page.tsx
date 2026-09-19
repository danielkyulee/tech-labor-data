import { FullCapabilityDatabase } from "../components/CurrentResearchDashboard";
import { Footer } from "../components/Footer";
import { SiteHeader } from "../components/SiteHeader";

export default function ExplorePage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell page-shell--inner page-shell--wide capability-database-page">
        <header className="page-header page-header--narrow">
          <p className="eyebrow">AI technical capability</p>
          <h1>All job-role ratings</h1>
          <p>Search and filter every role, then inspect its AIDA scopes, stage ratings, workshare weights, and linked occupation characteristics.</p>
        </header>
        <FullCapabilityDatabase />
        <p className="capability-database-note">Employment and wages are occupation-level U.S. BLS measures repeated for job roles mapped to that occupation. Education is the most common O*NET response. Missing source values are shown as dashes. The downloadable data identify 55 role definitions that retain a review flag.</p>
      </main>
      <Footer />
    </>
  );
}
