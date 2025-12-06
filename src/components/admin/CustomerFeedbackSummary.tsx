import { motion } from "framer-motion";
import { MessageSquare, Star, ThumbsUp, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CustomerFeedbackSummaryProps {
  testimonials: any[];
}

export const CustomerFeedbackSummary = ({ testimonials }: CustomerFeedbackSummaryProps) => {
  // Calculate feedback stats
  const totalFeedback = testimonials.length;
  const approved = testimonials.filter(t => t.is_approved).length;
  const pending = testimonials.filter(t => !t.is_approved).length;
  
  // Rating distribution
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;
  let ratedCount = 0;
  
  testimonials.forEach(t => {
    if (t.rating) {
      ratingCounts[t.rating as keyof typeof ratingCounts]++;
      totalRating += t.rating;
      ratedCount++;
    }
  });
  
  const avgRating = ratedCount > 0 ? (totalRating / ratedCount).toFixed(1) : "N/A";

  // Recent feedback
  const recentFeedback = [...testimonials]
    .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
    .slice(0, 3);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Kundenfeedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-muted/30 text-center"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <p className="text-xl font-bold">{avgRating}</p>
            <p className="text-xs text-muted-foreground">Ø Bewertung</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-3 rounded-lg bg-emerald-500/10 text-center"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-emerald-600">{approved}</p>
            <p className="text-xs text-muted-foreground">Genehmigt</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-3 rounded-lg bg-amber-500/10 text-center"
          >
            <Clock className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-amber-600">{pending}</p>
            <p className="text-xs text-muted-foreground">Ausstehend</p>
          </motion.div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Bewertungsverteilung</p>
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingCounts[rating as keyof typeof ratingCounts];
            const percentage = ratedCount > 0 ? (count / ratedCount) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex items-center gap-1 w-12">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs">{rating}</span>
                </div>
                <Progress value={percentage} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground w-8">{count}</span>
              </div>
            );
          })}
        </div>

        {/* Recent Feedback */}
        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-3">Neuestes Feedback</p>
          <div className="space-y-3">
            {recentFeedback.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg bg-muted/20"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{feedback.name}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: feedback.rating || 0 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{feedback.content}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-4 text-muted-foreground text-sm">
            Noch kein Feedback vorhanden
          </div>
        )}
      </CardContent>
    </Card>
  );
};
