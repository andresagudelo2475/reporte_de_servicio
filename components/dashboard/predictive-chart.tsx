"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  { period: "1. Lune", actual: 550, forecast: 520, accuracy: 94 },
  { period: "2.31s", actual: 530, forecast: 577, accuracy: 92 },
  { period: "3.0s", actual: 560, forecast: 577, accuracy: 97 },
  { period: "5.9s", actual: 580, forecast: 570, accuracy: 98 },
  { period: "7.0s", actual: 540, forecast: 555, accuracy: 97 },
  { period: "5.0s", actual: 520, forecast: 510, accuracy: 98 },
  { period: "7.0o", actual: 550, forecast: 560, accuracy: 98 },
]

const projectionData = {
  asaEsperado: { value: "67s", change: "+15s" },
  backlog: { value: "372", label: "Llamadas", change: "+72" },
  requerimiento: { value: "178", label: "Agentes", change: "+8" },
}

export function PredictiveChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Inteligencia Predictiva</CardTitle>
          <Select defaultValue="iveitern">
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="iveitern">Ivéitern</SelectItem>
              <SelectItem value="dia">Día</SelectItem>
              <SelectItem value="mes">Mes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {/* Precision Chart */}
          <div>
            <p className="text-sm font-medium mb-3">Precisión del Pronóstico</p>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis
                    dataKey="period"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fill: "#6B7280" }}
                  />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fill: "#6B7280" }}
                    domain={[400, 600]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fill: "#6B7280" }}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar yAxisId="left" dataKey="actual" fill="#0F0F72" radius={[4, 4, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#04B4FD"
                    strokeWidth={2}
                    dot={{ fill: "#04B4FD", strokeWidth: 0 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="text-gray-400">◯</span>
                <span>Dervataiodod Imretdovo</span>
              </div>
              <div className="flex items-center gap-2">
                <span>1,2971,974</span>
                <span className="text-green-600">● 95.3%</span>
                <span>97%</span>
              </div>
            </div>
          </div>

          {/* Projection */}
          <div>
            <p className="text-sm font-medium mb-3">Proyección Próxima Ventana (2-4h)</p>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ASA Esperado</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{projectionData.asaEsperado.value}</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      {projectionData.asaEsperado.change}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Backlog</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{projectionData.backlog.value}</span>
                    <span className="text-sm text-muted-foreground">{projectionData.backlog.label}</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {projectionData.backlog.change}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Requerimiento de Agentes</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{projectionData.requerimiento.value}</span>
                    <span className="text-sm text-muted-foreground">{projectionData.requerimiento.label}</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
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
