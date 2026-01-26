"use client"

import React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Clock, Phone, Users, Activity, CheckCircle, Headphones } from "lucide-react"
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
  hasGauge?: boolean
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
    icon: <Activity className="h-4 w-4" />,
    hasGauge: true,
    details: [
      { label: "Llamadas Entrantes", value: "1,541" },
      { label: "Contestadas en Umbral", value: "887" },
      { label: "Llamadas Contestadas", value: "1,376" },
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
    icon: <Clock className="h-4 w-4" />,
    details: [
      { label: "Fuera del SLA", value: "45s" },
      { label: "Promedio actual", value: "52s" },
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
    icon: <Phone className="h-4 w-4" />,
    details: [
      { label: "Rango objetivo", value: "520s - 560s" },
      { label: "Redesando", value: "+520s" },
    ],
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
    icon: <Users className="h-4 w-4" />,
    hasGauge: true,
    details: [
      { label: "Horas Disponibles", value: "480h" },
      { label: "Horas ACD", value: "365h" },
    ],
  },
  {
    id: "entrantes",
    title: "Entrantes",
    value: "1,541",
    change: 1.6,
    changeLabel: "+1.6%",
    target: 1500,
    status: "success",
    icon: <Headphones className="h-4 w-4" />,
  },
  {
    id: "contestadas",
    title: "Contestadas",
    value: "1,376",
    change: -1.2,
    changeLabel: "-1.2%",
    target: 1400,
    status: "warning",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  {
    id: "umbral",
    title: "Umbral",
    value: "723",
    change: 47,
    changeLabel: "+47%",
    target: 500,
    status: "danger",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: "abandonadas",
    title: "Abandonadas",
    value: "195",
    change: 3.0,
    changeLabel: "+3.0%",
    target: 150,
    status: "danger",
    icon: <Phone className="h-4 w-4" />,
  },
]

function MiniGauge({ value, status }: { value: number; status: string }) {
  const colorClass = status === "success" ? "#0DCA61" : status === "warning" ? "#FD6221" : "#DB1F51"

  return (
    <div className="relative w-12 h-7">
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
  const colors = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  }
  return <div className={cn("w-2 h-2 rounded-full", colors[status])} />
}

export function KPIRow() {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-foreground">Resumen del Servicio</h3>
        </div>
        <div className="grid grid-cols-8 gap-2">
          {kpiData.map((kpi) => (
            <Dialog key={kpi.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer hover:bg-muted/50 rounded-md p-2 transition-colors border border-border/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground truncate">{kpi.title}</span>
                    <StatusDot status={kpi.status} />
                  </div>
                  
                  {kpi.hasGauge ? (
                    <div className="flex items-center gap-1">
                      <MiniGauge value={Number(kpi.value)} status={kpi.status} />
                      <div>
                        <div className="flex items-baseline">
                          <span className="text-lg font-bold">{kpi.value}</span>
                          <span className="text-[10px] text-muted-foreground">{kpi.unit}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-lg font-bold">{kpi.value}</span>
                        {kpi.unit && <span className="text-[10px] text-muted-foreground">{kpi.unit}</span>}
                      </div>
                    </div>
                  )}
                  
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-[9px] px-1 py-0 h-4 mt-1",
                      kpi.change > 0
                        ? kpi.status === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                        : kpi.status === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
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
              </DialogTrigger>
              <DialogContent className="sm:max-w-[380px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-base">
                    {kpi.icon}
                    {kpi.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-3 py-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Valor Actual</p>
                      <p className="text-xl font-bold">
                        {kpi.value}{kpi.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Meta</p>
                      <p className="text-base font-semibold">{kpi.target}{kpi.unit}</p>
                    </div>
                  </div>
                  {kpi.details && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium">Componentes</p>
                      {kpi.details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
                        >
                          <span className="text-xs text-muted-foreground">{detail.label}</span>
                          <span className="text-xs font-medium">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
