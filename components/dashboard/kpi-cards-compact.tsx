"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPIData {
  id: string;
  title: string;
  value: string;
  unit?: string;
  change: number;
  changeLabel: string;
  target: number;
  status: "success" | "warning" | "danger";
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
    title: "Ocupación Monitoreo",
    value: "76",
    unit: "%",
    change: 1.41,
    changeLabel: "+1.41s",
    target: 75,
    status: "success",
    gauge: 76,
  },
];

function GaugeChartMini({ value, status }: { value: number; status: string }) {
  const colorClass =
    status === "success"
      ? "#0DCA61"
      : status === "warning"
      ? "#FD6221"
      : "#DB1F51";

  return (
    <div className="relative w-16 h-10">
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

function StatusBadge({ status }: { status: "success" | "warning" | "danger" }) {
  const config = {
    success: { label: "Cumple", className: "bg-green-100 text-green-700" },
    warning: { label: "Moderado", className: "bg-yellow-100 text-yellow-700" },
    danger: { label: "Crítico", className: "bg-red-100 text-red-700" },
  };

  return (
    <Badge
      variant="secondary"
      className={cn("text-[10px] px-1.5 py-0", config[status].className)}
    >
      {config[status].label}
    </Badge>
  );
}

export function KPICardsCompact() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {kpiData.map((kpi) => (
        <Card key={kpi.id} className="border-0 shadow-sm bg-card">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">
                {kpi.title}
              </span>
              <Badge
                variant="secondary"
                className={cn(
                  "text-[10px] px-1.5 py-0",
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
                  <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                ) : (
                  <TrendingDown className="h-2.5 w-2.5 mr-0.5" />
                )}
                {kpi.changeLabel}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              {kpi.gauge && (
                <GaugeChartMini value={kpi.gauge} status={kpi.status} />
              )}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-bold text-foreground">
                    {kpi.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {kpi.unit}
                  </span>
                </div>
                <StatusBadge status={kpi.status} />
              </div>
              {!kpi.gauge && (
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={cn(
                        "h-1.5 rounded-full",
                        kpi.status === "success"
                          ? "bg-green-500"
                          : kpi.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      )}
                      style={{
                        width: `${Math.min(
                          (Number(kpi.value) / kpi.target) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    Meta: {kpi.target}
                    {kpi.unit}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
