import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  X, 
  Trash2,
  Star,
  Quote,
  Filter
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/hooks/useAdmin";

interface TestimonialsManagerProps {
  testimonials: Testimonial[];
  searchQuery: string;
  onApprove: (id: string, approved: boolean) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

export const TestimonialsManager = ({ testimonials, searchQuery, onApprove, onDelete }: TestimonialsManagerProps) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredTestimonials = testimonials.filter(t => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = t.name.toLowerCase().includes(query) || t.content.toLowerCase().includes(query);
    
    if (filter === 'pending') return matchesSearch && !t.is_approved;
    if (filter === 'approved') return matchesSearch && t.is_approved;
    return matchesSearch;
  });

  const handleDelete = async () => {
    if (deleteId) {
      await onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Filter Tabs */}
        <div className="flex items-center justify-between">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all" className="gap-2">
                <Filter className="w-4 h-4" />
                Alle ({testimonials.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="gap-2">
                Ausstehend ({testimonials.filter(t => !t.is_approved).length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="gap-2">
                Genehmigt ({testimonials.filter(t => t.is_approved).length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "relative p-6 rounded-2xl border bg-card group",
                  testimonial.is_approved ? "border-emerald-500/30" : "border-amber-500/30"
                )}
              >
                {/* Status Badge */}
                <Badge 
                  variant="outline" 
                  className={cn(
                    "absolute top-4 right-4",
                    testimonial.is_approved 
                      ? "bg-emerald-500/20 text-emerald-600 border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-600 border-amber-500/30"
                  )}
                >
                  {testimonial.is_approved ? "Genehmigt" : "Ausstehend"}
                </Badge>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-4" />

                {/* Rating */}
                {testimonial.rating && (
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "w-4 h-4",
                          i < testimonial.rating! ? "text-amber-400 fill-amber-400" : "text-muted"
                        )} 
                      />
                    ))}
                  </div>
                )}

                {/* Content */}
                <p className="text-foreground/80 mb-4 line-clamp-4">{testimonial.content}</p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    {testimonial.location && (
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    )}
                    {testimonial.theme && (
                      <Badge variant="secondary" className="mt-2 text-xs">{testimonial.theme}</Badge>
                    )}
                  </div>
                </div>

                {/* Date */}
                {testimonial.submitted_at && (
                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(testimonial.submitted_at).toLocaleDateString('de-CH')}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  {!testimonial.is_approved && (
                    <Button 
                      size="sm" 
                      onClick={() => onApprove(testimonial.id, true)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Genehmigen
                    </Button>
                  )}
                  {testimonial.is_approved && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onApprove(testimonial.id, false)}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Widerrufen
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setDeleteId(testimonial.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="p-12 text-center text-muted-foreground rounded-2xl border border-dashed">
            <Quote className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Keine Testimonials gefunden</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Testimonial löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
