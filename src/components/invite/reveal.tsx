import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

/** Adds data-visible when scrolled into view. Pure CSS transitions do the motion. */
export function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  draw = false,
  children,
  id,
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  draw?: boolean;
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.02 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-visible={visible}
      className={`${draw ? "reveal-draw" : "reveal"} ${className}`}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
