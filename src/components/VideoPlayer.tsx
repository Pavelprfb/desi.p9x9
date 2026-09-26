'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  poster: string;
  title: string;
  description: string;
}

export default function VideoPlayer({ src, poster, title, description }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => setPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    }
  }, [playing]);

  return (
    <div
      className="video-player-container"
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: 18,
        overflow: 'hidden',
        background: '#000',
        boxShadow: '0 18px 45px var(--shadow), 0 0 30px rgba(77, 163, 255, 0.18)',
        border: '2px solid var(--border)',
        transition: 'box-shadow 0.4s, border-color 0.4s',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.boxShadow = '0 22px 55px var(--shadow), 0 0 40px rgba(77, 163, 255, 0.35)';
        target.style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.boxShadow = '0 18px 45px var(--shadow), 0 0 30px rgba(77, 163, 255, 0.18)';
        target.style.borderColor = 'var(--border)';
      }}
    >
      <video
        ref={videoRef}
        id="mainVideo"
        controls
        preload="auto"
        playsInline
        poster={poster}
        aria-label={title}
        data-playing={playing}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          cursor: 'pointer',
          background: '#000',
        }}
        onClick={togglePlayback}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        className="description"
        style={{
          textAlign: 'center',
          background: 'linear-gradient(90deg, #ff8f00, #ffc107)',
        }}
      >
        <p style={{
          background: 'transparent',
          color: '#1a1a1a',
          fontWeight: 600,
          padding: '10px',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        }}>
          <i className="fa-solid fa-circle-info" aria-hidden="true" style={{ marginRight: 8 }} />
          {description}
        </p>
      </div>

      <div
        ref={buttonRef}
        className="center-play-button"
        id="centerPlayButton"
        aria-label="Play or pause video"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 80,
          height: 80,
          background: 'rgba(0, 0, 0, 0.65)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: playing ? 0 : 1,
          transition: 'all 0.3s ease',
          zIndex: 10,
          border: '3px solid rgba(255, 255, 255, 0.85)',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
        }}
        onClick={(e) => {
          e.stopPropagation();
          togglePlayback();
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.background = 'rgba(0, 0, 0, 0.9)';
          target.style.borderColor = 'var(--accent)';
          target.style.transform = 'translate(-50%, -50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.background = 'rgba(0, 0, 0, 0.65)';
          target.style.borderColor = 'rgba(255, 255, 255, 0.85)';
          target.style.transform = 'translate(-50%, -50%)';
        }}
      >
        <i
          ref={iconRef}
          id="centerPlayIcon"
          aria-hidden="true"
          className={playing ? 'fa-solid fa-pause' : 'fa-solid fa-play'}
          style={{
            fontSize: 34,
            color: '#fff',
            marginLeft: 5,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
          }}
        />
      </div>

      <style jsx>{`
        .video-player-container:hover .center-play-button,
        video:not([data-playing="true"]) + .center-play-button {
          opacity: 1;
        }
        video[data-playing="true"] + .center-play-button {
          opacity: 0;
        }
        .video-player-container:hover video[data-playing="true"] + .center-play-button {
          opacity: 1;
        }
        .center-play-button i {
          font-size: 34px;
          color: #fff;
          margin-left: 5px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
}