# Canonical Occupational Task Protocol

**Version:** 0.4  
**Date:** 2026-08-20  
**Status:** Initial 80-occupation universe frozen across three canonical task sets; not publication-validated

## Purpose

This protocol reduces a long O\*NET task inventory into a smaller set of `canonical_occupational_tasks` for each occupation. The canonical tasks will eventually become the units assessed for AI capability, product design, and human signoff.

The task construction must be completed and frozen before reviewers examine AI systems, products, capability ratings, or product-design ratings for the occupation. Acquire, Interpret, Decide, and Act are applied only after the canonical tasks are fixed. They must not determine how tasks are grouped.

Because the research team had already reviewed AI evidence for these pilot occupations, this pilot is labeled `non_blinded`. Publication construction should use source-only packets and reviewers who have not seen the occupation's AI evidence.

## Frozen calibration set

Canonical task set `pilot-1.0` was accepted and frozen on 2026-08-19 using O\*NET 30.3. It contains 13 canonical tasks across Accountants and Auditors, Software Developers, Radiologists, Carpenters, and Heavy and Tractor-Trailer Truck Drivers. The crosswalk retains 135 source items: 127 included and 8 excluded with documented reasons. All partition, definition, primary-mapping, exclusion, and secondary-mapping review stages were accepted.

Canonical task set `expansion-1.1-reviewed` was accepted and frozen on 2026-08-19 using the same construction rules and O\*NET release. It adds 32 canonical tasks across 25 occupations. The original calibration dataset therefore contains 45 canonical tasks across 30 occupations.

Canonical task set `expansion-2.1-initial-reviewed` was accepted for the initial release on 2026-08-20. It adds 69 canonical tasks across 50 occupations and preserves 1,135 source statements: 1,092 included mappings, 43 documented exclusions, and 15 Emerging Tasks retained as excluded and provisional. Together, the frozen initial occupation universe contains 114 canonical tasks across 80 occupations. The two retained psychology boundary flags require later domain review but do not block this initial freeze.

Each set is immutable for calibration. Any change to a canonical task's identifier, definition, occupational outcome, boundary, source membership, or inclusion decision requires a new `canonical_task_set_version`. The retained review flags remain audit metadata and are not erased by acceptance.

## Definitions

### Source O\*NET task

A `source_onet_task` is an original O\*NET task statement and task ID. Its wording, O\*NET task type, update date, domain source, and available importance, relevance, and frequency ratings are preserved without alteration.

An O\*NET `emerging_task` is a new or revised statement proposed for future data collection. It is retained as a separate source type and must not be presented as an established task statement or assigned an invented O\*NET task ID.

### Canonical occupational task

A `canonical_occupational_task` is a researcher-constructed grouping of source O\*NET tasks that together describe one major occupational responsibility or recognizable work outcome. It may combine preparation, execution, checking, documentation, and communication when those activities all serve the same responsibility.

Canonical tasks are not required to be sequential and are not required to match an Acquire–Interpret–Decide–Act cycle. The number may differ by occupation.

One canonical task is permitted only when every source task included in canonical analysis either contributes to the same occupational outcome or enables that outcome, and no subset satisfies the split rule. The existence of one dominant responsibility is not sufficient by itself.

## Permitted construction evidence

Canonical tasks may be constructed from:

1. O\*NET task statements, task IDs, and separately identified Emerging Tasks;
2. O\*NET task type, importance, relevance, frequency, and suppression metadata;
3. O\*NET Detailed Work Activity mappings;
4. the O\*NET occupation description and reported job titles;
5. authoritative occupational descriptions, such as the U.S. Bureau of Labor Statistics Occupational Outlook Handbook; and
6. domain-expert review.

External sources may clarify grouping or document occupational variants. If they identify work absent from O\*NET, it must be added as an `analyst_added_source_task` with provenance and a review flag rather than silently inserted into a canonical definition.

The following must not influence task construction:

- current AI capability;
- available AI products or vendors;
- anticipated ease of automation;
- expected human-signoff requirements;
- a desired number of tasks; or
- a desired research result.

## Construction procedure

### Step 1 — Freeze the source release

Record the O\*NET release and retain every source task. The pilot uses O\*NET 30.3. Emerging Tasks visible in the same release are reviewed separately and labeled as proposals without official task IDs.

### Step 2 — Review occupational structure

Review the occupation description, reported titles, task statements, task ratings, Detailed Work Activities, and authoritative descriptions of occupational variants. Identify the major responsibilities and work outcomes without considering AI.

### Step 3 — Propose groups

Group source tasks that ordinarily contribute to the same occupational responsibility or outcome. O\*NET ratings and Detailed Work Activities inform this judgment but do not mechanically determine it.

### Step 4 — Apply the merge rule

Merge source tasks when they mainly describe:

- different steps, methods, or tools used for the same responsibility;
- preparation, checking, documentation, or communication serving the same outcome;
- overlapping wording for substantially the same work; or
- variations that do not change the underlying occupational responsibility.

### Step 5 — Apply the split rule

Split only when the activities:

- produce independently meaningful occupational outcomes;
- constitute separately assignable responsibilities; or
- belong to a documented occupational variant.

A documented variant is evidence for a split, but it is not sufficient by itself. A variant receives its own canonical task only when the evidence supports both of the following:

- it represents a stable, identifiable subgroup or assignment within the occupation; and
- it is a substantial, recurring responsibility or independently meaningful output for that subgroup, such that merging it would materially misdescribe the occupation's work or workforce structure.

A reported job title, a different setting or work object, or one Supplemental task does not by itself establish materiality. Because O\*NET relevance and frequency are not workload shares, no single numerical cutoff determines materiality. The adjudication must cite the available task ratings, number and coherence of supporting statements, reported titles, occupational descriptions, and domain review.

When a documented variant does not meet the materiality test, retain its source statements in the broader canonical task and document the specialty in the mapping rationale, review flags, or leading alternative partition. Do not exclude the work or create an equally weighted canonical task solely to preserve the variant.

Differences in the following are supporting evidence but are not sufficient by themselves:

- work object, client, patient, asset, or case;
- physical, digital, interpersonal, or managerial mode of work; or
- operating setting or body of professional knowledge.

These criteria describe the occupation itself. They are not proxies for AI capability.

### Step 6 — Apply the stopping rule

Begin with one proposed group and split only when a split trigger above is documented. Stop splitting when an additional group would mainly isolate a step, tool, communication method, quality check, administrative action, or non-material variant rather than a distinct occupational responsibility. Stop merging when the combined label would contain independently assignable outcomes or erase a material documented variant.

No minimum or maximum number is imposed. Counts above four trigger explicit review but do not require reduction.

### Step 7 — Classify responsibility and population scope

Do not combine occupational importance and subgroup coverage into one field. Each canonical task receives:

- `responsibility_role`: `primary_output` or `enabling_support`; and
- `population_scope`: `broad` or `occupation_variant`.

If `population_scope = occupation_variant`, record `variant_name` and `variant_evidence`. A variant may still be a primary output for the workers who perform it.

Preserve O\*NET source fields exactly. In Task Statements, `task_type_raw` is `Core`, `Supplemental`, or blank. Add a separate derived `rating_status` such as `rated`, `established_unrated`, or `emerging_proposal`. In Emerging Tasks, preserve the raw `New` or `Revision` category separately. `New/unrated` is a researcher-derived label, not an O\*NET raw task type.

Supplemental does not automatically mean unimportant: it may indicate that fewer incumbents perform an otherwise important variant. An established but unrated task cannot by itself establish broad occupational centrality. Emerging tasks are provisional, require a review flag, and are excluded from a primary estimate until corroborated or adopted. An Emerging `Revision` replaces or clarifies its linked original statement rather than counting as an additional task.

Each source statement also receives `canonical_inclusion_status = included` or `excluded`. Exclusion is permitted only when the statement is retained for provenance but falls outside the occupational outcomes selected for canonical analysis, such as a formal managerial-role variant, system-level governance, or professional development and teaching. Every excluded statement requires an `exclusion_reason`; it is never deleted or silently forced into an unrelated canonical task.

### Step 8 — Preserve the crosswalk

Every included source O\*NET task must have exactly one `home_canonical_task_id` for accounting. An excluded source task has a blank home ID, `canonical_inclusion_status = excluded`, and a documented `exclusion_reason`. Its occupational relation is coded separately as:

- `central`: the source task directly expresses the canonical responsibility; or
- `enabling`: the source task is a step, check, communication, or enabling activity within it.

When a source task genuinely relates to more than one canonical task, retain the home mapping and add structured secondary crosswalk rows with `mapping_role = secondary`. Do not bury overlaps only in narrative rationale. Population or variant status remains a separate field rather than a mapping relation.

### Step 9 — Record uncertainty

Set `review_flag = TRUE` when:

- two mappings are similarly defensible;
- occupational variants are difficult to separate;
- a new or analyst-written task lacks incumbent ratings;
- authoritative sources disagree; or
- the proposed canonical task may be too broad or too narrow.

Uncertainty is handled by documented adjudication, not by silently changing the task definition after ratings are observed. When two partitions remain defensible, retain the leading alternative and later test whether results change materially rather than manufacturing false certainty.

## Role of language models

A language model may propose clusters, canonical labels, and mapping rationales. It is a research assistant, not the source of occupational truth. The frozen source data, construction rules, human review, and retained task-level crosswalk are the auditable basis for the final mapping.

For publication, at least two reviewers should independently construct partitions from the same source-only packet before seeing each other's work or an LLM proposal. Agreement should be evaluated using pairwise co-clustering or a comparable partition-agreement measure. Disagreements and adjudication must be retained.

Each final canonical task records its name, definition, occupational outcome, boundary, variant scope, construction evidence, split or merge rule applied, construction date, coder, and `canonical_task_set_version`.

## Weighting and later analysis

The number of canonical tasks must not determine an occupation’s statistical weight. Canonical tasks are nested within occupations.

Before aggregation, the study must define whether the occupation-level estimand is a typical worker, share of work, economic output, or feasibility of replacing the whole occupational role. These imply different rules. Until that is defined, publish the canonical-task profile rather than one occupation average.

O\*NET importance, relevance, and frequency are useful indicators of salience, but none is a direct estimate of time spent. Frequency should not be described as a workload share, and variant tasks require subgroup prevalence evidence before entering a general occupation average.

## Relationship to the rating protocol

`Rating_Protocol.md` version 0.8 defines assessments around `canonical_task_id`, `canonical_task_set_version`, and a separately frozen `task_scope_version`. Source O\*NET task IDs remain in the crosswalk as provenance rather than rating units. Earlier O\*NET-task ratings remain `pre_protocol_draft` and must not be copied, averaged, or mechanically translated into canonical-task ratings.

## Pilot sources

- [O\*NET 30.3 Task Statements](https://www.onetcenter.org/dictionary/30.3/csv/task_statements.html)
- [O\*NET 30.3 Task Ratings](https://www.onetcenter.org/dictionary/30.3/csv/task_ratings.html)
- [O\*NET 30.3 Emerging Tasks](https://www.onetcenter.org/dictionary/30.3/csv/emerging_tasks.html)
- [O\*NET 30.3 Tasks to Detailed Work Activities](https://www.onetcenter.org/dictionary/30.3/csv/tasks_to_dwas.html)
- [O\*NET Work Activities Project Technical Report](https://www.onetcenter.org/reports/DWA_2014.html)
- [BLS Occupational Outlook Handbook](https://www.bls.gov/ooh/)

## O\*NET attribution

This pilot includes information from the O\*NET 30.3 Database by the U.S. Department of Labor, Employment and Training Administration. It is used under the [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/). The canonical task definitions and task mappings are researcher-created modifications; USDOL/ETA has not approved, endorsed, or tested them. See the [O\*NET database content license](https://www.onetcenter.org/license_db.html).
