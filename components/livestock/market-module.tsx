"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function MarketModule() {
  const marketData = [
    { type: "Camel (Male, Adult)", price: "$1,200", trend: "up", location: "Hargeisa Livestock Market" },
    { type: "Camel (Female, Lactating)", price: "$1,450", trend: "stable", location: "Hargeisa Livestock Market" },
    { type: "Goat (Export Grade)", price: "$85", trend: "down", location: "Burco Market" },
    { type: "Sheep (Fat Tailed)", price: "$95", trend: "up", location: "Burco Market" },
    { type: "Cattle (Bull)", price: "$550", trend: "stable", location: "Borama Market" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Market Prices</CardTitle>
        <CardDescription>Average prices from major regional markets today</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Livestock Type</TableHead>
              <TableHead>Market Location</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.type}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  {item.trend === "up" && <div className="flex items-center text-green-600"><TrendingUp className="h-4 w-4 mr-1"/> +2.5%</div>}
                  {item.trend === "down" && <div className="flex items-center text-red-600"><TrendingDown className="h-4 w-4 mr-1"/> -1.2%</div>}
                  {item.trend === "stable" && <div className="flex items-center text-gray-500"><Minus className="h-4 w-4 mr-1"/> 0.0%</div>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
