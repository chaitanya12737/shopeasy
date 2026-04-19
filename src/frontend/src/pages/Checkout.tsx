import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/hooks/useProducts";
import type { ShippingAddress } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
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
  fallback.className = `img-fallback w-12 h-12 rounded-md flex items-center justify-center bg-gradient-to-br ${gradient} text-white select-none shrink-0`;
  const letter = document.createElement("span");
  letter.className = "text-xl font-bold opacity-90";
  letter.textContent = name.charAt(0).toUpperCase();
  fallback.appendChild(letter);
  parent.appendChild(fallback);
}

const INDIA_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const EMPTY_ADDRESS: ShippingAddress = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "India",
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const count = totalItems();
  const subtotal = totalPrice();
  const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  function updateAddress(field: keyof ShippingAddress, value: string) {
    setAddress((prev) => ({ ...prev, [field]: value }));
  }

  function updateCard(field: keyof typeof card, value: string) {
    setCard((prev) => ({ ...prev, [field]: value }));
  }

  function isPhoneValid() {
    const digits = phone.replace(/^\+91/, "").replace(/\s/g, "");
    return /^\d{10}$/.test(digits);
  }

  function isPinValid() {
    return /^\d{6}$/.test(address.zipCode);
  }

  function isFormValid() {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return (
      emailValid &&
      isPhoneValid() &&
      address.fullName &&
      address.street &&
      address.city &&
      address.state &&
      isPinValid() &&
      card.number.replace(/\s/g, "").length === 16 &&
      card.expiry.length === 5 &&
      card.cvv.length >= 3 &&
      card.name
    );
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid()) {
      if (!isPinValid()) {
        toast.error("Please enter a valid 6-digit PIN code");
      } else if (!isPhoneValid()) {
        toast.error("Please enter a valid 10-digit mobile number");
      } else {
        toast.error("Please fill in all fields correctly");
      }
      return;
    }
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1800));
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    setIsProcessing(false);
    navigate({ to: "/order/$id", params: { id: orderId } });
  }

  if (count === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground mb-6">Your cart is empty.</p>
        <Link to="/">
          <Button className="btn-accent border-0">Shop Now</Button>
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= 500000 ? 0 : 4900; // free above ₹5000, else ₹49
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-background py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Checkout
          </h1>
          <div className="flex items-center gap-1 ml-auto text-sm text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            Secure checkout
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-base p-6"
              >
                <h2 className="font-display font-semibold text-lg text-foreground mb-5">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-ocid="shipping.email.input"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/[^\d\s+]/g, ""))
                      }
                      data-ocid="shipping.phone.input"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Rahul Sharma"
                      value={address.fullName}
                      onChange={(e) =>
                        updateAddress("fullName", e.target.value)
                      }
                      data-ocid="shipping.fullname.input"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      placeholder="Flat 4B, Sector 12, Dwarka"
                      value={address.street}
                      onChange={(e) => updateAddress("street", e.target.value)}
                      data-ocid="shipping.street.input"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Mumbai"
                      value={address.city}
                      onChange={(e) => updateAddress("city", e.target.value)}
                      data-ocid="shipping.city.input"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="state">State / UT</Label>
                    <select
                      id="state"
                      value={address.state}
                      onChange={(e) => updateAddress("state", e.target.value)}
                      data-ocid="shipping.state.select"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
                    >
                      <option value="" disabled>
                        Select state/UT
                      </option>
                      {INDIA_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="zipCode">PIN Code</Label>
                    <Input
                      id="zipCode"
                      placeholder="400001"
                      maxLength={6}
                      value={address.zipCode}
                      onChange={(e) =>
                        updateAddress(
                          "zipCode",
                          e.target.value.replace(/\D/g, "").slice(0, 6),
                        )
                      }
                      data-ocid="shipping.pincode.input"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value="India"
                      readOnly
                      className="bg-muted text-muted-foreground cursor-not-allowed"
                      data-ocid="shipping.country.input"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-base p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display font-semibold text-lg text-foreground">
                    Payment Details
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CreditCard className="w-4 h-4" />
                    Visa, Mastercard, RuPay
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      placeholder="Rahul Sharma"
                      value={card.name}
                      onChange={(e) => updateCard("name", e.target.value)}
                      data-ocid="payment.card_name.input"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={card.number}
                      onChange={(e) => {
                        const raw = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 16);
                        const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
                        updateCard("number", formatted);
                      }}
                      data-ocid="payment.card_number.input"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={(e) => {
                        const raw = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                        const formatted =
                          raw.length > 2
                            ? `${raw.slice(0, 2)}/${raw.slice(2)}`
                            : raw;
                        updateCard("expiry", formatted);
                      }}
                      data-ocid="payment.expiry.input"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      maxLength={4}
                      value={card.cvv}
                      onChange={(e) =>
                        updateCard(
                          "cvv",
                          e.target.value.replace(/\D/g, "").slice(0, 4),
                        )
                      }
                      data-ocid="payment.cvv.input"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: order summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="card-base p-6 sticky top-24"
              >
                <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.productId.toString()}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 rounded-md object-cover bg-secondary shrink-0"
                        onError={(e) =>
                          handleImgError(e, item.name, item.productId)
                        }
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ×{Number(item.quantity)}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-foreground shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="mb-4" />
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(BigInt(subtotal))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : formatPrice(BigInt(shipping))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>{formatPrice(BigInt(tax))}</span>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div className="flex justify-between mb-6">
                  <span className="font-display font-bold text-foreground">
                    Total
                  </span>
                  <span className="font-display font-bold text-xl">
                    {formatPrice(BigInt(total))}
                  </span>
                </div>
                <Button
                  type="submit"
                  className="btn-accent w-full h-12 border-0 text-base"
                  disabled={isProcessing}
                  data-ocid="checkout.place_order.primary_button"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      Processing…
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Place Order · {formatPrice(BigInt(total))}
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Your payment is secured by 256-bit SSL encryption.
                </p>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
