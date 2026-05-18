// Static product data — Firestore is the source of truth in production.
// These serve as fallbacks and for static generation.

const products = [
  {
    id: "ginger-moroheiya-infusion",
    slug: "ginger-moroheiya-infusion",
    name: "Ginger Moroheiya Infusion",
    nameJp: "生姜モロヘイヤ茶",
    price: 15,
    currency: "USD",
    primaryImage: "/images/1.jpg",
    hoverImage:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1528&auto=format&fit=crop",
    description:
      "A warming blend of hand-picked Moroheiya leaves infused with organic ginger root. Specially designed to balance the gut-brain axis, stimulate digestion, and provide a comforting, spicy finish.",
    longDescription:
      "Our Ginger Moroheiya Infusion is crafted from the youngest Moroheiya leaves, shade-grown in Bengal and processed using traditional Japanese steaming techniques. The addition of organic ginger root creates a warming synergy that stimulates digestive fire (Agni), reduces system-wide inflammation, and balances the gut-brain axis. With an abundant concentration of prebiotic polysaccharides, it provides caffeine-free sustained vitality and deep inner peace.",
    ingredients: [
      "Hand-picked organic Moroheiya leaves",
      "Organic sliced ginger root",
      "Natural citrus orange peel",
    ],
    benefits: [
      "Optimizes gut-brain axis communication",
      "Rich in prebiotic polysaccharides for microbiome diversity",
      "Stimulates digestive fire (Agni) & reduces bloating",
      "100% caffeine-free sustainable clean energy",
    ],
    brewing:
      "Steep 1-2 tsp in 200ml fresh water at 80°C (176°F) for 3-5 minutes. Perfect as a morning warming ritual or an iced summer refresh.",
    weight: "50g",
    servings: 25,
    certifications: ["USDA Organic", "JAS Certified", "India Organic"],
    inStock: true,
    featured: true,
  },
  {
    id: "elaichi-moroheiya-infusion",
    slug: "elaichi-moroheiya-infusion",
    name: "Elaichi Moroheiya Infusion",
    nameJp: "エライチモロヘイヤ茶",
    price: 22,
    currency: "USD",
    primaryImage: "/images/2.jpg",
    hoverImage:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=1467&auto=format&fit=crop",
    description:
      "Our signature Moroheiya infusion base enhanced with aromatic Kerala green elaichi. A fragrant, soothing brew that fosters gut-brain harmony, balances doshas, and refreshes the senses.",
    longDescription:
      "The Elaichi Moroheiya Infusion marries the earthy depth and rich prebiotic fibers of Moroheiya with the ethereal fragrance of pure Kerala green elaichi (cardamom). This premium blend is meticulously formulated to nurture your gut microbiome, directly supporting vagus nerve stimulation for a calm, centered mind. It balances Vata and Pitta doshas while offering a naturally sweet, aromatic experience.",
    ingredients: [
      "Hand-picked organic Moroheiya leaves",
      "Kerala green elaichi pods (cardamom)",
      "Zero artificial additives or preservatives",
    ],
    benefits: [
      "Fosters vagus nerve health and gut-brain harmony",
      "Supports diverse, healthy gut microbiome development",
      "Balances Vata, Pitta, and Kapha Ayurvedic doshas",
      "Rich in natural antioxidants, chlorophyll, and vitamins",
    ],
    brewing:
      "Steep 1-2 tsp in 200ml hot water at 80°C (176°F) for 4-5 minutes. Exceptional as a grounding evening wind-down ritual.",
    weight: "50g",
    servings: 25,
    certifications: ["USDA Organic", "JAS Certified", "India Organic"],
    inStock: true,
    featured: true,
  },
  {
    id: "pure-moroheiya-infusion",
    slug: "pure-moroheiya-infusion",
    name: "Pure Moroheiya Infusion",
    nameJp: "プレーンモロヘイヤ茶",
    price: 18,
    currency: "USD",
    primaryImage: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1470&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=1528&auto=format&fit=crop",
    description:
      "Our flagship pristine Moroheiya leaf infusion. A highly nutrient-dense, caffeine-free brew showcasing the pure, earthy essence of shade-grown botanicals for deep gut nourishment.",
    longDescription:
      "Our Pure Moroheiya Infusion is the ultimate elixir for the gut-brain axis. Made of 100% certified organic Moroheiya leaves, shade-grown in mineral-dense soils and steamed using heritage Japanese techniques. Packed with dietary fibers, prebiotic polysaccharides, and raw antioxidants, this smooth, emerald infusion acts as a daily preventive ritual to strengthen gut barrier integrity and induce deep mental relaxation.",
    ingredients: [
      "100% hand-picked organic Moroheiya leaves",
      "Pure botanical simplicity",
    ],
    benefits: [
      "Maximal delivery of prebiotic polysaccharides",
      "Strengthens gut barrier & microbiome health",
      "Induces natural deep rest and stress relief",
      "Packed with calcium, iron, and vitamins A, B, and C",
    ],
    brewing:
      "Steep 1-2 tsp in 200ml water at 80°C (176°F) for 3 minutes. Perfect as a grounding, daily preventative ritual.",
    weight: "50g",
    servings: 25,
    certifications: ["USDA Organic", "JAS Certified", "India Organic"],
    inStock: true,
    featured: false,
  },
  {
    id: "mint-moroheiya-infusion",
    slug: "mint-moroheiya-infusion",
    name: "Mint Moroheiya Infusion",
    nameJp: "薄荷モロヘイヤ茶",
    price: 20,
    currency: "USD",
    primaryImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1440&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cfa9?q=80&w=1374&auto=format&fit=crop",
    description:
      "A cooling, refreshing blend of Moroheiya leaves and organic peppermint. Ideal for digestive cooling, daytime focus, and clearing mental clutter.",
    longDescription:
      "Marrying the prebiotic goodness and earthy depth of Moroheiya with the crisp, refreshing sensation of organic Himalayan peppermint, the Mint Moroheiya Infusion is a restorative tonic. Designed to calm digestive heat (Pitta) and clear mental fog, this caffeine-free blend delivers sustainable vitality and clean focus by reinforcing healthy gut-to-brain vagal signaling.",
    ingredients: [
      "Hand-picked organic Moroheiya leaves",
      "Organic peppermint leaves",
      "Cooling botanical essences",
    ],
    benefits: [
      "Cools digestive tract & balances Pitta excess",
      "Sustained daytime focus & mental clarity",
      "Nourishes prebiotic-loving gut flora",
      "Promotes fresh breath and light stomach comfort",
    ],
    brewing:
      "Steep 1-2 tsp in 200ml fresh water at 80°C (176°F) for 3-4 minutes. Sensational iced or cold-brewed.",
    weight: "50g",
    servings: 25,
    certifications: ["USDA Organic", "JAS Certified", "India Organic"],
    inStock: true,
    featured: false,
  },
];

export default products;

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}
