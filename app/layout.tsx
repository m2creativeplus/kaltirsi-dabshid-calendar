import type { Metadata } from "next"
import { Inter, DM_Serif_Display, Noto_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ConvexClientProvider } from "@/components/convex-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-serif" })
const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-noto" }) // Fallback/Body

export const metadata: Metadata = {
  title: "Dabshid: Kaltirsi Somali Calendar",
  description: "Bilingual Somali-English Calendar with traditional elements",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmSerif.variable} ${notoSans.variable} font-sans bg-background text-foreground`}>
        <ConvexClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
