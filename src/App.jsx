import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion'
import {
  Mail, MapPin, ArrowUpRight, ArrowRight, ChevronRight,
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

const ROLES = ['builder', 'strategist', 'founder']

/* Brand icons — removed from lucide-react v1, inlined as SVG */
const Github = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)
const Linkedin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

/* ════════════════════════════ MOTION HELPERS ══════════════════════════ */

const EASE = [0.22, 1, 0.36, 1]

function Reveal({ children, className, delay = 0, y = 40 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* hand-drawn squiggle underline — draws itself on view */
function Squiggle({ width = 220, color = 'var(--marigold)' }) {
  return (
    <motion.svg className="squiggle" width={width} height="14" viewBox="0 0 220 14" fill="none" aria-hidden>
      <motion.path
        d="M3 9 C 25 3, 45 13, 68 8 S 110 3, 132 9 S 175 13, 217 5"
        stroke={color} strokeWidth="3.4" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}

/* a framed artwork — hangs slightly crooked, straightens when you look closely */
function Frame({ children, rotate = -1.2, className = '' }) {
  return (
    <motion.div
      className={`frame ${className}`}
      initial={{ rotate }}
      whileHover={{ rotate: 0, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 180, damping: 16 }}
    >
      {children}
    </motion.div>
  )
}

/* museum placard under every exhibit */
function Placard({ code, title, year, medium, line }) {
  return (
    <div className="placard">
      <div className="placard-row">
        <span className="placard-code">{code}</span>
        <span className="placard-year">{year}</span>
      </div>
      <div className="placard-title">{title}</div>
      <div className="placard-medium">{medium}</div>
      {line && <p className="placard-line">{line}</p>}
    </div>
  )
}

/* scrolling marquee strip between rooms */
function Marquee({ items }) {
  const row = items.join('  ✦  ') + '  ✦  '
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        <span>{row}{row}</span>
      </div>
    </div>
  )
}

/* ════════════════════════════ EXHIBIT ARTWORKS (generated) ═══════════ */
/* Each project's visual is a bespoke SVG composition drawn in the gallery
   palette — no stock images, every line is intentional. Paths draw on view. */

const draw = (delay = 0, dur = 1.4) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: dur, delay, ease: 'easeInOut' },
})

/* WebForge — a brief flowing through two minds into a living site */
function ArtWebForge() {
  return (
    <svg viewBox="0 0 400 280" className="art" aria-label="WebForge artwork">
      <motion.path d="M30 140 C 90 60, 130 60, 165 120" stroke="var(--ink)" strokeWidth="2.5" fill="none" {...draw(0.1)} />
      <motion.path d="M195 130 C 230 190, 270 190, 320 150" stroke="var(--ink)" strokeWidth="2.5" fill="none" {...draw(0.5)} />
      <motion.circle cx="30" cy="140" r="10" fill="var(--coral)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, type: 'spring' }} />
      <motion.circle cx="180" cy="125" r="22" fill="none" stroke="var(--marigold)" strokeWidth="3" {...draw(0.4, 1)} />
      <motion.circle cx="180" cy="125" r="9" fill="var(--marigold)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, type: 'spring' }} />
      {/* the generated site — a small framed page coming alive */}
      <motion.rect x="318" y="118" width="58" height="74" rx="4" fill="none" stroke="var(--ink)" strokeWidth="2.5" {...draw(0.9, 1)} />
      <motion.line x1="328" y1="134" x2="366" y2="134" stroke="var(--coral)" strokeWidth="3" {...draw(1.4, 0.5)} />
      <motion.line x1="328" y1="148" x2="358" y2="148" stroke="var(--ink-soft)" strokeWidth="2" {...draw(1.6, 0.5)} />
      <motion.line x1="328" y1="160" x2="362" y2="160" stroke="var(--ink-soft)" strokeWidth="2" {...draw(1.7, 0.5)} />
      <motion.rect x="328" y="170" width="20" height="10" rx="3" fill="var(--marigold)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2 }} />
      <text x="30" y="175" className="art-note">a one-line brief</text>
      <text x="148" y="80" className="art-note">two claude minds</text>
      <text x="300" y="215" className="art-note">a living website</text>
    </svg>
  )
}

/* Rta Living — the vastu mandala as circuit: ancient grid, modern pulse */
function ArtRta() {
  const rings = [22, 38, 54]
  const sensors = [[140, 141], [260, 141], [140, 190], [260, 190]]
  const spinAt = { transformBox: 'fill-box', transformOrigin: 'center' }
  return (
    <svg viewBox="0 0 400 280" className="art" aria-label="Rta Living artwork">
      <defs>
        <clipPath id="rta-house"><rect x="118" y="118" width="164" height="94" rx="9" /></clipPath>
      </defs>
      {/* the sensing field — concentric pulses radiating from the hub, contained by the walls */}
      <g clipPath="url(#rta-house)">
        {rings.map((r, i) => (
          <motion.circle key={`r${i}`} cx="200" cy="165" r={r} fill="none"
            stroke="var(--coral)" strokeWidth={i === 2 ? 1.6 : 1.8} strokeDasharray="2 7"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: i === 2 ? 0.7 : 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.55 + i * 0.18, duration: 0.75, ease: EASE }}
            style={spinAt} />
        ))}
        {/* faint vastu cardinal axes — the dwelling, oriented */}
        <motion.line x1="118" y1="165" x2="282" y2="165" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="1 6"
          initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.5 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.35, duration: 0.8, ease: 'easeInOut' }} />
        <motion.line x1="200" y1="118" x2="200" y2="212" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="1 6"
          initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.5 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.45, duration: 0.8, ease: 'easeInOut' }} />
      </g>
      {/* the dwelling — body + roof, drawn on view */}
      <motion.rect x="118" y="118" width="164" height="94" rx="9" fill="none" stroke="var(--ink)" strokeWidth="2.6" {...draw(0.25, 1)} />
      <motion.path d="M104 124 L200 58 L296 124" fill="none" stroke="var(--ink)" strokeWidth="2.6"
        strokeLinecap="round" strokeLinejoin="round" {...draw(0.05, 0.9)} />
      {/* distributed sensors at the four quarters */}
      {sensors.map(([cx, cy], i) => (
        <motion.circle key={`s${i}`} cx={cx} cy={cy} r="3.4" fill="var(--coral)"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ delay: 1.3 + i * 0.1, type: 'spring', stiffness: 240, damping: 12 }} style={spinAt} />
      ))}
      {/* the brahmasthan — central sensor hub */}
      <motion.circle cx="200" cy="165" r="9.5" fill="var(--marigold)" stroke="var(--ink)" strokeWidth="1.6"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ delay: 1.05, type: 'spring', stiffness: 220, damping: 11 }} style={spinAt} />
      <motion.circle cx="200" cy="165" r="2.6" fill="var(--paper-card)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4 }} />
      <text x="200" y="256" textAnchor="middle" className="art-note">the home, sensing</text>
    </svg>
  )
}

/* Tara — a voice fanning out of the machine in warm arcs */
function ArtTara() {
  return (
    <svg viewBox="0 0 400 280" className="art" aria-label="Tara artwork">
      <motion.rect x="60" y="180" width="64" height="42" rx="8" fill="none" stroke="var(--ink)" strokeWidth="2.5" {...draw(0.1, 0.8)} />
      <motion.line x1="76" y1="232" x2="108" y2="232" stroke="var(--ink)" strokeWidth="2.5" {...draw(0.4, 0.4)} />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path key={i}
          d={`M 140 200 q ${60 + i * 38} ${-95 - i * 22} ${130 + i * 44} ${-12 + i * 4}`}
          stroke={i % 2 ? 'var(--marigold)' : 'var(--coral)'}
          strokeWidth={3.4 - i * 0.4} fill="none" strokeLinecap="round"
          {...draw(0.4 + i * 0.16, 1.1)} />
      ))}
      <text x="60" y="262" className="art-note">always listening, never leaving the mac</text>
    </svg>
  )
}

/* Fertilizer AI — soil strata feeding one perfect leaf */
function ArtFertilizer() {
  return (
    <svg viewBox="0 0 400 280" className="art" aria-label="Fertilizer AI artwork">
      {[0, 1, 2, 3].map((i) => (
        <motion.line key={i} x1={60 + i * 8} y1={198 + i * 12} x2={340 - i * 8} y2={198 + i * 12}
          stroke={i === 0 ? 'var(--marigold)' : 'var(--ink-soft)'} strokeWidth={4 - i * 0.6} strokeLinecap="round"
          strokeDasharray={i ? '10 8' : 'none'} {...draw(0.1 + i * 0.15, 0.9)} />
      ))}
      <motion.path d="M200 198 C 200 158, 198 128, 200 96" stroke="var(--ink)" strokeWidth="2.5" fill="none" {...draw(0.7, 0.9)} />
      <motion.path d="M200 130 C 165 120, 150 90, 158 62 C 190 70, 202 96, 200 130 Z"
        fill="var(--marigold)" stroke="var(--ink)" strokeWidth="2"
        initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ delay: 1.4, type: 'spring', stiffness: 120 }} style={{ transformOrigin: '200px 130px' }} />
      <motion.path d="M200 110 C 235 100, 252 74, 246 48 C 213 56, 199 80, 200 110 Z"
        fill="var(--coral)" stroke="var(--ink)" strokeWidth="2"
        initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ delay: 1.6, type: 'spring', stiffness: 120 }} style={{ transformOrigin: '200px 110px' }} />
      <text x="200" y="270" textAnchor="middle" className="art-note">the soil decides, the model listens</text>
    </svg>
  )
}

/* ════════════════════════════ CHROME ══════════════════════════════════ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />
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
    ['origin', '#origin'], ['formation', '#formation'], ['exhibits', '#exhibits'], ['mind', '#mind'], ['vision', '#vision'],
  ]
  return (
    <nav id="nav" className={stuck ? 'stuck' : ''}>
      <div className="wrap nav-row">
        <a href="#entrance" className="nav-brand" onClick={close}>J<span>awahar</span></a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([label, href]) => (
            <li key={href}><a href={href} onClick={close}>{label}</a></li>
          ))}
          <li><a href={LINKS.github} target="_blank" rel="noreferrer" className="nav-icon" aria-label="GitHub"><Github size={17} /></a></li>
          <li><a href="#guestbook" className="nav-cta" onClick={close}>guestbook</a></li>
        </ul>
        <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu"
          onClick={() => { const n = !open; setOpen(n); document.body.style.overflow = n ? 'hidden' : '' }}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

/* room label — like the lettering at a gallery room's entrance */
function RoomLabel({ no, name }) {
  return (
    <Reveal className="room-label">
      <span className="room-no">{no}</span>
      <span className="room-name">{name}</span>
    </Reveal>
  )
}

/* ════════════════════════════ ROOMS ═══════════════════════════════════ */

/* The Entrance */
function Entrance() {
  const [roleIdx, setRoleIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <section id="entrance">
      <div className="wrap">
        <motion.div className="ticket" initial={{ opacity: 0, y: -16, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }} transition={{ delay: 0.2, duration: 0.7, ease: EASE }}>
          <span className="ticket-perf" />admit one · paris · open for apprenticeship sept 2026
        </motion.div>
        <h1 className="hero-h1">
          <motion.span className="line" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: EASE }}>
            gallery of an
          </motion.span>
          <motion.span className="line accent" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: EASE }}>
            entre&shy;preneur
          </motion.span>
        </h1>
        <motion.div className="hero-byline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <span className="by">curated &amp; built by</span>
          <span className="name">Jawahar Naidu —&nbsp;
            <AnimatePresence mode="wait">
              <motion.em key={roleIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
                {ROLES[roleIdx]}
              </motion.em>
            </AnimatePresence>
          </span>
          <Squiggle width={190} />
        </motion.div>
        <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          I build where business, AI, and human behavior meet.
          Every piece in this gallery shipped. Nothing here is a slide.
        </motion.p>
        <motion.div className="hero-cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.6, ease: EASE }}>
          <a href="#exhibits" className="btn btn-ink">enter the exhibits <ArrowRight size={15} /></a>
          <a href={LINKS.github} target="_blank" rel="noreferrer" className="btn btn-line"><Github size={15} /> github</a>
        </motion.div>
      </div>
      <motion.div className="scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        scroll into room I <span className="cue-arrow">↓</span>
      </motion.div>
    </section>
  )
}

/* Room I — The Origin */
function Origin() {
  return (
    <section id="origin">
      <div className="wrap">
        <RoomLabel no="room I" name="the origin" />
        <div className="origin-grid">
          <Reveal>
            <h2 className="room-title">before the code,<br />there was <em>land</em>.</h2>
            <div className="origin-mark" aria-hidden>
              <span className="origin-mark-rule" />
              <span className="origin-mark-text">atoms &amp; bits</span>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="origin-body">
            <p>I grew up in <strong>Anantapur</strong>, in a family that builds — construction and real estate. dinner-table talk was land, deals, people, timing. I learned early that property is never about buildings; it's about trust, capital, and reading what people actually want.</p>
            <p>then computers arrived — a second kind of building, where the materials were free and the only limit was how clearly you could think. I went to <strong>Bengaluru</strong> for computer science and never stopped switching between the two worlds: atoms and bits, deals and systems.</p>
            <p className="origin-kicker">that double lens is the thread through every exhibit below.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Room II — The Formation */
const ACTS = [
  {
    no: 'i', period: '2021 — 2025', title: 'the engineer', inst: 'REVA University · Bengaluru',
    desc: 'B.Tech CS, honours. algorithms, full-stack, AI/ML — then shipped in industry: PHP systems at PocketLite, digital transformation for 30+ SME clients at PandaECE (GenAI cut production time 40%).',
  },
  {
    no: 'ii', period: '2025 — now', title: 'the strategist', inst: 'ESSEC Business School · Paris',
    desc: 'Master in Management at a top-5 European grande école. distinction-level work in competitive strategy, GTM, financial modelling. learning to make the numbers and the narrative agree.',
  },
  {
    no: 'iii', period: '2025 — now', title: 'the builder', inst: 'Rta Living · Paris',
    desc: 'co-founding a smart-home AI platform — IoT sensors, an AI personalisation engine, Vastu-informed design. architecture, GTM and brand from first principles. live at rtaliving.com.',
  },
]

function Formation() {
  return (
    <section id="formation">
      <div className="wrap">
        <RoomLabel no="room II" name="the formation" />
        <Reveal><h2 className="room-title">engineer who learned <em>strategy</em>.<br />strategist who still ships.</h2></Reveal>
        <div className="acts">
          {ACTS.map((a, i) => (
            <Reveal key={a.no} delay={i * 0.12}>
              <Frame rotate={i === 1 ? 1 : -1.2} className="act-frame">
                <div className="act">
                  <div className="act-no">{a.no}</div>
                  <div className="act-period">{a.period}</div>
                  <h3 className="act-title">{a.title}</h3>
                  <div className="act-inst">{a.inst}</div>
                  <p className="act-desc">{a.desc}</p>
                </div>
              </Frame>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* The Main Hall — exhibits */
const EXHIBITS = [
  {
    code: 'EX·01', year: '2026', title: 'WebForge', Art: ArtWebForge, rotate: -1.4,
    medium: 'python · anthropic SDK · telegram · playwright · prompt caching',
    hook: 'a one-line brief becomes a live, deployed website.',
    story: 'an agentic pipeline built end-to-end: a telegram bot takes the brief, claude haiku expands it into a creative spec, claude sonnet generates the site, a playwright deployer ships it live. the static prompt rides on prompt caching — ~70–90% input-token savings. right model for each job. real cost engineering, not a demo.',
    proves: 'proves: LLM orchestration + the economics of running AI in production.',
    links: [{ label: 'view on github', href: LINKS.webforge }],
  },
  {
    code: 'EX·02', year: '2025—', title: 'Rta Living', Art: ArtRta, rotate: 1.2,
    medium: 'typescript turborepo · react/next · ESP32-S3 sensor stack · AI personalisation',
    hook: 'a 5,000-year-old spatial philosophy, wired with sensors.',
    story: 'co-founded a smart-home AI platform merging vastu principles with modern IoT — temperature, light, air-quality and presence sensing feeding a personalisation engine. built as a real monorepo (web + mobile, shared api/ui/tokens), with a B2C european GTM developed from scratch. live at rtaliving.com.',
    proves: 'proves: product vision, hardware + software integration, founder execution.',
    links: [{ label: 'rtaliving.com', href: LINKS.rta }, { label: 'repo', href: LINKS.rtaRepo }],
  },
  {
    code: 'EX·03', year: '2026', title: 'Tara', Art: ArtTara, rotate: -1,
    medium: 'whisper (local) · claude with model routing · neural indian-english voice',
    hook: 'an always-on voice that lives on my mac, not in a cloud.',
    story: 'a voice assistant that never leaves the machine: local whisper ears, a claude brain that routes between models by task weight, and a natural indian-english neural voice. private by design — my data stays mine. built, debugged and shipped in days, not sprints.',
    proves: 'proves: applied AI engineering — speech, routing, cost control — on my own hardware.',
    links: [],
  },
  {
    code: 'EX·04', year: '2025', title: 'Fertilizer Prediction AI', Art: ArtFertilizer, rotate: 1.4,
    medium: 'python · scikit-learn · data pipeline',
    hook: 'machine learning where it feeds people.',
    story: 'a model that recommends optimal fertilizer from soil and crop conditions — full pipeline from data preparation through training and evaluation, published and documented. agriculture is where I\'m from; this is AI pointed at it.',
    proves: 'proves: classical ML fundamentals, end-to-end, in a domain that matters.',
    links: [{ label: 'view repo', href: LINKS.fertilizer }],
  },
]

const ARCHIVE = [
  {
    code: 'AR·01', cat: 'strategy · ESSEC · distinction',
    title: 'Zipcar — post-acquisition growth',
    desc: 'network effects, pricing architecture, moat erosion after the Avis Budget acquisition. three scenarios + capital allocation. graded distinction.',
  },
  {
    code: 'AR·02', cat: 'GTM · ESSEC',
    title: 'Domino RH — aerospace workforce GTM',
    desc: 'full go-to-market against Manpower, Adecco, Randstad on a €565M baseline — a 77-question economic feasibility framework.',
  },
  {
    code: 'AR·03', cat: 'transformation · PandaECE',
    title: 'SME portfolio — GenAI workflows',
    desc: 'GenAI in content pipelines across 30+ e-commerce clients; the Power BI dashboards leadership ran weekly. ~40% less manual overhead.',
  },
]

function Exhibits() {
  return (
    <section id="exhibits">
      <div className="wrap">
        <RoomLabel no="main hall" name="the exhibits" />
        <Reveal><h2 className="room-title">things I've <em>shipped</em> —<br />hung like the art they are.</h2></Reveal>

        <div className="exhibit-list">
          {EXHIBITS.map((ex, i) => {
            const { Art } = ex
            return (
              <div key={ex.code} className={`exhibit ${i % 2 ? 'flip' : ''}`}>
                <Reveal delay={0.05} className="exhibit-art-col">
                  <Frame rotate={ex.rotate}>
                    <div className="art-mat"><Art /></div>
                  </Frame>
                </Reveal>
                <Reveal delay={0.18} className="exhibit-text">
                  <Placard code={ex.code} title={ex.title} year={ex.year} medium={ex.medium} />
                  <p className="exhibit-hook">“{ex.hook}”</p>
                  <p className="exhibit-story">{ex.story}</p>
                  <p className="exhibit-proves">{ex.proves}</p>
                  {ex.links.length > 0 && (
                    <div className="exhibit-links">
                      {ex.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="ex-link">
                          {l.label} <ArrowUpRight size={13} />
                        </a>
                      ))}
                    </div>
                  )}
                </Reveal>
              </div>
            )
          })}
        </div>

        <Reveal className="archive-head">
          <span className="archive-rule" />
          <span className="archive-title">the archive — strategy on paper</span>
          <span className="archive-rule" />
        </Reveal>
        <div className="archive-list">
          {ARCHIVE.map((a, i) => (
            <Reveal key={a.code} delay={i * 0.1}>
              <div className="archive-item">
                <span className="archive-code">{a.code}</span>
                <div>
                  <div className="archive-cat">{a.cat}</div>
                  <h3 className="archive-name">{a.title}</h3>
                  <p className="archive-desc">{a.desc}</p>
                </div>
                <ChevronRight size={16} className="archive-chev" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Room III — The Mind */
const MIND = [
  { mark: '01', name: 'AI', line: 'right model for the job. cache what repeats. ship the pipeline, not the demo.' },
  { mark: '02', name: 'strategy', line: 'moats, pricing power, where the market is actually going — not where the deck says.' },
  { mark: '03', name: 'product', line: 'useful, beautiful, commercially sharp. in that order. all three required.' },
  { mark: '04', name: 'finance', line: 'every idea survives or dies in the unit economics. I build the model first.' },
  { mark: '05', name: 'real estate', line: 'I grew up around property. land, capital and timing are in my blood.' },
  { mark: '06', name: 'marketing', line: 'distribution is half the product. the best build loses to the best story.' },
  { mark: '07', name: 'story', line: 'people decide on narrative and justify with numbers. I write for the decision.' },
  { mark: '08', name: 'execution', line: 'a shipped imperfect thing beats a perfect plan. iterate in public.' },
]

function Mind() {
  return (
    <section id="mind">
      <div className="wrap">
        <RoomLabel no="room III" name="the mind" />
        <Reveal><h2 className="room-title">eight prints from<br />one <em>operating system</em>.</h2></Reveal>
        <div className="mind-grid">
          {MIND.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 0.08}>
              <Frame rotate={i % 2 ? 0.9 : -0.9} className="mind-frame">
                <div className="mind-tile">
                  <span className="mind-glyph" aria-hidden>{m.mark}</span>
                  <div className="mind-name">{m.name}</div>
                  <p className="mind-line">{m.line}</p>
                </div>
              </Frame>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Room IV — The Vision */
function Vision() {
  return (
    <section id="vision">
      <div className="wrap">
        <RoomLabel no="room IV" name="the vision" />
        <Reveal>
          <p className="vision-statement">
            I'm going to build AI-powered businesses that connect <em>people, capital, technology and opportunity</em> — starting where I'm from, reaching wherever the problem matters.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="vision-sub">one venture is already in motion — in stealth, with a cofounder, on the ground. ask me about it in person.</p>
        </Reveal>
      </div>
    </section>
  )
}

/* The Guestbook */
function Guestbook() {
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
        setStatus({ msg: "received — I'll write back soon.", ok: true, show: true })
        form.reset()
      } else throw new Error('failed')
    } catch {
      setStatus({ msg: 'something broke. email me directly: ' + LINKS.email, ok: false, show: true })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="guestbook">
      <div className="wrap">
        <RoomLabel no="exit" name="the guestbook" />
        <Reveal>
          <h2 className="room-title gb-title">the next chapter<br />has <em>room in it</em>.</h2>
        </Reveal>
        <div className="gb-grid">
          <Reveal delay={0.1} className="gb-facts">
            <p className="gb-lead">apprenticeship enquiries, rta living collaboration, or a conversation about something worth doing — I'm ready to engage seriously.</p>
            <div className="gb-fact"><span>email</span><a href={`mailto:${LINKS.email}`}><Mail size={15} /> {LINKS.email}</a></div>
            <div className="gb-fact"><span>location</span><span className="v"><MapPin size={15} /> paris, france</span></div>
            <div className="gb-fact"><span>currently</span><span className="v">ESSEC MIM · rta living · open from sept 2026</span></div>
            <div className="gb-socials">
              <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href={`mailto:${LINKS.email}`} aria-label="Email"><Mail size={18} /></a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Frame rotate={0.8}>
              <form className="gb-form" onSubmit={onSubmit}>
                <label htmlFor="name">your name</label>
                <input id="name" name="name" type="text" placeholder="sign the guestbook" required />
                <label htmlFor="email">email</label>
                <input id="email" name="email" type="email" placeholder="you@somewhere.com" required />
                <label htmlFor="message">message</label>
                <textarea id="message" name="message" placeholder="a role, a project, an idea…" required />
                <button type="submit" className="btn btn-ink" disabled={sending}>
                  {sending ? 'sending…' : 'leave a note'} <ArrowRight size={14} />
                </button>
                {status.show && <p className="gb-status" style={{ color: status.ok ? 'var(--marigold)' : 'var(--coral)' }}>{status.msg}</p>}
              </form>
            </Frame>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap footer-row">
        <span className="footer-brand">Jawahar Naidu</span>
        <span className="footer-copy">© 2026 · built by hand in paris · react + framer motion</span>
        <ul className="footer-links">
          <li><a href="#origin">origin</a></li>
          <li><a href="#exhibits">exhibits</a></li>
          <li><a href="#guestbook">guestbook</a></li>
          <li><a href={LINKS.github} target="_blank" rel="noreferrer">github</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Entrance />
        <Marquee items={['builder', 'strategist', 'founder', 'paris', 'anantapur', 'bengaluru']} />
        <Origin />
        <Formation />
        <Marquee items={['EX·01 webforge', 'EX·02 rta living', 'EX·03 tara', 'EX·04 fertilizer ai', 'the archive']} />
        <Exhibits />
        <Mind />
        <Vision />
        <Guestbook />
      </main>
      <Footer />
    </>
  )
}
