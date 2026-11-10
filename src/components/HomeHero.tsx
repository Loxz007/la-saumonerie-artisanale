import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import pave from "@/assets/pave-saumon.png";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

const letters = "SAUMON".split("");

export function HomeHero() {
  const { t } = useT();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    let cancelled = false;
    void (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.08 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const q = gsap.utils.selector(el);
      const ctx = gsap.context(() => {
        gsap.from(q(".hero-letter"), { yPercent: 110, duration: 1.5, ease: "expo.out", stagger: 0.09, delay: 0.3 });
        gsap.from(q(".hero-product"), { opacity: 0, scale: 0.78, z: -300, duration: 1.4, ease: "power3.out", delay: 0.5 });
        gsap.from(q(".hero-product"), { z: -300, duration: 2, ease: "power4.out", delay: 0.5 });
        gsap.from(q(".hero-fade"), { opacity: 0, y: 16, duration: 1.2, ease: "power3.out", stagger: 0.12, delay: 1.2 });
        gsap.to(q(".hero-spin"), { rotationY: 26, duration: 11, ease: "sine.inOut", yoyo: true, repeat: -1, startAt: { rotationY: -26 } });
        gsap.to(q(".hero-spin"), { rotationX: 6, rotationZ: -4, duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1, startAt: { rotationX: -4, rotationZ: 3 } });
        gsap.to(q(".hero-float"), { y: 16, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1, startAt: { y: -16 } });
        gsap.to(q(".hero-shadow"), { scale: 0.82, opacity: 0.35, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 });

        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 1.2 } });
        tl.to(q(".hero-product-wrap"), { yPercent: -70, scale: 1.12, rotation: -8, ease: "none" }, 0)
          .to(q(".hero-title-wrap"), { yPercent: 35, opacity: 0, ease: "none" }, 0)
          .to(q(".hero-dark"), { opacity: 0.85, ease: "none" }, 0)
          .to(q(".hero-ui"), { opacity: 0, y: -40, ease: "none" }, 0);
      }, el);

      // Mouse parallax with inertia on 4 layers
      const layers = [[".hero-bg", 8], [".hero-title-wrap", 18], [".hero-product-par", 34], [".hero-deco", 60]] as const;
      const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
      const move = (e: MouseEvent) => { target.x = e.clientX / window.innerWidth - 0.5; target.y = e.clientY / window.innerHeight - 0.5; };
      const setters = layers.map(([s, a]) => ({ a, x: gsap.quickSetter(q(s), "x", "px"), y: gsap.quickSetter(q(s), "y", "px") }));
      const loop = () => { cur.x += (target.x - cur.x) * 0.05; cur.y += (target.y - cur.y) * 0.05; setters.forEach((s) => { s.x(cur.x * s.a); s.y(cur.y * s.a); }); };
      window.addEventListener("mousemove", move, { passive: true });
      gsap.ticker.add(loop);

      cleanup = () => { window.removeEventListener("mousemove", move); gsap.ticker.remove(loop); gsap.ticker.remove(tick); ctx.revert(); lenis.destroy(); };
    })();
    return () => { cancelled = true; cleanup(); };
  }, []);

  return (
    <section ref={root} className="hero-immersive relative">
      <div className="hero-sticky sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <div className="hero-bg absolute -inset-10 bg-hero-glow" aria-hidden="true" />
        <div className="hero-title-wrap pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center" aria-hidden="true">
          <p className="hero-mega font-display">{letters.map((l, i) => <span key={i} className="inline-block overflow-hidden align-bottom"><span className="hero-letter inline-block">{l}</span></span>)}</p>
        </div>
        <div className="hero-product-par relative z-10" style={{ perspective: "1200px" }}>
          <div className="hero-product-wrap">
            <div className="hero-product" style={{ transformStyle: "preserve-3d" }}>
              <div className="hero-float"><div className="hero-spin" style={{ transformStyle: "preserve-3d" }}>
                <img src={pave} alt="Pavé de saumon d'Écosse" width={1024} height={1024} className="hero-pave" />
              </div></div>
              <div className="hero-shadow mx-auto" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="hero-deco pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          <span className="hero-ring left-[14%] top-[22%] h-24 w-24" />
          <span className="hero-ring bottom-[24%] right-[12%] h-40 w-40" />
          <span className="eyebrow absolute left-[10%] top-[34%] hidden md:block">{t("s1s")}</span>
          <span className="eyebrow absolute bottom-[34%] right-[9%] hidden md:block">{t("smokedArtisan")}</span>
        </div>
        <div className="hero-dark pointer-events-none absolute inset-0 z-30 bg-background opacity-0" aria-hidden="true" />
        <div className="hero-ui absolute inset-x-0 bottom-0 z-40 px-5 pb-8 text-center">
          <h1 className="sr-only">Saumonerie de Varennes</h1>
          <p className="hero-fade text-[10px] uppercase text-foreground/80">Varennes · France</p>
          <p className="hero-fade mx-auto mt-3 max-w-md text-sm text-foreground/80 md:text-base">{t("heroSub")}</p>
          <div className="hero-fade mt-5 flex items-center justify-center gap-6">
            <Button variant="editorial" asChild className="h-11 px-0 text-xs"><Link to="/boutique">{t("shop")}<ArrowUpRight /></Link></Button>
            <Button asChild variant="ghost" className="gap-3 text-[10px] uppercase"><a href="#activite">{t("discover")}<ArrowDown /></a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
