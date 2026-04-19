import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// Section heading component with decorative accent
function SectionHeading({
  title,
  count,
  accent,
}: {
  title: string;
  count: number;
  accent: string;
}) {
  return (
    <div className="flex items-end gap-4 mb-8">
      <div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground relative inline-block">
          {title}
          <span
            className={`absolute -bottom-1 left-0 h-1 w-full rounded-full ${accent}`}
          />
        </h2>
        <p className="text-muted-foreground text-sm mt-3">
          {count} item{count !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

// Product grid section
function ProductGrid({
  products,
  sectionId,
}: {
  products: Product[];
  sectionId: string;
}) {
  if (products.length === 0) return null;
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      data-ocid={`${sectionId}.list`}
    >
      {products.map((product, i) => (
        <motion.div
          key={product.id.toString()}
          data-ocid={`${sectionId}.item.${i + 1}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: (i % 8) * 0.05 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}

// Skeleton grid while loading
function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, i) => `sk-${i}`).map((key) => (
        <div key={key} className="card-base overflow-hidden">
          <Skeleton className="aspect-square" />
          <div className="p-5 space-y-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <div className="flex justify-between pt-1">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CatalogPage() {
  const [localSearch, setLocalSearch] = useState("");

  const { data: allProducts, isLoading } = useProducts(localSearch);

  const mensProducts = allProducts?.filter((p) => p.gender === "men") ?? [];
  const womensProducts = allProducts?.filter((p) => p.gender === "women") ?? [];

  const totalCount = allProducts?.length ?? 0;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div>
      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[420px] flex items-center"
        style={{
          backgroundImage: "url('/assets/images/banner-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-ocid="hero.section"
      >
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />

        {/* Search bar */}
        <div className="absolute bottom-6 right-6 z-10">
          <form onSubmit={handleSearch} className="flex gap-2 shadow-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search products…"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-9 bg-card border-border h-10 w-64"
                data-ocid="hero.search_input"
              />
            </div>
            <Button
              type="submit"
              className="btn-accent h-10 px-5 border-0"
              data-ocid="hero.search_button"
            >
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* ── Active search indicator ──────────────────────────────────────────── */}
      {localSearch && (
        <div className="bg-muted/30 border-b border-border px-6 py-3 flex items-center gap-3">
          <p className="text-sm text-muted-foreground">Results for:</p>
          <Badge variant="secondary" className="gap-1">
            {localSearch}
            <button
              type="button"
              onClick={() => setLocalSearch("")}
              className="ml-1 hover:text-foreground"
              aria-label="Clear search"
            >
              ×
            </button>
          </Badge>
          <span className="text-sm text-muted-foreground ml-auto">
            {totalCount} product{totalCount !== 1 ? "s" : ""} found
          </span>
        </div>
      )}

      {/* ── Men's Collection ──────────────────────────────────────────────────── */}
      <section className="bg-background py-14" data-ocid="mens.section">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Men's Collection"
            count={mensProducts.length}
            accent="bg-primary"
          />

          {isLoading ? (
            <SkeletonGrid count={4} />
          ) : mensProducts.length > 0 ? (
            <ProductGrid products={mensProducts} sectionId="mens" />
          ) : (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="mens.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                No men's products match your search.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => setLocalSearch("")}
                data-ocid="mens.clear_search_button"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Women's Collection ────────────────────────────────────────────────── */}
      <section
        className="bg-muted/25 border-t border-border py-14"
        data-ocid="womens.section"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Women's Collection"
            count={womensProducts.length}
            accent="bg-accent"
          />

          {isLoading ? (
            <SkeletonGrid count={4} />
          ) : womensProducts.length > 0 ? (
            <ProductGrid products={womensProducts} sectionId="womens" />
          ) : (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="womens.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                No women's products match your search.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => setLocalSearch("")}
                data-ocid="womens.clear_search_button"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Value Props ───────────────────────────────────────────────────────── */}
      <section className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "On all orders over ₹500",
              },
              {
                icon: "↩️",
                title: "Easy Returns",
                desc: "30-day hassle-free returns",
              },
              {
                icon: "🔒",
                title: "Secure Checkout",
                desc: "256-bit SSL encryption",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{icon}</span>
                <p className="font-display font-semibold text-foreground">
                  {title}
                </p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
