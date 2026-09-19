# Signoff Protocol

**Version:** 0.2  
**Date:** 2026-08-20  
**Status:** 80-occupation, 114-task U.S.-baseline initial-release protocol; non-blinded and not publication-validated

## Purpose

This protocol defines how to code formal human signoff separately from AI capability and product design. It applies to `OccupationTask_Signoff` and its supporting evidence register.

Formal signoff is:

> A documented external rule that requires an identifiable human role to perform, verify, approve, attest, authorize, release, or supervise an AIDA stage before that stage's output can formally take effect in the stated jurisdiction and applicability scope.

The rule may come from law, regulation, licensing, a binding professional standard, contract, organizational governance, procurement, a collective-bargaining agreement, or another documented authority outside the technical capability being measured.

Formal signoff is not:

- the fact that humans currently do the work;
- a human contribution that is technically necessary for the system to perform;
- a product's voluntary review step when no external rule requires it;
- a general statement that the work is risky or important;
- ordinary supervision without a documented approval, authorization, or reserved-practice rule; or
- an after-the-fact audit that does not delay or prevent the stage output from taking effect.

## 1. Unit of observation

The signoff observation is:

> `occupation_soc_code × canonical_task_set_version × canonical_task_id × task_scope_version × jurisdiction_code × signoff_applicability_scope × signoff_date_assessed`

Every row must use the same canonical task and scope version as the corresponding capability and product-design assessments.

`jurisdiction_code` identifies the legal or institutional jurisdiction being coded. `signoff_applicability_scope` states the population, setting, service, transaction, project, or regulatory regime to which the row applies. It must be specific enough that a coder can determine whether a rule is in force.

The initial implementation uses `US` and records the national baseline plus named material federal or professional conditions. A condition is material only when it is explicitly inside the frozen task scope or is a recurring, non-incidental way in which that task is performed. A state or local rule that materially changes the result should later receive its own jurisdiction row rather than being averaged into a national score.

A model code, model professional rule, or possible state adoption does not create a condition in the `US` baseline by itself. Cite a named operative adoption in a jurisdiction-specific row. A highly specialized regulated variant also does not change the occupation summary unless its occupational materiality is documented; otherwise use a narrower applicability row.

## 2. Stage status

Use one controlled value for each of Acquire, Interpret, Decide, and Act.

| Status | Definition |
|---|---|
| `required` | The stated applicability scope ordinarily cannot proceed without the documented human authority at this stage. Exceptions are rare and do not define the scope. |
| `conditional` | Human authority is required only when a named, non-hypothetical condition is present, such as a regulated service, licensed practice, specified transaction, safety trigger, contract, union rule, or state regime. The trigger must be stated. |
| `not_required` | The stage applies, but the protocol search found no documented pre-effect human-authority requirement within the stated scope. This is an evidence-bounded conclusion, not proof that no organization could impose one. |
| `NA` | The stage is absent from the frozen task scope. This must match the capability and product-design applicability coding. |
| `IE` | The stage applies, but the rule, jurisdiction, signatory, timing, or applicability cannot be determined reliably from the available evidence. |

Do not use `conditional` merely because an employer could choose to require approval. A real rule and triggering condition must be identified.

## 3. Assigning signoff to AIDA stages

Code a stage only when the documented rule governs that stage's output or reserves that stage's authority to a qualified human.

- **Acquire:** a human must formally authorize, attest to, or supervise obtaining or validating the required inputs.
- **Interpret:** a human must formally perform, verify, or authenticate the substantive finding, diagnosis, classification, reconciliation, or analysis.
- **Decide:** a human must formally choose, approve, prescribe, authorize, or accept the judgment, plan, disposition, or escalation.
- **Act:** a human must formally sign, release, file, communicate, deploy, administer, drive, inspect, certify, or otherwise authorize the occupational endpoint.

Do not propagate one final signature backward through the whole workflow. A rule requiring a human to sign a report usually applies to Act. It also applies to Interpret or Decide only when the operative rule reserves the underlying interpretation or judgment to that human.

A qualification, training, or safety rule counts only when the operative text expressly reserves an in-scope performance, verification, authorization, or supervision step to an identifiable human before the stage proceeds. When the rule is triggered only by human-performed work, a conditional row must say so explicitly and must not imply that the rule also governs autonomous equipment.

A prerequisite supplied by another person, such as a medical order or client instruction, is not automatically signoff on Acquire. Code it only if the assessed acquisition output itself requires formal human authorization.

Patient, taxpayer, customer, or other affected-party consent counts only when it is a documented pre-effect authorization required for the assessed stage. The rationale must identify who signs and what the approval authorizes.

## 4. Reason codes

Use the controlled reason codes in `Reasons for Human Signoff`.

- `LEGAL_PROFESSIONAL_AUTHORITY`
- `ORGANIZATIONAL_GOVERNANCE`
- `LIABILITY_SAFETY`
- `RIGHTS_PRIVACY_SECURITY`
- `TRUST_ETHICS`
- `WORKFORCE_ECONOMICS`
- `OTHER_UNKNOWN`

The reason code records the primary proximate reason for the gate. If several reasons apply, use the highest-authority reason as the primary code and list material secondary reasons in the rationale. In general, an operative legal, licensing, or professional rule takes precedence over a policy or inferred motivation.

Leave the reason code blank for `not_required` and `NA`. For `IE`, leave it blank unless evidence establishes that a requirement exists but its basis is unknown; in that case use `OTHER_UNKNOWN`.

## 5. Evidence hierarchy

Use the strongest available operative authority.

1. Statute, regulation, licensing-board rule, regulator order, or official government interpretation.
2. Binding professional or accreditation standard, especially when incorporated into law, payment, licensure, or enforceable practice requirements.
3. Named contract, procurement rule, organizational policy, collective-bargaining agreement, or official operating manual.
4. Authoritative secondary explanation used only to locate or interpret the primary rule.

Model laws, model codes, model professional rules, voluntary guidance, and proposed rules are search context rather than operative authority unless the evidence also identifies the named jurisdiction or organization that has made them binding for the coded applicability scope.

A news article, vendor claim, common practice, or statement that human oversight is desirable cannot independently establish `required` or `conditional`.

Evidence must identify:

- the authority and operative rule;
- jurisdiction and applicability scope;
- the human role that must perform or approve;
- the affected AIDA stage;
- whether the gate occurs before or after effect;
- the triggering condition, if conditional; and
- important exceptions, preemption, or state/local variation.

## 6. Search and coding workflow

For each canonical task:

1. Freeze the canonical task and four stage scopes.
2. Identify the occupational endpoint and the possible human authorities associated with each stage.
3. Search federal law and regulation, then licensing and professional authorities, then state/local regimes when they materially govern the task.
4. Search documented contractual, organizational, procurement, accreditation, and labor rules only when they apply to a named and material scope.
5. Read the operative text rather than relying on a summary or search result.
6. Determine who must act, what they must approve, when approval occurs, and whether it is pre-effect.
7. Assign the requirement only to the stage or stages actually governed by the rule.
8. Search for exceptions, waivers, autonomous-operation provisions, conflicting authority, and jurisdictional limits.
9. Create one evidence record for each materially distinct rule-stage claim.
10. Derive the four summary statuses and primary reason codes from the selected evidence records.

For `not_required`, the coder must document the authority surfaces searched and why cited rules do not impose a pre-effect human gate. Silence on one webpage is insufficient. If the search cannot support the negative conclusion, use `IE`.

## 7. Workbook structure

`OccupationTask_Signoff` remains the simple task-level summary with one row per canonical task, jurisdiction, applicability scope, and assessment date. It contains four stage statuses, four primary reason codes, a concise derivation rationale, protocol version, and review status.

`OccupationTask_SignoffEvidence` stores one row per materially distinct:

> `canonical task × jurisdiction × applicability scope × AIDA stage × authority or rule × assessment date`

Each evidence record should retain:

- `signoff_evidence_id`;
- the canonical-task and scope-version identifiers;
- `jurisdiction_code` and `signoff_applicability_scope`;
- `aida_stage`;
- `formal_signoff_status_supported`;
- `signoff_reason_code`;
- `signoff_authority_type`;
- `signoff_authority_name`;
- `signoff_mechanism_code`;
- `required_human_role`;
- `conditional_trigger`;
- `signoff_evidence_url`;
- `signoff_evidence_access_date`;
- `signoff_evidence_rationale`;
- `supports_signoff_summary`;
- `protocol_version`; and
- `signoff_evidence_status`.

The summary rationale should cite the selected evidence IDs. It does not replace the stage-specific evidence record.

Use these mechanism codes in the initial release: `authenticated_order`, `licensed_performance`, `review_or_concurrence`, `signature_or_release`, `informed_consent`, `supervision_or_direction`, `inspection_or_verification`, and `organizational_approval`.

## 8. Validation rules

- Every `required` or `conditional` stage must have at least one selected evidence record and a reason code.
- Every `conditional` stage must name its trigger in the applicability scope or rationale.
- `not_required` and `NA` must have blank reason codes.
- A final Act signature does not automatically create Interpret or Decide signoff.
- An after-the-fact audit cannot establish a pre-effect signoff requirement.
- A product's voluntary gate belongs in product design unless an external rule supporting it is separately documented here.
- State or local variation that changes a stage status requires a separate later jurisdiction row.
- Summary rows must use the same canonical-task set and task-scope versions as the capability table.

## 9. Quality control before scaling

The original five-occupation calibration and the 80-occupation initial-release expansion are non-blinded. Before treating these measurements as publication-validated:

1. independently double-code a sample spanning all reason families and stage statuses;
2. adjudicate disagreements about stage attribution, conditionality, and jurisdiction;
3. report agreement separately for status and reason code;
4. preserve a decision log for recurring rule types; and
5. version the protocol whenever a definition or coding rule changes.
