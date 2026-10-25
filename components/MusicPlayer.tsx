"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from "react";

type MusicContextType = {
  playMusic: () => Promise<void>;
  pauseMusic: () => void;
  toggleMusic: () => void;
  isPlaying: boolean;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({
  children,
}: {
  children: ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = async () => {
    if (!audioRef.current) return;

    try {
      audioRef.current.volume = 0;

      await audioRef.current.play();

      let volume = 0;

      const fade = setInterval(() => {
        if (!audioRef.current) {
          clearInterval(fade);
          return;
        }

        volume += 0.05;

        audioRef.current.volume = Math.min(volume, 0.4);

        if (volume >= 0.4) {
          clearInterval(fade);
        }
      }, 180);

      setIsPlaying(true);
    } catch (err) {
      console.log(err);
    }
  };

  const pauseMusic = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  return (
    <MusicContext.Provider
      value={{
        playMusic,
        pauseMusic,
        toggleMusic,
        isPlaying,
      }}
    >
      {children}

      <audio
        ref={audioRef}
        src="/audio/vedaMilan.mp3"
        preload="auto"
        loop
      />
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);

  if (!ctx) {
    throw new Error("useMusic must be inside MusicProvider");
  }

  return ctx;
}