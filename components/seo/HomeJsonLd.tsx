import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/ui/JsonLd';
import { SITE_URL, localeUrl } from '@/lib/site';
import { STORE_LINKS } from '@/lib/storeLinks';
import { CHALLENGES } from '@/lib/challenges';

interface Props {
  locale: string;
}

export default async function HomeJsonLd({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const tChallenges = await getTranslations({ locale, namespace: 'challenges' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const homeUrl = localeUrl(locale);
  const inLanguage = locale === 'ja' ? 'ja-JP' : 'en-US';

  const mobileApp = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    'name': 'Heroes',
    'description': t('description'),
    'operatingSystem': ['iOS', 'Android'],
    'applicationCategory': 'HealthApplication',
    'inLanguage': ['en', 'ja'],
    'image': `${SITE_URL}/images/logo/logo.png`,
    'downloadUrl': [STORE_LINKS.apple, STORE_LINKS.google],
    'installUrl': [STORE_LINKS.apple, STORE_LINKS.google],
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': homeUrl,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': tNav('challenges'),
        'item': `${homeUrl}#challenges`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': tNav('features'),
        'item': `${homeUrl}#features`,
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': tNav('impact'),
        'item': `${homeUrl}#impact`,
      },
    ],
  };

  // Prices are pinned in lib/challenges.ts — keep in sync with the live
  // Shopify variants linked by `href`. Currency is JPY since the shop is
  // Japan-domiciled; Google reads `priceCurrency` for region targeting.
  const products = CHALLENGES.map((c) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': `${tChallenges(`${c.id}.title`)} — ${tCommon('unit_mai') ?? 'Medal'}`,
    'description': tChallenges(`${c.id}.subtitle`),
    'image': `${SITE_URL}${c.image}`,
    'url': c.href,
    'brand': { '@type': 'Brand', 'name': 'Heroes' },
    'category': 'Sports Medal',
    'inLanguage': inLanguage,
    'offers': {
      '@type': 'Offer',
      'url': c.href,
      'price': c.priceJPY.toString(),
      'priceCurrency': 'JPY',
      'availability': `https://schema.org/${c.availability}`,
      'itemCondition': 'https://schema.org/NewCondition',
      'seller': { '@type': 'Organization', 'name': 'Heroes' },
      // List price surfaced separately so Google can render the strike-through
      // sale-price rich result when priceJPY < listPriceJPY.
      ...(c.listPriceJPY > c.priceJPY && {
        'priceSpecification': {
          '@type': 'UnitPriceSpecification',
          'priceType': 'https://schema.org/ListPrice',
          'price': c.listPriceJPY.toString(),
          'priceCurrency': 'JPY',
        },
      }),
    },
  }));

  return (
    <>
      <JsonLd data={mobileApp} />
      <JsonLd data={breadcrumb} />
      {products.map((p, i) => (
        <JsonLd key={`product-${i}`} data={p} />
      ))}
    </>
  );
}
