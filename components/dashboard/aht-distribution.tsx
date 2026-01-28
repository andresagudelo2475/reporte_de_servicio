"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { List } from "lucide-react";

const ahtEntradaData = [
  { name: "Conversación", value: 91, target: 70, color: "#0F0F72" },
  { name: "Hold", value: 22, target: 20, color: "#04B4FD" },
  { name: "No listo", value: 72, target: 50, color: "#A6B7FF" },
];

const ahtSalidaData = [
  { name: "Conversación", value: 65, target: 60, color: "#0F0F72" },
  { name: "Hold", value: 18, target: 20, color: "#04B4FD" },
  { name: "No listo", value: 45, target: 40, color: "#A6B7FF" },
];

function ProgressBar({
  label,
  value,
  target,
}: {
  label: string;
  value: number;
  target: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-medium">{value}%</span>
          <span className="text-xs text-muted-foreground">({target}%)</span>
        </div>
      </div>
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
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
  );
}

export function AHTDistribution() {
  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
            <List className="h-3 w-3 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold">
            Distribución del AHT
          </CardTitle>
          <Select defaultValue="entrada">
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entrada">AHT Entrada</SelectItem>
              <SelectItem value="salida">AHT Salida</SelectItem>
              <SelectItem value="total">AHT Total</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {/* AHT Entrada */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">AHT Entrada</span>
              <span className="text-xl font-bold">578s</span>
            </div>
            <Badge variant="outline" className="text-xs">
              <span className="text-muted-foreground">1.3% vs Meta</span>
            </Badge>
          </div>
          <div className="space-y-4">
            {ahtEntradaData.map((item) => (
              <ProgressBar
                key={item.name}
                label={item.name}
                value={item.value}
                target={item.target}
              />
            ))}
          </div>
          <div className="flex items-center justify-end mt-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium">578s</span>
            </div>
          </div>
        </div>
        {/* AHT Salida */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">AHT Salida</span>
            </div>
          </div>
          <div className="h-8 bg-gradient-to-r from-[#0F0F72] via-[#04B4FD] to-[#09BFB0] rounded-full relative">
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
              578s
            </div>
          </div>
          <div className="flex items-center justify-end mt-2 text-xs text-muted-foreground">
            <span>x Imaxterivado: 9715s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
