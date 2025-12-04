import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionFAQProps {
  items: FAQItem[];
  columns?: 1 | 2;
}

export const AccordionFAQ = ({ items, columns = 1 }: AccordionFAQProps) => {
  if (columns === 2) {
    const midpoint = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, midpoint);
    const rightItems = items.slice(midpoint);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <Accordion type="single" collapsible className="space-y-4">
          {leftItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <AccordionItem value={`left-${index}`} className="border border-border rounded-xl px-6 data-[state=open]:border-copper/30 transition-colors">
                <AccordionTrigger className="text-left text-foreground hover:text-copper hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
        <Accordion type="single" collapsible className="space-y-4">
          {rightItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (index + midpoint) * 0.05 }}
            >
              <AccordionItem value={`right-${index}`} className="border border-border rounded-xl px-6 data-[state=open]:border-copper/30 transition-colors">
                <AccordionTrigger className="text-left text-foreground hover:text-copper hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <AccordionItem value={`item-${index}`} className="border border-border rounded-xl px-6 data-[state=open]:border-copper/30 transition-colors">
            <AccordionTrigger className="text-left text-foreground hover:text-copper hover:no-underline py-5">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
};
