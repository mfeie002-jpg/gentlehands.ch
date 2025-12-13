import { LogoOptionsPreview, LogoOption1, LogoOption2, LogoOption3, LogoOption4, LogoOption5 } from "@/components/shared/LogoOptions";

const LogoPreview = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="font-display text-4xl text-foreground mb-4">Logo Options</h1>
        <p className="text-muted-foreground mb-12">Choose your preferred logo design featuring hands imagery:</p>
        
        <div className="space-y-12">
          {/* Option 1 */}
          <div className="p-8 rounded-2xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-copper/20 text-copper text-sm font-medium px-3 py-1 rounded-full">Option 1</span>
              <span className="text-muted-foreground text-sm">Cupped Hands — protective, caring</span>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              <LogoOption1 size="sm" />
              <LogoOption1 size="md" />
              <LogoOption1 size="lg" />
            </div>
          </div>

          {/* Option 2 */}
          <div className="p-8 rounded-2xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-copper/20 text-copper text-sm font-medium px-3 py-1 rounded-full">Option 2</span>
              <span className="text-muted-foreground text-sm">Elegant Open Palm — minimal, refined</span>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              <LogoOption2 size="sm" />
              <LogoOption2 size="md" />
              <LogoOption2 size="lg" />
            </div>
          </div>

          {/* Option 3 */}
          <div className="p-8 rounded-2xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-copper/20 text-copper text-sm font-medium px-3 py-1 rounded-full">Option 3</span>
              <span className="text-muted-foreground text-sm">Two Hands Together — connection, energy</span>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              <LogoOption3 size="sm" />
              <LogoOption3 size="md" />
              <LogoOption3 size="lg" />
            </div>
          </div>

          {/* Option 4 */}
          <div className="p-8 rounded-2xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-copper/20 text-copper text-sm font-medium px-3 py-1 rounded-full">Option 4</span>
              <span className="text-muted-foreground text-sm">Flowing Lines — therapeutic, movement</span>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              <LogoOption4 size="sm" />
              <LogoOption4 size="md" />
              <LogoOption4 size="lg" />
            </div>
          </div>

          {/* Option 5 */}
          <div className="p-8 rounded-2xl border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-copper/20 text-copper text-sm font-medium px-3 py-1 rounded-full">Option 5</span>
              <span className="text-muted-foreground text-sm">Abstract Circle — holistic, wellness</span>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              <LogoOption5 size="sm" />
              <LogoOption5 size="md" />
              <LogoOption5 size="lg" />
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-border/30">
          <p className="text-foreground font-medium mb-2">How to use:</p>
          <p className="text-muted-foreground text-sm">
            Tell me which option you prefer (1-5) and I'll update the main Logo component to use that design across the entire site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoPreview;
