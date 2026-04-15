'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, ChevronRight } from 'lucide-react'

const NAV_ITEMS = [
  {
    label: 'About Us',
    href: '/',

  },
  { label: 'What We Do',   href: '/what-we-do' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact',      href: '/contact' },
]

export default function Navbar() {
  const [openMenu, setOpenMenu]     = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const timeoutRef                  = useRef<NodeJS.Timeout | null>(null)
  const navRef                      = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenMenu(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 180)
  }

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
    <header ref={navRef} className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-[72px]">

          {/* ── LOGO ─────────────────────────────────────────── */}
          <Link href="/">
            <Image src="/logo.png" alt="WillWay Africa" width={50} height={50} className="rounded-full" />
          </Link>

          {/* ── DESKTOP NAV ──────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <div key={item.label} className="relative">

                {/* Top-level WITH dropdown — clicking label navigates, hovering opens dropdown */}
                {item.dropdown ? (
                  <div
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                    className="flex items-center"
                  >
                    {/* Clickable label navigates to top-level href if present */}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="relative flex items-center gap-1 px-4 py-2 text-sm
                          font-medium text-gray-700 hover:text-black
                          after:content-[''] after:absolute after:left-0 after:bottom-0
                          after:h-[2px] after:w-0 after:bg-[#6CC7FE]
                          after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {item.label}
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                      </Link>
                    ) : (
                      <button
                        className="relative flex items-center gap-1 px-4 py-2 text-sm
                          font-medium text-gray-700 hover:text-black
                          after:content-[''] after:absolute after:left-0 after:bottom-0
                          after:h-[2px] after:w-0 after:bg-[#6CC7FE]
                          after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {item.label}
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    )}
                  </div>
                ) : (
                  // Plain links
                  <Link
                    href={item.href!}
                    className="relative px-4 py-2 text-sm font-medium text-gray-700
                      hover:text-black
                      after:content-[''] after:absolute after:left-0 after:bottom-0
                      after:h-[2px] after:w-0 after:bg-[#6CC7FE]
                      after:transition-all after:duration-300 hover:after:w-full
                      transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}

                {/* ── FIRST-LEVEL DROPDOWN ── */}
                {item.dropdown && openMenu === item.label && (
                  <div
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                    className="absolute top-full left-0 pt-2 z-50"
                  >
                    <div className="bg-white border border-gray-100 rounded-xl
                      shadow-[0_8px_30px_rgba(0,0,0,0.10)] py-2 min-w-[230px]">

                      {item.dropdown.map(sub => (
                        <div key={sub.label} className="relative group">

                          {sub.href ? (
                            <Link
                              href={sub.href}
                              className="flex items-center justify-between px-4 py-2.5
                                text-sm text-gray-700 hover:bg-[#6CC7FE]/08
                                hover:text-[#0D0D0D] transition-colors group/link"
                            >
                              <span className="flex items-center gap-2">
                                {item.label === 'About Us' && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#6CC7FE]
                                    opacity-0 group-hover/link:opacity-100 transition" />
                                )}
                                {sub.label}
                              </span>
                            </Link>
                          ) : (
                            <div className="flex items-center justify-between px-4 py-2.5
                              text-sm text-gray-700 hover:bg-[#6CC7FE]/08
                              hover:text-[#0D0D0D] transition-colors cursor-default">
                              <span>{sub.label}</span>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          )}

                          {/* ── SECOND-LEVEL DROPDOWN ── */}
                          {sub.dropdown && (
                            <div className="absolute top-0 left-full ml-1
                              opacity-0 invisible group-hover:opacity-100
                              group-hover:visible transition-all duration-150 z-50">
                              <div className="bg-white border border-gray-100 rounded-xl
                                shadow-[0_8px_30px_rgba(0,0,0,0.10)] py-2 min-w-[270px]">
                                {sub.dropdown.map(child => (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    className="flex items-center justify-between px-4 py-2.5
                                      text-sm text-gray-700 hover:bg-[#6CC7FE]/08
                                      hover:text-[#0D0D0D] transition-colors group/item"
                                  >
                                    <span>{child.label}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#6CC7FE]
                                      opacity-0 group-hover/item:opacity-100 transition" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── DONATE BUTTON ────────────────────────────────── */}
          <div className="hidden md:block">
            <Link
              href="/donate"
              className="bg-[#6CC7FE] text-[#0D0D0D] font-bold text-sm
                px-6 py-2.5 rounded-xl tracking-wide
                hover:bg-[#45b8f5] transition-colors duration-200
                shadow-[0_2px_10px_rgba(108,199,254,0.35)]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              DONATE
            </Link>
          </div>

          {/* ── MOBILE HAMBURGER ─────────────────────────────── */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg
              hover:bg-gray-50 transition"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[2px] bg-[#0D0D0D] rounded-full
              transition-all duration-300 origin-center
              ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-[#0D0D0D] rounded-full
              transition-all duration-300
              ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-[#0D0D0D] rounded-full
              transition-all duration-300 origin-center
              ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ──────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  {/* Mobile — clicking label navigates if href exists */}
                  {item.href ? (
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 px-3 py-2.5 text-sm font-medium text-gray-700"
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === item.label ? null : item.label)
                        }
                        className="px-3 py-2.5 text-gray-400 hover:text-[#6CC7FE]"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform
                          ${openMenu === item.label ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between px-3 py-2.5
                        rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform
                        ${openMenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  )}

                  {openMenu === item.label && (
                    <div className="ml-3 pl-3 border-l-2 border-[#6CC7FE]/30 mt-1 space-y-1">
                      {item.dropdown.map(sub => (
                        <div key={sub.label}>
                          {sub.href ? (
                            <Link
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2 text-sm text-gray-600
                                hover:text-[#6CC7FE] transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ) : (
                            <div className="px-3 py-1.5 text-[11px] font-bold
                              text-gray-400 uppercase tracking-widest">
                              {sub.label}
                            </div>
                          )}
                          {sub.dropdown && (
                            <div className="ml-3 pl-3 border-l border-gray-200 space-y-0.5">
                              {sub.dropdown.map(child => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block px-3 py-2 text-sm text-gray-500
                                    hover:text-[#6CC7FE] transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium
                    text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="pt-3">
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-[#6CC7FE] text-[#0D0D0D]
                font-bold text-sm py-3 rounded-xl tracking-wide
                hover:bg-[#45b8f5] transition-colors"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              DONATE
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}