import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

interface ProcessStep {
  number: string
  title: string
  body: string
}

interface Stat {
  value: string
  label: string
}

interface ServiceData {
  slug: string
  eyebrow: string
  headline: string
  subhead: string
  problem: string
  approachTitle: string
  approach: string
  process: ProcessStep[]
  stats: Stat[]
  deliverables: string[]
}

function ServicePageTemplate({ data }: { data: ServiceData }) {
  return (
    <div className="min-h-screen bg-navy-900 font-sans text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-5">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back
        </Link>
        <Link to="/" className="font-black font-display text-sm uppercase tracking-tighter">
          Brian Cliette
        </Link>
        <a
          href="mailto:brian@briancliette.me"
          className="text-xs font-black uppercase tracking-tighter bg-[#2563EB] text-white rounded-full px-4 py-[7px] hover:bg-white hover:text-[#080808] transition-colors duration-200"
        >
          Let's Talk
        </a>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[10px] uppercase tracking-widest text-[#2563EB] mb-8">{data.eyebrow}</div>
          <h1 className="text-4xl sm:text-5xl md:text-[10vw] font-black font-display tracking-tighter uppercase leading-none mb-8 max-w-5xl">
            {data.headline}
          </h1>
          <p className="text-lg md:text-xl font-light opacity-60 leading-relaxed max-w-2xl">
            {data.subhead}
          </p>
        </motion.div>
      </section>

      {/* Problem */}
      <section className="py-24 px-6 md:px-12 border-b border-white/5">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#2563EB] mb-6">The Problem</div>
            <h2 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tighter leading-tight">
              Most programs fail before they start.
            </h2>
          </div>
          <p className="text-base opacity-60 leading-relaxed pt-8 md:pt-12 border-t border-white/10 md:border-0">
            {data.problem}
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-slate-900/30">
        <div className="mb-16">
          <div className="text-[10px] uppercase tracking-widest text-[#2563EB] mb-6">The Approach</div>
          <h2 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tighter leading-tight mb-8 max-w-2xl">
            {data.approachTitle}
          </h2>
          <p className="text-base opacity-60 leading-relaxed max-w-2xl">{data.approach}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-px bg-white/5">
          {data.process.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-navy-900 p-6 flex flex-col gap-4"
            >
              <span className="font-mono text-[10px] text-[#2563EB] opacity-60">{step.number}</span>
              <h4 className="font-black font-display uppercase tracking-tight text-sm leading-tight">{step.title}</h4>
              <p className="text-xs opacity-50 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-12 border-b border-white/5">
        <div className="text-[10px] uppercase tracking-widest text-[#2563EB] mb-16">Proof of Work</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-t border-white/20 pt-6"
            >
              <div className="text-4xl md:text-5xl font-black font-display tracking-tighter text-[#2563EB] mb-2">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest opacity-50">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 px-6 md:px-12 border-b border-white/5">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#2563EB] mb-6">Deliverables</div>
            <h2 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tighter leading-tight">
              What you walk away with.
            </h2>
          </div>
          <ul className="space-y-3">
            {data.deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm opacity-70 border-b border-white/5 pb-3">
                <span className="text-[#2563EB] font-mono text-xs mt-0.5 shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-12 text-center">
        <div className="text-[10px] uppercase tracking-widest text-[#2563EB] mb-8">Ready to start?</div>
        <h2 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tighter leading-none mb-12">
          Let's Build<br />Something Real.
        </h2>
        <a
          href="mailto:brian@briancliette.me"
          className="inline-flex items-center gap-3 bg-[#2563EB] text-white font-black uppercase tracking-tighter px-8 py-4 rounded-full hover:bg-white hover:text-[#080808] transition-colors duration-200 text-sm"
        >
          Get in touch <ArrowUpRight size={16} />
        </a>
      </section>

    </div>
  )
}

// ─── Service Data ─────────────────────────────────────────────────────────────

const agenticData: ServiceData = {
  slug: 'agentic-engineering',
  eyebrow: '01 // Agentic Engineering',
  headline: 'Build the\nAutonomous\nEnterprise.',
  subhead: 'Traditional automation breaks the moment reality doesn\'t match the script. Agentic systems reason, adapt, and act — turning complex multi-step workflows into autonomous revenue moments that run without a single manual click.',
  problem: `Rules-based automation was built for a predictable world. It fires when conditions are met and breaks when they aren't. The result is a tech stack full of half-automated workflows, brittle integrations, and a team that spends more time maintaining bots than building the business. What you actually need isn't more automation — it's automation that can think. Agentic systems don't just execute tasks; they reason over data, handle exceptions gracefully, and get smarter with every cycle. Companies that have made this shift are reporting 240% average ROI within 12 months. The ones that haven't are already behind.`,
  approachTitle: 'From Rule-Following to Goal-Seeking.',
  approach: `Brian architects multi-agent systems (MAS) where specialized agents work in parallel — an Intelligence Agent that synthesizes buyer signals, a Content Agent that assembles personalized assets, and an Execution Agent that triggers outreach, updates the CRM, and logs outcomes. The system isn't a chatbot; it's an operating layer. Built on open standards like Model Context Protocol (MCP), these architectures integrate cleanly into existing enterprise stacks without ripping and replacing what already works. Every deployment includes a Human-in-the-Loop (HITL) governance layer so high-risk decisions stay with your team.`,
  process: [
    { number: '01', title: 'Workflow Audit', body: 'Full process mapping across revenue-generating departments. Every bottleneck, manual handoff, and siloed data source is documented and scored by automation potential.' },
    { number: '02', title: 'Agent Architecture', body: 'Design the multi-agent system: which agents are needed, what data they need access to, how they communicate, and where human oversight is required.' },
    { number: '03', title: 'Data Infrastructure', body: 'Establish clean data pipelines and knowledge bases. Agents are only as effective as the data they reason over — garbage in, garbage out.' },
    { number: '04', title: 'Build & Deploy', body: 'Agent development, integration with CRM, marketing stack, and communication channels via MCP. Staged rollout with validation gates at each phase.' },
    { number: '05', title: 'Govern & Optimize', body: 'HITL frameworks, decision logs, budget caps, and feedback loops that make the system measurably smarter over time.' },
  ],
  stats: [
    { value: '240%', label: 'Avg ROI within 12 months' },
    { value: '12hrs', label: 'Per week saved per sales rep' },
    { value: '95%', label: 'Of seller research workflows will start with AI by 2027' },
    { value: '50bps', label: 'Margin improvement from agentic pricing optimization' },
  ],
  deliverables: [
    'End-to-end workflow audit with automation potential scoring',
    'Multi-agent system (MAS) architecture blueprint',
    'Model Context Protocol (MCP) integration plan',
    'Custom agents for CRM hygiene, lead routing, and outreach',
    'Human-in-the-Loop (HITL) governance framework',
    'Decision logs, budget caps, and performance dashboards',
    '60-day phased deployment plan with validation gates',
  ],
}

const gtmData: ServiceData = {
  slug: 'gtm-strategy',
  eyebrow: '02 // AI-First GTM Strategy',
  headline: 'Signal.\nSell.\nScale.',
  subhead: 'The MQL is dead. Winning GTM in 2025-2026 means knowing who to reach before they raise their hand — and having autonomous systems act on that intelligence the moment a signal fires.',
  problem: `Most GTM strategies are opinion-based disguised as data-driven. You have a CRM, an intent tool, and a weekly pipeline call — and none of them are connected to a single decision framework. Meanwhile, your best reps spend 40% of their week on research and data entry instead of closing. The modern buyer has completed 70% of their journey before talking to sales. If your GTM motion can't identify and engage that intent window before it closes, you're losing deals to competitors who can. The shift from MQL volume to Marketing Qualified Accounts (MQAs) isn't optional — it's the entire game.`,
  approachTitle: 'Data-Driven Orchestration. Not Opinion.',
  approach: `Brian builds GTM architectures that run on real-time buyer signals rather than spray-and-pray outreach. That means pulling from CRM behavioral data, third-party intent platforms, and product usage signals to build always-fresh ICP models and account scoring. Signal-based prospecting — triggered by job changes, competitor mentions, intent spikes, and return visits — consistently delivers 15-25% reply rates versus the 1-3% industry average for cold outreach. The strategic backbone is a unified RevOps layer that aligns marketing, sales, and customer success around shared pipeline KPIs, not siloed department metrics.`,
  process: [
    { number: '01', title: 'ICP Calibration', body: 'Audit CRM, product usage, and third-party intent data to define your highest-LTV accounts by firmographic fit, technographic profile, and behavioral signal.' },
    { number: '02', title: 'TAM Modeling', body: 'Build a dynamic total addressable market model that refreshes automatically. No static spreadsheets — a living picture of your pipeline opportunity.' },
    { number: '03', title: 'Signal Stack Setup', body: 'Integrate intent data sources (G2, Bombora, Clearbit, LinkedIn) into a unified signal layer. Define the triggers that initiate automated engagement sequences.' },
    { number: '04', title: 'GTM Architecture', body: 'Design the channel mix, messaging framework, and account engagement playbook. Every motion tied to a signal, every signal tied to a measurable revenue outcome.' },
    { number: '05', title: 'Execution Roadmap', body: '60-day ARC implementation plan: Assess, Reveal, Chart. Clear milestones, defined owners, and a handoff package for your team to own independently.' },
  ],
  stats: [
    { value: '15–25%', label: 'Reply rate with signal-based outreach' },
    { value: '3×', label: 'Revenue growth with structured GTM' },
    { value: '$60M', label: 'Global paid ads budget managed' },
    { value: '800K+', label: 'Organic leads per month at peak' },
  ],
  deliverables: [
    'ICP calibration with firmographic and behavioral scoring',
    'Dynamic TAM model with always-fresh account data',
    'Signal stack architecture and intent trigger playbook',
    'Revenue Operations alignment framework (Marketing + Sales + CS)',
    'Full-funnel GTM strategy document with channel prioritization',
    '60-day ARC implementation roadmap with sprint definitions',
    'KPI framework: MQA tracking, pipeline coverage, CAC payback period',
  ],
}

const automationData: ServiceData = {
  slug: 'ai-automation',
  eyebrow: '03 // AI Automation',
  headline: 'Kill the\nAdministrative\nDrag.',
  subhead: 'Your team is burning 40% of their week on work that shouldn\'t require humans. Every hour spent on data entry, manual reporting, and copy-paste workflows is an hour not spent on the work that actually moves revenue.',
  problem: `By 2025, companies not using structured automation face a structural disadvantage: their cost-per-output is 2-3x higher and their speed-to-market is half of competitors running automated pipelines. Yet most "automation" projects deliver only marginal gains because they target the wrong workflows. Rules-based RPA breaks on exceptions. Disconnected point solutions create new data silos. And AI projects fail at a 40% rate when the underlying data isn't clean. The fix isn't more tools — it's a methodology. Identify the highest-ROI workflows, establish clean data foundations, and deploy agents that actually reason through exceptions rather than crashing on them.`,
  approachTitle: 'Automate the Right Things. Measure Everything.',
  approach: `Brian applies the ARC Methodology — Assess, Reveal, Chart — to identify and prioritize automation candidates based on business value, data readiness, technical feasibility, regulatory risk, and human impact. This prevents the hype-driven deployment of low-ROI tools and ensures that every automation dollar is tied to a measurable business outcome. Department-specific gains are real: IT saves 50% on routine maintenance, sales teams see 80% improvement in lead quality, marketing achieves 75% higher conversion rates, and finance saves 500+ hours annually. The key is sequencing correctly — quick wins in weeks three to six fund the larger architectural buildouts.`,
  process: [
    { number: '01', title: 'Process Audit', body: 'Map every manual workflow across revenue-generating departments. Document time-on-task, error rates, and downstream impact of each bottleneck.' },
    { number: '02', title: 'ROI Prioritization', body: 'Score automation candidates across five criteria: business value, data readiness, technical feasibility, regulatory risk, and human impact. Surface the quick wins first.' },
    { number: '03', title: 'Architecture Design', body: 'Select the right automation layer for each use case: RPA for deterministic tasks, AI agents for exception-heavy workflows, and hybrid approaches where both are needed.' },
    { number: '04', title: 'Build & Integrate', body: 'Deploy automations into the existing stack with clean API integrations. No rip-and-replace. Every automation is documented, tested, and validated against production data.' },
    { number: '05', title: 'Measure & Scale', body: 'Track time saved, error reduction, and revenue impact per workflow. Successful automations are scaled; underperformers are diagnosed and retooled or cut.' },
  ],
  stats: [
    { value: '240%', label: 'Average ROI in year one' },
    { value: '80%', label: 'Increase in lead quality from AI qualification' },
    { value: '500+', label: 'Hours saved annually in finance alone' },
    { value: '75%', label: 'Higher conversion rates in automated marketing' },
  ],
  deliverables: [
    'Full process audit with time-on-task and error rate documentation',
    'ROI prioritization matrix with quick-win identification',
    'Automation architecture document per workflow',
    'Deployed automations with API integrations and QA documentation',
    'Performance dashboards tracking hours saved and revenue impact',
    'Team training and handoff documentation',
    '90-day execution roadmap with go/no-go milestones',
  ],
}

const revenueIntelData: ServiceData = {
  slug: 'revenue-intelligence',
  eyebrow: '04 // Revenue Intelligence',
  headline: 'See the\nPipeline.\nFeel the\nPulse.',
  subhead: 'Real-time signals. Autonomous CRM hygiene. Deal intelligence that surfaces risk before it costs you the quarter. Because the best sales leaders don\'t react to problems — they see them coming.',
  problem: `Your CRM is a graveyard of outdated data, stale opportunities, and deals your reps have mentally written off but not updated in Salesforce. The result: leadership is forecasting off bad data, managers can't identify which deals need intervention, and reps are wasting cycles chasing accounts that closed months ago in someone's notes app. Research shows that the average enterprise wastes $46,000 per rep annually in lost productivity from administrative drag alone. Add missed signals from stagnating deals and you're looking at a material revenue leak that compounds every quarter it goes unaddressed.`,
  approachTitle: 'From System of Record to System of Action.',
  approach: `Brian deploys autonomous revenue intelligence agents that transform the CRM from a passive data dump into an active deal management layer. Data Extractor Agents auto-populate fields from email, call transcripts, and meeting notes — eliminating the manual entry burden. Opportunity Management Agents monitor deal velocity, detect stagnation, and surface next-best-action recommendations based on closed-won pattern matching. Deal Summary Agents give managers an AI-generated brief for every active opportunity: engagement history, stakeholder map, deal risk score, and recommended intervention. The system runs 24/7, so nothing slips through the cracks.`,
  process: [
    { number: '01', title: 'Pipeline Audit', body: 'Quantitative teardown of the current pipeline: deal velocity, stage conversion rates, average sales cycle, and win/loss pattern analysis by segment and rep.' },
    { number: '02', title: 'Signal Mapping', body: 'Identify the behavioral signals that predict deal outcomes — response time, meeting cadence, stakeholder engagement, and competitive mention frequency.' },
    { number: '03', title: 'Agent Deployment', body: 'Deploy CRM data extraction agents (Gong, Salesforce, HubSpot), opportunity monitoring agents, and deal summary generation agents across the live pipeline.' },
    { number: '04', title: 'Forecast Layer', body: 'Build AI-assisted forecasting models that account for deal risk scores, historical conversion patterns, and signal velocity — replacing gut-feel with probability math.' },
    { number: '05', title: 'Manager Enablement', body: 'Weekly AI-generated pipeline reviews, rep performance dashboards, and deal coaching briefs that surface which conversations need to happen before the quarter closes.' },
  ],
  stats: [
    { value: '22%', label: 'Increase in pipeline from AI SDR systems' },
    { value: '20×', label: 'Faster lead routing speed-to-lead' },
    { value: '$46K', label: 'Per-rep productivity recovered annually' },
    { value: '80%', label: 'Meeting conversion rates from qualified AI leads' },
  ],
  deliverables: [
    'Pipeline audit with deal velocity and conversion rate benchmarks',
    'Signal map identifying behavioral predictors of deal outcomes',
    'Deployed CRM data extraction and hygiene agents',
    'Opportunity management agent with stagnation detection',
    'AI-generated deal summaries for every active opportunity',
    'AI-assisted forecasting model with deal risk scoring',
    'Manager-facing pipeline review dashboard and coaching briefs',
  ],
}

export const servicePages: Record<string, ServiceData> = {
  'agentic-engineering': agenticData,
  'gtm-strategy': gtmData,
  'ai-automation': automationData,
  'revenue-intelligence': revenueIntelData,
}

export function ServicePage({ slug }: { slug: string }) {
  const data = servicePages[slug]
  if (!data) return null
  return <ServicePageTemplate data={data} />
}
