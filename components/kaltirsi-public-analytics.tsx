"use client"

import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, AreaChart, Area
} from 'recharts';
import { KALTIRSI_MONTHS } from "@/lib/kaltirsi-data";
import { ArrowUpRight, ArrowDownRight, Globe, TrendingUp, Users, Activity, ExternalLink, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data Generation
const chartData = KALTIRSI_MONTHS.map((m, i) => ({
  name: m.name.substring(0,3),
  organic: m.grazingIndex * 14200 + (Math.random() * 5000),
  paid: m.grazingIndex * 8500 + (Math.random() * 2000),
  total: m.grazingIndex * 22700,
}))

const regionsData = [
  { country: "Somaliland (Maroodi Jeex)", traffic: "142.5K", share: "55.2%", trend: "up", percent: "+12%" },
  { country: "Somaliland (Awdal)", traffic: "45.2K", share: "17.5%", trend: "up", percent: "+5.4%" },
  { country: "Somaliland (Togdheer)", traffic: "28.9K", share: "11.2%", trend: "down", percent: "-2.1%" },
  { country: "Somaliland (Sanaag)", traffic: "15.4K", share: "6.0%", trend: "up", percent: "+8.9%" },
  { country: "International (Diaspora)", traffic: "26.1K", share: "10.1%", trend: "up", percent: "+15%" },
]

const aiQueriesData = [
  { keyword: "Goorma ayuu curanayaa Gu'ga?", volume: "145K", kd: "12", cpc: "$0.00" },
  { keyword: "Roobka Karan vs Xays", volume: "85K", kd: "8", cpc: "$0.00" },
  { keyword: "Xoolaha iyo abaarta Toddob", volume: "62K", kd: "24", cpc: "$0.00" },
  { keyword: "Somaliland ecological index", volume: "41K", kd: "45", cpc: "$1.20" },
]

export function PublicAnalyticsDashboard() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a0b] text-slate-300 font-sans p-4 md:p-8 selection:bg-orange-500/30">
      
      {/* Header */}
      <header className="mb-8 border-b border-white/5 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Kaltirsi Sovereign Analytics</h1>
            <p className="text-sm text-slate-500 mt-1">kaltirsi.gov.somaliland - Public Ecological Intelligence Data</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
            <ExternalLink className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </header>

      <div className="space-y-6 max-w-[1400px] mx-auto">
        
        {/* Top Traffic Overview Chart */}
        <div className="bg-[#161618] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors">
          <div className="p-5 border-b border-white/5 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Ecological Traffic Overview</h2>
              <p className="text-xs text-slate-500">Historical telemetry across 12 Kaltirsi months.</p>
            </div>
            <div className="flex bg-[#222225] rounded-lg p-1 space-x-1">
              <button className="px-3 py-1 text-xs rounded-md bg-[#333336] text-white">1Y</button>
              <button className="px-3 py-1 text-xs rounded-md text-slate-400 hover:text-white">6M</button>
              <button className="px-3 py-1 text-xs rounded-md text-slate-400 hover:text-white">30D</button>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div>
                <div className="text-sm text-slate-500 font-medium mb-1">Total Intelligence Scans</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl font-bold text-white">721.9K</div>
                  <div className="flex items-center text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" /> 18%
                  </div>
                </div>
              </div>
              
              <div className="h-px bg-white/5 w-full" />
              
              <div>
                <div className="text-sm text-slate-500 font-medium mb-1">Active AI Nodes</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-white">$398.9K</div>
                  <div className="flex items-center text-red-400 text-xs font-bold bg-red-400/10 px-1.5 py-0.5 rounded">
                    <ArrowDownRight className="w-3 h-3 mr-0.5" /> 2.4%
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-500 font-medium mb-1">NotebookLM Daily Queries</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-white">193K</div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" tick={{fill: '#888', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#666" tick={{fill: '#888', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="organic" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorOrganic)" />
                  <Area type="monotone" dataKey="paid" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorPaid)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Middle Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Traffic By Location */}
          <div className="bg-[#161618] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
            <div className="p-5 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">Telemetry by Location</h2>
            </div>
            <div className="p-0">
               <table className="w-full text-sm text-left">
                  <thead className="bg-[#1c1c1f] text-slate-500 border-b border-white/5 text-xs font-medium">
                    <tr>
                      <th className="px-5 py-3 font-medium">Region</th>
                      <th className="px-5 py-3 font-medium text-right">Traffic</th>
                      <th className="px-5 py-3 font-medium text-right">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {regionsData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02]">
                        <td className="px-5 py-4 font-medium flex items-center gap-2">
                           <Globe className="w-3 h-3 text-slate-500" />
                           {row.country}
                        </td>
                        <td className="px-5 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                             {row.traffic}
                             <span className={cn(
                               "text-[10px] px-1 py-0.5 rounded",
                               row.trend === 'up' ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                             )}>{row.percent}</span>
                           </div>
                        </td>
                        <td className="px-5 py-4 text-right font-mono">{row.share}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>

          {/* Top Queries NotebookLM */}
          <div className="bg-[#161618] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
            <div className="p-5 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">Top NotebookLM AI Queries</h2>
            </div>
            <div className="p-0">
               <table className="w-full text-sm text-left">
                  <thead className="bg-[#1c1c1f] text-slate-500 border-b border-white/5 text-xs font-medium">
                    <tr>
                      <th className="px-5 py-3 font-medium">Query Keyword</th>
                      <th className="px-5 py-3 font-medium text-right">Volume</th>
                      <th className="px-5 py-3 font-medium text-right">KD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {aiQueriesData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02]">
                        <td className="px-5 py-4 flex items-center gap-2">
                           <MessageSquareText className="w-3 h-3 text-emerald-500" />
                           <span className="truncate max-w-[200px]">{row.keyword}</span>
                        </td>
                        <td className="px-5 py-4 text-right">{row.volume}</td>
                        <td className="px-5 py-4 text-right font-mono text-orange-400">{row.kd}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
