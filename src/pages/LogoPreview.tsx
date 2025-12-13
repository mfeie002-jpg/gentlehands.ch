import { 
  LogoOptionA, LogoOptionB, LogoOptionC, LogoOptionD, LogoOptionE
} from "@/components/shared/LogoOptionsNew";
import { Layout } from "@/components/layout/Layout";

const LogoPreview = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-background py-12 pt-32">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="font-display text-4xl text-foreground mb-4">Logo Options — New Approach</h1>
        <p className="text-muted-foreground mb-12">5 completely different concepts: monograms, nature symbols, minimalism, and artistic flourishes</p>
        
        <div className="space-y-12">
          {/* Option A */}
          <div className="p-8 rounded-2xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-copper/20 text-copper text-sm font-medium px-3 py-1 rounded-full">Option A</span>
              <span className="text-muted-foreground text-sm">Flowing GH Monogram — elegant, sophisticated</span>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              <LogoOptionA size="sm" />
              <LogoOptionA size="md" />
              <LogoOptionA size="lg" />
            </div>
          </div>

          {/* Option B */}
          <div className="p-8 rounded-2xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-copper/20 text-copper text-sm font-medium px-3 py-1 rounded-full">Option B</span>
              <span className="text-muted-foreground text-sm">Crescent Embrace — rest, peace, being held</span>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              <LogoOptionB size="sm" />
              <LogoOptionB size="md" />
              <LogoOptionB size="lg" />
            </div>
          </div>

          {/* Option C */}
          <div className="p-8 rounded-2xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-copper/20 text-copper text-sm font-medium px-3 py-1 rounded-full">Option C</span>
              <span className="text-muted-foreground text-sm">Single Line Flow — minimalist, continuous care</span>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              <LogoOptionC size="sm" />
              <LogoOptionC size="md" />
              <LogoOptionC size="lg" />
            </div>
          </div>

          {/* Option D */}
          <div className="p-8 rounded-2xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-copper/20 text-copper text-sm font-medium px-3 py-1 rounded-full">Option D</span>
              <span className="text-muted-foreground text-sm">Water Drop — relief, letting go (italic text)</span>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              <LogoOptionD size="sm" />
              <LogoOptionD size="md" />
              <LogoOptionD size="lg" />
            </div>
          </div>

          {/* Option E */}
          <div className="p-8 rounded-2xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-copper/20 text-copper text-sm font-medium px-3 py-1 rounded-full">Option E</span>
              <span className="text-muted-foreground text-sm">Feather Light — softness, gentle touch (spaced caps)</span>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              <LogoOptionE size="sm" />
              <LogoOptionE size="md" />
              <LogoOptionE size="lg" />
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-border/30">
          <p className="text-foreground font-medium mb-2">How to use:</p>
          <p className="text-muted-foreground text-sm">
            Tell me which option you prefer (A-E) and I'll apply it site-wide. Or tell me what direction resonates and I'll refine further.
          </p>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default LogoPreview;
