import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Package, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onSearch?: (term: string) => void;
  searchTerm?: string;
}

export default function Header({ onSearch, searchTerm = "" }: HeaderProps) {
  const navigate = useNavigate();
  const totalItems = useCart((s) => s.totalItems());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchTerm);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearch);
    } else {
      navigate({ to: "/", search: { q: localSearch } });
    }
  }

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-sm"
      data-ocid="header"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 group"
            data-ocid="header-logo"
          >
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Package className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground tracking-tight">
              Shop<span className="text-primary">Easy</span>
            </span>
          </Link>

          {/* Search bar — desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search products…"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-9 bg-secondary border-input"
              data-ocid="search-input"
            />
          </form>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-2">
            <Link to="/cart" className="relative" data-ocid="cart-icon">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 text-xs bg-accent text-accent-foreground border-0 font-bold">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search products…"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-9 bg-secondary border-input"
                data-ocid="mobile-search-input"
              />
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
