"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const ahtEntradaData = [
  { name: "Conversación", value: 91, target: 70, color: "#0F0F72" },
  { name: "Hold", value: 22, target: 20, color: "#04B4FD" },
  { name: "Post-Llamada", value: 72, target: 50, color: "#A6B7FF" },
]

function ProgressBar({
  label,
  value,
  target,
}: {
  label: string
  value: number
  target: number
}) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-[9px]">
        <span className="text-muted-foreground">{label}</span>
        <div className="flex items-center gap-1">
          <span className="font-medium">{value}%</span>
          <span className="text-muted-foreground">({target}%)</span>
        </div>
      </div>
      <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-[#0F0F72] rounded-full"
          style={{ width: `${value}%` }}
        />
        <div
          className="absolute h-full w-0.5 bg-gray-400"
          style={{ left: `${target}%` }}
        />
      </div>
    </div>
  )
}

export function AHTDistributionCompact() {
  return (
    <Card className="border-0 shadow-sm bg-card h-full flex flex-col">
      <CardHeader className="pb-0.5 pt-2 px-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-semibold">Distribución del AHT</CardTitle>
          <Badge variant="outline" className="text-[8px] px-1 h-4">
            1.3% vs Benchmark
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-2 pt-1 flex flex-col justify-between min-h-0">
        {/* AHT Entrada */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-medium">AHT Entrada</span>
            <span className="text-sm font-bold">578s</span>
          </div>
          <div className="space-y-1.5">
            {ahtEntradaData.map((item) => (
              <ProgressBar
                key={item.name}
                label={item.name}
                value={item.value}
                target={item.target}
              />
            ))}
          </div>
          <div className="flex items-center justify-end mt-1">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-medium">578s</span>
            </div>
          </div>
        </div>

        {/* AHT Salida */}
        <div className="pt-1.5 border-t mt-1.5">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-medium">AHT Salida</span>
          </div>
          <div className="h-3.5 bg-gradient-to-r from-[#0F0F72] via-[#04B4FD] to-[#09BFB0] rounded-full relative">
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[8px] text-white font-medium">
              578s
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
