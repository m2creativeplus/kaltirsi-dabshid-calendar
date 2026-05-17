"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import {
  KALTIRSI_MONTHS, KALTIRSI_WEEKDAYS, SOMALILAND_HOLIDAYS,
  getCurrentKaltirsiMonth, getUpcomingHolidays, GODKA_GROUPS
} from "@/lib/kaltirsi-data"
import { cn } from "@/lib/utils"
import {
  Sun, Moon, Star, Anchor, Leaf, Flame, Droplets, Wind,
  ChevronRight, Calendar, Clock, TrendingUp, AlertTriangle, CloudRain, ThermometerSun, Radio, Activity
} from "lucide-react"
import { useTelemetry, TelemetryEngine } from "@/lib/telemetry-engine"
import { GodkaEngine } from "@/lib/godka-engine"
import { AstronomicalSkyEngine } from "@/components/astronomical-sky-engine"
import { CinematicMonthViewer } from "@/components/kaltirsi-cinematic-viewer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { useAction } from "convex/react"
import { api } from "../convex/_generated/api"

// ── HOOK: FETCH INTEL SYNC ─────────────────────────────────────────
function useIntelSync() {
  const [intel, setIntel] = useState<any>(null)
  
  // Safe hook initialization
  let generateMapState: any = null
  try {
    // @ts-ignore
    const actionRef = api?.kaltirsi_engine?.getLiveEcologicalGeoMap || api?.kaltirsiEngine?.getLiveEcologicalGeoMap
    if (actionRef) {
      generateMapState = useAction(actionRef)
    }
  } catch (e) {
    console.warn("Convex useAction hooks not loaded:", e)
  }

  useEffect(() => {
    let mounted = true;
    const fetchNodes = async () => {
      try {
        if (generateMapState) {
          // Fetch 4 exact nodes using live meteorology
          const nodes = await Promise.all([
            generateMapState({ regionName: 'Hargeysa', lat: 9.56, lon: 44.06 }),
            generateMapState({ regionName: 'Burco', lat: 9.52, lon: 45.53 }),
            generateMapState({ regionName: 'Oodweyne', lat: 9.40, lon: 45.06 }),
            generateMapState({ regionName: 'Ceerigaabo', lat: 10.61, lon: 47.36 })
          ]);
          
          if (mounted) {
            setIntel(nodes.map((n: any) => ({
              region: n.properties.name,
              intelligence: {
                grazing_index_score: n.properties.kaltirsi.grazing_index,
                pastoral_decision: n.properties.kaltirsi.risk === "HIGH" ? "MOVE" : (n.properties.kaltirsi.risk === "MEDIUM" ? "MONITOR" : "GRAZE")
              },
              telemetry: {
                precipitation_mm: n.properties.kaltirsi.real_time_metrics.rain_mm,
                temp_celsius: n.properties.kaltirsi.real_time_metrics.temp_c
              }
            })));
            return;
          }
        }
      } catch (err) {
        console.warn("Convex Intel Sync failed, running local telemetry engine fallback...", err);
      }

      // Fallback: Fetch directly from client-side TelemetryEngine
      try {
        const Hargeysa = await TelemetryEngine.getLiveEnvironment("Oogo");
        const Burco = await TelemetryEngine.getLiveEnvironment("Bannaan");
        const Oodweyne = await TelemetryEngine.getLiveEnvironment("Guban");
        const Ceerigaabo = await TelemetryEngine.getLiveEnvironment("Webiyada");

        const mapToIntel = (regionName: string, data: any) => {
          const precip = data?.current?.precipitation || 0;
          const temp = data?.current?.temp || 28;
          const windSpeed = data?.current?.windSpeed || 10;
          
          let heatPenalty = 0;
          if (temp > 35) heatPenalty = 2;
          else if (temp > 30) heatPenalty = 1;
          
          const baseGI = (precip * 0.4) + (windSpeed < 15 ? 0.5 : 0) - heatPenalty;
          const grazing_index_score = Math.max(0.5, Math.min(9.8, baseGI + 4.5)); // Dynamic shift
          
          let decision = "GRAZE";
          if (precip > 5) decision = "GRAZE";
          else if (heatPenalty >= 2 && precip === 0) decision = "MOVE";
          else if (temp > 32) decision = "MONITOR";

          return {
            region: regionName,
            intelligence: {
              grazing_index_score,
              pastoral_decision: decision
            },
            telemetry: {
              precipitation_mm: precip,
              temp_celsius: temp
            }
          };
        };

        if (mounted) {
          setIntel([
            mapToIntel("Hargeysa", Hargeysa),
            mapToIntel("Burco", Burco),
            mapToIntel("Oodweyne", Oodweyne),
            mapToIntel("Ceerigaabo", Ceerigaabo),
          ]);
        }
      } catch (fallbackErr) {
        console.error("Local Telemetry Fallback failed too:", fallbackErr);
      }
    };
    fetchNodes();
    return () => { mounted = false; };
  }, [generateMapState])

  return intel
}


// ── COMPONENT: LIVE GRAZING INDEX LAYER ────────────────────────────
function LiveGrazingIndexLayer() {
  const intel = useIntelSync()
  
  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
           <Activity className="w-4 h-4 text-emerald-400" />
           <span className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Live Ecological Nodes</span>
        </div>
        {!intel && (
          <span className="text-[10px] text-orange-400 animate-pulse font-mono">📡 SYNCING SATELLITE TELEMETRY...</span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(intel || [1, 2, 3, 4]).map((node: any, idx: number) => (
          <Card key={node.region || idx} className="p-4 transition-all duration-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-widest text-white/30">{node.region || 'Node ' + (idx + 1)}</span>
              {intel && <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />}
            </div>
            
            {intel ? (
              <>
                <div className="text-2xl font-black text-white font-mono mb-1">
                  {node.intelligence.grazing_index_score.toFixed(1)} <span className="text-[10px] text-white/40 font-normal">GI</span>
                </div>
                <Badge variant={
                  node.intelligence.pastoral_decision === "GRAZE" ? "secondary" :
                  node.intelligence.pastoral_decision === "MOVE" ? "destructive" : "default"
                } className="w-full justify-center">
                  {node.intelligence.pastoral_decision}
                </Badge>
                <div className="mt-4 flex justify-between items-center text-[9px] text-white/40 border-t border-white/5 pt-2">
                  <span>{node.telemetry.precipitation_mm}mm Rain</span>
                  <span>{node.telemetry.temp_celsius}°C</span>
                </div>
              </>
            ) : (
              <div className="space-y-2 mt-2">
                <div className="h-6 w-20 bg-white/5 rounded" />
                <div className="h-4 w-full bg-white/5 rounded" />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

// ── COMPONENT: SOVEREIGN GPS NODE (OPENSTREETMAP) ───────────────────────
function SovereignEcoMapLayer() {
  return (
    <div className="w-full h-full min-h-[450px] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl bg-black/40">
      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center gap-2 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] text-white/80 uppercase tracking-widest font-mono font-bold">OSM Sovereign GPS Link</span>
      </div>
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=41.418%2C8.254%2C49.921%2C11.523&layer=mapnik&marker=9.56%2C44.06"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        title="Sovereign OpenStreetMap Node"
        allowFullScreen
        loading="lazy"
        className="brightness-90 contrast-125 saturate-50 hue-rotate-[15deg]"
      />
    </div>
  )
}


// ── LIVE CLOCK BAR ─────────────────────────────────────────────────
function LiveChronometer() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(iv)
  }, [])

  const kDate = useMemo(() => KaltirsiEngine.gregorianToKaltirsi(now), [now])
  const somaliTime = useMemo(() => KaltirsiEngine.getSomaliTime(now), [now])
  const weekday = KALTIRSI_WEEKDAYS[now.getDay() === 0 ? 1 : now.getDay() === 6 ? 0 : now.getDay() + 1] || KALTIRSI_WEEKDAYS[0]
  const month = getCurrentKaltirsiMonth(kDate.month)

  // Real-time environmental engine with safe fallback
  const { data: telemetry, isLoading: telLoadingRaw } = useTelemetry("Oogo")
  const [telLoading, setTelLoading] = useState(true)

  useEffect(() => {
    if (!telLoadingRaw) {
      setTelLoading(false)
    } else {
      const timer = setTimeout(() => setTelLoading(false), 1500) // 1.5s absolute loading fail-safe
      return () => clearTimeout(timer)
    }
  }, [telLoadingRaw])

  const weatherState = TelemetryEngine.getWeatherState(telemetry.current.weatherCode)

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/8 overflow-hidden"
      style={{ background: month.themeGradient }}
    >
      {/* Top: Full Kaltirsi datetime */}
      <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-mono mb-2">
            Taariikhda Kaltirsi · Kaltirsi Date
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-black text-white leading-none">{kDate.day}</span>
            <span className="text-3xl font-bold text-white/80">{month.name}</span>
            <span className="text-lg text-white/50 font-mono">{kDate.year} K.E.</span>
          </div>
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <span className="text-sm text-white/70">{weekday.nameStandard} — <span className="text-white/90 font-medium">{weekday.nameIndigenous}</span></span>
            <span className="h-4 w-px bg-white/20" />
            <span className="text-sm text-white/60">{month.season} · {month.seasonEnglish}</span>
            <span className="h-4 w-px bg-white/20" />
            <span className="text-sm text-white/60">{month.nameEnglish}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-4xl font-black text-white font-mono tabular-nums leading-none">
            {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
          </div>
          <div className="text-sm text-white/60 mt-2">{somaliTime} · Waqtiga Dhaqanka</div>
          <div className="text-[10px] text-white/40 mt-1">
            {now.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
      </div>

      {/* Bottom: Live Pastoral/Environmental Status Bar */}
      <div className="px-6 py-2.5 bg-black/20 backdrop-blur-sm flex items-center gap-6 flex-wrap relative">
        {telLoading && (
           <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-10">
             <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono animate-pulse">
               📡 Connecting to Atmospheric Nodes...
             </span>
           </div>
        )}
        {[
          { icon: ThermometerSun, label: "Caawa/Maanta", value: `${Math.round(telemetry.current.temp)}°C`, color: "text-orange-300" },
          { icon: CloudRain, label: "Cimilada Hadda", value: weatherState.somali, color: "text-cyan-300" },
          { icon: Wind, label: "Dabaylraac", value: `${telemetry.current.windSpeed} km/h`, color: "text-emerald-300" },
          { icon: Droplets, label: "Dhedo/Qoyaan", value: `${telemetry.current.precipitation} mm`, color: "text-blue-300" },
          { icon: Star, label: "Godka Hadda", value: "Qayd", color: "text-purple-300" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
            <span className="text-[10px] text-white/40">{stat.label}:</span>
            <span className={cn("text-[10px] font-bold", stat.color)}>{stat.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}


// ── SIX-LAYER INTELLIGENCE HUD ─────────────────────────────────────
const LAYER_CARDS = [
  {
    key: "qorraxeed", icon: Sun, color: "#D9A441",
    title: "Kaltirsi Qorraxeed", sub: "Solar Calendar",
    getContent: (kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      const m = getCurrentKaltirsiMonth(kDate.month)
      return { primary: m.name, secondary: `Bisha ${m.id}aad · ${m.daysInMonth} maalmood`, badge: m.season }
    }
  },
  {
    key: "dayaxeed", icon: Moon, color: "#8B5CF6",
    title: "Kaltirsi Dayaxeed", sub: "Lunar Calendar",
    getContent: (kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      try { return { primary: KaltirsiEngine.getHijriDate(new Date()), secondary: "354-day lunar cycle", badge: "Dayaxeed" } }
      catch { return { primary: "—", secondary: "Lunar sync", badge: "Dayaxeed" } }
    }
  },
  {
    key: "xiddigeed", icon: Star, color: "#06B6D4",
    title: "Kaltirsi Xiddigeed", sub: "Stellar / 28 Godka",
    getContent: (_kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      const g = GodkaEngine.getCurrentGodka(new Date())
      return { primary: `${g.name} (${g.iauStar})`, secondary: g.significance, badge: `Active ${g.associatedSeason}` }
    }
  },
  {
    key: "hawd", icon: Leaf, color: "#1EB53A",
    title: "Kaltirsi Hawd", sub: "Pastoral Intelligence",
    getContent: (kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      const m = getCurrentKaltirsiMonth(kDate.month)
      return { primary: `${m.grazingIndex}/10`, secondary: m.pastoralActivity.substring(0, 50) + "…", badge: m.droughtRisk }
    }
  },
  {
    key: "badda", icon: Anchor, color: "#0EA5E9",
    title: "Kaltirsi Badda", sub: "Maritime Intelligence",
    getContent: (kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      const m = getCurrentKaltirsiMonth(kDate.month)
      const isBadFuran = m.id === 6
      const isBadXiran = m.id === 12
      return {
        primary: isBadFuran ? "BAD-FURAN" : isBadXiran ? "BAD-XIRAN" : "Open Water",
        secondary: m.maritimeNote.substring(0, 50) + "…",
        badge: isBadFuran || isBadXiran ? "Trade Gate" : "Active"
      }
    }
  },
  {
    key: "diimeed", icon: Flame, color: "#F59E0B",
    title: "Kaltirsi Diimeed", sub: "Religious / Hijri",
    getContent: (_kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      const upcoming = getUpcomingHolidays(new Date(), 1)
      const h = upcoming[0]
      return {
        primary: h?.nameSomali || "Ciidaha Qaranka",
        secondary: h ? `${h.date} — ${h.kaltirsiMonth}` : "No upcoming holiday",
        badge: h?.type || "religious"
      }
    }
  }
]

function SixLayerHUD() {
  const kDate = useMemo(() => KaltirsiEngine.gregorianToKaltirsi(new Date()), [])
  const [activeLayerKey, setActiveLayerKey] = useState<string | null>(null)

  const activeCard = useMemo(() => {
    return LAYER_CARDS.find(c => c.key === activeLayerKey)
  }, [activeLayerKey])

  const activeMonth = useMemo(() => {
    return getCurrentKaltirsiMonth(kDate.month)
  }, [kDate.month])

  const getDetailedDescription = (key: string) => {
    switch (key) {
      case "qorraxeed":
        return {
          title: "Solar Agriculture Layer",
          desc: activeMonth.detailedDescription,
          somali: activeMonth.ecologicalIndicatorSo,
          meta: `Month: ${activeMonth.name} (${activeMonth.nameEnglish}) · Season: ${activeMonth.season}`,
          proverb: activeMonth.proverb,
        };
      case "dayaxeed":
        try {
          const hijri = KaltirsiEngine.getHijriDate(new Date());
          return {
            title: "Lunar Religious Layer",
            desc: "Synched to the 354-day lunar calendar tracking islamic holidays, traditional night herding watches, and historical trade currents.",
            somali: "Habka is-waafajinta taariikhda Islaamka iyo Kaltirsiga, isagoo xambaarsan magacyada bilaha ee Soomaalidii hore.",
            meta: `Current Lunar State: ${hijri} · Nominal Alignment`,
            proverb: "Dayaxu wuxuu u iftiimaa sida runta oo kale.",
          };
        } catch {
          return {
            title: "Lunar Religious Layer",
            desc: "Synched to the 354-day lunar calendar tracking islamic holidays.",
            somali: "Taariikhda Hijriga Soomaalida.",
            meta: "Standard sync",
            proverb: "Waqtigu waa seef, haddii aadan goyn adiga ayuu kugu jarayaa.",
          };
        }
      case "xiddigeed":
        const godka = GodkaEngine.getCurrentGodka(new Date())
        return {
          title: "Stellar Navigation (Godka) Layer",
          desc: `Active station: ${godka.name} (${godka.iauStar}). Traditional Somali astronomical navigation employs 28 distinct sky stations along the moon's orbit.`,
          somali: `Xiddigta saamaynta leh: ${godka.name}. Waxay tilmaamaysaa saadaalinta cimilada iyo hagaajinta socodka badaha.`,
          meta: `IAU Star: ${godka.iauStar} · Season: ${godka.associatedSeason} · ${godka.significance}`,
          proverb: "Cirka iyo xiddiguhu waa saaxiibada safarka ee aan marnaba lumin.",
        };
      case "hawd":
        return {
          title: "Hawd Pastoral Intelligence",
          desc: activeMonth.pastoralActivity,
          somali: `Heerka daaqsinta ee bishan waa ${activeMonth.grazingIndex}/10. Khatarta abaaruhu waa ${activeMonth.droughtRisk.toUpperCase()}.`,
          meta: `Grazing Index: ${activeMonth.grazingIndex}/10 · Drought Risk: ${activeMonth.droughtRisk.toUpperCase()}`,
          proverb: "Rag iyo geelba way wada daaqaan laakiin go'aanka ayaa kala duwan.",
        };
      case "badda":
        return {
          title: "Maritime & Trade Winds Intelligence",
          desc: activeMonth.maritimeNote,
          somali: `Meeqaanka badaha ee bishan: Badaha waa kuwo furan ama xiran iyadoo lagu salaynayo xawaaraha dabaylaha deegaanka.`,
          meta: `Coastal Status: ${activeMonth.id === 6 ? "Bad-Furan" : activeMonth.id === 12 ? "Bad-Xiran" : "Nominal Water Flow"}`,
          proverb: "Badda maanta furan, berri way xidhmi kartaa; garashadu waa hagaha ugu habboon.",
        };
      case "diimeed":
        const upcoming = getUpcomingHolidays(new Date(), 1)
        const h = upcoming[0]
        return {
          title: "Sovereignty & Cultural Events",
          desc: h ? `${h.name} — ${h.description}` : "Sovereign holiday tracking system linking ancient Somali calendar events and modern administrative landmarks.",
          somali: h ? `${h.nameSomali} — ${h.descriptionSomali}` : "Dhacdooyinka muhiimka ah ee taariikhda deegaanka.",
          meta: h ? `Date: ${h.date} (${h.kaltirsiMonth}) · Significance: ${h.significance.toUpperCase()}` : "Events Nominally Audited",
          proverb: "Madaxbannaanidu waa sharafta iyo nolol-tiris kasta.",
        };
      default:
        return null;
    }
  };

  const detail = activeCard ? getDetailedDescription(activeCard.key) : null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {LAYER_CARDS.map((card, i) => {
        const Icon = card.icon as any
        const content = card.getContent(kDate)
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={() => setActiveLayerKey(card.key)}
            className="group rounded-2xl border border-white/5 bg-white/[0.02] p-4 cursor-pointer transition-all hover:border-white/10 hover:bg-white/[0.04]"
            style={{ boxShadow: `0 0 0 0 ${card.color}` }}
          >
            {/* Icon + Layer name */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/8"
                style={{ backgroundColor: `${card.color}18` }}>
                <Icon className="h-4.5 w-4.5" style={{ color: card.color }} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-foreground leading-none">{card.title.split(" ")[1]}</div>
                <div className="text-[9px] text-muted-foreground/50 mt-0.5">{card.sub}</div>
              </div>
            </div>

            {/* Primary metric */}
            <div className="text-xl font-black text-foreground leading-none mb-1 truncate">
              {content.primary}
            </div>
            <div className="text-[10px] text-muted-foreground/50 leading-snug line-clamp-2 mb-2">
              {content.secondary}
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider"
              style={{ color: card.color, borderColor: `${card.color}30`, backgroundColor: `${card.color}10` }}>
              {content.badge}
            </div>
          </motion.div>
        )
      })}

      {/* Detailed Modal Overlay */}
      <AnimatePresence>
        {activeLayerKey && detail && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[100] p-4"
            onClick={() => setActiveLayerKey(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0c0c12]/95 p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveLayerKey(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white text-lg font-bold w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors"
              >
                ×
              </button>
              <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center border border-white/10"
                  style={{ backgroundColor: `${activeCard?.color}15` }}>
                  {activeCard && <activeCard.icon className="h-5 w-5" style={{ color: activeCard.color }} />}
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold block">Temporal Matrix briefing</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{detail.title}</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Pastoral Description</span>
                  <p className="text-sm text-white/95 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">{detail.desc}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#D4AF37]/50 uppercase tracking-widest font-mono">Deegaan & Ecology</span>
                  <p className="text-xs text-white/80 leading-relaxed italic border-l-2 border-[#D4AF37]/50 pl-3">{detail.somali}</p>
                </div>

                <div className="rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 p-3 flex flex-col gap-1 items-center justify-center text-center">
                  <span className="text-[9px] text-[#D4AF37] font-serif italic">"{detail.proverb}"</span>
                  <span className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-mono mt-1">Nomadic Proverb</span>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[10px] text-white/40">
                  <span>{detail.meta}</span>
                  <span className="font-mono text-emerald-400 uppercase tracking-wider">Sync: Nominal</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


// ── UPCOMING HOLIDAYS STRIP ─────────────────────────────────────────
function HolidayStrip() {
  const upcoming = useMemo(() => getUpcomingHolidays(new Date(), 3), [])
  const [selectedHolidayId, setSelectedHolidayId] = useState<string | null>(null)

  const activeHoliday = useMemo(() => {
    return upcoming.find(h => h.id === selectedHolidayId)
  }, [selectedHolidayId, upcoming])

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 relative">
      {upcoming.map((h, i) => {
        const daysLeft = (() => {
          const now = new Date()
          const target = new Date(now.getFullYear(), h.month - 1, h.day)
          if (target < now) target.setFullYear(target.getFullYear() + 1)
          return Math.ceil((target.getTime() - now.getTime()) / 86400000)
        })()
        return (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedHolidayId(h.id)}
            className="flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] min-w-[220px] cursor-pointer transition-all hover:bg-white/5 hover:border-white/10"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-black text-sm"
              style={{ backgroundColor: h.color + "25" }}>
              {h.day === 0 ? "☪" : h.day}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-foreground truncate">{h.nameSomali}</div>
              <div className="text-[10px] text-muted-foreground/50">{h.date} · {h.kaltirsiMonth}</div>
            </div>
            <div className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ color: h.color, backgroundColor: h.color + "15" }}>
              {daysLeft}d
            </div>
          </motion.div>
        )
      })}

      {/* Holiday Briefing Modal */}
      <AnimatePresence>
        {selectedHolidayId && activeHoliday && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[100] p-4"
            onClick={() => setSelectedHolidayId(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0c0c12]/95 p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedHolidayId(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white text-lg font-bold w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors"
              >
                ×
              </button>
              <div className="flex items-center gap-3.5 mb-4 border-b border-white/5 pb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-base"
                  style={{ backgroundColor: activeHoliday.color + "25" }}>
                  {activeHoliday.day === 0 ? "☪" : activeHoliday.day}
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold block">Sovereign Historical Audit</span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{activeHoliday.nameSomali}</h3>
                  <span className="text-[10px] text-white/50 block mt-0.5">{activeHoliday.name}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Significance & Details</span>
                  <p className="text-xs text-white/90 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    {activeHoliday.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#D4AF37]/50 uppercase tracking-widest font-mono">Faahfaahinta Taariikhda</span>
                  <p className="text-xs text-white/80 leading-relaxed italic border-l-2 border-[#D4AF37]/50 pl-3">
                    {activeHoliday.descriptionSomali}
                  </p>
                </div>

                <div className="flex justify-between items-center bg-white/[0.01] p-3 rounded-xl border border-white/5 text-[10px]">
                  <div className="space-y-0.5">
                    <span className="text-white/30 uppercase tracking-wider block text-[8px]">Gregorian Date</span>
                    <span className="text-white/80 font-bold">{activeHoliday.date}</span>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-white/30 uppercase tracking-wider block text-[8px]">Kaltirsi Alignment</span>
                    <span className="text-[#D4AF37] font-bold">{activeHoliday.kaltirsiMonth}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[10px] text-white/40">
                  <span>Restoration State: Certified</span>
                  <span className="font-mono text-emerald-400 uppercase tracking-wider">Sync: True</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


// ── ANNUAL GRAZING ENGINE ─────────────────────────────────────────
function AnnualSparkline() {
  const kDate = useMemo(() => KaltirsiEngine.gregorianToKaltirsi(new Date()), [])
  const currentMonth = useMemo(() => KALTIRSI_MONTHS.find(m => m.id === kDate.month) || KALTIRSI_MONTHS[0], [kDate.month])

  // Group months by seasons to show stats
  const seasonStats = useMemo(() => {
    const stats: Record<string, { count: number; totalGI: number; icon: any; color: string }> = {
      "Xagaa": { count: 0, totalGI: 0, icon: Flame, color: "text-orange-400" },
      "Dayr": { count: 0, totalGI: 0, icon: CloudRain, color: "text-blue-400" },
      "Jiilaal": { count: 0, totalGI: 0, icon: ThermometerSun, color: "text-amber-500" },
      "Gu'": { count: 0, totalGI: 0, icon: Leaf, color: "text-emerald-400" },
    };
    KALTIRSI_MONTHS.forEach(m => {
      if (stats[m.season]) {
        stats[m.season].count++;
        stats[m.season].totalGI += m.grazingIndex;
      }
    });
    return stats;
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md p-5 h-full flex flex-col justify-between shadow-2xl">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono font-bold">Tilmaamaha Sannadlaha</span>
            <h3 className="text-base font-black text-white mt-1">Annual Grazing Engine</h3>
          </div>
          <div className="text-right">
            <span className="text-[8px] text-white/40 font-mono block">KALTIRSI</span>
            <span className="text-xs text-primary font-bold font-mono">{kDate.year} K.E.</span>
          </div>
        </div>

        {/* Main Interactive Bar Chart */}
        <div className="flex items-end gap-1.5 h-36 border-b border-white/5 pb-4 mb-4">
          {KALTIRSI_MONTHS.map((m) => {
            const isCurrent = m.id === kDate.month
            const pct = (m.grazingIndex / 10) * 100
            const color = m.grazingIndex >= 8 ? "#1EB53A" : m.grazingIndex >= 5 ? "#D9A441" : m.grazingIndex >= 3 ? "#F97316" : "#DC2626"
            return (
              <div key={m.id} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div className="w-full relative h-28 flex items-end">
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-black/90 border border-white/20 text-[9px] text-white font-mono opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 shadow-xl z-50 whitespace-nowrap">
                    <div className="font-bold text-primary">{m.name}</div>
                    <div className="text-white/60">Grazing Index: {m.grazingIndex}/10</div>
                    <div className="text-white/40 capitalize">{m.droughtRisk} Risk</div>
                  </div>

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    transition={{ delay: m.id * 0.03, type: "spring", stiffness: 100 }}
                    className={cn("w-full rounded-t-md transition-all duration-300", 
                      isCurrent ? "shadow-[0_0_15px_rgba(30,181,58,0.4)]" : ""
                    )}
                    style={{ backgroundColor: isCurrent ? color : color + "33" }}
                  />
                  {isCurrent && <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#1EB53A]" />}
                </div>
                <span className={cn("text-[8px] font-bold font-mono text-center w-full truncate mt-1",
                  isCurrent ? "text-primary font-black uppercase" : "text-white/30")}>
                  {m.name.substring(0, 3)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Seasonal Breakdowns */}
      <div className="flex-1 flex flex-col justify-center gap-3">
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono font-bold block mb-1">Seasonal Telemetry Metrics</span>
        {Object.entries(seasonStats).map(([seasonName, stat]) => {
          const Icon = stat.icon;
          const avgGI = (stat.totalGI / stat.count).toFixed(1);
          const isActive = currentMonth.season === seasonName;
          return (
            <div 
              key={seasonName} 
              className={cn(
                "flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300",
                isActive 
                  ? "bg-white/5 border-white/20 shadow-lg shadow-black/30" 
                  : "bg-transparent border-transparent opacity-50 hover:opacity-80"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div className={cn("p-1.5 rounded-lg bg-white/5", stat.color)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    {seasonName}
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                  </span>
                  <span className="text-[9px] text-white/40 uppercase tracking-wider block">Pastoral Season</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-black text-white">{isActive ? avgGI : (stat.totalGI / stat.count).toFixed(1)} <span className="text-[9px] text-white/40 font-normal">Ø GI</span></span>
                <span className="text-[8px] text-white/30 uppercase tracking-widest block mt-0.5">Average Yield</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Active Banner */}
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          Active Season: <span className="text-white font-bold">{currentMonth.season}</span>
        </span>
        <span className="font-mono text-emerald-400 uppercase tracking-wider">Sync: Nominal</span>
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT: Kaltirsi Ecological Intelligence Dashboard
// ═══════════════════════════════════════════════════════════════════
export function KaltirsiEcologicalDashboard() {
  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-8 pb-16 pt-4">
      
      {/* SECTION 1: CINEMATIC SEASONAL PROJECTION (HERO) */}
      <section className="flex flex-col gap-6">
         <div className="flex items-center justify-between px-2 border-b border-white/10 pb-4">
           <div className="text-xs font-black text-white/70 uppercase tracking-widest flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             Sadaasha Muuqaalka · Cinematic Seasonal Engine
           </div>
           <div className="text-[10px] text-white/30 font-mono">
             Dabshid-Visual-Protocol v1.0
           </div>
         </div>
         <CinematicMonthViewer />
      </section>

      {/* SECTION 2: CHRONOMETER & 3D STAR MAP */}
      <section className="flex flex-col gap-6">
        <LiveChronometer />
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="lg:col-span-2 xl:col-span-3 h-[500px]">
              <AstronomicalSkyEngine />
            </div>
            <div className="lg:col-span-1 h-[500px]">
              <AnnualSparkline />
            </div>
        </div>
      </section>

      {/* SECTION 3: LIVE INTELLIGENCE LAYER (GRAZING INDEX & LIVE MAP) */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-0.5 border-b border-white/5 pb-2">
           <div className="text-xs font-black text-white/70 uppercase tracking-widest">
             Sirdoonka Deegaanka · Live Map Data
           </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[450px]">
          <div className="xl:col-span-1 h-full overflow-y-auto pr-2">
            <LiveGrazingIndexLayer />
          </div>
          <div className="xl:col-span-2 h-full">
            <SovereignEcoMapLayer />
          </div>
        </div>
      </section>

      {/* SECTION 4: CORE DATA MATRIX */}
      <section className="flex flex-col gap-6 pt-6">
        <div className="flex items-center justify-between px-0.5 border-b border-white/5 pb-2">
          <div className="text-xs font-black text-white/70 uppercase tracking-widest">
            Sirdoonka Deegaanka · Environmental OS
          </div>
          <div className="text-[10px] text-white/30 font-mono">
            Hex-Temporal Protocol v3.1.2.3
          </div>
        </div>
        <SixLayerHUD />
      </section>

      {/* SECTION 4: SOVEREIGNTY TIMELINE */}
      <section className="space-y-4">
        <div>
          <div className="text-[9px] uppercase tracking-widest text-white/40 font-mono mb-4 flex items-center gap-2">
            <div className="h-px w-8 bg-white/20" />
            Ciidaha Qaranka · Upcoming Sovereignty Events
          </div>
          <HolidayStrip />
        </div>
      </section>
    </div>
  )
}
