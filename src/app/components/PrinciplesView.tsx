import { useEffect, useRef, useState } from 'react'
import { usePostHog } from 'posthog-js/react'
import { PrincipleCard } from './PrincipleCard'
import { CategoryMenu } from './CategoryMenu'
import {
  Eye,
  BarChart2,
  GitBranch,
  ShieldAlert,
  RefreshCw,
  Radar,
  Sliders,
  Bot,
  Layers,
  Activity,
  Monitor,
  Scale,
  ScrollText,
  Brain,
  Network,
  Rocket,
  Database,
  MessageSquare,
  Gauge,
  BookOpen,
  Share2,
  AlertTriangle,
  LifeBuoy,
  GitMerge,
  BellRing,
  TrendingUp,
  FlaskConical,
  MousePointerClick,
  FastForward,
  Zap,
  Tag,
  ToggleLeft,
  GitCompare,
  PenLine,
  Sparkles,
  ListTree,
  ShieldCheck,
  ClipboardList,
  UserCheck,
  Lock,
  FileSearch,
  Gavel,
  RefreshCcw,
  Heart,
  Library,
  Languages,
  FolderKey,
  EyeOff,
  BadgeInfo,
  ShieldX,
  ScanFace,
  SlidersHorizontal,
  ToggleRight,
  Crown,
  Cpu,
  GraduationCap,
  Info,
  KeyRound,
  type LucideIcon,
} from 'lucide-react'

interface Principle {
  group: string
  name: string
  description: string
  example: string
}

const principles: Principle[] = [
  {
    group: 'Explanation & Interpretability',
    name: 'Progressive Disclosure (Telescope Pattern)',
    description:
      'Information is layered by starting with a concise summary, then offering detailed visualizations, and finally providing technical diagnostics upon request. This manages cognitive load by hiding complexity until it is functionally necessary.',
    example:
      'A "Thoughts" tab in a RAG system that shows a high-level answer, but allows the user to expand and see specific retrieved database rows.',
  },
  {
    group: 'Explanation & Interpretability',
    name: 'Confidence Scoring & N-Likely Options',
    description:
      'Instead of a single "correct" answer, the system displays the top candidate results accompanied by associated probability scores. This helps users calibrate their reliance on the AI based on the system\'s own self-assessment of uncertainty.',
    example:
      'A sensitivity analysis tool for financial analysts showing three potential "What-If" outcomes, each with an associated likelihood percentage.',
  },
  {
    group: 'Explanation & Interpretability',
    name: 'Counterfactual Framing ("What-If")',
    description:
      'This uses "what-if" examples to demonstrate how changing a specific input would have altered the AI\'s final decision. It helps users build a mental model of the system\'s causal logic through experimentation.',
    example:
      'A loan approval tool that informs a user, "If your debt-to-income ratio was 5% lower, this application would have been approved".',
  },
  {
    group: 'Explanation & Interpretability',
    name: 'Multi-Channel Explanations',
    description:
      'Explanations should be delivered through the medium best suited to the content and audience — combining narrative prose, interactive charts, diagrams, or audio rather than defaulting to a single format. Matching the channel to the cognitive style of the user increases comprehension and retention.',
    example:
      'A financial dashboard that pairs a plain-language paragraph summarising a revenue trend with an interactive line chart, letting executives read the story while analysts explore the underlying data.',
  },
  {
    group: 'Explanation & Interpretability',
    name: 'Audience-Calibrated Confidence Display',
    description:
      'Model confidence or uncertainty should be surfaced in a form appropriate to the audience — numerical probabilities for expert users, qualitative labels or iconography for non-technical ones — so that trust is neither over- nor under-assigned to the AI\'s outputs.',
    example:
      'A medical AI that shows a radiologist a raw probability score (0.87) but presents a referring physician with a simple \'High confidence\' badge for the same finding.',
  },
  {
    group: 'Explanation & Interpretability',
    name: 'Explanation Depth Calibration',
    description:
      'The completeness and technical depth of an explanation should scale to the user\'s mental model, trading off exhaustiveness for clarity as needed. An expert requires full fidelity; a novice requires a simplified, accurate approximation that supports correct action.',
    example:
      'A recommendation engine that gives a data scientist full feature-weight breakdowns but gives a marketing manager a simple \'Because you liked X\' rationale for the same output.',
  },
  {
    group: 'Explanation & Interpretability',
    name: 'Causal Transparency',
    description:
      'Where AI decisions have meaningful downstream consequences, explanations should illuminate the causal chain — using tools such as partial dependence plots, Shapley values, or LIME — so that users understand why an output was produced, not just what it is.',
    example:
      'A credit-scoring tool that presents a SHAP waterfall chart showing how each applicant attribute (income, tenure, debt ratio) individually contributed to the final score.',
  },

  {
    group: 'Graceful Degradation & Error Handling',
    name: 'Adjustable Levels of Automation (LoA)',
    description:
      'This principle allows users to shift between full automation and manual oversight based on task stakes or environmental uncertainty. It prevents the "all-or-nothing" automation trap by keeping the human in control during edge cases.',
    example:
      'An industrial drone system that operates autonomously for routine inspections but triggers a manual pilot "handshake" when detecting structural anomalies.',
  },
  {
    group: 'Graceful Degradation & Error Handling',
    name: 'Graceful Failure with Clear Next Steps',
    description:
      'When AI confidence is low or data is missing, the system should pivot to standard deterministic solutions rather than showing an empty error state. It ensures the user can continue their workflow without being blocked by an AI malfunction.',
    example:
      'A data quality monitor that flags an "offline" model and automatically reverts the dashboard to show standard threshold-based alerts.',
  },
  {
    group: 'Graceful Degradation & Error Handling',
    name: 'Situation Awareness (SA) Preservation',
    description:
      'Even as AI automates more tasks, design the system to keep the human meaningfully "in the loop" — with enough contextual understanding to detect anomalies and reclaim manual control quickly and safely if the system fails.',
    example:
      'An industrial monitoring system that periodically asks the operator to verify a routine data point, ensuring they remain attentive and can take over instantly if the AI goes offline.',
  },
  {
    group: 'Graceful Degradation & Error Handling',
    name: 'Cost-of-Failure Quantification',
    description:
      'Different failure modes carry asymmetric costs, and the system design should make those trade-offs explicit. In some use cases a false positive is far more harmful than a false negative (or vice versa), so thresholds, alerts, and human-override triggers must be calibrated to the true cost structure of the domain.',
    example:
      'A medical screening AI that treats a missed cancer diagnosis (false negative) as far costlier than an unnecessary biopsy (false positive), and therefore lowers its classification threshold and surfaces explicit cost-of-error estimates alongside each prediction.',
  },
  {
    group: 'Graceful Degradation & Error Handling',
    name: 'Human-Readable Error Recovery',
    description:
      'Error messages must be written in plain language that explains what went wrong, why it matters, and — critically — what concrete steps the user can take to recover. Technical stack traces or opaque codes are never sufficient on their own.',
    example:
      'A data pipeline tool that replaces a raw exception with: "We couldn\'t process last night\'s sales file because a required column is missing. You can upload a corrected file, skip this run, or contact support," with one-click buttons for each option.',
  },
  {
    group: 'Graceful Degradation & Error Handling',
    name: 'Contingency Design for Data Gaps',
    description:
      'Rather than halting silently when data is sparse, missing, or out of distribution, the system should offer the user meaningful options — such as proceeding with synthetic data, applying conservative defaults, pausing the workflow, or flagging the gap for manual review — and be transparent about the trade-offs of each path.',
    example:
      'A demand-forecasting dashboard that detects a missing week of sales data and presents the analyst with three labelled choices: use AI-imputed estimates (with uncertainty bounds), extrapolate from the prior period, or pause the forecast run until data is restored.',
  },
  {
    group: 'Graceful Degradation & Error Handling',
    name: 'Low-Confidence Alerting',
    description:
      'The system must proactively surface low or degraded model confidence rather than presenting uncertain outputs with the same visual weight as high-confidence ones. Crucially, confidence indicators should communicate uncertainty about a specific prediction — not overall model quality — to prevent users from conflating the two.',
    example:
      'A fraud-detection tool that displays a distinct amber \'Low confidence\' banner on flagged transactions below a calibrated threshold, accompanied by a tooltip clarifying that confidence reflects data uncertainty for this transaction, not a signal that the model is broken.',
  },
  {
    group: 'Graceful Degradation & Error Handling',
    name: 'Model Monitoring for Drift & Freshness',
    description:
      'Deployed models should be continuously monitored for data drift, concept drift, data freshness, and version integrity so that degraded performance is detected and surfaced before it silently affects users. Monitoring state should be visible to operators, not hidden in back-end logs.',
    example:
      'A churn-prediction platform that displays a real-time health dashboard showing days since last retraining, input-feature distribution drift scores, and a traffic-light status for each production model version — triggering an alert when any metric crosses a defined threshold.',
  },
  {
    group: 'Graceful Degradation & Error Handling',
    name: 'Model Robustness Testing',
    description:
      'Models should be validated against diverse, real-world data that reflects the full range of edge cases, demographic subgroups, and environmental conditions they will encounter in production — not just the curated benchmarks used in academic evaluation.',
    example:
      'A computer-vision quality-control system tested exclusively against its supplier\'s standard images is also stress-tested on images from night shifts, different camera models, and seasonal lighting variations before deployment, revealing a 20% accuracy drop that was then corrected.',
  },

  {
    group: 'Interaction, Output & Display',
    name: 'Mixed-Initiative Co-Creation',
    description:
      'This establishes a bidirectional "dialogue" where both the human and AI can proactively suggest actions or interruptions to solve a problem. It shifts the AI from a one-way execution tool to a collaborative "co-pilot" partner.',
    example:
      'A CAD design tool where the AI suggests optimized beam placements while the designer provides the high-level aesthetic intent.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'User Control Over Randomness',
    description:
      'Providing a "temperature" or randomness setting allows users to tune the AI\'s output between creative exploration and literal adherence. This is vital for aligning the model\'s behavior with the specific phase of the professional workflow.',
    example:
      'A "High" setting used during a brainstorming session for new layouts, while a "Low" setting is used for precise, code-compliant plumbing diagrams.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Human-Autonomy Teaming (HAT)',
    description:
      'Treat the AI as an interdependent partner with distinct, negotiable roles rather than a passive tool. Roles shift dynamically based on task complexity, stakes, or the user\'s current cognitive state, enabling true human-AI collaboration.',
    example:
      'In a remote drone operation, the AI manages navigation autonomously while the human focuses on target recognition — with roles swapping automatically if signal latency spikes.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Workload-Aware Interfaces',
    description:
      'Implement AI that monitors user stress or attention levels — through interaction cadence, error rates, or physiological signals — and simplifies its output or defers non-critical notifications during periods of high cognitive demand.',
    example:
      'An aviation control room AI that filters out low-priority alerts when it detects a pilot is engaged in a high-complexity landing procedure, restoring full detail once workload normalizes.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Information Chunking & Hierarchy',
    description:
      'Information is organized into meaningful groups that align with human memory limitations, typically avoiding more than seven key points at once. This reduces extraneous cognitive load and helps users process complex dashboards effectively.',
    example:
      'An incident dashboard that intelligently bundles thousands of individual data quality alerts into a few manageable "Cases" for review.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Interactivity Over Static Reporting',
    description:
      'Deep human understanding of AI outputs arises from active exploration, not passive reading. Systems should favour interactive controls — filters, drill-downs, parameter adjustments, and live comparisons — over fixed reports that can only be observed, not interrogated.',
    example:
      'A sales-forecasting tool replaces a static PDF report with a live dashboard where managers can adjust growth assumptions and immediately see how the forecast model responds, building genuine intuition for the drivers.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Feed-Forward Previews',
    description:
      'Before a user commits to an irreversible or high-impact action — such as retraining a model, bulk-editing records, or running a long pipeline — the system should show a preview of the expected outcome, scope, and consequences. This shifts understanding from reactive (what happened?) to anticipatory (what will happen?).',
    example:
      'A data-transformation tool that displays a "Preview changes" panel showing exactly which 4,200 rows will be overwritten, with a diff of the first ten records, before the user clicks Confirm.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Actionability as an Explanation Heuristic',
    description:
      'An explanation is only valuable if it enables the user to act. When evaluating or designing explanations, ask: given this information, what can the user concretely do differently? If the answer is nothing, the explanation is insufficiently actionable and should be redesigned.',
    example:
      'A supply-chain AI replaces a vague \'Demand anomaly detected\' alert with \'Demand for SKU-4821 is 34% above forecast — consider pulling forward next week\'s reorder by 3 days,\' giving the planner an immediate, specific decision to make.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Output Annotation as Prompt Input',
    description:
      'Users should be able to select, highlight, or annotate specific features of a model\'s output — labelling what is correct, incorrect, or worth exploring further — and have those annotations fed back into the context window as part of the next prompt. This closes the loop between human judgment and model refinement.',
    example:
      'A legal-document AI lets a lawyer highlight a clause and tag it \'Too broad — tighten scope.\' That annotation is automatically appended to the next generation request, producing a revised clause that directly reflects the lawyer\'s intent.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Prompt–Manipulation Duality',
    description:
      'Users should be able to switch fluidly between natural-language prompting and direct manipulation of the output artifact. Both modes should update the same underlying state, so the user can choose whichever interaction style best fits their current task and expertise level.',
    example:
      'A data-visualisation tool lets an analyst either type \'Change the y-axis to log scale\' or simply drag the axis label to toggle scale — both actions update the chart and the prompt history identically.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Visual Diffing of Outputs',
    description:
      'When the AI produces multiple candidate outputs or a revised version of a prior output, salient similarities and differences should be highlighted visually — using colour, annotation, or side-by-side layout — so users can evaluate changes without re-reading the entire artifact.',
    example:
      'A contract-drafting assistant shows a side-by-side diff of two generated clause variants, with additions in green and deletions in red, letting a lawyer approve the better version in seconds rather than reading both in full.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Co-Creation & Editable Artifacts',
    description:
      'Model outputs should be treated as first drafts, not final deliverables. Users must be able to directly edit any artifact the model produces, and those edits should automatically enter the context window so future model generations remain consistent with the human\'s refinements.',
    example:
      'A marketing-copy AI generates an email draft; the copywriter edits the subject line and rewrites the CTA inline. Those edits are stored in context so the next generation of body copy matches the corrected tone and call-to-action without re-prompting.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Causal Animation & Motion',
    description:
      'Animation and motion should be used purposefully to illustrate cause-and-effect relationships — showing how a change in one variable propagates through a system — rather than purely for aesthetic reasons. Motion makes abstract causal chains perceptible and memorable.',
    example:
      'A financial-risk model animates how increasing an interest-rate assumption ripples through projected cash flows, highlighting each downstream variable as it updates, so analysts viscerally understand the chain of impact rather than just comparing two static numbers.',
  },
  {
    group: 'Interaction, Output & Display',
    name: 'Scaled Chain-of-Thought',
    description:
      'The verbosity of a model\'s reasoning trace should be calibrated to the use case. Full chain-of-thought is valuable for auditing, governance, and debugging; it is often counterproductive in consumer-facing or time-pressured contexts. Design controls that let the appropriate audience choose the depth of reasoning they need.',
    example:
      'A compliance-review AI shows auditors a full step-by-step reasoning log for each decision, but presents front-line agents with only a one-sentence verdict and confidence level — both views drawing from the same underlying reasoning without cluttering the simpler interface.',
  },

  {
    group: 'Fairness, Ethics & Transparency',
    name: 'Audit Trails & Traceability',
    description:
      'The system maintains clear, automated logs of AI-driven actions and the specific data sources utilized to enable post-hoc analysis and accountability. This is essential for regulatory compliance and debugging failures in high-stakes enterprise environments.',
    example:
      'A model management pipeline that includes downloadable "Model Cards" outlining training parameters, data lineages, and deployment history.',
  },
  {
    group: 'Fairness, Ethics & Transparency',
    name: 'Risk-Based UX Thresholds',
    description:
      'Adjust the intrusiveness of AI interventions, the depth of explanations, and the required confirmation steps proportionally to the risk level of the specific use case. Low-stakes tasks get frictionless automation; high-stakes actions get guardrails.',
    example:
      'A chatbot answering HR benefits questions requires minimal transparency controls, whereas an AI used for hiring decisions or loan approvals triggers detailed audit prompts and mandatory human review.',
  },
  {
    group: 'Fairness, Ethics & Transparency',
    name: 'Moral Standards as Guardrails',
    description:
      'Ethical constraints appropriate to the application\'s domain and use case should be encoded as explicit, auditable guardrails — not left as implicit assumptions in the model. These guardrails define the boundaries of acceptable AI behaviour and should be visible, testable, and updatable as societal standards evolve.',
    example:
      'A content-moderation AI for a children\'s platform encodes age-appropriate standards as a hard rule layer that overrides model outputs, with each guardrail documented, version-controlled, and reviewed quarterly by a cross-functional ethics board.',
  },
  {
    group: 'Fairness, Ethics & Transparency',
    name: 'Training Data Transparency',
    description:
      'Users should be able to access clear, plain-language information about what data a model was trained on — including its sources, time range, known gaps, and any demographic or geographic skews. Opacity about training data erodes trust and prevents users from assessing the model\'s relevance to their context.',
    example:
      'A medical diagnosis AI surfaces a \'Data provenance\' panel that discloses its training corpus (e.g., 2.4 million de-identified US hospital records, 2015–2022), notes underrepresentation of paediatric cases, and links to the full dataset documentation.',
  },
  {
    group: 'Fairness, Ethics & Transparency',
    name: 'Equal Accuracy Across Languages & Groups',
    description:
      'Models should perform with equivalent accuracy regardless of the language, dialect, or demographic group of the input. Where parity cannot be achieved, the system must proactively flag the disparity in its response rather than silently delivering lower-quality outputs to underserved groups.',
    example:
      'A multilingual customer-support AI detects that its confidence on a Spanish-language query falls below a parity threshold and appends a visible notice: \'This response was generated with lower confidence than English equivalents — please verify with a specialist.\'',
  },
  {
    group: 'Fairness, Ethics & Transparency',
    name: 'Data Ownership & Use Transparency',
    description:
      'Users should be given explicit, plain-language disclosure of exactly how their data is used by the model — including personalisation, integrated third-party data sources, and any downstream use. Consent mechanisms should be granular, revocable, and easy to find rather than buried in terms of service.',
    example:
      'An AI productivity tool presents a \'Your data\' dashboard showing which features use personal history for personalisation, which connect to integrated calendar and email sources, and a per-feature toggle allowing users to opt out of any data use without losing access to the core product.',
  },
  {
    group: 'Fairness, Ethics & Transparency',
    name: 'Data Privacy & Tenant Isolation',
    description:
      'There must be strict isolation between users, customers, and tenants — with zero tolerance for data leakage across boundaries. When anonymised user data is used for model training or industry benchmarking, this must be disclosed transparently, with clear opt-out mechanisms, rather than assumed as a default right of the platform.',
    example:
      'A B2B analytics AI enforces tenant-level data partitioning at the infrastructure layer and displays a notice when a user\'s anonymised aggregate data contributes to cross-industry benchmarks, with a one-click opt-out that is honoured within 24 hours and confirmed by email.',
  },

  {
    group: 'Theory of Mind',
    name: 'Intent-Aligned Personalization',
    description:
      'Use iterative user feedback to continuously refine the AI\'s understanding of domain-specific jargon, individual preferences, and workflow patterns. The system grows more contextually accurate over time rather than remaining static.',
    example:
      'A legal assistant AI that learns to prioritize specific case law precedents based on a particular lawyer\'s prior research and annotation history.',
  },
  {
    group: 'Theory of Mind',
    name: 'Transactive Memory (Expertise Mapping)',
    description:
      'The AI learns "who knows what" within the organization and automatically routes high-complexity tasks to the appropriate human expert. This ensures that the AI serves as a bridge to human knowledge rather than an isolated silo.',
    example:
      'A technical Slack bot that identifies a query it cannot answer and automatically pings the engineer who authored that specific documentation.',
  },
  {
    group: 'Theory of Mind',
    name: "Don't Anthropomorphize",
    description:
      'The AI should never present itself in ways that encourage users to attribute human emotions, consciousness, or moral agency to it. Language, interface design, and onboarding should actively frame the AI as a powerful tool — not a companion, friend, or sentient entity — to prevent unhealthy dependency and misplaced trust.',
    example:
      'An AI assistant avoids phrases like \'I feel\' or \'I think\' and instead uses \'Based on the data…\' or \'This analysis suggests…\'. Onboarding explicitly states: \'This is an AI tool — it does not have opinions, feelings, or intentions.\'',
  },
  {
    group: 'Theory of Mind',
    name: 'Explicit Self-Representation & Persona Switching',
    description:
      'The AI should represent itself accurately according to the usage context — a \'trusted advisor\' persona behaves and communicates differently from a \'teacher\' or \'analyst\' persona. Users should be able to switch between clearly defined personas, with the active persona always visible, so they understand the relational frame and expectations of the current interaction.',
    example:
      'A professional development platform lets users toggle between \'Coach\' (asks guiding questions, withholds answers), \'Mentor\' (shares experience-based recommendations), and \'Expert\' (delivers direct, authoritative answers) — with a persistent label in the UI showing the current mode and a one-sentence description of what to expect from it.',
  },
  {
    group: 'Theory of Mind',
    name: 'Corrective Control & Anti-Sycophancy',
    description:
      'The AI should calibrate the degree of pushback it provides when a user makes a choice the model assesses as suboptimal, risky, or factually incorrect — neither acquiescing silently (sycophancy) nor overriding user agency aggressively. The appropriate level of challenge should be proportional to the stakes of the decision and the user\'s stated expertise level.',
    example:
      'A financial planning AI, when a user selects a highly concentrated investment allocation, does not simply validate the choice. It surfaces a concise risk notice (\'This portfolio has 80% in a single sector — historically associated with higher volatility\'), offers an alternative, and records the user\'s acknowledged override — but ultimately respects the user\'s decision.',
  },
  {
    group: 'Theory of Mind',
    name: 'Implicit User Modelling',
    description:
      'The AI should use second and third-order inference to build a working mental model of the user from behavioural signals — query patterns, vocabulary, topics of interest, and interaction history — rather than requiring explicit profile setup. This allows the system to tailor responses to the inferred context of the user without burdening them with configuration.',
    example:
      'A health information AI that receives repeated questions about managing arthritis, fall prevention, and medication interactions infers it is likely speaking with an elderly user or a caregiver, and adjusts its reading level, example choices, and recommended next steps accordingly — without asking the user to identify themselves.',
  },
  {
    group: 'Theory of Mind',
    name: 'Transparent & Controllable Mental Model',
    description:
      "Users should be able to inspect what the AI believes it knows about them, explicitly correct or update those inferences, and — if they prefer — disable user modelling entirely. The AI's mental model of the user should never be a hidden, immutable black box; user agency over their own representation is a baseline right.",
    example:
      'An AI productivity tool surfaces a \'How I see you\' panel showing its current inferences (e.g., \'I think you\'re a project manager working in software\'). The user can edit any inference, add context, or toggle \'Don\'t build a profile of me\' — which immediately switches the AI to a stateless, context-free interaction mode.',
  },

  {
    group: 'Adoption',
    name: 'The "Concept Car" Roadmap',
    description:
      'This uses high-fidelity prototypes to envision the "North Star" product vision while clearly defining the boundaries of the current MVP. It aligns stakeholders on long-term goals while preventing immediate over-reliance on emerging tech.',
    example:
      'A detailed product roadmap for a RAG system that envisions a full enterprise solution but prioritizes an initial chat-with-data prototype.',
  },
  {
    group: 'Adoption',
    name: 'AI Opt-Out by Default',
    description:
      'Users should always have the ability to opt out of AI-powered features without losing access to core functionality. Opting out should be straightforward, persistent, and respected across sessions — not buried in settings or reversed silently by updates.',
    example:
      'A writing platform lets users disable AI suggestions on a per-document or global basis via a clearly labelled toggle in the toolbar. The preference persists across sessions and is never reset by product updates without explicit user re-confirmation.',
  },
  {
    group: 'Adoption',
    name: 'Human Over the Loop',
    description:
      'By default, humans should remain in ultimate control of any AI-assisted workflow. The AI should operate in an advisory or assistive capacity unless the user has explicitly and deliberately handed control over a defined scope of tasks. This default prevents automation complacency and preserves user agency.',
    example:
      'An AI scheduling assistant suggests meeting times and waits for the user to confirm before sending invites. It only books autonomously if the user has explicitly activated an \'Auto-book\' mode, which displays a persistent indicator that autonomous scheduling is active.',
  },
  {
    group: 'Adoption',
    name: 'Scoped AI Autonomy with Safe Halting',
    description:
      'When a user delegates control to the AI, that delegation should be bounded to a specific, well-defined task scope — not treated as a blanket permission. Outside that scope, or whenever the AI encounters uncertainty it cannot resolve with sufficient confidence, it must halt or skip the action and alert a human rather than guessing.',
    example:
      'An AI agent authorised to categorise and file incoming invoices halts and sends a human notification when it encounters an invoice format it hasn\'t seen before, rather than misfiling it. The alert includes its best guess, its confidence level, and a one-click approval or correction path.',
  },
  {
    group: 'Adoption',
    name: 'Progressive Autonomy via the Adoption Curve',
    description:
      'AI adoption should be treated as a progression, not a binary switch. Use design techniques — smart defaults, suggested actions, limited autonomy with easy override — to build user confidence and competence incrementally. Progress toward greater autonomy only as trust is established and validated through demonstrated accuracy in context.',
    example:
      'A procurement AI starts by highlighting recommended suppliers for review (assisted mode). After 30 days of consistent user approvals, it progresses to auto-drafting purchase orders for human sign-off (supervised mode). After six months of validated accuracy, users may opt into fully autonomous ordering within defined budget thresholds (autonomous mode).',
  },
  {
    group: 'Adoption',
    name: 'Evolving Mental Model Support',
    description:
      "As users gain AI maturity — and as the underlying technology evolves — their mental models of what the AI can and cannot do need to evolve with them. Proactively design onboarding, contextual education, and model-change communications that help users update their understanding rather than operating on outdated assumptions.",
    example:
      'When a platform upgrades its underlying model, it sends users a concise \'What changed for you\' summary highlighting new capabilities, newly deprecated behaviours, and specific workflow tips — rather than a generic changelog — so users can immediately recalibrate their expectations.',
  },
  {
    group: 'Adoption',
    name: 'Active Expectation Management',
    description:
      'AI systems should be designed to help users understand their limitations — including the conditions under which they perform best and worst — rather than presenting a uniformly confident face. Proactively surfacing known failure modes, edge cases, and out-of-scope inputs reduces over-reliance and builds calibrated trust.',
    example:
      'An AI contract-review tool displays a persistent \'Works best for\' panel noting it was trained on English-language commercial contracts and performs less reliably on construction or IP agreements. When a user uploads a document outside that scope, a contextual warning appears before the analysis runs.',
  },

  {
    group: 'Data',
    name: 'Pattern Visibility & Visualization',
    description:
      'Underlying relationships in complex data are made visible through interactive visualizations, supporting human pattern recognition rather than hiding it. This leverages the human operator\'s domain expertise to validate AI findings.',
    example:
      'A scatter plot in the Robustness Gym that allows researchers to quickly compare model performance across different problem classes.',
  },

  {
    group: 'Governance, Guardrails & Auditability',
    name: 'Model Cards & Datasheets',
    description:
      'Every deployed model should be accompanied by a structured, human-readable document — a model card — that records its intended use, training data sources, known limitations, performance benchmarks, and demographic fairness evaluations. This makes accountability a first-class artifact of the deployment process.',
    example:
      'A hiring-screening AI ships with a model card that discloses the demographic composition of its training set, per-group accuracy disparities, out-of-scope use cases, and a contact owner for governance questions — reviewed and signed off before each production release.',
  },
  {
    group: 'Governance, Guardrails & Auditability',
    name: 'Human-in-the-Loop Checkpoints',
    description:
      'High-stakes or irreversible AI decisions should require an explicit human approval step before they take effect. Checkpoints must be designed so that humans are genuinely reviewing evidence — not rubber-stamping — by surfacing the right context at the moment of decision.',
    example:
      'A credit-decisioning system flags applications that score within 5 points of the approval threshold for mandatory analyst review, presenting the top contributing features and a one-click override with a required free-text rationale that is logged to the audit trail.',
  },
  {
    group: 'Governance, Guardrails & Auditability',
    name: 'Policy-Enforced Output Guardrails',
    description:
      'Explicit, auditable rules should constrain the output space of AI systems operating in regulated or high-risk domains — preventing the model from producing responses that violate legal, ethical, or organisational policy even if the underlying model is capable of generating them.',
    example:
      'A customer-service LLM for a financial institution has a rule layer that automatically blocks any response containing specific investment advice, redacts account numbers from transcripts, and escalates queries that contain keywords associated with financial hardship to a human agent.',
  },
  {
    group: 'Governance, Guardrails & Auditability',
    name: 'Immutable Audit Logs',
    description:
      'Every consequential AI action — prediction made, override triggered, parameter changed, model version swapped — should be recorded in a tamper-evident log that captures who acted, when, on what data, and with what outcome. Logs should be queryable by auditors without requiring access to production systems.',
    example:
      'A fraud-detection platform writes every model score, analyst override, and threshold change to an append-only ledger with a cryptographic hash chain. Quarterly audits are run against a read-only replica, producing a full lineage report without touching live infrastructure.',
  },
  {
    group: 'Governance, Guardrails & Auditability',
    name: 'Explainability-by-Default for Regulated Decisions',
    description:
      'In domains where regulations require justification for automated decisions — such as credit, hiring, healthcare, or criminal justice — explainability should be architecturally guaranteed, not an optional add-on. The system must be able to produce a legally defensible rationale for any decision, on demand.',
    example:
      'A consumer-lending platform built under GDPR Article 22 automatically generates a plain-language adverse-action notice for every declined application, citing the top three contributing factors and the applicant\'s right to request human review — generated from the same model pipeline rather than hand-crafted post-hoc.',
  },
  {
    group: 'Governance, Guardrails & Auditability',
    name: 'Role-Based Access & Least Privilege',
    description:
      'Access to AI model internals, training data, prompt configurations, and override capabilities should be governed by role-based permissions that enforce the principle of least privilege. Different stakeholders — end users, analysts, model owners, and auditors — should see only what they need to perform their function.',
    example:
      'A clinical AI platform grants bedside nurses read-only access to model recommendations, gives attending physicians the ability to override and annotate, and restricts access to training data lineage and model weights to a dedicated ML governance team — all enforced at the API layer with a full access log.',
  },
  {
    group: 'Governance, Guardrails & Auditability',
    name: 'Governance Lifecycle Management',
    description:
      'AI systems should have a defined, enforced lifecycle — from initial risk assessment through deployment approval, periodic review, and eventual decommission. Governance gates at each stage ensure that models do not outlive their validity or drift silently out of compliance.',
    example:
      'An insurance underwriting model goes through a mandatory 90-day post-deployment review, an annual fairness re-evaluation, and an automatic deprecation trigger if its Gini coefficient drops below a defined threshold — with each stage requiring sign-off from both the model owner and the risk committee.',
  },
  {
    group: 'Governance, Guardrails & Auditability',
    name: 'Token Usage Guardrails & Sub-Agent Recursion Limits',
    description:
      'Multi-agent and agentic AI systems must enforce hard limits on recursive sub-agent invocation depth, total token consumption per task, and cumulative cost per session or user. Without these guardrails, a single malformed prompt or runaway orchestration loop can consume unbounded compute resources, degrade service for other users, and generate unexpected cost exposure.',
    example:
      'An agentic coding assistant enforces a maximum recursion depth of 5 sub-agent calls and a per-task token budget of 50,000 tokens. When either limit is approached, it surfaces a warning and halts before the threshold is breached — presenting the user with a summary of work completed, the reason for stopping, and options to continue manually, increase the budget explicitly, or decompose the task into smaller scoped requests.',
  },
  {
    group: 'Governance, Guardrails & Auditability',
    name: 'Model Permissions as Service Accounts',
    description:
      'AI models — especially agentic ones — should be treated as service accounts with tightly scoped, explicitly granted permissions, not as trusted principals with broad ambient access. A model should only be able to read, write, or act on the resources it demonstrably needs for the current task.',
    example:
      'An AI email assistant requests only \'read inbox\' and \'send on behalf of\' permissions at onboarding. When the user enables calendar scheduling, a separate explicit consent prompt is shown for \'read/write calendar\'. The permissions dashboard lists every active grant, its scope, when it was approved, and a one-click revoke button — mirroring the mental model of OAuth scopes that developers already understand.',
  },
]

const groupConfig: Record<
  string,
  { icons: LucideIcon[]; color: string }
> = {
  'Explanation & Interpretability': {
    icons: [Eye, BarChart2, GitBranch, MessageSquare, Gauge, BookOpen, Share2],
    color: '#8B5CF6',
  },
  'Graceful Degradation & Error Handling': {
    icons: [ShieldAlert, RefreshCw, Radar, AlertTriangle, LifeBuoy, GitMerge, BellRing, TrendingUp, FlaskConical],
    color: '#F97316',
  },
  'Interaction, Output & Display': {
    icons: [Sliders, Bot, Layers, Activity, Monitor, MousePointerClick, FastForward, Zap, Tag, ToggleLeft, GitCompare, PenLine, Sparkles, ListTree],
    color: '#3B82F6',
  },
  'Fairness, Ethics & Transparency': {
    icons: [Scale, ScrollText, Heart, Library, Languages, FolderKey, EyeOff],
    color: '#10B981',
  },
  'Governance, Guardrails & Auditability': {
    icons: [ShieldCheck, ClipboardList, UserCheck, Lock, FileSearch, Gavel, RefreshCcw, Cpu, KeyRound],
    color: '#6366F1',
  },
  'Theory of Mind': {
    icons: [Brain, Network, Bot, BadgeInfo, ShieldX, ScanFace, SlidersHorizontal],
    color: '#EC4899',
  },
  Adoption: {
    icons: [Rocket, ToggleRight, Crown, Cpu, TrendingUp, GraduationCap, Info],
    color: '#F59E0B',
  },
  Data: {
    icons: [Database],
    color: '#06B6D4',
  },
}

function groupToId(group: string) {
  return group.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export function PrinciplesView() {
  const posthog = usePostHog()
  const [menuOpen, setMenuOpen] = useState(true)
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement>>({})

  const groupedPrinciples = principles.reduce(
    (acc, principle) => {
      if (!acc[principle.group]) acc[principle.group] = []
      acc[principle.group].push(principle)
      return acc
    },
    {} as Record<string, Principle[]>,
  )

  const groups = Object.entries(groupedPrinciples).map(([group, items]) => ({
    label: group,
    id: groupToId(group),
    color: groupConfig[group].color,
    count: items.length,
    icon: groupConfig[group].icons[0],
  }))

  // Track active section via IntersectionObserver
  useEffect(() => {
    const NAVBAR_HEIGHT = 56
    const observers: IntersectionObserver[] = []

    groups.forEach(({ id }) => {
      const el = sectionRefs.current[id]
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveGroup(id)
        },
        {
          rootMargin: `-${NAVBAR_HEIGHT}px 0px -60% 0px`,
          threshold: 0,
        },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function scrollToGroup(id: string) {
    const el = sectionRefs.current[id]
    if (!el) return
    const NAVBAR_HEIGHT = 56
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT - 24
    window.scrollTo({ top, behavior: 'smooth' })
    posthog.capture('category_nav_clicked', { category: id })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Sticky sidebar */}
        <CategoryMenu
          groups={groups}
          activeGroup={activeGroup}
          isOpen={menuOpen}
          onToggle={() => setMenuOpen((v) => !v)}
          onSelect={scrollToGroup}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0 px-6 py-12 lg:px-10">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Design Principles</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A comprehensive guide to designing human-centered AI systems that prioritize
              collaboration, transparency, and reliability
            </p>
          </header>

          <div className="space-y-12">
            {Object.entries(groupedPrinciples).map(([group, groupPrinciples]) => {
              const config = groupConfig[group]
              const id = groupToId(group)

              return (
                <section
                  key={group}
                  id={id}
                  ref={(el) => { if (el) sectionRefs.current[id] = el }}
                  className="space-y-6 scroll-mt-20"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1 h-8 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <h2 className="text-2xl font-semibold text-gray-900">{group}</h2>
                    <span
                      className="text-sm px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${config.color}15`,
                        color: config.color,
                      }}
                    >
                      {groupPrinciples.length}{' '}
                      {groupPrinciples.length === 1 ? 'principle' : 'principles'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupPrinciples.map((principle, index) => {
                      const Icon = config.icons[index % config.icons.length]
                      return (
                        <PrincipleCard
                          key={principle.name}
                          name={principle.name}
                          description={principle.description}
                          example={principle.example}
                          icon={Icon}
                          accentColor={config.color}
                          onView={() =>
                            posthog.capture('principle_viewed', {
                              principle_name: principle.name,
                              group: principle.group,
                            })
                          }
                        />
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
