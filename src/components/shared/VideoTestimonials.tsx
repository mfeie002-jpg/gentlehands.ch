import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, X, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { LazyImage } from "./LazyImage";

// Import emotional images
import emotionalContentSmile from "@/assets/emotional-content-smile.jpg";
import emotionalDeepRest from "@/assets/emotional-deep-rest.jpg";
import emotionalInnerPeace from "@/assets/emotional-inner-peace.jpg";
import emotionalRelaxedFace from "@/assets/emotional-relaxed-face.jpg";

interface VideoTestimonial {
  id: number;
  name: string;
  age: number;
  location: string;
  theme: string;
  quote: string;
  beforeText: string;
  afterText: string;
  videoThumbnail: string;
  duration: string;
  rating: number;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: 1,
    name: "Sandra M.",
    age: 42,
    location: "Zürich",
    theme: "Ozean & Palmen",
    quote: "Nach 15 Jahren Dauerstress habe ich endlich wieder gelernt, loszulassen.",
    beforeText: "Chronische Verspannungen, Schlafprobleme",
    afterText: "Tiefe Entspannung, besserer Schlaf",
    videoThumbnail: emotionalContentSmile,
    duration: "2:34",
    rating: 5,
  },
  {
    id: 2,
    name: "Claudia B.",
    age: 38,
    location: "Winterthur",
    theme: "Alpine Stille",
    quote: "Ich dachte, ich müsste immer stark sein. Hier durfte ich einfach sein.",
    beforeText: "Burnout-Symptome, emotionale Erschöpfung",
    afterText: "Emotionale Balance, Selbstfürsorge",
    videoThumbnail: emotionalDeepRest,
    duration: "3:12",
    rating: 5,
  },
  {
    id: 3,
    name: "Nina K.",
    age: 35,
    location: "Zürich",
    theme: "Deep Dark Relax",
    quote: "Die Dunkelheit half mir, endlich loszulassen.",
    beforeText: "Gedankenkarussell, nie abschalten können",
    afterText: "Mentale Klarheit, innere Ruhe",
    videoThumbnail: emotionalInnerPeace,
    duration: "4:05",
    rating: 5,
  },
  {
    id: 4,
    name: "Elisabeth R.",
    age: 47,
    location: "Luzern",
    theme: "Urban Loft",
    quote: "GentleHands hat mir die Ruhe zurückgegeben.",
    beforeText: "Körperliche Beschwerden, Stress",
    afterText: "Körperliches Wohlbefinden, Lebensfreude",
    videoThumbnail: emotionalRelaxedFace,
    duration: "2:58",
    rating: 5,
  },
];

export const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openVideo = (video: VideoTestimonial) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  const closeVideo = () => {
    setActiveVideo(null);
    setIsPlaying(false);
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videoTestimonials.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-copper/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-petrol/5 rounded-full blur-[150px]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-copper/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper uppercase tracking-[0.3em] text-xs font-medium">
              Video-Erfahrungen
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-4">
            Stimmen unserer <span className="text-gradient-copper">Kundinnen</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hören Sie direkt von Frauen, die GentleHands erlebt haben.
          </p>
        </motion.div>

        {/* Featured Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mb-12"
        >
          <div className="relative aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden group cursor-pointer"
               onClick={() => openVideo(videoTestimonials[currentIndex])}>
            {/* Video Thumbnail */}
            <LazyImage
              src={videoTestimonials[currentIndex].videoThumbnail}
              alt={videoTestimonials[currentIndex].name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 w-24 h-24 -m-4 rounded-full border-2 border-copper/50"
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 w-24 h-24 -m-4 rounded-full border-2 border-copper/30"
                  animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                
                <div className="w-16 h-16 rounded-full bg-copper flex items-center justify-center shadow-lg shadow-copper/30">
                  <Play className="w-7 h-7 text-background ml-1" />
                </div>
              </motion.div>
            </div>
            
            {/* Video Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Quote className="w-5 h-5 text-copper" />
                    <span className="text-copper text-sm font-medium">
                      {videoTestimonials[currentIndex].theme}
                    </span>
                  </div>
                  <p className="text-white text-xl font-display mb-2">
                    "{videoTestimonials[currentIndex].quote}"
                  </p>
                  <p className="text-white/70">
                    {videoTestimonials[currentIndex].name}, {videoTestimonials[currentIndex].age} – {videoTestimonials[currentIndex].location}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(videoTestimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-copper text-copper" />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Duration badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-foreground/50 backdrop-blur text-white text-sm">
              {videoTestimonials[currentIndex].duration}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevVideo(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextVideo(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {videoTestimonials.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer group ${
                index === currentIndex ? 'ring-2 ring-copper' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <LazyImage
                src={video.videoThumbnail}
                alt={video.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-colors" />
              
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-copper/90 flex items-center justify-center">
                  <Play className="w-4 h-4 text-background ml-0.5" />
                </div>
              </div>
              
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent">
                <p className="text-white text-sm font-medium truncate">{video.name}</p>
                <p className="text-white/60 text-xs">{video.duration}</p>
              </div>
              
              {/* Active indicator */}
              {index === currentIndex && (
                <motion.div
                  layoutId="activeVideo"
                  className="absolute inset-0 border-2 border-copper rounded-xl"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-muted rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video player placeholder with real thumbnail */}
              <LazyImage
                src={activeVideo.videoThumbnail}
                alt={activeVideo.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/40">
                <p className="text-white text-lg mb-2">Video-Testimonial</p>
                <p className="text-copper">{activeVideo.name} – {activeVideo.theme}</p>
              </div>
              
              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-copper flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-background" />
                      ) : (
                        <Play className="w-5 h-5 text-background ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1 h-1 bg-white/20 rounded-full max-w-xs">
                      <motion.div
                        className="h-full bg-copper rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: isPlaying ? "100%" : "0%" }}
                        transition={{ duration: 180, ease: "linear" }}
                      />
                    </div>
                    <span className="text-white text-sm">{activeVideo.duration}</span>
                  </div>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {/* Close button */}
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/50 backdrop-blur flex items-center justify-center text-white hover:bg-foreground/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
