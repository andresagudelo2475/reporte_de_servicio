"use client";

import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Phone,
  Users,
  Activity,
  CheckCircle,
  Headphones,
  List,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface KPIData {
  id: string;
  title: string;
  value: string;
  unit?: string;
  change: number;
  changeLabel: string;
  target: number;
  status: "success" | "warning" | "danger";
  icon: React.ReactNode;
  details?: { label: string; value: string }[];
  hasGauge?: boolean;
  gauge?: number;
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
      { label: "No Listo", value: "72% (50%)" },
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
      { label: "Conversación", value: "91% (70%)" },
      { label: "Hold", value: "22% (20%)" },
      { label: "No Listo", value: "72% (50%)" },
    ],
  },
  {
    id: "aht",
    title: "AHT Total",
    value: "543",
    unit: "s",
    change: 23,
    changeLabel: "+23%",
    target: 520,
    status: "warning",
    icon: <Phone className="h-5 w-5" />,
    details: [
      { label: "Conversación", value: "91% (70%)" },
      { label: "Hold", value: "22% (20%)" },
      { label: "No Listo", value: "72% (50%)" },
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
  {
    id: "ocupacion",
    title: "Ocupación",
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
];

function MiniGauge({ value, status }: { value: number; status: string }) {
  const colorClass =
    status === "success"
      ? "#0DCA61"
      : status === "warning"
      ? "#FD6221"
      : "#DB1F51";

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
  );
}

function StatusDot({ status }: { status: "success" | "warning" | "danger" }) {
  const colors = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };
  return <div className={cn("w-2 h-2 rounded-full", colors[status])} />;
}

export function KPIRow() {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">
            Resumen del Servicio
          </h3>
        </div>
        <div className="grid grid-cols-8 gap-2">
          {kpiData.map((kpi) => (
            <Dialog key={kpi.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer hover:bg-muted/50 rounded-md p-2 transition-colors border border-border/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm  font-semibold text-muted-foreground truncate ">
                      {kpi.title}
                    </span>
                    <StatusDot status={kpi.status} />
                  </div>

                  {kpi.hasGauge ? (
                    <div className="flex items-center gap-1">
                      <MiniGauge
                        value={Number(kpi.value)}
                        status={kpi.status}
                                              />
                      <div>
                        <div className="flex items-baseline">
                          <span className="text-lg font-bold">{kpi.value}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {kpi.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-lg font-bold">{kpi.value}</span>
                        {kpi.unit && (
                          <span className="text-[10px] text-muted-foreground">
                            {kpi.unit}
                          </span>
                        )}
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
                      <p className="text-xs text-muted-foreground">
                        Valor Actual
                      </p>
                      <p className="text-xl font-bold">
                        {kpi.value}
                        {kpi.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Meta</p>
                      <p className="text-base font-semibold">
                        {kpi.target}
                        {kpi.unit}
                      </p>
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
                          <span className="text-xs text-muted-foreground">
                            {detail.label}
                          </span>
                          <span className="text-xs font-medium">
                            {detail.value}
                          </span>
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
  );
}
