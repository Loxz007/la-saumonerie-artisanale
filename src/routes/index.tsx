import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-saumon.jpg";
import fumoir from "@/assets/fumoir.jpg";
import { Header, Footer } from "@/components/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useT, type Key } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saumonerie de Varennes — Saumon fumé artisanal" },
      { name: "description", content: "L'excellence du saumon fumé écossais, fumé et tranché à la main par la Saumonerie de Varennes." },
      { property: "og:title", content: "Saumonerie de Varennes — Saumon fumé artisanal" },
      { property: "og:description", content: "L'excellence du saumon fumé écossais, fumé et tranché à la main." },
    ],
  }),
  component: Index,
});

const savoirFaire: { n: string; title: Key; sub: Key; text: Key; img: string }[] = [
  { n: "01", title: "s1t", sub: "s1s", text: "s1x", img: hero },
  { n: "02", title: "s2t", sub: "s2s", text: "s2x", img: fumoir },
  { n: "03", title: "s3t", sub: "s3s", text: "s3x", img: hero },
];

function Index() {
  const { t } = useT();
  return (
    <div className="bg-background text-foreground">
      <Header />
      <section className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
        <img src={hero} alt="Saumon fumé tranché à la main" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-veil" />
        <div className="relative px-6 text-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <h1 className="font-display text-[13vw] uppercase leading-[0.9] tracking-tight md:text-[9vw]">Saumonerie</h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-foreground/50" />
            <p className="font-display text-lg italic md:text-2xl">{t("heroSub")}</p>
            <span className="h-px w-12 bg-foreground/50" />
          </div>
        </div>
        <a href="#activite" className="eyebrow absolute bottom-10 left-1/2 -translate-x-1/2">{t("discover")}</a>
      </section>

      <section id="activite" className="mx-auto max-w-7xl px-6 py-28">
        <p className="eyebrow">{t("craftEyebrow")}</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl md:text-6xl">{t("craftTitle")}</h2>
        <div className="mt-20 space-y-28">
          {savoirFaire.map((s, i) => (
            <div key={s.n} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={t(s.title)} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="font-display text-7xl text-primary/80">{s.n}</span>
                <h3 className="mt-4 font-display text-3xl uppercase tracking-wide">{t(s.title)}</h3>
                <p className="eyebrow mt-2">{t(s.sub)}</p>
                <p className="mt-6 max-w-md text-muted-foreground">{t(s.text)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-28">
        <img src={fumoir} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative mx-auto max-w-7xl px-6">
          <h2 className="max-w-2xl font-display text-4xl md:text-5xl">{t("statsTitle")}</h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {([["100%", "st1"], ["8", "st2"], ["1", "st3"]] as [string, Key][]).map(([v, l]) => (
              <div key={l} className="border-t border-primary/50 pt-6">
                <p className="font-display text-6xl text-primary">{v}</p>
                <p className="eyebrow mt-3">{t(l)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{t("featured")}</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">{t("shop")}</h2>
          </div>
          <Link to="/boutique" className="rounded-full border border-primary px-8 py-3 text-xs uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-primary-foreground">{t("seeAll")}</Link>
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => <ProductCard key={p.name} p={p} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}
