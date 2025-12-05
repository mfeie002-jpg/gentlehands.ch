import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", showIcon = true, size = "md" }: LogoProps) => {
  const sizes = {
    sm: { text: "text-xl", icon: 20 },
    md: { text: "text-2xl md:text-3xl", icon: 28 },
    lg: { text: "text-3xl md:text-4xl", icon: 36 },
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && (
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <svg
            width={sizes[size].icon}
            height={sizes[size].icon}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-copper"
          >
            {/* Two gentle hands cupping/holding - symbolizing care */}
            {/* Left hand */}
            <path
              d="M8 20C8 20 6 18 6 15C6 12 8 10 10 10C10 10 11 12 12 14C13 16 14 18 14 20C14 22 13 24 12 25C11 26 10 26 10 26"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Right hand */}
            <path
              d="M32 20C32 20 34 18 34 15C34 12 32 10 30 10C30 10 29 12 28 14C27 16 26 18 26 20C26 22 27 24 28 25C29 26 30 26 30 26"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Connecting gentle curve - the "held" space */}
            <path
              d="M10 26C10 26 14 30 20 30C26 30 30 26 30 26"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="text-copper/70"
            />
            {/* Soft energy/warmth emanating from center */}
            <circle cx="20" cy="22" r="3" stroke="currentColor" strokeWidth="1" fill="none" className="text-copper/40" />
            <circle cx="20" cy="22" r="6" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-copper/20" />
          </svg>
        </motion.div>
      )}
      <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
        Gentle<span className="text-copper">Hands</span>
      </span>
    </div>
  );
};
