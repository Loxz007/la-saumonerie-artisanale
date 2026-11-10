import type { Product } from "@/lib/products";
import { useT } from "@/lib/i18n";

export function ProductCard({ p }: { p: Product }) {
  const { t } = useT();
  return (
    <a href={p.url} target="_blank" rel="noreferrer" className="group block">
      <div className="relative aspect-square overflow-hidden bg-card">
        <img src={p.image} alt={p.name} loading="lazy" width={600} height={600} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        {p.outOfStock && (
          <span className="absolute left-4 top-4 bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em]">{t("outOfStock")}</span>
        )}
      </div>
      <h3 className="mt-5 font-display text-xl leading-tight group-hover:text-primary">{p.name}</h3>
      <div className="mt-2 flex items-baseline justify-between text-sm">
        <span className="text-primary">{p.price}</span>
        <span className="text-muted-foreground">{p.perKg}</span>
      </div>
    </a>
  );
}
