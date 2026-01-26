"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const forecastData = [
  { period: "Lun", actual: 550, accuracy: 94 },
  { period: "Mar", actual: 530, accuracy: 92 },
  { period: "Mie", actual: 560, accuracy: 97 },
  { period: "Jue", actual: 580, accuracy: 98 },
  { period: "Vie", actual: 540, accuracy: 97 },
  { period: "Sab", actual: 520, accuracy: 98 },
  { period: "Dom", actual: 550, accuracy: 98 },
]

const projectionData = {
  asaEsperado: { value: "67s", change: "+15s" },
  backlog: { value: "372", label: "Llamadas", change: "+72" },
  requerimiento: { value: "178", label: "Agentes", change: "+8" },
}

export function PredictiveChartCompact() {
  return (
    <Card className="border-0 shadow-sm bg-card h-full flex flex-col">
      <CardHeader className="pb-0.5 pt-2 px-2">
        <CardTitle className="text-xs font-semibold">Inteligencia Predictiva</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-2 pt-1 min-h-0">
        <div className="grid grid-cols-2 gap-2 h-full">
          {/* Precision Chart */}
          <div className="flex flex-col min-h-0">
            <p className="text-[9px] font-medium mb-0.5">Precisión del Pronóstico</p>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={forecastData} margin={{ top: 2, right: 2, bottom: 0, left: -25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis
                    dataKey="period"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 7, fill: "#6B7280" }}
                  />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 7, fill: "#6B7280" }}
                    domain={[400, 600]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 7, fill: "#6B7280" }}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5E7EB",
                      borderRadius: "4px",
                      fontSize: "9px",
                    }}
                  />
                  <Bar yAxisId="left" dataKey="actual" fill="#0F0F72" radius={[1, 1, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#04B4FD"
                    strokeWidth={1}
                    dot={{ fill: "#04B4FD", strokeWidth: 0, r: 1.5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-[8px] text-muted-foreground">
              <span>Precisión promedio</span>
              <span className="text-green-600 font-medium">96.3%</span>
            </div>
          </div>

          {/* Projection */}
          <div className="flex flex-col">
            <p className="text-[9px] font-medium mb-0.5">Proyección (2-4h)</p>
            <div className="space-y-1.5 flex-1">
              <div className="p-1.5 bg-muted/50 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] text-muted-foreground">ASA Esperado</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold">{projectionData.asaEsperado.value}</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-[7px] px-0.5 h-3.5">
                      {projectionData.asaEsperado.change}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="p-1.5 bg-muted/50 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] text-muted-foreground">Backlog</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold">{projectionData.backlog.value}</span>
                    <span className="text-[7px] text-muted-foreground">{projectionData.backlog.label}</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-[7px] px-0.5 h-3.5">
                      {projectionData.backlog.change}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="p-1.5 bg-muted/50 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] text-muted-foreground">Req. Agentes</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold">{projectionData.requerimiento.value}</span>
                    <span className="text-[7px] text-muted-foreground">{projectionData.requerimiento.label}</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-[7px] px-0.5 h-3.5">
                      {projectionData.requerimiento.change}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
