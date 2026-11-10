import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import pave from "@/assets/pave-saumon.png";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

/**
 * Immersive 2nd section — "Sélection · Saumon d'Écosse".
 * Without JS / with reduced motion: static, fully readable layout (no sticky, no hidden content).
 * With JS: tall scroll container + sticky stage driven by a scrubbed GSAP timeline.
 */
export function SelectionScene() {
  const { t } = useT();
  const root = useRef<HTMLElement>(null);
  const words = t("selQuote").split(" ");

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    let cancelled = false;
    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      el.classList.add("sel-anim");
      const q = gsap.utils.selector(el);
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const drift = mobile ? 0 : 24; // vw the salmon drifts to the right

      const ctx = gsap.context(() => {
        // initial states: scene almost black, nothing visible yet
        gsap.set(q(".sel-word"), { yPercent: 115, opacity: 0 });
        gsap.set(q(".sel-salmon"), { opacity: 0, scale: 0.86, y: 50, filter: "brightness(0.08) saturate(0.6)" });
        gsap.set(q(".sel-light"), { opacity: 0, xPercent: -60 });
        gsap.set(q(".sel-ray"), { opacity: 0, xPercent: -140 });
        gsap.set(q(".sel-brand, .sel-cta-wrap, .sel-info"), { opacity: 0, y: 28 });
        gsap.set(q(".sel-fog"), { opacity: 0 });

        // continuous, very slow ambient motion
        gsap.to(q(".sel-float"), { y: -14, rotation: 1.2, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(q(".sel-fog-a"), { xPercent: 12, yPercent: -6, duration: 22, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(q(".sel-fog-b"), { xPercent: -10, yPercent: 5, duration: 28, ease: "sine.inOut", yoyo: true, repeat: -1 });

        const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 1.2 } });
        // 1. near-black, thin ray glides, faint fog
        tl.to(q(".sel-fog"), { opacity: 1, duration: 0.14 }, 0)
          .to(q(".sel-ray"), { opacity: 0.9, xPercent: 160, duration: 0.3, ease: "power1.inOut" }, 0.02)
          .to(q(".sel-ray"), { opacity: 0, duration: 0.08 }, 0.26)
          // 2. opening line, word by word
          .to(q(".sel-word"), { yPercent: 0, opacity: 1, duration: 0.14, stagger: 0.045, ease: "power3.out" }, 0.1)
          // 3. salmon emerges, side light reveals matter
          .to(q(".sel-salmon"), { opacity: 1, scale: 1, y: 0, filter: "brightness(1) saturate(1)", duration: 0.2, ease: "power2.out" }, 0.3)
          .to(q(".sel-light"), { opacity: 1, xPercent: 0, duration: 0.22, ease: "power2.out" }, 0.3)
          // 4. drift right, quote leaves
          .to(q(".sel-quote"), { opacity: 0, y: -24, duration: 0.12, ease: "power2.in" }, 0.5)
          .to(q(".sel-drift"), { x: `${drift}vw`, y: mobile ? "-8vh" : 0, duration: 0.2, ease: "power2.inOut" }, 0.5)
          .to(q(".sel-light"), { xPercent: 18, duration: 0.2 }, 0.5)
          .to(q(".sel-brand"), { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.62)
          .to(q(".sel-cta-wrap"), { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.68)
          // 5. product information
          .to(q(".sel-info"), { opacity: 1, y: 0, duration: 0.12, ease: "power3.out" }, 0.76)
          // 8. camera advance, everything leaves toward the next section
          .to(q(".sel-camera"), { scale: 1.14, duration: 0.16, ease: "power2.in" }, 0.86)
          .to(q(".sel-content"), { opacity: 0, duration: 0.14, ease: "power2.in" }, 0.88)
          .to(q(".sel-bg"), { opacity: 0, duration: 0.1 }, 0.92);

        // 7. mouse parallax with inertia (bg ≈ still, text slight, salmon a bit more)
        const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
        const move = (e: MouseEvent) => { target.x = e.clientX / window.innerWidth - 0.5; target.y = e.clientY / window.innerHeight - 0.5; };
        const layers = ([[".sel-bg", 3], [".sel-text-par", 9], [".sel-salmon-par", 20]] as const).map(([s, a]) => ({ a, x: gsap.quickSetter(q(s), "x", "px"), y: gsap.quickSetter(q(s), "y", "px") }));
        const loop = () => { cur.x += (target.x - cur.x) * 0.045; cur.y += (target.y - cur.y) * 0.045; layers.forEach((l) => { l.x(cur.x * l.a); l.y(cur.y * l.a); }); };
        if (window.matchMedia("(pointer: fine)").matches) { window.addEventListener("mousemove", move, { passive: true }); gsap.ticker.add(loop); }
        cleanup = () => { window.removeEventListener("mousemove", move); gsap.ticker.remove(loop); };
      }, el);
      const prev = cleanup;
      cleanup = () => { prev(); ctx.revert(); el.classList.remove("sel-anim"); };
      ScrollTrigger.refresh();
    })();
    return () => { cancelled = true; cleanup(); };
  }, []);

  return (
    <section ref={root} id="selection" className="sel-root relative bg-background" aria-labelledby="sel-title">
      <div className="sel-stage relative flex min-h-svh items-center overflow-hidden">
        <div className="sel-bg pointer-events-none absolute -inset-8" aria-hidden="true">
          <div className="sel-fog sel-fog-a" /><div className="sel-fog sel-fog-b" />
          <div className="sel-ray" />
        </div>
        <div className="sel-camera relative h-full w-full">
          <div className="sel-content relative mx-auto grid min-h-svh w-full max-w-7xl items-center gap-8 px-6 py-24 md:grid-cols-2 md:py-0">
            {/* Opening line — shown first, then yields the space */}
            <div className="sel-quote sel-text-par pointer-events-none absolute inset-x-6 top-1/2 z-10 -translate-y-1/2 text-center md:inset-x-0">
              <p className="sel-quote-text font-display text-4xl leading-[1.12] md:text-7xl">
                {words.map((w, i) => <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom"><span className="sel-word inline-block">{w}</span></span>)}
              </p>
            </div>
            {/* Left column: house signature + CTA */}
            <div className="sel-text-par relative z-20 order-2 md:order-1">
              <p className="sel-brand eyebrow">Saumonerie de Varennes</p>
              <h2 id="sel-title" className="sel-brand mt-4 font-display text-4xl leading-tight md:text-6xl">Saumonerie <em className="italic">de Varennes</em></h2>
              <div className="sel-cta-wrap mt-10">
                <Button variant="editorial" asChild className="sel-cta h-12 px-0 text-xs"><Link to="/boutique">{t("selCta")}<ArrowUpRight /></Link></Button>
              </div>
            </div>
            {/* Right column: the salmon + its product information */}
            <div className="sel-drift relative z-10 order-1 md:order-2">
              <div className="sel-salmon-par">
                <div className="sel-float">
                  <div className="sel-salmon relative mx-auto">
                    <img src={pave} alt="Pavé de saumon d'Écosse" width={1024} height={1024} loading="lazy" className="sel-salmon-img" />
                    <div className="sel-light" aria-hidden="true" />
                  </div>
                </div>
                <div className="sel-shadow" aria-hidden="true" />
              </div>
              <div className="sel-info mx-auto mt-6 max-w-sm border-l border-primary/50 pl-5 md:mt-8">
                <p className="text-xs text-primary">— 01 · {t("s1t")}</p>
                <p className="eyebrow mt-2">{t("s1s")}</p>
                <p className="mt-3 text-sm text-muted-foreground md:text-base">{t("s1x")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
