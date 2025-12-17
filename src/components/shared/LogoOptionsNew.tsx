import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { text: "text-xl", icon: 36 },
  md: { text: "text-2xl md:text-3xl", icon: 44 },
  lg: { text: "text-3xl md:text-4xl", icon: 56 },
};

// Option A: Open Palm - Welcoming, giving
export const LogoOptionA = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
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
        {/* Open palm silhouette */}
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
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option B: Cupped Hands - Holding, protecting
export const LogoOptionB = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
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
        {/* Two cupped hands forming a bowl */}
        <path
          d="M8 28C8 28 10 20 16 18C20 16 24 20 28 20C32 20 36 16 40 18C46 20 48 28 48 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 28C8 36 16 44 28 44C40 44 48 36 48 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Small glow in center */}
        <circle cx="28" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-copper/60" />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);

// Option C: Single Hand Reaching - Connection, touch
export const LogoOptionC = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
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
        {/* Elegant reaching hand outline */}
        <path
          d="M16 48C16 48 14 40 14 36C14 32 16 28 20 28
             L20 16C20 14 21 12 23 12C25 12 26 14 26 16V26
             M26 14C26 12 27 10 29 10C31 10 32 12 32 14V26
             M32 16C32 14 33 12 35 12C37 12 38 14 38 16V26
             M38 20C38 18 39 16 41 16C43 16 44 18 44 20V32C44 40 38 48 28 48"
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

// Option D: Graceful Hand Silhouette - Elegant, feminine
export const LogoOptionD = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
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
        {/* Graceful hand silhouette - slightly curved fingers */}
        <path
          d="M20 48C18 44 16 38 16 32V22C16 20 17 18 19 18C21 18 22 20 22 22V30
             M22 18C22 16 23 14 25 14C27 14 28 16 28 18V30
             M28 16C28 14 29 12 31 12C33 12 34 14 34 16V30
             M34 18C34 16 35 14 37 14C39 14 40 16 40 18V30
             M40 22C40 20 41 18 43 18C45 18 46 20 46 22V34C46 42 40 50 28 50C22 50 20 48 20 48Z"
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

// Option E: Minimal Hand Print - Simple, memorable (filled)
export const LogoOptionE = ({ className = "", size = "md" }: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
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
        {/* Minimalist hand silhouette - filled */}
        <path
          d="M18 46C16 42 14 36 14 30V20C14 17 16 15 19 15C22 15 24 17 24 20V28
             C24 28 24 14 24 12C24 9 26 7 29 7C32 7 34 9 34 12V28
             C34 28 34 16 34 14C34 11 36 9 39 9C42 9 44 11 44 14V32C44 42 38 50 28 50C22 50 18 46 18 46Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
    <span className={`font-display ${sizes[size].text} tracking-tight text-foreground`}>
      Gentle<span className="text-copper">Hands</span>
    </span>
  </div>
);
