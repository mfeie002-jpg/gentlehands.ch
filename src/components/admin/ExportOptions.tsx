import { motion } from "framer-motion";
import { Download, FileSpreadsheet, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const ExportOptions = () => {
  const exportToCSV = async (type: 'all' | 'week' | 'month') => {
    let query = supabase.from('bookings').select('*');
    
    if (type === 'week') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      query = query.gte('created_at', weekAgo);
    } else if (type === 'month') {
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      query = query.gte('created_at', monthAgo);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      toast.error("Export fehlgeschlagen");
      return;
    }

    if (!data || data.length === 0) {
      toast.info("Keine Daten zum Exportieren");
      return;
    }

    const headers = [
      'Buchungsnummer',
      'Kunde',
      'Email',
      'Telefon',
      'Massage',
      'Thema',
      'Therapeut',
      'Dauer',
      'Datum',
      'Uhrzeit',
      'Status',
      'Erstellt'
    ];

    const rows = data.map(b => [
      b.booking_number,
      b.customer_name,
      b.customer_email,
      b.customer_phone,
      b.massage,
      b.theme,
      b.masseur,
      b.duration,
      b.appointment_date,
      b.appointment_time,
      b.status || 'pending',
      new Date(b.created_at).toLocaleDateString('de-CH')
    ]);

    const csvContent = [
      headers.join(';'),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(';'))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `buchungen-${type}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success(`${data.length} Buchungen exportiert`);
  };

  const exportStats = async () => {
    const today = new Date().toISOString().split('T')[0];
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [bookingsResult, giftCardsResult] = await Promise.all([
      supabase.from('bookings').select('status, duration, created_at').gte('created_at', monthAgo),
      supabase.from('gift_cards').select('value, remaining_balance, is_redeemed')
    ]);

    const bookings = bookingsResult.data || [];
    const giftCards = giftCardsResult.data || [];

    const priceMap: Record<string, number> = { '60': 180, '90': 260, '120': 340 };
    
    const stats = {
      totalBookings: bookings.length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      pending: bookings.filter(b => b.status === 'pending').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      revenue: bookings.reduce((sum, b) => sum + (priceMap[b.duration] || 180), 0),
      totalGiftCards: giftCards.length,
      giftCardValue: giftCards.reduce((sum, g) => sum + g.value, 0),
      redeemedGiftCards: giftCards.filter(g => g.is_redeemed).length
    };

    const content = `GENTLEHANDS STATISTIK-REPORT
Generiert am: ${new Date().toLocaleString('de-CH')}
Zeitraum: Letzte 30 Tage

BUCHUNGEN
---------
Gesamt: ${stats.totalBookings}
Bestätigt: ${stats.confirmed}
Ausstehend: ${stats.pending}
Storniert: ${stats.cancelled}
Geschätzter Umsatz: CHF ${stats.revenue.toLocaleString()}

GUTSCHEINE
----------
Gesamt: ${stats.totalGiftCards}
Eingelöst: ${stats.redeemedGiftCards}
Gesamtwert: CHF ${stats.giftCardValue.toLocaleString()}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `statistik-${today}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success("Statistik exportiert");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => exportToCSV('all')} className="gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          Alle Buchungen (CSV)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportToCSV('week')} className="gap-2">
          <Calendar className="w-4 h-4" />
          Diese Woche (CSV)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportToCSV('month')} className="gap-2">
          <Calendar className="w-4 h-4" />
          Dieser Monat (CSV)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={exportStats} className="gap-2">
          <FileText className="w-4 h-4" />
          Statistik-Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
