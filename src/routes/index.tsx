import { createFileRoute, Link } from "@tanstack/react-router";
import fumoir from "@/assets/fumoir.jpg";
import slicing from "@/assets/tranchage-artisanal.jpg";
import { HomeHero } from "@/components/HomeHero";
import { SelectionScene } from "@/components/SelectionScene";
import { Header, Footer } from "@/components/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useT, type Key } from "@/lib/i18n";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CinematicImage, Reveal } from "@/components/LuxuryMotion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saumonerie de Varennes — Saumon fumé artisanal" },
      { name: "description", content: "L'excellence du saumon fumé écossais, fumé et tranché à la main par la Saumonerie de Varennes." },
      { property: "og:title", content: "Saumonerie de Varennes — Saumon fumé artisanal" },
      { property: "og:description", content: "L'excellence du saumon fumé écossais, fumé et tranché à la main." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const savoirFaire: { n: string; title: Key; sub: Key; text: Key; img: string }[] = [
  { n: "02", title: "s2t", sub: "s2s", text: "s2x", img: fumoir },
  { n: "03", title: "s3t", sub: "s3s", text: "s3x", img: slicing },
];

function Index() {
  const { t } = useT();
  return (
    <div className="bg-background text-foreground">
      <Header />
      <HomeHero />
      <SelectionScene />

      <section id="activite" className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <Reveal className="grid gap-8 md:grid-cols-[1fr_2fr]"><p className="eyebrow pt-3">{t("craftEyebrow")}</p><h2 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">{t("craftTitle")}</h2></Reveal>
        <div className="mt-24 space-y-24 md:space-y-40">
          {savoirFaire.map((s, i) => (
            <div key={s.n} className={`craft-row grid items-center gap-10 md:grid-cols-[1.3fr_1fr] md:gap-24 ${(i + 1) % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <CinematicImage src={s.img} alt={t(s.title)} className={i === 0 ? "aspect-[4/5]" : "aspect-[5/4]"} />
              <Reveal>
                <span className="text-xs text-primary">— {s.n}</span>
                <h3 className="mt-8 font-display text-4xl md:text-5xl">{t(s.title)}</h3>
                <p className="eyebrow mt-2">{t(s.sub)}</p>
                <p className="mt-6 max-w-md text-muted-foreground">{t(s.text)}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-28">
        <img src={fumoir} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
        <Reveal className="relative mx-auto max-w-7xl px-6">
          <h2 className="max-w-2xl font-display text-4xl md:text-5xl">{t("statsTitle")}</h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {([["100%", "st1"], ["8", "st2"], ["1", "st3"]] as [string, Key][]).map(([v, l]) => (
              <div key={l} className="border-t border-primary/50 pt-6">
                <p className="font-display text-6xl text-primary">{v}</p>
                <p className="eyebrow mt-3">{t(l)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{t("featured")}</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">{t("shop")}</h2>
          </div>
          <Button asChild variant="editorial" className="h-12 px-0 text-xs"><Link to="/boutique">{t("seeAll")}<ArrowUpRight /></Link></Button>
        </Reveal>
        <div className="featured-products mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p, i) => <Reveal key={p.name} delay={i * 0.08}><ProductCard p={p} /></Reveal>)}
        </div>
      </section>
      <Footer />
    </div>
  );
}
