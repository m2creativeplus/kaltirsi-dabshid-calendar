"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import { cn } from "@/lib/utils"
import { Sun, Moon, Sunrise, Sunset, Coffee, Eye, Tent, Star } from "lucide-react"

// ═══════════════════════════════════════════════════════════════════
// GOORSHEEGTA — The Somali Environmental Clock
// 8 segments dividing the 24-hour cycle by ecological rhythm
// ═══════════════════════════════════════════════════════════════════

interface GoorsheegtaSegment {
  id: number
  nameSomali: string
  nameEnglish: string
  timeRange: string
  startHour: number
  endHour: number
  description: string
  descriptionSomali: string
  pastoralGuidance: string
  pastoralGuidanceSomali: string
  icon: React.ElementType
  color: string
  gradient: string
  ambientOpacity: number // How dark/light the segment is (0=night, 1=bright)
}

const GOORSHEEGTA_SEGMENTS: GoorsheegtaSegment[] = [
  // ☀️ Maalin: The 12 Hours of the Sun (Qorrax-Joog)
  {
    id: 6, nameSomali: "Waaberi / Oog", nameEnglish: "The True Dawn",
    timeRange: "06:00 – 07:00", startHour: 6, endHour: 7,
    description: "The first distinct white thread of light appears on the horizon as the camp awakens.",
    descriptionSomali: "Iftiinka ugu horreeya ayaa cirka ka soo muuqda. Salaadda Fajrka.",
    pastoralGuidance: "Begin morning milking. Assess overnight herd conditions.",
    pastoralGuidanceSomali: "Bilow lisidda subaxda. Eeg xaaladdii xoolaha habeenkii.",
    icon: Sunrise, color: "#f59e0b", gradient: "linear-gradient(135deg, #1e1b4b 0%, #f59e0b 50%, #fbbf24 100%)", ambientOpacity: 0.4,
  },
  {
    id: 7, nameSomali: "Aroor / Dheelmado", nameEnglish: "The Dewy Morning",
    timeRange: "07:00 – 08:00", startHour: 7, endHour: 8,
    description: "The air is cool, the ground may have dew, and livestock are released from their pens.",
    descriptionSomali: "Hawadu waa qabow, dhulku dharab buu leeyahay, xoolahana waa la sii daayaa.",
    pastoralGuidance: "Release livestock from enclosures. Check dew levels for soil moisture.",
    pastoralGuidanceSomali: "Xoolaha xeradaha ka sii daa. Eeg dharabka dhulka.",
    icon: Sun, color: "#f97316", gradient: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)", ambientOpacity: 0.5,
  },
  {
    id: 8, nameSomali: "Barqa-Yar / Jarmaado", nameEnglish: "Strategic Early Travel",
    timeRange: "08:00 – 09:00", startHour: 8, endHour: 9,
    description: "A strategic hour for fast-paced early travel and the first milking to feed the family.",
    descriptionSomali: "Waqti lagu talagalay in dhakhso loo guuro (jarmaado) iyo lisidda koowaad.",
    pastoralGuidance: "Fast early travel (jarmaado) and morning milking.",
    pastoralGuidanceSomali: "Safarka degdegga ah (jarmaado) iyo lisidda subaxda.",
    icon: Sun, color: "#ea580c", gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", ambientOpacity: 0.6,
  },
  {
    id: 9, nameSomali: "Siraad / Xigsin", nameEnglish: "The Mid-Morning Pause",
    timeRange: "09:00 – 10:00", startHour: 9, endHour: 10,
    description: "The sun is fully established. A brief rest for livestock after initial aggressive morning grazing.",
    descriptionSomali: "Qorraxda oo dhan baa soo baxday. Nasasho gaaban oo xoolaha la siiyo.",
    pastoralGuidance: "Allow camels a brief rest before the intense grazing window.",
    pastoralGuidanceSomali: "Geela sii nasasho gaaban ka hor inta aan kulaylku jabin.",
    icon: Sun, color: "#d97706", gradient: "linear-gradient(135deg, #ea580c 0%, #d97706 100%)", ambientOpacity: 0.7,
  },
  {
    id: 10, nameSomali: "Barqo", nameEnglish: "The Core Grazing Hour",
    timeRange: "10:00 – 11:00", startHour: 10, endHour: 11,
    description: "As temperatures rise, this becomes the golden window for livestock to feed heavily.",
    descriptionSomali: "Inta kulaylku kor u kacayo, kani waa waqtiga dahabiga ah ee xooluhu si fiican u daaqaan.",
    pastoralGuidance: "Ensure peak grazing. Maximize food intake for herds.",
    pastoralGuidanceSomali: "Hubi daaqsin buuxda. Xooluhu cawska ugu badan ha cunaan.",
    icon: Sun, color: "#eab308", gradient: "linear-gradient(135deg, #d97706 0%, #eab308 100%)", ambientOpacity: 0.8,
  },
  {
    id: 11, nameSomali: "Barqo-Dheer", nameEnglish: "The Long Late-Morning",
    timeRange: "11:00 – 12:00", startHour: 11, endHour: 12,
    description: "The heat becomes oppressive. The young camels (qaalin) left behind at camp are milked.",
    descriptionSomali: "Kulaylku wuu faraha ka baxayaa. Qeelmaha xerada ku hadhay waa la lisiyaa.",
    pastoralGuidance: "Milk the qaalin (young camels). Begin moving towards shade paths.",
    pastoralGuidanceSomali: "Lislidda qeelmaha. Diyaari waddooyinka hadhka leh.",
    icon: Coffee, color: "#d97706", gradient: "linear-gradient(135deg, #eab308 0%, #d97706 100%)", ambientOpacity: 0.9,
  },
  {
    id: 12, nameSomali: "Hadh / Duhur", nameEnglish: "The Zenith",
    timeRange: "12:00 – 13:00", startHour: 12, endHour: 13,
    description: "The sun is directly overhead, casting no outward shadows.",
    descriptionSomali: "Qorraxdu waa meesha ugu sarreysa, hoos ma jiro.",
    pastoralGuidance: "Stop all forced movement. Shelter animals.",
    pastoralGuidanceSomali: "Jooji dhaqaaqa xoolaha. Hooska geli.",
    icon: Sun, color: "#ef4444", gradient: "linear-gradient(135deg, #d97706 0%, #ef4444 100%)", ambientOpacity: 1.0,
  },
  {
    id: 13, nameSomali: "Hadh-Gal", nameEnglish: "Entering the Shade",
    timeRange: "13:00 – 14:00", startHour: 13, endHour: 14,
    description: "The burning heat (kulaal) forces stillness. Herds cluster under Acacia trees.",
    descriptionSomali: "Kulaylka gubanaya (kulaal) wuxuu soo dedejiyaa xasillooni. Xoolahu geedaha hoostooda ayay isku uruuriyaan.",
    pastoralGuidance: "Absolute rest. Ensure clustered sheltering under large trees.",
    pastoralGuidanceSomali: "Nasti buuxda. Hubi in xoolahu isku urursadeen geedaha waaweyn hoostooda.",
    icon: Tent, color: "#dc2626", gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", ambientOpacity: 1.0,
  },
  {
    id: 14, nameSomali: "Hadh-ac", nameEnglish: "Peak Heat",
    timeRange: "14:00 – 15:00", startHour: 14, endHour: 15,
    description: "The absolute hottest hour, shadows just begin to lean slightly to the east.",
    descriptionSomali: "Saacadda ugu kulul. Hoosku wuxuu inyar u janjeedhaa dhanka bari.",
    pastoralGuidance: "No movement. Survive peak heat (kulleyl).",
    pastoralGuidanceSomali: "Dhaqdhaqaaq ma jiro. Adkayso kulka ugu sarreeya (kulleyl).",
    icon: Tent, color: "#b91c1c", gradient: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", ambientOpacity: 0.95,
  },
  {
    id: 15, nameSomali: "Casar", nameEnglish: "Breaking of the Heat",
    timeRange: "15:00 – 16:00", startHour: 15, endHour: 16,
    description: "The blinding heat shatters (kulaal-jebis), accompanied by a breeze.",
    descriptionSomali: "Kulaylkii indho-tirka ahaa wuu jabay (kulaal-jebis), oo neecaw qabow baa soo socota.",
    pastoralGuidance: "Heat stress ends. Prepare herds for second grazing.",
    pastoralGuidanceSomali: "Diqigii wuu dhammaaday. U diyaari xoolaha daaqa labaad.",
    icon: Sunset, color: "#d97706", gradient: "linear-gradient(135deg, #b91c1c 0%, #d97706 100%)", ambientOpacity: 0.8,
  },
  {
    id: 16, nameSomali: "Casar-Liiq", nameEnglish: "The Leaning Sun",
    timeRange: "16:00 – 17:00", startHour: 16, endHour: 17,
    description: "The sun leans heavily, turning the light golden.",
    descriptionSomali: "Qorraxdu aad bay ugu foorarsataa (tiraab), iftiinkuna wuxuu isu beddelaa dahabi.",
    pastoralGuidance: "Execute second grazing quickly before sunset.",
    pastoralGuidanceSomali: "Soo dhaqso fuli daaqa labaad ka hor intaan qorraxdu dhicin.",
    icon: Sun, color: "#f59e0b", gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)", ambientOpacity: 0.7,
  },
  {
    id: 17, nameSomali: "Galab", nameEnglish: "Coordinated Return",
    timeRange: "17:00 – 18:00", startHour: 17, endHour: 18,
    description: "This hour marks carraabo—the rushed return trek of all herds to the homestead.",
    descriptionSomali: "Saacaddani waa carraabo — dib u noqoshada degdega ah ee xoolaha dhammaan si ay xerada ugu soo laabtaan.",
    pastoralGuidance: "Initiate Carraabo. Return herds to safety before nightfall.",
    pastoralGuidanceSomali: "Bilow Carraabo. Xoolaha nabad gelyo ku soo celi inta uusan dhicin mugdigu.",
    icon: Sunset, color: "#fcd34d", gradient: "linear-gradient(135deg, #f59e0b 0%, #fcd34d 100%)", ambientOpacity: 0.6,
  },

  // 🌙 Habeen: The 12 Hours of the Night (Gudcur & Iftiin)
  {
    id: 18, nameSomali: "Gabbal-Dhac", nameEnglish: "Day Dies / Maghrib",
    timeRange: "18:00 – 19:00", startHour: 18, endHour: 19,
    description: "The exact moment the sun disappears and the day officially dies.",
    descriptionSomali: "Daqiiqadda ay qorraxdu baxdo oo maalintu si rasmi ah u dhammaato.",
    pastoralGuidance: "Count the animals returning to the compound.",
    pastoralGuidanceSomali: "Tiri xoolaha soo gelaya xerada.",
    icon: Sunset, color: "#7c3aed", gradient: "linear-gradient(135deg, #fcd34d 0%, #7c3aed 100%)", ambientOpacity: 0.4,
  },
  {
    id: 19, nameSomali: "Fiid", nameEnglish: "Twilight & Corralling",
    timeRange: "19:00 – 20:00", startHour: 19, endHour: 20,
    description: "The sky turns deep purple. Time for evening milking and securing livestock.",
    descriptionSomali: "Cirku wuxuu noqdaa buluug madow. Xilligii lisidda iyo xoolo-xereynta.",
    pastoralGuidance: "Secure enclosures (xero) against predators. Finish evening milking.",
    pastoralGuidanceSomali: "Rooji xayndaabyada (xero) ka ilaali dugaagga. Dhammee lisidda.",
    icon: Moon, color: "#5b21b6", gradient: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", ambientOpacity: 0.3,
  },
  {
    id: 20, nameSomali: "Cisho", nameEnglish: "Nightfall",
    timeRange: "20:00 – 21:00", startHour: 20, endHour: 21,
    description: "Total darkness sets in, and the evening meal is eaten.",
    descriptionSomali: "Mugdi dhamaystiran ayaa u dhaca, cuntadii fiidkiina waa la cunaa.",
    pastoralGuidance: "Share the evening meal. Rest after securing the perimeter.",
    pastoralGuidanceSomali: "Qaybso cuntada fiidkii. Nasasho qaado markaad xerada xaqiijiso.",
    icon: Moon, color: "#4c1d95", gradient: "linear-gradient(135deg, #5b21b6 0%, #4c1d95 100%)", ambientOpacity: 0.2,
  },
  {
    id: 21, nameSomali: "Caweys", nameEnglish: "The Social Hour",
    timeRange: "21:00 – 22:00", startHour: 21, endHour: 22,
    description: "The Abwaan takes center stage. Poetry, dancing (dhaanto), and folktales around the fire.",
    descriptionSomali: "Abwaanka ayaa hadlaya. Gabayo, dhaanto, iyo sheeko-xariir dabka la shito.",
    pastoralGuidance: "Pass down oral traditions. Exchange news regarding water and pastures.",
    pastoralGuidanceSomali: "Gudbi hiddaha. Is weydaarsada wararka biyaha iyo daaqsinta.",
    icon: Eye, color: "#312e81", gradient: "linear-gradient(135deg, #4c1d95 0%, #312e81 100%)", ambientOpacity: 0.15,
  },
  {
    id: 22, nameSomali: "Saq-Hore", nameEnglish: "The First Deep Night",
    timeRange: "22:00 – 23:00", startHour: 22, endHour: 23,
    description: "The fires burn down, socializing ends, and the camp embraces tranquility.",
    descriptionSomali: "Dabku wuu sii damayaa, sheekadii way dhammaday, xeraduna xasillooni bay gelaysaa.",
    pastoralGuidance: "Extinguish large fires. Prepare for the first sleep cycle.",
    pastoralGuidanceSomali: "Dam dabka. U diyaar garow hurdada kowaad.",
    icon: Moon, color: "#1e1b4b", gradient: "linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)", ambientOpacity: 0.1,
  },
  {
    id: 23, nameSomali: "Hurdada-Hore", nameEnglish: "Uninterrupted Slumber",
    timeRange: "23:00 – 00:00", startHour: 23, endHour: 24,
    description: "The period of heaviest, uninterrupted slumber.",
    descriptionSomali: "Muddada ugu culus ee la seexdo iyadoo aan madoobaanin.",
    pastoralGuidance: "Deep rest before the night watch shift changes.",
    pastoralGuidanceSomali: "Nasasho xeel dheer ka hor inta uusan wareegga ilaaladu is beddelin.",
    icon: Moon, color: "#0f172a", gradient: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)", ambientOpacity: 0.05,
  },
  {
    id: 0, nameSomali: "Saqdhexe", nameEnglish: "Exact Midnight",
    timeRange: "00:00 – 01:00", startHour: 0, endHour: 1,
    description: "The exact midnight. Complete darkness dominates.",
    descriptionSomali: "Saqda dhexe ee saxda ah. Mugdi aad u buuxa ayaa xukuma.",
    pastoralGuidance: "Shift change for night watchmen protecting the herds.",
    pastoralGuidanceSomali: "Beddelka waardiye xoolaha daafacaya.",
    icon: Star, color: "#020617", gradient: "linear-gradient(135deg, #0f172a 0%, #020617 100%)", ambientOpacity: 0.0,
  },
  {
    id: 1, nameSomali: "Mirkac", nameEnglish: "Secret Night Travel",
    timeRange: "01:00 – 02:00", startHour: 1, endHour: 2,
    description: "The hour of stillness. Guure refers to secret night travel under the stars.",
    descriptionSomali: "Waqtiga guuraha. Dhaqdhaqaaq qarsoodi ah oo habeenkii xiddigaha lala socdo.",
    pastoralGuidance: "Execute strategic night travels (Guure) to reach distant wells.",
    pastoralGuidanceSomali: "Fuli safarada habeenkii si aad u gaarto ceelasha dhaadheer.",
    icon: Star, color: "#1e1b4b", gradient: "linear-gradient(135deg, #020617 0%, #1e1b4b 100%)", ambientOpacity: 0.05,
  },
  {
    id: 2, nameSomali: "Cidladhexe", nameEnglish: "The Desolate Middle",
    timeRange: "02:00 – 03:00", startHour: 2, endHour: 3,
    description: "The most profoundly silent and isolated hour in the vast landscape.",
    descriptionSomali: "Waqtiga ugu badan ee aamusnaanta laga dareemo dhulka.",
    pastoralGuidance: "Maintain vigilance against nocturnal predators.",
    pastoralGuidanceSomali: "Feeyignaan badan ka muuji dugaagga habeen socodka ah.",
    icon: Moon, color: "#0f172a", gradient: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)", ambientOpacity: 0.05,
  },
  {
    id: 3, nameSomali: "Saq-Dambe", nameEnglish: "The Star Reading",
    timeRange: "03:00 – 04:00", startHour: 3, endHour: 4,
    description: "The hour of the Jiheeye. Navigators observe setting master stars (like Dirir).",
    descriptionSomali: "Xilliga Jiheeyaha. Waxa la eegayaa xiddigaha wax-sheegga (sida Dirirta).",
    pastoralGuidance: "Read the stars for rain prediction before dawn washes them out.",
    pastoralGuidanceSomali: "Akhri xiddigaha roob-doonka ah ka hor inta aanu iftiinku beddelin cirka.",
    icon: Eye, color: "#312e81", gradient: "linear-gradient(135deg, #0f172a 0%, #312e81 100%)", ambientOpacity: 0.1,
  },
  {
    id: 4, nameSomali: "Hiraab", nameEnglish: "The Pre-Dawn",
    timeRange: "04:00 – 05:00", startHour: 4, endHour: 5,
    description: "Known as the false dawn, where a faint vertical light appears in the east but fades.",
    descriptionSomali: "Waaberi-Beenaad, iftiin aad u yar baa soo baxa oo haddana dhaca.",
    pastoralGuidance: "Wake the camp elders. Prepare for the true dawn.",
    pastoralGuidanceSomali: "Kici odayaasha xerada. U diyaar garow waaberiga rasmiga ah.",
    icon: Star, color: "#4338ca", gradient: "linear-gradient(135deg, #312e81 0%, #4338ca 100%)", ambientOpacity: 0.2,
  },
  {
    id: 5, nameSomali: "Oogta-Hore", nameEnglish: "The True Dawn Approaches",
    timeRange: "05:00 – 06:00", startHour: 5, endHour: 6,
    description: "The true break of day as light gathers strength, ready to begin the cycle of survival again.",
    descriptionSomali: "Bilaabashada rasmiga ah ee waqtiga markii iftiinku isa soo tarayo.",
    pastoralGuidance: "Perform dawn prayers. Organize the day's pastoral distribution.",
    pastoralGuidanceSomali: "Tuko salaadda subax. Habeey in la kala tago shaqada daaqsinta.",
    icon: Sunrise, color: "#4f46e5", gradient: "linear-gradient(135deg, #4338ca 0%, #4f46e5 50%, #1e1b4b 100%)", ambientOpacity: 0.3,
  },
]

function getCurrentSegment(): GoorsheegtaSegment {
  const hour = new Date().getHours() 
  // + new Date().getMinutes() / 60 if precise targeting within segments was needed,
  // but strictly hour-based matching is cleaner for a discrete 24-segment clock.
  
  for (const seg of GOORSHEEGTA_SEGMENTS) {
    if (hour >= seg.startHour && hour < seg.endHour) {
      return seg
    }
  }
  
  // Fallback to Saqdhexe (Midnight) if somehow outside bounds
  return GOORSHEEGTA_SEGMENTS.find(s => s.id === 0) || GOORSHEEGTA_SEGMENTS[0]
}

// ── SVG CIRCULAR CLOCK ──────────────────────────────────────
function ClockFace({ currentSegment }: { currentSegment: GoorsheegtaSegment }) {
  const size = 280
  const center = size / 2
  const radius = 120
  const innerRadius = 85

  // Current time hand angle
  const now = new Date()
  const hourAngle = ((now.getHours() + now.getMinutes() / 60) / 24) * 360 - 90 // -90 for top start

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-2xl">
      {/* Outer glow */}
      <defs>
        <radialGradient id="clockGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={currentSegment.color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={currentSegment.color} stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx={center} cy={center} r={radius + 15} fill="url(#clockGlow)" />

      {/* Segment arcs */}
      {GOORSHEEGTA_SEGMENTS.map((seg, i) => {
        const startAngle = (seg.startHour / 24) * 360 - 90
        const endHourNorm = seg.endHour > 24 ? seg.endHour - 24 + 24 : seg.endHour
        const sweepAngle = ((endHourNorm - seg.startHour) / 24) * 360

        const startRad = (startAngle * Math.PI) / 180
        const endRad = ((startAngle + sweepAngle) * Math.PI) / 180
        const largeArc = sweepAngle > 180 ? 1 : 0

        const x1 = center + radius * Math.cos(startRad)
        const y1 = center + radius * Math.sin(startRad)
        const x2 = center + radius * Math.cos(endRad)
        const y2 = center + radius * Math.sin(endRad)
        const ix1 = center + innerRadius * Math.cos(startRad)
        const iy1 = center + innerRadius * Math.sin(startRad)
        const ix2 = center + innerRadius * Math.cos(endRad)
        const iy2 = center + innerRadius * Math.sin(endRad)

        const isCurrent = seg.id === currentSegment.id
        const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1} Z`

        // Label position
        const midAngle = startRad + (endRad - startRad) / 2
        const labelR = (radius + innerRadius) / 2
        const lx = center + labelR * Math.cos(midAngle)
        const ly = center + labelR * Math.sin(midAngle)

        return (
          <g key={seg.id}>
            <motion.path
              d={path}
              fill={isCurrent ? seg.color : `${seg.color}40`}
              stroke={isCurrent ? "#D9A441" : "rgba(255,255,255,0.08)"}
              strokeWidth={isCurrent ? 2 : 0.5}
              initial={false}
              animate={{ opacity: isCurrent ? 1 : 0.5 }}
              filter={isCurrent ? "url(#glow)" : undefined}
              className="cursor-pointer transition-all"
            />
          </g>
        )
      })}

      {/* Center circle */}
      <circle cx={center} cy={center} r={innerRadius - 5} fill="#0e1117" stroke="rgba(217,164,65,0.2)" strokeWidth="1" />

      {/* Center text */}
      <text x={center} y={center - 14} textAnchor="middle" fill="#D9A441" fontSize="9" fontWeight="bold" className="select-none">
        GOORSHEEGTA
      </text>
      <text x={center} y={center + 2} textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold" className="select-none">
        {currentSegment.nameSomali}
      </text>
      <text x={center} y={center + 16} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" className="select-none">
        {currentSegment.nameEnglish}
      </text>
      <text x={center} y={center + 30} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" className="select-none">
        {currentSegment.timeRange}
      </text>

      {/* Clock hand */}
      {(() => {
        const handRad = (hourAngle * Math.PI) / 180
        const hx = center + (radius - 8) * Math.cos(handRad)
        const hy = center + (radius - 8) * Math.sin(handRad)
        return (
          <>
            <line x1={center} y1={center} x2={hx} y2={hy} stroke="#D9A441" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
            <circle cx={center} cy={center} r="4" fill="#D9A441" />
          </>
        )
      })()}

      {/* Hour markers (24h) */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = ((i / 24) * 360 - 90) * Math.PI / 180
        const majorTick = i % 6 === 0
        const r1 = radius + 2
        const r2 = radius + (majorTick ? 10 : 5)
        return (
          <line
            key={i}
            x1={center + r1 * Math.cos(angle)}
            y1={center + r1 * Math.sin(angle)}
            x2={center + r2 * Math.cos(angle)}
            y2={center + r2 * Math.sin(angle)}
            stroke={majorTick ? "rgba(217,164,65,0.5)" : "rgba(255,255,255,0.1)"}
            strokeWidth={majorTick ? 1.5 : 0.5}
          />
        )
      })}

      {/* Hour labels (0, 6, 12, 18) */}
      {[0, 6, 12, 18].map((h) => {
        const angle = ((h / 24) * 360 - 90) * Math.PI / 180
        const lr = radius + 18
        return (
          <text
            key={h}
            x={center + lr * Math.cos(angle)}
            y={center + lr * Math.sin(angle)}
            textAnchor="middle" dominantBaseline="central"
            fill="rgba(217,164,65,0.6)" fontSize="9" fontWeight="bold"
            className="select-none"
          >
            {h.toString().padStart(2, "0")}
          </text>
        )
      })}
    </svg>
  )
}

// ── SEGMENT DETAIL CARD ─────────────────────────────────────
function SegmentDetail({ segment }: { segment: GoorsheegtaSegment }) {
  const Icon = segment.icon
  return (
    <motion.div
      key={segment.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Segment Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
          style={{ backgroundColor: `${segment.color}30` }}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-foreground">{segment.nameSomali}</h4>
          <p className="text-xs text-muted-foreground">{segment.nameEnglish} · {segment.timeRange}</p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <p className="text-sm text-foreground/80 leading-relaxed">{segment.description}</p>
        <p className="text-xs text-muted-foreground/60 italic leading-relaxed">{segment.descriptionSomali}</p>
      </div>

      {/* Pastoral Guidance */}
      <div className="rounded-xl p-3 border border-primary/10 bg-primary/5">
        <div className="text-[9px] uppercase tracking-widest text-primary/60 font-mono mb-1">
          Hagida Xoolo-dhaqatada / Pastoral Guidance
        </div>
        <p className="text-xs text-foreground/80">{segment.pastoralGuidance}</p>
        <p className="text-[10px] text-muted-foreground/50 italic mt-1">{segment.pastoralGuidanceSomali}</p>
      </div>
    </motion.div>
  )
}

// ── ALL 8 SEGMENTS TIMELINE ─────────────────────────────────
function SegmentTimeline({ currentId }: { currentId: number }) {
  return (
    <div className="flex gap-0.5 mt-3">
      {GOORSHEEGTA_SEGMENTS.map((seg) => {
        const isCurrent = seg.id === currentId
        return (
          <motion.div
            key={seg.id}
            className={cn(
              "flex-1 h-1.5 rounded-full transition-all",
              isCurrent ? "shadow-lg" : ""
            )}
            style={{
              backgroundColor: isCurrent ? seg.color : `${seg.color}30`,
              boxShadow: isCurrent ? `0 0 8px ${seg.color}60` : "none",
            }}
            whileHover={{ scaleY: 2 }}
          />
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT: Goorsheegta Environmental Clock
// ═══════════════════════════════════════════════════════════════════
export function GoorsheegtaClock() {
  const [currentSegment, setCurrentSegment] = useState<GoorsheegtaSegment>(GOORSHEEGTA_SEGMENTS[0])
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setCurrentSegment(getCurrentSegment())
    const interval = setInterval(() => {
      setTime(new Date())
      setCurrentSegment(getCurrentSegment())
    }, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const somaliTime = useMemo(() => KaltirsiEngine.getSomaliTime(time), [time])

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
      {/* Ambient gradient header */}
      <div
        className="px-5 py-3 border-b border-white/5"
        style={{ background: currentSegment.gradient }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-mono">
              Saacadda Deegaanka
            </div>
            <h3 className="text-sm font-bold text-white">Goorsheegta — Environmental Clock</h3>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-white font-mono">
              {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
            </div>
            <div className="text-[10px] text-white/60">{somaliTime}</div>
          </div>
        </div>
      </div>

      {/* Clock + Detail */}
      <div className="p-5">
        <div className="flex flex-col items-center gap-5">
          {/* SVG Clock */}
          <ClockFace currentSegment={currentSegment} />

          {/* Progress bar */}
          <SegmentTimeline currentId={currentSegment.id} />

          {/* Active Segment Details */}
          <AnimatePresence mode="wait">
            <SegmentDetail segment={currentSegment} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
