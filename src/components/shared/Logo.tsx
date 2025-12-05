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
            {/* Elegant open palm with fingers - massage hand */}
            {/* Palm base */}
            <path
              d="M12 32C10 30 9 27 9 24C9 21 10 19 12 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Thumb */}
            <path
              d="M12 17C12 17 10 15 10 13C10 11 11 10 13 10C15 10 16 12 16 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Index finger */}
            <path
              d="M16 14L17 8C17 6 18 5 20 5C22 5 23 6 23 8L23 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Middle finger */}
            <path
              d="M23 12L24 6C24 4 25 3 27 3C29 3 30 4 30 6L29 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Ring finger */}
            <path
              d="M29 13L30 8C30 6 31 5 32 6C33 7 33 9 32 11L31 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Palm connection */}
            <path
              d="M16 14C16 16 15 18 14 20C13 22 12 26 12 32"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Wrist to palm */}
            <path
              d="M31 16C31 19 30 22 28 25C26 28 22 32 12 32"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Healing energy lines */}
            <path
              d="M18 20C19 19 21 19 22 20"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              className="text-copper/50"
            />
            <path
              d="M17 24C19 22 22 22 24 24"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              className="text-copper/40"
            />
          </svg>
        </motion.div>
      )}
      <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
        Gentle<span className="text-copper">Hands</span>
      </span>
    </div>
  );
};
