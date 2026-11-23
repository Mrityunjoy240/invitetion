import type { CSSProperties, SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { className?: string };

function petal(r1: number, r2: number, w: number) {
  const h = r2 - r1;
  return `M0 ${-r1} C ${w} ${-r1 - h * 0.35}, ${w * 0.45} ${-r2 + h * 0.12}, 0 ${-r2} C ${-w * 0.45} ${-r2 + h * 0.12}, ${-w} ${-r1 - h * 0.35}, 0 ${-r1} Z`;
}

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** Original alpana-inspired mandala. Strokes draw in when parent has .draw-on / .reveal-draw */
export function AlpanaMandala({ className, ...rest }: Props) {
  const ring = (n: number) => Array.from({ length: n }, (_, i) => (360 / n) * i);
  return (
    <svg viewBox="-200 -200 400 400" fill="none" className={className} aria-hidden {...rest}>
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <circle r="22" pathLength={1} data-draw style={d(0)} />
        <circle r="30" pathLength={1} data-draw style={d(0.1)} strokeDasharray="1 4" />
        {ring(8).map((a) => (
          <path key={`a${a}`} d={petal(32, 78, 22)} transform={`rotate(${a})`} pathLength={1} data-draw style={d(0.2)} />
        ))}
        {ring(8).map((a) => (
          <path key={`b${a}`} d={petal(40, 64, 9)} transform={`rotate(${a})`} pathLength={1} data-draw style={d(0.5)} />
        ))}
        <circle r="92" pathLength={1} data-draw style={d(0.6)} />
        {ring(16).map((a) => (
          <path key={`c${a}`} d={petal(94, 126, 11)} transform={`rotate(${a + 11.25})`} pathLength={1} data-draw style={d(0.8)} />
        ))}
        <circle r="134" pathLength={1} data-draw style={d(1)} />
        {ring(48).map((a) => (
          <circle key={`dot${a}`} r="1.6" cx="0" cy="-144" transform={`rotate(${a})`} fill="currentColor" stroke="none" />
        ))}
        {ring(24).map((a) => (
          <path
            key={`s${a}`}
            d="M -16 -156 Q 0 -178 16 -156"
            transform={`rotate(${a})`}
            pathLength={1}
            data-draw
            style={d(1.2)}
          />
        ))}
        {ring(24).map((a) => (
          <path key={`t${a}`} d={petal(170, 188, 4)} transform={`rotate(${a + 7.5})`} pathLength={1} data-draw style={d(1.4)} />
        ))}
      </g>
    </svg>
  );
}

/** Bengali monogram: অ | শ */
export function Monogram({ className, small = false }: { className?: string; small?: boolean }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className ?? ""}`} aria-label="Anamika and Subhadip monogram">
      <svg viewBox="-60 -60 120 120" className="absolute inset-0 h-full w-full text-gold" fill="none" aria-hidden>
        <circle r="56" stroke="currentColor" strokeWidth="0.8" />
        <circle r="51" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 3" />
        <path d="M0 -40 L0 40" stroke="currentColor" strokeWidth="0.6" />
        <path d="M0 -6 L5 0 L0 6 L-5 0 Z" fill="currentColor" />
      </svg>
      <span className={`relative flex items-center font-bengali leading-none ${small ? "gap-4 text-2xl" : "gap-7 text-5xl"}`}>
        <span>অ</span>
        <span>শ</span>
      </span>
    </div>
  );
}

export function LotusDivider({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className ?? ""}`} aria-hidden>
      <span className="gold-rule w-16 sm:w-24" />
      <svg viewBox="-30 -18 60 24" className="h-5 w-12 text-gold" fill="none" stroke="currentColor" strokeWidth="1">
        <path d={petal(0, 16, 6)} />
        <path d={petal(0, 13, 5)} transform="rotate(-48)" />
        <path d={petal(0, 13, 5)} transform="rotate(48)" />
        <path d={petal(0, 9, 3.5)} transform="rotate(-82)" />
        <path d={petal(0, 9, 3.5)} transform="rotate(82)" />
        <path d="M-22 3 Q0 8 22 3" />
      </svg>
      <span className="gold-rule w-16 sm:w-24" />
    </div>
  );
}

export function CornerFlourish({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} style={style} aria-hidden>
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M4 116 L4 30 Q4 4 30 4 L116 4" pathLength={1} data-draw />
        <path d="M12 116 L12 36 Q12 12 36 12 L116 12" pathLength={1} data-draw style={d(0.2)} strokeOpacity="0.6" />
        <path d="M24 40 Q40 22 58 28 Q46 34 44 48 Q34 40 24 40 Z" pathLength={1} data-draw style={d(0.4)} />
        <path d="M40 24 Q22 40 28 58 Q34 46 48 44 Q40 34 40 24 Z" pathLength={1} data-draw style={d(0.5)} />
        <circle cx="30" cy="30" r="3" fill="currentColor" stroke="none" />
      </g>
      {[52, 64, 76, 88, 100].map((x) => (
        <circle key={`x${x}`} cx={x} cy="20" r="1.2" fill="currentColor" />
      ))}
      {[52, 64, 76, 88, 100].map((y) => (
        <circle key={`y${y}`} cx="20" cy={y} r="1.2" fill="currentColor" />
      ))}
    </svg>
  );
}

/** Line icons for the three ceremonies */
export function EventGlyph({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {id === "haldi" && (
        <>
          <path d="M12 34 H52 Q50 52 32 52 Q14 52 12 34 Z" pathLength={1} data-draw />
          <path d="M18 34 Q32 26 46 34" pathLength={1} data-draw style={d(0.2)} />
          <path d="M32 26 Q30 14 40 8 Q42 20 32 26 Z" pathLength={1} data-draw style={d(0.4)} />
          <path d="M32 26 Q26 18 18 18 Q22 26 32 26 Z" pathLength={1} data-draw style={d(0.5)} />
        </>
      )}
      {id === "lagna" && (
        <>
          <path d="M32 10 Q42 22 38 32 Q36 26 32 24 Q34 30 28 34 Q22 26 32 10 Z" pathLength={1} data-draw />
          <path d="M16 40 H48 L44 50 H20 Z" pathLength={1} data-draw style={d(0.2)} />
          <path d="M12 54 H52" pathLength={1} data-draw style={d(0.4)} />
          <path d="M22 40 Q32 34 42 40" pathLength={1} data-draw style={d(0.5)} />
        </>
      )}
      {id === "bhoj" && (
        <>
          <path d="M8 40 Q20 14 56 18 Q48 48 8 40 Z" pathLength={1} data-draw />
          <path d="M10 39 Q32 30 54 19" pathLength={1} data-draw style={d(0.2)} />
          <circle cx="30" cy="31" r="5" pathLength={1} data-draw style={d(0.4)} />
          <circle cx="42" cy="26" r="3" pathLength={1} data-draw style={d(0.5)} />
        </>
      )}
    </svg>
  );
}

export function MarigoldPetal({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="-10 -14 20 28" className={className} style={style} aria-hidden>
      <path d={petal(-12, 12, 8)} fill="currentColor" />
    </svg>
  );
}
