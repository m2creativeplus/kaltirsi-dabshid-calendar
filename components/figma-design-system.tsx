"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CoverBrandGuidelines } from "@/components/cover-brand-guidelines"
import { UIComponentsLibrary } from "@/components/ui-components-library"
import { ScreensShowcase } from "@/components/screens-showcase"
import { PrototypesFlow } from "@/components/prototypes-flow"
import { AssetsLibrary } from "@/components/assets-library"
import Footer from "@/components/footer"

export default function FigmaDesignSystem() {
  return (
    <div className="w-full">
      {/* Figma-style Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Somali Calendar App 2025</h1>
            <p className="text-sm text-gray-600">Figma Design System & Prototypes</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">SC</span>
            </div>
            <span className="text-sm text-gray-600">Design System v1.0</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs defaultValue="cover" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="cover">📂 Cover & Brand</TabsTrigger>
            <TabsTrigger value="components">🧩 UI Components</TabsTrigger>
            <TabsTrigger value="screens">📱 Screens</TabsTrigger>
            <TabsTrigger value="prototypes">🔄 Prototypes</TabsTrigger>
            <TabsTrigger value="assets">🎨 Assets</TabsTrigger>
          </TabsList>

          <TabsContent value="cover">
            <CoverBrandGuidelines />
          </TabsContent>

          <TabsContent value="components">
            <UIComponentsLibrary />
          </TabsContent>

          <TabsContent value="screens">
            <ScreensShowcase />
          </TabsContent>

          <TabsContent value="prototypes">
            <PrototypesFlow />
          </TabsContent>

          <TabsContent value="assets">
            <AssetsLibrary />
          </TabsContent>
        </Tabs>

        {/* Designer Credit Footer */}
        <Footer />
      </div>
    </div>
  )
}
