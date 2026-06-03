'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  ImageIcon,
  Loader2,
  Download,
  ZoomIn,
  FolderOpen,
} from 'lucide-react'

// ── Types ───────────────────────────────────────────────────────────
type GalleryImage = {
  id: string
  name: string
  url: string
  category: string
}

// ── Storage config ──────────────────────────────────────────────────
const BUCKET = 'wilway_africa'

// ── Scroll reveal ───────────────────────────────────────────────────
function Reveal({
  children, className = '', delay = 0,
}: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════════
export default function Page() {
  const [images, setImages]     = useState<GalleryImage[]>([])
  const [filtered, setFiltered] = useState<GalleryImage[]>([])
  const [search, setSearch]     = useState('')
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  // Lightbox
  const [lightbox, setLightbox]           = useState<GalleryImage | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // ── Fetch images from root of bucket ────────────────────────────
  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      setError(null)
      try {
        const { data, error: err } = await supabase
          .storage
          .from(BUCKET)
          .list('', {                          // ← empty string = root
            limit: 500,
            sortBy: { column: 'name', order: 'asc' },
          })

        if (err) throw err
        if (!data) throw new Error('No data returned')

        const allImages: GalleryImage[] = data
          .filter(f => f.name && !f.name.startsWith('.') && f.metadata)
          .map(file => {
            const { data: { publicUrl } } = supabase
              .storage
              .from(BUCKET)
              .getPublicUrl(file.name)           // ← just the filename, no folder prefix

            return {
              id: file.name,
              name: file.name
                .replace(/\.[^.]+$/, '')
                .replace(/[-_]/g, ' '),
              url: publicUrl,
              category: 'willway',
            }
          })

        setImages(allImages)
        setFiltered(allImages)
      } catch (err: any) {
        setError('Could not load images. Please check your connection and try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  // ── Search filter ───────────────────────────────────────────────
  useEffect(() => {
    if (search.trim()) {
      const q = search.toLowerCase()
      setFiltered(images.filter(i => i.name.toLowerCase().includes(q)))
    } else {
      setFiltered(images)
    }
  }, [search, images])

  // ── Lightbox nav ────────────────────────────────────────────────
  const openLightbox = (img: GalleryImage) => {
    const idx = filtered.findIndex(i => i.id === img.id)
    setLightboxIndex(idx)
    setLightbox(img)
  }

  const prevImage = useCallback(() => {
    const idx = (lightboxIndex - 1 + filtered.length) % filtered.length
    setLightboxIndex(idx)
    setLightbox(filtered[idx])
  }, [lightboxIndex, filtered])

  const nextImage = useCallback(() => {
    const idx = (lightboxIndex + 1) % filtered.length
    setLightboxIndex(idx)
    setLightbox(filtered[idx])
  }, [lightboxIndex, filtered])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightbox) return
      if (e.key === 'Escape')     setLightbox(null)
      if (e.key === 'ArrowLeft')  prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, prevImage, nextImage])

  // ── Masonry columns ─────────────────────────────────────────────
  const columns = [0, 1, 2].map(col =>
    filtered.filter((_, i) => i % 3 === col)
  )

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-white pt-20 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, #6CC7FE22 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#6CC7FE]/08 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-[350px] h-[350px] rounded-full bg-[#6CC7FE]/05 blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-[#6CC7FE] animate-pulse" />
            <span className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.2em] uppercase">
              Our Story in Pictures
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold tracking-[-0.03em] leading-[1.06] mb-5"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            Moments of <span className="text-[#6CC7FE]">Impact</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#9CA3AF] text-[15px] leading-[1.8] max-w-lg mx-auto mb-10"
          >
            Every photo tells the story of a community transformed, a child
            empowered, a life changed. This is WillWay Africa in action.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search photos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#F8FBFF] border border-gray-200 rounded-full
                pl-11 pr-5 py-3.5 text-[14px] text-[#0D0D0D] outline-none
                focus:border-[#6CC7FE] focus:shadow-[0_0_0_3px_rgba(108,199,254,0.15)]
                transition-all duration-200 placeholder:text-[#C4C9D4]"
            />
          </motion.div>
        </div>
      </section>

      {/* ── PHOTO COUNT BAR ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-14 mb-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px]
            font-bold border-2 bg-[#6CC7FE] text-white border-[#6CC7FE]
            shadow-[0_4px_16px_rgba(108,199,254,0.35)]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            WillWay Africa
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-white/25 text-white">
              {images.length}
            </span>
          </div>

          <span className="ml-auto flex items-center gap-1.5 text-[#9CA3AF] text-[12px]">
            <ImageIcon className="w-4 h-4" />
            {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* ── GALLERY GRID ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-14 pb-28">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="w-10 h-10 text-[#6CC7FE]" />
            </motion.div>
            <p className="text-[#9CA3AF] text-[14px]">Loading photos...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-300">
              <ImageIcon className="w-8 h-8" />
            </div>
            <p className="text-[#374151] font-semibold text-[15px]">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-[#6CC7FE] text-[13px] font-bold hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-20 h-20 rounded-3xl bg-[#6CC7FE]/10 border border-[#6CC7FE]/20 flex items-center justify-center">
              <FolderOpen className="w-10 h-10 text-[#6CC7FE]" />
            </div>
            <h3 className="font-extrabold text-[#0D0D0D] text-xl"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              No photos found
            </h3>
            <p className="text-[#9CA3AF] text-[14px]">
              {search ? `No results for "${search}"` : 'No photos available yet.'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-[#6CC7FE] text-[13px] font-bold hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Masonry grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-4">
                {col.map((img, imgIdx) => (
                  <Reveal key={img.id} delay={(colIdx * 0.04) + (imgIdx * 0.03)}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => openLightbox(img)}
                      className="relative group rounded-2xl overflow-hidden cursor-pointer
                        shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100"
                      style={{
                        aspectRatio:
                          (colIdx + imgIdx) % 3 === 0 ? '4/5'
                          : (colIdx + imgIdx) % 3 === 1 ? '1/1'
                          : '4/3',
                      }}
                    >
                      <Image
                        src={img.url}
                        alt={img.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t
                        from-[#0D0D0D]/70 via-[#0D0D0D]/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Hover content */}
                      <div className="absolute inset-0 flex flex-col justify-between
                        p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex justify-end">
                          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <ZoomIn className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div>
                          <span className="inline-block px-2.5 py-1 rounded-full
                            bg-[#6CC7FE]/80 text-white text-[10px] font-bold
                            tracking-wide uppercase mb-2">
                            WillWay Africa
                          </span>
                          <p className="text-white font-bold text-[13px] leading-tight capitalize line-clamp-2">
                            {img.name}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* LIGHTBOX                                               */}
      {/* ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm
              flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full
                bg-white/10 border border-white/20 flex items-center justify-center
                text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20
              px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
              <span className="text-white/80 text-[12px] font-semibold">
                {lightboxIndex + 1} / {filtered.length}
              </span>
            </div>

            {/* Prev */}
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              className="absolute left-4 z-20 w-11 h-11 rounded-full
                bg-white/10 border border-white/20 flex items-center justify-center
                text-white hover:bg-[#6CC7FE] hover:border-[#6CC7FE] transition-all duration-200"
              onClick={e => { e.stopPropagation(); prevImage() }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              className="absolute right-4 z-20 w-11 h-11 rounded-full
                bg-white/10 border border-white/20 flex items-center justify-center
                text-white hover:bg-[#6CC7FE] hover:border-[#6CC7FE] transition-all duration-200"
              onClick={e => { e.stopPropagation(); nextImage() }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Image */}
            <motion.div
              key={lightbox.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={lightbox.url}
                alt={lightbox.name}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                unoptimized
              />
            </motion.div>

            {/* Caption bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20
                bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl
                px-6 py-3 flex items-center gap-4 max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-[14px] capitalize truncate">
                  {lightbox.name}
                </p>
                <p className="text-white/50 text-[11px] mt-0.5">WillWay Africa</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#6CC7FE]/30
                border border-[#6CC7FE]/40 text-[#6CC7FE] text-[10px]
                font-bold tracking-wide uppercase flex-shrink-0">
                WillWay Africa
              </span>
              <a
                href={lightbox.url}
                download target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10
                  flex items-center justify-center text-white/70
                  hover:bg-[#6CC7FE] hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}