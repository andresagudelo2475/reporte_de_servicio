"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const timeRanges = ["Año", "Trimestre", "Mes", "Día", "Intervalo"]

const indicatorOptions = [
  { value: "ns", label: "Nivel de Servicio" },
  { value: "eficiencia", label: "Nivel de Eficiencia" },
  { value: "asa", label: "ASA" },
  { value: "ata", label: "ATA" },
  { value: "aht_entrada", label: "AHT Entrada" },
  { value: "aht_salida", label: "AHT Salida" },
  { value: "aht_total", label: "AHT Total" },
  { value: "ocupacion", label: "Ocupación" },
]

const chartData = [
  { period: "Ene", actual: 58, proyeccion: 60 },
  { period: "Feb", actual: 62, proyeccion: 60 },
  { period: "Mar", actual: 55, proyeccion: 60 },
  { period: "Abr", actual: 61, proyeccion: 60 },
  { period: "May", actual: 59, proyeccion: 60 },
  { period: "Jun", actual: 64, proyeccion: 60 },
  { period: "Jul", actual: 57, proyeccion: 60 },
  { period: "Ago", actual: 63, proyeccion: 60 },
  { period: "Sep", actual: 60, proyeccion: 60 },
  { period: "Oct", actual: 58, proyeccion: 60 },
  { period: "Nov", actual: 62, proyeccion: 60 },
  { period: "Dic", actual: 57.6, proyeccion: 60 },
]

export function ServiceLevelChart() {
  const [selectedRange, setSelectedRange] = useState("Mes")
  const [selectedIndicator, setSelectedIndicator] = useState("ns")

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg font-semibold">Tendencia de Indicadores</CardTitle>
          <div className="flex items-center gap-3">
            {/* Time Range Selector */}
            <div className="flex bg-muted rounded-lg p-1">
              {timeRanges.map((range) => (
                <Button
                  key={range}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-xs px-3 py-1 rounded-md",
                    selectedRange === range
                      ? "bg-white shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setSelectedRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>

            {/* Indicator Selector */}
            <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {indicatorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                domain={[50, 70]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number) => [`${value}%`, ""]}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Real"
                stroke="#0F0F72"
                strokeWidth={2}
                dot={{ fill: "#0F0F72", strokeWidth: 0, r: 4 }}
                activeDot={{ fill: "#0F0F72", strokeWidth: 0, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="proyeccion"
                name="Proyección"
                stroke="#04B4FD"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with detailed info */}
        <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0F0F72]" />
            <span className="text-sm text-muted-foreground">
              Valor Real ({indicatorOptions.find((i) => i.value === selectedIndicator)?.label})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-[#04B4FD]" style={{ borderTop: "2px dashed #04B4FD" }} />
            <span className="text-sm text-muted-foreground">Proyección / Meta</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
