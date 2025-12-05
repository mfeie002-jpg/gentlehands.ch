import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Gift,
  Wallet,
  Calendar,
  Mail,
  User,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { GiftCard } from "@/hooks/useAdmin";
import { useToast } from "@/hooks/use-toast";

interface GiftCardsManagerProps {
  giftCards: GiftCard[];
  searchQuery: string;
  onCreate: (data: Partial<GiftCard>) => Promise<boolean>;
  onUpdateBalance: (id: string, balance: number) => Promise<boolean>;
}

const presetValues = [50, 100, 150, 200, 300, 500];

export const GiftCardsManager = ({ giftCards, searchQuery, onCreate, onUpdateBalance }: GiftCardsManagerProps) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [newCard, setNewCard] = useState({
    value: 100,
    recipient_name: '',
    recipient_email: '',
    purchaser_email: '',
    message: ''
  });
  const { toast } = useToast();

  const filteredCards = giftCards.filter(card => {
    const query = searchQuery.toLowerCase();
    return (
      card.code.toLowerCase().includes(query) ||
      card.recipient_name?.toLowerCase().includes(query) ||
      card.recipient_email?.toLowerCase().includes(query)
    );
  });

  const handleCreate = async () => {
    const success = await onCreate(newCard);
    if (success) {
      setIsCreateOpen(false);
      setNewCard({ value: 100, recipient_name: '', recipient_email: '', purchaser_email: '', message: '' });
    }
  };

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({ title: 'Kopiert', description: 'Code in Zwischenablage kopiert' });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const totalValue = giftCards.reduce((sum, card) => sum + card.value, 0);
  const totalRemaining = giftCards.reduce((sum, card) => sum + card.remaining_balance, 0);
  const activeCards = giftCards.filter(card => !card.is_redeemed && card.remaining_balance > 0).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <p className="text-sm text-muted-foreground">Total Gutscheine</p>
          <p className="text-2xl font-bold font-playfair">{giftCards.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
          <p className="text-sm text-muted-foreground">Aktive Gutscheine</p>
          <p className="text-2xl font-bold font-playfair">{activeCards}</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20">
          <p className="text-sm text-muted-foreground">Gesamtwert</p>
          <p className="text-2xl font-bold font-playfair">CHF {totalValue.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
          <p className="text-sm text-muted-foreground">Offenes Guthaben</p>
          <p className="text-2xl font-bold font-playfair">CHF {totalRemaining.toLocaleString()}</p>
        </div>
      </div>

      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gutscheine verwalten</h3>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Neuer Gutschein
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-playfair text-2xl">Gutschein erstellen</DialogTitle>
              <DialogDescription>
                Erstellen Sie einen neuen Geschenkgutschein
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div>
                <Label>Wert (CHF)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {presetValues.map(value => (
                    <Button
                      key={value}
                      type="button"
                      variant={newCard.value === value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewCard({ ...newCard, value })}
                    >
                      CHF {value}
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  value={newCard.value}
                  onChange={e => setNewCard({ ...newCard, value: parseInt(e.target.value) || 0 })}
                  className="mt-2"
                  placeholder="Oder eigener Betrag"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Empfänger Name</Label>
                  <Input
                    value={newCard.recipient_name}
                    onChange={e => setNewCard({ ...newCard, recipient_name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
                <div>
                  <Label>Empfänger E-Mail</Label>
                  <Input
                    type="email"
                    value={newCard.recipient_email}
                    onChange={e => setNewCard({ ...newCard, recipient_email: e.target.value })}
                    placeholder="email@beispiel.ch"
                  />
                </div>
              </div>

              <div>
                <Label>Käufer E-Mail</Label>
                <Input
                  type="email"
                  value={newCard.purchaser_email}
                  onChange={e => setNewCard({ ...newCard, purchaser_email: e.target.value })}
                  placeholder="email@beispiel.ch"
                />
              </div>

              <div>
                <Label>Persönliche Nachricht</Label>
                <Textarea
                  value={newCard.message}
                  onChange={e => setNewCard({ ...newCard, message: e.target.value })}
                  placeholder="Eine persönliche Nachricht für den Empfänger..."
                  rows={3}
                />
              </div>

              <Button onClick={handleCreate} className="w-full">
                Gutschein erstellen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCards.map((card, index) => {
            const percentUsed = ((card.value - card.remaining_balance) / card.value) * 100;
            const isExpired = card.expires_at && new Date(card.expires_at) < new Date();
            
            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "relative overflow-hidden rounded-2xl border bg-card p-6",
                  card.is_redeemed || card.remaining_balance <= 0
                    ? "border-muted opacity-60"
                    : isExpired
                    ? "border-red-500/30"
                    : "border-primary/30"
                )}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)),transparent_70%)]" />
                </div>

                {/* Status Badge */}
                <Badge 
                  variant="outline" 
                  className={cn(
                    "absolute top-4 right-4",
                    card.is_redeemed || card.remaining_balance <= 0
                      ? "bg-muted text-muted-foreground"
                      : isExpired
                      ? "bg-red-500/20 text-red-600 border-red-500/30"
                      : "bg-emerald-500/20 text-emerald-600 border-emerald-500/30"
                  )}
                >
                  {card.is_redeemed || card.remaining_balance <= 0 
                    ? "Eingelöst" 
                    : isExpired 
                    ? "Abgelaufen" 
                    : "Aktiv"}
                </Badge>

                {/* Gift Icon */}
                <Gift className="w-8 h-8 text-primary mb-4" />

                {/* Code */}
                <div className="flex items-center gap-2 mb-4">
                  <code className="font-mono text-lg font-bold tracking-wider">{card.code}</code>
                  <button 
                    onClick={() => copyCode(card.code)}
                    className="p-1 rounded hover:bg-muted transition-colors"
                  >
                    {copiedCode === card.code ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Value */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-playfair">CHF {card.remaining_balance}</span>
                    {card.remaining_balance !== card.value && (
                      <span className="text-sm text-muted-foreground line-through">CHF {card.value}</span>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${100 - percentUsed}%` }}
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  {card.recipient_name && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      {card.recipient_name}
                    </div>
                  )}
                  {card.recipient_email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {card.recipient_email}
                    </div>
                  )}
                  {card.expires_at && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Gültig bis {new Date(card.expires_at).toLocaleDateString('de-CH')}
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                {!card.is_redeemed && card.remaining_balance > 0 && !isExpired && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Select onValueChange={(v) => onUpdateBalance(card.id, parseInt(v))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Guthaben anpassen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Vollständig einlösen (CHF 0)</SelectItem>
                        {[25, 50, 75, 100, 150].filter(v => v < card.remaining_balance).map(value => (
                          <SelectItem key={value} value={String(card.remaining_balance - value)}>
                            CHF {value} abziehen (CHF {card.remaining_balance - value} übrig)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredCards.length === 0 && (
        <div className="p-12 text-center text-muted-foreground rounded-2xl border border-dashed">
          <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Keine Gutscheine gefunden</p>
        </div>
      )}
    </div>
  );
};
