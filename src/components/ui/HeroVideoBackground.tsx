"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface HeroVideoBackgroundProps {
  sources: readonly string[];
  poster: string;
}

export function HeroVideoBackground({ sources, poster }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const activeSrc = sources[sourceIndex] ?? poster;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const play = async () => {
      try {
        video.currentTime = 0;
        await video.play();
      } catch {
        /* autoplay blocked */
      }
    };

    play();
  }, [activeSrc, reducedMotion]);

  const handleError = () => {
    setReady(false);
    if (sourceIndex < sources.length - 1) {
      setSourceIndex((i) => i + 1);
    }
  };

  if (reducedMotion) {
    return (
      <div className="absolute inset-0">
        <Image src={poster} alt="" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-[#050505]/50" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Image
        src={poster}
        alt=""
        fill
        priority
        className={`object-cover object-center transition-opacity duration-1000 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
        sizes="100vw"
        aria-hidden
      />

      <video
        ref={videoRef}
        key={activeSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
        onError={handleError}
        className={`absolute inset-0 h-full w-full object-cover object-center scale-105 transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={activeSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-[#050505]/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.45)_100%)]" />
    </div>
  );
}
