"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

const volumetryData = [
  { time: "0:00", forecast: 2500, capacity: 2800 },
  { time: "0:05", forecast: 2600, capacity: 2850 },
  { time: "9:00", forecast: 3200, capacity: 3500 },
  { time: "15:20", forecast: 4200, capacity: 4500 },
  { time: "11:22", forecast: 5200, capacity: 5500 },
  { time: "22:00", forecast: 5800, capacity: 6000 },
  { time: "10:05", forecast: 4800, capacity: 5200 },
  { time: "03:30", forecast: 3500, capacity: 3800 },
  { time: "22:35", forecast: 2500, capacity: 2800 },
]

const statsData = [
  { label: "Entrantes", value: "1,541", change: 1.6, positive: true },
  { label: "Contestadas", value: "1,376", change: -1.2, positive: false },
  { label: "Umbral", value: "723", change: 47, positive: false },
  { label: "Abandonadas", value: "195", change: 3.0, positive: false },
]

export function VolumetryChartCompact() {
  return (
    <Card className="border-0 shadow-sm bg-card h-full flex flex-col">
      <CardHeader className="pb-1 pt-3 px-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Salud Operativa</CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#0F0F72]" />
              <span className="text-[10px] text-muted-foreground">Forecast</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#04B4FD]" />
              <span className="text-[10px] text-muted-foreground">Capacity</span>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground">Volumetría en Tiempo Real</p>
      </CardHeader>
      <CardContent className="flex-1 p-3 pt-0 flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volumetryData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F0F72" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0F0F72" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCapacity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#04B4FD" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#04B4FD" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 8, fill: "#6B7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 8, fill: "#6B7280" }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontSize: "10px",
                }}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#0F0F72"
                strokeWidth={1.5}
                fill="url(#colorForecast)"
              />
              <Area
                type="monotone"
                dataKey="capacity"
                stroke="#04B4FD"
                strokeWidth={1.5}
                fill="url(#colorCapacity)"
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t mt-2">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-semibold">{stat.value}</p>
              <div
                className={`flex items-center justify-center gap-0.5 text-[9px] ${
                  stat.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.positive ? (
                  <TrendingUp className="h-2 w-2" />
                ) : (
                  <TrendingDown className="h-2 w-2" />
                )}
                {stat.change}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
