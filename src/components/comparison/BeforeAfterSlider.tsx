import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Sparkles } from 'lucide-react';
import { LazyImage } from '@/components/shared/LazyImage';

// Import before/after images
import emotionalStressRelease from '@/assets/emotional-stress-release.jpg';
import emotionalDeepRest from '@/assets/emotional-deep-rest.jpg';
import emotionalBodyAwareness from '@/assets/emotional-body-awareness.jpg';
import emotionalInnerPeace from '@/assets/emotional-inner-peace.jpg';

interface Comparison {
  id: string;
  title: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

const comparisons: Comparison[] = [
  {
    id: 'stress',
    title: 'Von Anspannung zu Entspannung',
    beforeLabel: 'Vor der Session',
    afterLabel: 'Nach der Session',
    beforeImage: emotionalStressRelease,
    afterImage: emotionalDeepRest,
    description: 'Spüren Sie, wie die Anspannung weicht und tiefe Entspannung einkehrt.',
  },
  {
    id: 'awareness',
    title: 'Körperbewusstsein erwacht',
    beforeLabel: 'Angespannt',
    afterLabel: 'Gelöst',
    beforeImage: emotionalBodyAwareness,
    afterImage: emotionalInnerPeace,
    description: 'Entdecken Sie ein neues Bewusstsein für Ihren Körper und Ihre Bedürfnisse.',
  },
];

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

const BeforeAfterSliderControl = ({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  }, [isDragging, updateSliderPosition]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-xl"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <LazyImage
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <LazyImage
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
          <ArrowLeftRight size={20} className="text-copper" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white">
        {beforeLabel}
      </div>
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-copper/90 backdrop-blur-sm text-xs text-white">
        {afterLabel}
      </div>

      {/* Drag Hint */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isDragging ? 0 : 1 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white/80"
      >
        ↔ Ziehen zum Vergleichen
      </motion.div>
    </div>
  );
};

export const BeforeAfterSlider = () => {
  const [activeComparison, setActiveComparison] = useState(0);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-copper/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
          >
            <Sparkles size={16} className="text-copper" />
            <span className="text-copper text-sm font-medium">Transformation</span>
          </motion.div>
          <h2 className="text-foreground mb-4">Erleben Sie den Unterschied</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sehen Sie selbst, wie eine GentleHands-Session Körper und Geist transformiert. 
            Ziehen Sie den Slider, um den Vorher-Nachher-Vergleich zu sehen.
          </p>
        </motion.div>

        {/* Comparison Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {comparisons.map((comparison, index) => (
            <motion.button
              key={comparison.id}
              onClick={() => setActiveComparison(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                index === activeComparison
                  ? 'bg-copper text-accent-foreground shadow-lg shadow-copper/20'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {comparison.title}
            </motion.button>
          ))}
        </div>

        {/* Slider */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            key={activeComparison}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BeforeAfterSliderControl
              beforeImage={comparisons[activeComparison].beforeImage}
              afterImage={comparisons[activeComparison].afterImage}
              beforeLabel={comparisons[activeComparison].beforeLabel}
              afterLabel={comparisons[activeComparison].afterLabel}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-muted-foreground mt-6"
            >
              {comparisons[activeComparison].description}
            </motion.p>
          </motion.div>
        </div>

        {/* Trust Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-xs text-muted-foreground/60">
            Die Bilder illustrieren die emotionale Transformation durch professionelle Entspannungsmassagen.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
