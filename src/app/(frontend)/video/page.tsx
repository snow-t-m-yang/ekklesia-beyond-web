'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useVideoContext } from '@/contexts/VideoContext';

export default function VideoListPage() {
  const { videos, loading, error, selectedVideo, setSelectedVideo } = useVideoContext();
  const router = useRouter();

  useEffect(() => {
    if (selectedVideo) {
      router.push(
        `/video/${selectedVideo.id}?title=${encodeURIComponent(selectedVideo.title)}&description=${encodeURIComponent(selectedVideo.description)}`,
        undefined,
      );
    }
  }, [selectedVideo, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load videos. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 pt-36">
      <h1 className="text-3xl font-bold mb-6">彼岸在線</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div
            onClick={() => setSelectedVideo(video)}
            key={video.id}
            className="bg-white/70 backdrop-blur-md rounded-xl shadow hover:scale-105 transition-transform cursor-pointer overflow-hidden"
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={320}
              height={180}
              className="w-full h-auto object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-600">
                {new Date(video.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
