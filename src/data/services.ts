import {
  DoorOpen, Lock, Shield, KeyRound, Wrench, Home, type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  /** Short label for cards and navigation. */
  title: string;
  /** H1 / page heading, written for search intent. */
  heading: string;
  /** One-line summary used on cards and in the services index. */
  summary: string;
  /** Full body copy for the service detail page. */
  body: string[];
  /** Concrete deliverables — renders as a checklist. */
  includes: string[];
  /** Indicative price band. Dutch consumers filter hard on this. */
  priceFrom: string;
  /** True for services that drive emergency (spoed) intent. */
  emergency: boolean;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "buitensluiting",
    title: "Buitensluiting",
    heading: "Buitengesloten? Deur openen zonder schade",
    summary: "Snel en schadevrij uw deur geopend, dag en nacht.",
    body: [
      "Buitengesloten raken gebeurt zelden op een handig moment. Sleutel binnen laten liggen, deur die achter u dichtvalt, of een sleutel die afbreekt in de cilinder — in vrijwel alle gevallen krijgen wij uw deur open zonder dat het slot eraan gaat.",
      "Wij werken standaard met openingstechnieken die het slot intact laten. Alleen wanneer een slot al defect of geforceerd is, is vervanging nodig. Dat bespreken wij eerst met u, inclusief de kosten, voordat wij iets vervangen.",
      "Onze monteur legitimeert zich bij aankomst. Wij openen een deur uitsluitend na controle dat u daadwerkelijk bewoner of gemachtigde bent — met een legitimatiebewijs, huurcontract of een bevestiging via de verhuurder.",
    ],
    includes: [
      "Schadevrij openen van voor-, achter- en garagedeuren",
      "Afgebroken sleutels uit de cilinder verwijderen",
      "Controle en smering van het slot na opening",
      "Direct nieuw slot plaatsen wanneer het oude defect blijkt",
      "Legitimatiecontrole voor uw eigen veiligheid",
    ],
    priceFrom: "€ 95",
    emergency: true,
    icon: DoorOpen,
  },
  {
    slug: "sloten-vervangen",
    title: "Sloten Vervangen",
    heading: "Sloten vervangen met SKG-gecertificeerd materiaal",
    summary: "Nieuwe cilinders en sloten met SKG-keurmerk, direct gemonteerd.",
    body: [
      "Na een verhuizing, een verloren sleutel of een inbraakpoging is het vervangen van uw sloten de snelste manier om de controle terug te krijgen. U weet dan zeker dat er geen sleutels meer in omloop zijn die u niet kent.",
      "Wij plaatsen uitsluitend cilinders met een SKG-keurmerk. Het aantal sterren zegt iets over de inbraakwerendheid: SKG** is voor de meeste woningen de standaard, SKG*** biedt extra bescherming tegen kerntrekken en is verstandig bij een deur die aan de straat ligt.",
      "Wij hebben de gangbare maten op de bus, zodat vervanging in de meeste gevallen in één bezoek klaar is. Afwijkende maten meten wij ter plaatse in en bestellen wij na.",
    ],
    includes: [
      "Inmeten van de juiste cilinderlengte",
      "SKG** en SKG*** cilinders van A-merken",
      "Gelijksluitende cilinders — één sleutel voor alle deuren",
      "Kerntrekbeveiliging waar de deur daarom vraagt",
      "Oude cilinder wordt meegenomen en vernietigd",
    ],
    priceFrom: "€ 75",
    emergency: false,
    icon: Lock,
  },
  {
    slug: "inbraakbeveiliging",
    title: "Inbraakbeveiliging",
    heading: "Inbraakbeveiliging volgens het Politiekeurmerk",
    summary: "Preventief beveiligen van woning en bedrijfspand.",
    body: [
      "De meeste woninginbraken in Nederland zijn gelegenheidsinbraken: een inbreker probeert een deur of raam en gaat verder als het te lang duurt. Goed hang- en sluitwerk verlengt die tijd tot voorbij het punt waarop de meeste inbrekers afhaken.",
      "Wij brengen eerst in kaart waar uw pand kwetsbaar is — vaak zijn dat achterdeuren, schuifpuien en ramen aan de achterzijde die vanaf de straat niet zichtbaar zijn. Op basis daarvan krijgt u een voorstel met prioriteiten, zodat u niet meer uitgeeft dan nodig.",
      "Wij werken volgens de eisen van het Politiekeurmerk Veilig Wonen. Veel inboedelverzekeraars geven korting wanneer uw woning aan die eisen voldoet — vraag dat na bij uw verzekeraar.",
    ],
    includes: [
      "Gratis beveiligingsscan van deuren en ramen",
      "Meerpuntssluitingen op voor- en achterdeur",
      "Veiligheidsbeslag met kerntrekbeveiliging",
      "Raambeveiliging en oplegsloten",
      "Advies volgens Politiekeurmerk Veilig Wonen",
    ],
    priceFrom: "€ 150",
    emergency: false,
    icon: Shield,
  },
  {
    slug: "cilindersloten",
    title: "Cilindersloten",
    heading: "Cilindersloten: alle merken, direct gemonteerd",
    summary: "Van standaard cilinders tot high-security met kopieerbescherming.",
    body: [
      "De cilinder is het deel van het slot waar de sleutel in gaat, en daarmee het onderdeel dat een inbreker als eerste aanpakt. Kerntrekken — waarbij de cilinder met kracht uit de deur wordt getrokken — is een van de meest gebruikte methoden bij woninginbraak in Nederland.",
      "Een cilinder met SKG*** keurmerk heeft een breekpunt en een gehard binnenwerk, waardoor kerntrekken en boren aanzienlijk moeilijker worden. In combinatie met veiligheidsbeslag is dat de meest effectieve upgrade per bestede euro.",
      "Bij high-security cilinders hoort een gecertificeerde sleutel. Die kan alleen bijgemaakt worden op vertoon van een sleutelkaart, zodat niemand ongemerkt een kopie van uw sleutel laat maken.",
    ],
    includes: [
      "SKG**, SKG*** en gecertificeerde high-security cilinders",
      "Gelijksluitend maken van meerdere deuren",
      "Sleutelkaart met kopieerbescherming",
      "Knopcilinders voor deuren zonder sleutelgat aan de binnenzijde",
      "Bijbestellen van sleutels op certificaat",
    ],
    priceFrom: "€ 55",
    emergency: false,
    icon: KeyRound,
  },
  {
    slug: "slot-reparatie",
    title: "Slot Reparatie",
    heading: "Slot reparatie: klemmende en defecte sloten",
    summary: "Vakkundige reparatie van klemmende, stroeve en defecte sloten.",
    body: [
      "Een slot dat klemt of een deur die alleen met een duw in het slot valt, is bijna altijd een waarschuwing vooraf. Wie dat laat zitten, staat vroeg of laat buiten met een slot dat het helemaal niet meer doet.",
      "Vaak ligt de oorzaak niet in het slot zelf maar in de deur: hout dat gewerkt heeft, scharnieren die zijn gaan zakken, of een sluitplaat die niet meer uitlijnt. Dan is afstellen goedkoper en duurzamer dan vervangen.",
      "Wij beoordelen eerst of reparatie zinvol is. Is het slot economisch afgeschreven of de veiligheid niet meer te garanderen, dan zeggen wij dat — met een prijsopgave voor vervanging voordat wij verdergaan.",
    ],
    includes: [
      "Afstellen van deuren, scharnieren en sluitplaten",
      "Vervangen van versleten onderdelen in het slotmechaniek",
      "Reinigen en smeren met slotspecifieke middelen",
      "Reparatie van meerpuntssluitingen",
      "Eerlijk advies wanneer vervangen goedkoper is dan repareren",
    ],
    priceFrom: "€ 65",
    emergency: false,
    icon: Wrench,
  },
  {
    slug: "inbraakschade-herstel",
    title: "Inbraakschade Herstel",
    heading: "Inbraakschade herstellen — direct weer veilig afgesloten",
    summary: "Deuren en kozijnen hersteld, uw pand dezelfde dag weer dicht.",
    body: [
      "Na een inbraak telt vooral snelheid: uw woning of bedrijfspand moet dezelfde dag weer veilig afgesloten kunnen worden. Wij komen met spoed en zorgen er in elk geval voor dat het pand die nacht dicht kan.",
      "Wij herstellen de schade aan deur, kozijn en slot, en vervangen wat niet meer betrouwbaar is. Waar direct herstel niet mogelijk is, plaatsen wij een deugdelijke noodvoorziening en komen wij terug voor de definitieve reparatie.",
      "Voor uw verzekeraar leveren wij een gespecificeerde factuur en foto's van de schade. Meld de inbraak eerst bij de politie — het proces-verbaalnummer heeft uw verzekeraar vrijwel altijd nodig.",
    ],
    includes: [
      "Spoedreparatie van geforceerde deuren en kozijnen",
      "Vervanging van beschadigde sloten en beslag",
      "Noodafsluiting wanneer definitief herstel later moet",
      "Gespecificeerde factuur en schadefoto's voor de verzekeraar",
      "Advies om herhaling te voorkomen",
    ],
    priceFrom: "€ 120",
    emergency: true,
    icon: Home,
  },
];

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
