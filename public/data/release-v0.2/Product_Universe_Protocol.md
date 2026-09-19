# Product Universe Protocol

**Version:** 0.3.5  
**Date:** 2026-08-21  
**Status:** 80-occupation, 114-task initial-release protocol; collection and publication validation in progress

Version 0.3 adds explicit requirements, product-planning, architecture, and interface-design strata to the Software Developers search after the independent v0.2 holdout test showed that a coding-agent-heavy search did not meet the recall or cold-challenge stopping rules. Earlier search records retain their executed protocol version; remediation and later runs use v0.3.

Version 0.3.1 clarifies that occupation waves use one global company and persistent-product identity registry. It changes no eligibility, search, stopping, or rating rule, so runs frozen under v0.3 remain methodologically compatible.

Version 0.3.2 adds the required derived task-level public coverage report. It changes no search or rating rule, so v0.3 and v0.3.1 runs remain methodologically compatible.

Version 0.3.3 clarifies the existing material-AI eligibility test: advanced
Bayesian, statistical, optimization, predictive, or adaptive software is not
treated as AI without configuration-level AI/ML evidence. It also requires
source-specific AI-materiality, task-fit, and availability evidence on every
positive mapping. Earlier positives must pass this check before import.

Version 0.3.4 clarifies the positive product boundary for marketplace and
open-source long-tail records. A listing, repository, name, tag, or metadata
snippet is discovery evidence, not proof of a repeatable current offering. It
also adds a symmetric false-positive audit and expansion rule for proposed
inclusions. This is a clarification of the existing five-test eligibility rule,
not a change to the intended product universe.

Version 0.3.5 tightens the persistent-product unit and public identifier rules.
The default unit is one integrated, independently adoptable product, not every
feature, module, plan, mode, integration, or release named on a separate page.
Public company and product identifiers are source- and occupation-neutral.

## Purpose

This protocol defines how to identify AI products, decide which products belong in the dataset, map them to canonical occupational tasks, and rate their documented product design.

The dataset does not claim to contain every AI product that exists. No complete global registry exists. Its defensible coverage claim is:

> All currently available eligible products identified under a frozen, auditable, multi-source search protocol through the stated snapshot date and within the declared jurisdiction and language coverage.

Product discovery is an independent measurement objective. It does not stop when one included product already receives the maximum product-design rating: additional products remain necessary to measure the size, composition, concentration, and variation of the product universe.

The first systematic discovery wave covers products documented as available in the United States, including products made by foreign companies. Product-design observations use the jurisdiction supported by the documented configuration. Earlier non-U.S. calibration rows may be retained, but they do not count toward U.S. search saturation. Later waves add other jurisdictions and languages explicitly.

## 1. Snapshot and cohort dates

The primary product universe is current rather than launch-date bounded. A product may qualify when it is externally available in the assessed jurisdiction on the snapshot date, regardless of when it first launched. A pre-2023 product does not need a post-2023 release or expansion to qualify.

Record two different types of dates:

- `original_product_launch_date`: when the persistent product first became externally available;
- `qualifying_ai_event_date`: when a documented AI launch or material AI change became externally available.

Material AI events may include:

- `initial_external_release`;
- `material_ai_enablement`;
- `material_task_scope_expansion`; or
- `material_autonomy_expansion`.

A change is material when it introduces AI, newly connects the product to a frozen canonical task, or changes the product's designed AIDA authority. A model refresh, accuracy improvement, pricing change, minor integration, rebrand, or announcement without availability is not material by itself.

The post-2023 cohort is a derived analytical subset, not an inclusion rule. It contains products with an `initial_external_release`, `material_ai_enablement`, `material_task_scope_expansion`, or `material_autonomy_expansion` on or after `2023-01-01`. The full current-product analysis retains eligible products outside that cohort.

Rate the current or last publicly documented configuration at a common snapshot date. Do not compare a product's 2023 launch design with a 2026 capability frontier unless a historical capability frontier is also reconstructed.

Search runs completed under protocol v0.1 retain their original `2023-01-01` eligibility window and decisions as historical audit records. They are not rewritten. Protocol v0.2 and later runs rescreen earlier out-of-window exclusions under the current-product rule and leave `eligibility_window_start` blank because no launch-date eligibility gate applies.

## 2. Eligible product

Include an offering only when all five tests are met:

1. It is a publicly identifiable and repeatable external offering available to at least one customer or user.
2. AI or machine learning materially performs at least one applicable AIDA stage inside one of the 114 frozen initial-release tasks.
3. It is externally available in the assessed jurisdiction on the snapshot date.
4. Product identity, current availability, AI contribution, and task relationship can be verified from first-party, regulatory, or sufficiently direct evidence.
5. The product can be distinguished from its company, underlying model, release, plan, and configuration.

Eligible forms include software applications, modules, task-specific APIs, medical devices, robots, vehicle-automation systems, integrated hardware-software systems, managed AI services, and externally usable open-source offerings.

For an open-source or marketplace long-tail record, `externally usable` requires
an exact current source that documents a real installation, download, hosted
use, or deployment path and a direct product workflow. A repository, listing,
name, AI tag, metadata description, code sample, template, student or demo
project, integration stub, or model wrapper does not qualify by itself. Lack of
stars, downloads, or commercial sales is not an automatic exclusion, but weak
adoption combined with an unclear offering or workflow remains unresolved
rather than eligible.

Exclude:

- research-only prototypes;
- internal systems unavailable outside one organization;
- generic foundation-model APIs without a documented task-specific workflow;
- deterministic automation with no material AI contribution;
- consulting or custom development without a repeatable offering;
- products supported only by an unverified directory tag;
- duplicate plans, minor releases, rebrands, or integrations; and
- future announcements without external availability.

Do not infer AI from sophistication. Bayesian forecasting, statistical risk
scores, mathematical optimization, deterministic rules, predictive analytics,
adaptive control, or other advanced decision support qualifies only when an
exact current product/configuration source establishes that AI or machine
learning materially performs the mapped task output. If the source establishes
the workflow but not the material AI contribution, code the candidate
unresolved; do not include it provisionally.

An invitation-only customer pilot may qualify as `limited_customer_release`. A laboratory prototype does not.

The user or buyer does not have to be a worker in the mapped occupation. A customer self-service product, employer-deployed system, or embedded service may perform or bypass occupational work and is therefore analytically relevant. Record the relationship instead of excluding the product solely because it is not marketed to the occupation.

Do not treat ordinary marketplace routing, outsourcing, or hidden human service delivery as AI performing the occupational task. The product qualifies only when AI materially produces or transforms the task output itself. If people behind the service materially complete a stage, the rating must reflect that human contribution; moving the work to another person is not automation.

## 3. Product identity and lineage

Use one persistent `product_id` across minor releases, ownership changes, and rebrands. Store former names as aliases.

Default to one product for an integrated platform. A separately named feature,
module, plan, mode, integration, model, agent, API endpoint, marketplace page,
or release is not a separate product merely because it has its own name or web
page. Record it in `product_configuration_assessed`, `Product_AI_Release`, or
the product aliases and description as appropriate.

Create a separate product only when both conditions hold:

1. the offering has a stable independent identity and adoption boundary, such
   as separate purchase, installation, provisioning, deployment, regulation,
   or external use; and
2. collapsing it into another offering would combine independently unavailable
   configurations or materially different workflow authority.

Distinct independently adopted offerings from one company remain separate.
When the evidence is ambiguous, default to the integrated product and retain
the narrower surface as a configuration rather than creating another
`product_id`. One product may map to many occupations and canonical tasks.

Public identifiers must not encode the occupation wave, discovery source, or
staging package. Use a stable normalized company identifier such as `gusto`.
Use a product identifier ending in `_prod`, such as `gusto_prod`; include a
product qualifier when the company has genuinely distinct products, such as
`adobe_photoshop_prod`. A company and its same-named product are therefore
distinct without treating product features as separate entities. Add a stable
qualifier only when needed to prevent a collision. Once published, an
identifier remains fixed through rebrands and ownership changes.

Deduplicate with normalized names, company domains, product URLs, marketplace IDs, regulatory identifiers, aliases, and fuzzy name similarity. A human reviewer adjudicates uncertain matches.

Occupation waves may create provisional identifiers in staging, but they do not own a separate company or product namespace. Before import, every staged row must be reconciled against the global company and persistent-product registry. Reuse the existing identifier when identity is established; create a new identifier only after domain, name, alias, ownership, marketplace, and regulatory collisions have been reviewed. Never merge merely because two offerings share a marketplace host, suite landing page, or similar brand name.

## 4. Product-task mapping

Create a product-task assessment only when the mapping is supported by one of:

- `vendor_explicit_task`;
- `vendor_explicit_occupation`;
- `demonstrated_task_match`; or
- `independent_deployment_match`.

`researcher_inferred` may flag a discovery candidate but cannot independently establish a publishable mapping.

Also code:

- `product_task_coverage`: `narrow_fragment`, `bounded_substantive`, `broad_task`, or `full_task`;
- `supported_case_scope`: the modalities, transactions, environments, jurisdictions, users, and exceptions actually documented.
- `product_task_relationship`: `occupation_worker_tool`, `employer_deployed_automation`, `customer_self_service`, `embedded_service`, or `mixed`;
- `primary_user_role`: the person or organizational role that ordinarily operates, configures, or receives the product output.

Every positive mapping must also retain source-specific evidence for three
separate tests:

- `ai_materiality_evidence`: what the cited source establishes that AI or
  machine learning materially does;
- `task_relationship_evidence`: what part of the frozen task the cited source
  establishes; and
- `current_availability_evidence`: what establishes present external
  availability in the assessed jurisdiction.

Also code `source_specificity_status` so a direct product or workflow page can
be distinguished from an official company page that itself names the offering
and material workflow. A company homepage, brand name, or generic claim of
innovation does not satisfy any of the three tests by itself.

Only mapped product-task pairs receive rows. Do not create the full product-by-task Cartesian product and do not treat an absent mapping as a zero.

Product-task breadth and product autonomy are separate dimensions. `product_task_coverage` records how much of the canonical task the product addresses; the 0–4 autonomy rating is assigned within the exact, substantive `supported_case_scope`. Do not lower an otherwise supported autonomy score solely because the product covers only one occupational variant or a bounded case. Conversely, never use a high bounded-case rating to relabel the product as broad or full-task coverage. Every 3 or 4 must therefore carry a case scope specific enough to show exactly what the product completes and what remains outside the rating.

Apply the frozen occupational AIDA definitions before rating the product. Do not relabel the product's internal processing sequence as the occupation's stages: technical capture is not automatically occupational Acquire, classification is not automatically occupational Interpret, presenting options is not automatically occupational Decide, and returning information is not automatically occupational Act. Credit only the product's documented contribution to the stage outcome defined in the frozen task scope.

`jurisdiction_code` must describe the market and governing product configuration actually supported by the evidence, not the company's headquarters or a source website's domain. `UNSPECIFIED` may be retained during discovery or calibration when availability cannot yet be localized, but it cannot be joined to a jurisdiction-specific signoff observation. The Main table carries signoff fields only when the product-design and signoff jurisdictions are identical or a documented equivalence rule has been approved.

## 5. Discovery workflow

1. Freeze the occupations, canonical tasks, task scopes, snapshot date, jurisdiction wave, languages, source registry, query dictionary, and inclusion rules.
2. Build queries from occupation titles, canonical-task and O*NET language, buyer problems, workflow outcomes, product categories, AI and automation modes, self-service and embedded-service language, and launch or deployment terms.
3. Enumerate every mandatory structured source to its accessible end, retaining record IDs, filters, pagination or cursor information, retrieval dates, and zero-yield searches in `Product_SearchRun`.
4. Run the frozen web-search matrix for each canonical task.
5. Snowball from every plausible candidate through named competitors, integrations, customer deployments, regulatory predicates, acquisitions, investor portfolios, marketplace categories, and conference lists.
6. Record every candidate hit, including exclusions and duplicates, in `Product_DiscoveryLog`.
7. Rescreen products previously excluded only because they lacked a post-2023 event.
8. Verify identity, current external availability, AI contribution, product history, and task mapping using first-party, regulatory, or sufficiently direct evidence.
9. Deduplicate at company and product levels.
10. Resolve all high-salience candidates before freezing. A candidate is high-salience when it appears in two independent discovery sources, a major registry or landscape, a competitor list, or an independent expert nomination.
11. Freeze the eligible universe for the snapshot.
12. Assess each exact product configuration against every supported canonical task.
13. Run traceability, duplicate, exclusion, mapping, date, and source-coverage checks.
14. Publish the snapshot and rerun the protocol on a declared schedule.

A language model may screen candidates, propose duplicates, and draft mappings. Final inclusion, deduplication, and ratings require source verification.

High-volume sources may use deterministic or language-model triage to rank leads and identify obvious non-products, but automated triage is not a final exclusion by itself. Every proposed inclusion, high-salience lead, uncertain case, and weak-evidence exclusion receives source-verified review. Ordinary automated exclusions are checked with a stratified random audit by source family and exclusion reason; any high-salience miss or a false-negative rate above 2% expands the review sample and requires the affected batch to be rescreened. Record the rule, model or classifier version, reviewer, and audit result so a pending machine decision cannot be mistaken for a final human-reviewed disposition.

Proposed inclusions from high-volume marketplaces, repositories, and directories
also receive a stratified random audit by source family and offering form. Any
false-positive rate above 2% expands the review and requires a full rescreen of
the affected positive stratum before import. A fresh reviewer must verify the
exact product boundary, current usability, unambiguous material AI contribution,
direct task output, and availability; page metadata alone cannot pass this
audit.

## 6. Mandatory source panels

Complete the applicable discovery panels for every canonical task:

- one broad company or product source;
- relevant cloud, application, or industry marketplaces;
- at least one occupation-specific structured registry or enumerated directory where one exists;
- at least one industry ecosystem source such as a professional association, complete exhibitor list, or innovation-award list;
- procurement, deployment, or customer-use sources;
- the frozen web-search query matrix; and
- competitor, integration, acquisition, investor, and customer snowballing.

Use at least four independent discovery source families per canonical task. An inapplicable panel requires a recorded rationale. Vendor documentation and company archives verify candidates already found and therefore do not count as independent discovery families.

For every canonical task, the web matrix must cover occupation and job-title terms, canonical-task and O*NET wording, buyer and outcome language, automation and product-relationship language, product-category terms, and launch or deployment terms.

### General

- frozen web-search query matrix;
- Product Hunt API where its license permits research use;
- GitHub API for open-source and developer offerings;
- SEC EDGAR for public-company launch corroboration; and
- vendor documentation, manuals, release notes, pricing, and press archives.

### Accounting

- QuickBooks, Xero, Sage, NetSuite, Microsoft AppSource, and SAP marketplaces;
- audit, tax, close, reconciliation, bookkeeping, FP&A, forecasting, and reporting searches;
- vendor documentation and named customer deployments.

### Software development

- GitHub Marketplace and repositories;
- Visual Studio, JetBrains, and Atlassian marketplaces;
- Product Hunt developer categories;
- official coding-agent and provider launch archives; and
- requirements, product-planning, architecture, interface-design and prototyping, coding, testing, review, security, documentation, deployment, incident, and maintenance searches.

The software-development panel must not be treated as a census of coding assistants. `SWD-01` covers the end-to-end delivery and sustainment of a software system, so discovery must include products that materially perform requirements definition, backlog and roadmap work, architecture and diagramming, interface design or code-generating prototyping, as well as implementation and operations. A failed holdout stratum expands the relevant query and source panels and resets the final two-round stopping test.

### Radiology

- FDA AI-enabled medical-device download and openFDA device APIs;
- ACR AI Central and RSNA AI Showcase;
- vendor regulatory submissions and instructions for use;
- international regulatory and market sources.

FDA authorization is a regulatory event, not automatically a launch date, and the FDA states that its AI-device list is not comprehensive.

### Carpentry and construction

- Procore, Autodesk, Trimble, Bentley, and related marketplaces;
- construction-technology exhibitor and startup lists;
- robotics, fabrication, estimating, layout, inspection, finishing, and site-automation searches;
- vendor deployment documentation.

Screen out products that serve construction generally but do not map to the carpenter task scopes.

### Heavy trucking

- NHTSA AV TEST and ADS/ADAS reporting sources;
- state autonomous-vehicle programs, including California DMV;
- truck manufacturers, autonomous-driving developers, freight operators, and logistics platforms;
- commercial-deployment documents and industry exhibitor lists.

A permit holder or crash-reporting entity is a lead, not proof of an externally available heavy-truck product.

### Additional domain panels

- Healthcare and care work: FDA and openFDA, professional-society directories, health-system marketplaces, clinical and deployment registries, and specialty conference lists.
- Legal services: Stanford CodeX TechIndex, legal-technology directories, practice-platform marketplaces, professional conferences, and incumbent-provider release archives.
- Education: education-product libraries, certification directories, district or government procurement sources, and education-technology conference lists.
- Cybersecurity: MITRE ATT&CK Evaluations, FedRAMP Marketplace, cloud-security marketplaces, public procurement, and security-conference exhibitor lists.
- Retail, hospitality, personal services, and cleaning: relevant retail, restaurant, cleaning, aging-technology, beauty-technology, and commerce-platform directories and exhibitor lists.
- Industrial, construction, agriculture, automotive, and warehouse work: automation and robotics directories, open-source robotics indexes, trade-show and award lists, manufacturer marketplaces, and named deployment sources.
- Public procurement and deployment across domains: USAspending, SAM.gov, public AI-use-case inventories, EU Tenders Electronic Daily, and comparable jurisdictional sources.

## 7. Restricted databases and scraping

Commercial databases may supplement discovery only under their licenses. One broad database is sufficient for a discovery panel; buying several is not required. They are not the public dataset's evidence backbone.

Protocol v0.3 uses only public or freely accessible sources. No paid commercial database is required for this wave, and the coverage claim must not imply that one was searched.

- Crunchbase research access may be useful, but restricted rows must be independently re-sourced before publication.
- PitchBook requires separate API rights and restricts external distribution; skip it in the first pass.
- Dealroom requires approved access and contract review.
- Do not automate extraction from G2, Capterra, Gartner, or another site whose terms prohibit it.

Keep any restricted-source staging records separate from the publishable dataset.

## 8. Product-design evidence

Use this hierarchy:

1. `P1_governing_documentation`: manual, regulatory label, instructions for use, API or configuration documentation, release notes, or governing terms.
2. `P2_official_workflow_evidence`: detailed product page, FAQ, technical brief, or observable vendor demonstration.
3. `P3_deployment_or_independent_evidence`: named customer deployment, researcher test, or detailed independent report.
4. `P4_discovery_only`: marketplace profile, commercial database, review site, press summary, or search snippet.

P1 and sufficiently specific P2 evidence may support final product-design ratings. P3 supports only the documented deployment or configuration. P4 can identify a candidate but cannot support a final stage rating.

Use `aida_stage = not_stage_specific` for product identity, release history, current external availability, configuration, product status, and task-mapping evidence that supports the assessment as a whole. Use a specific AIDA stage for evidence supporting a stage rating or human gate.

For each AIDA stage:

- verify one actually available configuration across the four ratings;
- allow multiple evidence items for different stages;
- do not combine modules or plans that cannot be configured together;
- assign 4 only when explicit evidence shows that the product is designed to complete and release or execute the stage without a routine pre-effect human gate;
- assign 3 when the product completes the stage but documentation requires routine human review or approval before effect;
- assign 2 or lower when a human materially completes the stage;
- use `IE` when documentation is silent about the human gate;
- use 0 only when evidence affirmatively establishes no meaningful contribution to an applicable stage; and
- record source conflicts, giving manuals, labels, permissions, and observed workflows precedence over marketing claims.

Product design measures documented workflow authority, not reliable performance. A product may claim a higher design score than the capability evidence supports; that result is analytically meaningful and must not be silently corrected.

## 9. Workbook tables

- `Company_GeneralInfo`: one row per company.
- `Product_GeneralInfo`: one row per persistent product.
- `Product_AI_Release`: one row per documented initial or material AI release needed for product lineage, configuration, or cohort analysis. Events may predate 2023.
- `Product_SearchRun`: one row per executed source/query/round, including zero-yield, partial-access, and blocked runs.
- `Product_DiscoveryLog`: one row per discovery hit, including exclusions and duplicates.
- `ProductTask_CapabilityDesign`: one row per product configuration × canonical task × jurisdiction × assessment date, including its relationship to the occupation and primary user role.
- `ProductTask_DesignEvidence`: one row per assessment × stage × evidence item.

The detailed column names and controlled values live in the workbook. Display names may be joined into analysis views, but identifiers, dates, and ratings must have one authoritative source.

## 10. Stopping rule

Label a canonical task `provisionally_saturated` only when:

1. every applicable mandatory discovery panel has been exhausted to its accessible end;
2. every query-source-language cell has been run and logged, including zero-yield, blocked, and partial-access runs;
3. every candidate is eligible, excluded, duplicate, or unresolved;
4. every included product has verified identity, current availability, AI contribution, and task mapping;
5. at least four independent discovery source families have been completed for the task, including an occupation-specific enumerated source where available or a documented reason it is not applicable;
6. no high-salience candidate remains unresolved;
7. a frozen query benchmark retrieves at least 95% of an independently assembled holdout set and every high-salience holdout product;
8. two consecutive expanded-search and challenge rounds reveal no new high-salience product, less than 5% combined eligible-product growth, and no new product class or high-yield source;
9. a cold independent challenge search finds no unlogged high-salience eligible product among its first 50 relevant candidates; and
10. a coverage report records source counts, unique products, overlaps, exclusions, unresolved cases, geography and language coverage, and marginal yield.

Any newly discovered high-salience product or product class resets the final two-round test. Provisional saturation is not proof that no unseen product exists. The published dataset must state that limitation.

## 11. Quality control before publication

- Preserve exact search queries, filters, retrieval dates, and source identifiers.
- Peer-review the frozen query matrix before final execution, preferably with a research librarian or independent search reviewer.
- Independently review all exclusions based on weak evidence and a sample of ordinary exclusions.
- Independently review duplicate merges and all `full_task` mappings.
- Require stage-level evidence for every final product-design rating.
- Distinguish actual release or availability dates from announcements, marketplace listing dates, regulatory decisions, and procurement dates.
- Confirm that every v0.1 out-of-window exclusion has been rescreened under the current-product rule.
- Report coverage and limitations by occupation, source family, jurisdiction, language, and offering type.
- Version the protocol and never overwrite a published snapshot.

## 12. Task-level coverage report

Every release must publish one derived coverage row per frozen canonical task. This is generated from search, discovery, identity, mapping, assessment, and challenge records rather than maintained as another manual workbook table.

Report at minimum: eligible products and companies, mapped product-design assessments, completed source families and search runs, unresolved high-salience and ordinary candidates, excluded and duplicate counts, holdout recall, cold-challenge result, geography and language scope, saturation status, major known omissions, and the next required work. Use `not_started`, `active_search`, `identity_review`, `design_coding`, `quality_review`, `provisionally_saturated`, or `frozen_for_release` as the collection status. A task can enter a public release without saturation only when its coverage row says so plainly; it cannot be described as comprehensive.
