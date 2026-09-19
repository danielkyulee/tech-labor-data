import { CurrentResearchDashboard } from "./components/CurrentResearchDashboard";
import { Footer } from "./components/Footer";
import { SiteHeader } from "./components/SiteHeader";

const insights = [
  {
    title: "AI products generally promise much less autonomy than estimated technical capability.",
    copy: <>Across 1,137 job roles, the median technical capability is 2.50 while the median autonomy rating for AI products is 1.80. Furthermore, capability exceeds the highest product rating for about 99% of roles. This was somewhat of a surprise as we expected AI products to overpromise on capability.</>,
  },
  {
    title: "Technical capability matters, but most of the differences in what companies build appear to be associated with other factors.",
    copy: <>Capability and average product autonomy have a correlation of approximately 0.37.</>,
  },
  {
    title: "Product development appears more connected to market size than technical capability.",
    copy: <></>,
  },
  {
    title: "Software development may illustrate what happens when technical capability, market demand, and digital infrastructure align.",
    copy: <></>,
  },
  {
    title: "Customer service may be an early example of convergence.",
    copy: <>CS has a technical capability rating of 4.0 and there are products that also have a 4.0 autonomy rating.</>,
  },
  {
    title: "There is a bigger gap among manufacturing production roles (2.70 technical capability vs. 1.34 average autonomy rating which is a gap of 1.36) compared to engineering-related work (gap is only 0.94).",
    copy: <>It would be interesting to explore deeper why this might be.</>,
  },
  {
    title: "The largest manufacturing bottleneck might be information acquisition, not physical action.",
    copy: <>Production Acquire capability averages 3.47, but products average only 1.26; this is a gap of 2.21 which is very significant. In contrast, the Act capability gap is only 1.13. (i.e. a robot that picks defective products off a conveyor belt. Acquire is to reliably see every product and detect defects. Act is picking it up). This might suggest that sensors, legacy machinery, inaccessible production data, and contextual knowledge may block autonomy before physical execution becomes relevant.</>,
  },
  {
    title: "Some production roles appear to be major unexplored opportunities.",
    copy: <>For example, Packaging and Filling Machine Operators have a technical capability of 3.03 but a highest product rating of 0.96. It would be interesting to understand why? Possible there is also a measurement problem.</>,
  },
  {
    title: "Manufacturing seems to have the biggest gap in product design and AI capability.",
    copy: <>Understanding why might unlock ideas on how to optimize a country’s manufacturing output.</>,
  },
  {
    title: "Product development is heavily concentrated as IT and tech platforms contain almost 20% of product mappings but only 6% of job roles.",
    copy: <>In fact, Software developers alone account for almost 14% of all mappings.</>,
  },
  {
    title: "More products do not necessarily correlate to highest autonomy design.",
    copy: <>Product count and average product autonomy only have a weak correlation.</>,
  },
  {
    title: "Construction has the lowest average product autonomy (1.15) and the second largest gap (1.21) only behind manufacturing.",
    copy: <>This might indicate the difficulty in automating physical infrastructure, especially given fragmented worksites and integration requirements.</>,
  },
];

const researchQuestions = [
  "How to make manufacturing more effective (with AI) while also keeping jobs domestic and not losing them.",
  "Why do vendors design AI to replace workers in some occupations but assist workers in others?",
  "Why does manufacturing have large product coverage but is relatively low on product autonomy design? Also, why does it have the largest gap?",
  "Why is the manufacturing Acquire gap larger than the Act gap?",
  "Why does it seem that AI products seem more successful if targeted towards engineers than production workers?",
  "When full autonomy is difficult, where do vendors place the human?",
  "How do product buyers influence autonomy?",
  "How do legal or union regulations influence autonomy?",
  "Do business models affect whether products replace or assist?",
  "Does a larger product ecosystem genuinely move an occupation toward autonomy?",
  "Can product autonomy predict labor-market change better than technical capability alone?",
  "Do comparable capabilities produce different products across countries? If so, why?",
  "Are job roles with high AI capability and low product coverage opportunities for startups? Or are there structural barriers and constraints that are limiting them?",
];

const implications = [
  "More informed policy and regulations",
  "Better labor market forecasting",
  "Improved manufacturing investment decisions",
  "Identification of startup opportunities",
  "International comparisons",
  "A possible early-warning system for the labor market",
  "More targeted workforce training",
  "Better product design",
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="compact-hero">
          <div className="compact-hero__copy">
            <h1>Goal of Research Group</h1>
            <p className="compact-hero__motivation">
              To explore important questions on the impact of emerging technology (like AI) on labor markets through data and analysis with the goal of encouraging technological progress while ensuring progress benefits society as a whole.
            </p>
          </div>
        </section>

        <section className="charts-shell" id="charts">
          <CurrentResearchDashboard />
        </section>

        <section className="research-analysis" aria-labelledby="analysis-heading">
          <header className="research-analysis__header">
            <h2 id="analysis-heading">Insights from the data</h2>
            <p>These findings are intended to identify patterns and questions for further research. They are not yet causal conclusions.</p>
          </header>

          <ul className="analysis-bullet-list analysis-bullet-list--insights">
            {insights.map((insight) => (
              <li key={insight.title}>
                <strong>{insight.title}</strong> {insight.copy}
              </li>
            ))}
          </ul>

          <section className="analysis-subsection analysis-subsection--questions" aria-labelledby="questions-heading">
            <h2 id="questions-heading">Interesting Research Questions</h2>
            <ol className="analysis-numbered-list">
              {researchQuestions.map((question) => <li key={question}>{question}</li>)}
            </ol>
          </section>

          <section className="analysis-subsection" aria-labelledby="implications-heading">
            <h2 id="implications-heading">Potential Implications of this Research</h2>
            <ul className="analysis-bullet-list">
              {implications.map((implication) => <li key={implication}>{implication}</li>)}
            </ul>
          </section>

          <section className="analysis-subsection analysis-subsection--next" aria-labelledby="next-steps-heading">
            <h2 id="next-steps-heading">Next Steps</h2>
            <ol className="analysis-numbered-list">
              <li>Improve quality of dataset by moving beyond synthetic surveys and being more thorough product research (crunchbase, pitchbooks, etc.)</li>
              <li>Identify most pressing research questions</li>
              <li>Influence the future of work by balancing AI progress with overall benefits to society.</li>
            </ol>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
