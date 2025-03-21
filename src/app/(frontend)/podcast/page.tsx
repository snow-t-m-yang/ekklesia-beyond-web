'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Repeat, Shuffle } from 'lucide-react';
import Image from 'next/image';

const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY!;
const PLAYLIST_ID = 'PLsRB1CeLy8Fb3XBZl7jyj979X30nsJvlL';

interface YouTubeItem {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  videoId: string;
  publishedAt: string;
}

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<YouTubeItem[]>([]);
  const [current, setCurrent] = useState<YouTubeItem | null>(null);
  const [index, setIndex] = useState(0);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const next = () => {
    setIndex((prev) => {
      let nextIndex = shuffle ? Math.floor(Math.random() * episodes.length) : prev + 1;
      if (nextIndex >= episodes.length) nextIndex = loop ? 0 : episodes.length - 1;
      return nextIndex;
    });
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? (loop ? episodes.length - 1 : 0) : prev - 1));
  };

  const fetchPlaylist = async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}`,
    );
    const data = await res.json();
    const items = data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      videoId: item.snippet.resourceId.videoId,
      publishedAt: item.snippet.publishedAt,
    }));
    setEpisodes(items);
    setCurrent(items[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  useEffect(() => {
    if (episodes.length > 0) {
      setIsVideoLoading(true);
      const newCurrent = episodes[index];
      setCurrent(newCurrent);

      const iframe = document.getElementById('ytplayer') as HTMLIFrameElement | null;
      if (!iframe) return;

      const playVideo = () => {
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
          '*',
        );
        setIsPlaying(true);
        setIsVideoLoading(false);
      };

      const checkReadyAndPlay = () => {
        let attempts = 0;
        const interval = setInterval(() => {
          if (attempts >= 10) {
            clearInterval(interval);
            return;
          }

          iframe.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), '*');

          iframe.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
            '*',
          );

          setIsPlaying(true);
          setIsVideoLoading(false);
          clearInterval(interval);
          attempts++;
        }, 300);
      };

      // Wait for iframe src update
      setTimeout(checkReadyAndPlay, 300);

      const progressInterval = setInterval(() => {
        const iframe = document.getElementById('ytplayer') as HTMLIFrameElement | null;
        if (!iframe) return;
        iframe.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), '*');
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'getCurrentTime',
            args: [],
          }),
          '*',
        );
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'getDuration',
            args: [],
          }),
          '*',
        );
      }, 1000);

      const handleMessage = (event: MessageEvent) => {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data.info && typeof data.info === 'number') {
          if (data.event === 'infoDelivery' && data.info !== undefined) {
            if (data.info > 0 && data.info < 100000) setProgress(data.info);
            if (data.info > 100000) setDuration(data.info);
          }
        }
      };

      window.addEventListener('message', handleMessage);

      return () => {
        clearInterval(progressInterval);
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [index, episodes]);

  return (
    <>
      {(isLoading || isVideoLoading) && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
      <div className="relative pb-40 md:pt-40 pt-16 max-w-4xl mx-auto">
        {current && (
          <div className="fixed inset-0 -z-10">
            <iframe
              id="ytplayer-bg"
              className="w-full h-full opacity-40"
              src={`https://www.youtube.com/embed/${current?.videoId}?autoplay=0&controls=0&loop=1&playlist=${current?.videoId}&enablejsapi=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        )}

        <motion.h1
          className="text-3xl font-bold mb-6 px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          播客選集
        </motion.h1>

        <div className="grid gap-4 px-4">
          {episodes.map((ep, i) => (
            <motion.div
              key={ep.id}
              className={`flex gap-4 p-4 rounded-xl bg-white/30 backdrop-blur-3xl shadow-md cursor-pointer ${
                i === index ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setIndex(i)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src={ep.thumbnail}
                alt={ep.title}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-lg font-semibold text-gray-900">{ep.title}</h2>
                <p className="text-sm text-gray-900">
                  {new Date(ep.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Player */}
        {current && (
          <div className="fixed bottom-4 w-full left-0 flex justify-center">
            <motion.div
              className="w-[640px] bg-white/30 backdrop-blur-3xl text-black flex gap-2 px-6 py-4 shadow-lg z-50 rounded-full"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex flex-col gap-2">
                {/* FIXME */}
                {/* <input
                  type="range"
                  min={0}
                  max={duration}
                  value={progress}
                  onChange={(e) => {
                    const iframe = document.getElementById('ytplayer') as HTMLIFrameElement;
                    iframe?.contentWindow?.postMessage(
                      JSON.stringify({
                        event: 'command',
                        func: 'seekTo',
                        args: [parseFloat(e.target.value), true],
                      }),
                      '*',
                    );
                    setProgress(parseFloat(e.target.value));
                  }}
                  className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"
                /> */}
                <div className="flex items-center gap-4 overflow-auto w-52">
                  <h3 className="text-base font-bold whitespace-nowrap animate-marquee">
                    {current.title}
                  </h3>
                </div>
              </div>
              <div className="flex gap-4 items-center justify-center w-full">
                <button onClick={prev}>
                  <SkipBack size={26} />
                </button>
                <button
                  onClick={() => {
                    const iframe = document.getElementById('ytplayer') as HTMLIFrameElement;
                    if (!iframe) return;
                    const command = isPlaying ? 'pauseVideo' : 'playVideo';
                    iframe.contentWindow?.postMessage(
                      JSON.stringify({ event: 'command', func: command, args: [] }),
                      '*',
                    );
                    setIsPlaying(!isPlaying);
                  }}
                >
                  {isPlaying ? <Pause size={30} /> : <Play size={30} />}
                </button>
                <button onClick={next}>
                  <SkipForward size={26} />
                </button>
                <button onClick={() => setLoop(!loop)}>
                  <Repeat size={26} className={loop ? 'text-blue-600' : ''} />
                </button>
                <button onClick={() => setShuffle(!shuffle)}>
                  <Shuffle size={26} className={shuffle ? 'text-blue-600' : ''} />
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* YouTube Player Embed */}
        {current && (
          <div className="fixed inset-0 -z-10">
            <iframe
              id="ytplayer"
              className="w-full h-full opacity-40"
              src={`https://www.youtube.com/embed/${current.videoId}?autoplay=0&controls=0&loop=1&playlist=${current.videoId}&enablejsapi=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </>
  );
}
