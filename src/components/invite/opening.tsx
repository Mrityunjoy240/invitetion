import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { wedding } from "@/lib/wedding";
import { AlpanaMandala, MarigoldPetal, Monogram } from "./ornaments";

type State = "closed" | "opening" | "gone";

const petals = [
  { left: "12%", t: "16s", d: "0s", drift: "40px", size: "w-2.5" },
  { left: "28%", t: "19s", d: "3s", drift: "-30px", size: "w-2" },
  { left: "47%", t: "15s", d: "6s", drift: "50px", size: "w-3" },
  { left: "66%", t: "18s", d: "1.5s", drift: "-45px", size: "w-2" },
  { left: "82%", t: "17s", d: "4.5s", drift: "25px", size: "w-2.5" },
  { left: "92%", t: "21s", d: "8s", drift: "-20px", size: "w-2" },
];

/** Cinematic opening: two temple doors carrying a split alpana that part on tap. Skippable instantly. */
export function Opening() {
  const [state, setState] = useState<State>("closed");

  useEffect(() => {
    document.documentElement.style.overflow = state === "closed" ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [state]);

  useEffect(() => {
    const replay = () => {
      window.scrollTo({ top: 0 });
      setState("closed");
    };
    window.addEventListener("invite:replay", replay);
    return () => window.removeEventListener("invite:replay", replay);
  }, []);

  const open = useCallback((instant = false) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (instant || reduced) {
      setState("gone");
      return;
    }
    setState("opening");
    window.setTimeout(() => setState("gone"), 1600);
  }, []);

  useEffect(() => {
    if (state !== "closed") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && open(true);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, open]);

  if (state === "gone") return null;

  return (
    <div
      className="opening fixed inset-0 z-[60] overflow-hidden"
      data-state={state}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation opening"
    >
      {/* Doors */}
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className={`door door-${side} absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} w-1/2 overflow-hidden bg-cinema`}
        >
          <div
            className={`absolute inset-y-4 ${side === "left" ? "left-4 right-0 border-r-0 rounded-l-sm" : "right-4 left-0 border-l-0 rounded-r-sm"} border border-gold/25`}
          />
          <div
            className={`absolute top-1/2 ${side === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"} -translate-y-1/2 w-[150vmin] max-w-[1100px] text-gold/30`}
          >
            <div className="anim-turn">
              <AlpanaMandala className="draw-on h-full w-full" />
            </div>
          </div>
          <div className={`absolute inset-y-0 ${side === "left" ? "right-0" : "left-0"} w-px bg-gold/50 [mask-image:linear-gradient(to_bottom,black_0%,transparent_22%,transparent_78%,black_100%)]`} />
        </div>
      ))}

      {/* Drifting marigold petals */}
      <div className="pointer-events-none absolute inset-0 text-haldi/70" aria-hidden>
        {petals.map((p, i) => (
          <MarigoldPetal
            key={i}
            className={`petal ${p.size}`}
            style={{ left: p.left, "--t": p.t, "--d": p.d, "--drift": p.drift } as CSSProperties}
          />
        ))}
      </div>

      {/* Center card */}
      <div className="opening-center relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-on-maroon">
        <button
          onClick={() => open(true)}
          className="anim-fade absolute right-5 top-5 eyebrow text-on-maroon-muted underline-offset-4 hover:text-on-maroon hover:underline"
          style={{ "--d": "0.2s" } as CSSProperties}
        >
          Skip
        </button>

        <p lang="bn" className="anim-fade font-bengali text-sm text-gold-soft/90" style={{ "--d": "0.3s" } as CSSProperties}>
          ॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥
        </p>

        <div className="anim-rise mt-8 text-gold-soft" style={{ "--d": "0.6s" } as CSSProperties}>
          <Monogram className="h-32 w-32 sm:h-36 sm:w-36" />
        </div>

        <p className="anim-fade eyebrow mt-8 text-gold" style={{ "--d": "1.1s" } as CSSProperties}>
          Wedding Invitation
        </p>

        <h1 className="mt-4 font-display text-4xl font-light italic leading-tight sm:text-6xl">
          <span className="anim-letter inline-block" style={{ "--d": "1.3s" } as CSSProperties}>
            {wedding.bride.en}
          </span>
          <span className="anim-fade mx-3 inline-block not-italic text-gold" style={{ "--d": "1.7s" } as CSSProperties}>
            &amp;
          </span>
          <span className="anim-letter inline-block" style={{ "--d": "1.6s" } as CSSProperties}>
            {wedding.groom.en}
          </span>
        </h1>

        <p className="anim-rise mt-5 font-display text-xl italic text-on-maroon" style={{ "--d": "2s" } as CSSProperties}>
          {wedding.date.en}
        </p>

        <div className="anim-rise mt-10" style={{ "--d": "1s" } as CSSProperties}>
          <Button variant="gold" size="xl" onClick={() => open()} autoFocus>
            Open Invitation
          </Button>
        </div>
      </div>
    </div>
  );
}
