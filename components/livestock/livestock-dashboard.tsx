"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PawPrint, Map, TrendingUp, Users, Plus, Activity, Droplets } from "lucide-react"
import { AnimalProfile } from "@/components/livestock/animal-profile"
import { MigrationPlanner } from "@/components/livestock/migration-planner"
import { MarketModule } from "@/components/livestock/market-module"
import { CommunityKnowledge } from "@/components/livestock/community-knowledge"

export function LivestockDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Livestock Management</h1>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="h-4 w-4 mr-2" />
          Add Animal
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Herd</CardTitle>
            <PawPrint className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+4 new calibrations this season</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Herd Health</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <p className="text-xs text-muted-foreground">3 animals require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Status</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Adequate</div>
            <p className="text-xs text-muted-foreground">Next watering in 2 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,500</div>
            <p className="text-xs text-muted-foreground">+12% from last season</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="herd" className="space-y-4">
        <TabsList>
          <TabsTrigger value="herd">
            <PawPrint className="h-4 w-4 mr-2" />
            My Herd
          </TabsTrigger>
          <TabsTrigger value="migration">
            <Map className="h-4 w-4 mr-2" />
            Migration
          </TabsTrigger>
          <TabsTrigger value="market">
            <TrendingUp className="h-4 w-4 mr-2" />
            Market
          </TabsTrigger>
          <TabsTrigger value="community">
            <Users className="h-4 w-4 mr-2" />
            Knowledge
          </TabsTrigger>
        </TabsList>

        <TabsContent value="herd" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             {/* Herd Summary Cards */}
             <Card>
              <CardHeader>
                <CardTitle>Camels (Geel)</CardTitle>
                <CardDescription>The backbone of the herd</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Adult Males</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lactating Females</span>
                    <span className="font-bold">28</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calves</span>
                    <span className="font-bold">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Goats (Ari)</CardTitle>
                <CardDescription>Quick reproduction cycle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-bold">85</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pregnant</span>
                    <span className="font-bold">15</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cattle (Lo')</CardTitle>
                <CardDescription>Requires water proximity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-bold">9</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Detailed Animal Profiles</h3>
            <AnimalProfile />
          </div>
        </TabsContent>

        <TabsContent value="migration">
          <MigrationPlanner />
        </TabsContent>

        <TabsContent value="market">
          <MarketModule />
        </TabsContent>

        <TabsContent value="community">
          <CommunityKnowledge />
        </TabsContent>
      </Tabs>
    </div>
  )
}
