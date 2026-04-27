import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          fontSize: 92,
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
    { ...size }
  );
}
