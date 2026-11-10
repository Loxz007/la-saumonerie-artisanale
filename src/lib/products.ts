const img = (id: string, ext = "png") =>
  `https://static.wixstatic.com/media/e738f9_${id}~mv2.${ext}/v1/fill/w_600,h_600,al_c,q_85/e738f9_${id}~mv2.${ext}`;

export type Product = {
  name: string;
  price: string;
  perKg: string;
  image: string;
  url: string;
  outOfStock?: boolean;
};

const base = "https://www.saumonerie-varennes.fr/product-page/";

export const products: Product[] = [
  { name: "Dés de Saumon Fumé Écossais", price: "19,50 €", perKg: "78,00 € / kg", image: img("ba0ee6952f6b4b24b1fa7581d1aaff41"), url: base + "d%C3%A9s-de-saumon-fum%C3%A9-ecossais" },
  { name: "Cœur de Saumon Fumé Écossais", price: "43,75 €", perKg: "125,00 € / kg", image: img("f52a4696a4cc4135844d583270b9ad60"), url: base + "coeur-de-saumon-fum%C3%A9-ecossais" },
  { name: "Dos de Saumon Fumé Écossais", price: "57,50 €", perKg: "115,00 € / kg", image: img("5f9d34db44164699a7056bc6eb959049"), url: base + "dos-de-saumon-fum%C3%A9-ecossais" },
  { name: "Pavé de Saumon Fumé Écossais", price: "18,50 €", perKg: "92,50 € / kg", image: img("ed35d009022647f8b34df32a84e3d6e2", "jpg"), url: base + "pav%C3%A9-de-saumon-fum%C3%A9-ecossais" },
  { name: "Saumon Fumé Tranché — Entier 1 kg", price: "88,00 €", perKg: "88,00 € / kg", image: img("3a67bdd7b5054d58b501f4ab884e564a"), url: base + "saumon-fum%C3%A9-ecossais-entier-tranch%C3%A9", outOfStock: true },
  { name: "Saumon Fumé Tranché — Entier 1,5 kg", price: "132,00 €", perKg: "88,00 € / kg", image: img("3a67bdd7b5054d58b501f4ab884e564a"), url: base + "saumon-fum%C3%A9-ecossais-tranch%C3%A9-entier-1-5kg" },
  { name: "Saumon Fumé Écossais — 3/4 tranches", price: "24,50 €", perKg: "98,00 € / kg", image: img("7e8c5b4411e049219488bdbdfe075a33"), url: base + "saumon-fum%C3%A9-ecossais-3-4-tranches" },
  { name: "Saumon Fumé Écossais — 6/8 tranches", price: "49,00 €", perKg: "98,00 € / kg", image: img("7e8c5b4411e049219488bdbdfe075a33"), url: base + "saumon-fum%C3%A9-ecossais-6-8-tranches" },
];
