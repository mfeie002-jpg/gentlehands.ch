import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "link" | "button" | "image">("default");

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  
  const ringX = useSpring(0, { stiffness: 200, damping: 20 });
  const ringY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('a, button, [role="button"], .cursor-pointer, .magnetic-btn')) {
        setIsHovering(true);
        
        if (target.closest('button, [role="button"], .magnetic-btn')) {
          setCursorVariant("button");
        } else if (target.closest('a')) {
          setCursorVariant("link");
        }
      }
      
      if (target.closest('img, [data-cursor-image]')) {
        setCursorVariant("image");
        setIsHovering(true);
      }
      
      const cursorTextAttr = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      if (cursorTextAttr) {
        setCursorText(cursorTextAttr);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .cursor-pointer, .magnetic-btn, img, [data-cursor-image]')) {
        setIsHovering(false);
        setCursorVariant("default");
      }
      if (target.closest('[data-cursor-text]')) {
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  // Hide custom cursor on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  const getCursorSize = () => {
    if (cursorText) return 80;
    if (isHovering) {
      switch (cursorVariant) {
        case "button": return 60;
        case "link": return 50;
        case "image": return 70;
        default: return 60;
      }
    }
    return isClicking ? 8 : 12;
  };

  const getRingSize = () => {
    if (isHovering) {
      switch (cursorVariant) {
        case "button": return 80;
        case "link": return 70;
        case "image": return 90;
        default: return 80;
      }
    }
    return 40;
  };

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex items-center justify-center"
          animate={{
            width: getCursorSize(),
            height: getCursorSize(),
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <AnimatePresence>
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-xs font-medium text-black text-center px-2"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Cursor ring with gradient */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: getRingSize(),
            height: getRingSize(),
            opacity: isClicking ? 0.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          {/* Gradient border */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(135deg, hsl(var(--copper) / 0.4), hsl(var(--petrol) / 0.4))`,
              padding: '1px',
            }}
          >
            <div className="w-full h-full rounded-full bg-transparent" />
          </div>
          
          {/* Glow effect when hovering */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-full bg-copper/20 blur-md"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};
