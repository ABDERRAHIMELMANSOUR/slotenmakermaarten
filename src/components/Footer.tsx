import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "@/assets/logo.png";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import {
  PHONE_DISPLAY, PHONE_HREF, EMAIL, BASE_CITY, BASE_PROVINCE, BASE_REGION, KVK,
} from "@/config/site";

const Footer = () => {
  // Footer links are a real crawl path to the city pages, so keep a solid
  // sample here and send the rest through the werkgebied hub.
  const footerCities = cities.slice(0, 12);

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Slotenmaker Maarten" className="h-12 w-auto brightness-0 invert" width={160} height={48} />
            <p className="text-sm text-background/70">
              Uw betrouwbare slotenmaker in {BASE_CITY} en {BASE_REGION}. 24/7 bereikbaar voor
              spoed, slotvervanging en inbraakbeveiliging.
            </p>
          </div>

          {/* Diensten */}
          <div>
            <h2 className="font-heading font-bold text-lg mb-4">Diensten</h2>
            <ul className="space-y-2 text-sm text-background/70">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/diensten/${s.slug}`} className="hover:text-primary transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-heading font-bold text-lg mb-4">Contact</h2>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href={PHONE_HREF} className="hover:text-primary transition-colors">{PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-primary transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{BASE_CITY}, {BASE_PROVINCE}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <span>24/7 bereikbaar</span>
              </li>
            </ul>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              <li><Link to="/over-ons" className="hover:text-primary transition-colors">Over ons</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Werkgebied */}
          <div>
            <h2 className="font-heading font-bold text-lg mb-4">Werkgebied</h2>
            <ul className="space-y-1 text-sm text-background/70 columns-2">
              {footerCities.map((c) => (
                <li key={c.slug}>
                  <Link to={`/slotenmaker/${c.slug}`} className="hover:text-primary transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/werkgebied" className="inline-block mt-3 text-sm font-semibold text-primary hover:underline">
              Alle {cities.length} plaatsen
            </Link>
            {KVK && <p className="mt-3 text-xs text-background/50">KvK: {KVK}</p>}
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
