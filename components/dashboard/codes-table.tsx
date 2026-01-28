"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Info,
  Filter,
  Search,
  MoreHorizontal,
  Phone,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CodeData {
  prioridad: "Alta" | "Media" | "Baja";
  codigo1: string;
  codigo2: string;
  motivo: string;
  participacion: number;
  volumen: number;
  volumenChange: string;
  aht: string;
  ahtChange?: string;
  impactoNs: number;
  impactoNsLabel: string;
  estado: "Crítico" | "Riesgo" | "Baja";
  accion: string;
}

const codesData: CodeData[] = [
  {
    prioridad: "Alta",
    codigo1: "011",
    codigo2: "011",
    motivo: "Pasarela PSE",
    participacion: 42,
    volumen: 536,
    volumenChange: "328s",
    aht: "533s",
    impactoNs: 45,
    impactoNsLabel: "+.9 pts",
    estado: "Crítico",
    accion: "Penuss",
  },
  {
    prioridad: "Alta",
    codigo1: "011",
    codigo2: "377",
    motivo: "Liquidación Administradora",
    participacion: 81,
    volumen: 370,
    volumenChange: "398s",
    aht: "520s",
    ahtChange: "-6%",
    impactoNs: 60,
    impactoNsLabel: "871s",
    estado: "Riesgo",
    accion: "Radder",
  },
  {
    prioridad: "Media",
    codigo1: "013",
    codigo2: "013",
    motivo: "Actualizar Datos",
    participacion: 47,
    volumen: 363,
    volumenChange: "726s",
    aht: "525s",
    ahtChange: "+2.41s",
    impactoNs: 35,
    impactoNsLabel: "+2.41s",
    estado: "Riesgo",
    accion: "Tafoiar",
  },
  {
    prioridad: "Alta",
    codigo1: "014",
    codigo2: "014",
    motivo: "Rechazada",
    participacion: 51,
    volumen: 304,
    volumenChange: "558s",
    aht: "458s",
    ahtChange: "+518s",
    impactoNs: 25,
    impactoNsLabel: "+518s",
    estado: "Baja",
    accion: "Becider",
  },
  {
    prioridad: "Baja",
    codigo1: "308",
    codigo2: "308",
    motivo: "Reconificación",
    participacion: 32,
    volumen: 323,
    volumenChange: "178s",
    aht: "444s",
    ahtChange: "+59%",
    impactoNs: 40,
    impactoNsLabel: "+59%",
    estado: "Baja",
    accion: "Becider",
  },
  {
    prioridad: "Baja",
    codigo1: "012",
    codigo2: "012",
    motivo: "Tarjeta de Crédito",
    participacion: 48,
    volumen: 334,
    volumenChange: "553s",
    aht: "442s",
    ahtChange: "+29%",
    impactoNs: 30,
    impactoNsLabel: "+29%",
    estado: "Baja",
    accion: "Becider",
  },
  {
    prioridad: "Baja",
    codigo1: "013",
    codigo2: "004",
    motivo: "Pasarela PSE Conexión Directa",
    participacion: 30,
    volumen: 310,
    volumenChange: "733s",
    aht: "442s",
    ahtChange: "+53%",
    impactoNs: 28,
    impactoNsLabel: "+53%",
    estado: "Baja",
    accion: "Becider",
  },
  {
    prioridad: "Baja",
    codigo1: "027",
    codigo2: "027",
    motivo: "Portales",
    participacion: 45,
    volumen: 339,
    volumenChange: "572s",
    aht: "580s",
    ahtChange: "+51%",
    impactoNs: 35,
    impactoNsLabel: "+51%",
    estado: "Baja",
    accion: "Becider",
  },
];

function PriorityBadge({ priority }: { priority: "Alta" | "Media" | "Baja" }) {
  const config = {
    Alta: {
      icon: <AlertCircle className="h-3 w-3" />,
      className: "bg-red-100 text-red-700 border-red-200",
    },
    Media: {
      icon: <AlertTriangle className="h-3 w-3" />,
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    Baja: {
      icon: <CheckCircle className="h-3 w-3" />,
      className: "bg-green-100 text-green-700 border-green-200",
    },
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-1 font-normal",
        config[priority].className
      )}
    >
      {config[priority].icon}
      {priority}
    </Badge>
  );
}

function StatusBadge({ status }: { status: "Crítico" | "Riesgo" | "Baja" }) {
  const config = {
    Crítico: "bg-red-100 text-red-700",
    Riesgo: "bg-yellow-100 text-yellow-700",
    Baja: "bg-green-100 text-green-700",
  };

  return (
    <Badge variant="secondary" className={cn("font-normal", config[status])}>
      {status}
    </Badge>
  );
}

export function CodesTable() {
  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-lg font-semibold">
              Códigos más representativos
            </CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8">
              <Search className="h-3 w-3 mr-1" />
              Buscar...
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold">Prioridad</TableHead>
                <TableHead className="font-semibold">Código</TableHead>
                <TableHead className="font-semibold">
                  Motivo / Descripción
                </TableHead>
                <TableHead className="font-semibold">% Participación</TableHead>
                <TableHead className="font-semibold">Volumen</TableHead>
                <TableHead className="font-semibold">AHT</TableHead>
                <TableHead className="font-semibold">Impacto en NS</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codesData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/20">
                  <TableCell>
                    <PriorityBadge priority={row.prioridad} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground font-mono">
                        {row.codigo1}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{row.motivo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Progress
                        value={row.participacion}
                        className="h-2 flex-1"
                      />
                      <span className="text-sm text-muted-foreground">
                        {row.participacion}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{row.volumen}</span>
                      <span className="text-xs text-green-600">↑</span>
                      <span className="text-xs text-muted-foreground">
                        {row.volumenChange}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{row.aht}</span>
                      {row.ahtChange && (
                        <span className="text-xs text-muted-foreground">
                          {row.ahtChange}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0F0F72] to-[#04B4FD] rounded-full"
                          style={{ width: `${row.impactoNs}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {row.impactoNsLabel}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={row.estado} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
