import { Link } from "react-router-dom";
import { Phone, FileText, Shield, Clock, KeyRound, DoorOpen, Lock, CheckCircle, Star, ArrowRight, Award, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroBg from "@/assets/hero-bg.jpeg";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { PHONE_DISPLAY, PHONE_HREF, BASE_CITY, BASE_REGION } from "@/config/site";


const usps = [
  { icon: Clock, title: "24/7 Bereikbaar", desc: "Dag en nacht, 365 dagen per jaar" },
  { icon: ArrowRight, title: "Binnen 30 Minuten", desc: "Snelle aanrijtijd in uw regio" },
  { icon: Award, title: "Gecertificeerd", desc: "SKG gecertificeerde slotenmaker" },
  { icon: Banknote, title: "Transparante Prijzen", desc: "Vooraf duidelijke prijsafspraken" },
  { icon: CheckCircle, title: "Geen Voorrijkosten", desc: "U betaalt alleen voor het werk" },
];

const reviews = [
  { name: "Jan de Vries", rating: 5, text: "Buitengesloten op zondagavond, binnen 20 minuten was Maarten er. Professioneel en snel geholpen!" },
  { name: "Lisa Bakker", rating: 5, text: "Alle sloten vervangen na een inbraak. Uitstekend werk en zeer behulpzaam. Aanrader!" },
  { name: "Mohammed El Amrani", rating: 5, text: "Snel, vakkundig en een eerlijke prijs. Zeker een aanrader voor iedereen in de regio." },
  { name: "Sandra Jansen", rating: 4, text: "Goede service, netjes gewerkt. Maarten nam de tijd om alles uit te leggen. Top!" },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight">
              Slotenmaker Tiel &amp; Rivierenland — 24/7 spoed, binnen 20 minuten
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Direct hulp bij buitensluiting, kapotte sloten of inbraakschade. Geen voorrijkosten, vaste prijs vooraf.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 font-bold">
                <a href={PHONE_HREF}>
                  <Phone className="h-5 w-5" />
                  Bel Nu
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 font-bold border-white text-white hover:bg-white hover:text-foreground bg-transparent">
                <Link to="/contact">
                  <FileText className="h-5 w-5" />
                  Offerte Aanvragen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">Onze Diensten</h2>
            <p className="text-muted-foreground">Van spoed buitensluiting tot complete inbraakbeveiliging — wij staan altijd voor u klaar.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.slug} to={`/diensten/${s.slug}`} className="group">
                <Card className="h-full hover:shadow-lg transition-shadow border-border">
                  <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div className="p-3 rounded-lg bg-secondary">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-lg group-hover:text-primary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{s.summary}</p>
                    <p className="text-sm font-semibold">Vanaf {s.priceFrom}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/diensten">Bekijk alle diensten <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">Waarom Slotenmaker Maarten?</h2>
            <p className="text-muted-foreground">Betrouwbaar, snel en altijd transparant. Dat is onze belofte.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {usps.map((u) => (
              <div key={u.title} className="text-center space-y-3">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                  <u.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold">{u.title}</h3>
                <p className="text-sm text-muted-foreground">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-primary text-primary" />
              ))}
            </div>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-2">Klantbeoordelingen</h2>
            <p className="text-muted-foreground">Gemiddeld 4.9 / 5 sterren — meer dan 500 tevreden klanten</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r) => (
              <Card key={r.name} className="border-border">
                <CardContent className="p-6 space-y-3">
                  <div className="flex gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                    {[...Array(5 - r.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-border" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{r.text}"</p>
                  <p className="text-sm font-semibold">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">Recent Werk</h2>
            <p className="text-muted-foreground">Bekijk een greep uit onze recente projecten.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <Lock className="h-10 w-10 text-muted-foreground/30" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/portfolio">Bekijk portfolio <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Werkgebied — crawlable internal links to every city page */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
              Slotenmaker in {BASE_REGION} en omgeving
            </h2>
            <p className="text-muted-foreground">
              Vanuit {BASE_CITY} bedienen wij {cities.length} plaatsen. Bekijk de aanrijtijd en
              de mogelijkheden voor uw plaats.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                to={`/slotenmaker/${c.slug}`}
                className="group px-4 py-3 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <span className="block text-sm font-semibold group-hover:text-primary transition-colors">
                  Slotenmaker {c.name}
                </span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  ± {c.responseMinutes} min
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/werkgebied">Bekijk het volledige werkgebied <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-primary-foreground">
            Buitengesloten? Bel Direct!
          </h2>
          <p className="text-primary-foreground/90 text-lg">Wij zijn 24/7 bereikbaar en binnen 30 minuten bij u.</p>
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

export default Index;
