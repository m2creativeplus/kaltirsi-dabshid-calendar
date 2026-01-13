"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function PrototypesFlow() {
  const userFlows = [
    {
      id: "onboarding",
      title: "User Flow 1: New User Onboarding",
      description: "First-time user setup and language selection",
      steps: [
        "Splash Screen",
        "Language Selection",
        "Theme Preference",
        "Offline Mode Setup",
        "Calendar Permissions",
        "Welcome Tutorial",
      ],
      color: "bg-blue-500",
    },
    {
      id: "calendar-switching",
      title: "User Flow 2: Switching Calendars",
      description: "Navigate between Gregorian, Somali, and Hijri calendars",
      steps: [
        "Home Screen",
        "Calendar Tab Selection",
        "View Transition",
        "Date Synchronization",
        "Event Mapping",
        "Confirmation",
      ],
      color: "bg-green-500",
    },
    {
      id: "holidays",
      title: "User Flow 3: Adding/Viewing Public Holidays",
      description: "Manage and view cultural and national holidays",
      steps: [
        "Calendar View",
        "Holiday Detection",
        "Event Details",
        "Cultural Context",
        "Reminder Setup",
        "Share Options",
      ],
      color: "bg-orange-500",
    },
    {
      id: "reminders",
      title: "User Flow 4: Monthly Reminder for Dabshid",
      description: "Set up and receive notifications for cultural events",
      steps: [
        "Settings Screen",
        "Notification Setup",
        "Event Selection",
        "Reminder Timing",
        "Cultural Information",
        "Confirmation",
      ],
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="space-y-8">
      {/* User Flows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userFlows.map((flow) => (
          <Card key={flow.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${flow.color}`}></div>
                {flow.title}
              </CardTitle>
              <p className="text-xs text-gray-600">{flow.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {flow.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="bg-gray-100 px-2 py-1 rounded text-xs">{step}</div>
                      {index < flow.steps.length - 1 && <ArrowRight className="h-3 w-3 text-gray-400" />}
                    </div>
                  ))}
                </div>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  <Play className="h-3 w-3 mr-1" />
                  View Prototype
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Prototype Preview */}
      <Card>
        <CardHeader>
          <CardTitle>🎮 Interactive Prototype Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <div className="max-w-sm mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
                <div className="aspect-[9/16] bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xl">🐪</span>
                    </div>
                    <h3 className="font-bold">Dabshid Calendar</h3>
                    <p className="text-xs opacity-90">Interactive Prototype</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Play className="h-3 w-3 mr-1" />
                  Play Prototype
                </Button>
                <Button size="sm" variant="outline">
                  View in Figma
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interaction Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>⚡ Interaction Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Gestures & Navigation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Swipe Left/Right</span>
                  <span className="text-gray-600">Navigate months</span>
                </div>
                <div className="flex justify-between">
                  <span>Tap & Hold</span>
                  <span className="text-gray-600">Quick event creation</span>
                </div>
                <div className="flex justify-between">
                  <span>Pull to Refresh</span>
                  <span className="text-gray-600">Sync calendar data</span>
                </div>
                <div className="flex justify-between">
                  <span>Pinch to Zoom</span>
                  <span className="text-gray-600">Month/Week view toggle</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Animations & Transitions</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Page Transitions</span>
                  <span className="text-gray-600">300ms ease-out</span>
                </div>
                <div className="flex justify-between">
                  <span>Button Press</span>
                  <span className="text-gray-600">Scale 0.95, 150ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Modal Appearance</span>
                  <span className="text-gray-600">Slide up, 250ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Loading States</span>
                  <span className="text-gray-600">Skeleton shimmer</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>📱 Device Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">Mobile Devices</h3>
              <div className="space-y-2 text-sm">
                <div>iPhone 14 Pro: 393×852</div>
                <div>iPhone SE: 375×667</div>
                <div>Samsung Galaxy S23: 360×800</div>
                <div>Google Pixel 7: 412×915</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Tablet Devices</h3>
              <div className="space-y-2 text-sm">
                <div>iPad Pro 12.9": 1024×1366</div>
                <div>iPad Air: 820×1180</div>
                <div>Samsung Tab S8: 800×1280</div>
                <div>Surface Pro: 912×1368</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Responsive Breakpoints</h3>
              <div className="space-y-2 text-sm">
                <div>Mobile: 320px - 768px</div>
                <div>Tablet: 768px - 1024px</div>
                <div>Desktop: 1024px+</div>
                <div>Large Desktop: 1440px+</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
