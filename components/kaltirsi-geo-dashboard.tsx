"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { AlertCircle, CloudRain, ThermometerSun, Leaf, Map } from "lucide-react";

export function KaltirsiGeoDashboard() {
  const [regionName, setRegionName] = useState("Hargeysa");
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Calls the intelligence engine we just built in Convex
  // @ts-ignore
  const generateMapState = useAction(api.kaltirsi_engine?.getLiveEcologicalGeoMap || api.kaltirsiEngine?.getLiveEcologicalGeoMap);

  const fetchEcologyData = async () => {
    setLoading(true);
    try {
      // Coordinates for Hargeysa as default
      const result = await generateMapState({ 
        regionName: regionName, 
        lat: 9.56, 
        lon: 44.06 
      });
      setGeoData(result);
    } catch (e) {
      console.error("Kaltirsi Engine Error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-slate-900 border border-[#D4AF37]/20 rounded-xl m-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#D4AF37] flex items-center gap-2">
            <Map className="w-6 h-6" />
            Active Geo-Intelligence
          </h2>
          <p className="text-slate-400 text-sm mt-1">Real-time Godka, NDVI & Weather Synthesis</p>
        </div>
        <button 
          onClick={fetchEcologyData}
          disabled={loading}
          className="px-4 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg transition-all"
        >
          {loading ? "Syncing NASA/Meteo..." : "Compute Region State"}
        </button>
      </div>

      {geoData && geoData.properties && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Risk Card */}
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-slate-400 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Risk Level
            </div>
            <div className={`text-2xl font-bold ${
              geoData.properties.kaltirsi.risk === "HIGH" ? "text-red-500" :
              geoData.properties.kaltirsi.risk === "MEDIUM" ? "text-yellow-500" : "text-emerald-500"
            }`}>
              {geoData.properties.kaltirsi.risk}
            </div>
          </div>

          {/* Grazing Index */}
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-slate-400 mb-2 flex items-center gap-2">
              <Leaf className="w-4 h-4" /> Grazing Index
            </div>
            <div className="text-2xl font-bold text-emerald-400">
              {geoData.properties.kaltirsi.grazing_index} / 5
            </div>
          </div>

          {/* Real-time Heat */}
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-slate-400 mb-2 flex items-center gap-2">
              <ThermometerSun className="w-4 h-4" /> Temp Stress
            </div>
            <div className="text-2xl font-bold text-orange-400">
              {geoData.properties.kaltirsi.real_time_metrics.temp_c}°C
            </div>
          </div>

          {/* Star Align */}
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-slate-400 mb-2">Godka Lock</div>
            <div className="text-2xl font-bold text-indigo-400">
              {geoData.properties.kaltirsi.star}
            </div>
          </div>

        </div>
      )}

      {/* Backend JSON Preview */}
      {geoData && (
        <div className="mt-6">
          <p className="text-xs text-slate-500 mb-2">Kaltirsi GeoJSON Output Payload</p>
          <pre className="bg-black/50 p-4 rounded-lg overflow-hidden text-xs text-slate-300 font-mono">
            {JSON.stringify(geoData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
