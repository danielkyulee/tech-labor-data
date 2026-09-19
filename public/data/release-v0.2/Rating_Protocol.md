# Rating Protocol

**Version:** 0.8  
**Date:** 2026-08-20  
**Status:** 80-occupation, 114-task initial-release protocol; non-blinded; publication validation in progress

Version 0.8 extends the unchanged rating rules to the frozen 80-occupation initial-release universe and records the four-field task-scope registry used for product-design coding. It does not change the 0–4 scale or the stagewise-frontier rule.

## Purpose

This protocol defines the first three parts of the measurement system:

1. the shared definitions used for AI capability, product design, and the gap between them;
2. the rules for rating Acquire, Interpret, Decide, and Act from 0 to 4, including `NA` and `IE`; and
3. the evidence rules for assigning those ratings and preserving the stage-specific `capability_evidence_system`, `capability_evidence_environment`, and `ai_technology_family` that support them.

It applies primarily to `OccupationTask_CapabilityAI` and `ProductTask_CapabilityDesign`. The full signoff-coding rules are in `Signoff_Protocol.md`, and product-universe construction and product-design evidence rules are in `Product_Universe_Protocol.md`.

The unit of assessment is a frozen `canonical_occupational_task`, not an individual O\*NET task statement. The initial release uses canonical task sets `pilot-1.0`, `expansion-1.1-reviewed`, and `expansion-2.1-initial-reviewed`, constructed under `Canonical_Task_Protocol.md` from O\*NET 30.3, with their corresponding task-scope versions. Scope timing and any retrospective corrections are recorded in release QA rather than silently treated as prospectively frozen.

The four stages adapt the framework of information acquisition, information analysis, decision and action selection, and action implementation developed by Parasuraman, Sheridan, and Wickens (2000). The 0–4 scale below is a project-specific simplification of levels of automation; it is not their original ten-level scale.

---

## 1. Shared measurement definitions

### 1.1 Canonical occupational task

A `canonical_occupational_task` is a researcher-constructed grouping of source O\*NET task statements that together describe one major occupational responsibility or recognizable work outcome. Each assessment references:

- `occupation_soc_code`;
- `canonical_task_id`; and
- `canonical_task_set_version`.

Its name, definition, occupational outcome, boundary, source-task mappings, construction evidence, and review status are stored in the canonical-task tables. The original O\*NET wording, task IDs, task type, ratings, and release metadata remain unchanged in `CT_Source_Crosswalk`; they are provenance and construction evidence rather than the rating unit.

The frozen canonical task sets are immutable. Any change to a task definition, boundary, membership, inclusion decision, or identifier that could affect a rating requires a new `canonical_task_set_version` and a documented decision log.

### 1.2 Task scope

`task_scope` is the operational definition of the frozen canonical task being assessed. It is stored in four fields that specify what Acquire, Interpret, Decide, and Act mean for that task:

- `acquire_scope`
- `interpret_scope`
- `decide_scope`
- `act_scope`

A valid `task_scope` must:

- preserve the substantive breadth, boundary, and occupational outcome of the canonical task;
- specify the required inputs, task-relevant interpretation, decision or selection, and final occupational action;
- describe the relevant operating setting and case population when these materially affect capability;
- use system-neutral language rather than describing a particular product;
- exclude legal, contractual, union, and organizational signoff requirements from the technical task definition; and
- use the same four scope values in every capability and product-design assessment that will be compared.

The four fields together receive a `task_scope_version`. Scope construction must begin from the frozen canonical definition, occupational outcome, boundary, and source crosswalk without considering available AI systems, products, desired ratings, or expected signoff. A scope version must be frozen before evidence search. Any substantive change to a scope requires a new `task_scope_version` and reassessment of every capability, product-design, signoff, and gap row that uses it.

Each field contains only its task-specific definition, without an `Acquire:`, `Interpret:`, `Decide:`, `Act:`, or leading `Task:` label. Do not store the scope as JSON. A combined display string may be generated from the four fields when needed, but it is not manually maintained as a second source of truth. If a stage is not applicable, write the reason in that field, for example `NA — no substantive selection is part of this task scope.`

The scope must not be rewritten after evidence search simply because the available system performs only a favorable subset. However, the capability score is a frontier ceiling rather than a coverage measure: a substantive, task-concordant operating configuration may establish a high score even when it does not cover every variation of the canonical task. The demonstrated operating conditions, exclusions, and coverage limits must be stated in the rationale. A toy example, trivial fragment, or post hoc selection of only cases the system happened to solve cannot establish the ceiling.

If a frozen canonical task still contains endpoints that cannot be rated coherently under one scope, the task set must be reopened under a new version before rating. The coder must not silently narrow the scope or omit a mapped source activity.

### 1.3 AI capability

AI capability is:

> For each applicable AIDA stage, the highest level of autonomy directly evidenced by any identifiable AI model, research prototype, system, or configuration, as of the assessment date, in a substantive operating configuration that falls within the fixed stage scope, using the inputs, tools, data access, and hardware actually demonstrated.

The four ratings form a **stagewise evidenced capability frontier**. Each stage is maximized separately across eligible evidence, so different systems may support Acquire, Interpret, Decide, and Act. The result is evidence-bounded: it is more accurate to describe each score as the highest directly evidenced capability found under the protocol than as the unknowable absolute maximum of all AI.

The resulting vector is an existence claim about the current technical frontier at each stage. It is not a claim that one system performs the entire task, that the selected systems interoperate, or that all four stage maxima can currently be realized in one end-to-end workflow.

Capability may be supported by:

- a peer-reviewed research study of a model, algorithm, prototype, or experimental configuration;
- a commercial product;
- a research prototype;
- an open-source system;
- a regulatory or government-evaluated system; or
- a laboratory configuration evaluated on the relevant stage endpoint.

A research model or prototype can support any rating, including 4, even when it has never been commercialized, deployed at scale, or connected to systems covering the other AIDA stages. Legal or organizational rules may also prevent an equivalent commercial product from exercising the demonstrated authority. The experimental conditions and limitations must remain explicit.

Commercial availability, customer adoption, deployment scale, market reach, regulatory clearance, and integration across AIDA stages are not eligibility requirements and do not independently affect a stage capability score.

Capability is not:

- what an unspecified AI or LLM could probably do;
- a prediction based on general model intelligence;
- a vendor promise without adequate capability evidence;
- a score created by hypothetically combining components within a stage when no evaluated configuration has demonstrated that stage at the claimed level; or
- ordinary deterministic automation unless AI contributes materially to the assessed stage.

### 1.4 Identifiable stage evidence and the stagewise frontier

Each stage score must be tied to an identifiable evaluated artifact: a model, algorithm, research prototype, commercial system, or configured combination. It may include retrieval, software tools, sensors, databases, interfaces, orchestration, reusable prompts or instructions, automated evaluators, and physical hardware. The workbook label `capability_evidence_system` is shorthand for this evaluated artifact; it does not imply a commercial product or an end-to-end system.

The artifact need only demonstrate the assessed stage. It does not need to cover or connect with the other AIDA stages. However, if the claimed stage result itself depends on several components, the evidence must evaluate the configuration that produced that result. Settings, permissions, tools, guardrails, and reusable harness changes are part of the assessed configuration when they materially affected the demonstration. Untested assumptions about how components would work together cannot establish a higher stage score.

Each candidate system is first assessed on the stages it directly demonstrates. The task-level frontier is then constructed by taking the highest valid score found for each stage. For example:

- Finch supports `2/2/1/2`;
- MBABench supports `1/2/2/2`; therefore
- the stagewise evidenced capability frontier is `2/2/2/2`.

This combines **stage-specific evidence**, not the systems themselves. The result does not assert that Finch and MBABench interoperate or that either one completes the full task.

The following remains prohibited:

- combining partial contributions from disconnected systems to claim a score within one stage that no evaluated configuration demonstrated;
- using evidence from an adjacent or materially narrower activity as if it directly covered the fixed stage scope;
- treating a stagewise composite as an evaluated end-to-end system, deployable product, or proof of whole-task automation; or
- omitting which system, configuration, conditions, and evidence support each stage maximum.

Every stage maximum must use the same `canonical_task_id`, `canonical_task_set_version`, `task_scope_version`, and assessment-date cutoff. If more than one system ties for the highest supported stage score, all materially relevant supporting assessments may be retained.

Integration across AIDA stages is outside the primary stagewise frontier construct. If later analysis asks whether one system can execute the entire workflow, that must be reported separately as a `single_system_capability_profile`; it cannot be inferred from the four stagewise maxima.

### 1.5 Acceptable performance

The 0–4 capability score measures autonomy **conditional on acceptable performance**. Producing an output is not sufficient if the output is unusable, unreliable, or routinely requires substantive correction.

Acceptable performance should be established, in descending order of preference, through:

1. a domain-specific operational, professional, regulatory, or safety threshold;
2. comparison with a qualified human or accepted operational baseline;
3. representative evaluation showing that the output can serve as the stage result without routine substantive correction; or
4. documented deployment evidence that identifies error, override, abstention, and human-intervention behavior.

The evidence must establish acceptable performance for the substantive operating configuration that supports the ceiling. A selected success, toy demonstration, or easy fragment is insufficient. Evidence from a bounded configuration may establish the frontier ceiling when the complete stage is performed under those stated conditions, but it must not be described as representative coverage of the broader canonical task.

A score of 4 does not mean perfect performance or universal task coverage. It means that at least one identifiable evaluated artifact has demonstrated adequate performance for that stage in a substantive in-scope configuration without routine substantive human completion or review. Humans may establish goals and reusable constraints, initiate the workflow, handle rare exceptions, or audit after the fact.

Every capability score is conditional on the supporting system's demonstrated stage scope, configuration, evidence environment, case population, and inputs. These conditions may differ across the four stage maxima and must be recorded separately; they must not be assumed to be jointly compatible. Lack of evidence about reliability within the claimed conditions requires `IE`; lack of evidence about generalization beyond them limits the claim but does not invalidate an otherwise supported bounded rating.

Lack of credible performance evidence prevents a capability rating of 3 or 4. A rating of 1 or 2 may still be assigned only when direct evidence demonstrates a useful limited or partial contribution and clearly identifies the human work required to complete the stage. Otherwise, use `IE`.

### 1.6 Product design

Product design is:

> The allocation of work and authority that a specified product is explicitly designed and documented to exercise for the fixed `task_scope`, product configuration, jurisdiction, and assessment date.

It measures intended or marketed workflow design, not real-world effectiveness. Official product documentation can therefore establish product design even when it cannot establish reliable technical capability.

A product-design score of 4 requires affirmative documentation that the product completes and releases or executes the stage without a routine substantive pre-effect human gate. Documentation silence is not evidence that no gate exists. If a stage-complete output is documented but the review, approval, release, or execution requirement cannot be determined, use `IE` rather than infer either 3 or 4.

If a product performs only a subset of the canonical task, the `task_scope` is not rewritten. `product_task_coverage` and `supported_case_scope` record that limited breadth, while the autonomy rating describes the human–product division of work inside the exact supported case. A bounded product may be highly autonomous without being treated as broad or full-task coverage.

A feature mapped to one source O\*NET statement does not establish coverage of the full canonical task. Product mapping and ratings must be evaluated against the frozen canonical scope and outcome.

`product_configuration_assessed` identifies the particular release or continuously delivered version, mode, module, integrations, permissions, tools, hardware, operating domain, and human gates that materially determine the product’s designed authority. It records only features relevant to the assessment rather than every administrative setting.

Unless the row explicitly represents a named customer deployment, assess the highest-autonomy configuration documented as actually available to customers in the stated jurisdiction on the assessment date. Do not use a hypothetical combination of features, an unavailable demonstration, or components that have not been offered together. If materially different configurations are both analytically relevant, retain them as separate product-task assessments rather than averaging them.

### 1.7 Formal human signoff

Formal signoff is coded separately in `OccupationTask_Signoff`.

Apply `Signoff_Protocol.md` for the formal definition, stage attribution, jurisdiction and applicability scope, evidence records, and validation rules.

Each signoff row carries the same `canonical_task_id`, `canonical_task_set_version`, and `task_scope_version` used by the corresponding capability and product-design rows.

For **AI capability**, a human approval required solely by law, licensing, contract, union rule, or organizational policy does not lower the technical score if adequate evidence shows that the system does not technically need the human contribution.

A deployment constraint lowers technical capability only when it reflects a technically necessary human contribution or a missing component in the assessed configuration. Constraints arising solely from law, policy, licensing, liability, organizational risk tolerance, product strategy, market readiness, or deployment scale belong to product-design or signoff analysis and do not by themselves lower capability.

For **product design**, a mandatory pre-effect human approval or release step is part of the designed workflow and ordinarily prevents the affected stage from receiving a 4. The signoff table records why that human gate exists.

The coder must not infer a formal rule merely because a product includes human review. The review may instead reflect technical limitations, risk management, customer preference, or product strategy.

### 1.8 Unit and date of assessment

The task-level capability frontier is defined by:

> `occupation_soc_code × canonical_task_set_version × canonical_task_id × task_scope_version × capability_date_assessed`

Each system-level evidence assessment supporting that frontier is defined by:

> `occupation_soc_code × canonical_task_set_version × canonical_task_id × task_scope_version × AIDA stage × capability_evidence_system/configuration × capability_evidence_environment × capability_date_assessed`

The product-design assessment is defined by:

> `product_id × occupation_soc_code × canonical_task_set_version × canonical_task_id × task_scope_version × jurisdiction_code × product_date_assessed/configuration`

The signoff observation is defined by:

> `occupation_soc_code × canonical_task_set_version × canonical_task_id × task_scope_version × jurisdiction_code × signoff_date_assessed`

Capability and product design must be compared at compatible observation dates. A later system must not be used to claim that an earlier product underused capability that did not yet exist.

The intended research scope is international. O\*NET supplies the initial task vocabulary and the first calibration sample; it does not define the geographic boundary of the research.

The first implementation uses U.S. O\*NET tasks and begins with U.S. product-design and signoff observations. Capability evidence may originate in any country. Product design and signoff are then added jurisdiction by jurisdiction, and non-U.S. occupations can later be mapped through ISCO, national occupation classifications, or direct task-level crosswalks.

Country of origin alone never lowers a capability rating. A foreign system supports the same capability assessment when it performs the same canonical task under materially comparable inputs, outputs, language, standards, population, environment, and infrastructure. When those features change the substantive task—for example, applying a different country’s tax law—the evidence supports that jurisdiction-specific task rather than a universal score.

Ratings created under the earlier O\*NET-task unit remain `pre_protocol_draft`. They must not be averaged, copied, or mechanically translated into canonical-task ratings. They may be consulted only as search leads after the canonical scope has been frozen, and they are not comparable observations in the published dataset.

### 1.9 Gap

For each applicable stage:

> `gap = AI capability rating − product autonomy rating`

- A positive gap means at least one evidenced system demonstrates greater autonomy at that stage than the assessed product is designed to exercise.
- Zero means the ratings are equal.
- A negative gap means the product claims or is designed for more autonomy than the capability evidence supports.

If either side is `IE`, the gap is missing. If a stage is `NA`, it must be `NA` on both sides and excluded from the calculation. Mismatched applicability indicates inconsistent `task_scope` coding.

The ratings are ordinal. The difference is a descriptive index; a gap of 2 should not automatically be interpreted as twice a gap of 1.

Use the existing row-level `gap_assessment_status` to qualify the comparison:

- `interpretable`: the product-supported case and the capability evidence are materially comparable in stage endpoint, inputs, operating conditions, and case difficulty;
- `directional_only`: they address the same canonical task and occupational outcome, but the product or capability evidence covers a materially narrower, easier, or otherwise unmatched case; and
- `not_comparable`: they address materially different endpoints or only an adjacent fragment, so the numeric gap must not be interpreted.

When comparability differs across stages, assign the most conservative status needed for the row. Raw gaps may be retained for audit, but primary published analysis must treat `directional_only` separately and exclude `not_comparable`. A negative gap is not by itself proof of vendor overclaiming or capability underestimation.

Because capability is a stagewise frontier ceiling, the gap does not estimate the percentage of an occupation or task that is automated. It compares a product’s designed autonomy at one stage with the highest directly demonstrated autonomy found for that stage in a substantive in-scope configuration. It does not mean that one alternative system could replace the product across the complete workflow. Coverage and configuration limitations must remain visible in the capability evidence and later sensitivity analysis.

---

## 2. Acquire–Interpret–Decide–Act rating rules

### 2.1 Shared 0–4 logic

The same human–system division-of-work anchors are used on both sides of the comparison. For capability, the claimed level must also pass the acceptable-performance gate. For product design, the level describes the documented intended workflow and does not claim that the product performs reliably.

| Score | Name | Human–system division of work |
|---:|---|---|
| 0 | Human performs the stage | The system makes no meaningful task-specific contribution to the stage. |
| 1 | Limited assistance | The system performs a narrow fragment or supplies cues; the human performs the principal work. |
| 2 | Substantial partial performance | The system performs substantial components, but a human must materially supply, integrate, correct, or complete the stage. |
| 3 | Complete stage with routine human gate | The system produces a stage-complete output for supported cases, but routine human validation, approval, release, or technical supervision remains part of the workflow. |
| 4 | Complete stage without routine human gate | The system completes and releases or executes the stage without routine substantive human review, approval, correction, or execution. Capability additionally requires acceptable performance; product design requires affirmative documentation that no routine gate is built into the assessed workflow. Humans may establish goals and constraints, initiate a workflow, handle genuine exceptions, or audit after the fact. |

The most important boundaries are:

- **2 versus 3:** At 2, the human materially completes the stage. At 3, the system completes the stage, but a human routinely checks, approves, releases, or supervises it.
- **3 versus 4:** At 3, the routine human gate is technically necessary for capability, or it is built into product design. At 4, no routine substantive human gate is technically necessary for capability or included in product design.

A human clicking “run,” setting an objective, supplying credentials, or handling rare exceptions does not by itself prevent a 4. A human supplying inputs that the occupational task normally requires the system to obtain, correcting routine errors, or deciding whether every output is acceptable is substantive involvement.

Scores are assigned independently by stage, and the system supporting the maximum may differ by stage. The scores need not rise or fall monotonically. Within a single candidate system profile, for example, a system may receive human-supplied data, interpret it autonomously, recommend a decision, and be unable to execute the physical action.

### 2.2 Acquire

**Definition:** Obtain, select, monitor, sense, retrieve, or assemble the information and materials required to perform the task from the relevant sources or environment.

Merely accepting a curated prompt, uploaded file, clean dataset, dictated finding, or human-selected image does not demonstrate autonomous acquisition when the occupational task normally includes locating, eliciting, sensing, or validating those inputs.

| Score | Acquire anchor |
|---:|---|
| 0 | A human obtains and enters the required inputs; the system only stores, displays, or transmits them. |
| 1 | The system identifies possible sources or captures limited fields, but the human performs the principal search, sensing, selection, or collection. |
| 2 | The system retrieves or structures a substantial subset, but the human obtains essential missing inputs or materially validates the assembled input set. |
| 3 | The system assembles the complete input set for supported routine cases, with routine human verification, setup, or exception screening. |
| 4 | The system obtains, filters, validates, and monitors the required inputs without routine substantive human collection or verification. |

### 2.3 Interpret

**Definition:** Transform acquired information into task-relevant meaning, such as findings, classifications, estimates, diagnoses, explanations, detected anomalies, or causal assessments.

Formatting, copying, searching, or displaying information is not by itself interpretation.

| Score | Interpret anchor |
|---:|---|
| 0 | A human derives the substantive meaning; the system performs no meaningful task-specific analysis. |
| 1 | The system highlights, extracts, labels, or summarizes limited elements; the human performs the principal interpretation. |
| 2 | The system produces a substantial but incomplete, narrow, or error-prone analysis that a human must materially integrate, correct, or complete. |
| 3 | The system produces a complete interpretation for supported routine cases, but a human routinely validates it before reliance. |
| 4 | The system produces the final interpretation for the assessed substantive configuration without routine substantive human validation. Capability additionally requires acceptable performance. |

### 2.4 Decide

**Definition:** Select among alternatives or commit to a judgment, recommendation, plan, disposition, priority, or escalation using the task’s goals and criteria.

Producing information that may influence a human decision is not the same as making or selecting the decision.

| Score | Decide anchor |
|---:|---|
| 0 | The system provides no meaningful decision support; the human frames and makes the decision. |
| 1 | The system provides flags, general options, or decision cues; the human generates and evaluates the substantive alternatives. |
| 2 | The system ranks options or recommends a judgment, but the human independently applies material judgment and chooses the decision. |
| 3 | The system selects the decision for supported routine cases, but a human routinely approves, vetoes, or authorizes it before effect. |
| 4 | The system selects and commits the decision for the assessed substantive configuration without routine substantive human judgment or pre-effect approval. |

### 2.5 Act

**Definition:** Carry out, release, communicate, enter, deploy, manipulate, deliver, or otherwise implement the selected action so that it produces the occupational endpoint or changes external workflow state.

Act can be digital, communicative, administrative, or physical. Drafting instructions for a human is not the same as performing the action when the task endpoint is execution. For a report-writing task, producing the report may itself be Act; for a treatment task, producing a treatment recommendation is not administering treatment.

| Score | Act anchor |
|---:|---|
| 0 | The human performs the occupational endpoint; the system only presents information. |
| 1 | The system prepares a narrow fragment or instruction, but the human performs the substantive action. |
| 2 | The system drafts, prepares, or executes bounded or reversible portions, but the human materially completes or revises the endpoint. |
| 3 | The system completes or prepares the complete action for supported routine cases, but routine human authorization, release, or continuous technical supervision remains. |
| 4 | The system completes and releases the occupational action without routine substantive human approval or execution; exception handling and after-the-fact audit are allowed. |

### 2.6 `NA`, `IE`, and `0`

#### `NA` — Not applicable

Use `NA` only when the stage is genuinely absent from the canonical `task_scope`.

Example: if the fixed task is narrowly defined as entering values from a completed standardized form into predetermined database fields, Decide may be `NA` because the task contains no substantive choice or judgment. Acquire, Interpret, and Act still apply.

`NA` is a property of the task scope, not of the system. It must therefore be the same for capability and product design.

Do not use `NA` because:

- the system lacks the feature;
- the stage is easy;
- a human currently performs it; or
- the available evidence does not discuss it.

#### `IE` — Insufficient evidence

Use `IE` when the stage applies but the available evidence cannot support a rating. Common reasons include:

- the system or version is not identifiable;
- the evidence covers only an adjacent task;
- the required human role is unclear;
- performance, reliability, coverage, or human-intervention evidence is inadequate to support a score within the claimed assessed conditions;
- evidence sources conflict materially; or
- no identifiable evaluated configuration directly supports the claimed rating for that stage, so the rating would require hypothetically combining components within the stage.

#### `0` — Demonstrated absence of meaningful contribution

Use 0 only when the best directly evidenced eligible artifact found demonstrably leaves the entire applicable stage to the human or provides no meaningful task-specific contribution. Failure to find an identifiable artifact or adequate source for the stage is `IE`, not 0.

### 2.7 Capability versus product-design treatment of human review

| Situation | AI capability | Product design |
|---|---|---|
| Human review is technically required to correct routine errors | Usually 3 or lower | Reflect the documented workflow, usually 3 or lower |
| Human approval is required solely by an external formal rule, and adequate performance without it is demonstrated | May be 4 | Usually no higher than 3 if the product requires the approval before effect |
| Human handles a material share of ordinary cases in the assessed configuration | Below 4 for that configuration; a separate demonstrated configuration may still establish the frontier ceiling | Below 4 unless the documented product scope explicitly excludes those cases |
| Human only sets goals, starts the workflow, handles rare exceptions, or audits after effect | May be 4 | May be 4 |

---

## 3. Evidence protocol

### 3.1 Evidence search sequence

For each frozen canonical occupational task:

1. Freeze `task_scope` before searching for systems.
2. Identify the inputs, stage outputs, final endpoint, and operating conditions that evidence must cover.
3. Search for exact-task and close-synonym evidence across research, regulatory or government, official system documentation, and documented deployment sources.
4. Prioritize task-and-stage-concordant peer-reviewed primary research, then search independent, regulatory, government, open-source, and commercial evidence rather than selecting the first company found.
5. Verify the exact system, version or date, enabled tools and modalities, data access, hardware, evaluated cases, performance, and human role.
6. Search specifically for limitations, contradictory results, abstention, failure, and required human intervention.
7. Rate each candidate artifact only on the stages it directly demonstrates.
8. For each stage, select the highest valid score across the eligible artifact assessments and preserve the supporting provenance.
9. Assign `IE` when the available evidence cannot support a score for that stage.

Each final stage rating means “highest directly evidenced capability found for this stage under this search,” not proof that no stronger system exists anywhere. Do not combine partial components within one stage to manufacture a score that no evaluated configuration demonstrated.

### 3.2 Capability evidence hierarchy

| Grade | Evidence type | Capability use |
|---|---|---|
| A | Methodologically adequate, peer-reviewed primary research directly evaluating the task-matched stage and identifiable configuration; or an equivalently rigorous independent, regulatory, or government evaluation, with performance, operating conditions, and human intervention reported | Can support 0–4 when scope, performance, and human-role requirements are met |
| B | Transparent, reproducible research that has not completed peer review; or a detailed independent or developer evaluation with disclosed protocol, metrics, configuration, human role, and limitations | Can support 0–3; can support 4 only when complete-stage performance, operating conditions, and lack of routine human intervention are convincingly demonstrated |
| C | Direct workflow documentation, manual, detailed demonstration, or deployment case that identifies actual inputs, outputs, and human steps but provides inadequate performance evidence | Can support partial capability, normally no higher than 2 |
| D | Component benchmark, adjacent-task study, or system-class evidence requiring substantive extrapolation | Can support only limited or partial capability, normally no higher than 1–2; cannot support 3 or 4 |
| E | Marketing slogan, press release, testimonial, generic technology-family evidence, or unsupported assertion | Cannot independently support a capability rating; use `IE` unless stronger evidence exists |

These are provisional evidence caps for calibration. Peer-reviewed primary research receives the greatest default evidentiary weight, but peer review is not an automatic capability score. The coder must still apply the task-fit, acceptable-performance, configuration, operating-boundary, and human-role rules. A peer-reviewed paper does not overcome a proxy endpoint, tiny or selected sample, weak reference standard, undisclosed human intervention, inadequate metric, or poor task fit.

Version 0.6 treats `capability_evidence_environment`, `capability_evidence_grade`, whether the evidence artifact is commercial or research-only, and material case-coverage limits as properties of the system-stage evidence assessment rather than of the composite task-level frontier. Evidence grade is stored directly; calibration will determine whether commercial status and coverage require additional dedicated fields.

Direct task-and-stage-matched evidence is required for 3 and 4. A bounded research or deployment configuration may support a high stage rating when it completely performs the assessed stage for a substantive, recognizable instance of the canonical task. The rating must not be restated as evidence that all occupational variants or cases are covered.

For a 4, the evidence must show:

- completion of the entire stage within the demonstrated substantive operating configuration;
- acceptable performance on operationally relevant cases or a transparent task-concordant evaluation;
- no routine substantive human correction, approval, or execution needed for technical reasons;
- actual evaluation of whatever components and tools were required to produce the claimed stage result; and
- explicit operating conditions, limitations, failures, or abstention behavior sufficient to judge where the demonstrated ceiling applies.

### 3.3 Research and commercial evidence

Both research and commercial evidence are admissible for capability. They answer different secondary questions:

- commercial evidence shows capability already packaged and externally available;
- research evidence can reveal demonstrated technical capability that product markets have not yet implemented.

A peer-reviewed research model or prototype does not receive a discount because it is not commercial, integrated across the entire task, or deployed in routine work. Commercial deployment is neither required nor an evidentiary bonus by itself. However, research evidence supports only the stage, conditions, inputs, population, and endpoint actually demonstrated. Privileged datasets, bespoke hardware, researcher intervention, selected cases, or unrealistic setup requirements must be recorded and may narrow or lower the supported rating.

Peer review is a credibility signal, not a substitute for reading the methods and results. A rigorous independent or regulatory evaluation may outweigh a weak peer-reviewed study. Conversely, commercial documentation may establish a capability when it contains sufficiently direct and transparent performance evidence, but market availability or customer count never substitutes for that evidence.

Evidence from outside the initial study jurisdiction is treated the same way. The coder evaluates task and operating-condition fit, not the nationality of the developer, laboratory, company, or dataset. If the demonstrated task is materially the same, the evidence is transferable. If the substantive task differs, the evidence remains valid for the narrower context actually demonstrated.

During later analysis, capability results should be tested both with and without research-only systems. This distinguishes the broad demonstrated technical frontier from the currently commercial frontier without embedding commercial constraints into the capability definition.

### 3.4 Vendor claims and independent evidence

Vendor material is evaluated differently depending on the construct:

- For **product design**, official documentation is direct evidence of the workflow the vendor intends or claims to provide.
- For **AI capability**, the same material proves reliable performance only when it includes a sufficiently transparent evaluation or observable workflow demonstration.

A statement such as “fully automates audit reporting” can support a claimed product-design rating if the intended human role is clear. It cannot by itself support capability 4.

Independent evidence is preferred because it reduces conflicts of interest. It is not always available, especially for recent systems. Transparent, reproducible developer or research evidence may still support a rating, but the limitations must be explicit and the evidence grade must not be inflated.

### 3.5 Product-design evidence hierarchy

The existing `product_rating_basis` values should be interpreted as follows:

| `product_rating_basis` | What it can establish |
|---|---|
| `vendor_documentation` | Intended functions, configuration, permissions, workflow gates, and documented human responsibilities |
| `vendor_demo` | Observable designed workflow for the demonstrated configuration; not necessarily reliability across deployments |
| `customer_deployment` | How the product is configured and used in a named setting; may differ from the vendor’s maximum design |
| `researcher_test` | Behavior observed in a documented test configuration; limited to the tested conditions |
| `independent_reporting` | Corroborating description of product workflow; authority depends on access and methodological detail |

When sources conflict, manuals, governing terms, configuration documentation, or direct observed behavior take precedence over broad marketing language. The rationale must state the conflict.

`product_task_mapping_basis` establishes why the product is mapped to the canonical occupational task. It does not itself establish the autonomy rating.

### 3.6 Negative and missing evidence

Evidence that a stage remains human may include:

- documentation explicitly assigning that stage to a person;
- an evaluation showing routine human completion or correction;
- a stated system limitation excluding the stage;
- a regulatory indication limiting the system to triage or decision support; or
- a demonstrated workflow that ends before the occupational endpoint.

Silence on a product page is not conclusive negative evidence. If the system’s role cannot be established, use `IE`.

### 3.7 `capability_evidence_system`

`capability_evidence_system` identifies the exact evaluated model, prototype, system, or configuration supporting one stage assessment. It is provenance, not a general technology description and not a requirement that the artifact be commercial or cover the other AIDA stages.

Use this format where information is available:

> `provider or lab + product/system/model + version/date + enabled tools/modalities + material data access or hardware`

Good examples:

- `OpenAI Codex (specified model/version), repository + terminal + test tools`
- `MindBridge AI Auditor (specified release), general-ledger and transaction-data configuration`
- `Flamingo-CXR research configuration described in [paper/date]`
- `ABBYY Bill of Lading skill (specified release and workflow configuration)`

Insufficient examples:

- `MindBridge`
- `LLMs`
- `deep learning`
- `smart medication systems, clinical AI, and robotics`
- `commercial-vehicle AI`

When a research system has no product name, identify it by first author or laboratory, publication year, model or prototype description, and tested configuration.

Because different systems may establish different stage maxima, one generic `capability_evidence_system` value on the task-level frontier row is insufficient. Before publication, system provenance must be stored as long-form evidence records in `OccupationTask_CapabilityEvidence`, with one row per:

> `canonical task × task_scope_version × AIDA stage × evaluated artifact/configuration × assessment date`

At minimum, each evidence record must retain:

- `capability_evidence_id`;
- the canonical-task and scope-version identifiers;
- `aida_stage`;
- `supported_stage_rating`;
- `capability_evidence_system`;
- `capability_evidence_environment`;
- `capability_evidence_grade`;
- `ai_technology_family`;
- `capability_evidence_url`;
- `capability_evidence_access_date`;
- `capability_date_assessed`;
- `capability_evidence_rationale`; and
- `supports_stage_frontier`.

`OccupationTask_CapabilityAI` remains the task-level summary with one Acquire, Interpret, Decide, and Act frontier rating per canonical task and assessment date. Its four scores must be traceable to the evidence records where `supports_stage_frontier = TRUE`. Multiple evidence records may support a tied maximum.

### 3.8 `capability_evidence_environment`

`capability_evidence_environment` records the broad setting in which the artifact's stage capability was demonstrated. Use one controlled value for each system-stage evidence record:

- `controlled_test` — a benchmark, laboratory, sandbox, simulator, phantom, retrospective dataset, or other researcher-controlled evaluation rather than routine live work;
- `real_world_trial` — an evaluation on real cases, people, worksites, or workflow data, but not documented routine production use;
- `operational_deployment` — repeated or routine operational use outside a test or study; or
- `not_reported` — the available evidence identifies system functions but not a credible evaluation or deployment setting.

This field does not modify the capability score automatically. It makes the evidence context queryable. The exact population, case selection, infrastructure, human setup or supervision, and other operating conditions still belong in `capability_evidence_rationale`.

### 3.9 `ai_technology_family`

`ai_technology_family` is secondary descriptive metadata attached to each system-stage evidence record. It must be assigned **after** selecting and verifying `capability_evidence_system`. It must never be used to infer a capability score.

For calibration, use one primary controlled label:

- `language_model`
- `computer_vision`
- `vision_language_model`
- `speech_audio_model`
- `predictive_ml`
- `recommendation_ranking`
- `generative_image_video`
- `optimization_planning`
- `robotics_autonomous_system`
- `symbolic_rules_knowledge_graph`
- `hybrid`
- `unknown_not_disclosed`

Coding rules:

1. Code the family materially responsible for the assessed capability, not every supporting technology in the product.
2. Use `robotics_autonomous_system` when sensing, planning, and physical execution form an integrated autonomous system and embodiment is essential to the assessed capability.
3. Use `vision_language_model` when joint visual and language processing is central; use `computer_vision` when the system analyzes images or video without material language generation or reasoning.
4. Use `generative_image_video` for systems whose substantive output is generated or edited imagery or video. PixelLab belongs here, not in a new `generative_image_model` category.
5. Use `hybrid` only when two or more families are indispensable and no single primary family accurately describes the system.
6. Use `unknown_not_disclosed` rather than guessing a proprietary architecture.

This list is a provisional operational taxonomy, not a complete ontology of AI. It mixes model modality and system function for practical coding. Calibration will determine whether one primary label is adequate or whether a separate multi-label system mapping is necessary.

### 3.10 Capability evidence rationale

`capability_evidence_rationale` must connect one identifiable evaluated artifact and its source to the supported stage score. It should state:

- exactly what the system demonstrated;
- the conditions and case coverage;
- the human contribution before, during, and after the system’s work;
- the performance evidence;
- which evidence supports the stage;
- why the rating is not one level higher; and
- the most important limitation or uncertainty.

A concise template is:

> `[System] demonstrates [stage behavior] for [scope and conditions]. The human [role]. Performance or deployment evidence shows [standard/coverage]. Therefore [stage] = [rating]. The next-higher rating is not supported because [specific limitation].`

One generic rationale reused across multiple stages or occupational tasks is not acceptable unless the evidence and limitation genuinely apply to each exact assessment. `capability_rating_rationale` on the task-level summary may explain how the composite frontier was derived and cite the supporting evidence IDs, but it does not replace the stage-specific provenance.

### 3.11 Evidence dates and conflicts

- `capability_date_assessed` records when the team assigned the capability rating.
- `capability_evidence_access_date` records when the evidence was accessed.
- The source publication, release, or evaluation date should be identifiable from the source or rationale.
- Evidence published after the assessment cutoff cannot support that earlier rating.
- Materially conflicting evidence must be reported rather than silently resolved in favor of the higher score.

---

## 4. Illustrative applications of the protocol

These examples explain the rules. They are not calibrated final ratings.

### 4.1 Software development: deliver and sustain a software system or change

A configured coding agent can receive a goal, independently gather repository and runtime context, interpret the system and problem, select a technical approach, implement and test the change, validate the result, respond to failures, and merge or deploy it. An identifiable evaluated model, prototype, or system that demonstrates any one of those complete stages at acceptable performance without routine substantive human intervention may support 4 for that stage. It does not have to be commercial or cover the other stages. Human construction of a reusable agent-legible environment, goal-setting, and after-the-fact audit do not by themselves lower the score.

One system may support all four 4s, or separate evaluated artifacts may establish different stage maxima. In either case, the evidence must identify the tools, permissions, tests or evaluators, repository and runtime access, and operating conditions that make each demonstrated stage possible. A stagewise `4/4/4/4` does not by itself mean one agent completes the whole workflow or covers every software environment, ambiguous stakeholder process, architecture problem, production setting, or support situation.

### 4.2 Accounting: conduct and report audit or assurance engagements

MindBridge transaction-risk analytics is a relevant candidate evidence system for acquiring and interpreting specified accounting data. Its existence does not establish that it is the strongest available system, and transaction anomaly detection alone does not demonstrate the complete preparation of an audit findings report.

The coder must search separately for direct evidence supporting acquisition, interpretation, decision, and action within the frozen audit scope, including evidence collection, procedures, findings, materiality or significance, conclusions, recommendations, documentation, and reporting. Different evaluated models, prototypes, or systems may establish different stage maxima. If no identifiable artifact directly supports a particular stage, that stage remains `IE` rather than being inferred from what an LLM might do.

### 4.3 Radiology: evaluate patients through diagnostic imaging and communicate findings

A system cleared to triage a limited set of findings in one imaging modality provides direct evidence only for that bounded function. It does not support a high Interpret rating for a canonical scope spanning multiple modalities, clinical questions, patient contexts, documentation, and communication.

A peer-reviewed vision-language model or research prototype may establish a stage rating when it is evaluated on that stage's relevant imaging or reporting endpoint at acceptable performance. It need not be a commercial radiology product or cover the other AIDA stages. A legally required radiologist signature does not lower technical capability if the evidence establishes that review is not technically required; it does lower product design when the product workflow contains a mandatory pre-effect approval gate.

### 4.4 Carpentry: construct, install, and restore permanent components

A task-concordant vision study may support an Interpret maximum, while a different robotics study may support an Act maximum. Those scores may coexist in the stagewise frontier. However, the vision component from one study and the manipulation component from another cannot be hypothetically connected to claim an Act score that neither evaluated configuration demonstrated.

Higher Act evidence requires at least one evaluated configuration actually fabricating, installing, inspecting, repairing, or replacing the relevant components under representative conditions. It may be a research prototype rather than a commercial robot. If humans position every item, correct routine measurements, handle ordinary variation, or complete installation in that assessment, those contributions determine the supported Act score.

### 4.5 Abstract `NA` illustration: predetermined data entry

This is a scale illustration, not a canonical task in pilot set `pilot-1.0`. For the narrowly scoped task “enter values from a completed standardized form into predetermined database fields,” Decide can be `NA` because no substantive decision exists in the task definition. If the task instead includes resolving discrepancies or deciding which values are authoritative, Decide applies and must receive 0–4 or `IE`.

---

## 5. Provisional decisions to test during calibration

Version 0.6 deliberately leaves the following questions for the calibration sample rather than hiding them:

1. Whether the acceptable-performance rule can be applied consistently across domains without domain-specific supplements.
2. Whether the strongest `single_system_capability_profile` should be published as a companion sensitivity measure to the primary stagewise evidenced frontier.
3. Whether research-only and commercial systems should be reported as two explicit capability frontiers in the published dataset.
4. Whether one primary `ai_technology_family` is adequate or a multi-label system mapping is required.
5. Whether canonical tasks and their AIDA scopes can be defined reproducibly at useful breadth, and whether plausible alternative scope versions materially change ratings.
6. Whether the four stages produce meaningful variation and acceptable inter-coder agreement, rather than four nearly identical scores.
7. Whether the final schema needs a `capability_jurisdiction_scope` field, using `GLOBAL` when the same capability assessment transfers across jurisdictions and an ISO country code when the substantive task or operating conditions are jurisdiction-specific.
8. Whether the four-value `capability_evidence_environment` field plus the rationale captures operating conditions adequately, or whether publication requires more structured environment and coverage fields.

These questions must be resolved before version 1.0 and before scaling beyond the calibration sample.

---

## References

- Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). “A Model for Types and Levels of Human Interaction with Automation.” *IEEE Transactions on Systems, Man, and Cybernetics—Part A*, 30(3), 286–297. [DOI: 10.1109/3468.844354](https://doi.org/10.1109/3468.844354)
- National Institute of Standards and Technology. *AI Risk Management Framework 1.0*, especially the MAP and MEASURE functions concerning context, testing, evaluation, verification, validation, performance, and human oversight. [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)
- O\*NET Resource Center. *Task Statements Data Dictionary*. [O\*NET Task Statements](https://www.onetcenter.org/dictionary/30.3/json/task_statements.html)
