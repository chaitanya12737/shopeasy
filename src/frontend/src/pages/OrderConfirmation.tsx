import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "@tanstack/react-router";
import { CheckCircle, Home, Package } from "lucide-react";
import { motion } from "motion/react";

export default function OrderConfirmationPage() {
  const { id } = useParams({ from: "/order/$id" });

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);
  const formattedDate = estimatedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-background min-h-[60vh] flex items-center py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
          data-ocid="order-confirmation"
        >
          {/* Success icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. We're preparing your order for
            shipment.
          </p>

          {/* Order details card */}
          <div className="card-base p-6 text-left mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-label">Order Number</span>
                <span className="font-display font-semibold text-foreground text-sm">
                  {id}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-label">Estimated Delivery</span>
                <span className="text-sm font-medium text-foreground">
                  {formattedDate}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-label">Status</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Processing
                </span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: CheckCircle, label: "Order placed", done: true },
              { icon: Package, label: "Preparing", done: false, active: true },
              { icon: Home, label: "Delivered", done: false },
            ].map(({ icon: Icon, label, done, active }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    done
                      ? "bg-primary text-primary-foreground"
                      : active
                        ? "bg-primary/20 text-primary ring-2 ring-primary/30"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <p
                  className={`text-xs font-medium ${done || active ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button
                className="btn-accent border-0 h-11 px-8"
                data-ocid="continue-shopping-btn"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
