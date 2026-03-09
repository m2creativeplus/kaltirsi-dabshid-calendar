"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Calendar, Star, Globe, Moon } from "lucide-react"

export function ScreensShowcase() {
  const screens = [
    {
      id: "splash",
      title: "01. Splash & Welcome",
      description: "Intro animation, logo, mission tagline",
    },
    {
      id: "onboarding",
      title: "02. Onboarding",
      description: "Language switch, theme selector, offline mode toggle",
    },
    {
      id: "home",
      title: "03. Home Screen",
      description: "Calendar mode selector: Month / Week / Day",
    },
    {
      id: "month",
      title: "04. Month View",
      description: "Split Somali-Gregorian layout with holiday highlights",
    },
    {
      id: "day",
      title: "05. Day View",
      description: "Gregorian + Somali + Hijri + events + star chart",
    },
    {
      id: "events",
      title: "06. Events & Holidays",
      description: "List of Dabshid, Dambasame, Eid, National Days",
    },
    {
      id: "settings",
      title: "07. Settings",
      description: "Language, dark mode, notifications, data sync",
    },
    {
      id: "stars",
      title: "08. Star Chart & Seasonal Guide",
      description: "Dirir, Pleiades, moon phases by month",
    },
    {
      id: "offline",
      title: "09. Error / Offline Screens",
      description: "No network fallback with cultural proverb",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Screen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screens.map((screen) => (
          <Card key={screen.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{screen.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[9/16] bg-muted rounded-lg mb-3 relative overflow-hidden">
                {/* Screen mockups */}
                {screen.id === "splash" && <SplashScreen />}
                {screen.id === "onboarding" && <OnboardingScreen />}
                {screen.id === "home" && <HomeScreen />}
                {screen.id === "month" && <MonthViewScreen />}
                {screen.id === "day" && <DayViewScreen />}
                {screen.id === "events" && <EventsScreen />}
                {screen.id === "settings" && <SettingsScreen />}
                {screen.id === "stars" && <StarsScreen />}
                {screen.id === "offline" && <OfflineScreen />}
              </div>
              <p className="text-xs text-muted-foreground">{screen.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SplashScreen() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 flex flex-col items-center justify-center text-white p-4">
      <div className="w-16 h-16 bg-card/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
        <span className="text-2xl">🐪</span>
      </div>
      <h1 className="text-lg font-bold mb-1">Dabshid Calendar</h1>
      <p className="text-xs text-center opacity-90 mb-4">Traditional Somali Calendar 2025</p>
      <div className="text-xs text-center opacity-70">
        <p>Xarunta Dhitaynta Dhaqanka</p>
        <p>ODAY-KA-SHEEKEE</p>
      </div>
      <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin mt-4"></div>
    </div>
  )
}

function OnboardingScreen() {
  return (
    <div className="w-full h-full bg-card p-4 flex flex-col">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center">
          <Globe className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-sm font-bold mb-1">Choose Your Language</h2>
        <p className="text-xs text-muted-foreground">Dooro Luqaddaada</p>
      </div>

      <div className="space-y-3 mb-6">
        <button className="w-full p-3 border-2 border-orange-500 rounded-lg bg-orange-50">
          <span className="text-sm font-medium">🇸🇴 Somali</span>
        </button>
        <button className="w-full p-3 border border-border rounded-lg">
          <span className="text-sm">🇺🇸 English</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs">Dark Mode</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">Offline Mode</span>
          <Switch />
        </div>
      </div>

      <div className="mt-auto">
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-sm">Continue</Button>
      </div>
    </div>
  )
}

function HomeScreen() {
  return (
    <div className="w-full h-full bg-card flex flex-col">
      <div className="bg-gradient-to-r from-orange-400 to-red-500 p-3 text-white">
        <h1 className="text-sm font-bold">Dabshid 3122</h1>
        <p className="text-xs opacity-90">January 2025 • Jiilaal Season</p>
      </div>

      <div className="p-3 flex-1">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button size="sm" className="bg-orange-500 text-xs">
            Month
          </Button>
          <Button size="sm" variant="outline" className="text-xs bg-transparent">
            Week
          </Button>
          <Button size="sm" variant="outline" className="text-xs bg-transparent">
            Day
          </Button>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs font-medium">Jiilaal Season</span>
          </div>
          <p className="text-xs text-muted-foreground">Dry season - cool mornings</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <Calendar className="h-4 w-4 mx-auto mb-1 text-orange-500" />
            <span className="text-xs">Events</span>
          </div>
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <Star className="h-4 w-4 mx-auto mb-1 text-purple-500" />
            <span className="text-xs">Stars</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MonthViewScreen() {
  return (
    <div className="w-full h-full bg-card flex flex-col">
      <div className="border-b p-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xs font-bold">Xays 3122</h2>
          <span className="text-xs text-muted-foreground">Jan 2025</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs text-center text-muted-foreground">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>
      </div>

      <div className="flex-1 p-1">
        <div className="grid grid-cols-7 gap-1 h-full">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 2
            const isToday = day === 15
            const hasEvent = day === 19
            return (
              <div
                key={i}
                className={`text-xs flex flex-col items-center justify-start p-1 ${
                  day < 1 || day > 31 ? "text-gray-300" : ""
                } ${isToday ? "bg-blue-500 text-white rounded" : ""}`}
              >
                {day > 0 && day <= 31 && (
                  <>
                    <span>{day}</span>
                    {hasEvent && <div className="w-1 h-1 bg-orange-500 rounded-full mt-1"></div>}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function DayViewScreen() {
  return (
    <div className="w-full h-full bg-card flex flex-col">
      <div className="border-b p-3">
        <h2 className="text-sm font-bold">Monday, January 15</h2>
        <p className="text-xs text-muted-foreground">Xays 15, 3122 • Hijri: 1446</p>
      </div>

      <div className="flex-1 p-3 space-y-3">
        <div className="bg-orange-50 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-xs font-medium">Dabshid Preparation</span>
          </div>
          <p className="text-xs text-muted-foreground">Traditional fire gathering</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <Star className="h-3 w-3 text-purple-500" />
            <span className="text-xs font-medium">Cirir Rising</span>
          </div>
          <p className="text-xs text-muted-foreground">Visible before dawn</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <Moon className="h-3 w-3 text-blue-500" />
            <span className="text-xs font-medium">Moon Phase</span>
          </div>
          <p className="text-xs text-muted-foreground">Waxing Crescent</p>
        </div>
      </div>
    </div>
  )
}

function EventsScreen() {
  return (
    <div className="w-full h-full bg-card flex flex-col">
      <div className="border-b p-3">
        <h2 className="text-sm font-bold">Events & Holidays</h2>
        <p className="text-xs text-muted-foreground">Cultural celebrations and observances</p>
      </div>

      <div className="flex-1 p-3 space-y-2">
        <div className="border rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-orange-500 text-xs">Jul 19</Badge>
            <span className="text-xs font-medium">Dabshid Festival</span>
          </div>
          <p className="text-xs text-muted-foreground">Traditional fire festival</p>
        </div>

        <div className="border rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-red-500 text-xs">May 18</Badge>
            <span className="text-xs font-medium">Independence Day</span>
          </div>
          <p className="text-xs text-muted-foreground">Somaliland independence</p>
        </div>

        <div className="border rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-green-500 text-xs">Apr 10</Badge>
            <span className="text-xs font-medium">Eid al-Fitr</span>
          </div>
          <p className="text-xs text-muted-foreground">End of Ramadan</p>
        </div>

        <div className="border rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-purple-500 text-xs">Oct 19</Badge>
            <span className="text-xs font-medium">Dambasame Night</span>
          </div>
          <p className="text-xs text-muted-foreground">Star observation night</p>
        </div>
      </div>
    </div>
  )
}

function SettingsScreen() {
  return (
    <div className="w-full h-full bg-card flex flex-col">
      <div className="border-b p-3">
        <h2 className="text-sm font-bold">Settings</h2>
        <p className="text-xs text-muted-foreground">App preferences and configuration</p>
      </div>

      <div className="flex-1 p-3 space-y-4">
        <div>
          <h3 className="text-xs font-medium mb-2">Language</h3>
          <div className="flex gap-2">
            <Button size="sm" className="bg-orange-500 text-xs">
              Somali
            </Button>
            <Button size="sm" variant="outline" className="text-xs bg-transparent">
              English
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs">Dark Mode</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Notifications</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Offline Mode</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Data Sync</span>
            <Switch defaultChecked />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium mb-2">Calendar Display</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Show Hijri Dates</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Show Star Events</span>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StarsScreen() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-indigo-900 to-black text-white flex flex-col">
      <div className="p-3 border-b border-white/20">
        <h2 className="text-sm font-bold">Star Chart</h2>
        <p className="text-xs opacity-80">Cirir (Spica) - January 2025</p>
      </div>

      <div className="flex-1 p-3 relative">
        <div className="absolute inset-0">
          {/* Mock stars */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-card rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-300 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-card rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse"></div>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-black/50 rounded-lg p-2 backdrop-blur-sm">
            <h3 className="text-xs font-medium mb-1">Cirir (Spica)</h3>
            <p className="text-xs opacity-80">Visible before dawn • Guides Gu' season</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function OfflineScreen() {
  return (
    <div className="w-full h-full bg-card flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">📡</span>
      </div>
      <h2 className="text-sm font-bold mb-2">No Connection</h2>
      <p className="text-xs text-muted-foreground mb-4">Unable to connect to the internet</p>

      <div className="bg-orange-50 rounded-lg p-3 mb-4">
        <p className="text-xs italic text-orange-800">"Xiddigtu waa hagayso, haddii aad aragto."</p>
        <p className="text-xs text-orange-600 mt-1">The stars guide you, if you look up.</p>
      </div>

      <Button size="sm" variant="outline" className="text-xs bg-transparent">
        Try Again
      </Button>
    </div>
  )
}
