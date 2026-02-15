import { Phone, DoorOpen, Lock, Shield, KeyRound, FileText, Award, Wrench, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const diensten = [
  { icon: DoorOpen, title: "Buitensluiting", desc: "Buitengesloten? Geen paniek! Wij openen uw deur snel en zonder schade. Onze slotenmaker is binnen 30 minuten ter plaatse, 24 uur per dag, 7 dagen per week. Of het nu gaat om uw voordeur, achterdeur of garagedeur — wij helpen u altijd." },
  { icon: Lock, title: "Sloten Vervangen", desc: "Wilt u uw sloten laten vervangen? Wij plaatsen uitsluitend gecertificeerde sloten van topmerken. Na verhuizing, verlies van sleutels of na een inbraak zorgen wij voor nieuwe, veilige sloten met SKG-certificering." },
  { icon: Shield, title: "Inbraakbeveiliging", desc: "Bescherm uw woning of bedrijfspand tegen inbraak. Wij adviseren en installeren inbraakwerende voorzieningen zoals meerpuntsluitingen, veiligheidsbeslag en raam- en deurbeveiliging." },
  { icon: KeyRound, title: "Cilindersloten", desc: "Alle typen en merken cilindersloten leverbaar en direct gemonteerd. Van standaard cilinders tot high-security cilinders met kopieerbescherming." },
  { icon: Wrench, title: "Sloten Reparatie", desc: "Een klemmend slot of een kapotte cilinder? Wij repareren alle soorten sloten vakkundig. In de meeste gevallen kan het slot ter plekke gerepareerd worden." },
  { icon: Home, title: "Inbraakschade Herstel", desc: "Na een inbraak herstellen wij direct de schade aan uw deuren en kozijnen. Wij zorgen ervoor dat uw pand weer veilig afgesloten is, dag en nacht." },
];

const Diensten = () => {
  return (
    <>
      <section className="bg-foreground py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">Onze Diensten</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Professioneel slotenwerk voor particulieren en bedrijven. Altijd snel, vakkundig en tegen een eerlijke prijs.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container space-y-8">
          {diensten.map((d, i) => (
            <Card key={d.title} className="overflow-hidden border-border">
              <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 rounded-lg bg-secondary flex-shrink-0">
                  <d.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 space-y-3">
                  <h2 className="text-xl md:text-2xl font-heading font-bold">{d.title}</h2>
                  <p className="text-muted-foreground">{d.desc}</p>
                  <Button asChild>
                    <a href="tel:+31612345678">
                      <Phone className="h-4 w-4" />
                      Bel voor directe hulp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default Diensten;
