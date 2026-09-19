import { Footer } from "../components/Footer";
import { SiteHeader } from "../components/SiteHeader";
import { release } from "../data/catalog";

const ratingScale = [
  ["0", "AI cannot contribute meaningfully."],
  ["1", "AI provides narrow assistance."],
  ["2", "AI contributes substantially, but a person materially completes the stage."],
  ["3", "AI completes the stage, but routine substantive human review remains technically necessary."],
  ["4", "AI completes the stage at acceptable performance without routine substantive human intervention."],
];

const limitations = [
  ["Synthetic capability ratings", "The current capability scores come from isolated LLM survey responses, not human experts. They are useful exploratory estimates and need validation with independent human AI and engineering experts."],
  ["Role and AIDA definitions", "Job roles, stage scopes, and workshare weights were produced through a structured LLM process using O*NET source data. They still require systematic human review and sensitivity testing."],
  ["Technical possibility, not deployment", "Capability ratings intentionally ignore cost, product availability, regulation, and development time. They estimate whether a material new AI advance is needed, which is necessarily a judgment."],
  ["Product promises, not performance", "Product ratings describe documented intended functionality. They do not show that the product is reliable, widely adopted, cost-effective, or successful in ordinary use."],
  ["Product coverage", `The role-first search found ${release.distinctProducts.toLocaleString()} distinct products and coverage for ${release.rolesWithProducts.toLocaleString()} stable job roles. Public, accessible, English-language sources are easier to find, so the inventory cannot guarantee that every qualifying product was captured.`],
  ["Two product-collection phases", "The product table combines 3,705 records from the earlier inventory with 4,796 records from the full-occupation expansion. The earlier records retain their original coding and have not yet received the expansion phase’s uniform re-review, so the current product distribution is not a homogeneous validated estimate."],
  ["No product found", `${release.rolesWithoutQualifyingProducts} stable roles currently have no qualifying product. This means none was found under the search process—not that no product exists.`],
  ["Roles still under review", `${release.reviewFlaggedRoles} residual “All Other” roles remain flagged because their boundaries are not yet stable. They are downloadable but excluded from the capability chart.`],
  ["Overall ratings", "The weighted rating is a 0–4 index, not the percentage of a job automated or a prediction that the job will disappear. Employment effects also depend on adoption, demand, organizations, and how work is redesigned."],
  ["Description, not causation", "A difference between capability and product autonomy can identify cases to investigate. It cannot by itself show that law, liability, professional authority, market incentives, or another factor caused the difference."],
];

export default function MethodsPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell page-shell--inner methods-page">
        <header className="page-header page-header--narrow">
          <p className="eyebrow">Method</p>
          <h1>How the two ratings are constructed</h1>
          <p>The same job-role definition, AIDA scopes, workshare weights, and 0–4 scale anchor both measures.</p>
        </header>

        <div className="method-sections method-sections--current">
          <section>
            <span className="method-number">01</span>
            <div><h2>Define job roles</h2><p>O*NET occupations and tasks are divided into the smallest defensible set of common job roles. A separate role must be a plausible whole job, commonly hired separately, and meaningfully different work.</p></div>
          </section>
          <section>
            <span className="method-number">02</span>
            <div><h2>Define AIDA and weights</h2><p>Each role’s central work is described as Acquire, Interpret, Decide, and Act. The four weights estimate each stage’s share of ordinary human work effort and total 100.</p><dl className="definition-list"><div><dt>Acquire</dt><dd>Obtain or generate the inputs needed for the work.</dd></div><div><dt>Interpret</dt><dd>Determine what those inputs mean.</dd></div><div><dt>Decide</dt><dd>Select what should be concluded or done.</dd></div><div><dt>Act</dt><dd>Implement the choice or deliver the result.</dd></div></dl></div>
          </section>
          <section>
            <span className="method-number">03</span>
            <div><h2>Use a common 0–4 scale</h2><div className="rating-scale">{ratingScale.map(([rating, definition]) => <div key={rating}><strong>{rating}</strong><span>{definition}</span></div>)}</div></div>
          </section>
          <section>
            <span className="method-number">04</span>
            <div><h2>Estimate AI capability</h2><p>Ten isolated synthetic expert responses rate every applicable AIDA stage using different relevant AI/engineering profiles. They estimate the highest autonomy technically achievable with methods available on the assessment date, assuming the necessary engineering, integration, fine-tuning, and reasonably obtainable data preparation. Stage ratings are averaged, then combined using the role’s workshare weights.</p></div>
          </section>
          <section>
            <span className="method-number">05</span>
            <div><h2>Collect and rate products</h2><p>A role-first web search identifies AI products connected to each job role. Public product pages, documentation, announcements, and other attributable materials establish what each product is designed or promised to do. Each AIDA stage is rated separately. The website then creates a workshare-weighted summary index for comparison with capability; it is a derived display measure, not a separate product claim.</p></div>
          </section>
          <section>
            <span className="method-number">06</span>
            <div><h2>Keep the measures separate</h2><p>Capability estimates technical possibility. Product autonomy measures documented product intent, not effectiveness. The homepage compares both measures across all defined job roles. Reading them together can locate patterns worth explaining, but it does not by itself identify why a difference exists.</p><div className="formula-line"><span>overall rating</span><strong>=</strong><span>Σ(stage rating × stage workshare weight)</span></div></div>
          </section>
        </div>

        <section className="methods-limitations" id="limitations" aria-labelledby="limitations-heading">
          <header className="methods-limitations__header">
            <p className="eyebrow">Limitations</p>
            <h2 id="limitations-heading">What the current data can—and cannot—support</h2>
            <p>The database can reveal patterns and measurement problems. It is not yet a validated estimate of labor-market effects.</p>
          </header>
          <ul className="methods-limitations__list">
            {limitations.map(([title, description]) => (
              <li key={title}><strong>{title}:</strong> {description}</li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
