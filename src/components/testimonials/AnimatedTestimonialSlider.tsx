import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Pause, Play } from 'lucide-react';
import { LazyImage } from '@/components/shared/LazyImage';

// Import testimonial images
import emotionalContentSmile from '@/assets/emotional-content-smile.jpg';
import emotionalDeepRest from '@/assets/emotional-deep-rest.jpg';
import emotionalInnerPeace from '@/assets/emotional-inner-peace.jpg';
import emotionalFreedom from '@/assets/emotional-freedom.jpg';
import emotionalRelaxedFace from '@/assets/emotional-relaxed-face.jpg';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  quote: string;
  image: string;
  theme?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Zürich',
    rating: 5,
    quote: 'Nach Monaten voller Stress habe ich bei GentleHands endlich wieder zu mir selbst gefunden. Die Atmosphäre ist einzigartig – ich fühlte mich sicher und vollkommen entspannt.',
    image: emotionalContentSmile,
    theme: 'Alpine Stille',
  },
  {
    id: 2,
    name: 'Laura K.',
    location: 'Winterthur',
    rating: 5,
    quote: 'Das Deep Dark Relax Erlebnis war transformativ. In der Dunkelheit konnte ich mich komplett fallen lassen. Die professionelle Betreuung hat mir jede Unsicherheit genommen.',
    image: emotionalDeepRest,
    theme: 'Deep Dark Relax',
  },
  {
    id: 3,
    name: 'Nina B.',
    location: 'Basel',
    rating: 5,
    quote: 'Als Führungskraft habe ich selten Momente nur für mich. GentleHands ist mein monatliches Ritual geworden – ein Ort, wo ich einfach sein darf, ohne Erwartungen.',
    image: emotionalInnerPeace,
    theme: 'Zen Garden',
  },
  {
    id: 4,
    name: 'Elena S.',
    location: 'Luzern',
    rating: 5,
    quote: 'Die Diskretion und Professionalität haben mich beeindruckt. Endlich ein Ort, wo ich mich als Frau vollständig sicher fühle. Die Massage selbst war himmlisch.',
    image: emotionalFreedom,
    theme: 'Ozean & Palmen',
  },
  {
    id: 5,
    name: 'Anna R.',
    location: 'Bern',
    rating: 5,
    quote: 'Ich habe schon viele Wellness-Erlebnisse gebucht, aber GentleHands ist in einer eigenen Liga. Die Atmosphäre, die Berührung, die Aufmerksamkeit – alles perfekt aufeinander abgestimmt.',
    image: emotionalRelaxedFace,
    theme: 'Urban Loft',
  },
];

export const AnimatedTestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-secondary/30 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-copper/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, delay: 5 }}
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
          >
            <Star size={16} className="text-copper fill-copper" />
            <span className="text-copper text-sm font-medium">Kundenstimmen</span>
          </motion.div>
          <h2 className="text-foreground mb-4">Was unsere Kundinnen sagen</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Echte Erfahrungen von Frauen, die bei GentleHands tiefe Entspannung gefunden haben.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="relative min-h-[400px] sm:min-h-[350px]">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative"
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-copper/10 aspect-[4/3]">
                        <LazyImage
                          src={currentTestimonial.image}
                          alt={`${currentTestimonial.name} Erfahrung`}
                          className="w-full h-full object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        
                        {/* Theme Badge */}
                        {currentTestimonial.theme && (
                          <div className="absolute bottom-4 left-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground">
                              {currentTestimonial.theme}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Quote Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative"
                    >
                      {/* Quote Icon */}
                      <div className="absolute -top-4 -left-2 w-12 h-12 rounded-full bg-copper/10 flex items-center justify-center">
                        <Quote size={24} className="text-copper" />
                      </div>

                      <div className="pl-8 pt-8">
                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(currentTestimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + i * 0.1 }}
                            >
                              <Star size={18} className="text-copper fill-copper" />
                            </motion.div>
                          ))}
                        </div>

                        {/* Quote Text */}
                        <blockquote className="text-foreground text-lg sm:text-xl font-display leading-relaxed mb-6">
                          "{currentTestimonial.quote}"
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center">
                            <span className="text-copper font-medium text-sm">
                              {currentTestimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{currentTestimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{currentTestimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {/* Arrows */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-secondary border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-copper/50 transition-colors"
                  aria-label="Vorheriges Testimonial"
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-secondary border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-copper/50 transition-colors"
                  aria-label="Nächstes Testimonial"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-copper'
                        : 'w-2 bg-border hover:bg-muted-foreground'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    aria-label={`Testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Autoplay Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="w-10 h-10 rounded-full bg-secondary border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-copper/50 transition-colors"
                aria-label={isAutoPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
              >
                {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
