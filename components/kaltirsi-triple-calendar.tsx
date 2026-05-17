"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  KALTIRSI_MONTHS, KALTIRSI_LUNAR_MONTHS, GODKA_GROUPS,
  getCurrentKaltirsiMonth, type HexTemporalMonth
} from "@/lib/kaltirsi-data"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import { cn } from "@/lib/utils"
import { Sun, Moon, Star, Flame, ChevronRight, ChevronLeft, Sparkles, Anchor, Wind, Plus, Trash, Search, Calendar, Info } from "lucide-react"

type CalendarLayer = "qorraxeed" | "dayaxeed" | "xiddigeed"

const LAYER_CONFIG = {
  qorraxeed: {
    icon: Sun,
    label: "Kaltirsi Qorraxeed",
    labelEn: "Solar Calendar",
    description: "365-day agricultural cycle — farming, seasons, pastoral life",
    descriptionSo: "Wareegga 365-maalmood — beeraha, xiliyaalka, xoolo-dhaqashada",
    color: "#D9A441",
    gradient: "linear-gradient(135deg, #D9A441 0%, #E85D04 100%)",
  },
  dayaxeed: {
    icon: Moon,
    label: "Kaltirsi Dayaxeed",
    labelEn: "Lunar Calendar",
    description: "354-day cycle — religious festivals, legal contracts, night herding",
    descriptionSo: "Wareegga 354-maalmood — ciidaha diinta, heshiisyada, dhaqasho habeennimo",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 50%, #A78BFA 100%)",
  },
  xiddigeed: {
    icon: Star,
    label: "Kaltirsi Xiddigeed",
    labelEn: "Stellar Calendar",
    description: "28 Godka lunar stations — navigation, weather prediction, star mapping",
    descriptionSo: "28 Godka xiddigaha — hagida, saadaalinta cimilada, khariidadda xiddigaha",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, #0E7490 0%, #06B6D4 50%, #22D3EE 100%)",
  },
}

// ── SOLAR VIEW ──────────────────────────────────────────────────
interface KaltirsiEvent {
  id: string;
  title: string;
  category: "pastoral" | "cultural" | "administrative" | "personal";
  description: string;
  time?: string;
}

function QorraxeedView() {
  const now = useMemo(() => new Date(), [])
  const kDate = useMemo(() => KaltirsiEngine.gregorianToKaltirsi(now), [now])
  const currentMonth = useMemo(() => getCurrentKaltirsiMonth(kDate.month), [kDate.month])
  
  const [selectedMonthId, setSelectedMonthId] = useState<number | null>(null)
  const [activeDayNumber, setActiveDayNumber] = useState<number | null>(null)
  const [events, setEvents] = useState<Record<string, KaltirsiEvent[]>>({})
  const [searchQuery, setSearchQuery] = useState("")

  // Form state for Event Modal
  const [eventTitle, setEventTitle] = useState("")
  const [eventDesc, setEventDesc] = useState("")
  const [eventCat, setEventCat] = useState<KaltirsiEvent["category"]>("personal")

  // Load events from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("kaltirsi-events")
      if (stored) {
        setEvents(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Failed to load events:", e)
    }
  }, [])

  // Save events to LocalStorage
  const saveEvents = (updatedEvents: Record<string, KaltirsiEvent[]>) => {
    setEvents(updatedEvents)
    try {
      localStorage.setItem("kaltirsi-events", JSON.stringify(updatedEvents))
    } catch (e) {
      console.error("Failed to save events:", e)
    }
  }

  // Add event handler
  const handleAddEvent = () => {
    if (!eventTitle.trim() || selectedMonthId === null || activeDayNumber === null) return
    
    const dateKey = `${kDate.year}-${selectedMonthId}-${activeDayNumber}`
    const newEvent: KaltirsiEvent = {
      id: typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      title: eventTitle.trim(),
      category: eventCat,
      description: eventDesc.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const dayEvents = events[dateKey] ? [...events[dateKey], newEvent] : [newEvent]
    const updated = { ...events, [dateKey]: dayEvents }
    
    saveEvents(updated)
    
    // Reset form
    setEventTitle("")
    setEventDesc("")
    setEventCat("personal")
    setActiveDayNumber(null)
  }

  // Delete event handler
  const handleDeleteEvent = (dateKey: string, eventId: string) => {
    if (!events[dateKey]) return
    const filtered = events[dateKey].filter(e => e.id !== eventId)
    
    const updated = { ...events }
    if (filtered.length === 0) {
      delete updated[dateKey]
    } else {
      updated[dateKey] = filtered
    }
    
    saveEvents(updated)
  }

  const activeMonth = useMemo(() => {
    if (selectedMonthId === null) return currentMonth
    return KALTIRSI_MONTHS.find(m => m.id === selectedMonthId) || currentMonth
  }, [selectedMonthId, currentMonth])

  const handlePrevMonth = () => {
    setSelectedMonthId(prev => {
      const target = prev === null ? kDate.month : prev
      return target === 1 ? 12 : target - 1
    })
  }

  const handleNextMonth = () => {
    setSelectedMonthId(prev => {
      const target = prev === null ? kDate.month : prev
      return target === 12 ? 1 : target + 1
    })
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMonthId === null) return
      if (e.key === "ArrowLeft") {
        handlePrevMonth()
      } else if (e.key === "ArrowRight") {
        handleNextMonth()
      } else if (e.key === "Escape") {
        if (activeDayNumber !== null) {
          setActiveDayNumber(null)
        } else {
          setSelectedMonthId(null)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedMonthId, activeDayNumber])

  // Bidirectional date converter
  const getGregorianEquivalent = (day: number) => {
    const ANCHOR_MONTH = 6 // July
    const ANCHOR_DAY = 20
    const MONTH_LENGTH = 365.25 / 12

    if (selectedMonthId === null) return new Date()

    const anchorYear = kDate.year - 1098
    const anchorDate = new Date(anchorYear, ANCHOR_MONTH, ANCHOR_DAY)
    
    const diffDays = (selectedMonthId - 1) * MONTH_LENGTH + (day - 1)
    const gregorianMs = anchorDate.getTime() + diffDays * 24 * 60 * 60 * 1000
    return new Date(gregorianMs)
  }

  // Render category dot
  const getCategoryColor = (cat: KaltirsiEvent["category"]) => {
    switch (cat) {
      case "pastoral": return "bg-emerald-500 text-emerald-400"
      case "cultural": return "bg-purple-500 text-purple-400"
      case "administrative": return "bg-cyan-500 text-cyan-400"
      default: return "bg-[#D9A441] text-[#D9A441]"
    }
  }

  // Month-wide events selector
  const monthEvents = useMemo(() => {
    if (selectedMonthId === null) return []
    const list: { day: number; events: KaltirsiEvent[] }[] = []
    for (let d = 1; d <= activeMonth.daysInMonth; d++) {
      const dateKey = `${kDate.year}-${selectedMonthId}-${d}`
      if (events[dateKey] && events[dateKey].length > 0) {
        list.push({ day: d, events: events[dateKey] })
      }
    }
    return list
  }, [selectedMonthId, events, activeMonth, kDate.year])

  // Natural language date jumping & search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchQuery.trim().toLowerCase()
    if (!query) return

    // 1. Check if query is a month name
    const foundMonth = KALTIRSI_MONTHS.find(
      m => m.name.toLowerCase().includes(query) || m.nameEnglish.toLowerCase().includes(query)
    )
    if (foundMonth) {
      setSelectedMonthId(foundMonth.id)
      setSearchQuery("")
      return
    }

    // 2. Check if query is something like "today" / "maanta"
    if (query === "today" || query === "maanta") {
      setSelectedMonthId(kDate.month)
      setSearchQuery("")
      return
    }
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {selectedMonthId === null ? (
          <motion.div 
            key="grid-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Search Bar / Natural Language Jumper */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Gali bisha aad rabto ama qor 'maanta' (e.g. 'Aminla', 'Samalaho')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.02] border border-white/5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D9A441]/40 focus:bg-white/[0.04] transition-all"
                />
              </div>
              <button 
                type="button"
                onClick={() => setSelectedMonthId(kDate.month)}
                className="px-5 py-3 rounded-2xl bg-[#D9A441]/10 border border-[#D9A441]/20 text-xs font-bold text-[#D9A441] hover:bg-[#D9A441]/20 transition-all uppercase tracking-wider whitespace-nowrap"
              >
                Maanta
              </button>
            </form>

            {/* Current Month Highlight */}
            <div 
              className="rounded-2xl p-5 border border-[#D9A441]/20 cursor-pointer transition-all hover:scale-[1.01] hover:border-[#D9A441]/40 shadow-xl" 
              style={{ background: currentMonth.themeGradient }}
              onClick={() => setSelectedMonthId(currentMonth.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-white animate-pulse" />
                  <span className="text-white/70 text-xs uppercase tracking-widest font-mono">
                    Bisha Hadda / Active Kaltirsi Month
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/80 font-bold bg-black/20 px-2.5 py-1 rounded-full border border-white/10">
                  Day {kDate.day}
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">{currentMonth.name}</h3>
              <p className="text-white/80 text-sm mt-1">{currentMonth.nameEnglish} · {currentMonth.season}</p>
              <p className="text-white/60 text-xs mt-2 italic border-l-2 border-white/30 pl-3">{currentMonth.ecologicalIndicatorSo}</p>
            </div>

            {/* Month Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {KALTIRSI_MONTHS.map((m) => {
                const isCurrent = m.id === kDate.month
                return (
                  <motion.div
                    key={m.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMonthId(m.id)}
                    className={cn(
                      "rounded-2xl p-4 border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-[120px] shadow-lg",
                      isCurrent
                        ? "border-[#D9A441]/30 bg-[#D9A441]/5 shadow-[0_0_20px_rgba(217,164,65,0.05)]"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10"
                    )}
                  >
                    {isCurrent && (
                      <div 
                        className="absolute inset-0 opacity-10 pointer-events-none" 
                        style={{ background: m.themeGradient }} 
                      />
                    )}
                    <div className="flex items-center justify-between relative z-10">
                      <span className={cn(
                        "text-[10px] font-mono uppercase tracking-wider",
                        isCurrent ? "text-primary font-bold" : "text-muted-foreground/40"
                      )}>
                        Bil {m.id.toString().padStart(2, '0')}
                      </span>
                      <div
                        className="w-2 h-2 rounded-full shadow-sm"
                        style={{ backgroundColor: m.themeColor }}
                      />
                    </div>
                    
                    <div className="space-y-0.5">
                      <div className={cn(
                        "text-base font-bold relative z-10",
                        isCurrent ? "text-white" : "text-white/80"
                      )}>
                        {m.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground/50 relative z-10 truncate">
                        {m.nameEnglish}
                      </div>
                    </div>

                    <div className="flex items-center justify-between relative z-10 pt-2 border-t border-white/5 mt-1">
                      <span className={cn(
                        "text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        m.season === "Xagaa" ? "bg-orange-500/10 text-orange-400" :
                        m.season === "Dayr" ? "bg-amber-700/10 text-amber-600" :
                        m.season === "Jiilaal" ? "bg-blue-500/10 text-blue-400" :
                        "bg-emerald-500/10 text-emerald-400"
                      )}>
                        {m.season}
                      </span>
                      <span className="text-[9px] text-[#D9A441]/80 font-mono font-bold">GI: {m.grazingIndex}/10</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail-view"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Main Days Grid Calendar (Left Pane) */}
            <div className="lg:col-span-2 space-y-4">
              {/* Detailed Banner with Navigation */}
              <div 
                className="p-5 rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl flex flex-col justify-between min-h-[140px]"
                style={{ background: activeMonth.themeGradient }}
              >
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Top row nav buttons */}
                <div className="relative z-10 flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedMonthId(null)}
                    className="px-3 py-1.5 text-xs rounded-full bg-black/40 hover:bg-black/60 text-white/90 border border-white/10 transition-colors flex items-center gap-2"
                  >
                    <ChevronLeft className="h-3 w-3" />
                    Dib u noqo
                  </button>

                  <div className="flex gap-1.5">
                    <button 
                      onClick={handlePrevMonth}
                      className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => setSelectedMonthId(kDate.month)}
                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center transition-colors"
                    >
                      Maanta
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Title */}
                <div className="relative z-10 mt-4">
                  <span className="text-white/60 font-mono text-[10px] tracking-widest uppercase block mb-1">
                    Kaltirsi Month {activeMonth.id.toString().padStart(2, '0')} · {activeMonth.season}
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-white">
                    {activeMonth.name}
                  </h2>
                  <p className="text-white/80 text-xs mt-0.5 leading-none">
                    Meaning: <span className="italic">"{activeMonth.exactMeaningSomali}"</span>
                  </p>
                </div>
              </div>

              {/* Calendar Days Grid */}
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-xs uppercase tracking-widest font-mono text-white/40">Dabshid Month Matrix</span>
                  <span className="text-[10px] text-white/30 font-mono">Tap any cell to block time / schedule pastoral alerts</span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2">
                  {Array.from({ length: activeMonth.daysInMonth }).map((_, idx) => {
                    const dayNum = idx + 1
                    const gregEquivalent = getGregorianEquivalent(dayNum)
                    const dateKey = `${kDate.year}-${selectedMonthId}-${dayNum}`
                    const dayEventsList = events[dateKey] || []
                    
                    const isCurrentDay = kDate.year === kDate.year && kDate.month === selectedMonthId && kDate.day === dayNum
                    
                    const formattedGreg = gregEquivalent.toLocaleDateString("en-US", { month: "short", day: "numeric" })

                    return (
                      <motion.div
                        key={dayNum}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveDayNumber(dayNum)}
                        className={cn(
                          "rounded-xl p-2.5 border transition-all cursor-pointer flex flex-col justify-between h-[85px] relative group overflow-hidden",
                          isCurrentDay 
                            ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
                            : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10"
                        )}
                      >
                        <div className="flex items-start justify-between relative z-10">
                          <span className={cn(
                            "text-sm font-black font-mono leading-none",
                            isCurrentDay ? "text-emerald-400" : "text-white/80"
                          )}>
                            {dayNum.toString().padStart(2, '0')}
                          </span>
                          
                          {/* Event marker dots */}
                          {dayEventsList.length > 0 && (
                            <div className="flex gap-0.5">
                              {dayEventsList.slice(0, 3).map((ev) => (
                                <span 
                                  key={ev.id} 
                                  className={cn("w-1.5 h-1.5 rounded-full shrink-0", 
                                    ev.category === "pastoral" ? "bg-emerald-400" :
                                    ev.category === "cultural" ? "bg-purple-400" :
                                    ev.category === "administrative" ? "bg-cyan-400" : "bg-[#D9A441]"
                                  )} 
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="relative z-10">
                          <span className="text-[8px] text-white/30 font-mono uppercase block truncate leading-none">
                            {formattedGreg}
                          </span>
                          {dayEventsList.length > 0 ? (
                            <span className="text-[8px] font-bold text-primary block mt-1 truncate max-w-full">
                              {dayEventsList[0].title}
                            </span>
                          ) : (
                            <span className="text-[7px] text-white/10 uppercase font-mono block mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              + Plan
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar Details (Right Pane) */}
            <div className="space-y-6">
              {/* Monthly Pastoral Intelligence Brief */}
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-5 shadow-2xl space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <Info className="h-4.5 w-4.5 text-[#D9A441]" />
                  <h4 className="text-xs uppercase tracking-widest font-mono text-white/50">Month Matrix Briefing</h4>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-white/30 block">Linguistic Sign</span>
                    <p className="text-xs text-white/85 leading-relaxed">{activeMonth.detailedDescription}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 rounded-xl bg-white/[0.01] border border-white/5">
                      <span className="text-[8px] uppercase text-white/30 block">Ecological GI</span>
                      <span className="text-xs font-mono font-bold text-[#D9A441]">{activeMonth.grazingIndex}/10</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.01] border border-white/5">
                      <span className="text-[8px] uppercase text-white/30 block">Drought Strain</span>
                      <span className="text-xs font-mono font-bold text-red-400 capitalize">{activeMonth.droughtRisk}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#D9A441]/5 border border-[#D9A441]/10 text-center flex flex-col items-center justify-center">
                    <span className="text-[9px] text-[#D9A441] italic font-serif">"{activeMonth.proverb}"</span>
                    <span className="text-[8px] text-white/30 font-mono uppercase block mt-1">Nomadic Proverb</span>
                  </div>
                </div>
              </div>

              {/* Scheduled Month Events List */}
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h4 className="text-xs uppercase tracking-widest font-mono text-white/50">Events in {activeMonth.name}</h4>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                    {monthEvents.reduce((acc, m) => acc + m.events.length, 0)} items
                  </span>
                </div>

                {monthEvents.length === 0 ? (
                  <div className="py-8 text-center text-[10px] text-white/20 uppercase font-mono">
                    No events blocked for this month
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {monthEvents.map(({ day, events: dayEvents }) => (
                      <div key={day} className="space-y-1.5">
                        <span className="text-[9px] font-mono font-bold text-white/40 block">Day {day.toString().padStart(2, '0')}</span>
                        {dayEvents.map((ev) => (
                          <div 
                            key={ev.id} 
                            className="flex items-center justify-between p-2 rounded-xl bg-white/[0.01] border border-white/5 group/ev hover:bg-white/[0.03] transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", 
                                ev.category === "pastoral" ? "bg-emerald-400" :
                                ev.category === "cultural" ? "bg-purple-400" :
                                ev.category === "administrative" ? "bg-cyan-400" : "bg-[#D9A441]"
                              )} />
                              <div className="min-w-0">
                                <span className="text-xs text-white/95 font-medium block truncate leading-tight">{ev.title}</span>
                                <span className="text-[9px] text-white/40 font-mono block leading-none mt-0.5">{ev.time} · {ev.category}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleDeleteEvent(`${kDate.year}-${selectedMonthId}-${day}`, ev.id)}
                              className="text-white/20 hover:text-red-400 p-1 opacity-0 group-hover/ev:opacity-100 transition-opacity"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cheat Sheet & Info */}
              <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-4 text-[10px] text-white/30 space-y-2">
                <span className="font-mono font-bold uppercase tracking-wider block">⌨ Keyboard Control Plane</span>
                <div className="grid grid-cols-2 gap-2 font-mono text-[9px]">
                  <div>← Prev Month</div>
                  <div>→ Next Month</div>
                  <div>Esc Close/Back</div>
                  <div>Maanta Focus Today</div>
                </div>
              </div>
            </div>

            {/* Event Creation & Action Briefing Modal */}
            <AnimatePresence>
              {activeDayNumber !== null && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[100] p-4"
                  onClick={() => setActiveDayNumber(null)}
                >
                  <motion.div 
                    initial={{ scale: 0.95, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 15 }}
                    transition={{ type: "spring", damping: 25, stiffness: 220 }}
                    className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0c0c12]/95 p-6 shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button 
                      onClick={() => setActiveDayNumber(null)}
                      className="absolute top-4 right-4 text-white/50 hover:text-white text-lg font-bold w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors"
                    >
                      ×
                    </button>
                    
                    <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center border border-white/10 bg-[#D9A441]/10">
                        <Plus className="h-5 w-5 text-[#D9A441]" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-[#D9A441] uppercase font-bold block">Temporal Action Plan</span>
                        <h3 className="text-lg font-bold text-white mt-0.5">Day {activeDayNumber.toString().padStart(2, '0')} · {activeMonth.name}</h3>
                        <span className="text-[10px] text-white/40 block mt-0.5">
                          Gregorian: {getGregorianEquivalent(activeDayNumber).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </div>

                    {/* List existing day events */}
                    {events[`${kDate.year}-${selectedMonthId}-${activeDayNumber}`] && events[`${kDate.year}-${selectedMonthId}-${activeDayNumber}`].length > 0 && (
                      <div className="mb-4 bg-white/[0.01] border border-white/5 rounded-2xl p-3 space-y-2 max-h-[120px] overflow-y-auto">
                        <span className="text-[9px] font-mono text-white/30 uppercase block">Day Schedule</span>
                        {events[`${kDate.year}-${selectedMonthId}-${activeDayNumber}`].map((ev) => (
                          <div key={ev.id} className="flex justify-between items-center bg-white/[0.01] p-2 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2">
                              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", getCategoryColor(ev.category).split(" ")[0])} />
                              <span className="text-xs text-white/90 font-medium">{ev.title}</span>
                            </div>
                            <button 
                              onClick={() => handleDeleteEvent(`${kDate.year}-${selectedMonthId}-${activeDayNumber}`, ev.id)}
                              className="text-white/20 hover:text-red-400 p-1 transition-colors"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Form */}
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/30 uppercase tracking-widest font-mono block">Plan Name</label>
                        <input 
                          type="text"
                          placeholder="Gali magaca hawsha ama kulanka..."
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D9A441] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/30 uppercase tracking-widest font-mono block">Category Vector</label>
                        <div className="grid grid-cols-2 gap-2">
                          {(["personal", "pastoral", "cultural", "administrative"] as const).map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setEventCat(cat)}
                              className={cn(
                                "px-3 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all",
                                eventCat === cat
                                  ? "bg-[#D9A441]/10 border-[#D9A441] text-[#D9A441] shadow-lg shadow-[#D9A441]/5"
                                  : "bg-transparent border-white/5 text-white/40 hover:text-white hover:bg-white/5"
                              )}
                            >
                              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", 
                                cat === "pastoral" ? "bg-emerald-400" :
                                cat === "cultural" ? "bg-purple-400" :
                                cat === "administrative" ? "bg-cyan-400" : "bg-[#D9A441]"
                              )} />
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/30 uppercase tracking-widest font-mono block">Deep Context Description</label>
                        <textarea 
                          placeholder="Qor faahfaahinta hawshan..."
                          value={eventDesc}
                          onChange={(e) => setEventDesc(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D9A441] transition-all resize-none"
                        />
                      </div>

                      <div className="flex gap-2.5 pt-2 border-t border-white/5">
                        <button
                          type="button"
                          onClick={() => setActiveDayNumber(null)}
                          className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white/60 hover:text-white transition-all uppercase tracking-wider"
                        >
                          Ka noqo
                        </button>
                        <button
                          type="button"
                          onClick={handleAddEvent}
                          disabled={!eventTitle.trim()}
                          className="flex-1 py-3 rounded-xl bg-[#D9A441] text-xs font-bold text-black hover:bg-[#D9A441]/90 transition-all uppercase tracking-wider disabled:opacity-40 disabled:pointer-events-none"
                        >
                          Xaqiiji Qorshaha
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── LUNAR VIEW ──────────────────────────────────────────────────
function DayaxeedView() {
  const now = new Date()
  let hijriStr = ""
  try {
    hijriStr = KaltirsiEngine.getHijriDate(now)
  } catch { hijriStr = "—" }

  return (
    <div className="space-y-4">
      {/* Current Hijri Date */}
      <div className="rounded-2xl p-5 border border-purple-500/20"
        style={{ background: LAYER_CONFIG.dayaxeed.gradient }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Moon className="h-5 w-5 text-white" />
          <span className="text-white/70 text-xs uppercase tracking-widest font-mono">
            Taariikhda Dayaxeed / Lunar Date
          </span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-white">{hijriStr}</h3>
        <p className="text-white/60 text-xs mt-1">354.37-day cycle — synced to indigenous Somali naming</p>
        <p className="text-white/50 text-xs italic mt-0.5">Wareegga 354.37-maalmood — la xidhiidha magacyada asalka ah ee Soomaalida</p>
      </div>

      {/* Lunar Month Grid */}
      <div className="space-y-1.5">
        {KALTIRSI_LUNAR_MONTHS.map((lm, i) => (
          <motion.div
            key={lm.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 text-xs font-bold">{lm.id}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">{lm.nameSomali}</span>
                <span className="text-[10px] text-muted-foreground/50">({lm.nameArabic})</span>
              </div>
              <div className="text-[10px] text-muted-foreground/60">
                {lm.significance}
              </div>
            </div>
            <ChevronRight className="h-3 w-3 text-muted-foreground/30 flex-shrink-0" />
          </motion.div>
        ))}
      </div>

      {/* Note about Afarta bila samman */}
      <div className="rounded-xl bg-purple-500/5 border border-purple-500/10 p-3">
        <p className="text-[10px] text-purple-300/70 uppercase tracking-wider mb-1">Afarta Bila Samman</p>
        <p className="text-xs text-muted-foreground">
          Months 3–6 (Mowliid, Maalmadoone, Rajalo Hore, Rajalo Dhexe) are collectively known as
          the <span className="text-purple-400 font-medium italic">"Afarta bila samman"</span> — the four unnamed months.
        </p>
      </div>
    </div>
  )
}

// ── STELLAR VIEW ────────────────────────────────────────────────
function XiddigeedView() {
  const now = new Date()
  const currentGodka = KaltirsiEngine.getCurrentGodka(now)

  return (
    <div className="space-y-4">
      {/* Current Godka Highlight */}
      <div className="rounded-2xl p-5 border border-cyan-500/20"
        style={{ background: LAYER_CONFIG.xiddigeed.gradient }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-white" />
          <span className="text-white/70 text-xs uppercase tracking-widest font-mono">
            Godka Hadda / Active Lunar Station
          </span>
        </div>
        {currentGodka && (
          <>
            <h3 className="text-2xl font-serif font-bold text-white">{currentGodka.nameSomali}</h3>
            <p className="text-white/80 text-sm mt-1">{currentGodka.mainStar} — {currentGodka.constellation}</p>
            <p className="text-white/60 text-xs mt-1">{currentGodka.weatherPattern}</p>
            <p className="text-white/50 text-xs italic mt-0.5">{currentGodka.agriculturalSignificance}</p>
          </>
        )}
      </div>

      {/* Four Seasonal Groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {GODKA_GROUPS.map((group, gi) => {
          const seasonColors = [
            "border-orange-500/20 bg-orange-500/5",
            "border-amber-700/20 bg-amber-700/5",
            "border-blue-500/20 bg-blue-500/5",
            "border-emerald-500/20 bg-emerald-500/5",
          ]
          const seasonTextColors = ["text-orange-400", "text-amber-600", "text-blue-400", "text-emerald-400"]

          return (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.1 }}
              className={cn("rounded-xl border p-4", seasonColors[gi])}
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className={cn("h-4 w-4", seasonTextColors[gi])} />
                <h4 className={cn("text-sm font-bold", seasonTextColors[gi])}>{group.nameSomali}</h4>
              </div>
              <p className="text-[10px] text-muted-foreground/50 mb-2">{group.season}</p>
              <div className="flex flex-wrap gap-1">
                {group.stars.map((star) => {
                  const isActive = currentGodka?.nameSomali === star
                  return (
                    <span
                      key={star}
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full border",
                        isActive
                          ? "bg-primary/20 border-primary/30 text-primary font-bold"
                          : "bg-white/5 border-white/5 text-muted-foreground/60"
                      )}
                    >
                      {star}
                    </span>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Synchronization Note */}
      <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/10 p-3">
        <p className="text-[10px] text-cyan-300/70 uppercase tracking-wider mb-1">Is-waafajinta / Synchronization</p>
        <p className="text-xs text-muted-foreground">
          The occultation of <span className="text-cyan-400 font-medium">Dirir (Spica)</span> by the moon is the traditional
          mechanism to synchronize the 354-day lunar calendar with the 365-day solar calendar.
        </p>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT: Triple Calendar Layer Navigator
// ═══════════════════════════════════════════════════════════════════
export function KaltirsiTripleCalendar() {
  const [activeLayer, setActiveLayer] = useState<CalendarLayer>("qorraxeed")
  const config = LAYER_CONFIG[activeLayer]

  return (
    <div className="space-y-4">
      {/* Layer Tabs */}
      <div className="flex gap-1.5 p-1 rounded-xl bg-white/[0.02] border border-white/5">
        {(Object.entries(LAYER_CONFIG) as [CalendarLayer, typeof LAYER_CONFIG.qorraxeed][]).map(([key, cfg]) => {
          const Icon = cfg.icon
          const isActive = key === activeLayer
          return (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveLayer(key)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all",
                isActive
                  ? "shadow-lg border"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
              style={isActive ? {
                background: `${cfg.color}15`,
                borderColor: `${cfg.color}30`,
                color: cfg.color,
              } : undefined}
            >
              <Icon className="h-4 w-4" />
              <div className="text-left hidden sm:block">
                <div className="font-bold text-[11px]">{cfg.label}</div>
                <div className="text-[9px] opacity-60">{cfg.labelEn}</div>
              </div>
              <div className="text-left sm:hidden">
                <div className="font-bold">{cfg.label.split(" ")[1]}</div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Layer Description */}
      <div className="flex items-center gap-3 px-1">
        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: config.color }} />
        <div>
          <p className="text-xs text-muted-foreground">{config.description}</p>
          <p className="text-[10px] text-muted-foreground/50 italic">{config.descriptionSo}</p>
        </div>
      </div>

      {/* Active Layer View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLayer}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeLayer === "qorraxeed" && <QorraxeedView />}
          {activeLayer === "dayaxeed" && <DayaxeedView />}
          {activeLayer === "xiddigeed" && <XiddigeedView />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
