import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const WhatsAppWidget = () => {
  const phoneNumber = "+41441234567";
  const message = "Hallo, ich interessiere mich für eine Massage bei GentleHands.";

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center"
      aria-label="WhatsApp Kontakt"
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Pulse effect */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
};
