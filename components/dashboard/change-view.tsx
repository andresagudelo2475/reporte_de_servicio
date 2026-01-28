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

interface HeaderProps {
  activeView: "dashboard" | "detail";
  onViewChange: (view: "dashboard" | "detail") => void;
}

export function ChangeView({ activeView, onViewChange }: HeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <header style={{ backgroundColor: "#f2f0eb" }}>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-[#0F0F72]/10 rounded-md p-1 border border-[#0F0F72]/5">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-xs px-3 py-1 h-6 rounded transition-all",
                activeView === "dashboard"
                  ? "bg-white text-[#0F0F72] shadow-sm"
                  : "text-[#0F0F72] hover:bg-white/50"
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
                  ? "bg-white text-[#0F0F72] shadow-sm"
                  : "text-[#0F0F72] hover:bg-white/50"
              )}
              onClick={() => onViewChange("detail")}
            >
              Detalle
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
