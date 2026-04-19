import type { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

const SAMPLE_PRODUCTS: Product[] = [
  // ── MEN'S COLLECTION ──────────────────────────────────────────────────────
  {
    id: BigInt(101),
    name: "Classic Bandhgala Kurta",
    price: BigInt(189900),
    description:
      "Mandarin collar bandhgala in premium cotton-silk blend. Ideal for festivals and family functions. Available in ivory and charcoal.",
    imageUrl:
      "https://images.pexels.com/photos/15568861/pexels-photo-15568861.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Kurta",
    gender: "men",
    stock: BigInt(30),
  },
  {
    id: BigInt(102),
    name: "Embroidered Nehru Kurta",
    price: BigInt(149900),
    description:
      "Delicate chikankari embroidery on soft cotton. Paired with matching straight-fit pyjama. Relaxed festive elegance.",
    imageUrl:
      "https://images.pexels.com/photos/29041818/pexels-photo-29041818.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Kurta",
    gender: "men",
    stock: BigInt(25),
  },
  {
    id: BigInt(103),
    name: "Linen Pathani Kurta Set",
    price: BigInt(129900),
    description:
      "Breathable linen weave with side-slit kurta and salwar. Perfect for summer weddings and outdoor ceremonies.",
    imageUrl:
      "https://images.pexels.com/photos/6311652/pexels-photo-6311652.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Kurta",
    gender: "men",
    stock: BigInt(40),
  },
  {
    id: BigInt(104),
    name: "Royal Blue Sherwani",
    price: BigInt(499900),
    description:
      "Jacquard woven sherwani with gold zari border. Comes with churidar and dupatta. The complete groom ensemble.",
    imageUrl:
      "https://images.pexels.com/photos/7015034/pexels-photo-7015034.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Sherwani",
    gender: "men",
    stock: BigInt(12),
  },
  {
    id: BigInt(105),
    name: "Ivory Silk Sherwani",
    price: BigInt(449900),
    description:
      "Pure silk sherwani with hand-stitched floral motifs. Lightweight and regal — a modern groom's favourite.",
    imageUrl:
      "https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Sherwani",
    gender: "men",
    stock: BigInt(8),
  },
  {
    id: BigInt(106),
    name: "Oxford Formal Shirt",
    price: BigInt(89900),
    description:
      "100% Egyptian cotton, slim-fit cut. Button-down collar and chest pocket. Wrinkle-resistant finish for busy days.",
    imageUrl:
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Shirts",
    gender: "men",
    stock: BigInt(50),
  },
  {
    id: BigInt(107),
    name: "Linen Resort Shirt",
    price: BigInt(74900),
    description:
      "Airy linen-cotton blend in a relaxed half-sleeve cut. Camp collar and chest button loop — weekend-ready.",
    imageUrl:
      "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Shirts",
    gender: "men",
    stock: BigInt(45),
  },
  {
    id: BigInt(108),
    name: "Slim-Fit Chino Trousers",
    price: BigInt(99900),
    description:
      "Stretch cotton twill for all-day comfort. Mid-rise waistband with belt loops. Available in navy, olive, and beige.",
    imageUrl:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Trousers",
    gender: "men",
    stock: BigInt(35),
  },
  {
    id: BigInt(109),
    name: "Tailored Formal Trousers",
    price: BigInt(119900),
    description:
      "Fine wool-blend fabric with a pressed crease. Side pockets and hook-and-bar closure. Sharp office staple.",
    imageUrl:
      "https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Trousers",
    gender: "men",
    stock: BigInt(28),
  },
  {
    id: BigInt(110),
    name: "Printed Ethnic Waistcoat",
    price: BigInt(79900),
    description:
      "Block-print cotton waistcoat with brass buttons. Layer over a kurta or plain shirt for instant festive flair.",
    imageUrl:
      "https://images.pexels.com/photos/8839882/pexels-photo-8839882.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Ethnic",
    gender: "men",
    stock: BigInt(20),
  },
  {
    id: BigInt(111),
    name: "Jodhpuri Suit Set",
    price: BigInt(349900),
    description:
      "Classic jodhpuri bandhgala jacket with matching trousers. Rich brocade fabric — head-turning at any wedding.",
    imageUrl:
      "https://images.pexels.com/photos/7345174/pexels-photo-7345174.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Ethnic",
    gender: "men",
    stock: BigInt(15),
  },
  {
    id: BigInt(112),
    name: "Dhoti Kurta Set",
    price: BigInt(169900),
    description:
      "Traditional dhoti pre-stitched for ease of wear paired with a pintuck kurta. Festive occasion essential.",
    imageUrl:
      "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Men's Ethnic",
    gender: "men",
    stock: BigInt(22),
  },

  // ── WOMEN'S COLLECTION ────────────────────────────────────────────────────
  {
    id: BigInt(201),
    name: "Kanjivaram Silk Saree",
    price: BigInt(799900),
    description:
      "Authentic Kanjivaram with heavy gold zari border and pallu. Pure mulberry silk — a timeless bridal heirloom.",
    imageUrl:
      "https://images.pexels.com/photos/29026115/pexels-photo-29026115.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Sarees",
    gender: "women",
    stock: BigInt(10),
  },
  {
    id: BigInt(202),
    name: "Banarasi Silk Saree",
    price: BigInt(649900),
    description:
      "Opulent Banarasi weave with floral buti motifs and wide brocade border. Ideal for weddings and receptions.",
    imageUrl:
      "https://images.pexels.com/photos/30703877/pexels-photo-30703877.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Sarees",
    gender: "women",
    stock: BigInt(8),
  },
  {
    id: BigInt(203),
    name: "Georgette Printed Saree",
    price: BigInt(189900),
    description:
      "Lightweight georgette with vibrant floral digital print. Easy to drape and comfortable for long events.",
    imageUrl:
      "https://images.pexels.com/photos/2995309/pexels-photo-2995309.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Sarees",
    gender: "women",
    stock: BigInt(30),
  },
  {
    id: BigInt(204),
    name: "Cotton Handloom Saree",
    price: BigInt(89900),
    description:
      "Soft Bengal cotton handloom with traditional checks and woven border. Cool, casual, and eco-conscious.",
    imageUrl:
      "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Sarees",
    gender: "women",
    stock: BigInt(40),
  },
  {
    id: BigInt(205),
    name: "Chiffon Embroidered Saree",
    price: BigInt(259900),
    description:
      "Delicate chiffon base with hand-embroidered sequin work pallu. Drapes beautifully for cocktail parties.",
    imageUrl:
      "https://images.pexels.com/photos/6766081/pexels-photo-6766081.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Sarees",
    gender: "women",
    stock: BigInt(18),
  },
  {
    id: BigInt(206),
    name: "Bridal Lehenga Set",
    price: BigInt(1299900),
    description:
      "Full-flare bridal lehenga with heavy hand-embroidery, matching choli and dupatta. Ready-to-wear couture.",
    imageUrl:
      "https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Lehenga",
    gender: "women",
    stock: BigInt(6),
  },
  {
    id: BigInt(207),
    name: "Floral Printed Lehenga",
    price: BigInt(349900),
    description:
      "Pastel floral print on soft crepe with embellished waistband. Perfect for sangeet and mehendi ceremonies.",
    imageUrl:
      "https://images.pexels.com/photos/8839895/pexels-photo-8839895.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Lehenga",
    gender: "women",
    stock: BigInt(20),
  },
  {
    id: BigInt(208),
    name: "Anarkali Floor-Length Dress",
    price: BigInt(249900),
    description:
      "Flowing anarkali frock with mirror-work yoke and flared skirt. Stunning at family gatherings and Eid parties.",
    imageUrl:
      "https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Dresses",
    gender: "women",
    stock: BigInt(22),
  },
  {
    id: BigInt(209),
    name: "Layered Maxi Dress",
    price: BigInt(179900),
    description:
      "Tiered chiffon maxi in jewel tones. V-neckline and cinched waist for a flattering silhouette.",
    imageUrl:
      "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Dresses",
    gender: "women",
    stock: BigInt(28),
  },
  {
    id: BigInt(210),
    name: "Embroidered Salwar Kameez",
    price: BigInt(219900),
    description:
      "Phulkari embroidery on soft cotton kameez with wide palazzo. A Punjab-inspired kurta set for festive days.",
    imageUrl:
      "https://images.pexels.com/photos/9218524/pexels-photo-9218524.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Kurta Set",
    gender: "women",
    stock: BigInt(32),
  },
  {
    id: BigInt(211),
    name: "Tie-Dye Kurti Set",
    price: BigInt(99900),
    description:
      "Hand tie-dye cotton kurti with matching palazzo pants. Vivid shibori patterns — casual and expressive.",
    imageUrl:
      "https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Kurta Set",
    gender: "women",
    stock: BigInt(36),
  },
  {
    id: BigInt(212),
    name: "Chanderi Silk Saree",
    price: BigInt(299900),
    description:
      "Sheer Chanderi silk-cotton blend with golden bootis woven in. Lightweight and breathable — perfect for summer weddings.",
    imageUrl:
      "https://images.pexels.com/photos/4946601/pexels-photo-4946601.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Women's Sarees",
    gender: "women",
    stock: BigInt(14),
  },
];

export function useProducts(searchTerm?: string, category?: string) {
  return useQuery<Product[]>({
    queryKey: ["products", searchTerm, category],
    queryFn: async () => {
      let results = SAMPLE_PRODUCTS;
      if (category && category !== "All") {
        results = results.filter((p) => p.category === category);
      }
      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.description.toLowerCase().includes(lower) ||
            p.category.toLowerCase().includes(lower),
        );
      }
      return results;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProduct(id: bigint | undefined) {
  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!id) return null;
      return SAMPLE_PRODUCTS.find((p) => p.id === id) ?? null;
    },
    enabled: !!id,
  });
}

export const CATEGORIES = [
  "All",
  "Men's Kurta",
  "Men's Sherwani",
  "Men's Shirts",
  "Men's Trousers",
  "Men's Ethnic",
  "Women's Sarees",
  "Women's Lehenga",
  "Women's Dresses",
  "Women's Kurta Set",
];

export function formatPrice(price: bigint): string {
  return `₹${(Number(price) / 100).toFixed(0)}`;
}
