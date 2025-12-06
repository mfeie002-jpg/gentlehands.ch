import { motion } from "framer-motion";
import { Filter, Calendar, User, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BookingFiltersProps {
  filters: {
    status: string;
    therapist: string;
    dateRange: string;
    massage: string;
  };
  onFiltersChange: (filters: any) => void;
  therapists: string[];
  massageTypes: string[];
}

export const BookingFilters = ({ 
  filters, 
  onFiltersChange, 
  therapists,
  massageTypes 
}: BookingFiltersProps) => {
  const activeFiltersCount = Object.values(filters).filter(v => v && v !== 'all').length;

  const clearFilters = () => {
    onFiltersChange({
      status: 'all',
      therapist: 'all',
      dateRange: 'all',
      massage: 'all'
    });
  };

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-3"
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filter</h4>
              {activeFiltersCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-8 text-xs"
                >
                  Alle zurücksetzen
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Status</label>
                <Select value={filters.status} onValueChange={(v) => updateFilter('status', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Status</SelectItem>
                    <SelectItem value="pending">Ausstehend</SelectItem>
                    <SelectItem value="confirmed">Bestätigt</SelectItem>
                    <SelectItem value="completed">Abgeschlossen</SelectItem>
                    <SelectItem value="cancelled">Storniert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Therapeut</label>
                <Select value={filters.therapist} onValueChange={(v) => updateFilter('therapist', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle Therapeuten" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Therapeuten</SelectItem>
                    {therapists.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Zeitraum</label>
                <Select value={filters.dateRange} onValueChange={(v) => updateFilter('dateRange', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle Zeiträume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Zeiträume</SelectItem>
                    <SelectItem value="today">Heute</SelectItem>
                    <SelectItem value="week">Diese Woche</SelectItem>
                    <SelectItem value="month">Dieser Monat</SelectItem>
                    <SelectItem value="past">Vergangene</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Massage</label>
                <Select value={filters.massage} onValueChange={(v) => updateFilter('massage', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle Massagen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Massagen</SelectItem>
                    {massageTypes.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.status !== 'all' && (
            <Badge variant="secondary" className="gap-1 pr-1">
              <Clock className="w-3 h-3" />
              {filters.status}
              <button 
                onClick={() => updateFilter('status', 'all')}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.therapist !== 'all' && (
            <Badge variant="secondary" className="gap-1 pr-1">
              <User className="w-3 h-3" />
              {filters.therapist}
              <button 
                onClick={() => updateFilter('therapist', 'all')}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.dateRange !== 'all' && (
            <Badge variant="secondary" className="gap-1 pr-1">
              <Calendar className="w-3 h-3" />
              {filters.dateRange}
              <button 
                onClick={() => updateFilter('dateRange', 'all')}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </motion.div>
  );
};
