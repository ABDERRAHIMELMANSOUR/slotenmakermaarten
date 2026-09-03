import { Navigate, useParams, Link } from "react-router-dom";
import { Phone, Clock, MapPin, ShieldCheck, Banknote, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { getCity, getNearbyCities } from "@/data/cities";
import { services } from "@/data/services";
import { cityFaqs } from "@/seo/faqs";
import { PHONE_DISPLAY, PHONE_HREF } from "@/config/site";

const Stad = () => {
  const { stad } = useParams<{ stad: string }>();
  const city = stad ? getCity(stad.toLowerCase()) : undefined;

  // An unknown city slug must resolve to the real 404 page, never to a
  // thin page rendered with an empty name. Serving 200 OK for these is what
  // Search Console reported as "Soft 404".
  if (!city) return <Navigate to="/404" replace />;

  const nearby = getNearbyCities(city);
  const faqs = cityFaqs(city, nearby.map((n) => n.name));
  const emergencyServices = services.filter((s) => s.emergency);

  return (
    <>
      {/* Hero */}
      <section className="bg-foreground py-14 md:py-20">
        <div className="container">
          <nav aria-label="Kruimelpad" className="mb-6 text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/werkgebied" className="hover:text-primary transition-colors">Werkgebied</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90" aria-current="page">{city.name}</li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-5">
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white leading-tight">
              Slotenmaker {city.name} — 24/7 spoed, gemiddeld binnen {city.responseMinutes} minuten
            </h1>
            <p className="text-white/80 text-lg">{city.intro}</p>
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
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-white/80">
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/50">Aanrijtijd</dt>
                <dd className="font-heading font-bold text-white">± {city.responseMinutes} min</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/50">Bereikbaar</dt>
                <dd className="font-heading font-bold text-white">24/7</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/50">Voorrijkosten</dt>
                <dd className="font-heading font-bold text-white">Geen</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/50">Postcodes</dt>
                <dd className="font-heading font-bold text-white">{city.postcodes}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Spoed strip */}
      <section className="bg-primary py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-primary-foreground">
          <p className="font-heading font-bold text-lg text-center sm:text-left">
            Buitengesloten in {city.name}? Wij rijden direct uit.
          </p>
          <Button asChild variant="outline" className="font-bold border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent">
            <a href={PHONE_HREF}>
              <Phone className="h-4 w-4" />
              Direct bellen
            </a>
          </Button>
        </div>
      </section>

      {/* Local context */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              Slotenwerk in {city.name}: waar wij op letten
            </h2>
            <p className="text-muted-foreground">{city.localNote}</p>
            <p className="text-muted-foreground">
              Wij werken in heel {city.name} en de omliggende kernen. Onze monteur komt met een volledig
              uitgeruste bus, zodat de meeste klussen in één bezoek klaar zijn — inclusief een nieuwe
              SKG-gecertificeerde cilinder wanneer die nodig blijkt.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {city.neighbourhoods.map((n) => (
                <span key={n} className="px-3 py-1 bg-secondary text-sm rounded-full">{n}</span>
              ))}
            </div>
          </div>

          <Card className="border-border h-fit">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-heading font-bold text-lg">Werkgebied {city.name}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{city.name}, {city.region} ({city.province})</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">24 uur per dag, ook op feestdagen</span>
                </li>
                <li className="flex items-start gap-3">
                  <Banknote className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Geen voorrijkosten in {city.name}</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">SKG-gecertificeerd materiaal</span>
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

      {/* Services in this city */}
      <section className="py-14 md:py-20 bg-secondary">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              Onze diensten in {city.name}
            </h2>
            <p className="text-muted-foreground">
              Van spoedopening tot complete inbraakbeveiliging — alles wat wij doen, doen wij ook in {city.name}.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card key={s.slug} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-start gap-3 h-full">
                  <div className="p-3 rounded-lg bg-background">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg">
                    {s.title} in {city.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-1">{s.summary}</p>
                  <p className="text-sm font-semibold">Vanaf {s.priceFrom}</p>
                  <Link
                    to={`/diensten/${s.slug}`}
                    className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Meer over {s.title.toLowerCase()} <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What to do right now */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              Buitengesloten in {city.name}? Doe dit eerst
            </h2>
            <ol className="space-y-3 text-muted-foreground">
              {[
                "Controleer of een achterdeur, tuindeur of raam nog open staat voordat u belt.",
                "Forceer zelf niets. Een geforceerd slot maakt een schadevrije opening onmogelijk en verhoogt de kosten.",
                `Bel ${PHONE_DISPLAY}. U hoort direct wat het kost en hoe laat wij in ${city.name} zijn.`,
                "Houd een legitimatiebewijs klaar. Onze monteur controleert of u bewoner of gemachtigde bent.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Spoedgevallen die wij dagelijks doen</h2>
            <ul className="space-y-3">
              {emergencyServices.flatMap((s) => s.includes.slice(0, 3)).map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
            Veelgestelde vragen over een slotenmaker in {city.name}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-heading font-bold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Nearby cities — internal linking */}
      {nearby.length > 0 && (
        <section className="py-14 md:py-20 bg-background">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              Slotenmaker in de omgeving van {city.name}
            </h2>
            <p className="text-muted-foreground mb-8">
              Wij werken in heel {city.region} en daarbuiten. Bekijk de plaatsen om {city.name} heen.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  to={`/slotenmaker/${n.slug}`}
                  className="group p-5 rounded-lg border border-border bg-background hover:border-primary transition-colors"
                >
                  <p className="font-heading font-bold group-hover:text-primary transition-colors">
                    Slotenmaker {n.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">± {n.responseMinutes} min ter plaatse</p>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link to="/werkgebied">
                  Bekijk het volledige werkgebied <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-primary-foreground">
            Nu een slotenmaker nodig in {city.name}?
          </h2>
          <p className="text-primary-foreground/90 text-lg">
            Wij zijn 24/7 bereikbaar en gemiddeld binnen {city.responseMinutes} minuten bij u.
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

export default Stad;
