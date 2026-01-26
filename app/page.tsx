"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { AlertBanner } from "@/components/dashboard/alert-banner"
import { KPIRow } from "@/components/dashboard/kpi-row"
import { OperationalHealth } from "@/components/dashboard/operational-health"
import { AHTDistributionCompact } from "@/components/dashboard/aht-distribution-compact"
import { PredictiveChartCompact } from "@/components/dashboard/predictive-chart-compact"
import { AIRecommendationsCompact } from "@/components/dashboard/ai-recommendations-compact"
import { DetailTables } from "@/components/dashboard/detail-tables"
import { DashboardFooter } from "@/components/dashboard/footer"

type ViewType = "dashboard" | "detail"
type TableType =
  | "consolidado_mes"
  | "intradia_consolidado"
  | "intradia_individual"
  | "evolutivo"
  | "consolidado_individual"

export default function ReporteServicio() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard")
  const [activeTable, setActiveTable] = useState<TableType>("consolidado_mes")

  return (
    <div className="h-screen flex flex-col bg-[#F2F0EB] overflow-hidden">
      {/* Header */}
      <DashboardHeader activeView={activeView} onViewChange={setActiveView} />

      {/* Alert Banner */}
      <AlertBanner />

      {/* Main Content - No scroll */}
      <main className="flex-1 px-3 py-2 overflow-hidden">
        {activeView === "dashboard" ? (
          <div className="h-full flex flex-col gap-2">
            {/* Row 1: 8 KPIs in a single row */}
            <KPIRow />

            {/* Row 2: Salud Operativa (60%) + AHT Distribution (40%) */}
            <div className="flex-1 grid grid-cols-5 gap-2 min-h-0">
              <div className="col-span-3">
                <OperationalHealth />
              </div>
              <div className="col-span-2">
                <AHTDistributionCompact />
              </div>
            </div>

            {/* Row 3: Predictive + AI Recommendations */}
            <div className="flex-1 grid grid-cols-2 gap-2 min-h-0">
              <PredictiveChartCompact />
              <AIRecommendationsCompact />
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <DetailTables activeTable={activeTable} onTableChange={setActiveTable} />
          </div>
        )}
      </main>

      {/* Footer */}
      <DashboardFooter />
    </div>
  )
}
