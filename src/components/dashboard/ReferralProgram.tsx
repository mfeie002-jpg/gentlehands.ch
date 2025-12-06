import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Gift, Copy, Check, Share2, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ReferralProgramProps {
  userId: string;
}

interface Referral {
  id: string;
  referred_email: string | null;
  status: string | null;
  reward_claimed: boolean | null;
  created_at: string | null;
}

export const ReferralProgram = ({ userId }: ReferralProgramProps) => {
  const [referralCode, setReferralCode] = useState("");
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchReferrals();
  }, [userId]);

  const fetchReferrals = async () => {
    // Generate or get referral code
    const { data: existingReferral } = await supabase
      .from('referrals')
      .select('referral_code')
      .eq('referrer_id', userId)
      .limit(1)
      .maybeSingle();

    if (existingReferral) {
      setReferralCode(existingReferral.referral_code);
    } else {
      const newCode = `GH-${userId.substring(0, 6).toUpperCase()}`;
      setReferralCode(newCode);
    }

    // Fetch all referrals
    const { data } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId)
      .order('created_at', { ascending: false });

    if (data) setReferrals(data);
  };

  const copyCode = async () => {
    const shareUrl = `${window.location.origin}?ref=${referralCode}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Link kopiert!", description: "Teilen Sie ihn mit Freundinnen." });
  };

  const sendInvite = async () => {
    if (!inviteEmail) return;

    const { error } = await supabase.from('referrals').insert({
      referrer_id: userId,
      referral_code: referralCode,
      referred_email: inviteEmail,
      status: 'pending',
    });

    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Einladung gesendet!", description: `Eine Einladung wurde an ${inviteEmail} gesendet.` });
      setInviteEmail("");
      fetchReferrals();
    }
  };

  const shareVia = (platform: 'whatsapp' | 'email') => {
    const shareUrl = `${window.location.origin}?ref=${referralCode}`;
    const message = `Entdecke GentleHands – das exklusivste Wellness-Erlebnis in Zürich. Mit meinem Link erhältst du 10% Rabatt auf deine erste Buchung: ${shareUrl}`;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      window.open(`mailto:?subject=GentleHands%20Empfehlung&body=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const successfulReferrals = referrals.filter(r => r.status === 'completed').length;
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;
  const totalRewards = successfulReferrals * 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-border/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-rose-500" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">Freundinnen empfehlen</h3>
          <p className="text-sm text-muted-foreground">Verdienen Sie CHF 50 pro Empfehlung</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-muted/30">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{successfulReferrals}</p>
          <p className="text-xs text-muted-foreground">Erfolgreiche</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{pendingReferrals}</p>
          <p className="text-xs text-muted-foreground">Ausstehend</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-copper">CHF {totalRewards}</p>
          <p className="text-xs text-muted-foreground">Verdient</p>
        </div>
      </div>

      {/* Referral Code */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">Ihr persönlicher Link</p>
        <div className="flex gap-2">
          <Input
            value={`${window.location.origin}?ref=${referralCode}`}
            readOnly
            className="text-sm font-mono"
          />
          <Button variant="outline" size="icon" onClick={copyCode}>
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex gap-2 mb-6">
        <Button 
          variant="outline" 
          className="flex-1 gap-2"
          onClick={() => shareVia('whatsapp')}
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 gap-2"
          onClick={() => shareVia('email')}
        >
          <Mail className="w-4 h-4" />
          E-Mail
        </Button>
      </div>

      {/* Direct Invite */}
      <div>
        <p className="text-sm font-medium mb-2">Direkt einladen</p>
        <div className="flex gap-2">
          <Input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="freundin@email.ch"
          />
          <Button onClick={sendInvite} disabled={!inviteEmail}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <p className="text-sm font-medium mb-3">So funktioniert's</p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-copper/10 text-copper flex items-center justify-center text-xs font-bold">1</span>
            Teilen Sie Ihren Link mit Freundinnen
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-copper/10 text-copper flex items-center justify-center text-xs font-bold">2</span>
            Ihre Freundin erhält 10% auf die erste Buchung
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-copper/10 text-copper flex items-center justify-center text-xs font-bold">3</span>
            Sie erhalten CHF 50 Guthaben nach dem Termin
          </div>
        </div>
      </div>
    </motion.div>
  );
};
