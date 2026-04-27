import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const alt = 'Heroes — Virtual Challenges Across Japan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#0F1114',
          color: '#FFFFFF',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(55,94,101,0.55) 0%, rgba(236,122,92,0.25) 55%, rgba(15,17,20,0) 75%)',
            filter: 'blur(40px)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -180,
            left: -180,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236,122,92,0.45) 0%, rgba(55,94,101,0.15) 60%, rgba(15,17,20,0) 80%)',
            filter: 'blur(50px)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#9DBDC2',
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background:
                'linear-gradient(135deg, #375E65 0%, #EC7A5C 100%)',
              display: 'flex',
            }}
          />
          Heroes · Virtual Challenges
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
              backgroundImage:
                'linear-gradient(120deg, #FFFFFF 0%, #F4D9C4 60%, #EC7A5C 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            {t('ogTitle')}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.75)',
              maxWidth: 900,
              display: 'flex',
            }}
          >
            {t('ogDescription')}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 20,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: 1.5,
          }}
        >
          <div style={{ display: 'flex' }}>medalhero.com</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ display: 'flex' }}>iOS</span>
            <span style={{ display: 'flex' }}>·</span>
            <span style={{ display: 'flex' }}>Android</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
