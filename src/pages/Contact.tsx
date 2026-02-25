import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ naam: "", telefoon: "", email: "", bericht: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Bericht verzonden!", description: "Wij nemen zo snel mogelijk contact met u op." });
    setForm({ naam: "", telefoon: "", email: "", bericht: "" });
  };

  return (
    <>
      <section className="bg-foreground py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">Contact</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Neem direct contact op voor spoedhulp of een vrijblijvende offerte.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="border-border">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-heading font-bold mb-6">Stuur ons een bericht</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Naam *</label>
                    <Input required value={form.naam} onChange={(e) => setForm({ ...form, naam: e.target.value })} placeholder="Uw naam" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Telefoonnummer *</label>
                    <Input required type="tel" value={form.telefoon} onChange={(e) => setForm({ ...form, telefoon: e.target.value })} placeholder="06 - 1234 5678" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">E-mail</label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="uw@email.nl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Bericht *</label>
                    <Textarea required value={form.bericht} onChange={(e) => setForm({ ...form, bericht: e.target.value })} placeholder="Beschrijf uw situatie..." rows={5} />
                  </div>
                  <Button type="submit" className="w-full font-bold">
                    <Send className="h-4 w-4" />
                    Verstuur Bericht
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-heading font-bold">Contactgegevens</h2>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: "Telefoon", value: "+31 344 700 234", href: "tel:+31344700234" },
                  { icon: Mail, label: "E-mail", value: "contact@slotenmakermaarten.nl", href: "mailto:contact@slotenmakermaarten.nl" },
                  { icon: MapPin, label: "Adres", value: "Amsterdam, Nederland" },
                  { icon: Clock, label: "Bereikbaarheid", value: "24/7 — 365 dagen per jaar" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-secondary flex-shrink-0">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{c.value}</a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-heading font-bold mb-3">Werkgebied</h3>
                <div className="flex flex-wrap gap-2">
                  {["Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven", "Almere", "Haarlem", "Leiden", "Amersfoort", "Breda"].map((s) => (
                    <span key={s} className="px-3 py-1 bg-secondary text-sm rounded-full">{s}</span>
                  ))}
                </div>
              </div>

              <Button asChild size="lg" className="w-full font-bold mt-4">
                <a href="tel:+31344700234">
                  <Phone className="h-5 w-5" />
                  Bel Direct — +31 344 700 234
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
