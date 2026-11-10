import { createFileRoute } from "@tanstack/react-router";
import fumoir from "@/assets/fumoir.jpg";
import { Header, Footer } from "@/components/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useT } from "@/lib/i18n";
import { CinematicImage, Reveal } from "@/components/LuxuryMotion";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique — Saumonerie de Varennes" },
      { name: "description", content: "Dos, cœur, pavés, dés et tranches de saumon fumé écossais artisanal." },
      { property: "og:title", content: "Boutique — Saumonerie de Varennes" },
      { property: "og:description", content: "Toute notre gamme de saumon fumé écossais artisanal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Boutique,
});

function Boutique() {
  const { t } = useT();
  return (
    <div className="bg-background text-foreground">
      <Header />
      <section className="relative flex h-[65svh] min-h-[480px] items-end overflow-hidden">
        <CinematicImage src={fumoir} alt="Fumoir artisanal" className="absolute inset-0" eager />
        <div className="absolute inset-0 bg-hero-veil" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16">
          <p className="eyebrow">{t("shopEyebrow")}</p>
          <Reveal><h1 className="mt-4 font-display text-6xl md:text-8xl">{t("shop")}</h1></Reveal>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-x-10 gap-y-20 px-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => <Reveal key={p.name} delay={(i % 3) * 0.08}><ProductCard p={p} /></Reveal>)}
      </section>
      <Footer />
    </div>
  );
}
