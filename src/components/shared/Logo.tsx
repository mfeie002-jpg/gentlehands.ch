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
            {/* Minimalist Lotus Flower */}
            {/* Center petal */}
            <path
              d="M20 8C20 8 17 16 17 22C17 26 18.5 28 20 28C21.5 28 23 26 23 22C23 16 20 8 20 8Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Left inner petal */}
            <path
              d="M14 12C14 12 12 18 13 23C13.5 26 15 27 16.5 26C18 25 18 22 17 18C16 14 14 12 14 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="text-copper/80"
            />
            {/* Right inner petal */}
            <path
              d="M26 12C26 12 28 18 27 23C26.5 26 25 27 23.5 26C22 25 22 22 23 18C24 14 26 12 26 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="text-copper/80"
            />
            {/* Left outer petal */}
            <path
              d="M8 16C8 16 8 22 10 26C11.5 29 13 29 14 27.5C15 26 14 23 12 20C10 17 8 16 8 16Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="text-copper/60"
            />
            {/* Right outer petal */}
            <path
              d="M32 16C32 16 32 22 30 26C28.5 29 27 29 26 27.5C25 26 26 23 28 20C30 17 32 16 32 16Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="text-copper/60"
            />
            {/* Base/water line */}
            <path
              d="M10 32C14 30 17 29 20 29C23 29 26 30 30 32"
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
