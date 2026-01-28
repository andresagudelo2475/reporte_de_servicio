"use client";

import { useState } from "react";
import { AlertBanner } from "@/components/dashboard/alert-banner";
import { DashboardHeader } from "@/components/dashboard/header";
import { KPIRow } from "@/components/dashboard/kpi-row";
import { AHTDistribution } from "@/components/dashboard/aht-distribution";
import { DetailTables } from "@/components/dashboard/detail-tables";
import { DashboardFooter } from "@/components/dashboard/footer";
import { CodesTable } from "@/components/dashboard/codes-table";
import { DayInfoTable } from "@/components/dashboard/day-info-table";
import { IntradayDetail } from "@/components/dashboard/intraday-detail";
import { AIRecommendations } from "@/components/dashboard/ai-recommendations";
import { PredictiveChart } from "@/components/dashboard/predictive-chart";
import { ServiceLevelChart } from "@/components/dashboard/service-level-chart";
import { ChangeView } from "@/components/dashboard/change-view";

type ViewType = "dashboard" | "detail";
type TableType =
  | "consolidado_mes"
  | "intradia_consolidado"
  | "intradia_individual"
  | "evolutivo"
  | "consolidado_individual";

export default function ReporteServicio() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard");
  const [activeTable, setActiveTable] = useState<TableType>("consolidado_mes");

  return (
    <div className="h-screen flex flex-col bg-[#F2F0EB]">
      {/* Header */}

      <DashboardHeader />
      {/* Alert Banner */}
      <AlertBanner />
      <ChangeView activeView={activeView} onViewChange={setActiveView} />

     
      {/* Main Content - No scroll */}
      <main className="p-4">
        {activeView === "dashboard" ? (
          <div className="h-full flex flex-col gap-2">
            {/* Row 1: 8 KPIs in a single row */}

            <KPIRow />

            {/* Row 2: Salud Operativa (60%) + AHT Distribution (40%) */}
            <div className="flex-1 grid grid-cols-9 gap-2">
              <div className="col-span-4">
                <ServiceLevelChart />
              </div>
              <div className="col-span-2">
                <AHTDistribution />
              </div>
              <div className="col-span-3">
                <DayInfoTable />
              </div>
            </div>

            {/* Row 3: Predictive + AI Recommendations */}
            <div className="flex-1 grid grid-cols-2 gap-2 min-h-0">
              <PredictiveChart />
              <AIRecommendations />
            </div>

            {/* Section: Códigos más representativos */}
            <div className="flex-1 grid grid-cols-6 gap-2">
              <div className="col-span-4">
                <CodesTable />
              </div>
              {/* Section: Day Info & Intraday Detail */}
              <div className="col-span-2">
                <IntradayDetail />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <DetailTables
              activeTable={activeTable}
              onTableChange={setActiveTable}
            />
          </div>
        )}
      </main>
      {/* Footer */}
      <DashboardFooter />
    </div>
  );
}
