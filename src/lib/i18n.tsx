import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const langs = ["fr", "en", "es", "nl", "de"] as const;
export type Lang = (typeof langs)[number];

const dict = {
  menu: { fr: "Menu", en: "Menu", es: "Menú", nl: "Menu", de: "Menü" },
  close: { fr: "Fermer", en: "Close", es: "Cerrar", nl: "Sluiten", de: "Schließen" },
  home: { fr: "Accueil", en: "Home", es: "Inicio", nl: "Home", de: "Startseite" },
  shop: { fr: "Boutique", en: "Shop", es: "Tienda", nl: "Winkel", de: "Shop" },
  heroSub: { fr: "L'excellence du saumon fumé, depuis Varennes", en: "Excellence in smoked salmon, from Varennes", es: "La excelencia del salmón ahumado, desde Varennes", nl: "Uitmuntende gerookte zalm, uit Varennes", de: "Exzellenter Räucherlachs aus Varennes" },
  discover: { fr: "Découvrir", en: "Discover", es: "Descubrir", nl: "Ontdek", de: "Entdecken" },
  craftEyebrow: { fr: "Notre savoir-faire", en: "Our craft", es: "Nuestro saber hacer", nl: "Ons vakmanschap", de: "Unser Handwerk" },
  craftTitle: { fr: "Une création artisanale, du choix du poisson à votre table.", en: "Handcrafted, from choosing the fish to your table.", es: "Una creación artesanal, de la elección del pescado a su mesa.", nl: "Ambachtelijk, van de keuze van de vis tot op uw tafel.", de: "Handwerklich hergestellt, von der Auswahl des Fisches bis auf Ihren Tisch." },
  s1t: { fr: "Sélection", en: "Selection", es: "Selección", nl: "Selectie", de: "Auswahl" },
  s1s: { fr: "Saumon d'Écosse", en: "Scottish salmon", es: "Salmón escocés", nl: "Schotse zalm", de: "Schottischer Lachs" },
  smokedArtisan: { fr: "Fumé · Artisanal", en: "Smoked · Artisanal", es: "Ahumado · Artesanal", nl: "Gerookt · Ambachtelijk", de: "Geräuchert · Handwerklich" },
  s1x: { fr: "Des saumons écossais choisis un à un pour la finesse de leur chair et leur juste persillage.", en: "Scottish salmon chosen one by one for the delicacy of their flesh and perfect marbling.", es: "Salmones escoceses elegidos uno a uno por la finura de su carne y su veteado justo.", nl: "Schotse zalm, één voor één gekozen om het fijne vlees en de perfecte marmering.", de: "Schottischer Lachs, einzeln ausgewählt für sein zartes Fleisch und seine feine Marmorierung." },
  s2t: { fr: "Fumage", en: "Smoking", es: "Ahumado", nl: "Roken", de: "Räuchern" },
  s2s: { fr: "Au feu de bois", en: "Over a wood fire", es: "Al fuego de leña", nl: "Boven houtvuur", de: "Über Holzfeuer" },
  s2x: { fr: "Un salage à sec puis un fumage lent, dans la pure tradition artisanale, pour un goût délicat.", en: "Dry salting followed by slow smoking, in the purest artisan tradition, for a delicate taste.", es: "Salazón en seco y ahumado lento, en la más pura tradición artesanal, para un sabor delicado.", nl: "Droog gezouten en langzaam gerookt, volgens pure ambachtelijke traditie, voor een delicate smaak.", de: "Trocken gesalzen und langsam geräuchert, nach reiner handwerklicher Tradition, für einen feinen Geschmack." },
  s3t: { fr: "Tranchage", en: "Slicing", es: "Corte", nl: "Snijden", de: "Schneiden" },
  s3s: { fr: "À la main", en: "By hand", es: "A mano", nl: "Met de hand", de: "Von Hand" },
  s3x: { fr: "Chaque pièce est parée et tranchée à la main : dos, cœur, pavés ou tranches prêtes à servir.", en: "Every piece is trimmed and sliced by hand: backs, hearts, portions or ready-to-serve slices.", es: "Cada pieza se pule y corta a mano: lomos, corazones, tacos o lonchas listas para servir.", nl: "Elk stuk wordt met de hand bijgesneden: rugfilet, hart, moten of plakjes klaar om te serveren.", de: "Jedes Stück wird von Hand pariert und geschnitten: Rücken, Herz, Filetstücke oder servierfertige Scheiben." },
  statsTitle: { fr: "Des chiffres qui donnent du goût à nos engagements", en: "Figures that give flavour to our commitments", es: "Cifras que dan sabor a nuestros compromisos", nl: "Cijfers die smaak geven aan onze beloften", de: "Zahlen, die unseren Versprechen Geschmack verleihen" },
  st1: { fr: "saumon écossais", en: "Scottish salmon", es: "salmón escocés", nl: "Schotse zalm", de: "schottischer Lachs" },
  st2: { fr: "produits d'exception", en: "exceptional products", es: "productos excepcionales", nl: "uitzonderlijke producten", de: "außergewöhnliche Produkte" },
  st3: { fr: "savoir-faire artisanal", en: "artisan craft", es: "saber hacer artesanal", nl: "ambachtelijk vakmanschap", de: "handwerkliches Können" },
  featured: { fr: "Nos produits phares", en: "Our signature products", es: "Nuestros productos estrella", nl: "Onze topproducten", de: "Unsere Spezialitäten" },
  seeAll: { fr: "Voir tous les produits", en: "View all products", es: "Ver todos los productos", nl: "Alle producten bekijken", de: "Alle Produkte ansehen" },
  shopEyebrow: { fr: "Saumon fumé écossais", en: "Scottish smoked salmon", es: "Salmón ahumado escocés", nl: "Schotse gerookte zalm", de: "Schottischer Räucherlachs" },
  outOfStock: { fr: "Rupture de stock", en: "Out of stock", es: "Agotado", nl: "Uitverkocht", de: "Ausverkauft" },
  footerTag: { fr: "Saumon fumé artisanal, une tradition au service de votre table.", en: "Artisan smoked salmon, a tradition at the service of your table.", es: "Salmón ahumado artesanal, una tradición al servicio de su mesa.", nl: "Ambachtelijke gerookte zalm, een traditie voor uw tafel.", de: "Handwerklicher Räucherlachs, eine Tradition für Ihren Tisch." },
  nav: { fr: "Navigation", en: "Navigation", es: "Navegación", nl: "Navigatie", de: "Navigation" },
  contact: { fr: "Contact", en: "Contact", es: "Contacto", nl: "Contact", de: "Kontakt" },
  faq: { fr: "Questions fréquentes", en: "Frequently asked questions", es: "Preguntas frecuentes", nl: "Veelgestelde vragen", de: "Häufige Fragen" },
  general: { fr: "Questions générales", en: "General questions", es: "Preguntas generales", nl: "Algemene vragen", de: "Allgemeine Fragen" },
  customer: { fr: "Service client", en: "Customer service", es: "Atención al cliente", nl: "Klantenservice", de: "Kundenservice" },
  productInfo: { fr: "Produits & informations", en: "Products & information", es: "Productos e información", nl: "Producten & informatie", de: "Produkte & Informationen" },
  delivery: { fr: "Livraison sous", en: "Delivery within", es: "Entrega en", nl: "Levering binnen", de: "Lieferung innerhalb von" },
  deliveryQuestion: { fr: "Quel est le délai de livraison ?", en: "How long does delivery take?", es: "¿Cuál es el plazo de entrega?", nl: "Wat is de levertijd?", de: "Wie lange dauert die Lieferung?" },
  contactQuestion: { fr: "Comment vous contacter ?", en: "How can I contact you?", es: "¿Cómo puedo contactarles?", nl: "Hoe kan ik contact opnemen?", de: "Wie kann ich Sie kontaktieren?" },
  rangeQuestion: { fr: "Quels produits proposez-vous ?", en: "Which products do you offer?", es: "¿Qué productos ofrecen?", nl: "Welke producten bieden jullie aan?", de: "Welche Produkte bieten Sie an?" },
  rangeAnswer: { fr: "Découvrez nos dés, cœurs, dos, pavés et tranches de saumon fumé écossais dans la boutique.", en: "Discover our Scottish smoked salmon cubes, hearts, backs, portions and slices in the shop.", es: "Descubra nuestros dados, corazones, lomos, porciones y lonchas de salmón ahumado escocés en la tienda.", nl: "Ontdek onze blokjes, harten, rugfilets, moten en plakjes Schotse gerookte zalm in de winkel.", de: "Entdecken Sie Würfel, Herzen, Rücken, Filetstücke und Scheiben von schottischem Räucherlachs im Shop." },
  writeUs: { fr: "Écrivez-nous", en: "Write to us", es: "Escríbanos", nl: "Schrijf ons", de: "Schreiben Sie uns" },
  soundOn: { fr: "Activer le son des vagues", en: "Enable wave sounds", es: "Activar el sonido de las olas", nl: "Golfgeluiden aanzetten", de: "Wellenklänge einschalten" },
  soundOff: { fr: "Couper le son des vagues", en: "Mute wave sounds", es: "Silenciar las olas", nl: "Golfgeluiden uitzetten", de: "Wellenklänge ausschalten" },
  soundUnavailable: { fr: "Le son n’est pas disponible dans ce navigateur.", en: "Sound is unavailable in this browser.", es: "El sonido no está disponible en este navegador.", nl: "Geluid is niet beschikbaar in deze browser.", de: "Ton ist in diesem Browser nicht verfügbar." },
  playOcean: { fr: "Animer l’océan", en: "Play ocean", es: "Animar el océano", nl: "Oceaan afspelen", de: "Ozean abspielen" },
  pauseOcean: { fr: "Mettre l’océan en pause", en: "Pause ocean", es: "Pausar el océano", nl: "Oceaan pauzeren", de: "Ozean pausieren" },
} satisfies Record<string, Record<Lang, string>>;

export type Key = keyof typeof dict;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "fr", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    const s = localStorage.getItem("lang") as Lang | null;
    if (s && langs.includes(s)) setLangState(s);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("lang", l); };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useT() {
  const { lang, setLang } = useContext(Ctx);
  return { lang, setLang, t: (k: Key) => dict[k][lang] };
}
