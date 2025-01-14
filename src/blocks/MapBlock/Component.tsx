import type { MapBlock } from '@/payload-types';

export default async function MapBlock({ place, googleMapEmbedLink }: MapBlock) {
  return (
    <iframe
      src={googleMapEmbedLink}
      width="600"
      height="450"
      style={{ border: 0 }}
      loading="lazy"
    ></iframe>
  );
}
