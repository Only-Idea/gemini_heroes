import { ImageResponse } from 'next/og';

export function generateImageMetadata() {
  return [
    { id: '192', size: { width: 192, height: 192 }, contentType: 'image/png' },
    { id: '512', size: { width: 512, height: 512 }, contentType: 'image/png' },
  ];
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const iconId = await id;
  const dimension = iconId === '512' ? 512 : 192;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0F1114',
          color: '#FFFFFF',
          fontWeight: 800,
          letterSpacing: -2,
          fontSize: dimension * 0.46,
          backgroundImage:
            'radial-gradient(circle at 30% 30%, rgba(55,94,101,0.7) 0%, rgba(15,17,20,1) 70%), radial-gradient(circle at 70% 70%, rgba(236,122,92,0.55) 0%, rgba(15,17,20,0) 60%)',
        }}
      >
        <span
          style={{
            display: 'flex',
            backgroundImage:
              'linear-gradient(135deg, #FFFFFF 0%, #F4D9C4 60%, #EC7A5C 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          H
        </span>
      </div>
    ),
    { width: dimension, height: dimension }
  );
}
