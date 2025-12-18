import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ConversionGoal {
  id: string;
  name: string;
  description: string | null;
  goal_type: string;
  target_value: number;
  current_value: number;
  period: string;
  alert_threshold: number | null;
  is_active: boolean;
  created_at: string;
}

interface GoalHistory {
  id: string;
  goal_id: string;
  period_start: string;
  period_end: string;
  target_value: number;
  achieved_value: number;
  percentage_achieved: number | null;
}

interface GoalAlert {
  id: string;
  goal_id: string;
  alert_type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const useGoalTracking = () => {
  const [goals, setGoals] = useState<ConversionGoal[]>([]);
  const [alerts, setAlerts] = useState<GoalAlert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = useCallback(async () => {
    const { data, error } = await supabase
      .from('conversion_goals')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setGoals(data);
    }
  }, []);

  const fetchAlerts = useCallback(async () => {
    const { data, error } = await supabase
      .from('goal_alerts')
      .select('*')
      .eq('is_read', false)
      .order('created_at', { ascending: false })
      .limit(10);

    if (!error && data) {
      setAlerts(data);
    }
  }, []);

  const updateGoalProgress = useCallback(async (goalType: string, increment: number = 1) => {
    const goal = goals.find(g => g.goal_type === goalType);
    if (!goal) return;

    const newValue = goal.current_value + increment;
    
    await supabase
      .from('conversion_goals')
      .update({ 
        current_value: newValue,
        updated_at: new Date().toISOString()
      })
      .eq('id', goal.id);

    // Check if goal achieved
    if (newValue >= goal.target_value) {
      await supabase.from('goal_alerts').insert({
        goal_id: goal.id,
        alert_type: 'goal_achieved',
        message: `🎉 Ziel "${goal.name}" erreicht! (${newValue}/${goal.target_value})`
      });
    }

    fetchGoals();
    fetchAlerts();
  }, [goals, fetchGoals, fetchAlerts]);

  const markAlertRead = useCallback(async (alertId: string) => {
    await supabase
      .from('goal_alerts')
      .update({ is_read: true })
      .eq('id', alertId);
    
    fetchAlerts();
  }, [fetchAlerts]);

  const createGoal = useCallback(async (goal: Partial<ConversionGoal>) => {
    const { error } = await supabase
      .from('conversion_goals')
      .insert([goal as any]);

    if (!error) {
      fetchGoals();
    }
    return !error;
  }, [fetchGoals]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchGoals(), fetchAlerts()]);
      setLoading(false);
    };
    loadData();
  }, [fetchGoals, fetchAlerts]);

  return {
    goals,
    alerts,
    loading,
    updateGoalProgress,
    markAlertRead,
    createGoal,
    refetch: fetchGoals
  };
};
