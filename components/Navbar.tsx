'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// ── Dropdown menu data ──────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: 'About Us',
    dropdown: [
      { label: 'Our Story',       href: '/about' },
      { label: 'Our Mission',     href: '/about#mission' },
      { label: 'Meet the Team',   href: '/about#team' },
      { label: 'Our Impact',      href: '/about#impact' },
    ],
  },
  {
    label: 'What We Do',
    dropdown: [
      { label: 'Education',              href: '/programs/education' },
      { label: 'Preventive Health',      href: '/programs/health' },
      { label: 'Sustainable Livelihoods',href: '/programs/livelihoods' },
      { label: 'Governance',             href: '/programs/governance' },
    ],
  },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Blog',    href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

// ── Dropdown panel animation ────────────────────────────────────────
const dropdownVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -6, scale: 0.97,
    transition: { duration: 0.15 } },
}

export default function Navbar() {
  const [openMenu, setOpenMenu]     = useState<string | null>(null)
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef                      = useRef<HTMLDivElement>(null)

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.08)]' : 'border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── LOGO ─────────────────────────────────────────── */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="WillWay Africa"
              width={52}
              height={52}
              className="rounded-full object-contain"
              priority
            />
          </Link>

          {/* ── DESKTOP NAV ──────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  // Items WITH dropdown
                  <button
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                    onClick={() =>
                      setOpenMenu(openMenu === item.label ? null : item.label)
                    }
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium
                      transition-colors duration-150 select-none
                      ${openMenu === item.label
                        ? 'text-[#0D0D0D] bg-gray-50'
                        : 'text-[#374151] hover:text-[#0D0D0D] hover:bg-gray-50'
                      }`}
                  >
                    {item.label}
                    <motion.span
                      animate={{ rotate: openMenu === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </motion.span>
                  </button>
                ) : (
                  // Plain links
                  <Link
                    href={item.href!}
                    className="flex items-center px-4 py-2 rounded-lg text-sm font-medium
                      text-[#374151] hover:text-[#0D0D0D] hover:bg-gray-50
                      transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                )}

                {/* ── DROPDOWN PANEL ── */}
                {item.dropdown && (
                  <div
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                    className="absolute top-full left-0 pt-1"
                  >
                    <AnimatePresence>
                      {openMenu === item.label && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.10)]
                            border border-gray-100 py-2 min-w-[200px] overflow-hidden"
                        >
                          {item.dropdown.map(sub => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setOpenMenu(null)}
                              className="flex items-center px-4 py-2.5 text-sm text-[#374151]
                                hover:bg-[#6CC7FE]/10 hover:text-[#0D0D0D]
                                transition-colors duration-150 group"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6CC7FE] mr-3
                                opacity-0 group-hover:opacity-100 transition-opacity" />
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── DONATE BUTTON ────────────────────────────────── */}
          <div className="hidden md:block">
            <motion.a
              href="/donate"
              whileHover={{ scale: 1.04, backgroundColor: '#3aaef0' }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#6CC7FE] text-[#0D0D0D] font-bold text-sm
                px-6 py-2.5 rounded-xl tracking-wide transition-colors
                shadow-[0_2px_10px_rgba(108,199,254,0.35)]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              DONATE
            </motion.a>
          </div>

          {/* ── MOBILE HAMBURGER ─────────────────────────────── */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-gray-50 transition"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[2px] bg-[#0D0D0D] rounded-full origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
              className="block w-5 h-[2px] bg-[#0D0D0D] rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[2px] bg-[#0D0D0D] rounded-full origin-center"
            />
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map(item => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === item.label ? null : item.label)
                        }
                        className="w-full flex items-center justify-between px-3 py-2.5
                          rounded-lg text-sm font-medium text-[#374151]
                          hover:bg-gray-50 transition-colors"
                      >
                        {item.label}
                        <motion.span
                          animate={{ rotate: openMenu === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openMenu === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-3 pl-3 border-l-2 border-[#6CC7FE]/30 overflow-hidden"
                          >
                            {item.dropdown.map(sub => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => { setOpenMenu(null); setMobileOpen(false) }}
                                className="block px-3 py-2 text-sm text-[#6B7280]
                                  hover:text-[#0D0D0D] transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-sm font-medium
                        text-[#374151] hover:bg-gray-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile donate */}
              <div className="pt-3">
                <a
                  href="/donate"
                  className="block w-full text-center bg-[#6CC7FE] text-[#0D0D0D]
                    font-bold text-sm py-3 rounded-xl tracking-wide"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  DONATE
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}