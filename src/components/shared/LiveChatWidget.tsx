import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Minimize2, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickReplies = [
  "Termine anfragen",
  "Preise erfahren",
  "Therapeut:in wählen",
  "Gutschein einlösen",
];

const botResponses: Record<string, string> = {
  "Termine anfragen": "Gerne helfe ich Ihnen bei der Terminbuchung! Sie können direkt auf unserer Buchungsseite einen Termin wählen, oder ich verbinde Sie mit unserem Team.",
  "Preise erfahren": "Unsere Massage-Erlebnisse beginnen bei CHF 150 für 60 Minuten. Für eine detaillierte Preisübersicht besuchen Sie bitte unsere Preisseite.",
  "Therapeut:in wählen": "Bei GentleHands können Sie zwischen Anna, Luca und Morris wählen. Jede/r hat unterschiedliche Spezialisierungen. Möchten Sie mehr über unser Team erfahren?",
  "Gutschein einlösen": "Wunderbar! Gutscheine können Sie direkt bei der Buchung einlösen. Geben Sie einfach Ihren Gutscheincode im Buchungsformular ein.",
};

export const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Willkommen bei GentleHands! 👋 Wie kann ich Ihnen helfen?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = botResponses[messageText] || 
        "Vielen Dank für Ihre Nachricht. Unser Team wird sich in Kürze bei Ihnen melden. Sie können uns auch telefonisch erreichen: +41 44 123 45 67";
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-copper text-background shadow-lg shadow-copper/30 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
            
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] text-white flex items-center justify-center">
              1
            </span>
            
            {/* Pulse effect */}
            <motion.span
              className="absolute inset-0 rounded-full bg-copper"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-copper to-copper/90 text-background p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">GentleHands Support</h3>
                    <div className="flex items-center gap-1 text-xs text-background/80">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Online
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-8 h-8 rounded-full hover:bg-background/10 flex items-center justify-center transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-background/10 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-copper text-background rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-[10px] mt-1 ${message.sender === "user" ? "text-background/60" : "text-muted-foreground"}`}>
                          {message.timestamp.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Replies */}
                <div className="px-4 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map(reply => (
                      <button
                        key={reply}
                        onClick={() => handleSend(reply)}
                        className="px-3 py-1.5 text-xs rounded-full border border-copper/30 text-copper hover:bg-copper/10 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ihre Nachricht..."
                      className="flex-1 px-4 py-2 rounded-xl bg-muted border-0 text-sm focus:ring-2 focus:ring-copper/20 outline-none"
                    />
                    <Button
                      onClick={() => handleSend()}
                      size="icon"
                      variant="copper"
                      className="rounded-xl"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 pb-3 flex items-center justify-between text-xs text-muted-foreground">
                  <a href="tel:+41441234567" className="flex items-center gap-1 hover:text-copper transition-colors">
                    <Phone className="w-3 h-3" />
                    +41 44 123 45 67
                  </a>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Mo-Sa 10-21 Uhr
                  </span>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
