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
import { Progress } from "@/components/ui/progress";
import { Plus, List, Grid3X3 } from "lucide-react";

interface DayData {
  dia: string;
  entrantes: string;
  atendidas: number;
  abandonadas: number;
  ns: string;
  asa: string;
  aht: string;
}

const dayData: DayData[] = [
  {
    dia: "Lunes",
    entrantes: "1541",
    atendidas: 39,
    abandonadas: 529,
    ns: "572s",
    asa: "-250s",
    aht: "-250s",
  },
  {
    dia: "Martes",
    entrantes: "1322",
    atendidas: 68,
    abandonadas: 76,
    ns: "573s",
    asa: "+530s",
    aht: "+530s",
  },
  {
    dia: "Miércoles",
    entrantes: "1620",
    atendidas: 58,
    abandonadas: 57,
    ns: "538s",
    asa: "+443s",
    aht: "+443s",
  },
  {
    dia: "Jueves",
    entrantes: "1450",
    atendidas: 58,
    abandonadas: 59,
    ns: "544s",
    asa: "+512s",
    aht: "+512s",
  },
  {
    dia: "Viernes",
    entrantes: "1710",
    atendidas: 88,
    abandonadas: 50,
    ns: "453s",
    asa: "+543s",
    aht: "+543s",
  },
  {
    dia: "Domingo",
    entrantes: "1200",
    atendidas: 59,
    abandonadas: 43,
    ns: "573s",
    asa: "+542s",
    aht: "+542s",
  },
];

export function DayInfoTable() {
  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
              <List className="h-3 w-3 text-primary" />
            </div>
            <CardTitle className="text-lg font-semibold">
              Información por tipo día
            </CardTitle>
          </div>
          {/* <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Plus className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <List className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Grid3X3 className="h-3 w-3" />
            </Button>
          </div> */}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-semibold text-xs text-center">Día</TableHead>
              <TableHead className="font-semibold text-xs text-center">Entrantes</TableHead>
              <TableHead className="font-semibold text-xs text-center">Atendidas</TableHead>
              <TableHead className="font-semibold text-xs text-center">
                Abandonadas
              </TableHead>
              <TableHead className="font-semibold text-xs text-center">NS</TableHead>
              <TableHead className="font-semibold text-xs text-center">ASA</TableHead>
              <TableHead className="font-semibold text-xs text-center">AHT Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dayData.map((row, index) => (
              <TableRow key={index} className="hover:bg-muted/20">
                <TableCell className="font-medium text-sm text-center">{row.dia}</TableCell>
                <TableCell className="text-sm text-center">{row.entrantes}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-center">
                    <Progress value={row.atendidas} className="h-1.5 w-12" />
                    <span className="text-xs text-muted-foreground text-center">
                      {row.atendidas}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className= "text-center">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      row.abandonadas > 55
                        ? "bg-red-100 text-red-700"
                        : row.abandonadas > 50
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {row.abandonadas}%
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-sm text-center">
                  {row.ns}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground text-center">
                  {row.asa}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground text-center">
                  {row.aht}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
