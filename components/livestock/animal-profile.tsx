"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Syringe, Baby, AlertTriangle } from "lucide-react"

export function AnimalProfile() {
  // Mock data for MVP
  const animal = {
    id: "CAM-042",
    name: "Caasha",
    type: "Camel",
    breed: "Hoor",
    age: "6 years",
    status: "Healthy",
    healthScore: 92,
    pregnancyStatus: "Pregnant (8 months)",
    nextVaccination: "Oct 15, 2025"
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Profile Card */}
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/camel-avatar.png" />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{animal.name}</CardTitle>
                <CardDescription>ID: {animal.id} • {animal.breed} {animal.type}</CardDescription>
              </div>
            </div>
            <Badge className="bg-green-500">{animal.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Health Score</span>
                <span className="font-bold">{animal.healthScore}/100</span>
              </div>
              <Progress value={animal.healthScore} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Heart className="text-blue-500 h-5 w-5" />
                <div>
                  <p className="text-xs text-gray-500">Condition</p>
                  <p className="font-semibold">Excellent</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                <Baby className="text-purple-500 h-5 w-5" />
                <div>
                  <p className="text-xs text-gray-500">Reproduction</p>
                  <p className="font-semibold">{animal.pregnancyStatus}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                <Syringe className="text-orange-500 h-5 w-5" />
                <div>
                  <p className="text-xs text-gray-500">Next Vax</p>
                  <p className="font-semibold">{animal.nextVaccination}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breeding History */}
      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
           <ul className="space-y-4">
             <li className="flex gap-3 text-sm">
               <div className="mt-0.5 bg-gray-100 p-1 rounded h-fit">
                 <Syringe className="h-3 w-3" />
               </div>
               <div>
                 <p className="font-medium">Routine Vaccination</p>
                 <p className="text-xs text-gray-500">2 months ago</p>
               </div>
             </li>
             <li className="flex gap-3 text-sm">
               <div className="mt-0.5 bg-purple-100 p-1 rounded h-fit">
                 <Baby className="h-3 w-3 text-purple-600" />
               </div>
               <div>
                 <p className="font-medium">Calf Delivery (Male)</p>
                 <p className="text-xs text-gray-500">1 year ago</p>
               </div>
             </li>
           </ul>
        </CardContent>
      </Card>
    </div>
  )
}
