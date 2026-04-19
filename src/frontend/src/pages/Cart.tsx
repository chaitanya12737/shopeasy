import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/hooks/useProducts";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { motion } from "motion/react";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, totalItems, totalPrice } =
    useCart();
  const count = totalItems();
  const subtotal = totalPrice();

  if (count === 0) {
    return (
      <div
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="cart-empty"
      >
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-9 h-9 text-muted-foreground" />
        </div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-3">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
          Looks like you haven't added anything yet. Start exploring!
        </p>
        <Link to="/">
          <Button
            className="btn-accent border-0 h-11 px-8"
            data-ocid="cart-empty-cta"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background py-10">
      <div className="container mx-auto px-4">
        <h1 className="font-display font-bold text-2xl text-foreground mb-8">
          Shopping Cart
          <span className="text-muted-foreground font-normal text-base ml-3">
            ({count} item{count !== 1 ? "s" : ""})
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.productId.toString()}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="card-base p-4 flex gap-4 items-start"
                data-ocid={`cart-item-${item.productId}`}
              >
                <Link
                  to="/product/$id"
                  params={{ id: item.productId.toString() }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md bg-secondary shrink-0"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to="/product/$id"
                    params={{ id: item.productId.toString() }}
                    className="font-display font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {formatPrice(item.price)} each
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-border rounded-md overflow-hidden">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - BigInt(1),
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                        data-ocid={`cart-decrease-${item.productId}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-foreground">
                        {Number(item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + BigInt(1),
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                        data-ocid={`cart-increase-${item.productId}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-muted-foreground hover:text-destructive transition-colors ml-auto"
                      aria-label="Remove item"
                      data-ocid={`cart-remove-${item.productId}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-display font-bold text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-base p-6 sticky top-24"
            >
              <h2 className="font-display font-semibold text-lg text-foreground mb-5">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({count} item{count !== 1 ? "s" : ""})
                  </span>
                  <span className="font-medium text-foreground">
                    ₹{(subtotal / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground font-medium">
                    {subtotal >= 500000 ? "Free" : "₹49"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="text-foreground font-medium">
                    ₹{((subtotal / 100) * 0.18).toFixed(2)}
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between mb-6">
                <span className="font-display font-bold text-foreground">
                  Total
                </span>
                <span className="font-display font-bold text-xl text-foreground">
                  ₹
                  {(
                    (subtotal / 100) * 1.18 +
                    (subtotal >= 500000 ? 0 : 49)
                  ).toFixed(2)}
                </span>
              </div>
              <Button
                className="btn-accent w-full h-12 border-0 text-base"
                onClick={() => navigate({ to: "/checkout" })}
                data-ocid="proceed-to-checkout"
              >
                Proceed to Checkout
              </Button>
              <Link to="/">
                <Button
                  variant="ghost"
                  className="w-full mt-3 text-muted-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
