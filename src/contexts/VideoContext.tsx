'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY!;
const PLAYLIST_ID = 'PLf6u6NxbG95vdfZdTfqZrvSrORBk635Pd';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

interface VideoContextType {
  videos: YouTubeVideo[];
  loading: boolean;
  error: boolean;
  selectedVideo: YouTubeVideo | null;
  setSelectedVideo: (video: YouTubeVideo | null) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${PLAYLIST_ID}&part=snippet&maxResults=20`,
        );
        const data = await res.json();
        const items = data.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url,
          publishedAt: item.snippet.publishedAt,
        }));
        setVideos(items);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <VideoContext.Provider value={{ videos, loading, error, selectedVideo, setSelectedVideo }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideoContext() {
  const context = useContext(VideoContext);
  if (!context) throw new Error('useVideoContext must be used within a VideoProvider');
  return context;
}
