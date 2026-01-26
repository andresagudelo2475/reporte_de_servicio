"use client"

import { AlertTriangle, Settings, MessageCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AlertBanner() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-md px-3 py-1.5 mx-3 mt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <span className="font-medium text-yellow-800 text-xs">Estado actual del servicio:</span>
          <span className="text-yellow-700 text-xs">Riesgo moderado (ASA +12%)</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-yellow-700 hover:bg-yellow-100">
            <Settings className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-yellow-700 hover:bg-yellow-100">
            <MessageCircle className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-yellow-700 hover:bg-yellow-100">
            <Info className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
