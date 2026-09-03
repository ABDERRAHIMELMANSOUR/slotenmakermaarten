/**
 * Service-area cities for the localised /slotenmaker/<stad> pages.
 *
 * Every entry carries hand-written, city-specific copy. That is deliberate:
 * pages that differ only by a substituted place name are treated as doorway
 * pages and get filtered out of the index — which is exactly the "Soft 404"
 * and "Crawled - currently not indexed" pattern this site was hit with.
 *
 * `responseMinutes` is derived from real driving distance to the Tiel base of
 * operations. Do not flatten these to a single marketing number: an unmet
 * arrival promise is both a conversion killer and a misleading claim.
 *
 * To add a city, append an entry here. The route, sitemap entry, JSON-LD,
 * internal links and prerendered HTML file are all generated from this list.
 */

export type City = {
  slug: string;
  name: string;
  /** Grammatically correct Dutch preposition: "in Tiel" vs "in de Betuwe". */
  province: string;
  region: string;
  postcodes: string;
  /** Honest arrival estimate from the Tiel base, in minutes. */
  responseMinutes: number;
  lat: number;
  lng: number;
  /** Real districts/villages — drives genuinely unique on-page text. */
  neighbourhoods: string[];
  /** Slugs of neighbouring cities, for internal linking. */
  nearby: string[];
  /** Unique opening paragraph. Never templated. */
  intro: string;
  /** A local angle: housing stock, lock types common in the area, etc. */
  localNote: string;
};

export const cities: City[] = [
  {
    slug: "tiel",
    name: "Tiel",
    province: "Gelderland",
    region: "Rivierenland",
    postcodes: "4001 – 4005",
    responseMinutes: 20,
    lat: 51.8869,
    lng: 5.4297,
    neighbourhoods: ["Binnenstad", "Passewaaij", "Drumpt", "Rauwenhof", "Kellen", "Wadenoijen"],
    nearby: ["geldermalsen", "culemborg", "buren", "zaltbommel"],
    intro:
      "Tiel is onze thuisbasis. Vanuit de stad rijden wij dagelijks naar klanten in de binnenstad, Passewaaij en Drumpt, en zijn wij bij spoed doorgaans binnen twintig minuten ter plaatse. Ook 's nachts en in het weekend.",
    localNote:
      "De binnenstad van Tiel heeft veel oude panden met smalle houten deuren en kozijnen die door de jaren heen gewerkt hebben. Een cilinder die daar klemt, is vaker een uitgelijnde deur dan een defect slot — afstellen is dan goedkoper dan vervangen. In Passewaaij zien wij juist het omgekeerde: nieuwbouw met meerpuntssluitingen waar bij een storing de complete sluitstang vervangen moet worden.",
  },
  {
    slug: "culemborg",
    name: "Culemborg",
    province: "Gelderland",
    region: "Rivierenland",
    postcodes: "4100 – 4105",
    responseMinutes: 20,
    lat: 51.9556,
    lng: 5.2264,
    neighbourhoods: ["Binnenstad", "Terweijde", "Parijsch", "Lanxmeer", "Goilberdingen"],
    nearby: ["tiel", "buren", "geldermalsen", "vianen"],
    intro:
      "In Culemborg zijn wij bij spoedgevallen doorgaans binnen twintig minuten ter plaatse. Wij werken door de hele stad, van de historische binnenstad tot de nieuwbouw in Parijsch.",
    localNote:
      "De vestingbinnenstad van Culemborg staat vol monumentale panden waar het slot niet zomaar vervangen mag worden zonder rekening te houden met de deur zelf. Wij werken daar met inzetcilinders die in het bestaande kastslot passen, zodat het oorspronkelijke beslag behouden blijft. In de ecowijk Lanxmeer komen wij veel houten deuren tegen waarbij het hout in de winter uitzet en de deur gaat klemmen.",
  },
  {
    slug: "geldermalsen",
    name: "Geldermalsen",
    province: "Gelderland",
    region: "Betuwe",
    postcodes: "4190 – 4194",
    responseMinutes: 20,
    lat: 51.8814,
    lng: 5.2839,
    neighbourhoods: ["Centrum", "De Plantage", "Meteren", "Tricht", "Buurmalsen"],
    nearby: ["tiel", "culemborg", "waardenburg", "beesd"],
    intro:
      "Geldermalsen en de omliggende kernen Meteren, Tricht en Buurmalsen liggen op nog geen twintig minuten van onze standplaats. Ook bij een buitensluiting midden in de nacht rijden wij die kant op.",
    localNote:
      "Rond het station en in De Plantage staat veel recente nieuwbouw met meerpuntssluitingen. Die zijn inbraakwerend, maar wanneer de sluitstang vastloopt gaat de deur helemaal niet meer open of dicht. Dat is vrijwel altijd een afstelkwestie in het kozijn en zelden een reden om het complete slot te vervangen.",
  },
  {
    slug: "zaltbommel",
    name: "Zaltbommel",
    province: "Gelderland",
    region: "Bommelerwaard",
    postcodes: "5300 – 5301",
    responseMinutes: 25,
    lat: 51.8069,
    lng: 5.2447,
    neighbourhoods: ["Binnenstad", "De Waluwe", "Gamerensedijk", "Zandkampen"],
    nearby: ["tiel", "geldermalsen", "waardenburg", "den-bosch"],
    intro:
      "Zaltbommel ligt aan de overkant van de Waal, op ongeveer 25 minuten rijden. Wij komen er zowel voor spoed als voor geplande slotvervanging en beveiligingsadvies.",
    localNote:
      "De ommuurde binnenstad van Zaltbommel kent veel panden met dubbele voordeuren en oud kastslotwerk. Daar past zelden een standaardcilinder in; wij meten die deuren ter plaatse in. In De Waluwe, de nieuwere uitbreiding aan de noordkant, gaat het juist bijna altijd om standaard profielcilinders die wij direct uit voorraad vervangen.",
  },
  {
    slug: "buren",
    name: "Buren",
    province: "Gelderland",
    region: "Betuwe",
    postcodes: "4116 – 4119",
    responseMinutes: 20,
    lat: 51.9192,
    lng: 5.3428,
    neighbourhoods: ["Buren", "Lienden", "Maurik", "Beusichem", "Zoelen"],
    nearby: ["tiel", "culemborg", "geldermalsen", "rhenen"],
    intro:
      "De gemeente Buren bestaat uit een reeks dorpskernen tussen Tiel en Culemborg. Wij bedienen ze allemaal — Buren zelf, maar ook Lienden, Maurik, Beusichem en Zoelen — meestal binnen twintig minuten.",
    localNote:
      "In het buitengebied rond Buren staan veel vrijstaande woningen en boerderijen met bijgebouwen die vanaf de weg niet te zien zijn. Juist die achterzijde is het zwakke punt: een schuurdeur of achterdeur met enkel een oud opleg slot. Wij adviseren daar vrijwel altijd om eerst de achterzijde op orde te brengen voordat er aan de voordeur iets gebeurt.",
  },
  {
    slug: "beesd",
    name: "Beesd",
    province: "Gelderland",
    region: "Betuwe",
    postcodes: "4153",
    responseMinutes: 25,
    lat: 51.8878,
    lng: 5.1911,
    neighbourhoods: ["Beesd", "Rhenoy", "Gellicum", "Enspijk"],
    nearby: ["geldermalsen", "leerdam", "culemborg", "tiel"],
    intro:
      "Beesd en de omliggende kernen Rhenoy, Gellicum en Enspijk liggen op ongeveer 25 minuten van Tiel. Wij komen er voor buitensluitingen, slotvervanging en inbraakbeveiliging.",
    localNote:
      "Beesd is een dorp met veel lintbebouwing langs de Voorstraat, waar de woningen direct aan de weg staan en de voordeur letterlijk aan de stoep ligt. Kerntrekbeveiliging is daar geen luxe: een cilinder die aan de straatzijde uitsteekt, is in enkele seconden eruit te trekken. Wij vervangen die standaard door een SKG*** cilinder die vlak in het beslag ligt.",
  },
  {
    slug: "leerdam",
    name: "Leerdam",
    province: "Zuid-Holland",
    region: "Vijfheerenlanden",
    postcodes: "4140 – 4143",
    responseMinutes: 30,
    lat: 51.8936,
    lng: 5.0919,
    neighbourhoods: ["Centrum", "Broekgraaf", "Kweldam", "Oranjepark", "Schoonrewoerd"],
    nearby: ["beesd", "geldermalsen", "vianen", "gorinchem"],
    intro:
      "Leerdam ligt op ongeveer een half uur rijden van onze standplaats in Tiel. Wij werken in het centrum, Broekgraaf en de omliggende kernen, en komen ook 's nachts uit voor spoed.",
    localNote:
      "Broekgraaf is grotendeels nieuwbouw van de afgelopen jaren, met standaard meerpuntssluitingen die door de aannemer op de goedkoopste toegestane variant zijn uitgevoerd. Dat voldoet aan de eisen, maar biedt weinig marge. Een upgrade naar SKG*** cilinders en veiligheidsbeslag is daar een relatief goedkope ingreep met veel effect.",
  },
  {
    slug: "waardenburg",
    name: "Waardenburg",
    province: "Gelderland",
    region: "Betuwe",
    postcodes: "4181",
    responseMinutes: 25,
    lat: 51.8264,
    lng: 5.2586,
    neighbourhoods: ["Waardenburg", "Neerijnen", "Hellouw", "Haaften", "Tuil"],
    nearby: ["zaltbommel", "geldermalsen", "tiel", "gorinchem"],
    intro:
      "Waardenburg en de dorpen langs de Waalbandijk — Neerijnen, Hellouw, Haaften en Tuil — liggen op ongeveer 25 minuten rijden. Wij komen er dagelijks langs.",
    localNote:
      "De dijkwoningen langs de Waal hebben vaak een voordeur op dijkniveau en een achterdeur een verdieping lager. Die tweede toegang wordt bij beveiliging stelselmatig vergeten, terwijl hij aan de onbewaakte kant ligt. Wij nemen bij een beveiligingsscan in dit gebied altijd het volledige souterrain mee.",
  },
  {
    slug: "gorinchem",
    name: "Gorinchem",
    province: "Zuid-Holland",
    region: "Vijfheerenlanden",
    postcodes: "4200 – 4207",
    responseMinutes: 35,
    lat: 51.8372,
    lng: 4.9750,
    neighbourhoods: ["Binnenstad", "Lingewijk", "Haarwijk", "Gildenwijk", "Hoog Dalem"],
    nearby: ["leerdam", "waardenburg", "beesd", "zaltbommel"],
    intro:
      "Gorinchem ligt aan de westrand van ons werkgebied, op ongeveer 35 minuten rijden. Voor geplande klussen en beveiligingsadvies komen wij er graag; bij spoed melden wij vooraf eerlijk hoe lang wij onderweg zijn.",
    localNote:
      "De vestingbinnenstad van Gorinchem heeft strikte regels voor gevelwijzigingen aan monumentale panden. Zichtbaar beslag vervangen kan daar vergunningplichtig zijn. Wij werken in dat gebied bij voorkeur met inbouwoplossingen die het aanzicht van de gevel niet veranderen, zodat u niet achteraf tegen een handhavingsbrief aanloopt.",
  },
  {
    slug: "vianen",
    name: "Vianen",
    province: "Utrecht",
    region: "Vijfheerenlanden",
    postcodes: "4130 – 4133",
    responseMinutes: 30,
    lat: 51.9889,
    lng: 5.0928,
    neighbourhoods: ["Binnenstad", "Monnikenhof", "Blankenborch", "Hagestein", "Everdingen"],
    nearby: ["culemborg", "nieuwegein", "leerdam", "ijsselstein"],
    intro:
      "Vianen bereiken wij vanuit Tiel in ongeveer een half uur via de A2. Wij werken in de binnenstad, de naoorlogse wijken en de kernen Hagestein en Everdingen.",
    localNote:
      "Vianen heeft langs de Voorstraat veel panden waar wonen en werken in hetzelfde gebouw zitten. Bij zo'n gemengd pand wilt u de bedrijfsruimte en de woning gescheiden kunnen afsluiten, maar niet met twee losse sleutelbossen rondlopen. Een gelijksluitend cilinderplan met een hoofdsleutel lost dat op zonder de scheiding op te geven.",
  },
  {
    slug: "nieuwegein",
    name: "Nieuwegein",
    province: "Utrecht",
    region: "Utrecht",
    postcodes: "3430 – 3439",
    responseMinutes: 35,
    lat: 52.0292,
    lng: 5.0806,
    neighbourhoods: ["City", "Jutphaas", "Vreeswijk", "Galecop", "Doorslag", "Batau"],
    nearby: ["vianen", "ijsselstein", "houten", "utrecht"],
    intro:
      "Nieuwegein ligt op ongeveer 35 minuten van onze standplaats. Wij komen er voor slotvervanging, inbraakbeveiliging en spoedopeningen in alle wijken, van Batau tot Vreeswijk.",
    localNote:
      "Grote delen van Nieuwegein zijn in dezelfde periode gebouwd, waardoor hele straten hetzelfde type slot hebben. Dat werkt twee kanten op: wij hebben de juiste cilinder vrijwel altijd op de bus, maar een inbreker die één deur in de straat kent, kent ze allemaal. In portiekflats adviseren wij daarom om de eigen voordeur te upgraden en niet te vertrouwen op de centrale toegangsdeur.",
  },
  {
    slug: "ijsselstein",
    name: "IJsselstein",
    province: "Utrecht",
    region: "Utrecht",
    postcodes: "3400 – 3405",
    responseMinutes: 35,
    lat: 52.0208,
    lng: 5.0417,
    neighbourhoods: ["Binnenstad", "Zenderpark", "Achterveld", "Groenvliet"],
    nearby: ["nieuwegein", "vianen", "houten", "utrecht"],
    intro:
      "IJsselstein bereiken wij in ongeveer 35 minuten. Wij werken in de historische binnenstad en in de nieuwere wijken zoals Zenderpark.",
    localNote:
      "In de binnenstad van IJsselstein staan smalle panden met een voordeur die direct op straat uitkomt en nauwelijks ruimte biedt voor uitstekend beslag. Wij werken daar met vlak gemonteerde veiligheidsrozetten in plaats van dik opbouwbeslag, zodat de deur nog steeds normaal opengaat langs de gevel.",
  },
  {
    slug: "houten",
    name: "Houten",
    province: "Utrecht",
    region: "Utrecht",
    postcodes: "3990 – 3999",
    responseMinutes: 30,
    lat: 52.0350,
    lng: 5.1683,
    neighbourhoods: ["Oude Dorp", "Houten-Zuid", "De Molen", "Schalkwijk", "Tull en 't Waal"],
    nearby: ["culemborg", "nieuwegein", "utrecht", "vianen"],
    intro:
      "Houten ligt op ongeveer een half uur van Tiel. Wij komen er in het Oude Dorp, Houten-Zuid en de kernen Schalkwijk en Tull en 't Waal.",
    localNote:
      "Houten is ontworpen rond fietsroutes, waardoor veel woningen een achterzijde hebben die op een fietspad of groenstrook uitkomt in plaats van op een straat met doorgaand verkeer. Die achterdeuren en tuinpoorten liggen buiten het zicht en zijn in de praktijk het meest gebruikte inbraakpunt. Daar begint bij ons de beveiligingsscan.",
  },
  {
    slug: "utrecht",
    name: "Utrecht",
    province: "Utrecht",
    region: "Utrecht",
    postcodes: "3500 – 3585",
    responseMinutes: 45,
    lat: 52.0907,
    lng: 5.1214,
    neighbourhoods: ["Binnenstad", "Lombok", "Wittevrouwen", "Overvecht", "Leidsche Rijn", "Kanaleneiland"],
    nearby: ["nieuwegein", "houten", "ijsselstein", "amersfoort"],
    intro:
      "Utrecht ligt aan de rand van ons werkgebied, op ongeveer 45 minuten rijden. Voor geplande slotvervanging en beveiliging komen wij er graag; bij spoed noemen wij vooraf een realistische aankomsttijd.",
    localNote:
      "In de Utrechtse binnenstad en in wijken als Lombok en Wittevrouwen zit veel particuliere verhuur, waarbij bij een wisseling van huurder onduidelijk is hoeveel sleutels er nog in omloop zijn. Cilinders omzetten naar een gecertificeerd sleutelplan is dan verstandiger dan alleen de sloten vervangen: nieuwe sleutels kunnen daarna alleen nog op certificaat worden bijgemaakt.",
  },
  {
    slug: "wijk-bij-duurstede",
    name: "Wijk bij Duurstede",
    province: "Utrecht",
    region: "Kromme Rijnstreek",
    postcodes: "3960 – 3962",
    responseMinutes: 25,
    lat: 51.9761,
    lng: 5.3428,
    neighbourhoods: ["Binnenstad", "De Horden", "De Heul", "Cothen", "Langbroek"],
    nearby: ["buren", "culemborg", "rhenen", "houten"],
    intro:
      "Wijk bij Duurstede ligt via de pont of over de brug op ongeveer 25 minuten van Tiel. Wij bedienen ook de kernen Cothen en Langbroek.",
    localNote:
      "Een deel van de woningen in het centrum heeft nog originele deuren uit de wederopbouwperiode met een insteekslot van een maat die niet meer standaard geleverd wordt. Wij houden die maten aan boord, zodat u niet met een dichtgetimmerde deur hoeft te wachten tot er iets besteld is.",
  },
  {
    slug: "rhenen",
    name: "Rhenen",
    province: "Utrecht",
    region: "Utrechtse Heuvelrug",
    postcodes: "3910 – 3921",
    responseMinutes: 30,
    lat: 51.9583,
    lng: 5.5686,
    neighbourhoods: ["Centrum", "Vogelenzang", "Achterberg", "Elst"],
    nearby: ["buren", "veenendaal", "wageningen", "wijk-bij-duurstede"],
    intro:
      "Rhenen ligt op ongeveer een half uur rijden vanaf onze standplaats. Wij werken in het centrum en in de kernen Achterberg en Elst.",
    localNote:
      "Rhenen ligt op de overgang van de rivier naar de Heuvelrug, met veel vrijstaande woningen op ruime, begroeide percelen aan de bosrand. Beplanting die de voordeur aan het zicht onttrekt is prettig voor de privacy en even prettig voor een inbreker. Wij kijken bij de beveiligingsscan expliciet naar zichtlijnen vanaf de openbare weg.",
  },
  {
    slug: "veenendaal",
    name: "Veenendaal",
    province: "Utrecht",
    region: "Gelderse Vallei",
    postcodes: "3900 – 3906",
    responseMinutes: 35,
    lat: 52.0286,
    lng: 5.5539,
    neighbourhoods: ["Centrum", "Petenbos", "Dragonder", "Franse Gat", "Veenendaal-Oost"],
    nearby: ["rhenen", "ede", "wageningen", "buren"],
    intro:
      "Veenendaal bereiken wij in ongeveer 35 minuten. Wij komen er voor spoedopeningen, slotvervanging en het beveiligen van woningen en bedrijfspanden.",
    localNote:
      "Veenendaal-Oost is een van de nieuwere uitbreidingen, met veel woningen die zijn opgeleverd met een basisuitvoering hang- en sluitwerk. Dat voldoet aan het Bouwbesluit, maar het Politiekeurmerk vraagt meer. Wie korting op de inboedelverzekering wil, moet die stap zelf zetten — wij brengen vooraf in kaart wat daar precies voor nodig is.",
  },
  {
    slug: "wageningen",
    name: "Wageningen",
    province: "Gelderland",
    region: "Gelderse Vallei",
    postcodes: "6700 – 6709",
    responseMinutes: 35,
    lat: 51.9692,
    lng: 5.6653,
    neighbourhoods: ["Centrum", "Nude", "Tarthorst", "Noordwest", "Wageningen-Hoog"],
    nearby: ["rhenen", "veenendaal", "ede", "arnhem"],
    intro:
      "Wageningen ligt op ongeveer 35 minuten rijden. Wij werken door de hele stad, van het centrum tot Wageningen-Hoog.",
    localNote:
      "Wageningen heeft veel studentenhuizen en kamerverhuur, waar één voordeur wordt gedeeld door bewoners die elk jaar wisselen. Losse kamersloten met een centrale voordeur die op een gewone cilinder zit, betekent in de praktijk dat er tientallen sleutels in omloop zijn. Een sleutelplan met certificaat maakt dat weer beheersbaar voor de verhuurder.",
  },
  {
    slug: "ede",
    name: "Ede",
    province: "Gelderland",
    region: "Gelderse Vallei",
    postcodes: "6710 – 6718",
    responseMinutes: 40,
    lat: 52.0333,
    lng: 5.6667,
    neighbourhoods: ["Centrum", "Veldhuizen", "Bennekom", "Ederveen", "Kernhem"],
    nearby: ["veenendaal", "wageningen", "arnhem", "rhenen"],
    intro:
      "Ede ligt op ongeveer 40 minuten van onze standplaats. Voor geplande klussen en beveiligingsadvies rijden wij die kant graag op; bij spoed noemen wij vooraf een eerlijke aankomsttijd.",
    localNote:
      "Op het voormalige kazerneterrein in Ede is de afgelopen jaren veel getransformeerd naar woningen, waarbij bestaande gebouwen een nieuwe indeling kregen. In dat soort panden lopen de sluitplannen vaak niet meer gelijk met de werkelijke indeling: deuren die formeel gemeenschappelijk zijn maar in de praktijk privé, of andersom. Wij brengen dat eerst in kaart voordat er iets vervangen wordt.",
  },
  {
    slug: "nijmegen",
    name: "Nijmegen",
    province: "Gelderland",
    region: "Rijk van Nijmegen",
    postcodes: "6500 – 6546",
    responseMinutes: 40,
    lat: 51.8126,
    lng: 5.8372,
    neighbourhoods: ["Centrum", "Nijmegen-Oost", "Dukenburg", "Lent", "Hatert", "Bottendaal"],
    nearby: ["druten", "wijchen", "arnhem", "tiel"],
    intro:
      "Nijmegen ligt op ongeveer 40 minuten rijden via de A15. Wij komen er voor slotvervanging, inbraakbeveiliging en spoedopeningen aan beide zijden van de Waal.",
    localNote:
      "In Bottendaal en Nijmegen-Oost staan veel vooroorlogse woningen met een oorspronkelijke voordeur waarvan het slot in de loop der jaren is bijgewerkt in plaats van vervangen. Wij komen daar cilinders tegen die met opvulringen op maat zijn gemaakt en daardoor uitsteken — precies de situatie waarin kerntrekken makkelijk gaat. Een correct ingemeten cilinder lost dat in één bezoek op.",
  },
  {
    slug: "wijchen",
    name: "Wijchen",
    province: "Gelderland",
    region: "Rijk van Nijmegen",
    postcodes: "6600 – 6605",
    responseMinutes: 35,
    lat: 51.8078,
    lng: 5.7233,
    neighbourhoods: ["Centrum", "Wijchen-Noord", "Huurlingsedam", "Alverna", "Batenburg"],
    nearby: ["nijmegen", "druten", "tiel", "den-bosch"],
    intro:
      "Wijchen bereiken wij in ongeveer 35 minuten. Wij werken in het centrum, Wijchen-Noord en de omliggende kernen.",
    localNote:
      "Huurlingsedam is de nieuwbouwuitbreiding aan de noordzijde, waar veel woningen een berging hebben die via een achterpad bereikbaar is. Dat achterpad is gemeenschappelijk en daarmee vrij toegankelijk. Een deugdelijk bergingsslot en een afsluitbare tuinpoort zijn daar effectiever dan nog een upgrade aan de voordeur.",
  },
  {
    slug: "druten",
    name: "Druten",
    province: "Gelderland",
    region: "Land van Maas en Waal",
    postcodes: "6650 – 6653",
    responseMinutes: 30,
    lat: 51.8869,
    lng: 5.6033,
    neighbourhoods: ["Druten", "Deest", "Afferden", "Puiflijk", "Horssen"],
    nearby: ["tiel", "wijchen", "nijmegen", "beneden-leeuwen"],
    intro:
      "Druten ligt aan de overkant van de Waal, op ongeveer een half uur rijden. Wij bedienen ook de kernen Deest, Afferden, Puiflijk en Horssen.",
    localNote:
      "In het Land van Maas en Waal staan veel woningen met een aangebouwde schuur of garage die via een tussendeur met het huis verbonden is. Die tussendeur is bijna nooit beveiligd, terwijl hij feitelijk een tweede voordeur is: wie in de schuur staat, staat uit het zicht en heeft alle tijd. Wij adviseren daar standaard een gecertificeerd slot op de tussendeur.",
  },
  {
    slug: "beneden-leeuwen",
    name: "Beneden-Leeuwen",
    province: "Gelderland",
    region: "Land van Maas en Waal",
    postcodes: "6658",
    responseMinutes: 25,
    lat: 51.8783,
    lng: 5.5342,
    neighbourhoods: ["Beneden-Leeuwen", "Boven-Leeuwen", "Wamel", "Dreumel"],
    nearby: ["tiel", "druten", "wijchen"],
    intro:
      "Beneden-Leeuwen ligt op ongeveer 25 minuten van Tiel, aan de noordoever van de Waal. Wij komen er ook in Boven-Leeuwen, Wamel en Dreumel.",
    localNote:
      "De dorpen langs de Waalbandijk hebben veel woningen met een voordeur die aan de dijk ligt en een tuin die aan de achterzijde overgaat in open land. Er is daar geen achterburen-toezicht. In de praktijk betekent dat: de achterdeur en de schuifpui verdienen hier meer aandacht dan de voordeur.",
  },
  {
    slug: "den-bosch",
    name: "'s-Hertogenbosch",
    province: "Noord-Brabant",
    region: "Noordoost-Brabant",
    postcodes: "5200 – 5249",
    responseMinutes: 40,
    lat: 51.6978,
    lng: 5.3037,
    neighbourhoods: ["Binnenstad", "Rosmalen", "Empel", "De Groote Wielen", "Zuid"],
    nearby: ["zaltbommel", "waardenburg", "wijchen", "tiel"],
    intro:
      "'s-Hertogenbosch ligt op ongeveer 40 minuten rijden via de A2. Wij komen er voor geplande slotvervanging, beveiligingsadvies en spoed wanneer wij die kant op kunnen.",
    localNote:
      "De Bossche binnenstad heeft panden met kelders en souterrains die op de straat uitkomen, een erfenis van de historische bebouwing. Die keldertoegangen liggen laag, uit het zicht, en zitten vaak nog op het oorspronkelijke slotwerk. Bij een beveiligingsscan in het centrum nemen wij die toegangen expliciet mee — ze worden anders stelselmatig overgeslagen.",
  },
];

export const getCity = (slug: string): City | undefined =>
  cities.find((c) => c.slug === slug);

/** Resolve `nearby` slugs to full city records, skipping any dangling slug. */
export const getNearbyCities = (city: City): City[] =>
  city.nearby.map(getCity).filter((c): c is City => Boolean(c));
