"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    try {
      if (video.paused) {
        await video.play();
      }
      setReady(true);
    } catch {
      /* autoplay blocked until user interacts */
    }
  }, [reducedMotion]);

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

    const markReady = () => setReady(true);
    const events = ["loadeddata", "loadedmetadata", "canplay", "playing"] as const;

    events.forEach((event) => video.addEventListener(event, markReady));
    video.addEventListener("playing", tryPlay);

    void tryPlay();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void tryPlay();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    const onVisible = () => {
      if (document.visibilityState === "visible") void tryPlay();
    };

    const onPageShow = () => void tryPlay();
    const onTouch = () => void tryPlay();

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("touchstart", onTouch, { once: true, passive: true });
    window.addEventListener("click", onTouch, { once: true });

    return () => {
      events.forEach((event) => video.removeEventListener(event, markReady));
      video.removeEventListener("playing", tryPlay);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("click", onTouch);
    };
  }, [activeSrc, reducedMotion, tryPlay]);

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
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={poster}
        alt=""
        fill
        priority
        className={`object-cover object-center transition-opacity duration-700 ${
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
        disablePictureInPicture
        onLoadedData={() => setReady(true)}
        onCanPlay={() => void tryPlay()}
        onPlaying={() => setReady(true)}
        onError={handleError}
        className={`hero-video transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <source src={activeSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-[#050505]/45 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.45)_100%)] pointer-events-none" />
    </div>
  );
}
