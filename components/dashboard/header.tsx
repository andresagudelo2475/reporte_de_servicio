"use client";

import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Settings,
  BookOpen,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

// interface HeaderProps {
//   activeView: "dashboard" | "detail";
//   onViewChange: (view: "dashboard" | "detail") => void;
// }

export function DashboardHeader() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <header className="bg-primary text-primary-foreground rounded-md mx-3 mt-2">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-primary-foreground hover:bg-white/10"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-semibold">Reporte de Servicio</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle
          <div className="flex bg-white/10 rounded-md p-0.5">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-xs px-3 py-1 h-6 rounded transition-all",
                activeView === "dashboard"
                  ? "bg-white text-primary"
                  : "text-primary-foreground hover:bg-white/10"
              )}
              onClick={() => onViewChange("dashboard")}
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-xs px-3 py-1 h-6 rounded transition-all",
                activeView === "detail"
                  ? "bg-white text-primary"
                  : "text-primary-foreground hover:bg-white/10"
              )}
              onClick={() => onViewChange("detail")}
            >
              Detalle
            </Button>
          </div> */}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
            <Input
              placeholder="Buscar..."
              className="pl-7 h-7 text-xs w-48 bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/60"
            />
          </div>

          {/* Filter Button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-primary-foreground hover:bg-white/10"
              >
                <Filter className="h-3.5 w-3.5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="bancolombia">Bancolombia</SelectItem>
                      <SelectItem value="konecta">Konecta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Grupo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="grupo1">Grupo 1</SelectItem>
                      <SelectItem value="grupo2">Grupo 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Servicio</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="entrada">Entrada</SelectItem>
                      <SelectItem value="salida">Salida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Colas</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar colas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="cola1">Cola 1</SelectItem>
                      <SelectItem value="cola2">Cola 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Campaña</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar campaña" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="campana1">Campaña 1</SelectItem>
                      <SelectItem value="campana2">Campaña 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Fecha</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "dd MMM yyyy", { locale: es })}{" "}
                              - {format(date.to, "dd MMM yyyy", { locale: es })}
                            </>
                          ) : (
                            format(date.from, "dd MMM yyyy", { locale: es })
                          )
                        ) : (
                          <span>Seleccionar fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    className="flex-1"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Aplicar Filtros
                  </Button>
                  <Button variant="outline" onClick={() => setDate(undefined)}>
                    Limpiar
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Manual Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-primary-foreground hover:bg-white/10"
          >
            <BookOpen className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
