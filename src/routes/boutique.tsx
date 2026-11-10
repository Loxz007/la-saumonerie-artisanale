import { createFileRoute } from "@tanstack/react-router";
import fumoir from "@/assets/fumoir.jpg";
import { Header, Footer } from "@/components/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique — Saumonerie de Varennes" },
      { name: "description", content: "Dos, cœur, pavés, dés et tranches de saumon fumé écossais artisanal." },
      { property: "og:title", content: "Boutique — Saumonerie de Varennes" },
      { property: "og:description", content: "Toute notre gamme de saumon fumé écossais artisanal." },
    ],
  }),
  component: Boutique,
});

function Boutique() {
  const { t } = useT();
  return (
    <div className="bg-background text-foreground">
      <Header />
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden">
        <img src={fumoir} alt="Fumoir artisanal" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-veil" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16">
          <p className="eyebrow">{t("shopEyebrow")}</p>
          <h1 className="mt-4 font-display text-6xl uppercase md:text-8xl">{t("shop")}</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-x-10 gap-y-16 px-6 py-24 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.name} p={p} />)}
      </section>
      <Footer />
    </div>
  );
}
