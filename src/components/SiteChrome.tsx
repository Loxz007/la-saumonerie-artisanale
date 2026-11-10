import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <Link to="/" className="font-display text-2xl tracking-wide text-foreground">
          S<span className="text-primary">·</span>V
        </Link>
        <button onClick={() => setOpen(!open)} className="rounded-full border border-foreground/40 px-6 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition hover:border-primary hover:text-primary">
          {open ? "Fermer" : "Menu"} <span className="ml-2">≡</span>
        </button>
      </div>
      {open && (
        <nav className="mx-auto flex max-w-7xl justify-end gap-8 px-6 text-sm uppercase tracking-[0.25em]">
          <Link to="/" onClick={() => setOpen(false)} className="hover:text-primary">Accueil</Link>
          <Link to="/boutique" onClick={() => setOpen(false)} className="hover:text-primary">Boutique</Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">Saumonerie de Varennes</p>
          <p className="mt-3 text-sm text-muted-foreground">Saumon fumé artisanal, une tradition au service de votre table.</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="eyebrow mb-3">Navigation</p>
          <Link to="/" className="block hover:text-primary">Accueil</Link>
          <Link to="/boutique" className="block hover:text-primary">Boutique</Link>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="eyebrow mb-3">Contact</p>
          <p>Varennes, France</p>
        </div>
      </div>
    </footer>
  );
}
