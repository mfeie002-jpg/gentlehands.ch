import { ReactNode } from "react";

interface VideoBackgroundProps {
  children: ReactNode;
  videoUrl?: string;
  posterUrl?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  className?: string;
}

export const VideoBackground = ({
  children,
  videoUrl,
  posterUrl,
  overlay = true,
  overlayOpacity = 60,
  className = "",
}: VideoBackgroundProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterUrl}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-secondary"
          style={posterUrl ? { backgroundImage: `url(${posterUrl})` } : {}}
        >
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            [Video-Platzhalter]
          </div>
        </div>
      )}
      
      {overlay && (
        <div 
          className="absolute inset-0 bg-foreground"
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
