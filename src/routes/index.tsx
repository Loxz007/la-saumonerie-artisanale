import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-saumon.jpg";
import fumoir from "@/assets/fumoir.jpg";
import { Header, Footer } from "@/components/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

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

const savoirFaire = [
  { n: "01", title: "Sélection", sub: "Saumon d'Écosse", text: "Des saumons écossais choisis un à un pour la finesse de leur chair et leur juste persillage.", img: hero },
  { n: "02", title: "Fumage", sub: "Au feu de bois", text: "Un salage à sec puis un fumage lent, dans la pure tradition artisanale, pour un goût délicat.", img: fumoir },
  { n: "03", title: "Tranchage", sub: "À la main", text: "Chaque pièce est parée et tranchée à la main : dos, cœur, pavés ou tranches prêtes à servir.", img: hero },
];

function Index() {
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
            <p className="font-display text-lg italic md:text-2xl">L'excellence du saumon fumé, depuis Varennes</p>
            <span className="h-px w-12 bg-foreground/50" />
          </div>
        </div>
        <a href="#activite" className="eyebrow absolute bottom-10 left-1/2 -translate-x-1/2">Découvrir</a>
      </section>

      <section id="activite" className="mx-auto max-w-7xl px-6 py-28">
        <p className="eyebrow">Notre savoir-faire</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl md:text-6xl">Une création artisanale, du choix du poisson à votre table.</h2>
        <div className="mt-20 space-y-28">
          {savoirFaire.map((s, i) => (
            <div key={s.n} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="font-display text-7xl text-primary/80">{s.n}</span>
                <h3 className="mt-4 font-display text-3xl uppercase tracking-wide">{s.title}</h3>
                <p className="eyebrow mt-2">{s.sub}</p>
                <p className="mt-6 max-w-md text-muted-foreground">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-28">
        <img src={fumoir} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative mx-auto max-w-7xl px-6">
          <h2 className="max-w-2xl font-display text-4xl md:text-5xl">Des chiffres qui donnent du goût à nos engagements</h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {[["100%", "saumon écossais"], ["8", "produits d'exception"], ["1", "savoir-faire artisanal"]].map(([v, l]) => (
              <div key={l} className="border-t border-primary/50 pt-6">
                <p className="font-display text-6xl text-primary">{v}</p>
                <p className="eyebrow mt-3">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Nos produits phares</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">La boutique</h2>
          </div>
          <Link to="/boutique" className="rounded-full border border-primary px-8 py-3 text-xs uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-primary-foreground">Voir tous les produits</Link>
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => <ProductCard key={p.name} p={p} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}
