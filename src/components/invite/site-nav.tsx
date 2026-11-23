import { useEffect, useState } from "react";
import { CalendarHeart, MapPin, Sparkles } from "lucide-react";
import { Monogram } from "./ornaments";

const items = [
  { id: "home", bn: "শুরু", en: "Home", Icon: Sparkles },
  { id: "events", bn: "অনুষ্ঠান", en: "Events", Icon: CalendarHeart },
  { id: "venue", bn: "স্থান", en: "Venue", Icon: MapPin },
];

export function SiteNav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* Desktop / tablet */}
      <header
        className={`fixed inset-x-0 top-0 z-40 hidden transition-colors duration-500 md:block ${
          scrolled ? "border-b border-border/60 bg-background/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-8" aria-label="Main">
          <a href="#home" className="text-maroon" aria-label="Back to top">
            <Monogram small className="h-11 w-11" />
          </a>
          <ul className="flex items-center gap-10">
            {items.map((i) => (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  className={`group relative eyebrow transition-colors ${active === i.id ? "text-maroon" : "text-muted-foreground hover:text-maroon"}`}
                >
                  {i.en}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500 ${active === i.id ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </a>
              </li>
            ))}
          </ul>
          <span className="eyebrow text-gold-deep">{"13 · 12 · 26"}</span>
        </nav>
      </header>

      {/* Mobile bottom bar */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      >
        <ul className="mx-auto flex max-w-sm items-stretch justify-between rounded-full border border-gold/40 bg-maroon-deep/92 px-2 py-1.5 shadow-lift backdrop-blur-md">
          {items.map(({ id, bn, en, Icon }) => {
            const on = active === id;
            return (
              <li key={id} className="flex-1">
                <a
                  href={`#${id}`}
                  aria-label={en}
                  aria-current={on ? "true" : undefined}
                  className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full transition-colors duration-300 ${
                    on ? "bg-gold/15 text-gold-soft" : "text-on-maroon-muted"
                  }`}
                >
                  <Icon className="size-[18px]" strokeWidth={1.4} />
                  <span className="text-[11px] font-medium tracking-wider uppercase leading-none">
                    {en}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
