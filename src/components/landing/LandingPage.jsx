import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { number: 9,   suffix: '',    label: 'Grade Levels',   desc: 'Grade 1 through 9' },
  { number: 100, suffix: '%',   label: 'KICD Aligned',   desc: 'Official curriculum' },
  { number: 0,   suffix: 'KSh', label: 'Cost Forever',   desc: 'Free for every student' },
  { number: 80,  suffix: '%',   label: 'Pass Threshold', desc: 'Mastery-based learning' },
]

const FEATURES = [
  { number: '01', title: 'Curriculum Synchronized', body: 'Every lesson maps directly to a KICD strand and sub-strand. Nothing is added, nothing is missing.', icon: '📐' },
  { number: '02', title: 'Mastery Before Progress',  body: 'Students must score 80% on a quiz before a lesson is marked complete. Genuine understanding, not passive watching.', icon: '🎯' },
  { number: '03', title: 'Zero Friction Access',     body: 'No advertisements. No subscription tiers. No paywalls. A student in Turkana and a student in Karen access identical quality.', icon: '⚡' },
  { number: '04', title: 'Bilingual by Design',      body: 'The entire platform switches between English and Kiswahili instantly. Language is never a barrier to learning.', icon: '🌍' },
  { number: '05', title: 'Cloud-Synced Progress',    body: 'Start a lesson on a school tablet. Finish the quiz on a parent\'s phone. Progress follows the student, not the device.', icon: '☁️' },
  { number: '06', title: 'Built for Low Bandwidth',  body: 'Engineered for entry-level Android devices on 2G connections. Quality education does not require a fast connection.', icon: '📱' },
]

const CURRICULUM_PREVIEW = [
  { grade: 7, subject: 'Integrated Science', strand: 'Laboratory Safety',  sub: 'Lab Safety Rules',            difficulty: 'Beginner',     duration: 'Watch' },
  { grade: 7, subject: 'Integrated Science', strand: 'Mixtures',           sub: 'Separating Mixtures',         difficulty: 'Intermediate', duration: 'Watch' },
  { grade: 7, subject: 'Integrated Science', strand: 'Acids & Bases',      sub: 'Acids, Bases and Indicators', difficulty: 'Intermediate', duration: 'Watch' },
  { grade: 4, subject: 'Mathematics',        strand: 'Numbers',             sub: 'Whole Numbers up to 999,999', difficulty: 'Beginner',     duration: '12 min' },
  { grade: 7, subject: 'Integrated Science', strand: 'Human Body',         sub: 'Human Reproductive System',   difficulty: 'Intermediate', duration: 'Watch' },
  { grade: 4, subject: 'Mathematics',        strand: 'Measurement',        sub: 'Length',                      difficulty: 'Beginner',     duration: '10 min' },
]

// ── Animated counter ──────────────────────────────────────────
const CountUp = ({ target, suffix, duration = 1500 }) => {
  const [count, setCount] = useState(0)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// ── Landing Page ──────────────────────────────────────────────
const LandingPage = () => {
  const { signInWithGoogle, authError } = useAuth()
  const { language, setLanguage } = useApp()
  const navigate   = useNavigate()
  const [signingIn, setSigningIn] = useState(false)
  const [scrolled,  setScrolled]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignIn = async () => {
    setSigningIn(true)
    await signInWithGoogle()
    setSigningIn(false)
  }

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">

      {/* ── Navbar ────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center
                            justify-center flex-shrink-0">
              <span className="text-white text-sm font-black">M</span>
            </div>
            <div>
              <div className="font-black text-gray-900 text-lg tracking-tight leading-none">
                MWANGAZA
              </div>
              <div className="h-0.5 w-full mt-0.5" style={{ background: '#C9A84C' }} />
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'About',      href: '#about' },
              { label: 'Features',   href: '#features' },
              { label: 'Curriculum', href: '#curriculum' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-900
                           font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
              className="hidden sm:block text-sm text-gray-500 hover:text-gray-900
                         font-medium transition-colors"
            >
              {language === 'en' ? 'Kiswahili' : 'English'}
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="hidden sm:block text-sm text-gray-600 font-semibold
                         hover:text-blue-600 transition-colors px-3 py-2"
            >
              Explore
            </button>
            <button
              onClick={handleSignIn}
              disabled={signingIn}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold
                         rounded-lg hover:bg-blue-700 active:scale-95
                         transition-all disabled:opacity-70"
            >
              {signingIn ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#1a56db 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Blue glow */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(26,86,219,0.07) 0%, transparent 70%)',
          }}
        />

        {/* Gold glow */}
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{
                  borderColor: 'rgba(201,168,76,0.4)',
                  backgroundColor: 'rgba(201,168,76,0.06)',
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: '#C9A84C' }}
                />
                <span
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: '#B8860B' }}
                >
                  Kenya · CBE Aligned · Grade 1–9
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black
                         leading-[0.95] tracking-tight mb-8 text-gray-900"
            >
              Education
              <br />
              <span className="text-blue-600">without</span>
              <br />
              barriers.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed max-w-xl mb-10"
            >
              Mwangaza delivers KICD-aligned lessons and assessments
              to every Kenyan student — from Grade 1 to Grade 9 —
              at zero cost, forever.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <button
                onClick={handleSignIn}
                disabled={signingIn}
                className="flex items-center gap-3 px-6 py-3.5 bg-blue-600
                           text-white font-semibold rounded-xl hover:bg-blue-700
                           active:scale-95 transition-all duration-150
                           shadow-lg shadow-blue-600/20 disabled:opacity-70"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="white" fillOpacity=".95" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="white" fillOpacity=".95" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="white" fillOpacity=".95" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="white" fillOpacity=".95" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {signingIn ? 'Signing in…' : 'Continue with Google'}
              </button>

              <button
                onClick={() => navigate('/explore')}
                className="flex items-center gap-2 px-6 py-3.5 border border-gray-200
                           text-gray-700 font-semibold rounded-xl hover:border-gray-300
                           hover:bg-gray-50 active:scale-95 transition-all duration-150"
              >
                Explore the curriculum
                <span className="text-gray-400">→</span>
              </button>
            </motion.div>

            {authError && (
              <p className="mt-4 text-sm text-red-600">{authError}</p>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-sm text-gray-400"
            >
              No credit card. No subscription. Free for every Kenyan student.
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2
                     flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-px h-10 rounded-full"
            style={{ background: 'linear-gradient(to bottom, #cbd5e1, transparent)' }}
          />
        </motion.div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8
                          lg:gap-0 lg:divide-x divide-gray-200">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center lg:px-8"
              >
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-1">
                  <CountUp target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-400">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────── */}
      <section id="about" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-px" style={{ backgroundColor: '#C9A84C' }} />
                <p className="text-xs font-bold uppercase tracking-widest"
                   style={{ color: '#B8860B' }}>
                  The Problem
                </p>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6 text-gray-900">
                Quality education
                should not depend
                on your postcode.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-5">
                In Kenya, the quality of education a child receives is directly
                tied to where they live and what their parents earn. A student
                in Nairobi gets tutors, printed worksheets, and revision classes.
                A student in Turkana gets none of that.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Mwangaza exists to close that gap. Every lesson. Every quiz.
                Every grade. Available to every Kenyan child with a phone —
                free, forever.
              </p>
            </motion.div>

            {/* Access gap bars */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {[
                { city: 'Karen, Nairobi',  access: 95 },
                { city: 'Kisumu CBD',       access: 71 },
                { city: 'Eldoret Town',     access: 58 },
                { city: 'Garissa',          access: 34 },
                { city: 'Turkana County',   access: 18 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{item.city}</span>
                    <span className="text-gray-400 text-xs">
                      {item.access}% digital access
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.access}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        background: item.access > 70
                          ? '#1a56db'
                          : item.access > 40
                            ? '#C9A84C'
                            : '#ef4444',
                      }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-300 pt-2">
                Estimated digital education access by region · 2024
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section id="features" className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-px" style={{ backgroundColor: '#C9A84C' }} />
              <p className="text-xs font-bold uppercase tracking-widest"
                 style={{ color: '#B8860B' }}>
                How It Works
              </p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-gray-900">
              Built on four
              non-negotiable principles.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white p-8 hover:bg-blue-50 transition-colors
                           duration-300 group"
              >
                <div className="text-xs font-bold text-gray-200 mb-6
                                font-mono tracking-wider">
                  {feature.number}
                </div>
                <div className="text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-3
                               group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum Preview ─────────────────────────────────── */}
      <section id="curriculum" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end
                          justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-px" style={{ backgroundColor: '#C9A84C' }} />
                <p className="text-xs font-bold uppercase tracking-widest"
                   style={{ color: '#B8860B' }}>
                  The Curriculum
                </p>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight text-gray-900">
                Every KICD lesson.
                Every grade.
                All in one place.
              </h2>
            </motion.div>

            <button
              onClick={() => navigate('/explore')}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-3
                         border border-gray-200 text-gray-700 font-semibold
                         text-sm rounded-xl hover:border-blue-300
                         hover:text-blue-600 transition-all duration-150"
            >
              Browse all lessons →
            </button>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200
                            px-6 py-3 text-xs font-semibold text-gray-400
                            uppercase tracking-wider">
              <div className="col-span-1">Grade</div>
              <div className="col-span-3">Subject</div>
              <div className="col-span-3">Strand</div>
              <div className="col-span-3">Lesson</div>
              <div className="col-span-1">Time</div>
              <div className="col-span-1">Level</div>
            </div>

            {CURRICULUM_PREVIEW.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 px-6 py-4 border-b border-gray-100
                           last:border-0 hover:bg-blue-50 transition-colors
                           duration-150 items-center"
              >
                <div className="col-span-1">
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-md"
                    style={{
                      color: '#1a56db',
                      backgroundColor: 'rgba(26,86,219,0.07)',
                    }}
                  >
                    G{item.grade}
                  </span>
                </div>
                <div className="col-span-3 text-sm font-medium text-gray-800">
                  {item.subject}
                </div>
                <div className="col-span-3 text-sm text-gray-400">
                  {item.strand}
                </div>
                <div className="col-span-3 text-sm text-gray-700 font-medium">
                  {item.sub}
                </div>
                <div className="col-span-1 text-xs text-gray-400">
                  {item.duration}
                </div>
                <div className="col-span-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    item.difficulty === 'Beginner'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {item.difficulty}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-300 mt-6">
            Showing 6 of many lessons · All content is KICD verified
          </p>
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────────────────────── */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-px" style={{ backgroundColor: '#C9A84C' }} />
                <p className="text-xs font-bold uppercase tracking-widest"
                   style={{ color: '#C9A84C' }}>
                  Engineering
                </p>
              </div>
              <h2 className="text-4xl font-black leading-tight mb-6 text-white">
                Production-grade
                infrastructure.
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Built on a lean, battle-tested stack optimised for speed,
                reliability, and scale. The same tools used by the world's
                fastest-growing products.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'React 18',      role: 'UI Framework',  detail: 'Concurrent rendering' },
                { name: 'Vite',          role: 'Build Tool',     detail: 'Sub-second HMR' },
                { name: 'Supabase',      role: 'Backend + Auth', detail: 'PostgreSQL + RLS' },
                { name: 'Tailwind CSS',  role: 'Styling',        detail: 'Utility-first CSS' },
                { name: 'Framer Motion', role: 'Animations',     detail: 'Physics-based motion' },
                { name: 'Google OAuth',  role: 'Authentication', detail: 'Zero-friction sign in' },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-gray-800 rounded-xl p-4 border border-gray-700
                             hover:border-blue-500/40 transition-colors duration-200"
                >
                  <div className="font-bold text-white text-sm mb-0.5">
                    {tech.name}
                  </div>
                  <div className="text-gray-400 text-xs mb-1">{tech.role}</div>
                  <div className="text-xs" style={{ color: '#C9A84C' }}>
                    {tech.detail}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <div
              className="w-12 h-0.5 mx-auto mb-10 rounded-full"
              style={{ backgroundColor: '#C9A84C' }}
            />
            <h2 className="text-5xl lg:text-7xl font-black leading-tight mb-6 text-gray-900">
              Start learning
              <br />
              <span className="text-blue-600">today.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Join Mwangaza and access every KICD lesson,
              quiz and progress tracker — free, forever.
            </p>

            <button
              onClick={handleSignIn}
              disabled={signingIn}
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600
                         text-white font-bold text-base rounded-xl
                         hover:bg-blue-700 active:scale-95 transition-all
                         duration-150 shadow-xl shadow-blue-600/20
                         disabled:opacity-70"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="white" fillOpacity=".95" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="white" fillOpacity=".95" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="white" fillOpacity=".95" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="white" fillOpacity=".95" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {signingIn ? 'Signing in…' : 'Get Started with Google'}
            </button>

            <p className="mt-5 text-sm text-gray-400">
              No payment. No setup. Instant access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row
                        items-center justify-between gap-4">

          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">M</span>
            </div>
            <span className="font-black text-gray-900 text-sm tracking-tight">
              MWANGAZA
            </span>
            <div className="w-px h-3 bg-gray-200 mx-1" />
            <span className="text-xs text-gray-400">by GlideTech</span>
          </div>

          <p className="text-gray-400 text-xs text-center">
            Built for every Kenyan student · Free forever · KICD Aligned
          </p>

          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#C9A84C' }}
            />
            <span className="text-gray-400 text-xs">© 2024 GlideTech</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage