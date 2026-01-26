"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
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

interface KPIData {
  id: string
  title: string
  value: string
  unit?: string
  change: number
  changeLabel: string
  target: number
  status: "success" | "warning" | "danger"
  gauge?: number
}

const kpiData: KPIData[] = [
  {
    id: "ns",
    title: "Nivel de Servicio",
    value: "57.6",
    unit: "%",
    change: -2.4,
    changeLabel: "vs meta",
    target: 60,
    status: "warning",
    gauge: 57.6,
  },
  {
    id: "asa",
    title: "ASA",
    value: "52",
    unit: "s",
    change: 12,
    changeLabel: "+12%",
    target: 45,
    status: "warning",
  },
  {
    id: "aht",
    title: "AHT",
    value: "543",
    unit: "s",
    change: 23,
    changeLabel: "+23%",
    target: 520,
    status: "warning",
  },
  {
    id: "ocupacion",
    title: "Ocupación",
    value: "76",
    unit: "%",
    change: 1.41,
    changeLabel: "+1.41s",
    target: 75,
    status: "success",
    gauge: 76,
  },
  {
    id: "entrantes",
    title: "Entrantes",
    value: "1,541",
    unit: "",
    change: 1.6,
    changeLabel: "+1.6%",
    target: 1500,
    status: "success",
  },
  {
    id: "contestadas",
    title: "Contestadas",
    value: "1,376",
    unit: "",
    change: -1.2,
    changeLabel: "-1.2%",
    target: 1400,
    status: "warning",
  },
  {
    id: "umbral",
    title: "Umbral",
    value: "723",
    unit: "",
    change: 47,
    changeLabel: "+47%",
    target: 500,
    status: "danger",
  },
  {
    id: "abandonadas",
    title: "Abandonadas",
    value: "195",
    unit: "",
    change: 3.0,
    changeLabel: "+3.0%",
    target: 150,
    status: "danger",
  },
]

const volumetryData = [
  { time: "0:00", forecast: 2500, capacity: 2800 },
  { time: "3:00", forecast: 2600, capacity: 2850 },
  { time: "6:00", forecast: 3200, capacity: 3500 },
  { time: "9:00", forecast: 4200, capacity: 4500 },
  { time: "12:00", forecast: 5800, capacity: 6000 },
  { time: "15:00", forecast: 4800, capacity: 5200 },
  { time: "18:00", forecast: 3500, capacity: 3800 },
  { time: "21:00", forecast: 2500, capacity: 2800 },
]

function GaugeChartMini({ value, status }: { value: number; status: string }) {
  const colorClass = status === "success" ? "#0DCA61" : status === "warning" ? "#FD6221" : "#DB1F51"

  return (
    <div className="relative w-10 h-6">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke={colorClass}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * 126} 126`}
        />
      </svg>
    </div>
  )
}

function StatusDot({ status }: { status: "success" | "warning" | "danger" }) {
  const colorClass = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  }

  return <div className={cn("w-1.5 h-1.5 rounded-full", colorClass[status])} />
}

export function ServiceSummary() {
  return (
    <Card className="border-0 shadow-sm bg-card">
      <CardContent className="p-3">
        <div className="flex gap-3">
          {/* KPI Cards Grid - 8 indicators in 2 rows of 4 */}
          <div className="flex-1">
            <h3 className="text-xs font-semibold mb-2 text-muted-foreground">Resumen del Servicio</h3>
            <div className="grid grid-cols-4 gap-2">
              {kpiData.map((kpi) => (
                <div
                  key={kpi.id}
                  className="p-2 bg-muted/30 rounded-md border border-border/50"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] text-muted-foreground truncate">{kpi.title}</span>
                    <StatusDot status={kpi.status} />
                  </div>
                  <div className="flex items-center gap-1">
                    {kpi.gauge && <GaugeChartMini value={kpi.gauge} status={kpi.status} />}
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-base font-bold text-foreground">{kpi.value}</span>
                      <span className="text-[9px] text-muted-foreground">{kpi.unit}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[8px] px-1 py-0 h-3.5",
                        kpi.change > 0
                          ? kpi.status === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      )}
                    >
                      {kpi.change > 0 ? (
                        <TrendingUp className="h-2 w-2 mr-0.5" />
                      ) : (
                        <TrendingDown className="h-2 w-2 mr-0.5" />
                      )}
                      {kpi.changeLabel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volumetry Chart */}
          <div className="w-[280px] border-l pl-3">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-semibold text-muted-foreground">Volumetría</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0F0F72]" />
                  <span className="text-[8px] text-muted-foreground">Forecast</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#04B4FD]" />
                  <span className="text-[8px] text-muted-foreground">Capacity</span>
                </div>
              </div>
            </div>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumetryData} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                  <defs>
                    <linearGradient id="colorForecastMini" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F0F72" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0F0F72" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCapacityMini" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#04B4FD" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#04B4FD" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 7, fill: "#6B7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 7, fill: "#6B7280" }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5E7EB",
                      borderRadius: "4px",
                      fontSize: "9px",
                      padding: "4px 8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke="#0F0F72"
                    strokeWidth={1.5}
                    fill="url(#colorForecastMini)"
                  />
                  <Area
                    type="monotone"
                    dataKey="capacity"
                    stroke="#04B4FD"
                    strokeWidth={1.5}
                    fill="url(#colorCapacityMini)"
                    strokeDasharray="4 4"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
