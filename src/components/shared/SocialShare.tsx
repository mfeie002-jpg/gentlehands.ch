import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, Link, Check, Facebook, Twitter, Mail, MessageCircle } from "lucide-react";

interface SocialShareProps {
  title: string;
  description: string;
  url?: string;
}

export const SocialShare = ({ title, description, url = window.location.href }: SocialShareProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-[#25D366] hover:bg-[#25D366]/90",
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`, "_blank"),
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#1877F2] hover:bg-[#1877F2]/90",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      name: "E-Mail",
      icon: Mail,
      color: "bg-muted hover:bg-muted/80",
      action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`, "_blank"),
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
      >
        <Share2 className="w-4 h-4" />
        Teilen
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-display font-semibold">Teilen</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {shareOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={option.action}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className={`w-12 h-12 rounded-xl ${option.color} flex items-center justify-center text-white transition-colors`}>
                        <option.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs text-muted-foreground">{option.name}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-2 rounded-xl bg-muted text-sm text-muted-foreground truncate">
                    {url}
                  </div>
                  <button
                    onClick={copyLink}
                    className={`px-4 py-2 rounded-xl transition-colors ${
                      copied ? "bg-emerald-500 text-white" : "bg-copper text-background"
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
