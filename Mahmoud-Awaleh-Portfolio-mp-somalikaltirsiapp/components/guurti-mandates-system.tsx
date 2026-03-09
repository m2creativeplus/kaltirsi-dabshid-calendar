"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Footer from "@/components/footer"
import { ShieldCheck, Globe, Scale, BookOpen, AlertTriangle, FileText, Gavel } from "lucide-react"

export default function GuurtiMandatesSystem() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Guurti-style Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Guurti Legislative Mandates</h1>
            <p className="text-sm text-gray-600">Official Constitutional Framework (Strict Legal Basis)</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">GG</span>
            </div>
            <span className="text-sm text-gray-600">Compendium v2.0 (Forensic)</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800 font-semibold">Strict Legal Standard Applied</AlertTitle>
          <AlertDescription className="text-amber-700">
            This module displays mandates sourced <strong>exclusively</strong> from Articles 57, 60, and 61 of the Constitution. Implied powers are marked as "Derived".
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto p-1 bg-white border border-gray-200 rounded-xl">
            <TabsTrigger value="security" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 py-3">
              <ShieldCheck className="w-4 h-4 mr-2" /> Security (Exclusive)
            </TabsTrigger>
            <TabsTrigger value="culture" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 py-3">
              <BookOpen className="w-4 h-4 mr-2" /> Culture & Religion
            </TabsTrigger>
            <TabsTrigger value="standing" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 py-3">
              <Gavel className="w-4 h-4 mr-2" /> Standing Cmte
            </TabsTrigger>
            <TabsTrigger value="foreign" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 py-3">
              <Globe className="w-4 h-4 mr-2" /> Foreign Affairs
            </TabsTrigger>
            <TabsTrigger value="sectors" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-700 py-3">
              <Scale className="w-4 h-4 mr-2" /> Sector Oversight
            </TabsTrigger>
          </TabsList>

          {/* 1. SECURITY COMMITTEE */}
          <TabsContent value="security" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-100 shadow-sm">
                <CardHeader className="bg-green-50/50 pb-3">
                  <CardTitle className="text-green-800 flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-2" /> Guddida Nabadgelyada
                  </CardTitle>
                  <CardDescription>Internal Affairs, Security & Defence</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Constitutional Powers</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <span className="text-green-600 font-bold">Art 61(2):</span>
                        <span>"Specific responsibility for passing laws relating to <strong className="text-gray-900">security</strong>."</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600 font-bold">Art 61(7):</span>
                        <span>Power to <strong className="text-gray-900">initiate legislation</strong> on security matters.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600 font-bold">Art 61(6):</span>
                        <span>Approve <strong className="text-gray-900">State of Emergency</strong> & martial law.</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Approved Jurisdiction</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li>Drafting and initiating the National Security Act.</li>
                    <li>Validating Presidential decrees on Emergency Status.</li>
                    <li>Arbitrating inter-clan disputes (Ergooyinka).</li>
                    <li><strong>Primary Portfolio:</strong> Ministry of Interior, Army, Police, Intelligence.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 2. CULTURE COMMITTEE */}
          <TabsContent value="culture" className="space-y-4">
             <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-blue-100 shadow-sm">
                <CardHeader className="bg-blue-50/50 pb-3">
                  <CardTitle className="text-blue-800 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" /> Guddida Arrimaha Bulshada
                  </CardTitle>
                  <CardDescription>Religion, Culture & Tradition</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                   <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">Art 61(2):</span>
                        <span>"Specific responsibility for passing laws relating to <strong className="text-gray-900">Religion & Culture</strong>."</span>
                      </li>
                      <li className="flex gap-2">
                         <span className="text-blue-600 font-bold">Role:</span>
                         <span>The "Cultural Veto" - ensuring Sharia compliance.</span>
                      </li>
                   </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 3. STANDING COMMITTEE */}
          <TabsContent value="standing" className="space-y-4">
            <Card className="border-purple-100">
              <CardHeader className="bg-purple-50/50">
                <CardTitle className="text-purple-800">Guddida Joogtada</CardTitle>
                <CardDescription>The Executive Arm (Article 60)</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white border rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 mb-1">25</div>
                      <div className="text-xs text-gray-500 uppercase">Members</div>
                   </div>
                   <div className="p-4 bg-white border rounded-lg">
                      <div className="text-sm font-bold text-gray-900 mb-1">Summoning Power</div>
                      <div className="text-xs text-gray-500">Can question Ministers (Art 61.5)</div>
                   </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 4. FOREIGN AFFAIRS */}
          <TabsContent value="foreign" className="space-y-4">
             <div className="flex gap-4 items-start">
               <Card className="flex-1 border-indigo-100">
                  <CardHeader className="bg-indigo-50/50">
                    <CardTitle className="text-indigo-800">Guddida Arrimaha Dibadda</CardTitle>
                    <CardDescription>Foreign Policy & Planning</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 text-sm space-y-4">
                    <Alert>
                      <FileText className="h-4 w-4" />
                      <AlertTitle>Derived Mandate</AlertTitle>
                      <AlertDescription>
                        This committee does <strong>not</strong> have the power to initiate laws. Its power comes from <strong>Review (Art 61.1)</strong> and <strong>Advisory (Art 61.3)</strong>.
                      </AlertDescription>
                    </Alert>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                       <li>Ratification of International Treaties.</li>
                       <li>Oversight of Ministry of Foreign Affairs & Planning.</li>
                       <li>Parliamentary Diplomacy (IPU/CPA/PAP).</li>
                    </ul>
                  </CardContent>
               </Card>
             </div>
          </TabsContent>

          {/* 5. SECTOR OVERSIGHT */}
          <TabsContent value="sectors">
            <Card>
              <CardHeader>
                <CardTitle>Sector Oversight Committees</CardTitle>
                <CardDescription>Economy, Justice, Environment</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">Committee</th>
                      <th className="px-4 py-3">Legal Basis</th>
                      <th className="px-4 py-3">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-4 py-3 font-medium">Economy & Trade</td>
                      <td className="px-4 py-3 text-gray-500">Art 61(1) Review</td>
                      <td className="px-4 py-3">Budget & Tax Oversight</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Justice & HR</td>
                      <td className="px-4 py-3 text-gray-500">Art 61(4) Consult</td>
                      <td className="px-4 py-3">Judicial Appointments & Rights</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Environment</td>
                      <td className="px-4 py-3 text-gray-500">Art 61(1) Review</td>
                      <td className="px-4 py-3">Resource Legislation Review</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

        {/* Footer from Design System */}
        <div className="mt-12 pt-6 border-t border-gray-100">
           <Footer />
        </div>
      </div>
    </div>
  )
}
