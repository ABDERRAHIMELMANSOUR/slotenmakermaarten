import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";
import { PHONE_DISPLAY, PHONE_HREF } from "@/config/site";

const Diensten = () => (
  <>
    <section className="bg-foreground py-16 md:py-24">
      <div className="container text-center">
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">
          Onze Diensten
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Professioneel slotenwerk voor particulieren en bedrijven in Tiel en omgeving.
          Altijd snel, vakkundig en tegen een vooraf afgesproken prijs.
        </p>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-background">
      <div className="container space-y-8">
        {services.map((d) => (
          <Card key={d.slug} className="overflow-hidden border-border">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="p-4 rounded-lg bg-secondary flex-shrink-0">
                <d.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl md:text-2xl font-heading font-bold">{d.title}</h2>
                  {d.emergency && (
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                      24/7 Spoed
                    </span>
                  )}
                  <span className="text-sm font-semibold text-muted-foreground">
                    Vanaf {d.priceFrom}
                  </span>
                </div>
                <p className="text-muted-foreground">{d.body[0]}</p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button asChild>
                    <a href={PHONE_HREF}>
                      <Phone className="h-4 w-4" />
                      Bel voor directe hulp
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to={`/diensten/${d.slug}`}>
                      Meer over {d.title.toLowerCase()} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    <section className="bg-primary py-12 md:py-16">
      <div className="container text-center space-y-4">
        <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-primary-foreground">
          Niet zeker welke dienst u nodig heeft?
        </h2>
        <p className="text-primary-foreground/90 text-lg">
          Bel ons en beschrijf uw situatie — wij zeggen eerlijk wat er nodig is en wat het kost.
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

export default Diensten;
