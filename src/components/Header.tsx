import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Diensten", path: "/diensten" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Over Ons", path: "/over-ons" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Slotenmaker Maarten" className="h-10 md:h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+31612345678" className="hidden md:flex items-center gap-2 text-sm font-semibold text-foreground">
            <Phone className="h-4 w-4 text-primary" />
            06 - 1234 5678
          </a>
          <Button asChild className="hidden sm:inline-flex font-semibold">
            <a href="tel:+31612345678">
              <Phone className="h-4 w-4" />
              Bel Nu
            </a>
          </Button>
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container flex flex-col py-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-secondary text-primary"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+31612345678"
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-primary"
            >
              <Phone className="h-4 w-4" />
              06 - 1234 5678
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
