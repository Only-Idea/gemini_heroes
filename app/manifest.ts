import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Heroes — Virtual Challenges Across Japan',
    short_name: 'Heroes',
    description: 'Purpose-built virtual challenges across Japan. Every finish delivers a premium medal and plants a tree.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F1114',
    theme_color: '#375E65',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
