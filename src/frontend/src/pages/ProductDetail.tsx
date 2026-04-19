import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/useCart";
import { formatPrice, useProduct } from "@/hooks/useProducts";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Package,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const FALLBACK_GRADIENTS = [
  "from-rose-400 to-orange-300",
  "from-violet-400 to-indigo-300",
  "from-emerald-400 to-teal-300",
  "from-amber-400 to-yellow-300",
  "from-sky-400 to-blue-300",
  "from-fuchsia-400 to-pink-300",
];

function handleImgError(
  e: React.SyntheticEvent<HTMLImageElement>,
  name: string,
  id: bigint,
) {
  const target = e.currentTarget;
  target.style.display = "none";
  const parent = target.parentElement;
  if (!parent || parent.querySelector(".img-fallback")) return;
  const gradient = FALLBACK_GRADIENTS[Number(id) % FALLBACK_GRADIENTS.length];
  const fallback = document.createElement("div");
  fallback.className = `img-fallback w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${gradient} text-white select-none`;
  const letter = document.createElement("span");
  letter.className = "text-7xl font-bold opacity-90";
  letter.textContent = name.charAt(0).toUpperCase();
  const label = document.createElement("span");
  label.className = "text-sm font-medium opacity-75 mt-2 px-4 text-center";
  label.textContent = name;
  fallback.appendChild(letter);
  fallback.appendChild(label);
  parent.appendChild(fallback);
}

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const productId = BigInt(id);
  const { data: product, isLoading } = useProduct(productId);
  const addItem = useCart((s) => s.addItem);

  function handleAddToCart() {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toast.success(`${product.name} added to cart`, {
      description: formatPrice(product.price),
      duration: 3000,
    });
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="product-not-found"
      >
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display font-semibold text-xl mb-2">
          Product not found
        </h2>
        <p className="text-muted-foreground mb-6">
          This product may have been removed or doesn't exist.
        </p>
        <Link to="/">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to shop
          </Button>
        </Link>
      </div>
    );
  }

  const isOutOfStock = Number(product.stock) === 0;
  const isLowStock = Number(product.stock) < 10 && !isOutOfStock;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-muted-foreground">{product.category}</span>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-xl overflow-hidden bg-secondary shadow-elevated"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => handleImgError(e, product.name, product.id)}
            />
            {isLowStock && (
              <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground border-0">
                Low Stock
              </Badge>
            )}
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="font-display font-bold text-3xl text-foreground leading-tight mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= 4 ? "fill-accent text-accent" : "fill-muted text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.8 (124 reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display font-bold text-4xl text-foreground">
                {formatPrice(product.price)}
              </span>
              {isLowStock && (
                <span className="text-sm text-destructive font-medium">
                  Only {Number(product.stock)} left
                </span>
              )}
            </div>

            <Separator />

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <Button
              size="lg"
              className="btn-accent w-full md:w-auto px-8 h-12 border-0 text-base"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              data-ocid="product-add-to-cart"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over ₹50" },
                { icon: Shield, label: "Secure Pay", sub: "256-bit SSL" },
                { icon: Package, label: "Easy Returns", sub: "30 days" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-3 bg-muted/40 rounded-lg"
                >
                  <Icon className="w-4 h-4 text-primary mb-1" />
                  <p className="text-xs font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link to="/">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
