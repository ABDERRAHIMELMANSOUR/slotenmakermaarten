import { Award, Clock, Shield, CheckCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const OverOns = () => {
  return (
    <>
      <section className="bg-foreground py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">Over Ons</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Maak kennis met Slotenmaker Maarten — uw betrouwbare partner in slotenwerk.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-bold">Vakmanschap & Vertrouwen</h2>
              <p className="text-muted-foreground">
                Slotenmaker Maarten is opgericht met één doel: particulieren en bedrijven voorzien van betrouwbaar, snel en professioneel slotenwerk. Met jarenlange ervaring in de branche zijn wij uitgegroeid tot een van de meest vertrouwde slotenmakers in Nederland.
              </p>
              <p className="text-muted-foreground">
                Of het nu gaat om een spoedgeval midden in de nacht of een geplande slotvervanging — wij staan altijd voor u klaar. Ons team bestaat uit gecertificeerde vakmensen die werken met de beste materialen en altijd transparant zijn over kosten.
              </p>
              <p className="text-muted-foreground">
                Wij geloven dat iedereen recht heeft op een veilig thuis en een beveiligd bedrijfspand. Daarom zijn wij 24 uur per dag, 7 dagen per week bereikbaar.
              </p>
              <Button asChild>
                <a href="tel:+31612345678">
                  <Phone className="h-4 w-4" />
                  Neem contact op
                </a>
              </Button>
            </div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <Users className="h-20 w-20 text-muted-foreground/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">Onze Kernwaarden</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "Snelheid", desc: "Binnen 30 minuten ter plaatse, 24/7." },
              { icon: Award, title: "Kwaliteit", desc: "Alleen SKG gecertificeerde sloten en materialen." },
              { icon: Shield, title: "Betrouwbaar", desc: "Transparante prijzen, geen verborgen kosten." },
              { icon: CheckCircle, title: "Ervaring", desc: "Jarenlange ervaring in alle soorten slotenwerk." },
            ].map((v) => (
              <div key={v.title} className="text-center space-y-3">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                  <v.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OverOns;
