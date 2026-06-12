import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import {
  Github, Linkedin, Mail, MapPin, ArrowUpRight, ArrowRight,
  Sparkles, Cpu, Home, Leaf, LayoutGrid, ChevronRight, Mic,
  Compass, Building2, Megaphone, Feather, Zap, TrendingUp, Package,
  Sun, Moon, Cloud, CloudRain, Snowflake,
} from 'lucide-react'

/* ════════════════════════════ DATA (sourced from wiki) ════════════════ */

const LINKS = {
  github: 'https://github.com/Jawahars07',
  linkedin: 'https://linkedin.com/in/jawaharnaidu07',
  email: 'jawaharnaidu07@gmail.com',
  rta: 'https://rtaliving.com',
  webforge: 'https://github.com/Jawahars07/webforge',
  fertilizer: 'https://github.com/Jawahars07/fertilizer-prediction-ai',
  rtaRepo: 'https://github.com/Jawahars07/rta-living',
}

const ROLES = [
  'building AI products',
  'shipping at the edge of strategy & code',
  'co-founding Rta Living',
  'turning briefs into deployed software',
]

const ACTS = [
  {
    rom: 'I', period: '2021 — 2025', title: 'The Engineer', inst: 'REVA University · Bengaluru',
    desc: 'B.Tech CS (Honours). Algorithms, full-stack, AI/ML fundamentals — then shipped them in industry: PHP systems at PocketLite, digital transformation for 30+ SME clients at PandaECE.',
  },
  {
    rom: 'II', period: '2025 — Present', title: 'The Strategist', inst: 'ESSEC Business School · Paris',
    desc: 'Master in Management at a top-5 European grande école. Distinction-level work across competitive strategy, GTM, financial modelling and BI. Learning to make the numbers and the narrative agree.',
  },
  {
    rom: 'III', period: '2025 — Present', title: 'The Builder', inst: 'Rta Living · Paris',
    desc: 'Co-founding a luxury smart-home AI platform — IoT sensors, an AI personalisation engine, and Vastu-informed design. Architecture, GTM and brand built from first principles. Live at rtaliving.com.',
  },
]

const STATS = [
  { num: 30, suffix: '+', label: 'SME clients transformed' },
  { num: 40, suffix: '%', label: 'production time cut with GenAI' },
  { num: 4, suffix: '', label: 'shipped projects on GitHub' },
]

const SECONDARY = [
  {
    icon: Home, name: 'Rta Living', cat: 'Co-Founder · Live Product',
    desc: 'Luxury smart-home AI built as a real TypeScript Turborepo monorepo (web + mobile, shared api/ui/tokens). IoT sensor stack (ESP32-S3, DHT22, BH1750, SGP30, PIR) + AI personalisation. Live.',
    pills: ['TypeScript', 'Turborepo', 'React/Next', 'IoT'],
    links: [{ label: 'rtaliving.com', href: LINKS.rta }, { label: 'Repo', href: LINKS.rtaRepo }],
  },
  {
    icon: Mic, name: 'Tara', cat: 'Always-On Voice AI · Private',
    desc: 'An always-on voice assistant living on my Mac. Local Whisper ears, a Claude brain with cost-aware model routing, and a neural Indian-English voice. Private by design — it runs on my machine, not the cloud.',
    pills: ['Whisper', 'Claude API', 'Edge-TTS', 'Python'],
    links: [],
  },
  {
    icon: Leaf, name: 'Fertilizer Prediction AI', cat: 'ML · Python',
    desc: 'A machine-learning model that recommends optimal fertilizer from soil and crop conditions — data pipeline, training and evaluation. Published and documented on GitHub.',
    pills: ['Python', 'ML', 'scikit-learn'],
    links: [{ label: 'View repo', href: LINKS.fertilizer }],
  },
  {
    icon: LayoutGrid, name: 'AwareLiving', cat: 'ESSEC · PropTech SaaS',
    desc: 'Full-stack PropTech SaaS built end-to-end: live dashboard mock, three-tier pricing, GDPR-compliant architecture. Product thinking from UX through to monetisation.',
    pills: ['React', 'Next.js', 'Tailwind', 'GDPR'],
    links: [],
  },
]

const CASES = [
  {
    num: '01', cat: 'Strategy · ESSEC MIM · Distinction',
    title: 'Zipcar — Post-Acquisition Growth Strategy',
    desc: 'Assessed Zipcar after the Avis Budget acquisition: network-effect dynamics, pricing architecture, and moat erosion across European markets. Delivered three scenarios with recommended capital allocation — awarded distinction.',
    tags: ['M&A', 'Mobility', "Porter's 5"],
  },
  {
    num: '02', cat: 'GTM Strategy · ESSEC MIM',
    title: 'Domino RH — Aerospace Workforce GTM',
    desc: 'Full go-to-market for an aerospace staffing line (€565M baseline) against Manpower, Adecco and Randstad. Built a 77-question economic feasibility framework spanning investment, cost, revenue architecture and risk.',
    tags: ['GTM', 'Aerospace', 'Finance'],
  },
  {
    num: '03', cat: 'Digital Transformation · PandaECE',
    title: 'SME Portfolio — GenAI Workflow Transformation',
    desc: 'Brought GenAI into content pipelines across 30+ e-commerce clients and built the Power BI dashboards leadership ran weekly. Automated reporting cut manual overhead ~40% and scaled output without new headcount.',
    tags: ['GenAI', 'Power BI', 'E-Commerce'],
  },
]

const MIND = [
  { icon: Cpu, name: 'AI', line: 'Right model for the job. Cache what repeats. Ship the pipeline, not the demo.' },
  { icon: Compass, name: 'Strategy', line: 'Moats, pricing power, and where the market is actually going — not where the deck says.' },
  { icon: Package, name: 'Product', line: 'Useful, beautiful, commercially sharp. In that order, all three required.' },
  { icon: TrendingUp, name: 'Finance', line: 'Every idea survives or dies in the unit economics. I build the model first.' },
  { icon: Building2, name: 'Real Estate', line: 'I grew up around property and construction. Land, capital, and timing are in my blood.' },
  { icon: Megaphone, name: 'Marketing', line: 'Distribution is half the product. The best build loses to the best story told well.' },
  { icon: Feather, name: 'Story', line: 'People decide on narrative and justify with numbers. I write for the decision.' },
  { icon: Zap, name: 'Execution', line: 'A shipped imperfect thing beats a perfect plan. Iterate in public.' },
]

const SKILLS_ENG = [
  { name: 'AI Product & LLM Orchestration', tag: 'Anthropic API · multi-model · caching', w: 88 },
  { name: 'Full-Stack Development', tag: 'React · Next.js · TypeScript · PHP', w: 86 },
  { name: 'Power BI & Dashboards', tag: 'KPI design · reporting', w: 85 },
  { name: 'Automation & Pipelines', tag: 'Python · agents · workflows', w: 82 },
  { name: 'IoT Architecture', tag: 'ESP32 · sensor integration', w: 70 },
]

const SKILLS_BIZ = [
  { name: 'Competitive Strategy', tag: "Porter's 5 · VRIO · sizing", w: 90 },
  { name: 'Go-to-Market Design', tag: 'TAM/SAM · channel strategy', w: 85 },
  { name: 'Financial Modelling', tag: 'Feasibility · P&L · pricing', w: 80 },
  { name: 'Project & Operations', tag: 'Agile · stakeholder mgmt', w: 90 },
  { name: 'E-Commerce Analytics', tag: 'SEO · conversion · KPIs', w: 83 },
]

/* ════════════════════════════ MOOD ENGINE ═════════════════════════════
   Time of day + live weather (Open-Meteo, keyless) drive the atmosphere:
   aurora hues, glass tint, glow, and weather layers (rain / snow / stars /
   sun rays). Location is IP-approximate via geojs.io — no permission
   popup — with Paris as the graceful fallback. The brand accent stays
   constant; only the environment adapts. */

const wmoToKind = (code) => {
  if (code === 0 || code === 1) return 'clear'
  if (code <= 3 || code === 45 || code === 48) return 'cloud'
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) return 'rain'
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow'
  return 'clear'
}

const hourToTime = (h) =>
  h >= 6 && h < 12 ? 'morning' : h >= 12 && h < 17 ? 'day' : h >= 17 && h < 21 ? 'evening' : 'night'

function useMood() {
  const [mood, setMood] = useState({
    time: hourToTime(new Date().getHours()),
    weather: 'clear',
    live: false, // true once real weather data has loaded
  })

  useEffect(() => {
    let cancelled = false

    const fetchWeather = async (lat, lon) => {
      try {
        const r = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code`,
          { signal: AbortSignal.timeout(6000) }
        )
        const d = await r.json()
        if (!cancelled && d?.current?.weather_code !== undefined) {
          setMood((m) => ({ ...m, weather: wmoToKind(d.current.weather_code), live: true }))
        }
      } catch { /* keep the time-based mood — site stays alive without weather */ }
    }

    ;(async () => {
      let lat = 48.86, lon = 2.35 // Paris fallback
      try {
        const r = await fetch('https://get.geojs.io/v1/ip/geo.json', { signal: AbortSignal.timeout(4000) })
        const g = await r.json()
        if (g?.latitude && g?.longitude) { lat = +g.latitude; lon = +g.longitude }
      } catch { /* fall back to Paris */ }
      fetchWeather(lat, lon)
    })()

    const tick = setInterval(
      () => setMood((m) => ({ ...m, time: hourToTime(new Date().getHours()) })),
      60_000
    )
    return () => { cancelled = true; clearInterval(tick) }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.time = mood.time
    document.documentElement.dataset.weather = mood.weather
  }, [mood])

  return mood
}

const MOOD_META = {
  morning: { greet: 'Good morning', Icon: Sun },
  day: { greet: 'Good afternoon', Icon: Sun },
  evening: { greet: 'Good evening', Icon: Moon },
  night: { greet: 'Good evening', Icon: Moon },
}
const WEATHER_META = {
  clear: { label: 'clear skies', Icon: Sun },
  cloud: { label: 'soft clouds', Icon: Cloud },
  rain: { label: 'rain on the glass', Icon: CloudRain },
  snow: { label: 'snow falling', Icon: Snowflake },
}

/* Weather + night layers — pure CSS animations, low particle counts,
   pointer-events none, removed entirely under prefers-reduced-motion. */
function Atmosphere({ mood }) {
  const rain = useMemo(
    () => Array.from({ length: 56 }, (_, i) => ({
      left: (i * 137.5) % 100,
      delay: ((i * 73) % 40) / 10,
      dur: 0.8 + ((i * 31) % 14) / 10,
      op: 0.12 + ((i * 17) % 20) / 100,
    })), []
  )
  const snow = useMemo(
    () => Array.from({ length: 36 }, (_, i) => ({
      left: (i * 61.8) % 100,
      delay: ((i * 97) % 80) / 10,
      dur: 6 + ((i * 43) % 50) / 10,
      size: 2 + ((i * 13) % 3),
    })), []
  )
  const stars = useMemo(
    () => Array.from({ length: 70 }, (_, i) => ({
      left: (i * 137.5) % 100,
      top: (i * 83) % 62,
      delay: ((i * 29) % 60) / 10,
      size: i % 9 === 0 ? 2.4 : 1.4,
    })), []
  )

  const night = mood.time === 'night' || mood.time === 'evening'
  return (
    <div className="atmosphere" aria-hidden>
      {night && mood.weather !== 'cloud' && (
        <div className="stars">
          {stars.map((s, i) => (
            <span key={i} style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }} />
          ))}
        </div>
      )}
      {mood.weather === 'rain' && (
        <div className="rain">
          {rain.map((d, i) => (
            <span key={i} style={{ left: `${d.left}%`, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s`, opacity: d.op }} />
          ))}
        </div>
      )}
      {mood.weather === 'snow' && (
        <div className="snow">
          {snow.map((f, i) => (
            <span key={i} style={{ left: `${f.left}%`, width: f.size, height: f.size, animationDelay: `${f.delay}s`, animationDuration: `${f.dur}s` }} />
          ))}
        </div>
      )}
      {mood.weather === 'clear' && !night && <div className="sunrays" />}
    </div>
  )
}

/* ════════════════════════════ MOTION VARIANTS ═════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

function Reveal({ children, className, delay = 0, as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: { opacity: 0, y: 36 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </MotionTag>
  )
}

/* iOS-26 liquid-glass card: 3D tilt toward the cursor + a light glare that
   follows the pointer across the surface. Wrap any .glass element with it. */
function LiquidCard({ children, className = '', tilt = true, ...rest }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(mx, { stiffness: 180, damping: 18 })
  const rotateX = useSpring(my, { stiffness: 180, damping: 18 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    el.style.setProperty('--glare', '1')
    if (tilt) {
      mx.set((px - 0.5) * 8)
      my.set(-(py - 0.5) * 8)
    }
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.setProperty('--glare', '0')
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100, height: '100%' }}
      whileHover={{ scale: 1.012 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* magnetic wrapper — pulls a control gently toward the cursor */
function Magnetic({ children, strength = 0.4 }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 16 })
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.span ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      style={{ x, y, display: 'inline-flex' }}>
      {children}
    </motion.span>
  )
}

/* count-up number used in hero stats */
function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const dur = 1400
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])
  return <span ref={ref}>{val}<span className="accent">{suffix}</span></span>
}

/* chapter kicker — the film-style section marker */
function Chapter({ n, title }) {
  return (
    <div className="sec-kicker"><span className="dot" /> Chapter {n} — {title}</div>
  )
}

/* ════════════════════════════ CHROME ══════════════════════════════════ */

function Aurora() {
  return (
    <>
      <div className="aurora" aria-hidden>
        <span className="b1" /><span className="b2" /><span className="b3" /><span className="b4" />
      </div>
      <div className="grain" aria-hidden />
    </>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />
}

/* film-title opening — a brief curtain before the world appears */
function Curtain() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="curtain" exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}>
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.18em' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}>
            JAWAHAR NAIDU
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Nav() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const close = () => { setOpen(false); document.body.style.overflow = '' }
  const links = [
    ['Origin', '#origin'], ['Journey', '#journey'], ['Gallery', '#gallery'], ['Mind', '#mind'], ['Vision', '#vision'],
  ]
  return (
    <motion.nav id="nav" className={stuck ? 'stuck' : ''}
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}>
      <div className="wrap nav-row">
        <a href="#hero" className="nav-brand" onClick={close}><span className="gem" />Jawahar</a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([label, href]) => (
            <li key={href}><a href={href} onClick={close}>{label}</a></li>
          ))}
          <li><a href={LINKS.github} target="_blank" rel="noreferrer" className="nav-icon" aria-label="GitHub"><Github size={18} /></a></li>
          <li><a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="nav-icon" aria-label="LinkedIn"><Linkedin size={18} /></a></li>
          <li><a href="#contact" className="btn btn-primary" onClick={close} style={{ padding: '10px 20px' }}>Contact</a></li>
        </ul>
        <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu"
          onClick={() => { const n = !open; setOpen(n); document.body.style.overflow = n ? 'hidden' : '' }}>
          <span /><span /><span />
        </button>
      </div>
    </motion.nav>
  )
}

/* ════════════════════════════ CHAPTERS ════════════════════════════════ */

/* Chapter 1 — Opening Scene */
function Hero({ mood }) {
  const [roleIdx, setRoleIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2600)
    return () => clearInterval(t)
  }, [])
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 120])
  const fade = useTransform(scrollY, [0, 400], [1, 0])

  const { greet, Icon: TimeIcon } = MOOD_META[mood.time]
  const weather = WEATHER_META[mood.weather]

  return (
    <section id="hero">
      <motion.div className="hero-inner" style={{ y }}>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div className="hero-badge" variants={fadeUp}>
            <span className="ping" /> Open to a 12-month apprenticeship · Sept 2026 · Paris
          </motion.div>
          <motion.h1 className="hero-h1" variants={fadeUp}>
            Jawahar <span className="grad">Naidu</span>
          </motion.h1>
          <motion.p className="hero-sub" variants={fadeUp}>
            I build where business, AI, and human behavior meet.
          </motion.p>
          <motion.div className="hero-role" variants={fadeUp}>
            <AnimatePresence mode="wait">
              <motion.span key={roleIdx}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }} style={{ display: 'inline-block' }}>
                — {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          <motion.div className="hero-cta" variants={fadeUp}>
            <Magnetic><a href="#gallery" className="btn btn-primary">Enter the Gallery <ArrowRight size={16} /></a></Magnetic>
            <Magnetic><a href={LINKS.github} target="_blank" rel="noreferrer" className="btn btn-ghost"><Github size={16} /> GitHub</a></Magnetic>
          </motion.div>
          <motion.div className="hero-stats" variants={fadeUp}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="hstat-num"><CountUp to={s.num} suffix={s.suffix} /></div>
                <div className="hstat-label">{s.label}</div>
              </div>
            ))}
          </motion.div>
          <motion.div className="hero-mood" variants={fadeUp} aria-live="polite">
            <TimeIcon size={13} />
            {greet}{mood.live ? <> · {weather.label} where you are — the glass matches</> : <> · the glass follows your sky</>}
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div className="scroll-cue" style={{ opacity: fade }}>
        <span>Scroll</span><div className="line" />
      </motion.div>
    </section>
  )
}

/* Chapter 2 — The Origin */
function Origin() {
  return (
    <section id="origin">
      <div className="wrap">
        <Reveal className="sec-head">
          <Chapter n="02" title="The Origin" />
          <h2 className="sec-title">Before the code, there was <em>land</em>.</h2>
        </Reveal>
        <div className="origin-grid">
          <Reveal className="origin-quote">
            “Every project began with a question I could not ignore.”
          </Reveal>
          <Reveal className="origin-body" delay={0.1}>
            <p>I grew up in <strong>Anantapur</strong>, in a family that builds — construction and real estate. Dinner-table conversations were about land, deals, people, and timing. I learned early that property is never about buildings; it's about trust, capital, and reading what people actually want.</p>
            <p>Then computers arrived, and I found a second kind of building. One where the materials were free and the only constraint was how clearly you could think. I went to <strong>Bengaluru</strong> to study computer science and never stopped switching between the two worlds — atoms and bits, deals and systems.</p>
            <p>That double lens is still how I work. <strong>Rta Living</strong> exists because I see homes the way my family does and software the way an engineer does.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Chapter 3 — The Transformation */
function Journey() {
  return (
    <section id="journey">
      <div className="wrap">
        <Reveal className="sec-head">
          <Chapter n="03" title="The Transformation" />
          <h2 className="sec-title">Engineer who learned <em>strategy</em>. Strategist who still ships code.</h2>
        </Reveal>

        <motion.div className="acts" variants={container} initial="hidden"
          whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {ACTS.map((a) => (
            <motion.div key={a.rom} className="lg-item" variants={fadeUp}>
              <LiquidCard className="glass act">
                <div className="act-rom">{a.rom}</div>
                <div className="act-period">{a.period}</div>
                <div className="act-title">{a.title}</div>
                <div className="act-inst">{a.inst}</div>
                <p className="act-desc">{a.desc}</p>
              </LiquidCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="about-grid">
          <Reveal className="about-quote">
            “The rarest lever in any org: the engineer who understands markets, and the strategist who understands systems.”
          </Reveal>
          <Reveal className="about-body" delay={0.1}>
            <p>At <strong>REVA</strong> I learned every hard problem has an elegant structure underneath. At <strong>ESSEC</strong> I learned that structure is useless without human context and strategic will.</p>
            <p>My real education happened in the gap between them: running 30+ client digital transformations at <strong>PandaECE</strong>, where data analysis and stakeholder communication had to live in the same room, on the same deadline.</p>
            <p>Today I build AI products — like <strong>WebForge</strong> and <strong>Rta Living</strong> — that turn that gap into a product advantage. Available for a 12-month apprenticeship from <strong>September 2026</strong>, based in Paris. English C1, learning French.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function PipelineVisual() {
  const nodes = [
    { step: 'Expand', model: 'Claude Haiku', meta: 'brief → spec' },
    { step: 'Generate', model: 'Claude Sonnet', meta: 'spec → site' },
    { step: 'Deploy', model: 'Playwright', meta: 'site → live' },
  ]
  return (
    <motion.div className="flag-visual" initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <div className="pipe-row">
        {nodes.map((n, i) => (
          <React.Fragment key={n.step}>
            <motion.div className="pipe-node"
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.18, duration: 0.5 }}>
              <div className="step">{n.step}</div>
              <div className="model">{n.model}</div>
              <div className="meta">{n.meta}</div>
            </motion.div>
            {i < nodes.length - 1 && <ChevronRight size={18} className="pipe-arrow" />}
          </React.Fragment>
        ))}
      </div>
      <motion.div className="pipe-savings"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.9 }}>
        <Cpu size={14} /> ~70–90% input-token savings via prompt caching
      </motion.div>
    </motion.div>
  )
}

/* Chapter 4 — The Builder's Gallery */
function Gallery() {
  return (
    <section id="gallery">
      <div className="wrap">
        <Reveal className="sec-head">
          <Chapter n="04" title="The Builder's Gallery" />
          <h2 className="sec-title">Things I've <em>shipped</em> — not slides about shipping.</h2>
        </Reveal>

        <div className="work-grid">
          {/* FLAGSHIP — WebForge */}
          <Reveal className="lg-item">
            <LiquidCard className="glass proj flagship" tilt={false}>
            <div>
              <div className="proj-flag-tag"><Sparkles size={14} className="star" /> Flagship · AI Engineering</div>
              <h3 className="proj-name">WebForge</h3>
              <div className="proj-tagline">A one-line brief → a live, deployed website</div>
              <p className="proj-desc">
                An agentic pipeline I built end-to-end: a Telegram bot takes a brief, <strong>Claude Haiku</strong> expands it into a creative spec, <strong>Claude Sonnet</strong> generates the full site, and a Playwright deployer ships it live. The big static prompt is sent with <strong>prompt caching</strong> — ~70–90% input-token savings on repeat calls. Right model for each job, real cost engineering.
              </p>
              <div className="proj-pills">
                {['Python', 'Anthropic SDK', 'Telegram Bot', 'Playwright', 'Prompt Caching'].map((p) => (
                  <span key={p} className="pill">{p}</span>
                ))}
              </div>
              <div className="proj-links">
                <a href={LINKS.webforge} target="_blank" rel="noreferrer" className="proj-link">
                  <Github size={15} /> View on GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
            <PipelineVisual />
            </LiquidCard>
          </Reveal>

          {/* SECONDARY GRID */}
          <motion.div className="proj-sub-grid" variants={container} initial="hidden"
            whileInView="show" viewport={{ once: true, amount: 0.15 }}>
            {SECONDARY.map((p) => {
              const Icon = p.icon
              return (
                <motion.div key={p.name} className="lg-item" variants={fadeUp}>
                  <LiquidCard className="glass proj">
                    <div className="proj-sm-icon"><Icon size={20} /></div>
                    <h3 className="proj-sm-name">{p.name}</h3>
                    <div className="proj-sm-cat">{p.cat}</div>
                    <p className="proj-sm-desc">{p.desc}</p>
                    <div className="proj-pills">
                      {p.pills.map((x) => <span key={x} className="pill">{x}</span>)}
                    </div>
                    {p.links.length > 0 && (
                      <div className="proj-links">
                        {p.links.map((l) => (
                          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="proj-link">
                            {l.label} <ArrowUpRight size={13} />
                          </a>
                        ))}
                      </div>
                    )}
                  </LiquidCard>
                </motion.div>
              )
            })}
          </motion.div>

          {/* STRATEGY ARTIFACTS */}
          <Reveal className="gallery-divider">
            <span>Strategy artifacts — graded at distinction</span>
          </Reveal>
          <motion.div className="case-list" variants={container} initial="hidden"
            whileInView="show" viewport={{ once: true, amount: 0.1 }}>
            {CASES.map((c) => (
              <motion.div key={c.num} variants={fadeUp}>
                <LiquidCard className="glass case" tilt={false}>
                  <div className="case-num">{c.num}</div>
                  <div>
                    <div className="case-cat">{c.cat}</div>
                    <h3 className="case-title">{c.title}</h3>
                    <p className="case-desc">{c.desc}</p>
                  </div>
                  <div className="case-tags">
                    {c.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                  </div>
                </LiquidCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* Chapter 5 — The AI Business Mind */
function Mind() {
  return (
    <section id="mind">
      <div className="wrap">
        <Reveal className="sec-head">
          <Chapter n="05" title="The AI Business Mind" />
          <h2 className="sec-title">An operating system with <em>eight</em> processes.</h2>
        </Reveal>

        <motion.div className="mind-grid" variants={container} initial="hidden"
          whileInView="show" viewport={{ once: true, amount: 0.12 }}>
          {MIND.map((m) => {
            const Icon = m.icon
            return (
              <motion.div key={m.name} className="lg-item" variants={fadeUp}>
                <LiquidCard className="glass mind-tile">
                  <Magnetic strength={0.18}>
                    <span className="mind-icon"><Icon size={19} /></span>
                  </Magnetic>
                  <div className="mind-name">{m.name}</div>
                  <p className="mind-line">{m.line}</p>
                </LiquidCard>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="skill-grid">
          <Reveal>
            <div className="skill-col-head">Engineering & Data</div>
            {SKILLS_ENG.map((s) => <SkillBar key={s.name} s={s} />)}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="skill-col-head">Strategy & Business</div>
            {SKILLS_BIZ.map((s) => <SkillBar key={s.name} s={s} />)}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function SkillBar({ s }) {
  return (
    <div className="skill">
      <div className="skill-row">
        <span className="skill-name">{s.name}</span>
        <span className="skill-tag">{s.tag}</span>
      </div>
      <div className="skill-track">
        <motion.div className="skill-fill"
          initial={{ width: 0 }} whileInView={{ width: `${s.w}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
      </div>
    </div>
  )
}

/* Chapter 6 — The Future Vision */
function Vision() {
  return (
    <section id="vision">
      <div className="wrap">
        <Reveal className="sec-head" >
          <Chapter n="06" title="The Future Vision" />
        </Reveal>
        <Reveal className="vision-statement">
          <p>I'm going to build AI-powered businesses that connect <em>people, capital, technology, and opportunity</em> — starting where I'm from, reaching wherever the problem matters.</p>
        </Reveal>
        <Reveal className="vision-sub" delay={0.15}>
          <p>One venture is already in motion — in stealth, with a cofounder, on the ground. Ask me about it in person.</p>
        </Reveal>
      </div>
    </section>
  )
}

/* Chapter 7 — The Invitation */
function Invitation() {
  const [status, setStatus] = useState({ msg: '', ok: false, show: false })
  const [sending, setSending] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.target
    setSending(true)
    setStatus({ msg: '', ok: false, show: false })
    try {
      const res = await fetch('https://formsubmit.co/ajax/' + LINKS.email, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
          _subject: 'Portfolio contact: ' + form.name.value,
          _captcha: 'false',
        }),
      })
      const data = await res.json()
      if (data.success === 'true' || data.success === true) {
        setStatus({ msg: "Message received — I'll get back to you shortly.", ok: true, show: true })
        form.reset()
      } else throw new Error('failed')
    } catch {
      setStatus({ msg: 'Something went wrong. Email me directly at ' + LINKS.email, ok: false, show: true })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact">
      <div className="wrap">
        <Reveal className="sec-head">
          <Chapter n="07" title="The Invitation" />
        </Reveal>
        <Reveal className="lg-item">
          <LiquidCard className="glass contact-card" tilt={false}>
          <h2 className="contact-h">The next chapter has <em>room in it</em>.</h2>
          <p className="contact-sub">
            Apprenticeship enquiries, Rta Living collaboration, or a conversation about something worth doing — I'm ready to engage seriously.
          </p>
          <div className="contact-cols">
            <div className="contact-facts">
              <div>
                <div className="cfact-label">Email</div>
                <a href={`mailto:${LINKS.email}`} className="cfact-val"><Mail size={16} /> {LINKS.email}</a>
              </div>
              <div>
                <div className="cfact-label">Location</div>
                <span className="cfact-val"><MapPin size={16} /> Paris, France</span>
              </div>
              <div>
                <div className="cfact-label">Currently</div>
                <span className="cfact-val" style={{ fontSize: 14, color: 'var(--text-dim)' }}>
                  ESSEC MIM · Rta Living · open to apprenticeship Sept 2026
                </span>
              </div>
              <div>
                <div className="cfact-label">Find me</div>
                <div className="contact-socials">
                  <a href={LINKS.github} target="_blank" rel="noreferrer" className="social-btn" aria-label="GitHub"><Github size={18} /></a>
                  <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn"><Linkedin size={18} /></a>
                  <a href={`mailto:${LINKS.email}`} className="social-btn" aria-label="Email"><Mail size={18} /></a>
                </div>
              </div>
            </div>

            <form className="form" onSubmit={onSubmit}>
              <div className="fgroup">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="fgroup">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="fgroup">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell me about your role, project, or idea…" required />
              </div>
              <button type="submit" className="btn btn-primary" disabled={sending} style={{ alignSelf: 'flex-start' }}>
                {sending ? 'Sending…' : 'Send Message'} <ArrowRight size={15} />
              </button>
              {status.show && (
                <p className="form-status" style={{ color: status.ok ? 'var(--cyan)' : '#F0708A' }}>{status.msg}</p>
              )}
            </form>
          </div>
          </LiquidCard>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap footer-row">
        <span className="footer-brand">Jawahar Naidu</span>
        <span className="footer-copy">© 2026 · A living glass world — React, Framer Motion & the weather outside</span>
        <ul className="footer-links">
          <li><a href="#origin">Origin</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#vision">Vision</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default function App() {
  const mood = useMood()
  return (
    <>
      <Curtain />
      <Aurora />
      <Atmosphere mood={mood} />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero mood={mood} />
        <Origin />
        <Journey />
        <Gallery />
        <Mind />
        <Vision />
        <Invitation />
      </main>
      <Footer />
    </>
  )
}
