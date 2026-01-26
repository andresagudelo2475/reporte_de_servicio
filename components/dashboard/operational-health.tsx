"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { TrendingUp, TrendingDown, Settings2 } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

// Data for the chart - includes all indicators over time
const timeSeriesData = [
  { time: "0:00", ns: 58, asa: 48, aht: 530, ocupacion: 72, entrantes: 120, contestadas: 110 },
  { time: "2:00", ns: 56, asa: 52, aht: 535, ocupacion: 74, entrantes: 95, contestadas: 88 },
  { time: "4:00", ns: 54, asa: 55, aht: 540, ocupacion: 70, entrantes: 80, contestadas: 72 },
  { time: "6:00", ns: 52, asa: 58, aht: 545, ocupacion: 68, entrantes: 150, contestadas: 135 },
  { time: "8:00", ns: 55, asa: 54, aht: 548, ocupacion: 75, entrantes: 320, contestadas: 290 },
  { time: "10:00", ns: 58, asa: 50, aht: 542, ocupacion: 78, entrantes: 450, contestadas: 410 },
  { time: "12:00", ns: 60, asa: 48, aht: 538, ocupacion: 80, entrantes: 520, contestadas: 485 },
  { time: "14:00", ns: 57, asa: 52, aht: 545, ocupacion: 76, entrantes: 480, contestadas: 440 },
  { time: "16:00", ns: 55, asa: 55, aht: 550, ocupacion: 74, entrantes: 380, contestadas: 345 },
  { time: "18:00", ns: 58, asa: 50, aht: 540, ocupacion: 72, entrantes: 250, contestadas: 230 },
  { time: "20:00", ns: 60, asa: 46, aht: 535, ocupacion: 70, entrantes: 180, contestadas: 168 },
  { time: "22:00", ns: 57.6, asa: 52, aht: 543, ocupacion: 76, entrantes: 140, contestadas: 125 },
]

// Summary stats
const statsData = [
  { label: "Entrantes", value: "1,541", change: 1.6, positive: true },
  { label: "Contestadas", value: "1,376", change: -1.2, positive: false },
  { label: "Umbral", value: "723", change: 47, positive: false },
  { label: "Abandonadas", value: "195", change: 3.0, positive: false },
]

// Available indicators for selection
const availableIndicators = [
  { id: "ns", label: "Nivel de Servicio", color: "#0F0F72", enabled: true },
  { id: "asa", label: "ASA", color: "#04B4FD", enabled: true },
  { id: "aht", label: "AHT", color: "#0DCA61", enabled: false },
  { id: "ocupacion", label: "Ocupación", color: "#FD6221", enabled: false },
  { id: "entrantes", label: "Entrantes", color: "#09BFB0", enabled: false },
  { id: "contestadas", label: "Contestadas", color: "#A855F7", enabled: false },
]

// Time interval options
const timeIntervals = [
  { id: "ano", label: "Año" },
  { id: "trimestre", label: "Trimestre" },
  { id: "mes", label: "Mes" },
  { id: "dia", label: "Día" },
  { id: "intervalo", label: "Intervalo" },
]

export function OperationalHealth() {
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>(["ns", "asa"])
  const [selectedInterval, setSelectedInterval] = useState("24h")

  const toggleIndicator = (id: string) => {
    setSelectedIndicators((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const getIndicatorColor = (id: string) => {
    return availableIndicators.find((i) => i.id === id)?.color || "#0F0F72"
  }

  return (
    <Card className="border-0 shadow-sm h-full flex flex-col">
      <CardHeader className="pb-1 pt-2 px-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Salud Operativa</CardTitle>
          <div className="flex items-center gap-1">
            {/* Time Interval Selector */}
            <div className="flex bg-muted rounded-md p-0.5">
              {timeIntervals.slice(0, 4).map((interval) => (
                <Button
                  key={interval.id}
                  variant="ghost"
                  size="sm"
                  className={`h-5 px-2 text-[9px] rounded ${
                    selectedInterval === interval.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                  onClick={() => setSelectedInterval(interval.id)}
                >
                  {interval.label}
                </Button>
              ))}
            </div>

            {/* Indicator Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-5 px-2 text-[9px] bg-transparent">
                  <Settings2 className="h-3 w-3 mr-1" />
                  Indicadores
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-xs">Seleccionar indicadores</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {availableIndicators.map((indicator) => (
                  <div
                    key={indicator.id}
                    className="flex items-center space-x-2 px-2 py-1.5 hover:bg-muted rounded-sm cursor-pointer"
                    onClick={() => toggleIndicator(indicator.id)}
                  >
                    <Checkbox
                      id={indicator.id}
                      checked={selectedIndicators.includes(indicator.id)}
                      className="h-3 w-3"
                    />
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: indicator.color }}
                    />
                    <label className="text-xs cursor-pointer flex-1">{indicator.label}</label>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-1">
          {selectedIndicators.map((id) => {
            const indicator = availableIndicators.find((i) => i.id === id)
            if (!indicator) return null
            return (
              <div key={id} className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: indicator.color }}
                />
                <span className="text-[9px] text-muted-foreground">{indicator.label}</span>
              </div>
            )
          })}
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-0 px-3 pb-2 flex flex-col">
        {/* Chart */}
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeriesData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
              <defs>
                {selectedIndicators.map((id) => (
                  <linearGradient key={id} id={`color-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={getIndicatorColor(id)} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={getIndicatorColor(id)} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 8, fill: "#6B7280" }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 8, fill: "#6B7280" }}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontSize: "10px",
                }}
              />
              {selectedIndicators.map((id) => (
                <Area
                  key={id}
                  type="monotone"
                  dataKey={id}
                  stroke={getIndicatorColor(id)}
                  strokeWidth={1.5}
                  fill={`url(#color-${id})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t mt-1">
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
