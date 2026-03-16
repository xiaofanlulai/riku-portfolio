"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
};

export default function WorkVideoPlayer({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleEnded = () => {
    setPlaying(false);
  };

  return (
    <div className="relative w-full bg-black/40 border border-white/10 overflow-hidden mt-5">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={playing}
        onPause={handlePause}
        onEnded={handleEnded}
        playsInline
        className="w-full block"
      />
      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center group"
          aria-label="動画を再生"
        >
          <span className="w-16 h-16 rounded-full bg-white/10 border border-white/25 flex items-center justify-center group-hover:bg-[#e55329] group-hover:border-[#e55329] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white translate-x-0.5">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
