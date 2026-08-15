import { useState } from "react";
import { Play, ImageOff } from "lucide-react";
import { campaignConfig, isSet } from "@/config/campaign";

/**
 * Vertikaler 9:16-Video-/Portraitbereich.
 * Das Video wird nur geladen, wenn wirklich echtes Material hinterlegt ist.
 */
export const LpVideoPortrait = () => {
  const [activated, setActivated] = useState(false);
  const { videoSrc, videoPoster, videoCaptionsSrc, portraitImage } = campaignConfig.media;
  const hasVideo = isSet(videoSrc);
  const poster = isSet(videoPoster) ? videoPoster : isSet(portraitImage) ? portraitImage : null;

  return (
    <div className="mx-auto w-full max-w-[320px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-copper/20 bg-sand/40 shadow-md">
        {hasVideo && activated ? (
          <video
            className="h-full w-full object-cover"
            controls
            autoPlay
            muted
            playsInline
            preload="none"
            poster={poster ?? undefined}
          >
            <source src={String(videoSrc)} type="video/mp4" />
            {isSet(videoCaptionsSrc) && (
              <track kind="captions" src={String(videoCaptionsSrc)} srcLang="de" label="Deutsch" default />
            )}
          </video>
        ) : poster ? (
          <img
            src={String(poster)}
            alt={`Portrait von ${campaignConfig.providerFirstName} von GentleHands`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
            <ImageOff className="text-copper" size={28} aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              TODO_REQUIRED: Echtes Portrait oder Video von {String(campaignConfig.providerFirstName)} hinterlegen
              (mit Einwilligung). Kein Stockfoto als Anbieter-Darstellung.
            </p>
          </div>
        )}

        {hasVideo && !activated && (
          <button
            type="button"
            onClick={() => setActivated(true)}
            className="absolute inset-0 flex items-center justify-center bg-foreground/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-copper"
            aria-label="Video abspielen (startet ohne Ton)"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/90">
              <Play className="text-copper" size={26} aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Video startet ohne Ton. Untertitel verfügbar, sobald hinterlegt.
      </p>
    </div>
  );
};
