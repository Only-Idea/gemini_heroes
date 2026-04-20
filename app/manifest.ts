import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Heroes — The Virtual Odyssey',
    short_name: 'Heroes',
    description: 'Transform every step into a journey through Japan.',
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
