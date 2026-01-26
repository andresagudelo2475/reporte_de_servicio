"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Phone, Users, Activity } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface KPIData {
  id: string
  title: string
  value: string
  unit?: string
  change: number
  changeLabel: string
  target: number
  status: "success" | "warning" | "danger"
  icon: React.ReactNode
  details?: { label: string; value: string }[]
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
    icon: <Activity className="h-5 w-5" />,
    gauge: 57.6,
    details: [
      { label: "Llamadas Entrantes", value: "1,541" },
      { label: "Contestadas en Umbral", value: "887" },
      { label: "Llamadas Contestadas", value: "1,376" },
      { label: "Llamadas Abandonadas", value: "165" },
      { label: "% de Abandono", value: "10.7%" },
    ],
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
    icon: <Clock className="h-5 w-5" />,
    details: [
      { label: "Fuera del SLA", value: "45s" },
      { label: "Promedio actual", value: "52s" },
      { label: "Tendencia", value: "+7s" },
    ],
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
    icon: <Phone className="h-5 w-5" />,
    details: [
      { label: "Rango objetivo", value: "520s - 560s" },
      { label: "Redesando", value: "+520s" },
      { label: "Período", value: "(4.4.43) - 2220" },
    ],
  },
  {
    id: "ocupacion",
    title: "Ocupación Monitoreo",
    value: "76",
    unit: "%",
    change: 1.41,
    changeLabel: "+1.41s",
    target: 75,
    status: "success",
    icon: <Users className="h-5 w-5" />,
    gauge: 76,
    details: [
      { label: "Horas Disponibles", value: "480h" },
      { label: "Horas ACD", value: "365h" },
      { label: "Estado", value: "Alta" },
    ],
  },
  {
    id: "eficiencia",
    title: "Nivel de Eficiencia",
    value: "89.3",
    unit: "%",
    change: 2.1,
    changeLabel: "+2.1%",
    target: 85,
    status: "success",
    icon: <CheckCircle className="h-5 w-5" />,
    details: [
      { label: "Llamadas Entrantes", value: "1,541" },
      { label: "Llamadas Contestadas", value: "1,376" },
    ],
  },
  {
    id: "aht_entrada",
    title: "AHT Entrada",
    value: "578",
    unit: "s",
    change: -1.3,
    changeLabel: "-1.3%",
    target: 580,
    status: "success",
    icon: <Phone className="h-5 w-5" />,
    details: [
      { label: "Conversación", value: "91% (70%)" },
      { label: "Hold", value: "22% (20%)" },
      { label: "Post-Llamada", value: "72% (50%)" },
    ],
  },
  {
    id: "aht_salida",
    title: "AHT Salida",
    value: "578",
    unit: "s",
    change: 0.5,
    changeLabel: "+0.5%",
    target: 575,
    status: "success",
    icon: <Phone className="h-5 w-5" />,
    details: [
      { label: "Conversación salida", value: "320s" },
      { label: "Hold salida", value: "45s" },
      { label: "No listo salida", value: "213s" },
    ],
  },
  {
    id: "ata",
    title: "ATA",
    value: "12",
    unit: "s",
    change: -2,
    changeLabel: "-2s",
    target: 15,
    status: "success",
    icon: <Clock className="h-5 w-5" />,
  },
]

function GaugeChart({ value, status }: { value: number; status: string }) {
  const angle = (value / 100) * 180
  const colorClass = status === "success" ? "#0DCA61" : status === "warning" ? "#FD6221" : "#DB1F51"

  return (
    <div className="relative w-24 h-14 mx-auto">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke={colorClass}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * 126} 126`}
        />
      </svg>
    </div>
  )
}

function StatusBadge({ status }: { status: "success" | "warning" | "danger" }) {
  const config = {
    success: { label: "Cumple", className: "bg-green-100 text-green-700" },
    warning: { label: "Moderado", className: "bg-yellow-100 text-yellow-700" },
    danger: { label: "Crítico", className: "bg-red-100 text-red-700" },
  }

  return (
    <Badge variant="secondary" className={cn("text-xs", config[status].className)}>
      {config[status].label}
    </Badge>
  )
}

export function KPICards() {
  const [selectedKPI, setSelectedKPI] = useState<KPIData | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.slice(0, 4).map((kpi) => (
        <Dialog key={kpi.id}>
          <DialogTrigger asChild>
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-sm"
              onClick={() => setSelectedKPI(kpi)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs",
                        kpi.change > 0
                          ? kpi.status === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                          : kpi.status === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      )}
                    >
                      {kpi.change > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {kpi.changeLabel}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    {kpi.gauge ? (
                      <div className="flex flex-col items-start">
                        <GaugeChart value={kpi.gauge} status={kpi.status} />
                        <div className="flex items-baseline mt-1">
                          <span className="text-3xl font-bold text-foreground">{kpi.value}</span>
                          <span className="text-lg text-muted-foreground">{kpi.unit}</span>
                        </div>
                        <StatusBadge status={kpi.status} />
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-foreground">{kpi.value}</span>
                          <span className="text-lg text-muted-foreground">{kpi.unit}</span>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={cn(
                              "h-2 rounded-full",
                              kpi.status === "success"
                                ? "bg-green-500"
                                : kpi.status === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            )}
                            style={{ width: `${Math.min((Number(kpi.value) / kpi.target) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                          <span>Meta: {kpi.target}{kpi.unit}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {kpi.icon}
                {kpi.title}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Actual</p>
                  <p className="text-2xl font-bold">
                    {kpi.value}{kpi.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Meta</p>
                  <p className="text-lg font-semibold">{kpi.target}{kpi.unit}</p>
                </div>
              </div>
              {kpi.details && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Componentes</p>
                  {kpi.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                    >
                      <span className="text-sm text-muted-foreground">{detail.label}</span>
                      <span className="text-sm font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
