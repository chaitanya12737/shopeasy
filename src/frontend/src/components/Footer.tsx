import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { Github, Instagram, Package, Twitter } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", to: "/" },
    { label: "Accessories", to: "/?category=Accessories" },
    { label: "Electronics", to: "/?category=Electronics" },
    { label: "Clothing", to: "/?category=Clothing" },
  ],
  Support: [
    { label: "FAQ", to: "/" },
    { label: "Shipping Policy", to: "/" },
    { label: "Returns", to: "/" },
    { label: "Contact Us", to: "/" },
  ],
  Company: [
    { label: "About Us", to: "/" },
    { label: "Blog", to: "/" },
    { label: "Careers", to: "/" },
    { label: "Press", to: "/" },
  ],
};

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      data-ocid="footer"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Package className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Shop<span className="text-primary">Easy</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Curated products, seamless shopping. Discover quality essentials
              for modern everyday living.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-label mb-3">{title}</p>
              <ul className="space-y-2">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} ShopEasy. All rights reserved.</p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
