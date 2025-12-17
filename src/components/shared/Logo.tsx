import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", showIcon = true, size = "md" }: LogoProps) => {
  const sizes = {
    sm: { text: "text-xl", icon: 28 },
    md: { text: "text-2xl md:text-3xl", icon: 36 },
    lg: { text: "text-3xl md:text-4xl", icon: 44 },
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
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-copper"
          >
            {/* Open Palm - welcoming, giving */}
            <path
              d="M28 8C28 8 26 6 24 6C22 6 20 8 20 10V24
                 M20 10C20 10 18 8 16 8C14 8 12 10 12 12V26
                 M28 8V28
                 M28 8C28 8 30 6 32 6C34 6 36 8 36 10V24
                 M36 10C36 10 38 8 40 8C42 8 44 10 44 12V26
                 M12 26C12 34 18 44 28 48C38 44 44 34 44 26"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
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
