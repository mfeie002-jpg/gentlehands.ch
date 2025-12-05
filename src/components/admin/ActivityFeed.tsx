import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity,
  Calendar,
  MessageSquare,
  Gift,
  Check,
  X,
  Trash2,
  Plus,
  Edit
} from "lucide-react";
import { ActivityLog } from "@/hooks/useAdmin";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface ActivityFeedProps {
  logs: ActivityLog[];
  isLoading: boolean;
}

const getActivityIcon = (action: string, entityType: string) => {
  if (action === 'create') return Plus;
  if (action === 'delete') return Trash2;
  if (action === 'approve') return Check;
  if (action === 'reject') return X;
  if (action === 'update') return Edit;
  
  if (entityType === 'booking') return Calendar;
  if (entityType === 'testimonial') return MessageSquare;
  if (entityType === 'gift_card') return Gift;
  
  return Activity;
};

const getActivityColor = (action: string) => {
  switch (action) {
    case 'create': return 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30';
    case 'delete': return 'bg-red-500/20 text-red-600 border-red-500/30';
    case 'approve': return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
    case 'reject': return 'bg-amber-500/20 text-amber-600 border-amber-500/30';
    case 'update': return 'bg-violet-500/20 text-violet-600 border-violet-500/30';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

const getActivityText = (action: string, entityType: string) => {
  const entityNames: Record<string, string> = {
    booking: 'Buchung',
    testimonial: 'Testimonial',
    gift_card: 'Gutschein'
  };
  
  const actionNames: Record<string, string> = {
    create: 'erstellt',
    delete: 'gelöscht',
    approve: 'genehmigt',
    reject: 'abgelehnt',
    update: 'aktualisiert'
  };
  
  return `${entityNames[entityType] || entityType} ${actionNames[action] || action}`;
};

export const ActivityFeed = ({ logs, isLoading }: ActivityFeedProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/4 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Aktivitätsprotokoll</h3>
        <span className="text-sm text-muted-foreground">Letzte 50 Aktivitäten</span>
      </div>

      {logs.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground rounded-2xl border border-dashed">
          <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Noch keine Aktivitäten</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

          <AnimatePresence>
            {logs.map((log, index) => {
              const Icon = getActivityIcon(log.action, log.entity_type);
              const colorClass = getActivityColor(log.action);
              
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative flex items-start gap-4 pb-6 last:pb-0"
                >
                  {/* Icon */}
                  <div className={cn(
                    "relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center bg-background",
                    colorClass
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium">
                        {getActivityText(log.action, log.entity_type)}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(log.created_at), { 
                          addSuffix: true, 
                          locale: de 
                        })}
                      </span>
                    </div>
                    
                    {/* Details */}
                    {log.details && Object.keys(log.details).length > 0 && (
                      <div className="mt-2 p-3 rounded-lg bg-muted/50 text-sm">
                        {Object.entries(log.details).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}:</span>
                            <span className="font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {log.entity_id && (
                      <p className="text-xs text-muted-foreground mt-1 font-mono">
                        ID: {log.entity_id.slice(0, 8)}...
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
