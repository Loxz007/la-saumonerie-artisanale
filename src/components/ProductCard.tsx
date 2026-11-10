import type { Product } from "@/lib/products";
import { useT } from "@/lib/i18n";
import { ArrowUpRight } from "lucide-react";

export function ProductCard({ p }: { p: Product }) {
  const { t } = useT();
  return (
    <a href={p.url} target="_blank" rel="noreferrer" className="group block product-link">
      <div className="relative aspect-[4/5] overflow-hidden bg-card">
        <img src={p.image} alt={p.name} loading="lazy" width={600} height={600} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        {p.outOfStock && (
          <span className="absolute left-4 top-4 bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em]">{t("outOfStock")}</span>
        )}
      </div>
      <div className="mt-6 flex items-start justify-between gap-4"><h3 className="font-display text-xl leading-snug transition-colors group-hover:text-primary">{p.name}</h3><ArrowUpRight className="mt-1 size-4 shrink-0 text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-border pt-4 text-xs">
        <span className="text-primary">{p.price}</span>
        <span className="text-muted-foreground">{p.perKg}</span>
      </div>
    </a>
  );
}
