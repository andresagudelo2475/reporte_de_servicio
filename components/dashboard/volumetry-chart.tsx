"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

const volumetryData = [
  { time: "0:00", forecast: 2500, capacity: 2800, real: 2400 },
  { time: "0:05", forecast: 2600, capacity: 2850, real: 2550 },
  { time: "9:00s", forecast: 3200, capacity: 3500, real: 3100 },
  { time: "15:20", forecast: 4200, capacity: 4500, real: 4100 },
  { time: "11:22", forecast: 5200, capacity: 5500, real: 5000 },
  { time: "22:00", forecast: 5800, capacity: 6000, real: 5700 },
  { time: "10:05", forecast: 4800, capacity: 5200, real: 4700 },
  { time: "03:30", forecast: 3500, capacity: 3800, real: 3400 },
  { time: "03:05", forecast: 3200, capacity: 3500, real: 3100 },
  { time: "22:30", forecast: 2800, capacity: 3100, real: 2700 },
  { time: "22:35", forecast: 2500, capacity: 2800, real: 2400 },
]

const statsData = [
  { label: "Entrantes", value: "1,541", change: 1.6, positive: true },
  { label: "Contestadas", value: "1,376", change: -1.2, positive: false },
  { label: "Ptsnó; sie- Umbral", value: "723", change: 47, positive: false },
  { label: "Abandonadas", value: "195", change: 3.0, positive: false },
]

export function VolumetryChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Salud Operativa</CardTitle>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-muted-foreground">Volumetría en Tiempo Real</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#0F0F72]" />
              <span className="text-xs text-muted-foreground">Forecast</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#04B4FD]" />
              <span className="text-xs text-muted-foreground">Capacity</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volumetryData}>
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
                tick={{ fontSize: 10, fill: "#6B7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6B7280" }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#0F0F72"
                strokeWidth={2}
                fill="url(#colorForecast)"
              />
              <Area
                type="monotone"
                dataKey="capacity"
                stroke="#04B4FD"
                strokeWidth={2}
                fill="url(#colorCapacity)"
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
              <div
                className={`flex items-center justify-center gap-1 text-xs ${
                  stat.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.positive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
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
