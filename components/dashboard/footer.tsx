"use client"

import { Badge } from "@/components/ui/badge"
import { Code } from "lucide-react"

export function DashboardFooter() {
  return (
    <footer className="bg-card border-t py-1.5 px-3 mx-3 mb-2 rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">Filtros activos:</span>
          <Badge variant="outline" className="text-[9px] font-normal h-5">
            Consolidado Mes
          </Badge>
          <button className="text-primary text-[10px] hover:underline flex items-center gap-0.5">
            <Code className="h-2.5 w-2.5" />
            <span>&lt;/&gt;</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-[#0F0F72]" />
            <span className="text-[9px] text-muted-foreground">Primary</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-[#04B4FD]" />
            <span className="text-[9px] text-muted-foreground">Info</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-[#0DCA61]" />
            <span className="text-[9px] text-muted-foreground">Success</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-[#FD6221]" />
            <span className="text-[9px] text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-[#09BFB0]" />
            <span className="text-[9px] text-muted-foreground">Cyan</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
