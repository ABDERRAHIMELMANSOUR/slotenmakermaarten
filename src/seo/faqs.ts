import type { City } from "@/data/cities";
import { PHONE_DISPLAY } from "@/config/site";

export type Faq = { q: string; a: string };

/**
 * City FAQs. The answers pull in that city's own response time, districts,
 * postcodes and neighbours, and the question set varies by distance tier and
 * region — so no two cities ship the same block of text.
 */
export const cityFaqs = (city: City, nearbyNames: string[]): Faq[] => {
  const faqs: Faq[] = [
    {
      q: `Hoe snel is er een slotenmaker in ${city.name}?`,
      a:
        city.responseMinutes <= 25
          ? `${city.name} ligt binnen onze directe actieradius. Bij spoed zijn wij er gemiddeld binnen ${city.responseMinutes} minuten, 24 uur per dag. Wij noemen bij het telefoongesprek altijd een concrete aankomsttijd, ook wanneer die door drukte langer uitvalt.`
          : `${city.name} ligt op ongeveer ${city.responseMinutes} minuten rijden vanaf onze standplaats in Tiel. Wij beloven daar geen twintig minuten die wij niet waar kunnen maken: u hoort bij het telefoongesprek hoe laat wij er realistisch zijn, zodat u kunt beslissen of u wacht.`,
    },
    {
      q: `Wat kost een slotenmaker in ${city.name}?`,
      a: `Een spoedopening start vanaf € 95 en een cilinder vervangen vanaf € 75, exclusief materiaal. Wij rekenen geen voorrijkosten binnen ${city.name}. U krijgt aan de telefoon een prijsindicatie en ter plaatse een vaste prijs voordat het werk begint — geen nacalculatie achteraf.`,
    },
    {
      q: `Werken jullie ook 's nachts en in het weekend in ${city.name}?`,
      a: `Ja. Wij zijn 24 uur per dag, 7 dagen per week bereikbaar op ${PHONE_DISPLAY}, ook op feestdagen. Een buitensluiting om drie uur 's nachts in ${city.name} behandelen wij net zo als een klus op dinsdagmiddag.`,
    },
    {
      q: `In welke wijken van ${city.name} komen jullie?`,
      a: `Wij werken in heel ${city.name}, waaronder ${city.neighbourhoods.slice(0, -1).join(", ")} en ${city.neighbourhoods.slice(-1)[0]}. Het postcodegebied ${city.postcodes} valt volledig binnen ons werkgebied.`,
    },
    {
      q: `Gaat mijn deur kapot als de slotenmaker hem opent?`,
      a: `In de meeste gevallen niet. Wij openen deuren standaard met technieken die het slot intact laten, zodat u dezelfde cilinder kunt blijven gebruiken. Alleen wanneer het slot al defect of geforceerd is, is vervanging nodig — dat bespreken wij eerst met u, inclusief de kosten.`,
    },
  ];

  // Distance tier decides which trust question is worth answering here.
  if (city.responseMinutes >= 35) {
    faqs.push({
      q: `Komen jullie voor één klus helemaal naar ${city.name}?`,
      a: `Ja. ${city.name} hoort bij ons vaste werkgebied en wij rekenen er geen voorrijkosten. Voor geplande klussen zoals slotvervanging of een beveiligingsscan plannen wij in overleg een moment. Bij spoed hangt het af van waar onze monteur op dat moment zit; u hoort direct of wij die kant op kunnen.`,
    });
  } else {
    faqs.push({
      q: `Kan ik in ${city.name} ook een afspraak vooraf plannen?`,
      a: `Zeker. Naast spoed doen wij veel geplande klussen in ${city.name}: sloten vervangen na een verhuizing, een gelijksluitend cilinderplan of een beveiligingsscan. Dat plannen wij op een moment dat u schikt, ook 's avonds.`,
    });
  }

  faqs.push({
    q: `Werken jullie ook in de omgeving van ${city.name}?`,
    a: `Ja. Vanuit ${city.name} bedienen wij ook ${nearbyNames.join(", ")} en de tussenliggende kernen. Twijfelt u of uw adres binnen het werkgebied valt? Bel ${PHONE_DISPLAY} — wij zeggen het eerlijk als u sneller geholpen bent door iemand anders.`,
  });

  faqs.push({
    q: `Hoe weet ik dat de slotenmaker in ${city.name} betrouwbaar is?`,
    a: `Onze monteur legitimeert zich bij aankomst en opent een deur pas nadat is vastgesteld dat u bewoner of gemachtigde bent. U krijgt vooraf een vaste prijs en achteraf een gespecificeerde factuur. Wij monteren uitsluitend sloten met een SKG-keurmerk.`,
  });

  return faqs;
};
