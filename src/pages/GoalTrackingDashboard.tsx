import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Target, TrendingUp, Bell, Plus, Check, AlertTriangle, Calendar, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useGoalTracking } from "@/hooks/useGoalTracking";

const GoalTrackingDashboard = () => {
  const { goals, alerts, loading, markAlertRead, createGoal } = useGoalTracking();
  const [newGoal, setNewGoal] = useState({
    name: '',
    description: '',
    goal_type: 'booking',
    target_value: 10,
    period: 'daily'
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="h-5 w-5" />;
      case 'signup': return <TrendingUp className="h-5 w-5" />;
      case 'gift_card': return <Target className="h-5 w-5" />;
      default: return <BarChart3 className="h-5 w-5" />;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-primary';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleCreateGoal = async () => {
    const success = await createGoal(newGoal);
    if (success) {
      setDialogOpen(false);
      setNewGoal({ name: '', description: '', goal_type: 'booking', target_value: 10, period: 'daily' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const totalGoals = goals.length;
  const achievedGoals = goals.filter(g => g.current_value >= g.target_value).length;
  const onTrackGoals = goals.filter(g => {
    const percentage = (g.current_value / g.target_value) * 100;
    return percentage >= 80 && percentage < 100;
  }).length;

  return (
    <>
      <Helmet>
        <title>Goal Tracking | GentleHands Analytics</title>
        <meta name="description" content="Conversion-Ziele verfolgen und optimieren" />
      </Helmet>
      
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">Goal Tracking</h1>
                <p className="text-muted-foreground mt-1">Conversion-Ziele verwalten und überwachen</p>
              </div>
              
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Neues Ziel
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Neues Conversion-Ziel erstellen</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={newGoal.name}
                        onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                        placeholder="z.B. Tägliche Buchungen"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Beschreibung</label>
                      <Input
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                        placeholder="Kurze Beschreibung"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Typ</label>
                        <Select value={newGoal.goal_type} onValueChange={(v) => setNewGoal({ ...newGoal, goal_type: v })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="booking">Buchungen</SelectItem>
                            <SelectItem value="signup">Anmeldungen</SelectItem>
                            <SelectItem value="gift_card">Gutscheine</SelectItem>
                            <SelectItem value="contact">Kontaktanfragen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Zeitraum</label>
                        <Select value={newGoal.period} onValueChange={(v) => setNewGoal({ ...newGoal, period: v })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Täglich</SelectItem>
                            <SelectItem value="weekly">Wöchentlich</SelectItem>
                            <SelectItem value="monthly">Monatlich</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Zielwert</label>
                      <Input
                        type="number"
                        value={newGoal.target_value}
                        onChange={(e) => setNewGoal({ ...newGoal, target_value: parseInt(e.target.value) })}
                        min={1}
                      />
                    </div>
                    <Button onClick={handleCreateGoal} className="w-full">
                      Ziel erstellen
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Aktive Ziele</p>
                      <p className="text-2xl font-bold">{totalGoals}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Erreicht</p>
                      <p className="text-2xl font-bold">{achievedGoals}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Auf Kurs</p>
                      <p className="text-2xl font-bold">{onTrackGoals}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <Bell className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Alerts</p>
                      <p className="text-2xl font-bold">{alerts.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            {alerts.length > 0 && (
              <Card className="mb-8 border-yellow-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    Aktive Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <span className="text-sm">{alert.message}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAlertRead(alert.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => {
                const percentage = Math.min((goal.current_value / goal.target_value) * 100, 100);
                const isAchieved = goal.current_value >= goal.target_value;
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Card className={isAchieved ? 'border-green-500/50' : ''}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isAchieved ? 'bg-green-500/10' : 'bg-primary/10'}`}>
                              {getGoalIcon(goal.goal_type)}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{goal.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{goal.description}</p>
                            </div>
                          </div>
                          <Badge variant={isAchieved ? 'default' : 'secondary'}>
                            {goal.period === 'daily' ? 'Täglich' : goal.period === 'weekly' ? 'Wöchentlich' : 'Monatlich'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Fortschritt</span>
                            <span className="font-medium">
                              {goal.current_value} / {goal.target_value}
                            </span>
                          </div>
                          <Progress 
                            value={percentage} 
                            className={`h-2 ${getProgressColor(percentage)}`}
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {percentage.toFixed(0)}% erreicht
                            </span>
                            {isAchieved && (
                              <Badge variant="default" className="bg-green-500">
                                <Check className="h-3 w-3 mr-1" />
                                Erreicht
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default GoalTrackingDashboard;
