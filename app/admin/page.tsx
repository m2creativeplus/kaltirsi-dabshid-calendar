import { 
  Building2, 
  Settings2, 
  Paintbrush, 
  Database, 
  Bot, 
  LayoutDashboard, 
  Type,
  Image as ImageIcon
} from "lucide-react";

export const metadata = {
  title: "Kaltirsi Sovereign CMS | Admin",
  description: "Secure CMS and branding control center for the Kaltirsi OS.",
};

export default function CMSAdminPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-[#111113] p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <Building2 className="w-4 h-4 text-black" />
          </div>
          <div>
            <h2 className="font-bold tracking-tight text-sm">Sovereign CMS</h2>
            <p className="text-[10px] text-slate-500 font-mono">v3.1 Internal</p>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
          <NavItem icon={<Database />} label="Kaltirsi Data Engine" />
          <NavItem icon={<Paintbrush />} label="Brand Identity" />
          <NavItem icon={<Type />} label="Typography & Fonts" />
          <NavItem icon={<ImageIcon />} label="Cinematic Assets" />
          <NavItem icon={<Bot />} label="NotebookLM Settings" />
        </nav>

        <div className="border-t border-white/10 pt-4 mt-auto">
          <NavItem icon={<Settings2 />} label="System Config" />
        </div>
      </aside>

      {/* Main CMS Area */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Brand & Identity Management</h1>
          <p className="text-slate-400 text-sm">Customize the front-end look, feel, and typography of the Kaltirsi Public OS.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
          
          {/* Main Form */}
          <div className="col-span-2 space-y-8">
            <section className="bg-[#161618] border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Paintbrush className="w-4 h-4 text-primary" />
                Color System
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Primary Brand Color (Hex)</label>
                  <input type="text" defaultValue="#E5A631" className="w-full bg-[#0a0a0b] border border-white/10 rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Secondary Dark Void (Hex)</label>
                  <input type="text" defaultValue="#09090b" className="w-full bg-[#0a0a0b] border border-white/10 rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none" />
                </div>
              </div>
            </section>

            <section className="bg-[#161618] border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Type className="w-4 h-4 text-primary" />
                Typography Engine
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Heading Font Family (Serif/Display)</label>
                  <select className="w-full bg-[#0a0a0b] border border-white/10 rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none appearance-none">
                    <option>Playfair Display</option>
                    <option>Inter</option>
                    <option>Outfit</option>
                    <option>Geist</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Base UI Font (Sans)</label>
                  <select className="w-full bg-[#0a0a0b] border border-white/10 rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none appearance-none">
                    <option>Inter</option>
                    <option>Geist Sans</option>
                    <option>Helvetica Neue</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-[#161618] border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                Somaliland Seasonal Content
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-slate-400 mb-4">Edit canonical lore data directly in the database (synced to public UI).</p>
                <div className="flex items-center justify-between p-3 bg-[#222225] rounded-xl border border-white/5">
                   <div className="text-sm font-medium">Month 1: Karan</div>
                   <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors">Edit Lore</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#222225] rounded-xl border border-white/5">
                   <div className="text-sm font-medium">Month 2: Habar-ari</div>
                   <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors">Edit Lore</button>
                </div>
              </div>
            </section>
            
            <button className="bg-primary text-black font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(229,166,49,0.3)]">
              Publish Branch to Live OS
            </button>
          </div>

          {/* Right Preview Pane */}
          <div className="col-span-1">
             <div className="sticky top-12 bg-gradient-to-br from-[#161618] to-[#111113] rounded-3xl border border-white/10 p-6 overfow-hidden h-[600px] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-4 text-center">Live Component Preview</div>
                  
                  <div className="rounded-2xl bg-black/50 border border-white/5 p-8 text-center mt-12 relative overflow-hidden">
                     <div className="absolute inset-0 bg-primary/5" />
                     <h2 className="text-5xl font-serif font-black relative drop-shadow">Karan</h2>
                     <p className="text-xs text-primary font-mono mt-4 relative">The Fire & Haze</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-slate-400">Database Sync Active</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Changes made here will instantly reflect on the public Kaltirsi Dashboard via Convex real-time mutations.</p>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  )
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
      active ? "bg-primary/10 text-primary font-semibold" : "text-slate-400 hover:text-white hover:bg-white/5"
    }`}>
      <div className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{icon}</div>
      {label}
    </button>
  )
}
