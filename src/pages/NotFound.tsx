import { Link } from "react-router-dom";
import { Phone, Home, MapPin, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { PHONE_DISPLAY, PHONE_HREF } from "@/config/site";

/**
 * Rendered for unknown paths and prerendered to dist/404.html, which Vercel
 * serves with a genuine HTTP 404 status. A 404 that offers real routes onward
 * recovers traffic that would otherwise bounce.
 */
const NotFound = () => (
  <>
    <section className="bg-foreground py-16 md:py-24">
      <div className="container text-center max-w-2xl mx-auto space-y-5">
        <p className="text-primary font-heading font-bold text-lg">404</p>
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
          Deze pagina bestaat niet
        </h1>
        <p className="text-white/80 text-lg">
          De pagina die u zocht is verplaatst of bestaat niet meer. Heeft u met spoed een
          slotenmaker nodig? Bel dan direct — wij zijn 24/7 bereikbaar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Button asChild size="lg" className="text-lg px-8 py-6 font-bold">
            <a href={PHONE_HREF}>
              <Phone className="h-5 w-5" />
              Bel {PHONE_DISPLAY}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 font-bold border-white text-white hover:bg-white hover:text-foreground bg-transparent">
            <Link to="/">
              <Home className="h-5 w-5" />
              Naar de homepage
            </Link>
          </Button>
        </div>
      </div>
    </section>

    <section className="py-14 md:py-20 bg-background">
      <div className="container grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            Onze diensten
          </h2>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/diensten/${s.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Populaire plaatsen
          </h2>
          <ul className="space-y-2 columns-2">
            {cities.slice(0, 10).map((c) => (
              <li key={c.slug}>
                <Link to={`/slotenmaker/${c.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
                  Slotenmaker {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/werkgebied" className="inline-block mt-4 text-sm font-semibold text-primary hover:underline">
            Bekijk het volledige werkgebied
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default NotFound;
