"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react"

type TableType =
  | "consolidado_mes"
  | "intradia_consolidado"
  | "intradia_individual"
  | "evolutivo"
  | "consolidado_individual"

interface DetailTablesProps {
  activeTable: TableType
  onTableChange: (table: TableType) => void
}

const tableNames = {
  consolidado_mes: "Consolidado Mes",
  intradia_consolidado: "Intradía Consolidado",
  intradia_individual: "Intradía Individual",
  evolutivo: "Evolutivo",
  consolidado_individual: "Consolidado Individual",
}

// Sample data for tables
const consolidadoMesData = [
  {
    fecha: "2026-01-01",
    fecha_hora: "00:00",
    cod_pcrc: "011",
    entrantes: 1541,
    contestadas: 1376,
    abandonadas: 165,
    contestadas_umbral: 887,
    salida: 245,
    entrada: 1541,
    ns: "57.6%",
    eficacia: "89.3%",
    asa: "52s",
    ata: "12s",
    acd: "365h",
    porc_abandono: "10.7%",
    ocupacion: "76%",
    prom_conversacion_in: "420s",
    prom_conversacion_out: "380s",
    no_listo: "45s",
    hold: "32s",
    aht_in: "578s",
    aht_out: "542s",
    aht_total: "560s",
  },
  {
    fecha: "2026-01-02",
    fecha_hora: "00:00",
    cod_pcrc: "012",
    entrantes: 1322,
    contestadas: 1198,
    abandonadas: 124,
    contestadas_umbral: 812,
    salida: 198,
    entrada: 1322,
    ns: "61.4%",
    eficacia: "90.6%",
    asa: "48s",
    ata: "11s",
    acd: "342h",
    porc_abandono: "9.4%",
    ocupacion: "78%",
    prom_conversacion_in: "415s",
    prom_conversacion_out: "375s",
    no_listo: "42s",
    hold: "30s",
    aht_in: "565s",
    aht_out: "535s",
    aht_total: "550s",
  },
  {
    fecha: "2026-01-03",
    fecha_hora: "00:00",
    cod_pcrc: "013",
    entrantes: 1456,
    contestadas: 1312,
    abandonadas: 144,
    contestadas_umbral: 876,
    salida: 223,
    entrada: 1456,
    ns: "60.2%",
    eficacia: "90.1%",
    asa: "50s",
    ata: "10s",
    acd: "358h",
    porc_abandono: "9.9%",
    ocupacion: "77%",
    prom_conversacion_in: "418s",
    prom_conversacion_out: "378s",
    no_listo: "44s",
    hold: "31s",
    aht_in: "572s",
    aht_out: "538s",
    aht_total: "555s",
  },
  {
    fecha: "2026-01-04",
    fecha_hora: "00:00",
    cod_pcrc: "013",
    entrantes: 1456,
    contestadas: 1312,
    abandonadas: 144,
    contestadas_umbral: 876,
    salida: 223,
    entrada: 1456,
    ns: "60.2%",
    eficacia: "90.1%",
    asa: "50s",
    ata: "10s",
    acd: "358h",
    porc_abandono: "9.9%",
    ocupacion: "77%",
    prom_conversacion_in: "418s",
    prom_conversacion_out: "378s",
    no_listo: "44s",
    hold: "31s",
    aht_in: "572s",
    aht_out: "538s",
    aht_total: "555s",
  },
  {
    fecha: "2026-01-05",
    fecha_hora: "00:00",
    cod_pcrc: "013",
    entrantes: 1456,
    contestadas: 1312,
    abandonadas: 144,
    contestadas_umbral: 876,
    salida: 223,
    entrada: 1456,
    ns: "60.2%",
    eficacia: "90.1%",
    asa: "50s",
    ata: "10s",
    acd: "358h",
    porc_abandono: "9.9%",
    ocupacion: "77%",
    prom_conversacion_in: "418s",
    prom_conversacion_out: "378s",
    no_listo: "44s",
    hold: "31s",
    aht_in: "572s",
    aht_out: "538s",
    aht_total: "555s",
  },
  {
    fecha: "2026-01-06",
    fecha_hora: "00:00",
    cod_pcrc: "013",
    entrantes: 1456,
    contestadas: 1312,
    abandonadas: 144,
    contestadas_umbral: 876,
    salida: 223,
    entrada: 1456,
    ns: "60.2%",
    eficacia: "90.1%",
    asa: "50s",
    ata: "10s",
    acd: "358h",
    porc_abandono: "9.9%",
    ocupacion: "77%",
    prom_conversacion_in: "418s",
    prom_conversacion_out: "378s",
    no_listo: "44s",
    hold: "31s",
    aht_in: "572s",
    aht_out: "538s",
    aht_total: "555s",
  },
  {
    fecha: "2024-01-07",
    fecha_hora: "00:00",
    cod_pcrc: "013",
    entrantes: 1456,
    contestadas: 1312,
    abandonadas: 144,
    contestadas_umbral: 876,
    salida: 223,
    entrada: 1456,
    ns: "60.2%",
    eficacia: "90.1%",
    asa: "50s",
    ata: "10s",
    acd: "358h",
    porc_abandono: "9.9%",
    ocupacion: "77%",
    prom_conversacion_in: "418s",
    prom_conversacion_out: "378s",
    no_listo: "44s",
    hold: "31s",
    aht_in: "572s",
    aht_out: "538s",
    aht_total: "555s",
  },
  {
    fecha: "2024-01-08",
    fecha_hora: "00:00",
    cod_pcrc: "013",
    entrantes: 1456,
    contestadas: 1312,
    abandonadas: 144,
    contestadas_umbral: 876,
    salida: 223,
    entrada: 1456,
    ns: "60.2%",
    eficacia: "90.1%",
    asa: "50s",
    ata: "10s",
    acd: "358h",
    porc_abandono: "9.9%",
    ocupacion: "77%",
    prom_conversacion_in: "418s",
    prom_conversacion_out: "378s",
    no_listo: "44s",
    hold: "31s",
    aht_in: "572s",
    aht_out: "538s",
    aht_total: "555s",
  },
  {
    fecha: "2024-01-09",
    fecha_hora: "00:00",
    cod_pcrc: "013",
    entrantes: 1456,
    contestadas: 1312,
    abandonadas: 144,
    contestadas_umbral: 876,
    salida: 223,
    entrada: 1456,
    ns: "60.2%",
    eficacia: "90.1%",
    asa: "50s",
    ata: "10s",
    acd: "358h",
    porc_abandono: "9.9%",
    ocupacion: "77%",
    prom_conversacion_in: "418s",
    prom_conversacion_out: "378s",
    no_listo: "44s",
    hold: "31s",
    aht_in: "572s",
    aht_out: "538s",
    aht_total: "555s",
  },
  {
    fecha: "2024-01-10",
    fecha_hora: "00:00",
    cod_pcrc: "013",
    entrantes: 1456,
    contestadas: 1312,
    abandonadas: 144,
    contestadas_umbral: 876,
    salida: 223,
    entrada: 1456,
    ns: "60.2%",
    eficacia: "90.1%",
    asa: "50s",
    ata: "10s",
    acd: "358h",
    porc_abandono: "9.9%",
    ocupacion: "77%",
    prom_conversacion_in: "418s",
    prom_conversacion_out: "378s",
    no_listo: "44s",
    hold: "31s",
    aht_in: "572s",
    aht_out: "538s",
    aht_total: "555s",
  },


]

const intradiaConsolidadoData = [
  {
    fecha: "2024-01-15",
    fecha_hora: "07:00",
    cod_pcrc: "011",
    entrantes: 125,
    contestadas: 112,
    abandonadas: 13,
    contestadas_umbral: 78,
    salida: 18,
    entrada: 125,
    ocupacion: "85%",
    ns: "62.4%",
    eficacia: "89.6%",
    asa: "42s",
    ata: "11s",
    acd: "45h",
    porc_abandono: "10.4%",
    prom_conversacion_in: "425s",
    prom_conversacion_out: "385s",
    no_listo: "43s",
    hold: "30s",
    aht_in: "578s",
    aht_out: "545s",
    aht_total: "562s",
  },
  {
    fecha: "2024-01-15",
    fecha_hora: "07:30",
    cod_pcrc: "011",
    entrantes: 142,
    contestadas: 128,
    abandonadas: 14,
    contestadas_umbral: 89,
    salida: 21,
    entrada: 142,
    ocupacion: "87%",
    ns: "62.7%",
    eficacia: "90.1%",
    asa: "45s",
    ata: "12s",
    acd: "48h",
    porc_abandono: "9.9%",
    prom_conversacion_in: "420s",
    prom_conversacion_out: "382s",
    no_listo: "42s",
    hold: "31s",
    aht_in: "575s",
    aht_out: "542s",
    aht_total: "558s",
  },
  {
    fecha: "2024-01-15",
    fecha_hora: "08:00",
    cod_pcrc: "011",
    entrantes: 168,
    contestadas: 152,
    abandonadas: 16,
    contestadas_umbral: 104,
    salida: 25,
    entrada: 168,
    ocupacion: "92%",
    ns: "61.9%",
    eficacia: "90.5%",
    asa: "48s",
    ata: "13s",
    acd: "52h",
    porc_abandono: "9.5%",
    prom_conversacion_in: "422s",
    prom_conversacion_out: "380s",
    no_listo: "44s",
    hold: "32s",
    aht_in: "580s",
    aht_out: "548s",
    aht_total: "564s",
  },
]

const intradiaIndividualData = [
  {
    fecha: "2024-01-15",
    nombre_objeto: "Cola Ventas",
    fecha_hora: "07:00",
    cod_pcrc: "011",
    entrantes: 65,
    contestadas: 58,
    abandonadas: 7,
    contestadas_umbral: 42,
    salida: 8,
    entrada: 65,
    ns: "64.6%",
    eficacia: "89.2%",
    asa: "40s",
    ata: "10s",
    acd: "22h",
    porc_abandono: "10.8%",
    ocupacion: "84%",
    prom_conversacion_in: "430s",
    prom_conversacion_out: "390s",
    no_listo: "45s",
    hold: "28s",
    aht_in: "582s",
    aht_out: "548s",
    aht_total: "565s",
  },
  {
    fecha: "2024-01-15",
    nombre_objeto: "Cola Soporte",
    fecha_hora: "07:00",
    cod_pcrc: "012",
    entrantes: 60,
    contestadas: 54,
    abandonadas: 6,
    contestadas_umbral: 36,
    salida: 10,
    entrada: 60,
    ns: "60.0%",
    eficacia: "90.0%",
    asa: "44s",
    ata: "12s",
    acd: "23h",
    porc_abandono: "10.0%",
    ocupacion: "86%",
    prom_conversacion_in: "420s",
    prom_conversacion_out: "380s",
    no_listo: "41s",
    hold: "34s",
    aht_in: "574s",
    aht_out: "542s",
    aht_total: "558s",
  },
]

const evolutivoData = [
  {
    fecha: "2024-01",
    servicio: "Ventas",
    entrantes: 45230,
    contestadas: 41200,
    abandonadas: 4030,
    contestadas_umbral: 28760,
    salida: 6800,
    entrada: 45230,
    ns: "63.6%",
    eficacia: "91.1%",
    asa: "46s",
    ata: "11s",
    acd: "12500h",
    porc_abandono: "8.9%",
    ocupacion: "79%",
    prom_conversacion_in: "418s",
    prom_conversacion_out: "376s",
    no_listo: "40s",
    hold: "30s",
    aht_in: "568s",
    aht_out: "536s",
    aht: "552s",
  },
  {
    fecha: "2024-01",
    servicio: "Soporte",
    entrantes: 38450,
    contestadas: 34800,
    abandonadas: 3650,
    contestadas_umbral: 23100,
    salida: 5200,
    entrada: 38450,
    ns: "60.1%",
    eficacia: "90.5%",
    asa: "52s",
    ata: "13s",
    acd: "10800h",
    porc_abandono: "9.5%",
    ocupacion: "76%",
    prom_conversacion_in: "425s",
    prom_conversacion_out: "382s",
    no_listo: "44s",
    hold: "33s",
    aht_in: "582s",
    aht_out: "548s",
    aht: "565s",
  },
]

const consolidadoIndividualData = intradiaConsolidadoData

export function DetailTables({ activeTable, onTableChange }: DetailTablesProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const renderTable = () => {
    switch (activeTable) {
      case "consolidado_mes":
        return (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold text-center">Fecha</TableHead>
                <TableHead className="font-semibold text-center">Fecha Hora</TableHead>
                <TableHead className="font-semibold text-center">Cod PCRC</TableHead>
                <TableHead className="font-semibold text-center">Entrantes</TableHead>
                <TableHead className="font-semibold text-center">Contestadas</TableHead>
                <TableHead className="font-semibold text-center">Abandonadas</TableHead>
                <TableHead className="font-semibold text-center">Contestadas Umbral</TableHead>
                <TableHead className="font-semibold text-center">Salida</TableHead>
                <TableHead className="font-semibold text-center">Entrada</TableHead>
                <TableHead className="font-semibold text-center">NS</TableHead>
                <TableHead className="font-semibold text-center">Eficacia</TableHead>
                <TableHead className="font-semibold text-center">ASA</TableHead>
                <TableHead className="font-semibold text-center">ATA</TableHead>
                <TableHead className="font-semibold text-center">ACD</TableHead>
                <TableHead className="font-semibold text-center">% Abandono</TableHead>
                <TableHead className="font-semibold text-center">Ocupación</TableHead>
                <TableHead className="font-semibold text-center">Conversación In</TableHead>
                <TableHead className="font-semibold text-center">Conversación Out</TableHead>
                <TableHead className="font-semibold text-center">No Listo</TableHead>
                <TableHead className="font-semibold text-center">Hold</TableHead>
                <TableHead className="font-semibold text-center">AHT In</TableHead>
                <TableHead className="font-semibold text-center">AHT Out</TableHead>
                <TableHead className="font-semibold text-center">AHT Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consolidadoMesData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell className="text-center">{row.fecha}</TableCell>
                  <TableCell className="text-center">{row.fecha_hora}</TableCell>
                  <TableCell className="text-center font-medium">
                    <Badge variant="outline">{row.cod_pcrc}</Badge>
                  </TableCell>
                  <TableCell className="text-center font-medium">{row.entrantes.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{row.contestadas.toLocaleString()}</TableCell>
                  <TableCell className="text-center ">{row.abandonadas}</TableCell>
                  <TableCell className="text-center ">{row.contestadas_umbral}</TableCell>
                  <TableCell className="text-center ">{row.salida}</TableCell>
                  <TableCell className="text-center ">{row.entrada}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className={cn(
                        Number.parseFloat(row.ns) >= 60
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {row.ns}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{row.eficacia}</TableCell>
                  <TableCell className="text-center">{row.asa}</TableCell>
                  <TableCell className="text-center">{row.ata}</TableCell>
                  <TableCell className="text-center">{row.acd}</TableCell>
                  <TableCell className="text-center">{row.porc_abandono}</TableCell>
                  <TableCell className="text-center">{row.ocupacion}</TableCell>
                  <TableCell className="text-center">{row.prom_conversacion_in}</TableCell>
                  <TableCell className="text-center">{row.prom_conversacion_out}</TableCell>
                  <TableCell className="text-center">{row.no_listo}</TableCell>
                  <TableCell className="text-center">{row.hold}</TableCell>
                  <TableCell className="text-center">{row.aht_in}</TableCell>
                  <TableCell className="text-center">{row.aht_out}</TableCell>
                  <TableCell className="text-center font-medium">{row.aht_total}</TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )

      case "intradia_consolidado":
        return (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Fecha</TableHead>
                <TableHead className="font-semibold">Hora</TableHead>
                <TableHead className="font-semibold">Cod PCRC</TableHead>
                <TableHead className="font-semibold text-right">Entrantes</TableHead>
                <TableHead className="font-semibold text-right">Contestadas</TableHead>
                <TableHead className="font-semibold text-right">Abandonadas</TableHead>
                <TableHead className="font-semibold text-right">NS</TableHead>
                <TableHead className="font-semibold text-right">ASA</TableHead>
                <TableHead className="font-semibold text-right">AHT Total</TableHead>
                <TableHead className="font-semibold text-right">Ocupación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {intradiaConsolidadoData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell>{row.fecha_hora}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.cod_pcrc}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{row.entrantes}</TableCell>
                  <TableCell className="text-right">{row.contestadas}</TableCell>
                  <TableCell className="text-right text-red-600">{row.abandonadas}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="secondary"
                      className={cn(
                        Number.parseFloat(row.ns) >= 60
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {row.ns}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{row.asa}</TableCell>
                  <TableCell className="text-right font-medium">{row.aht_total}</TableCell>
                  <TableCell className="text-right">{row.ocupacion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )

      case "intradia_individual":
        return (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Fecha</TableHead>
                <TableHead className="font-semibold">Cola</TableHead>
                <TableHead className="font-semibold">Hora</TableHead>
                <TableHead className="font-semibold">Cod PCRC</TableHead>
                <TableHead className="font-semibold text-right">Entrantes</TableHead>
                <TableHead className="font-semibold text-right">Contestadas</TableHead>
                <TableHead className="font-semibold text-right">Abandonadas</TableHead>
                <TableHead className="font-semibold text-right">NS</TableHead>
                <TableHead className="font-semibold text-right">ASA</TableHead>
                <TableHead className="font-semibold text-right">AHT Total</TableHead>
                <TableHead className="font-semibold text-right">Ocupación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {intradiaIndividualData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell className="font-medium">{row.nombre_objeto}</TableCell>
                  <TableCell>{row.fecha_hora}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.cod_pcrc}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{row.entrantes}</TableCell>
                  <TableCell className="text-right">{row.contestadas}</TableCell>
                  <TableCell className="text-right text-red-600">{row.abandonadas}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="secondary"
                      className={cn(
                        Number.parseFloat(row.ns) >= 60
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {row.ns}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{row.asa}</TableCell>
                  <TableCell className="text-right font-medium">{row.aht_total}</TableCell>
                  <TableCell className="text-right">{row.ocupacion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )

      case "evolutivo":
        return (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Período</TableHead>
                <TableHead className="font-semibold">Servicio</TableHead>
                <TableHead className="font-semibold text-right">Entrantes</TableHead>
                <TableHead className="font-semibold text-right">Contestadas</TableHead>
                <TableHead className="font-semibold text-right">Abandonadas</TableHead>
                <TableHead className="font-semibold text-right">NS</TableHead>
                <TableHead className="font-semibold text-right">Eficacia</TableHead>
                <TableHead className="font-semibold text-right">ASA</TableHead>
                <TableHead className="font-semibold text-right">AHT</TableHead>
                <TableHead className="font-semibold text-right">Ocupación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evolutivoData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell className="font-medium">{row.servicio}</TableCell>
                  <TableCell className="text-right font-medium">{row.entrantes.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.contestadas.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-red-600">{row.abandonadas.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="secondary"
                      className={cn(
                        Number.parseFloat(row.ns) >= 60
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {row.ns}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{row.eficacia}</TableCell>
                  <TableCell className="text-right">{row.asa}</TableCell>
                  <TableCell className="text-right font-medium">{row.aht}</TableCell>
                  <TableCell className="text-right">{row.ocupacion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )

      case "consolidado_individual":
        return (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Fecha</TableHead>
                <TableHead className="font-semibold">Hora</TableHead>
                <TableHead className="font-semibold">Cod PCRC</TableHead>
                <TableHead className="font-semibold text-right">Entrantes</TableHead>
                <TableHead className="font-semibold text-right">Contestadas</TableHead>
                <TableHead className="font-semibold text-right">Abandonadas</TableHead>
                <TableHead className="font-semibold text-right">NS</TableHead>
                <TableHead className="font-semibold text-right">ASA</TableHead>
                <TableHead className="font-semibold text-right">AHT Total</TableHead>
                <TableHead className="font-semibold text-right">Ocupación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consolidadoIndividualData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell>{row.fecha_hora}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.cod_pcrc}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{row.entrantes}</TableCell>
                  <TableCell className="text-right">{row.contestadas}</TableCell>
                  <TableCell className="text-right text-red-600">{row.abandonadas}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="secondary"
                      className={cn(
                        Number.parseFloat(row.ns) >= 60
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {row.ns}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{row.asa}</TableCell>
                  <TableCell className="text-right font-medium">{row.aht_total}</TableCell>
                  <TableCell className="text-right">{row.ocupacion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
    }
  }

  return (
    <div className="space-y-4">
      {/* Table Navigation */}
      <div className="flex items-center gap-2 flex-wrap">
        {(Object.keys(tableNames) as TableType[]).map((table) => (
          <Button
            key={table}
            variant={activeTable === table ? "default" : "outline"}
            size="sm"
            onClick={() => onTableChange(table)}
            className={cn(
              activeTable === table
                ? "bg-primary text-primary-foreground"
                : "bg-transparent hover:bg-muted"
            )}
          >
            {tableNames[table]}
          </Button>
        ))}
      </div>

      {/* Table Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">{tableNames[activeTable]}</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">{renderTable()}</div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">Mostrando 1 - 10 de 100</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 bg-transparent">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 bg-transparent">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 bg-transparent">
                3
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
