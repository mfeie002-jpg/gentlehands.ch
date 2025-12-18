import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Variant {
  id: string;
  name: string;
  weight: number;
}

interface ABTest {
  id: string;
  name: string;
  description: string;
  test_type: string;
  variants: Variant[];
  is_active: boolean;
}

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('ab_test_session_id');
  if (!sessionId) {
    sessionId = `ab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('ab_test_session_id', sessionId);
  }
  return sessionId;
};

const getStoredVariant = (testType: string): string | null => {
  return localStorage.getItem(`ab_variant_${testType}`);
};

const storeVariant = (testType: string, variantId: string) => {
  localStorage.setItem(`ab_variant_${testType}`, variantId);
};

const selectVariant = (variants: Variant[]): Variant => {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  const random = Math.random() * totalWeight;
  
  let cumulative = 0;
  for (const variant of variants) {
    cumulative += variant.weight;
    if (random <= cumulative) {
      return variant;
    }
  }
  
  return variants[0];
};

export const useABTest = (testType: string) => {
  const [variant, setVariant] = useState<string | null>(null);
  const [test, setTest] = useState<ABTest | null>(null);
  const [loading, setLoading] = useState(true);
  const sessionId = getSessionId();

  useEffect(() => {
    const initTest = async () => {
      // Check for stored variant first
      const storedVariant = getStoredVariant(testType);
      if (storedVariant) {
        setVariant(storedVariant);
        setLoading(false);
        return;
      }

      try {
        // Fetch active test
        const { data: testData, error } = await supabase
          .from('ab_tests')
          .select('*')
          .eq('test_type', testType)
          .eq('is_active', true)
          .single();

        if (error || !testData) {
          setVariant('control');
          setLoading(false);
          return;
        }

        const testObj: ABTest = {
          ...testData,
          variants: testData.variants as unknown as Variant[]
        };
        setTest(testObj);
        
        // Select and store variant
        const variants = testData.variants as unknown as Variant[];
        const selected = selectVariant(variants);
        setVariant(selected.id);
        storeVariant(testType, selected.id);

        // Record participation
        await supabase.from('ab_test_results').insert({
          test_id: testData.id,
          session_id: sessionId,
          variant_id: selected.id,
          converted: false,
        });

        console.log(`🧪 A/B Test "${testType}": assigned to "${selected.id}"`);
      } catch (err) {
        console.error('A/B test init error:', err);
        setVariant('control');
      }

      setLoading(false);
    };

    initTest();
  }, [testType, sessionId]);

  const trackConversion = useCallback(async (value?: number, conversionType?: string) => {
    if (!test || !variant) return;

    try {
      await supabase
        .from('ab_test_results')
        .update({
          converted: true,
          conversion_value: value,
          conversion_type: conversionType,
        })
        .eq('test_id', test.id)
        .eq('session_id', sessionId)
        .eq('variant_id', variant);

      console.log(`✅ A/B conversion tracked: ${testType} / ${variant}`);
    } catch (err) {
      console.error('Failed to track conversion:', err);
    }
  }, [test, variant, sessionId, testType]);

  const isVariant = useCallback((variantId: string) => {
    return variant === variantId;
  }, [variant]);

  return {
    variant,
    test,
    loading,
    trackConversion,
    isVariant,
    isControl: variant === 'control',
  };
};

// Hook to get all A/B test results for analytics
export const useABTestResults = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data: tests } = await supabase
          .from('ab_tests')
          .select('*')
          .eq('is_active', true);

        if (!tests) {
          setLoading(false);
          return;
        }

        const testResults = await Promise.all(
          tests.map(async (test) => {
            const { data: resultData } = await supabase
              .from('ab_test_results')
              .select('*')
              .eq('test_id', test.id);

            const variants = test.variants as unknown as Variant[];
            const variantStats = variants.map((v) => {
              const variantResults = resultData?.filter(r => r.variant_id === v.id) || [];
              const conversions = variantResults.filter(r => r.converted).length;
              const total = variantResults.length;
              const rate = total > 0 ? ((conversions / total) * 100).toFixed(2) : '0';
              const totalValue = variantResults.reduce((sum, r) => sum + (r.conversion_value || 0), 0);

              return {
                ...v,
                total,
                conversions,
                conversionRate: parseFloat(rate),
                totalValue,
              };
            });

            return {
              ...test,
              variantStats,
              totalParticipants: resultData?.length || 0,
              totalConversions: resultData?.filter(r => r.converted).length || 0,
            };
          })
        );

        setResults(testResults);
      } catch (err) {
        console.error('Failed to fetch A/B results:', err);
      }
      setLoading(false);
    };

    fetchResults();
  }, []);

  return { results, loading };
};
