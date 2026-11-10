import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { langs, useT } from "@/lib/i18n";

function LangSwitch() {
  const { lang, setLang } = useT();
  return (
    <div className="flex gap-3 text-xs uppercase tracking-[0.2em]">
      {langs.map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={lang === l ? "text-primary" : "text-foreground/60 hover:text-foreground"}>
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useT();
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-8">
        <Link to="/" className="font-display text-2xl tracking-wide text-foreground">
          S<span className="text-primary">·</span>V
        </Link>
        <div className="flex items-center gap-6">
          <LangSwitch />
          <button onClick={() => setOpen(!open)} className="rounded-full border border-foreground/40 px-6 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition hover:border-primary hover:text-primary">
            {open ? t("close") : t("menu")} <span className="ml-2">≡</span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="mx-auto flex max-w-7xl justify-end gap-8 px-6 text-sm uppercase tracking-[0.25em]">
          <Link to="/" onClick={() => setOpen(false)} className="hover:text-primary">{t("home")}</Link>
          <Link to="/boutique" onClick={() => setOpen(false)} className="hover:text-primary">{t("shop")}</Link>
        </nav>
      )}
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
