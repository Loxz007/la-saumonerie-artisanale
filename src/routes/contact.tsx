import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Truck } from "lucide-react";
import { Header, Footer } from "@/components/SiteChrome";
import { Reveal } from "@/components/LuxuryMotion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/business";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact & FAQ — Saumonerie de Varennes" },
    { name: "description", content: "Contactez la saumonerie : contact@saumonerie-jarcy.fr. Livraison sous 72 h et réponses à vos questions." },
    { property: "og:title", content: "Contact & FAQ — Saumonerie de Varennes" },
    { property: "og:description", content: "Votre service client et vos questions sur nos produits et la livraison sous 72 h." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Contact,
});

function Contact() {
  const { t } = useT();
  const email = <a className="break-all text-primary underline underline-offset-4" href={`mailto:${business.email}`}>{business.email}</a>;
  return <div className="bg-background text-foreground"><Header />
    <main className="mx-auto max-w-7xl px-6 pb-28 pt-40 md:pt-48">
      <Reveal><p className="eyebrow">Saumonerie de Varennes</p><h1 className="mt-6 font-display text-5xl md:text-7xl">{t("contact")}</h1></Reveal>
      <div className="mt-16 grid gap-16 border-t border-border pt-12 lg:grid-cols-[1fr_2fr]">
        <Reveal><Mail className="size-6 text-primary" /><h2 className="mt-6 font-display text-3xl">{t("writeUs")}</h2><p className="mt-6 text-sm">{email}</p><div className="mt-10 flex items-center gap-3 border-y border-border py-6"><Truck className="size-6 text-primary" /><p>{t("delivery")} {business.deliveryHours} h</p></div><Button asChild variant="editorial" className="mt-8 h-12 px-0"><Link to="/boutique">{t("shop")}<ArrowUpRight /></Link></Button></Reveal>
        <Reveal><h2 className="font-display text-3xl md:text-4xl">{t("faq")}</h2>
          <Tabs defaultValue="general" className="mt-8">
            <TabsList className="grid h-auto w-full grid-cols-1 justify-start gap-2 rounded-none border-b border-border bg-transparent p-0 sm:grid-cols-3">
              {(["general", "customer", "productInfo"] as const).map(key => <TabsTrigger key={key} value={key} className="whitespace-normal rounded-none border-b-2 border-transparent px-2 py-4 text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none">{t(key)}</TabsTrigger>)}
            </TabsList>
            <TabsContent value="general"><Accordion type="single" collapsible defaultValue="delivery"><AccordionItem value="delivery"><AccordionTrigger className="py-7 text-base">{t("deliveryQuestion")}</AccordionTrigger><AccordionContent className="text-muted-foreground">{t("delivery")} {business.deliveryHours} h.</AccordionContent></AccordionItem><AccordionItem value="contact"><AccordionTrigger className="py-7 text-base">{t("contactQuestion")}</AccordionTrigger><AccordionContent>{email}</AccordionContent></AccordionItem></Accordion></TabsContent>
            <TabsContent value="customer"><Accordion type="single" collapsible defaultValue="contact"><AccordionItem value="contact"><AccordionTrigger className="py-7 text-base">{t("contactQuestion")}</AccordionTrigger><AccordionContent>{email}</AccordionContent></AccordionItem></Accordion></TabsContent>
            <TabsContent value="productInfo"><Accordion type="single" collapsible defaultValue="range"><AccordionItem value="range"><AccordionTrigger className="py-7 text-base">{t("rangeQuestion")}</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">{t("rangeAnswer")}<Button asChild variant="editorial" className="mt-5 flex w-fit px-0"><Link to="/boutique">{t("shop")}<ArrowUpRight /></Link></Button></AccordionContent></AccordionItem></Accordion></TabsContent>
          </Tabs>
        </Reveal>
      </div>
    </main><Footer /></div>;
}