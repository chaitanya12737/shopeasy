import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/hooks/useProducts";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

// Gradient palette for image fallback — cycles by product id
const FALLBACK_GRADIENTS = [
  "from-rose-400 to-orange-300",
  "from-violet-400 to-indigo-300",
  "from-emerald-400 to-teal-300",
  "from-amber-400 to-yellow-300",
  "from-sky-400 to-blue-300",
  "from-fuchsia-400 to-pink-300",
];

function getGradient(id: bigint) {
  return FALLBACK_GRADIENTS[Number(id) % FALLBACK_GRADIENTS.length];
}

function handleImgError(
  e: React.SyntheticEvent<HTMLImageElement>,
  name: string,
  id: bigint,
) {
  const target = e.currentTarget;
  target.style.display = "none";
  const parent = target.parentElement;
  if (!parent) return;
  // Avoid duplicate fallback
  if (parent.querySelector(".img-fallback")) return;
  const fallback = document.createElement("div");
  fallback.className = `img-fallback w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${getGradient(id)} text-white select-none`;
  const letter = document.createElement("span");
  letter.className = "text-5xl font-bold opacity-90";
  letter.textContent = name.charAt(0).toUpperCase();
  const label = document.createElement("span");
  label.className = "text-xs font-medium opacity-75 mt-1 px-2 text-center";
  label.textContent = name;
  fallback.appendChild(letter);
  fallback.appendChild(label);
  parent.appendChild(fallback);
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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

  const isLowStock = Number(product.stock) < 10;
  const isOutOfStock = Number(product.stock) === 0;

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id.toString() }}
      className="group block"
      data-ocid={`product-card-${product.id}`}
    >
      <div className="card-base overflow-hidden transition-smooth hover:shadow-elevated hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            loading="lazy"
            onError={(e) => handleImgError(e, product.name, product.id)}
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm font-semibold">
                Out of Stock
              </Badge>
            </div>
          )}
          {isLowStock && !isOutOfStock && (
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground border-0 text-xs">
              Low Stock
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-label">{product.category}</p>
              <h3 className="font-display font-semibold text-base text-foreground leading-snug truncate mt-0.5">
                {product.name}
              </h3>
            </div>
            <div className="shrink-0 flex items-center gap-0.5 text-accent">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-semibold text-foreground">4.8</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="font-display font-bold text-lg text-foreground">
              {formatPrice(product.price)}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="btn-accent border-0 text-xs h-8 px-3"
              data-ocid={`add-to-cart-${product.id}`}
            >
              <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
