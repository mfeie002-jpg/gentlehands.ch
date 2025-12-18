import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX, Maximize, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingTherapistVideoProps {
  therapistName: string;
  videoUrl?: string | null;
  photoUrl?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingTherapistVideo = ({
  therapistName,
  videoUrl,
  photoUrl,
  isOpen,
  onClose,
}: BookingTherapistVideoProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const videoContainer = document.getElementById('video-container');
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            id="video-container"
            className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center gap-3">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={therapistName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                )}
                <div>
                  <h3 className="font-display text-white text-lg">{therapistName}</h3>
                  <p className="text-white/70 text-xs">Video-Vorstellung</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              {videoUrl ? (
                <video
                  src={videoUrl}
                  autoPlay
                  muted={isMuted}
                  controls={false}
                  className="w-full h-full object-cover"
                  playsInline
                />
              ) : (
                // Placeholder when no video available
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-copper/20 to-petrol/20">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={therapistName}
                      className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-white/20"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
                      <User size={48} className="text-muted-foreground" />
                    </div>
                  )}
                  <p className="text-muted-foreground text-center px-4">
                    Video-Vorstellung kommt bald für {therapistName}
                  </p>
                </div>
              )}
            </div>

            {/* Controls */}
            {videoUrl && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX size={18} className="text-white" />
                      ) : (
                        <Volume2 size={18} className="text-white" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={toggleFullscreen}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <Maximize size={18} className="text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="p-4 border-t border-border">
              <Button
                onClick={onClose}
                className="w-full bg-copper hover:bg-copper/90"
              >
                {therapistName} auswählen
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Small video play button for therapist cards
interface VideoPlayButtonProps {
  onClick: () => void;
  hasVideo: boolean;
}

export const TherapistVideoPlayButton = ({ onClick, hasVideo }: VideoPlayButtonProps) => {
  if (!hasVideo) return null;

  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors group"
    >
      <Play size={14} className="text-white ml-0.5 group-hover:text-copper transition-colors" />
    </motion.button>
  );
};
