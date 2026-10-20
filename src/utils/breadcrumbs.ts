// src/utils/breadcrumbs.ts
// Breadcrumb per i dati strutturati (BreadcrumbList), generati dal percorso della pagina.
// Esempio: /thailand-liveaboards/pawara/ -> Home › Liveaboards › MV Pawara

const LABELS: Record<string, string> = {
  // Sezioni
  'thailand-liveaboards': 'Liveaboards',
  'thailand-yachts': 'Yachts',
  'padi-scuba-diving-courses': 'PADI Courses',
  'day-trip-phuket': 'Day Trips',
  'tour': 'Island Tours',
  'liveaboard-itinerary-thailand': 'Itineraries',
  'dive-sites-thailand': 'Dive Sites',
  'last-minute': 'Last Minute Deals',
  'contact': 'Contact',
  'idea': 'Ideas',
  'terms-and-conditions': 'Terms and Conditions',
  'privacy-policy': 'Privacy Policy',

  // Liveaboard
  'deep-andaman-queen': 'Deep Andaman Queen',
  'giamani': 'MV Giamani',
  'pawara': 'MV Pawara',
  'sawasdee-fasai': 'MV Sawasdee Fasai',
  'thailand-master': 'Thailand Master',
  'the-junk': 'The Junk',

  // Yacht
  'song-of-songs': 'Song of Songs',
  'aventure': 'Aventure',
  'maha-bhetra': 'Maha Bhetra',
  'seascape-2': 'Seascape 2',
  'jawsss': 'JAWSSS',
  'galeon-500-fly': 'Galeon 500 Fly',
  'mami-wata': 'Mami Wata',
  'nimbus-t11': 'Nimbus T11',

  // Corsi PADI
  'padi-discover-scuba-diving': 'Discover Scuba Diving',
  'padi-open-water-diver': 'Open Water Diver',
  'padi-advanced-open-water-diver': 'Advanced Open Water Diver',
  'padi-rescue-diver': 'Rescue Diver',

  // Day trip e tour
  'day-trip-similan': 'Similan & Richelieu Rock Day Trip',
  'phi-phi-islands-tour-from-phuket': 'Phi Phi Islands Tour',
  'james-bond-island-tour-from-phuket': 'James Bond Island Tour',
  'krabi-4-islands-tour-from-phuket': 'Krabi 4 Islands Tour',
  'similan-islands-tour-from-phuket': 'Similan Islands Tour',
  'surin-islands-tour-from-phuket': 'Surin Islands Tour',
  'koh-rok-koh-haa-tour-from-phuket': 'Koh Rok & Koh Haa Tour',
  'koh-kradan-tour-from-phuket': 'Koh Kradan Tour',
};

// Etichetta di riserva: "seascape-2" -> "Seascape 2"
const fallbackLabel = (segment: string) =>
  segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/** Dati strutturati BreadcrumbList; null per la homepage. */
export function breadcrumbSchema(pathname: string, site: URL | undefined) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const items = [{ name: 'Home', path: '/' }];
  segments.forEach((segment, index) => {
    items.push({
      name: LABELS[segment] ?? fallbackLabel(segment),
      path: `/${segments.slice(0, index + 1).join('/')}/`,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site).href,
    })),
  };
}
