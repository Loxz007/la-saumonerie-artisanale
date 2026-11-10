import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { langs, useT } from "@/lib/i18n";

function LangSwitch() {
  const { lang, setLang } = useT();
  return (
    <div className="flex gap-1 text-xs uppercase">
      {langs.map((l) => (
        <Button variant="ghost" size="sm" key={l} onClick={() => setLang(l)} aria-label={l.toUpperCase()} aria-pressed={lang === l} className={`h-8 px-2 text-[10px] uppercase ${lang === l ? "text-primary" : "text-foreground/60 hover:text-foreground"}`}>
          {l}
        </Button>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const { t } = useT();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", escape); };
  }, [open]);
  return (
    <header className={`site-header fixed inset-x-0 top-0 z-40 ${scrolled || open ? "bg-background/95 border-b border-border" : "border-b border-transparent"}`}>
      <div className={`relative z-50 mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-5 md:px-12 ${scrolled ? "py-4" : "py-7"}`}>
        <Link to="/" aria-label="Saumonerie de Varennes" className="font-display text-3xl text-foreground" onClick={() => setOpen(false)}>
          S<span className="text-primary">·</span>V<span className="ml-4 hidden font-sans text-[9px] uppercase leading-relaxed lg:inline-block">Saumonerie<br />de Varennes</span>
        </Link>
        <div className="flex items-center gap-3 md:gap-8">
          <LangSwitch />
          <Button asChild variant="editorial" className="hidden h-10 px-0 text-[11px] uppercase md:inline-flex"><Link to="/boutique" onClick={() => setOpen(false)}>{t("shop")}<ArrowUpRight /></Link></Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-menu" aria-label={open ? t("close") : t("menu")}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      <AnimatePresence>{open && <motion.nav id="site-menu" aria-label={t("nav")} className="fixed inset-0 flex flex-col justify-center gap-8 bg-background px-8 md:px-24" initial={reduced ? false : { opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}>
        <p className="eyebrow">Saumonerie de Varennes</p>
        <Link to="/" onClick={() => setOpen(false)} className="menu-link font-display text-5xl md:text-8xl">{t("home")}<ArrowUpRight /></Link>
        <Link to="/boutique" onClick={() => setOpen(false)} className="menu-link font-display text-5xl md:text-8xl">{t("shop")}<ArrowUpRight /></Link>
        <p className="mt-12 text-xs text-muted-foreground">Varennes, France</p>
      </motion.nav>}</AnimatePresence>
    </header>
  );
}

export function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">Saumonerie de Varennes</p>
          <p className="mt-3 text-sm text-muted-foreground">{t("footerTag")}</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="eyebrow mb-3">{t("nav")}</p>
          <Link to="/" className="block hover:text-primary">{t("home")}</Link>
          <Link to="/boutique" className="block hover:text-primary">{t("shop")}</Link>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="eyebrow mb-3">{t("contact")}</p>
          <p>Varennes, France</p>
        </div>
      </div>
    </footer>
  );
}
