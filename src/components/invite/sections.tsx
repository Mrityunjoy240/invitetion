import { useEffect, useState, type ReactNode } from "react";
import { CalendarPlus, Car, Compass, Download, MapPin, Navigation, Plane, RotateCcw, Share2, Train } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { calendarUrl, icsDataUrl, mapsUrl, wedding } from "@/lib/wedding";
import templeImg from "@/assets/temple-hero.webp";
import templeSmallImg from "@/assets/temple-hero-1024.webp";
import { AlpanaMandala, CornerFlourish, EventGlyph, LotusDivider, Monogram } from "./ornaments";
import { Reveal } from "./reveal";

/** Marks temporary content during the design-preview phase */
export function PlaceholderTag({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1 text-[11px] tracking-wide ${
        tone === "light" ? "border-gold-deep/50 text-gold-deep" : "border-gold/50 text-gold-soft"
      }`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {children}
    </span>
  );
}

function SectionHeading({ en, tone = "light" }: { en: string; tone?: "light" | "dark" }) {
  return (
    <Reveal className="text-center">
      <h2
        className={`font-display text-4xl italic sm:text-5xl ${tone === "light" ? "text-maroon" : "text-on-maroon"}`}
      >
        {en}
      </h2>
      <LotusDivider className="mt-5" />
    </Reveal>
  );
}

/* ---------------- Days to go (sits inside the temple's central arch) ---------------- */
function DaysToGo() {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const target = new Date(wedding.date.iso).getTime();
    const tick = () => setDays(Math.max(0, Math.ceil((target - Date.now()) / 86400000)));
    tick();
    const t = window.setInterval(tick, 60000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div
      className="absolute left-1/2 top-[43%] flex h-[40%] w-[13%] -translate-x-1/2 flex-col items-center justify-center text-center"
      style={{ containerType: "inline-size" }}
      aria-label={days === null ? "Days to the wedding" : `${days} days to the wedding`}
    >
      <span className="font-display text-[46cqw] leading-none tabular-nums text-maroon">{days ?? "–"}</span>
      <span className="mt-[6cqw] text-[10cqw] font-medium tracking-[0.22em] text-gold-deep uppercase">days to go</span>
    </div>
  );
}

function getTimeLeft() {
  const target = new Date(wedding.date.iso).getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function LiveCountdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    setMounted(true);
    const tick = () => setTimeLeft(getTimeLeft());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="mx-auto mt-4 flex items-center justify-center gap-3 sm:gap-6 opacity-0">
        <div className="flex flex-col items-center">
          <span className="font-display text-2xl font-light tabular-nums text-maroon sm:text-3xl">00</span>
          <span className="text-[9px] font-medium tracking-[0.2em] text-gold-deep uppercase">Days</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-4 flex items-center justify-center gap-3 sm:gap-6">
      <div className="flex flex-col items-center">
        <span className="font-display text-2xl font-light tabular-nums text-maroon sm:text-3xl">{timeLeft.days}</span>
        <span className="text-[9px] font-medium tracking-[0.2em] text-gold-deep uppercase">Days</span>
      </div>
      <span className="font-display text-base text-gold/60 sm:text-xl">:</span>
      <div className="flex flex-col items-center">
        <span className="font-display text-2xl font-light tabular-nums text-maroon sm:text-3xl">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-[9px] font-medium tracking-[0.2em] text-gold-deep uppercase">Hours</span>
      </div>
      <span className="font-display text-base text-gold/60 sm:text-xl">:</span>
      <div className="flex flex-col items-center">
        <span className="font-display text-2xl font-light tabular-nums text-maroon sm:text-3xl">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-[9px] font-medium tracking-[0.2em] text-gold-deep uppercase">Mins</span>
      </div>
      <span className="font-display text-base text-gold/60 sm:text-xl">:</span>
      <div className="flex flex-col items-center">
        <span className="font-display text-2xl font-light tabular-nums text-maroon sm:text-3xl">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="text-[9px] font-medium tracking-[0.2em] text-gold-deep uppercase">Secs</span>
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper">
      <div className="paper-texture pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <Reveal draw className="pointer-events-none absolute inset-0 text-gold" delay={0.2}>
        <CornerFlourish className="absolute left-3 top-3 w-14 sm:w-24 md:left-6 md:top-20" />
        <CornerFlourish className="absolute right-3 top-3 w-14 -scale-x-100 sm:w-24 md:right-6 md:top-20" />
      </Reveal>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-14 text-center md:pt-20">
        <Reveal>
          <p lang="bn" className="font-bengali text-sm text-maroon/80">
            ॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥
          </p>
          <p className="eyebrow mt-5 text-gold-deep">The wedding celebration of</p>
        </Reveal>

        <h1 className="mt-5 font-display text-5xl italic text-maroon sm:text-6xl lg:mt-8 lg:text-7xl">
          <Reveal delay={0.1}>
            <span className="block">{wedding.bride.en}</span>
          </Reveal>
          <Reveal delay={0.25} className="my-2.5 flex items-center justify-center gap-4 lg:my-3">
            <span className="gold-rule w-16" />
            <span className="text-3xl font-light text-gold sm:text-4xl">&amp;</span>
            <span className="gold-rule w-16" />
          </Reveal>
          <Reveal delay={0.4}>
            <span className="block">{wedding.groom.en}</span>
          </Reveal>
        </h1>

        <Reveal delay={0.55} className="mt-6">
          <LotusDivider />
          <p className="mt-4 font-display text-2xl italic text-maroon sm:text-3xl">
            {wedding.date.en}
          </p>
          <LiveCountdown />
        </Reveal>

      </div>

      <Reveal delay={0.6} className="relative mt-8 sm:mt-12 overflow-hidden">
        <div className="relative left-1/2 w-[150%] max-w-none -translate-x-1/2 sm:w-[115%] md:w-full md:max-w-5xl">
          <img
            src={templeImg}
            srcSet={`${templeSmallImg} 1024w, ${templeImg} 1536w`}
            sizes="(max-width: 768px) 150vw, 1024px"
            alt="Illustrated temple pavilion with banana plants and marigold garlands"
            width={1536}
            height={744}
            fetchPriority="high"
            className="temple-fade block w-full"
          />
          <DaysToGo />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Invitation ---------------- */
export function Invitation() {
  return (
    <section id="invitation" className="relative px-5 py-24 sm:py-32">
      <Reveal className="relative mx-auto max-w-2xl">
        <div className="relative rounded-sm bg-card px-7 py-16 text-center shadow-paper sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute inset-3 rounded-sm border border-gold/40" aria-hidden />
          <Reveal draw className="pointer-events-none absolute inset-0 text-gold">
            <CornerFlourish className="absolute left-0 top-0 w-16 sm:w-20" />
            <CornerFlourish className="absolute right-0 top-0 w-16 -scale-x-100 sm:w-20" />
            <CornerFlourish className="absolute bottom-0 left-0 w-16 -scale-y-100 sm:w-20" />
            <CornerFlourish className="absolute bottom-0 right-0 w-16 -scale-100 sm:w-20" />
          </Reveal>

          <div className="mx-auto text-maroon">
            <Monogram className="h-24 w-24" />
          </div>

          <p className="eyebrow mt-8 text-gold-deep tracking-[0.2em] uppercase">
            With the blessings of our families
          </p>

          <div className="mt-8 space-y-2">
            <p className="font-display text-2xl italic text-maroon sm:text-3xl">
              Mr. Gopal Chandra Kapat <span className="text-gold">&amp;</span> Mrs. Tanushama Kapat
            </p>
            <p className="eyebrow text-xs tracking-[0.25em] text-muted-foreground">
              along with
            </p>
            <p className="font-display text-2xl italic text-maroon sm:text-3xl">
              Mr. Ramnarayan Bhuiya <span className="text-gold">&amp;</span> Mrs. Tulsi Rani Bhuiya
            </p>
          </div>

          <p className="mt-8 text-sm tracking-wide text-muted-foreground sm:text-base">
            cordially invite you to grace the wedding celebration of
          </p>

          <h2 className="mt-4 font-display text-4xl italic text-maroon sm:text-5xl lg:text-[3.25rem]">
            Anamika <span className="text-gold">&amp;</span> Subhadip
          </h2>

          <LotusDivider className="mt-8" />

          <p className="mx-auto mt-7 max-w-lg font-display text-xl italic leading-relaxed text-muted-foreground sm:text-2xl">
            Your gracious presence and blessings will make this joyous occasion truly memorable.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Events ---------------- */
export function Events() {
  return (
    <section id="events" className="relative overflow-hidden bg-secondary/60 px-5 py-24 sm:py-32">
      <div className="paper-texture pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading en="The Ceremonies" />
        <Reveal delay={0.1} className="mt-4 text-center">
          <p className="font-display text-xl italic text-maroon">
            {wedding.date.en}
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {wedding.events.map((e, i) => {
            const feature = e.id === "lagna";
            return (
              <Reveal as="li" key={e.id} delay={0.12 * i} className="h-full">
                <article
                  className={`group relative flex h-full flex-col items-center rounded-t-[999px] rounded-b-md border px-6 pb-8 pt-14 text-center transition-transform duration-700 hover:-translate-y-1 ${
                    feature
                      ? "border-gold/50 bg-maroon text-on-maroon shadow-lift"
                      : "border-gold/40 bg-card text-foreground shadow-paper"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-2 rounded-t-[999px] rounded-b-sm border border-gold/25" aria-hidden />
                  <Reveal draw delay={0.2 + 0.12 * i} className={feature ? "text-gold-soft" : "text-gold-deep"}>
                    <EventGlyph id={e.id} className="h-14 w-14" />
                  </Reveal>
                  <p className={`eyebrow mt-5 ${feature ? "text-gold" : "text-gold-deep"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className={`mt-3 font-display text-2xl italic sm:text-3xl ${feature ? "text-on-maroon" : "text-maroon"}`}>
                    {e.en}
                  </h3>
                  <span className={`gold-rule my-6 w-20`} />
                  <p className="font-display text-2xl tabular-nums sm:text-[1.7rem]">{e.time}</p>
                  <div className="mt-auto flex flex-col items-center gap-2 pt-6 w-full">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Add to Calendar</span>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <a
                        href={calendarUrl(e)}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 py-1 text-xs tracking-wider uppercase transition-colors ${
                          feature
                            ? "border-gold/40 text-gold-soft hover:bg-gold/15"
                            : "border-maroon/20 text-maroon hover:bg-maroon/5"
                        }`}
                        title="Add to Google Calendar"
                      >
                        <CalendarPlus className="size-3.5" strokeWidth={1.4} /> Google
                      </a>
                      <a
                        href={icsDataUrl(e)}
                        download={`${e.id}-anamika-subhadip.ics`}
                        className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 py-1 text-xs tracking-wider uppercase transition-colors ${
                          feature
                            ? "border-gold/40 text-gold-soft hover:bg-gold/15"
                            : "border-maroon/20 text-maroon hover:bg-maroon/5"
                        }`}
                        title="Download for Apple Calendar / Outlook"
                      >
                        <Download className="size-3.5" strokeWidth={1.4} /> Apple / Outlook
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Venue ---------------- */
export function Venue() {
  return (
    <section id="venue" className="relative overflow-hidden bg-paper px-5 py-24 text-foreground sm:py-32">
      <div className="paper-texture pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[140vmin] max-w-[900px] -translate-x-1/2 -translate-y-1/2 text-gold/25" aria-hidden>
        <div className="anim-turn">
          <AlpanaMandala />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center lg:text-left">
            <Reveal>
              <p className="eyebrow text-gold-deep">The Venue</p>
              <h2 className="mt-4 font-display text-4xl italic leading-snug text-maroon sm:text-5xl">
                {wedding.venue.name.en}
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="mt-6">
              <span className="gold-rule mx-auto block w-24 lg:mx-0" />
              <address className="mt-5 font-display text-xl not-italic italic leading-relaxed text-muted-foreground sm:text-2xl">
                {wedding.venue.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </Reveal>

            {/* Transit Guide */}
            <Reveal delay={0.25} className="mt-8">
              <p className="text-[11px] font-medium tracking-[0.2em] text-gold-deep uppercase text-center lg:text-left">
                Transit &amp; Travel Guide
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-left">
                <div className="rounded-sm border border-gold/35 bg-card/90 p-3.5 shadow-paper backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-gold-deep">
                    <Train className="size-4 shrink-0" strokeWidth={1.4} />
                    <span className="text-xs font-semibold tracking-wider uppercase">By Train</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    <strong className="text-maroon">Tamluk (~18 km)</strong> or <strong className="text-maroon">Mecheda (~38 km)</strong> stations, connected by direct taxi &amp; autos.
                  </p>
                </div>
                <div className="rounded-sm border border-gold/35 bg-card/90 p-3.5 shadow-paper backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-gold-deep">
                    <Plane className="size-4 shrink-0" strokeWidth={1.4} />
                    <span className="text-xs font-semibold tracking-wider uppercase">By Flight</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    <strong className="text-maroon">Kolkata Airport (CCU)</strong> (~95 km / ~2.5 hrs via NH16 &amp; SH4).
                  </p>
                </div>
                <div className="rounded-sm border border-gold/35 bg-card/90 p-3.5 shadow-paper backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-gold-deep">
                    <Car className="size-4 shrink-0" strokeWidth={1.4} />
                    <span className="text-xs font-semibold tracking-wider uppercase">By Road</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Located on Moyna-Tamluk route. Dedicated guest parking available on premises.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.35} className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button variant="gold" size="xl" asChild>
                <a href={mapsUrl} target="_blank" rel="noreferrer">
                  <Navigation strokeWidth={1.4} /> Open in Google Maps
                </a>
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mx-auto w-full max-w-sm sm:max-w-md">
            {/* Royal Arched Venue & Transit Route Schematic Diagram */}
            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-xl border border-gold/45 bg-gradient-to-b from-[#3a0f12] via-[#2a0b0e] to-[#1c0608] p-6 pb-8 text-center shadow-lift transition-transform duration-700 hover:scale-[1.01]">
              <div className="pointer-events-none absolute inset-2.5 rounded-t-[999px] rounded-b-lg border border-gold/25" aria-hidden />

              {/* Vector Cartographic Route & Transit Diagram */}
              <div className="relative mx-auto mt-2 h-64 w-full max-w-[320px]">
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 320 260"
                  fill="none"
                  aria-hidden
                >
                  {/* Subtle Topographical Elevation Curves */}
                  <path d="M-20 60 C 80 40, 160 90, 340 50" stroke="currentColor" className="text-gold/10" strokeWidth="1" />
                  <path d="M-20 180 C 100 160, 200 220, 340 170" stroke="currentColor" className="text-gold/10" strokeWidth="1" />
                  <path d="M60 -20 C 80 100, 40 200, 90 280" stroke="currentColor" className="text-gold/10" strokeWidth="1" />
                  <path d="M260 -20 C 230 110, 270 190, 240 280" stroke="currentColor" className="text-gold/10" strokeWidth="1" />
                  
                  {/* River Kasai / Rupnarayan subtle water ribbon */}
                  <path
                    d="M 280 -10 C 260 80, 290 140, 240 200 C 210 240, 230 270, 220 300"
                    stroke="currentColor"
                    className="text-gold/20"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="4 6"
                  />
                  <text x="268" y="120" fill="currentColor" className="text-gold/30 text-[8px] tracking-widest uppercase font-sans">
                    Rupnarayan
                  </text>

                  {/* Highway Artery (NH-16 & SH-4) from Kolkata to Moyna */}
                  <path
                    d="M 60 45 C 100 70, 130 95, 160 125 C 180 145, 175 165, 160 195"
                    stroke="currentColor"
                    className="text-gold/40"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Highway dashed center line */}
                  <path
                    d="M 60 45 C 100 70, 130 95, 160 125 C 180 145, 175 165, 160 195"
                    stroke="currentColor"
                    className="text-[#f7e7ce]"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />

                  {/* Feeder route from Tamluk / Mecheda */}
                  <path
                    d="M 240 100 C 205 110, 185 118, 160 125"
                    stroke="currentColor"
                    className="text-gold/40"
                    strokeWidth="2.5"
                    strokeDasharray="3 3"
                    strokeLinecap="round"
                  />

                  {/* Compass Rose (North Arrow) */}
                  <g transform="translate(280, 28)">
                    <circle cx="0" cy="0" r="14" stroke="currentColor" className="text-gold/25" strokeWidth="0.8" />
                    <polygon points="0,-12 3,0 0,2 -3,0" fill="currentColor" className="text-gold" />
                    <polygon points="0,12 3,0 0,-2 -3,0" fill="currentColor" className="text-gold/30" />
                    <text x="-3" y="-15" fill="currentColor" className="text-gold text-[8px] font-bold">N</text>
                  </g>

                  {/* Node 1: Kolkata Airport (CCU) */}
                  <g transform="translate(60, 45)">
                    <circle cx="0" cy="0" r="12" fill="currentColor" className="text-maroon-deep" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="4" fill="currentColor" className="text-gold" />
                    <text x="-40" y="-12" fill="currentColor" className="text-gold-soft text-[10px] font-medium tracking-wide">
                      Kolkata (CCU)
                    </text>
                    <text x="-40" y="-1" fill="currentColor" className="text-gold/60 text-[8px] tracking-wider uppercase">
                      Airport · 95 km
                    </text>
                  </g>

                  {/* Node 2: Tamluk & Mecheda Junction */}
                  <g transform="translate(240, 100)">
                    <circle cx="0" cy="0" r="11" fill="currentColor" className="text-maroon-deep" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="3.5" fill="currentColor" className="text-gold" />
                    <text x="16" y="-2" fill="currentColor" className="text-gold-soft text-[10px] font-medium tracking-wide">
                      Tamluk &amp; Mecheda
                    </text>
                    <text x="16" y="9" fill="currentColor" className="text-gold/60 text-[8px] tracking-wider uppercase">
                      Rail Hubs (~18–38 km)
                    </text>
                  </g>

                  {/* Route Label: NH-16 -> SH-4 */}
                  <rect x="95" y="85" width="46" height="15" rx="3" fill="#1c0608" stroke="currentColor" className="text-gold/30" strokeWidth="0.8" />
                  <text x="118" y="96" textAnchor="middle" fill="currentColor" className="text-gold text-[8px] font-semibold tracking-wider">
                    NH16 / SH4
                  </text>

                  {/* Node 3: Destination — Kumudini Guest House, Moyna */}
                  <g transform="translate(160, 195)">
                    {/* Concentric Pulsing Radar Rings */}
                    <circle cx="0" cy="0" r="24" stroke="currentColor" className="text-gold/25 animate-ping" strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="17" fill="currentColor" className="text-gold/20" stroke="currentColor" className="text-gold/60" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="7" fill="currentColor" className="text-gold" />
                  </g>
                </svg>

                {/* Destination Badge Floating over the map marker */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 rounded-full border border-gold/50 bg-[#1c0608]/90 px-3.5 py-1 text-gold shadow-md backdrop-blur-xs">
                    <MapPin className="size-3.5 text-gold animate-bounce" strokeWidth={1.8} />
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-gold-soft">
                      Destination
                    </span>
                  </div>
                </div>
              </div>

              {/* Venue Card Details */}
              <div className="relative z-10 mt-5 flex flex-col items-center">
                <h3 className="font-display text-2xl italic text-on-maroon sm:text-3xl">
                  {wedding.venue.name.en}
                </h3>
                <p className="mt-1 font-display text-base italic text-gold-soft sm:text-lg">
                  Jogalbari, Garmoyna, Moyna
                </p>
                <p className="mt-1 text-xs tracking-widest text-on-maroon-muted uppercase">
                  Purba Medinipur · PIN 721629
                </p>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gold">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="tracking-wide text-gold-soft">Direct Route &amp; Dedicated Parking Available</span>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/20 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-gold-soft shadow-md transition-all hover:bg-gold/30 hover:scale-105"
                  >
                    <Navigation className="size-3.5" /> Navigate via Maps
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Closing() {
  const shareText = `${wedding.bride.en} & ${wedding.groom.en} — ${wedding.date.en}`;
  return (
    <footer className="relative overflow-hidden bg-maroon-deep px-6 pb-36 pt-24 text-center text-on-maroon md:pb-20">
      <Reveal draw className="mx-auto w-40 text-gold/60 sm:w-48">
        <AlpanaMandala />
      </Reveal>
      <Reveal delay={0.2} className="-mt-[6.5rem] sm:-mt-[7.5rem]">
        <div className="text-gold-soft">
          <Monogram className="h-20 w-20" small />
        </div>
      </Reveal>
      <Reveal delay={0.3} className="mt-16">
        <p className="font-display text-3xl italic leading-snug sm:text-4xl">
          Your presence is our greatest joy
        </p>
      </Reveal>
      <Reveal delay={0.4} className="mt-10">
        <span className="gold-rule mx-auto block w-32" />
        <p className="mt-6 font-display text-2xl">
          {wedding.bride.en} <span className="text-gold">&amp;</span> {wedding.groom.en}
        </p>
        <p className="eyebrow mt-2 text-on-maroon-muted">{wedding.date.en}</p>
      </Reveal>
      <Reveal delay={0.5} className="mt-10 flex flex-wrap justify-center gap-3">
        <Button variant="gold" size="xl" asChild>
          <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer">
            <Share2 strokeWidth={1.4} /> Share on WhatsApp
          </a>
        </Button>
        <Button variant="gold" size="xl" onClick={() => window.dispatchEvent(new Event("invite:replay"))}>
          <RotateCcw strokeWidth={1.4} /> Replay opening
        </Button>
      </Reveal>
      <p className="mt-14 text-xs text-on-maroon-muted">
        Design preview ·{" "}
        <Link to="/design" className="underline underline-offset-4 hover:text-on-maroon">
          colours, type &amp; motion notes
        </Link>
      </p>
    </footer>
  );
}
