import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface MassageVideoPreviewProps {
  massageTitle: string;
  imageUrl: string;
  isSelected: boolean;
  onSelect: () => void;
  onShowDetails: () => void;
}

// Video URLs for each massage type (using placeholder videos)
const massageVideos: Record<string, string> = {
  "Deep Release Session": "https://videos.pexels.com/video-files/3188358/3188358-hd_1920_1080_30fps.mp4",
  "Stress Reset": "https://videos.pexels.com/video-files/3188378/3188378-hd_1920_1080_30fps.mp4",
  "Emotional Grounding": "https://videos.pexels.com/video-files/3188348/3188348-hd_1920_1080_30fps.mp4",
  "Ganzkörper Tiefenentspannung": "https://videos.pexels.com/video-files/4108696/4108696-hd_1280_720_24fps.mp4",
  "Aromatherapie": "https://videos.pexels.com/video-files/3188367/3188367-hd_1920_1080_30fps.mp4",
  "Hot Stone": "https://videos.pexels.com/video-files/5014873/5014873-hd_1920_1080_24fps.mp4",
  "Klangtherapie": "https://videos.pexels.com/video-files/3188358/3188358-hd_1920_1080_30fps.mp4",
  "Swedish Massage": "https://videos.pexels.com/video-files/3188378/3188378-hd_1920_1080_30fps.mp4",
  "Tiefenentspannung": "https://videos.pexels.com/video-files/4108696/4108696-hd_1280_720_24fps.mp4",
};

export const MassageVideoPreview = ({
  massageTitle,
  imageUrl,
  isSelected,
  onSelect,
  onShowDetails
}: MassageVideoPreviewProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const videoUrl = massageVideos[massageTitle];

  useEffect(() => {
    if (isHovering && videoRef.current && videoLoaded) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else if (!isHovering && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovering, videoLoaded]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovering(false);
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static Image */}
      <img
        src={imageUrl}
        alt={massageTitle}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
          isHovering && videoLoaded ? "opacity-0" : "opacity-100"
        )}
      />
      
      {/* Video Preview */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            isHovering && videoLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      
      {/* Play indicator on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovering && !videoLoaded ? 1 : 0, 
          scale: isHovering && !videoLoaded ? 1 : 0.8 
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Play size={20} className="text-white ml-0.5" />
        </div>
      </motion.div>

      {/* Info button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        onClick={(e) => {
          e.stopPropagation();
          onShowDetails();
        }}
        className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-20"
        aria-label="Details anzeigen"
      >
        <Info size={16} className="text-foreground" />
      </motion.button>
    </div>
  );
};
