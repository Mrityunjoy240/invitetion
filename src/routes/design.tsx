import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AlpanaMandala, CornerFlourish, EventGlyph, LotusDivider, Monogram } from "@/components/invite/ornaments";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Design notes · Anamika & Subhadip invitation" },
      { name: "description", content: "Colour palette, typography, ornaments and motion system for the Anamika & Subhadip wedding invitation." },
      { property: "og:title", content: "Design notes · Anamika & Subhadip" },
      { property: "og:description", content: "The colour, type and motion system behind the wedding invitation." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DesignNotes,
});

const palette = [
  { name: "Ivory paper", token: "ivory", cls: "bg-ivory", use: "Main background" },
  { name: "Champagne", token: "champagne", cls: "bg-champagne", use: "Soft panels" },
  { name: "Sindoor", token: "sindoor", cls: "bg-sindoor", use: "Hover / accent red" },
  { name: "Maroon", token: "maroon", cls: "bg-maroon", use: "Names, headings, key card" },
  { name: "Deep maroon", token: "maroon-deep", cls: "bg-maroon-deep", use: "Cinematic opening, footer" },
  { name: "Antique gold", token: "gold", cls: "bg-gold", use: "Lines & ornaments only" },
  { name: "Soft gold", token: "gold-soft", cls: "bg-gold-soft", use: "Text on dark maroon" },
  { name: "Haldi", token: "haldi", cls: "bg-haldi", use: "Marigold petals" },
];

const motion = [
  ["Opening", "Alpana strokes draw in (2.4s), monogram rises, names letter-space in. Tap “Open” and the two temple doors part, splitting the mandala. Skip is visible from the first moment; Esc also skips."],
  ["Petals", "Six marigold petals drift on the opening only — pure CSS transforms, hidden for reduced motion."],
  ["Scroll", "Sections rise 28px and fade in once as they enter view. Ornament lines draw themselves."],
  ["Ambient", "Venue mandala turns once every 140s — barely perceptible, cheap on the GPU."],
  ["Desktop hover", "Event arches lift 4px; gallery tiles deepen their shadow and the pattern drifts."],
  ["Accessibility", "prefers-reduced-motion disables all animation and shows everything immediately."],
];

function DesignNotes() {
  return (
    <main className="min-h-screen bg-paper px-5 py-14 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="inline-flex min-h-11 items-center gap-2 eyebrow text-maroon hover:underline">
          <ArrowLeft className="size-4" /> Back to invitation
        </Link>
        <h1 className="mt-6 font-display text-5xl italic text-maroon sm:text-6xl">Design notes</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          “A Royal Bengali Wedding — told through a cinematic digital invitation.” Clean composition, illustrated
          architecture, and a restrained royal palette.
        </p>
        <LotusDivider className="mt-8 justify-start" />

        <h2 className="eyebrow mt-14 text-gold-deep">Colour</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {palette.map((c) => (
            <div key={c.token} className="overflow-hidden rounded-md border border-border bg-card shadow-paper">
              <div className={`h-20 ${c.cls}`} />
              <div className="p-3">
                <p className="font-medium text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.use}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="eyebrow mt-14 text-gold-deep">Typography</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-md border border-border bg-card p-6 shadow-paper">
            <p className="text-xs text-muted-foreground">Bengali display · Tiro Bangla</p>
            <p lang="bn" className="mt-3 font-bengali text-5xl text-maroon">অনামিকা</p>
          </div>
          <div className="rounded-md border border-border bg-card p-6 shadow-paper">
            <p className="text-xs text-muted-foreground">English display · Cormorant Garamond</p>
            <p className="mt-3 font-display text-5xl italic text-maroon">Subhadip</p>
          </div>
          <div className="rounded-md border border-border bg-card p-6 shadow-paper">
            <p className="text-xs text-muted-foreground">Practical text · Hind Siliguri</p>
            <p className="mt-3 text-lg text-foreground">বিবাহ লগ্ন · 4:50 PM – 12:00 AM</p>
          </div>
        </div>

        <h2 className="eyebrow mt-14 text-gold-deep">Original ornaments</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex aspect-square items-center justify-center rounded-md border border-border bg-card p-6 text-gold-deep">
            <AlpanaMandala />
          </div>
          <div className="flex aspect-square items-center justify-center rounded-md border border-border bg-card text-maroon">
            <Monogram className="h-28 w-28" />
          </div>
          <div className="relative flex aspect-square items-center justify-center rounded-md border border-border bg-card text-gold-deep">
            <CornerFlourish className="absolute left-3 top-3 w-20" />
            <span className="text-xs text-muted-foreground">Corner flourish</span>
          </div>
          <div className="flex aspect-square items-center justify-center gap-2 rounded-md border border-border bg-card text-gold-deep">
            <EventGlyph id="haldi" className="w-12" />
            <EventGlyph id="lagna" className="w-12" />
            <EventGlyph id="bhoj" className="w-12" />
          </div>
        </div>

        <h2 className="eyebrow mt-14 text-gold-deep">Motion</h2>
        <dl className="mt-5 divide-y divide-border rounded-md border border-border bg-card shadow-paper">
          {motion.map(([k, v]) => (
            <div key={k} className="grid gap-1 p-5 sm:grid-cols-[160px_1fr]">
              <dt className="font-display text-xl italic text-maroon">{k}</dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
