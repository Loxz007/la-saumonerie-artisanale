import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

/**
 * Immersive 2nd section.
 * - Canvas scene: dark water, a thin light beam, particles and an articulated, swimming fish
 *   (stylised silhouette: the body flexes toward the tail, the tail beats, the heading eases through turns).
 * - Text sequence is scroll-driven (GSAP ScrollTrigger scrub) inside a sticky stage.
 * - No JS / reduced motion: static, fully readable layout with a single still frame.
 */
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (v: number) => v * v * (3 - 2 * v);
type Key = [p: number, x: number, y: number, s: number, a: number];

// Fish trajectory by scroll progress (x,y as fraction of the stage, s = scale factor, a = opacity)
const path = (mobile: boolean): Key[] => mobile
  ? [[0, 0.2, 0.3, 0.55, 0], [0.26, 0.3, 0.3, 0.6, 0], [0.4, 0.5, 0.3, 0.8, 1], [0.52, 0.5, 0.31, 1.05, 1], [0.7, 0.62, 0.27, 0.9, 1], [0.86, 0.66, 0.26, 0.85, 1], [1, 0.78, 0.2, 0.4, 0]]
  : [[0, 0.22, 0.52, 0.6, 0], [0.26, 0.3, 0.5, 0.65, 0], [0.4, 0.5, 0.48, 0.9, 1], [0.52, 0.52, 0.5, 1.25, 1], [0.7, 0.7, 0.45, 1.05, 1], [0.86, 0.76, 0.43, 1, 1], [1, 0.9, 0.34, 0.42, 0]];

function sample(keys: Key[], p: number) {
  let i = 0;
  while (i < keys.length - 2 && p > keys[i + 1]![0]) i++;
  const a = keys[i]!, b = keys[i + 1]!;
  const k = smooth(clamp((p - a[0]) / (b[0] - a[0] || 1)));
  return { x: a[1] + (b[1] - a[1]) * k, y: a[2] + (b[2] - a[2]) * k, s: a[3] + (b[3] - a[3]) * k, a: a[4] + (b[4] - a[4]) * k };
}

export function SelectionScene() {
  const { t } = useT();
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const words = t("selQuote").split(" ");

  useEffect(() => {
    const el = root.current, c = canvas.current;
    if (!el || !c) return;
    const ctx2d = c.getContext("2d");
    if (!ctx2d) return;
    const g: CanvasRenderingContext2D = ctx2d;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, mobile = false;
    const resize = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = c.clientWidth; H = c.clientHeight; mobile = W < 700;
      c.width = Math.round(W * d); c.height = Math.round(H * d);
      g.setTransform(d, 0, 0, d, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, (_, i) => ({ x: (i * 87.33) % 1, y: (i * 53.37) % 1, s: (i % 3 + 1) * 0.4 }));
    const st = { p: 0, shown: 0, mx: 0, my: 0, mxs: 0, mys: 0, px: 0, py: 0, vx: 0, vy: 0, angle: 0, active: true, canvasOpacity: 1 };

    function fish(time: number, speed: number, flexAmp: number) {
      const wave = Math.sin(time * 3.3 * speed);
      const body = g.createLinearGradient(-200, -75, 210, 95);
      body.addColorStop(0, "#3b4141"); body.addColorStop(0.25, "#9da49c"); body.addColorStop(0.48, "#ded9c7"); body.addColorStop(0.7, "#9b8e83"); body.addColorStop(1, "#34383a");
      g.shadowColor = "rgba(195,166,132,.17)"; g.shadowBlur = 55;
      const pts: { x: number; y: number; r: number }[] = [];
      for (let i = 0; i <= 40; i++) {
        const u = i / 40;
        pts.push({ x: -245 + 465 * u, y: Math.pow(1 - u, 2) * flexAmp * Math.sin(time * 3.3 * speed + u * 3), r: Math.pow(Math.sin(Math.PI * u), 0.72) * 69 + 7 });
      }
      g.beginPath(); g.moveTo(pts[0]!.x, pts[0]!.y);
      for (const p of pts) g.lineTo(p.x, p.y - p.r);
      for (let i = 40; i >= 0; i--) { const p = pts[i]!; g.lineTo(p.x, p.y + p.r * 0.75); }
      g.closePath(); g.fillStyle = body; g.fill(); g.shadowBlur = 0; g.strokeStyle = "rgba(231,224,207,.34)"; g.lineWidth = 1.2; g.stroke();
      // tail follows the flexing body
      g.save(); g.translate(-244, flexAmp * wave); g.rotate(0.12 * wave * (flexAmp / 20)); g.fillStyle = "#777a72";
      g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(-67, -70, -93, -62); g.quadraticCurveTo(-51, -12, -91, 65); g.quadraticCurveTo(-54, 72, 0, 0); g.fill(); g.restore();
      // fins adjust slightly with the beat
      const fa = Math.sin(time * 1.6 + 1) * 0.06;
      g.fillStyle = "#77786f";
      g.save(); g.translate(-50, -55); g.rotate(fa); g.translate(50, 55);
      g.beginPath(); g.moveTo(-50, -55); g.quadraticCurveTo(-16, -115, 5, -74); g.lineTo(22, -52); g.fill(); g.restore();
      g.save(); g.translate(55, 50); g.rotate(-fa * 1.5); g.translate(-55, -50);
      g.beginPath(); g.moveTo(55, 50); g.quadraticCurveTo(25, 104, -9, 75); g.lineTo(-12, 42); g.fill(); g.restore();
      const flank = g.createLinearGradient(0, -20, 0, 50);
      flank.addColorStop(0, "rgba(200,149,137,0)"); flank.addColorStop(0.6, "rgba(212,145,126,.24)"); flank.addColorStop(1, "rgba(212,145,126,0)");
      g.fillStyle = flank; g.beginPath(); g.ellipse(3, 13, 155, 34, -0.04, 0, 7); g.fill();
      for (let i = 0; i < 75; i++) { g.fillStyle = `rgba(35,41,42,${0.06 + (i % 4) * 0.035})`; g.beginPath(); g.arc(-135 + (i * 43) % 290, -30 + (i * 29) % 57, 1.2 + (i % 3) * 0.55, 0, 7); g.fill(); }
      g.fillStyle = "#111719"; g.beginPath(); g.arc(164, -18, 4.2, 0, 7); g.fill();
      g.fillStyle = "rgba(238,226,199,.65)"; g.beginPath(); g.arc(165, -19, 1, 0, 7); g.fill();
      g.strokeStyle = "rgba(40,46,47,.65)"; g.beginPath(); g.moveTo(173, 21); g.quadraticCurveTo(205, 29, 222, 14); g.stroke();
    }

    function draw(ms: number, still = false) {
      const time = ms / 1000;
      // eased scroll progress → no jerks
      st.shown += (st.p - st.shown) * (still ? 1 : 0.07);
      st.mxs += (st.mx - st.mxs) * 0.04; st.mys += (st.my - st.mys) * 0.04;
      g.clearRect(0, 0, W, H);
      const bg = g.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#060708"); bg.addColorStop(0.6, "#0b0e10"); bg.addColorStop(1, "#030405");
      g.fillStyle = bg; g.fillRect(0, 0, W, H);
      g.globalAlpha = st.canvasOpacity;

      // thin light beam crossing the water (reacts only slightly to the mouse)
      const bx = st.mxs * 14;
      const beamA = clamp(st.shown / 0.06) * (1 - clamp((st.shown - 0.86) / 0.1));
      const beam = g.createLinearGradient(W * 0.5, 0, W * 0.8, H);
      beam.addColorStop(0, "rgba(178,151,111,0)"); beam.addColorStop(0.47, "rgba(178,151,111,.05)"); beam.addColorStop(0.53, "rgba(223,198,162,.11)"); beam.addColorStop(1, "rgba(178,151,111,0)");
      g.globalAlpha = st.canvasOpacity * (0.35 + 0.65 * beamA);
      g.fillStyle = beam; g.beginPath();
      g.moveTo(W * (0.62 + 0.035 * Math.sin(time * 0.23)) + bx, 0); g.lineTo(W * 0.95 + bx, H); g.lineTo(W * 0.57 + bx, H); g.lineTo(W * 0.58 + bx, 0); g.fill();
      g.globalAlpha = st.canvasOpacity;
      for (const p of particles) {
        const px = ((p.x * W + time * 3 * p.s + st.mxs * p.s * 6) % W + W) % W, py = ((p.y * H - time * 2 * p.s) % H + H) % H;
        g.fillStyle = `rgba(202,184,160,${0.08 + p.s * 0.035})`; g.beginPath(); g.arc(px, py, p.s, 0, 7); g.fill();
      }

      // fish: scripted course + autonomous wander (never driven by the cursor)
      const k = sample(path(mobile), still ? 0.8 : st.shown);
      const wx = Math.sin(time * 0.31) * W * 0.012, wy = Math.sin(time * 0.53 + 1) * H * 0.016;
      const x = k.x * W + wx, y = k.y * H + wy;
      const dt = 1 / 60;
      st.vx += ((x - st.px) / dt * 0.0 + (x - st.px) - st.vx) * 0.1; st.vy += ((y - st.py) - st.vy) * 0.1;
      st.px = x; st.py = y;
      const target = clamp(Math.atan2(st.vy, Math.abs(st.vx) + 1.2) * 0.9, -0.22, 0.22);
      st.angle += (target - st.angle) * 0.04;
      const sc = (mobile ? W / 520 : Math.min(W / 1200, H / 700) * 1.1) * k.s;
      const speed = 0.85 + clamp(Math.hypot(st.vx, st.vy) / 3) * 0.5; // tail beats a little faster when travelling
      const flexAmp = 15 + clamp(Math.hypot(st.vx, st.vy) / 3) * 8;
      g.save(); g.translate(x, y); g.rotate(st.angle); g.scale(sc, sc * (1 + Math.sin(time * 0.9) * 0.012));
      g.globalAlpha = st.canvasOpacity * k.a;
      fish(time, speed, flexAmp);
      g.restore(); g.globalAlpha = 1;
    }

    let raf = 0;
    const loop = (ms: number) => { if (st.active) draw(ms); raf = requestAnimationFrame(loop); };

    let cleanupGsap = () => {};
    let cancelled = false;
    if (reduced) {
      draw(2000, true);
    } else {
      raf = requestAnimationFrame(loop);
      const move = (e: MouseEvent) => { st.mx = e.clientX / window.innerWidth - 0.5; st.my = e.clientY / window.innerHeight - 0.5; };
      if (window.matchMedia("(pointer: fine)").matches) window.addEventListener("mousemove", move, { passive: true });
      void (async () => {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        el.classList.add("sel-anim");
        resize();
        const q = gsap.utils.selector(el);
        const gctx = gsap.context(() => {
          gsap.set(q(".sel-word"), { yPercent: 115, opacity: 0 });
          gsap.set(q(".sel-brand, .sel-cta-wrap, .sel-info"), { opacity: 0, y: 28 });
          const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 1.2, onUpdate: (s) => { st.p = s.progress; }, onToggle: (s) => { st.active = s.isActive; } } });
          tl.to(q(".sel-word"), { yPercent: 0, opacity: 1, duration: 0.14, stagger: 0.045, ease: "power3.out" }, 0.1)
            .to(q(".sel-quote"), { opacity: 0, y: -24, duration: 0.12, ease: "power2.in" }, 0.5)
            .to(q(".sel-brand"), { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.6)
            .to(q(".sel-cta-wrap"), { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.66)
            .to(q(".sel-info"), { opacity: 1, y: 0, duration: 0.12, ease: "power3.out" }, 0.74)
            .to(q(".sel-camera"), { scale: 1.1, duration: 0.16, ease: "power2.in" }, 0.86)
            .to(q(".sel-content"), { opacity: 0, duration: 0.14, ease: "power2.in" }, 0.88);
        }, el);
        ScrollTrigger.refresh();
        cleanupGsap = () => { gctx.revert(); el.classList.remove("sel-anim"); };
      })();
      const prevCleanup = () => window.removeEventListener("mousemove", move);
      return () => { cancelled = true; cancelAnimationFrame(raf); prevCleanup(); cleanupGsap(); window.removeEventListener("resize", resize); };
    }
    return () => { cancelled = true; window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section ref={root} id="selection" className="sel-root relative bg-background" aria-labelledby="sel-title">
      <div className="sel-stage relative flex min-h-svh items-center overflow-hidden">
        <canvas ref={canvas} className="sel-canvas" aria-hidden="true" />
        <div className="sel-shade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="sel-camera relative h-full w-full">
          <div className="sel-content relative mx-auto grid min-h-svh w-full max-w-7xl items-center px-6 py-20 md:py-0">
            <div className="sel-quote pointer-events-none absolute inset-x-6 top-1/2 z-10 -translate-y-1/2 text-center md:inset-x-0">
              <p className="sel-quote-text font-display text-4xl leading-[1.12] md:text-7xl">
                {words.map((w, i) => <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom"><span className="sel-word inline-block">{w}</span></span>)}
              </p>
            </div>
            <div className="sel-copy relative z-20 max-w-md">
              <p className="sel-brand eyebrow">Saumonerie de Varennes</p>
              <h2 id="sel-title" className="sel-brand mt-4 font-display text-4xl leading-tight md:text-6xl">Saumonerie <em className="italic">de Varennes</em></h2>
              <div className="sel-cta-wrap mt-8">
                <Button variant="editorial" asChild className="sel-cta h-12 px-0 text-xs"><Link to="/boutique">{t("selCta")}<ArrowUpRight /></Link></Button>
              </div>
              <div className="sel-info mt-10 border-l border-primary/50 pl-5">
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
