import { Lock } from "lucide-react";

const items = [
  { title: "Slotvervanging na inbraak — Amsterdam", desc: "Complete vervanging van 3 cilindersloten met SKG*** classificatie." },
  { title: "Inbraakbeveiliging — Rotterdam", desc: "Meerpuntssluiting en veiligheidsbeslag geïnstalleerd." },
  { title: "Buitensluiting — Den Haag", desc: "Bewoner buitengesloten, deur schadevrij geopend binnen 15 min." },
  { title: "Sloten upgrade — Utrecht", desc: "Alle sloten vervangen naar high-security cilinders." },
  { title: "Bedrijfspand beveiliging — Eindhoven", desc: "Toegangscontrole systeem geïnstalleerd." },
  { title: "Noodgeval weekend — Haarlem", desc: "Kapot slot vervangen op zondagnacht." },
  { title: "Renovatie slotenwerk — Almere", desc: "Compleet nieuw slotenwerk voor gerenoveerde woning." },
  { title: "Kozijnreparatie na inbraak — Leiden", desc: "Kozijn hersteld en nieuwe sloten gemonteerd." },
];

const Portfolio = () => {
  return (
    <>
      <section className="bg-foreground py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">Portfolio</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Een greep uit onze uitgevoerde projecten. Kwaliteit en vakmanschap staan bij ons centraal.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.title} className="group">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                  <Lock className="h-12 w-12 text-muted-foreground/20" />
                </div>
                <h3 className="font-heading font-bold text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
