import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Minimize2, Phone, Clock, Loader2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { chatMessageSchema } from "@/lib/validations";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isLoading?: boolean;
}

const quickReplies = [
  "Termine anfragen",
  "Preise erfahren",
  "Therapeut:in wählen",
  "Gutschein einlösen",
];

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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = (text || inputValue).trim();
    
    // Validate message
    const validation = chatMessageSchema.safeParse({ message: messageText });
    if (!validation.success) {
      if (!text) {
        toast.error(validation.error.errors[0]?.message || "Ungültige Nachricht");
      }
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Add loading message
    const loadingId = Date.now() + 1;
    setMessages(prev => [...prev, {
      id: loadingId,
      text: "",
      sender: "bot",
      timestamp: new Date(),
      isLoading: true,
    }]);

    try {
      // Build conversation history for context
      const conversationHistory = messages
        .filter(m => !m.isLoading)
        .map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        }));

      conversationHistory.push({ role: "user", content: messageText });

      const { data, error } = await supabase.functions.invoke('chat-support', {
        body: { messages: conversationHistory }
      });

      if (error) throw error;

      // Replace loading message with actual response
      setMessages(prev => prev.map(m => 
        m.id === loadingId
          ? { ...m, text: data.message, isLoading: false }
          : m
      ));
    } catch (error) {
      console.error('Chat error:', error);
      
      // Replace loading message with error fallback
      const fallbackResponse = "Entschuldigung, ich konnte Ihre Anfrage gerade nicht verarbeiten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch: +41 44 123 45 67";
      
      setMessages(prev => prev.map(m => 
        m.id === loadingId
          ? { ...m, text: fallbackResponse, isLoading: false }
          : m
      ));
    } finally {
      setIsLoading(false);
    }
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
            aria-label="Chat öffnen"
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
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-copper to-copper/90 text-background p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">GentleHands AI</h3>
                    <div className="flex items-center gap-1 text-xs text-background/80">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Jetzt verfügbar
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-8 h-8 rounded-full hover:bg-background/10 flex items-center justify-center transition-colors"
                    aria-label="Chat minimieren"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-background/10 flex items-center justify-center transition-colors"
                    aria-label="Chat schliessen"
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
                      <div className="flex items-start gap-2 max-w-[85%]">
                        {message.sender === "bot" && (
                          <div className="w-6 h-6 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="w-3 h-3 text-copper" />
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-copper text-background rounded-br-sm"
                              : "bg-muted text-foreground rounded-bl-sm"
                          }`}
                        >
                          {message.isLoading ? (
                            <div className="flex items-center gap-2 py-1">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="text-sm text-muted-foreground">Schreibt...</span>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                              <p className={`text-[10px] mt-1 ${message.sender === "user" ? "text-background/60" : "text-muted-foreground"}`}>
                                {message.timestamp.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </>
                          )}
                        </div>
                        {message.sender === "user" && (
                          <div className="w-6 h-6 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0 mt-1">
                            <User className="w-3 h-3 text-copper" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div className="px-4 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map(reply => (
                      <button
                        key={reply}
                        onClick={() => handleSend(reply)}
                        disabled={isLoading}
                        className="px-3 py-1.5 text-xs rounded-full border border-copper/30 text-copper hover:bg-copper/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ihre Nachricht..."
                      disabled={isLoading}
                      maxLength={500}
                      className="flex-1 px-4 py-2 rounded-xl bg-muted border-0 text-sm focus:ring-2 focus:ring-copper/20 outline-none disabled:opacity-50"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading || !inputValue.trim()}
                      className="rounded-xl bg-copper hover:bg-copper/90"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </form>
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
