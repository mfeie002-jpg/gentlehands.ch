import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { text: "text-xl", icon: 28 },
  md: { text: "text-2xl md:text-3xl", icon: 36 },
  lg: { text: "text-3xl md:text-4xl", icon: 44 },
};

// Option 1: Cupped Hands (caring, protective)
export const LogoOption1 = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Left hand cupping */}
        <path
          d="M8 28C8 28 6 22 8 16C10 10 14 8 18 10C20 11 21 14 20 18C19 22 16 26 14 30C12 34 10 36 8 36"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Right hand cupping */}
        <path
          d="M40 28C40 28 42 22 40 16C38 10 34 8 30 10C28 11 27 14 28 18C29 22 32 26 34 30C36 34 38 36 40 36"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Heart/essence in center */}
        <path
          d="M24 20C22 18 19 18 18 20C16 23 18 26 24 32C30 26 32 23 30 20C29 18 26 18 24 20Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="text-copper/70"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option 2: Single Elegant Hand (minimal, refined)
export const LogoOption2 = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Elegant open palm */}
        <path
          d="M16 38C14 36 13 32 14 28L16 20C16 18 17 16 19 16C21 16 22 18 22 20L22 14C22 12 23 10 25 10C27 10 28 12 28 14L28 12C28 10 29 8 31 8C33 8 34 10 34 12L34 14C34 12 35 10 37 10C39 10 40 12 40 14L40 28C40 34 36 40 30 42C26 43 20 42 16 38Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Thumb */}
        <path
          d="M16 20C14 20 12 22 12 24C12 26 13 28 14 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Gentle glow/aura */}
        <circle
          cx="26"
          cy="26"
          r="18"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="2 4"
          fill="none"
          className="text-copper/30"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option 3: Two Hands Together (connection, care)
export const LogoOption3 = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Left hand reaching */}
        <path
          d="M6 24C6 24 10 20 14 18C18 16 20 18 20 22C20 26 18 30 14 32C10 34 6 32 6 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Right hand reaching */}
        <path
          d="M42 24C42 24 38 20 34 18C30 16 28 18 28 22C28 26 30 30 34 32C38 34 42 32 42 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Touch point - energy */}
        <circle
          cx="24"
          cy="22"
          r="3"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Radiating lines */}
        <path
          d="M24 16V14M24 30V28M20 22H18M30 22H28"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="text-copper/50"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option 4: Hand with Flowing Lines (therapeutic, movement)
export const LogoOption4 = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Stylized hand silhouette */}
        <path
          d="M18 40C16 38 14 34 14 30C14 26 16 22 18 18C20 14 24 10 28 10C32 10 36 14 36 20C36 26 32 32 28 36C24 40 20 42 18 40Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Flowing therapeutic lines */}
        <path
          d="M10 22C14 20 18 22 22 20"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="text-copper/60"
        />
        <path
          d="M8 28C12 26 16 28 20 26"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="text-copper/50"
        />
        <path
          d="M10 34C14 32 18 34 22 32"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="text-copper/40"
        />
        {/* Fingers suggestion */}
        <path
          d="M28 14L30 10M32 16L35 13M34 20L38 18"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="text-copper/70"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option 5: Abstract Hand Circle (holistic, wellness)
export const LogoOption5 = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Outer circle */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          className="text-copper/30"
        />
        {/* Hand forming around center */}
        <path
          d="M16 32C14 28 14 24 16 20C18 16 22 14 24 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M32 32C34 28 34 24 32 20C30 16 26 14 24 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Palm curves meeting */}
        <path
          d="M16 32C18 36 22 38 24 38C26 38 30 36 32 32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Center dot - essence */}
        <circle
          cx="24"
          cy="26"
          r="2"
          fill="currentColor"
          className="text-copper/80"
        />
        {/* Finger tips at top */}
        <path
          d="M20 12L20 8M24 10L24 6M28 12L28 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-copper/60"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option 6: Embracing Circle (completeness, wholeness)
export const LogoOption6 = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Embracing arms forming circle */}
        <path
          d="M12 24C12 17 17 12 24 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M24 12C31 12 36 17 36 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M36 24C36 31 31 36 24 36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="text-copper/80"
        />
        <path
          d="M24 36C17 36 12 31 12 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="text-copper/80"
        />
        {/* Gentle hands at connection points */}
        <circle cx="12" cy="24" r="2" fill="currentColor" className="text-copper/60" />
        <circle cx="36" cy="24" r="2" fill="currentColor" className="text-copper/60" />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option 7: Breath/Wave (relaxation, flow)
export const LogoOption7 = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Flowing breath waves */}
        <path
          d="M8 20C12 16 16 24 24 24C32 24 36 16 40 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 28C12 24 16 32 24 32C32 32 36 24 40 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="text-copper/70"
        />
        {/* Soft hand cradling */}
        <path
          d="M16 36C20 38 28 38 32 36"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="text-copper/50"
        />
      </svg>
    </motion.div>
    <div className="flex flex-col">
      <span className={`font-display ${sizes[size].text} tracking-tight text-foreground leading-none`}>
        gentle
      </span>
      <span className={`font-display ${sizes[size].text} tracking-tight text-copper leading-none`}>
        hands
      </span>
    </div>
  </div>
);

// Option 8: Infinity Touch (continuous care, satisfaction)
export const LogoOption8 = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Infinity symbol with hand-like curves */}
        <path
          d="M14 24C14 20 10 16 6 20C2 24 6 28 10 28C14 28 18 24 24 24C30 24 34 28 38 28C42 28 46 24 42 20C38 16 34 20 34 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Center touch point */}
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-wide text-foreground`}>
      GENTLE<span className="text-copper">HANDS</span>
    </span>
  </div>
);

// Option 9: Nested Comfort (safety, held feeling)
export const LogoOption9 = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Outer protective curve */}
        <path
          d="M8 32C8 18 16 8 24 8C32 8 40 18 40 32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="text-copper/40"
        />
        {/* Middle embrace */}
        <path
          d="M12 32C12 22 17 14 24 14C31 14 36 22 36 32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="text-copper/70"
        />
        {/* Inner core - being held */}
        <path
          d="M16 32C16 26 19 20 24 20C29 20 32 26 32 32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Base - grounding */}
        <path
          d="M8 32H40"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="text-copper/30"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-copper`}>
      gentle<span className="text-foreground">hands</span>
    </span>
  </div>
);

// Option 10: Soft Touch Fingerprint (unique, personal connection)
export const LogoOption10 = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-copper"
      >
        {/* Fingerprint-inspired gentle curves */}
        <path
          d="M24 8C24 8 24 14 24 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-copper/40"
        />
        <path
          d="M18 12C18 12 18 18 20 24C22 30 24 34 24 40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-copper/60"
        />
        <path
          d="M30 12C30 12 30 18 28 24C26 30 24 34 24 40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-copper/60"
        />
        <path
          d="M14 18C14 18 14 24 18 30C22 36 24 38 24 40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-copper/80"
        />
        <path
          d="M34 18C34 18 34 24 30 30C26 36 24 38 24 40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-copper/80"
        />
        <path
          d="M10 24C10 24 12 30 18 36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M38 24C38 24 36 30 30 36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
    <div className="flex items-baseline gap-1">
      <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>gentle</span>
      <span className={`text-copper text-lg`}>·</span>
      <span className={`font-display ${sizes[size].text} tracking-tight text-copper`}>hands</span>
    </div>
  </div>
);

// Preview component showing all options
export const LogoOptionsPreview = () => (
  <div className="space-y-8 p-8 bg-background">
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Option 1: Cupped Hands (protective, caring)</p>
      <LogoOption1 size="lg" />
    </div>
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Option 2: Elegant Open Palm (minimal, refined)</p>
      <LogoOption2 size="lg" />
    </div>
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Option 3: Two Hands Together (connection)</p>
      <LogoOption3 size="lg" />
    </div>
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Option 4: Flowing Lines (therapeutic)</p>
      <LogoOption4 size="lg" />
    </div>
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Option 5: Abstract Circle (holistic)</p>
      <LogoOption5 size="lg" />
    </div>
  </div>
);
