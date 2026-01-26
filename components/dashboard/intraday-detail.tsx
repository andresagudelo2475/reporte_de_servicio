"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { MapPin, MoreHorizontal, ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface IntradayData {
  hora: string
  forecast: string
  forecastTrend: "up" | "down"
  real: string
  desvio: number
  capacidad: number
  riesgo: "Alto" | "Bajo"
  accionSugerida: string
}

const intradayData: IntradayData[] = [
  {
    hora: "07:00",
    forecast: "-",
    forecastTrend: "down",
    real: "25%",
    desvio: -85,
    capacidad: 85,
    riesgo: "Alto",
    accionSugerida: "Mover 3 agentes\n3 agentes",
  },
  {
    hora: "08:00",
    forecast: "-",
    forecastTrend: "down",
    real: "+4%",
    desvio: -78,
    capacidad: 78,
    riesgo: "Bajo",
    accionSugerida: "Activar overtime\n30 min",
  },
  {
    hora: "09:00",
    forecast: "-",
    forecastTrend: "down",
    real: "+35%",
    desvio: 57,
    capacidad: 57,
    riesgo: "Alto",
    accionSugerida: "Solicitar 2 agentes\n2extra",
  },
  {
    hora: "10:00",
    forecast: "-",
    forecastTrend: "down",
    real: "-20%",
    desvio: 5724,
    capacidad: 82,
    riesgo: "Alto",
    accionSugerida: "Solicitar 2 agentes\n2extra",
  },
  {
    hora: "11:00",
    forecast: "-",
    forecastTrend: "down",
    real: "-26%",
    desvio: 553,
    capacidad: 76,
    riesgo: "Bajo",
    accionSugerida: "Activar 2 agentes\n30 min",
  },
  {
    hora: "14:00",
    forecast: "-",
    forecastTrend: "down",
    real: "-23%",
    desvio: 579,
    capacidad: 84,
    riesgo: "Bajo",
    accionSugerida: "Solicitar 2 agentes",
  },
]

function RiskBadge({ risk }: { risk: "Alto" | "Bajo" }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "font-normal",
        risk === "Alto" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
      )}
    >
      {risk}
    </Badge>
  )
}

export function IntradayDetail() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
              <MapPin className="h-3 w-3 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold">Detalle PCRC - Intradía</CardTitle>
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-semibold text-xs">Hora</TableHead>
              <TableHead className="font-semibold text-xs">Forecast</TableHead>
              <TableHead className="font-semibold text-xs">Real</TableHead>
              <TableHead className="font-semibold text-xs">Desvío</TableHead>
              <TableHead className="font-semibold text-xs">Capacidad</TableHead>
              <TableHead className="font-semibold text-xs">Riesgo</TableHead>
              <TableHead className="font-semibold text-xs">Acción sugerida</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {intradayData.map((row, index) => (
              <TableRow key={index} className="hover:bg-muted/20">
                <TableCell className="font-medium text-sm">{row.hora}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {row.forecastTrend === "down" ? (
                      <ArrowDown className="h-3 w-3 text-red-500" />
                    ) : (
                      <ArrowUp className="h-3 w-3 text-green-500" />
                    )}
                    <span className="text-sm">{row.real}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={50} className="h-1.5 w-10" />
                    <Progress value={30} className="h-1.5 w-6" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded bg-green-100 flex items-center justify-center">
                      <span className="text-[8px] text-green-700">⬇</span>
                    </div>
                    <span className="text-sm">{row.capacidad}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Progress value={row.capacidad} className="h-1.5 w-14" />
                  </div>
                </TableCell>
                <TableCell>
                  <RiskBadge risk={row.riesgo} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-auto py-1 px-2 text-[10px] whitespace-pre-line text-left leading-tight bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                  >
                    {row.accionSugerida}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
