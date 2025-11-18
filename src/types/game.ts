export interface Game {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  platform: string[];
  rating: number;
  reviews: number;
  releaseDate: string;
  publisher: string;
  developer: string;
  features: string[];
  systemRequirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  tags: string[];
}

export interface CartItem extends Game {
  quantity: number;
}

export const categories = [
  'Action',
  'Adventure',
  'RPG',
  'Strategy',
  'Sports',
  'Racing',
  'Simulation',
  'Indie',
  'Multiplayer',
];

export const platforms = [
  'Windows',
  'PlayStation',
  'Xbox',
  'Nintendo Switch',
  'Mac',
  'Linux',
];
