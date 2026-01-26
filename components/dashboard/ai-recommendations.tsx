"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Bot, MoreHorizontal } from "lucide-react"

const recommendations = [
  {
    id: 1,
    title: "Incrementar staffing en +8",
    description: "agentes de 14:00 - 16:00 para evitar ASA > 60s",
    action: "up",
    priority: "high",
  },
  {
    id: 2,
    title: "Reducir ACW en 5%",
    description: "mejora NS +2.1 pts",
    action: "down",
    priority: "medium",
  },
]

export function AIRecommendations() {
  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-lg font-semibold">Recomendaciones del Sistema AI</CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  rec.action === "up"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {rec.action === "up" ? (
                  <ArrowUp className="h-5 w-5" />
                ) : (
                  <ArrowDown className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{rec.title}</p>
                <p className="text-xs text-muted-foreground">{rec.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${
                  rec.action === "up"
                    ? "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                    : "text-green-600 hover:text-green-700 hover:bg-green-100"
                }`}
              >
                {rec.action === "up" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 text-muted-foreground hover:text-foreground"
        >
          Ver más acciones sugeridas
        </Button>
      </CardContent>
    </Card>
  )
}
