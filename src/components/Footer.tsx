import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Slotenmaker Maarten" className="h-12 w-auto brightness-0 invert" />
            <p className="text-sm text-background/70">
              Uw betrouwbare slotenmaker voor spoed en regulier slotenwerk. 24/7 bereikbaar in heel Nederland.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Snelle Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/diensten" className="hover:text-primary transition-colors">Diensten</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/over-ons" className="hover:text-primary transition-colors">Over Ons</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:+31344700234" className="hover:text-primary transition-colors">+31 344 700 234</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:contact@slotenmakermaarten.nl" className="hover:text-primary transition-colors">contact@slotenmakermaarten.nl</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Amsterdam, Nederland</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <span>24/7 Bereikbaar</span>
              </li>
            </ul>
          </div>

          {/* Werkgebied */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Werkgebied</h4>
            <ul className="space-y-1 text-sm text-background/70 columns-2">
              <li>Amsterdam</li>
              <li>Rotterdam</li>
              <li>Den Haag</li>
              <li>Utrecht</li>
              <li>Eindhoven</li>
              <li>Almere</li>
              <li>Haarlem</li>
              <li>Leiden</li>
            </ul>
            <p className="mt-3 text-xs text-background/50">KvK: 12345678</p>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container py-4 text-center text-xs text-background/50">
          © {new Date().getFullYear()} Slotenmaker Maarten. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
