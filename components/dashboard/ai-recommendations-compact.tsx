"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Bot } from "lucide-react"

const recommendations = [
  {
    id: 1,
    title: "Incrementar staffing +8",
    description: "14:00-16:00, evitar ASA > 60s",
    action: "up",
  },
  {
    id: 2,
    title: "Reducir ACW en 5%",
    description: "mejora NS +2.1 pts",
    action: "down",
  },
  {
    id: 3,
    title: "Redistribuir colas",
    description: "balancear carga grupos",
    action: "up",
  },
]

export function AIRecommendationsCompact() {
  return (
    <Card className="border-0 shadow-sm bg-card h-full flex flex-col">
      <CardHeader className="pb-0.5 pt-2 px-2">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
            <Bot className="h-2.5 w-2.5 text-white" />
          </div>
          <CardTitle className="text-xs font-semibold">Recomendaciones AI</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-2 pt-1 flex flex-col min-h-0">
        <div className="space-y-1.5 flex-1">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center gap-1.5 p-1.5 bg-muted/50 rounded hover:bg-muted transition-colors"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  rec.action === "up"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {rec.action === "up" ? (
                  <ArrowUp className="h-2.5 w-2.5" />
                ) : (
                  <ArrowDown className="h-2.5 w-2.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[9px] truncate">{rec.title}</p>
                <p className="text-[8px] text-muted-foreground truncate">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-1 text-[8px] text-muted-foreground hover:text-foreground h-5"
        >
          Ver más acciones
        </Button>
      </CardContent>
    </Card>
  )
}
