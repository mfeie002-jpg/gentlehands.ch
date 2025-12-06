import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Instagram, Heart } from "lucide-react";
import massageImage1 from "@/assets/massage-hands-neck.jpg";
import massageImage2 from "@/assets/massage-hot-stones.jpg";
import massageImage3 from "@/assets/wellness-lounge.jpg";
import massageImage4 from "@/assets/aromatherapy-oils.jpg";
import massageImage5 from "@/assets/spa-massage-room.jpg";
import massageImage6 from "@/assets/waiting-lounge.jpg";

const posts = [
  { image: massageImage1, likes: 234 },
  { image: massageImage2, likes: 189 },
  { image: massageImage3, likes: 312 },
  { image: massageImage4, likes: 156 },
  { image: massageImage5, likes: 278 },
  { image: massageImage6, likes: 201 },
];

export const InstagramFeedSection = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-b from-background to-secondary/10">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-10">
          <motion.a
            href="https://instagram.com/gentlehands.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center">
              <Instagram size={20} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-foreground font-display font-medium group-hover:text-copper transition-colors">
                @gentlehands.ch
              </p>
              <p className="text-muted-foreground text-xs">Folgen Sie uns auf Instagram</p>
            </div>
          </motion.a>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {posts.map((post, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <motion.a
                href="https://instagram.com/gentlehands.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={post.image}
                  alt="GentleHands Instagram"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-background">
                    <Heart size={18} className="fill-current" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </div>
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
