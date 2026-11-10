import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLocation } from "@tanstack/react-router";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function CinematicImage({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return <motion.div ref={ref} className={`cinematic-image ${className}`} initial={reduced ? false : { clipPath: "inset(8% 0 8% 0)", opacity: 0 }} whileInView={{ clipPath: "inset(0% 0 0% 0)", opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}><motion.img src={src} alt={alt} loading={eager ? "eager" : "lazy"} style={reduced ? {} : { y }} className="h-full w-full object-cover" /></motion.div>;
}

export function LuxuryExperience({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [intro, setIntro] = useState(true);
  const cursor = useRef<HTMLDivElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });
  useEffect(() => {
    const timeout = window.setTimeout(() => setIntro(false), reduced ? 0 : 1450);
    return () => window.clearTimeout(timeout);
  }, [reduced]);
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: MouseEvent) => {
      if (!cursor.current) return;
      cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.current.dataset['active'] = String(event.target instanceof Element && Boolean(event.target.closest("a, button")));
      cursor.current.dataset['visible'] = "true";
    };
    const leave = () => { if (cursor.current) cursor.current.dataset['visible'] = "false"; };
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); };
  }, [reduced]);
  return <>
    <AnimatePresence>{intro && !reduced && <motion.div aria-hidden="true" className="luxury-intro" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}><motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}><p className="font-display text-5xl">S<span className="text-primary">·</span>V</p><p className="mt-5 text-[10px] uppercase">Saumonerie de Varennes</p><span className="intro-line" /></motion.div></motion.div>}</AnimatePresence>
    <motion.div key={pathname} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.65 }}>{children}</motion.div>
    <div ref={cursor} className="luxury-cursor" aria-hidden="true"><span /></div>
  </>;
}