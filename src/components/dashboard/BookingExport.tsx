import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Table, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";

interface Booking {
  id: string;
  booking_number: string;
  appointment_date: string;
  appointment_time: string;
  massage: string;
  theme: string;
  masseur: string;
  duration: string;
  status: string;
}

interface BookingExportProps {
  bookings: Booking[];
}

export const BookingExport = ({ bookings }: BookingExportProps) => {
  const [exporting, setExporting] = useState<string | null>(null);

  const exportCSV = () => {
    setExporting('csv');
    
    const headers = ['Buchungsnummer', 'Datum', 'Uhrzeit', 'Massage', 'Erlebnis', 'Therapeut', 'Dauer', 'Status'];
    const rows = bookings.map(b => [
      b.booking_number,
      format(parseISO(b.appointment_date), 'dd.MM.yyyy'),
      b.appointment_time,
      b.massage,
      b.theme,
      b.masseur,
      b.duration,
      b.status || 'bestätigt'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `gentlehands-buchungen-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();

    setTimeout(() => {
      setExporting(null);
      toast.success('CSV erfolgreich exportiert');
    }, 500);
  };

  const exportPDF = () => {
    setExporting('pdf');
    
    // Create a printable HTML document
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>GentleHands Buchungsübersicht</title>
        <style>
          body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
          h1 { font-size: 24px; margin-bottom: 10px; }
          .subtitle { color: #666; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #f5f5f5; padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #666; }
          td { padding: 12px; border-bottom: 1px solid #eee; font-size: 14px; }
          tr:hover { background: #fafafa; }
          .status { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          .status-confirmed { background: #dcfce7; color: #166534; }
          .status-pending { background: #fef3c7; color: #92400e; }
          .footer { margin-top: 40px; text-align: center; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>GentleHands Zürich</h1>
        <p class="subtitle">Ihre Buchungsübersicht - Erstellt am ${format(new Date(), 'd. MMMM yyyy', { locale: de })}</p>
        <table>
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Datum</th>
              <th>Massage</th>
              <th>Erlebnis</th>
              <th>Therapeut:in</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${bookings.map(b => `
              <tr>
                <td>${b.booking_number}</td>
                <td>${format(parseISO(b.appointment_date), 'd. MMM yyyy', { locale: de })}<br><small>${b.appointment_time} Uhr</small></td>
                <td>${b.massage}<br><small>${b.duration}</small></td>
                <td>${b.theme}</td>
                <td>${b.masseur}</td>
                <td><span class="status status-${b.status === 'pending' ? 'pending' : 'confirmed'}">${b.status === 'pending' ? 'Ausstehend' : 'Bestätigt'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p class="footer">GentleHands Private Massage Suite • Zürich • www.gentlehands.ch</p>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }

    setTimeout(() => {
      setExporting(null);
      toast.success('PDF zum Drucken geöffnet');
    }, 500);
  };

  if (bookings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-border/50"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-display font-semibold text-foreground">Buchungen exportieren</h4>
          <p className="text-sm text-muted-foreground">{bookings.length} Buchungen verfügbar</p>
        </div>
        <Download className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={exportCSV}
          disabled={!!exporting}
          className="justify-start gap-3"
        >
          {exporting === 'csv' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Table className="w-5 h-5 text-emerald-500" />
          )}
          <div className="text-left">
            <p className="font-medium">CSV Export</p>
            <p className="text-xs text-muted-foreground">Für Excel & Google Sheets</p>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={exportPDF}
          disabled={!!exporting}
          className="justify-start gap-3"
        >
          {exporting === 'pdf' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <FileText className="w-5 h-5 text-rose-500" />
          )}
          <div className="text-left">
            <p className="font-medium">PDF Drucken</p>
            <p className="text-xs text-muted-foreground">Übersichtliche Ansicht</p>
          </div>
        </Button>
      </div>
    </motion.div>
  );
};
