import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { text: "text-xl", icon: 32 },
  md: { text: "text-2xl md:text-3xl", icon: 40 },
  lg: { text: "text-3xl md:text-4xl", icon: 52 },
};

// Option A: Flowing GH Monogram (elegant, sophisticated)
export const LogoOptionA = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* G flowing into H - single elegant stroke */}
        <path
          d="M12 16C8 16 4 20 4 26C4 32 8 36 14 36C18 36 22 34 22 30V24H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* H with soft curves */}
        <path
          d="M30 14V38M30 26C32 24 36 24 40 24M40 14V38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Connecting flourish */}
        <path
          d="M22 30C24 32 27 30 30 26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="text-copper/60"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option B: Crescent Embrace (rest, peace, being held)
export const LogoOptionB = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Outer crescent - embracing */}
        <path
          d="M40 10C28 10 18 20 18 32C18 36 20 40 24 44"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner warmth */}
        <circle
          cx="32"
          cy="28"
          r="8"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-copper/70"
        />
        {/* Small highlight - spark of wellness */}
        <circle
          cx="32"
          cy="28"
          r="2"
          fill="currentColor"
          className="text-copper/50"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option C: Single Line Touch (minimalist, continuous care)
export const LogoOptionC = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Single continuous line - human form receiving touch */}
        <path
          d="M10 40C10 40 14 32 18 28C22 24 24 20 26 16C28 12 30 10 32 10C36 10 38 14 38 20C38 28 34 36 26 42C22 45 16 46 12 44"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option D: Water Drop Release (relief, letting go)
export const LogoOptionD = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Drop shape - release, relief */}
        <path
          d="M26 6C26 6 14 22 14 32C14 40 19 46 26 46C33 46 38 40 38 32C38 22 26 6 26 6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner ripple - spreading calm */}
        <path
          d="M26 22C26 22 22 28 22 32C22 36 24 38 26 38C28 38 30 36 30 32C30 28 26 22 26 22Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          className="text-copper/50"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground italic`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option E: Feather Light (softness, gentle touch)
export const LogoOptionE = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Feather spine */}
        <path
          d="M40 8C32 16 24 28 16 44"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left barbs */}
        <path
          d="M40 8C36 10 32 14 30 18M36 14C32 16 28 20 26 24M32 20C28 22 24 26 22 30M28 26C24 28 20 32 18 36"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          className="text-copper/70"
        />
        {/* Right barbs */}
        <path
          d="M40 8C42 12 42 18 40 22M36 14C38 18 38 24 36 28M32 20C34 24 34 30 32 34M28 26C30 30 30 36 28 40"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          className="text-copper/70"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-widest uppercase text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

