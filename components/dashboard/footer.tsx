"use client";

import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";

export function DashboardFooter() {
  return (
    <footer className="bg-card border-t py-1.5 px-3 mx-3 mb-2 rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg text-muted-foreground">
            Filtros activos:
          </span>
          <Badge variant="outline" className="text-[10px] text-muted-foreground">
            Consolidado Mes
          </Badge>
        </div>
      </div>
    </footer>
  );
}
