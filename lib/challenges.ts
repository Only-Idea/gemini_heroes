import type { DifficultyLevel } from '@/components/ui/DifficultyBadge';

export interface ChallengeDef {
  id: 'fuji' | 'ronin' | 'rail';
  image: string;
  color: 'teal' | 'amber' | 'coral';
  distanceKm: number;
  days: number;
  difficulty: DifficultyLevel;
  href: string;
  /** Current selling price in JPY — surfaced as Product JSON-LD offers.price. */
  priceJPY: number;
  /** List/regular price in JPY before any discount. Used as offers.priceSpecification.price. */
  listPriceJPY: number;
  /** Schema.org availability — flip to OutOfStock / PreOrder as needed. */
  availability:
    | 'InStock'
    | 'OutOfStock'
    | 'PreOrder'
    | 'BackOrder'
    | 'Discontinued';
}

// All three challenges currently share the same pricing: ¥5,000 list, ¥4,500
// after the launch discount. Update individual entries if SKUs diverge.
const PRICE = 4500;
const LIST_PRICE = 5000;

export const CHALLENGES: ChallengeDef[] = [
  {
    id: 'fuji',
    image: '/images/cards/fuji.png',
    color: 'teal',
    distanceKm: 74,
    days: 60,
    difficulty: 'Easy',
    href: 'https://shop.medalhero.com/products/%E5%AF%8C%E5%A3%AB%E5%B1%B1?variant=52923670102323',
    priceJPY: PRICE,
    listPriceJPY: LIST_PRICE,
    availability: 'InStock',
  },
  {
    id: 'ronin',
    image: '/images/cards/ronin.png',
    color: 'amber',
    distanceKm: 1404,
    days: 270,
    difficulty: 'Moderate',
    href: 'https://shop.medalhero.com/products/%E5%9B%9B%E5%8D%81%E4%B8%83%E5%A3%AB?variant=52923979497779',
    priceJPY: PRICE,
    listPriceJPY: LIST_PRICE,
    availability: 'InStock',
  },
  {
    id: 'rail',
    image: '/images/cards/rail.png',
    color: 'coral',
    distanceKm: 3170,
    days: 365,
    difficulty: 'Epic',
    href: 'https://shop.medalhero.com/products/%E9%89%84%E9%81%93%E6%97%85%E8%B7%AF?variant=52924006400307',
    priceJPY: PRICE,
    listPriceJPY: LIST_PRICE,
    availability: 'InStock',
  },
];
