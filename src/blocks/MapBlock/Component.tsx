import type { MapBlock } from '@/payload-types';

export default async function MapBlock({ place, googleMapEmbedLink }: MapBlock) {
  return (
    <section className="container h-96">
      <iframe
        src={googleMapEmbedLink}
        className="rounded-3xl w-full h-full border-0 shadow-xl"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </section>
  );
}
