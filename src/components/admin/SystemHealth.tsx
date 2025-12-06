import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, AlertTriangle, XCircle, RefreshCw, Database, Globe, Server } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface HealthCheck {
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'checking';
  message: string;
  icon: any;
}

export const SystemHealth = () => {
  const [checks, setChecks] = useState<HealthCheck[]>([
    { name: 'Datenbank', status: 'checking', message: 'Prüfe...', icon: Database },
    { name: 'API', status: 'checking', message: 'Prüfe...', icon: Server },
    { name: 'Authentifizierung', status: 'checking', message: 'Prüfe...', icon: Globe },
  ]);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const runHealthChecks = async () => {
    setIsChecking(true);
    const newChecks: HealthCheck[] = [];

    // Check Database
    try {
      const start = performance.now();
      const { error } = await supabase.from('bookings').select('id').limit(1);
      const duration = performance.now() - start;
      
      newChecks.push({
        name: 'Datenbank',
        status: error ? 'error' : duration > 1000 ? 'warning' : 'healthy',
        message: error ? 'Verbindungsfehler' : `${Math.round(duration)}ms Antwortzeit`,
        icon: Database
      });
    } catch {
      newChecks.push({
        name: 'Datenbank',
        status: 'error',
        message: 'Nicht erreichbar',
        icon: Database
      });
    }

    // Check API
    try {
      const start = performance.now();
      const { error } = await supabase.from('testimonial_submissions').select('id').limit(1);
      const duration = performance.now() - start;
      
      newChecks.push({
        name: 'API',
        status: error ? 'error' : duration > 500 ? 'warning' : 'healthy',
        message: error ? 'API Fehler' : `${Math.round(duration)}ms`,
        icon: Server
      });
    } catch {
      newChecks.push({
        name: 'API',
        status: 'error',
        message: 'Nicht erreichbar',
        icon: Server
      });
    }

    // Check Auth
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      newChecks.push({
        name: 'Authentifizierung',
        status: error ? 'error' : session ? 'healthy' : 'warning',
        message: error ? 'Auth Fehler' : session ? 'Aktive Session' : 'Keine Session',
        icon: Globe
      });
    } catch {
      newChecks.push({
        name: 'Authentifizierung',
        status: 'error',
        message: 'Fehler',
        icon: Globe
      });
    }

    setChecks(newChecks);
    setLastChecked(new Date());
    setIsChecking(false);
  };

  useEffect(() => {
    runHealthChecks();
    const interval = setInterval(runHealthChecks, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <RefreshCw className="w-4 h-4 text-muted-foreground animate-spin" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'warning': return 'bg-amber-500/10 border-amber-500/20';
      case 'error': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-muted/30 border-border/50';
    }
  };

  const overallStatus = checks.some(c => c.status === 'error') 
    ? 'error' 
    : checks.some(c => c.status === 'warning') 
    ? 'warning' 
    : checks.every(c => c.status === 'healthy')
    ? 'healthy'
    : 'checking';

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            System Status
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={runHealthChecks}
            disabled={isChecking}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Overall Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-xl border ${getStatusBg(overallStatus)}`}
        >
          <div className="flex items-center gap-2">
            {getStatusIcon(overallStatus)}
            <span className="font-medium">
              {overallStatus === 'healthy' && 'Alle Systeme operational'}
              {overallStatus === 'warning' && 'Leichte Verzögerungen'}
              {overallStatus === 'error' && 'Systemprobleme erkannt'}
              {overallStatus === 'checking' && 'Prüfe Systeme...'}
            </span>
          </div>
        </motion.div>

        {/* Individual Checks */}
        <div className="space-y-2">
          {checks.map((check, index) => (
            <motion.div
              key={check.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/20"
            >
              <div className="flex items-center gap-3">
                <check.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{check.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{check.message}</span>
                {getStatusIcon(check.status)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Last Checked */}
        {lastChecked && (
          <p className="text-xs text-muted-foreground text-center">
            Zuletzt geprüft: {lastChecked.toLocaleTimeString('de-CH')}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
