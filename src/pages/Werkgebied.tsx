import { Link } from "react-router-dom";
import { Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities } from "@/data/cities";
import { PHONE_DISPLAY, PHONE_HREF, BASE_CITY } from "@/config/site";

/**
 * Hub page linking every city page. Without a crawlable hub, deep city pages
 * are orphans — discoverable only through the sitemap, which Google treats as
 * a hint rather than an endorsement.
 */
const Werkgebied = () => {
  // Group by region so the list reads as a real service area, not a keyword dump.
  const byRegion = cities.reduce<Record<string, typeof cities>>((acc, c) => {
    (acc[c.region] ??= []).push(c);
    return acc;
  }, {});

  const regions = Object.keys(byRegion).sort();

  return (
    <>
      <section className="bg-foreground py-14 md:py-20">
        <div className="container">
          <nav aria-label="Kruimelpad" className="mb-6 text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90" aria-current="page">Werkgebied</li>
            </ol>
          </nav>
          <div className="max-w-3xl space-y-5">
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white leading-tight">
              Werkgebied — waar komt Slotenmaker Maarten?
            </h1>
            <p className="text-white/80 text-lg">
              Vanuit onze standplaats in {BASE_CITY} bedienen wij {cities.length} plaatsen in Rivierenland,
              de Betuwe en de omliggende regio's. Per plaats vindt u hieronder de gemiddelde aanrijtijd —
              wij noemen liever een eerlijk getal dan een marketingbelofte.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 font-bold">
              <a href={PHONE_HREF}>
                <Phone className="h-5 w-5" />
                Bel {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-background">
        <div className="container space-y-12">
          {regions.map((region) => (
            <div key={region}>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                {region}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {byRegion[region]
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name, "nl"))
                  .map((c) => (
                    <Link
                      key={c.slug}
                      to={`/slotenmaker/${c.slug}`}
                      className="group p-5 rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      <p className="font-heading font-bold group-hover:text-primary transition-colors">
                        Slotenmaker {c.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        ± {c.responseMinutes} min · {c.postcodes}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-20 bg-secondary">
        <div className="container max-w-3xl text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Staat uw plaats er niet bij?</h2>
          <p className="text-muted-foreground">
            Ons werkgebied is niet strak begrensd. Ligt uw adres net buiten deze lijst, bel dan
            gerust — wij zeggen eerlijk of wij u snel genoeg kunnen helpen of dat u beter af bent
            met een slotenmaker dichterbij.
          </p>
          <Button asChild size="lg" className="font-bold">
            <a href={PHONE_HREF}>
              <Phone className="h-5 w-5" />
              {PHONE_DISPLAY}
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Werkgebied;
