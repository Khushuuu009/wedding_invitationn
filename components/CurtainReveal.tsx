"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMusic } from "@/components/MusicPlayer";

interface Props {
  onOpen: () => void;
}

type Step = "intro" | "closed" | "half" | "opening" | "done";

type Particle = {
  left: number;
  top: number;
  duration: number;
  delay: number;
};

// All image paths live here. Change them in one place only.
const ASSETS = {
  intro: "/curtains/wedding-theme.webp",
  closed: "/curtains/closed.png",
  half: "/curtains/half.png",
  left: "/curtains/left.webp",
  right: "/curtains/right.webp",
  top: "/curtains/top.webp",
};

// Image that hides itself if the file is missing (no broken-image icon)
function SafeImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      draggable={false}
      {...props}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

export default function CurtainReveal({ onOpen }: Props) {
  const [step, setStep] = useState<Step>("intro");
  const [ready, setReady] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const { playMusic } = useMusic();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const started = useRef(false);

  // Random particles only on the client (avoids hydration mismatch)
  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  // Preload every image, then reveal the intro (6s safety fallback)
  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) setReady(true);
    };

    const loads = Object.values(ASSETS).map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // never block on a missing file
          img.src = src;
        })
    );

    Promise.all(loads).then(finish);
    const fallback = setTimeout(finish, 6000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, []);

  // Lock page scroll while the curtain is visible
  useEffect(() => {
    if (step === "done") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [step]);

  // Clear timers on unmount
  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const startOpening = useCallback(() => {
    if (started.current) return; // ignore double taps
    started.current = true;

    // Start music inside the tap (needed for autoplay rules),
    // but never wait for it or let it break the animation.
    try {
      Promise.resolve(playMusic()).catch(() => {});
    } catch {
      /* ignore */
    }

    setStep("closed");

    timers.current.push(setTimeout(() => setStep("half"), 700));
    timers.current.push(setTimeout(() => setStep("opening"), 1200));
    timers.current.push(
      setTimeout(() => {
        setStep("done");
        onOpen();
      }, 4300)
    );
  }, [onOpen, playMusic]);

  return (
    <AnimatePresence>
      {step !== "done" && (
        <motion.div
          key="curtain-root"
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#f8f1e6]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* ================= LOADING (no image) ================= */}
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-3 w-3 rounded-full bg-[#d7b46a]"
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              />
            </div>
          )}

          {/* ================= CLOSED CURTAIN ================= */}
          {step === "closed" && (
            <motion.div
              key="closed"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SafeImg
                src={ASSETS.closed}
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}

          {/* ================= HALF CURTAIN ================= */}
          {step === "half" && (
            <motion.div
              key="half"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SafeImg
                src={ASSETS.half}
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}

          {/* ================= OPENING ================= */}
          {step === "opening" && (
            <motion.div
              key="opening"
              className="absolute inset-0 overflow-hidden bg-[#f8f1e6]"
              initial={{ opacity: 1 }}
            >
              {/* Golden Light */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4 }}
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,248,220,.95) 0%, rgba(255,240,200,.55) 30%, rgba(255,255,255,0) 70%)",
                }}
              />

              {/* Light Rays */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1.5 }}
                style={{
                  background:
                    "repeating-conic-gradient(from 180deg at 50% 50%, rgba(255,230,170,.25) 0deg 8deg, transparent 8deg 18deg)",
                  filter: "blur(20px)",
                }}
              />

              {/* Left Curtain */}
              <motion.div
                className="absolute left-0 top-0 h-full w-[52%]"
                initial={{ x: 0, scaleX: 1 }}
                animate={{ x: "-110%", scaleX: 0.9 }}
                transition={{ duration: 2.5, ease: [0.77, 0, 0.175, 1] }}
              >
                <SafeImg
                  src={ASSETS.left}
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {/* Right Curtain */}
              <motion.div
                className="absolute right-0 top-0 h-full w-[52%]"
                initial={{ x: 0, scaleX: 1 }}
                animate={{ x: "110%", scaleX: 0.9 }}
                transition={{ duration: 2.5, ease: [0.77, 0, 0.175, 1] }}
              >
                <SafeImg
                  src={ASSETS.right}
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {/* Top Curtain */}
              <motion.div
                className="absolute left-0 top-0 h-[28dvh] w-full"
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{
                  delay: 1.3,
                  duration: 1.4,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <SafeImg
                  src={ASSETS.top}
                  className="h-full w-full object-cover object-bottom"
                />
              </motion.div>

              {/* Gold Sparkles (deterministic) */}
              <div className="pointer-events-none absolute inset-0">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 4 + (i % 4),
                      height: 4 + (i % 4),
                      left: `${5 + ((i * 13) % 90)}%`,
                      top: `${25 + ((i * 7) % 50)}%`,
                      background: "#FFD978",
                      boxShadow: "0 0 12px #FFD978",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: -(80 + (i % 5) * 40),
                      x: (i % 2 === 0 ? -1 : 1) * (20 + (i % 4) * 15),
                      scale: [0, 1.5, 0.5],
                      rotate: 360,
                    }}
                    transition={{ duration: 2.5, delay: i * 0.06 }}
                  />
                ))}
              </div>

              {/* Bloom */}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.18, 0] }}
                transition={{ delay: 2.2, duration: 0.7 }}
              />
            </motion.div>
          )}

          {/* ================= INTRO ================= */}
          <AnimatePresence>
            {step === "intro" && ready && (
              <motion.div
                key="intro"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <SafeImg
                  src={ASSETS.intro}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {particles.map((p, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-yellow-200"
                      style={{
                        width: 4,
                        height: 4,
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                      }}
                      animate={{
                        y: [0, -120],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.5, 0.5],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: p.duration,
                        delay: p.delay,
                      }}
                    />
                  ))}
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="px-6 text-center text-xs uppercase tracking-[0.3em] text-white/90 sm:tracking-[0.5em]"
                  >
                    Together with their Families
                  </motion.h2>

                  <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 font-serif text-6xl text-white"
                  >
                    Harsh
                  </motion.h1>

                  <div className="my-2 text-3xl text-yellow-300">&amp;</div>

                  <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="font-serif text-6xl text-white"
                  >
                    Disha
                  </motion.h1>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={startOpening}
                    className="mt-16 rounded-full bg-[#F4E8CF] px-10 py-4 text-sm uppercase tracking-[0.25em] shadow-2xl"
                  >
                    Open Invitation
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}