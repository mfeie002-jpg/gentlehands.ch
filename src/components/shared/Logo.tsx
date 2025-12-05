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
            {/* Hand outline - gentle caring hand */}
            <path
              d="M20 4C18.5 4 17.2 5.1 17 6.5L16 14C15.8 15.4 14.6 16.5 13.2 16.5H11C9.3 16.5 8 17.8 8 19.5V28C8 31.9 11.1 35 15 35H25C28.9 35 32 31.9 32 28V19.5C32 17.8 30.7 16.5 29 16.5H26.8C25.4 16.5 24.2 15.4 24 14L23 6.5C22.8 5.1 21.5 4 20 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Gentle touch lines */}
            <path
              d="M14 22C14 22 16 24 20 24C24 24 26 22 26 22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-copper/60"
            />
            <circle cx="16" cy="27" r="1" fill="currentColor" className="text-copper/40" />
            <circle cx="20" cy="28" r="1" fill="currentColor" className="text-copper/40" />
            <circle cx="24" cy="27" r="1" fill="currentColor" className="text-copper/40" />
          </svg>
        </motion.div>
      )}
      <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
        Gentle<span className="text-copper">Hands</span>
      </span>
    </div>
  );
};
