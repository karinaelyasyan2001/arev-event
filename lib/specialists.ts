export type Specialist = {
  id: string;
  name: string;
  service: string;
  city: string;
  price: string;
  rating: string;
  reviews: number;
  emoji: string;
  verified: boolean;
  description: string;
  tags: string[];
  portfolio: {
    title: string;
    emoji: string;
  }[];
};

export const specialists: Specialist[] = [
  {
    id: "anna-photo",
    name: "Աննա Մարտիրոսյան",
    service: "Լուսանկարիչ",
    city: "Երևան",
    price: "120,000 ֏",
    rating: "5.0",
    reviews: 42,
    emoji: "📸",
    verified: true,
    description:
      "Միջոցառումների և հարսանիքների լուսանկարիչ։ Ստեղծում եմ բնական, ջերմ և հիշվող կադրեր՝ ուշադրություն դարձնելով յուրաքանչյուր մանրուքի։",
    tags: ["Հարսանիք", "Portrait", "Event", "Love Story"],
    portfolio: [
      { title: "Հարսանեկան պատմություն", emoji: "💍" },
      { title: "Elegant Wedding", emoji: "✨" },
      { title: "Golden Hour", emoji: "🌅" },
      { title: "Evening Event", emoji: "🥂" },
      { title: "Romantic Moment", emoji: "❤️" },
      { title: "Birthday Celebration", emoji: "🎉" },
    ],
  },

  {
    id: "david-video",
    name: "Դավիթ Գրիգորյան",
    service: "Վիդեոգրաֆ",
    city: "Երևան",
    price: "180,000 ֏",
    rating: "4.9",
    reviews: 35,
    emoji: "🎥",
    verified: true,
    description:
      "Միջոցառումների վիդեոգրաֆ, որը ձեր կարևոր պահերը վերածում է գեղեցիկ պատմության։",
    tags: ["Wedding Film", "Event", "Highlight", "4K"],
    portfolio: [
      { title: "Wedding Film", emoji: "💍" },
      { title: "Wedding Highlight", emoji: "🎬" },
      { title: "Love Story", emoji: "❤️" },
      { title: "Event Video", emoji: "🎥" },
      { title: "Golden Moments", emoji: "✨" },
      { title: "Celebration", emoji: "🥂" },
    ],
  },

  {
    id: "arm-host",
    name: "Արման Սարգսյան",
    service: "Հաղորդավար",
    city: "Երևան",
    price: "150,000 ֏",
    rating: "4.9",
    reviews: 51,
    emoji: "🎤",
    verified: true,
    description:
      "Պրոֆեսիոնալ հաղորդավար՝ հարսանիքների, կորպորատիվների և տարբեր միջոցառումների համար։",
    tags: ["Wedding", "Corporate", "Party", "Show"],
    portfolio: [
      { title: "Wedding Show", emoji: "💍" },
      { title: "Corporate Event", emoji: "🏢" },
      { title: "Birthday Party", emoji: "🎂" },
      { title: "Live Show", emoji: "🎤" },
      { title: "Party Night", emoji: "🎉" },
      { title: "Special Event", emoji: "✨" },
    ],
  },

  {
    id: "dj-mika",
    name: "DJ Mika",
    service: "DJ",
    city: "Երևան",
    price: "100,000 ֏",
    rating: "4.8",
    reviews: 29,
    emoji: "🎧",
    verified: true,
    description:
      "Ժամանակակից երաժշտություն, բարձրակարգ ձայնային լուծումներ և ճիշտ երաժշտական տրամադրություն ամբողջ երեկոյի ընթացքում։",
    tags: ["DJ", "Music", "Party", "Wedding"],
    portfolio: [
      { title: "Wedding Party", emoji: "💍" },
      { title: "Dance Night", emoji: "🕺" },
      { title: "DJ Set", emoji: "🎧" },
      { title: "Party", emoji: "🎉" },
      { title: "Night Event", emoji: "🌙" },
      { title: "Music Experience", emoji: "🎵" },
    ],
  },

  {
    id: "lilit-decor",
    name: "Լիլիթ Decor",
    service: "Դեկորացիա",
    city: "Երևան",
    price: "200,000 ֏",
    rating: "5.0",
    reviews: 37,
    emoji: "🌸",
    verified: true,
    description:
      "Միջոցառումների դիզայն և դեկորացիա՝ անհատական կոնցեպտով և մանրուքների նկատմամբ հատուկ ուշադրությամբ։",
    tags: ["Decor", "Wedding", "Flowers", "Design"],
    portfolio: [
      { title: "Wedding Decor", emoji: "💍" },
      { title: "Floral Design", emoji: "🌸" },
      { title: "Elegant Setup", emoji: "✨" },
      { title: "Romantic Decor", emoji: "❤️" },
      { title: "Table Design", emoji: "🥂" },
      { title: "Event Concept", emoji: "🎨" },
    ],
  },

  {
    id: "aria-band",
    name: "Aria Band",
    service: "Երաժշտական խումբ",
    city: "Երևան",
    price: "250,000 ֏",
    rating: "4.9",
    reviews: 24,
    emoji: "🎵",
    verified: true,
    description:
      "Կենդանի երաժշտություն հարսանիքների, երեկույթների և կորպորատիվ միջոցառումների համար։",
    tags: ["Live Music", "Wedding", "Party", "Corporate"],
    portfolio: [
      { title: "Live Wedding", emoji: "💍" },
      { title: "Concert Night", emoji: "🎤" },
      { title: "Party Performance", emoji: "🎉" },
      { title: "Corporate Event", emoji: "🏢" },
      { title: "Live Band", emoji: "🎸" },
      { title: "Music Night", emoji: "🎵" },
    ],
  },

  {
    id: "mari-makeup",
    name: "Մարի Հովհաննիսյան",
    service: "Դիմահարդարում",
    city: "Երևան",
    price: "35,000 ֏",
    rating: "5.0",
    reviews: 63,
    emoji: "💄",
    verified: true,
    description:
      "Պրոֆեսիոնալ դիմահարդարում՝ բնական, երեկոյան և հարսանեկան look-երի համար։",
    tags: ["Makeup", "Bride", "Beauty", "Event"],
    portfolio: [
      { title: "Bridal Makeup", emoji: "👰" },
      { title: "Natural Look", emoji: "✨" },
      { title: "Evening Makeup", emoji: "💄" },
      { title: "Beauty Look", emoji: "💋" },
      { title: "Elegant Style", emoji: "🌸" },
      { title: "Event Makeup", emoji: "🥂" },
    ],
  },

  {
    id: "flora-studio",
    name: "Flora Studio",
    service: "Ծաղիկներ",
    city: "Երևան",
    price: "50,000 ֏",
    rating: "4.9",
    reviews: 31,
    emoji: "💐",
    verified: true,
    description:
      "Ծաղկային ձևավորում և կոմպոզիցիաներ՝ ձեր միջոցառման ոճին համապատասխան։",
    tags: ["Flowers", "Wedding", "Bouquet", "Decor"],
    portfolio: [
      { title: "Wedding Bouquet", emoji: "💐" },
      { title: "Floral Arch", emoji: "🌸" },
      { title: "Table Flowers", emoji: "🌷" },
      { title: "Romantic Flowers", emoji: "🌹" },
      { title: "Event Decor", emoji: "✨" },
      { title: "Special Bouquet", emoji: "💐" },
    ],
  },
];