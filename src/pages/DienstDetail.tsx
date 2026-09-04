import { Navigate, useParams, Link } from "react-router-dom";
import { Phone, CheckCircle2, ArrowRight, Banknote, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getService, services } from "@/data/services";
import { cities } from "@/data/cities";
import { PHONE_DISPLAY, PHONE_HREF } from "@/config/site";

const DienstDetail = () => {
  const { dienst } = useParams<{ dienst: string }>();
  const service = dienst ? getService(dienst.toLowerCase()) : undefined;

  // Unknown service slug -> the real 404 page, not a blank template.
  if (!service) return <Navigate to="/404" replace />;

  const others = services.filter((s) => s.slug !== service.slug);
  const topCities = cities.slice(0, 8);

  return (
    <>
      <section className="bg-foreground py-14 md:py-20">
        <div className="container">
          <nav aria-label="Kruimelpad" className="mb-6 text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/diensten" className="hover:text-primary transition-colors">Diensten</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90" aria-current="page">{service.title}</li>
            </ol>
          </nav>
          <div className="max-w-3xl space-y-5">
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white leading-tight">
              {service.heading}
            </h1>
            <p className="text-white/80 text-lg">{service.summary}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 font-bold">
                <a href={PHONE_HREF}>
                  <Phone className="h-5 w-5" />
                  Bel {PHONE_DISPLAY}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 font-bold border-white text-white hover:bg-white hover:text-foreground bg-transparent">
                <Link to="/contact">Offerte aanvragen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-background">
        <div className="container grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Wat houdt het in?</h2>
            {service.body.map((p) => (
              <p key={p.slice(0, 40)} className="text-muted-foreground">{p}</p>
            ))}

            <h2 className="text-2xl md:text-3xl font-heading font-bold pt-6">Wat wij voor u doen</h2>
            <ul className="space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="border-border h-fit">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-heading font-bold text-lg">{service.title}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Banknote className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Vanaf {service.priceFrom}, exclusief materiaal. Vaste prijs vooraf.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    {service.emergency
                      ? "24/7 spoedservice, ook 's nachts en op feestdagen."
                      : "Op afspraak, ook 's avonds en in het weekend."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Geen voorrijkosten binnen ons werkgebied.</span>
                </li>
              </ul>
              <Button asChild className="w-full font-bold">
                <a href={PHONE_HREF}>
                  <Phone className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Where we do it — internal links to city pages */}
      <section className="py-14 md:py-20 bg-secondary">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
            {service.title} in uw plaats
          </h2>
          <p className="text-muted-foreground mb-8">
            Wij voeren {service.title.toLowerCase()} uit in heel Rivierenland en omgeving.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {topCities.map((c) => (
              <Link
                key={c.slug}
                to={`/slotenmaker/${c.slug}`}
                className="px-4 py-3 rounded-lg border border-border bg-background hover:border-primary transition-colors text-sm font-medium"
              >
                {service.title} {c.name}
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/werkgebied">
                Volledig werkgebied <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">Andere diensten</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((s) => (
              <Link key={s.slug} to={`/diensten/${s.slug}`} className="group">
                <Card className="border-border h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <div className="p-3 rounded-lg bg-secondary w-fit">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold group-hover:text-primary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{s.summary}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-12 md:py-16">
        <div className="container text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-primary-foreground">
            {service.emergency ? "Direct hulp nodig?" : "Vrijblijvend advies?"}
          </h2>
          <p className="text-primary-foreground/90 text-lg">
            Bel voor een vaste prijsafspraak — 24 uur per dag bereikbaar.
          </p>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 font-bold border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent">
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

export default DienstDetail;
