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
          className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-[#87FFFB] transition-all duration-200 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back
        </Link>
        <Link to="/" className="font-black font-display text-sm uppercase tracking-tighter">
          Brian Cliette
        </Link>
        <a
          href="mailto:brian@briancliette.me"
          className="text-xs font-black uppercase tracking-tighter bg-[#87FFFB] text-[#080808] rounded-full px-4 py-[7px] hover:bg-white transition-colors duration-200"
        >
          Let's Talk
        </a>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-12 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[10px] uppercase tracking-widest text-[#87FFFB] mb-8">{data.eyebrow}</div>
          <h1 className="text-6xl md:text-[10vw] font-black font-display tracking-tighter uppercase leading-none mb-8 max-w-5xl">
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
            <div className="text-[10px] uppercase tracking-widest text-[#87FFFB] mb-6">The Problem</div>
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
          <div className="text-[10px] uppercase tracking-widest text-[#87FFFB] mb-6">The Approach</div>
          <h2 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tighter leading-tight mb-8 max-w-2xl">
            {data.approachTitle}
          </h2>
          <p className="text-base opacity-60 leading-relaxed max-w-2xl">{data.approach}</p>
        </div>

        {/* Process steps */}
        <div className="grid md:grid-cols-5 gap-px bg-white/5">
          {data.process.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-navy-900 p-6 flex flex-col gap-4"
            >
              <span className="font-mono text-[10px] text-[#87FFFB] opacity-60">{step.number}</span>
              <h4 className="font-black font-display uppercase tracking-tight text-sm leading-tight">{step.title}</h4>
              <p className="text-xs opacity-50 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats / Proof */}
      <section className="py-24 px-6 md:px-12 border-b border-white/5">
        <div className="text-[10px] uppercase tracking-widest text-[#87FFFB] mb-16">Proof of Work</div>
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
              <div className="text-4xl md:text-5xl font-black font-display tracking-tighter text-[#87FFFB] mb-2">
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
            <div className="text-[10px] uppercase tracking-widest text-[#87FFFB] mb-6">Deliverables</div>
            <h2 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tighter leading-tight">
              What you walk away with.
            </h2>
          </div>
          <ul className="space-y-3">
            {data.deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm opacity-70 border-b border-white/5 pb-3">
                <span className="text-[#87FFFB] font-mono text-xs mt-0.5 shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-12 text-center">
        <div className="text-[10px] uppercase tracking-widest text-[#87FFFB] mb-8">Ready to start?</div>
        <h2 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tighter leading-none mb-12">
          Let's Build<br />Something Real.
        </h2>
        <a
          href="mailto:brian@briancliette.me"
          className="inline-flex items-center gap-3 bg-[#87FFFB] text-[#080808] font-black uppercase tracking-tighter px-8 py-4 rounded-full hover:bg-white transition-colors duration-200 text-sm"
        >
          Get in touch <ArrowUpRight size={16} />
        </a>
      </section>

    </div>
  )
}

// ─── Page data ───────────────────────────────────────────────────────────────

const seoData: ServiceData = {
  slug: 'programmatic-seo',
  eyebrow: '01 // Programmatic SEO',
  headline: 'Organic\nat Scale.',
  subhead: '800K–1M qualified leads a month. Not from writing more blog posts — from building systems that compound.',
  problem: `Most SEO programs stall at a few hundred pages because they're artisanal. One post. One keyword. One writer. That's not a growth channel — that's a hobby. By the time you've published enough to rank, your competitors have lapped you with automated content systems doing the same work at 100× the volume.`,
  approachTitle: 'Content as Infrastructure.',
  approach: `Programmatic SEO treats content the way engineering treats code — build the right template once, and it generates at scale. Brian architects keyword clustering systems, URL structures, and internal linking logic that turn a single well-researched pattern into thousands of indexed, ranking pages, each one targeting a specific query cluster with surgical intent.`,
  process: [
    { number: '01', title: 'Keyword Architecture', body: 'Map the full addressable search universe. Cluster by intent, volume, and competition to identify where programmatic outperforms artisanal.' },
    { number: '02', title: 'Template Engineering', body: 'Design URL structures, page templates, and dynamic content rules that search engines reward and users actually engage with.' },
    { number: '03', title: 'Authority Building', body: 'High-authority link acquisition that compounds over time and builds domain resilience against algorithm updates.' },
    { number: '04', title: 'Programmatic Publishing', body: 'Build or leverage CMS pipelines that generate, index, and maintain pages at scale without per-page editorial overhead.' },
    { number: '05', title: 'Monitor & Iterate', body: 'Automated rank tracking, cannibalization detection, and continuous template optimization based on performance data.' },
  ],
  stats: [
    { value: '1M', label: 'Organic leads/month at peak' },
    { value: '55K+', label: 'Email subscribers grown organically' },
    { value: '5M+', label: 'People reached across campaigns' },
    { value: '10+', label: 'Years of SEO systems expertise' },
  ],
  deliverables: [
    'Full SEO audit with competitive gap analysis',
    'Programmatic content architecture and URL schema',
    'Keyword cluster map with priority scoring',
    'Page template specifications and content rules',
    'Link building roadmap with target domains',
    '90-day phased execution plan',
  ],
}

const croData: ServiceData = {
  slug: 'cro-ab-testing',
  eyebrow: '04 // CRO & A/B Testing',
  headline: 'Stop\nLeaking\nRevenue.',
  subhead: 'You have the traffic. You have the product. Every unconverted visitor is money still on the table.',
  problem: `Most CRO programs fail for three reasons: they test cosmetic changes, they call tests before reaching statistical significance, or they run without a documented hypothesis. The result is a backlog of inconclusive experiments, a frustrated team, and leadership questioning whether optimization actually works. The answer isn't more tests — it's better ones.`,
  approachTitle: 'Hypothesis First. Data Second. Always.',
  approach: `Every test starts with a behavioral thesis — why a change will work, which psychological mechanism it exploits, and what signal constitutes a real win. Drawing from behavioral economics, cognitive load research, and friction analysis, Brian runs programs where learnings compound: winning variants become design system rules, and each test makes the next one smarter. No gut feelings. No HiPPO decisions.`,
  process: [
    { number: '01', title: 'Conversion Audit', body: 'Full-funnel heuristic and quantitative analysis. Identify where users drop, why they hesitate, and which pages carry the highest optimization ROI.' },
    { number: '02', title: 'Hypothesis Engine', body: 'Build a prioritized test backlog using ICE scoring. Every experiment has a falsifiable prediction, a success metric, and a required sample size calculated upfront.' },
    { number: '03', title: 'Test Design', body: 'Statistical power calculation, clean variant builds, comprehensive QA, and holdout logic that prevents test pollution.' },
    { number: '04', title: 'Analysis', body: 'Bayesian significance, segment breakdowns (device, source, cohort), and disciplined learning documentation — not just p-values.' },
    { number: '05', title: 'Scale & Codify', body: 'Winning variants graduate into design system rules. The program becomes self-reinforcing: each test makes future tests faster and more accurate.' },
  ],
  stats: [
    { value: '25+', label: 'CRO tests managed simultaneously' },
    { value: '~1M', label: 'Monthly visitors optimized' },
    { value: '45%', label: 'Peak conversion lift per test' },
    { value: '56%', label: 'Net new customer growth at AG1' },
  ],
  deliverables: [
    'Full conversion audit (heuristic + quantitative)',
    'Prioritized test backlog with ICE scoring',
    'A/B test execution, QA, and holdout management',
    'Statistical analysis reports per experiment',
    'Winning variant documentation and design rules',
    'CRO playbook for scaling in-house',
  ],
}

const demandData: ServiceData = {
  slug: 'demand-generation',
  eyebrow: '02 // Demand Generation',
  headline: 'Fill the\nFunnel.\nBuild the\nMachine.',
  subhead: 'Multi-channel demand programs that create qualified pipeline — not just impressions and vanity metrics.',
  problem: `Demand gen fails when it's treated as a collection of channels. You have a paid search agency, a content team, an email vendor, and a social media manager — and none of them share a single attribution model. The result is a fragmented buyer journey, rising CPL, and a CFO who's stopped trusting the channel reports.`,
  approachTitle: 'Every Channel Reinforces the Next.',
  approach: `Brian builds integrated demand programs where paid amplifies content, content nurtures email, and email closes what paid started. The entire system runs off a single source of truth for attribution. At Twilio, that meant co-managing a $60M global paid ads budget across developer-first channels — Stack Overflow, Reddit, Quora — where audiences had extreme ad fatigue and responded only to technically credible, useful messaging.`,
  process: [
    { number: '01', title: 'Audience Architecture', body: 'ICP definition, psychographic segmentation, and buyer journey mapping. Who are we reaching, where do they live online, and what actually moves them?' },
    { number: '02', title: 'Channel Strategy', body: 'Weighted channel mix built on CAC benchmarks, LTV modeling, and buying cycle length. No dogma — every dollar justified by data.' },
    { number: '03', title: 'Creative Development', body: 'Messaging frameworks, ad creative briefs, and landing page alignment. Consistency from first impression to final conversion.' },
    { number: '04', title: 'Launch & Allocate', body: 'Phased rollout with holdout groups and multi-touch attribution modeling from day one. No black-box spend.' },
    { number: '05', title: 'Optimization Loop', body: 'Weekly pacing reviews, creative refresh cadence, audience suppression, and CAC trend analysis that tightens performance over time.' },
  ],
  stats: [
    { value: '$60M', label: 'Global paid ads budget managed' },
    { value: '12', label: 'Person team managed at Twilio' },
    { value: '5M+', label: 'People reached across programs' },
    { value: '3+', label: 'Developer-first channels optimized' },
  ],
  deliverables: [
    'ICP definition and audience architecture',
    'Channel mix recommendation with CAC modeling',
    'Messaging framework and creative briefs',
    'Campaign launch plan with budget allocation',
    'Multi-touch attribution model setup',
    'Weekly performance reporting dashboard',
  ],
}

const growthData: ServiceData = {
  slug: 'growth-strategy',
  eyebrow: '03 // Growth Strategy',
  headline: 'Data In.\nRevenue\nOut.',
  subhead: 'Full-funnel GTM strategy that ties acquisition, activation, and retention into one coherent, compounding system.',
  problem: `Most growth plans are acquisition plans wearing a disguise. They optimize for signups and clicks but ignore everything after. The bucket fills and leaks simultaneously, growth slows, and the team runs faster to stay in place. The fix isn't a new channel — it's a system that connects the top of the funnel to the bottom.`,
  approachTitle: 'Build the Flywheel, Not the Faucet.',
  approach: `Brian builds growth systems where acquisition, activation, and retention are treated as one interconnected loop. The goal isn't to grow faster in isolation — it's to build a flywheel where growth compounds: users who stay become your best acquisition channel, and every retention point improvement drops directly to CAC. At Evidation Health, this meant engineering a growth system from scratch: 600K net signups, a 40% MAU increase, and 103% of company growth goals in under six months.`,
  process: [
    { number: '01', title: 'Growth Audit', body: 'Quantitative teardown of your funnel — cohort analysis, retention curves, unit economics. No opinions; just data on where you\'re leaking and where you\'re winning.' },
    { number: '02', title: 'Growth Model', body: 'A dynamic model that maps how lever changes at the top affect retention and LTV at the bottom. Scenario planning built in.' },
    { number: '03', title: 'GTM Architecture', body: 'Channel selection, ICP refinement, and messaging strategy grounded in the growth model\'s assumptions — not instinct.' },
    { number: '04', title: 'Execution Roadmap', body: '30/60/90-day sprint plans with defined owners, success criteria, and resource requirements. Ambiguity is the enemy of execution.' },
    { number: '05', title: 'Measurement', body: 'KPI framework, dashboards, and a weekly growth review cadence. Teams that measure clearly move faster.' },
  ],
  stats: [
    { value: '600K', label: 'Net signups at Evidation Health' },
    { value: '103%', label: 'Of company growth goals hit' },
    { value: '40%', label: 'MAU increase in 6 months' },
    { value: '$60M+', label: 'Annual media strategically allocated' },
  ],
  deliverables: [
    'Full growth audit with cohort and retention analysis',
    'Dynamic growth model with scenario planning',
    'GTM strategy document with channel prioritization',
    '90-day execution roadmap with sprint definitions',
    'KPI framework and reporting template',
    'Retention improvement recommendations',
  ],
}

export const servicePages: Record<string, ServiceData> = {
  'programmatic-seo': seoData,
  'cro-ab-testing': croData,
  'demand-generation': demandData,
  'growth-strategy': growthData,
}

export function ServicePage({ slug }: { slug: string }) {
  const data = servicePages[slug]
  if (!data) return null
  return <ServicePageTemplate data={data} />
}
