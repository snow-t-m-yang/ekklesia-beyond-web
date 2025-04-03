'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useVideoContext } from '@/contexts/VideoContext';

export default function VideoDetailPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { setSelectedVideo } = useVideoContext();

  if (!id || typeof id !== 'string') return null;

  const videoTitle = decodeURIComponent(searchParams.get('title') || 'Default Video Title'); // Fallback title

  return (
    <section aria-labelledby="video-detail-heading" className="pt-20">
      <h2 id="video-detail-heading" className="sr-only">
        影片詳情
      </h2>
      <div lang="zh-Hant" className="max-w-4xl mx-auto p-4 pt-20">
        <Link
          href="/video"
          onClick={() => {
            setSelectedVideo(null);
            window.history.back();
          }}
          className="mb-4 flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-1" size={18} /> 上一頁
        </Link>

        <div className="aspect-video w-full mb-4 rounded-lg shadow-lg overflow-hidden border border-gray-300">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <h3 className="text-xl font-semibold mb-2">{videoTitle}</h3>
      </div>
    </section>
  );
}
