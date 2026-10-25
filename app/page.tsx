"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CurtainReveal from "@/components/CurtainReveal";

type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  mapLabel: string;
  mapUrl: string;
  image: string;
  tint: string;
};

const MAPPLS_URL =
  "https://www.mappls.com/place-parekh+hall-td+vora+marg-malad+east-mumbai-maharashtra-400097-54mjr4@zdata=MTkuMTgwNTAyKzcyLjg1MjQwMSsxNys1NG1qcjQrKw==ed";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/dir//golden+valley+,+chene+creek+resort/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3be7b615e06ac69f:0xa6c469b634340319?sa=X&ved=1t:155782&ictx=111";

const events: EventItem[] = [
  {
    id: "haldi",
    title: "Haldi Ceremony",
    subtitle: "Lavender theme • 4:00 PM onwards",
    date: "25 November 2026",
    time: "4:00 PM onwards",
    venue: "Parekh Hall, TD Vora Marg, Malad East, Mumbai, Maharashtra 400097",
    mapLabel: "Open in Mappls",
    mapUrl: MAPPLS_URL,
    image: "/wedding/Lavender Haldi Ceremony Invitation (1).png",
    tint: "from-purple-950/10 via-black/5 to-black/55",
  },
  {
    id: "sangeet",
    title: "Sangeet Night",
    subtitle: "Music • Dance • Celebration",
    date: "25 November 2026", // was "25 October 2026" - please confirm
    time: "6:30 PM onwards",
    venue: "Parekh Hall, TD Vora Marg, Malad East, Mumbai, Maharashtra 400097",
    mapLabel: "Open in Mappls",
    mapUrl: MAPPLS_URL,
    image: "/wedding/Harsh & Disha Sparkling Sangeet Night (1).png",
    tint: "from-fuchsia-950/10 via-black/5 to-black/55",
  },
  {
    id: "wedding",
    title: "Wedding Ceremony",
    subtitle: "Tradition • Togetherness • Forever",
    date: "26 November 2026",
    time: "Jaan Aagman 3:00 PM • Varmala 5:15 PM •  Dinner 7:00 PM",
    venue: "Golden Valley, Chene Creek Resort",
    mapLabel: "Open in Google Maps",
    mapUrl: GOOGLE_MAPS_URL,
    image: "/wedding/Golden Twilight Indian Wedding Invitation (1).png",
    tint: "from-slate-950/15 via-black/5 to-black/60",
  },
];

const schedule = [
  { label: "Jaan Aagman", value: "3:00 PM" },
  { label: "Varmala", value: "5:15 PM" },
    { label: "Hasth Medap", value: "5:55 PM" },
  { label: "Choviyar", value: "5 PM onwards" },
  
];
import { MusicProvider } from "@/components/MusicPlayer";

export default function Home() {
  
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<EventItem | null>(null);

  return (

     <MusicProvider>

            <main className="min-h-screen overflow-x-hidden bg-[#f7efe3] text-[#3a2d25]">

    <main className="min-h-screen overflow-x-hidden bg-[#f7efe3] text-[#3a2d25]">
      <section className="relative min-h-screen overflow-hidden">
        {/* Cream-gold wedding background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,171,120,0.18),transparent_34%),radial-gradient(circle_at_bottom,rgba(231,204,167,0.18),transparent_30%),linear-gradient(to_bottom,#fbf4e8,#f6ead8_55%,#f2e1c4)]" />

        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute left-[12%] top-[8%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" />
          <div className="absolute left-[24%] top-[18%] h-1 w-1 animate-pulse rounded-full bg-white/80" />
          <div className="absolute right-[16%] top-[11%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" />
          <div className="absolute right-[30%] top-[21%] h-1 w-1 animate-pulse rounded-full bg-white/80" />
          <div className="absolute left-[42%] top-[34%] h-1 w-1 animate-pulse rounded-full bg-white/80" />
          <div className="absolute right-[42%] top-[38%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" />
        </div>

        {/* Premium curtain reveal */}{/* Premium curtain reveal */}
<CurtainReveal onOpen={() => setOpened(true)} />

{/* Curtain frame (stays fixed while content scrolls) */}
<motion.div
  aria-hidden
  className="pointer-events-none fixed inset-0 z-[5] flex justify-center"
  initial={{ opacity: 0, y: -24 }}
  animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
>
  <img
    src="/curtains/open.webp"
    alt=""
    draggable={false}
    className="h-full w-full max-w-md select-none object-fill"
  />
</motion.div>

<motion.div
  className="relative z-10 mx-auto max-w-sm px-8 pb-10 pt-[22dvh]"
  initial={{ opacity: 0, scale: 0.96 }}
  animate={opened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
  transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
>
  <div className="flex flex-col gap-5">

     
<section className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/35 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
  <div className="px-5 py-8 text-center">

    {/* Shree Ganeshay Namah */}
    <h2
      className="font-serif text-3xl md:text-2xl font-bold tracking-wide text-[#B22222]"
      style={{
        textShadow: "0 2px 6px rgba(227, 34, 34, 0.5)",
      }}
    >
      Shree Ganeshay Namah
    </h2>

    {/* Decorative Divider */}
    <div className="flex items-center justify-center my-4">
      <div className="h-px w-16 bg-[#C9A45A]" />
      <span className="mx-3 text-[#C9A45A] text-lg">❦</span>
      <div className="h-px w-16 bg-[#C9A45A]" />
    </div>

    <p className="text-[10px] uppercase tracking-[0.45em] text-[#a5783f] font-semibold">
      With the Blessings of Our Family
    </p>

    <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-[#3a2d25]">
      Shah Family invites you to celebrate the beginning of our forever.
    </h3>

    <p className="mt-4 text-sm leading-7 text-[#6f5b4d]">
      Join us as we come together in love, gratitude, and joy.
    </p>

  </div>
</section>

            <section className="rounded-[2rem] border border-white/20 bg-white/35 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#a5783f]">
                  Wedding Events
                </p>
                <h3 className="mt-3 font-serif text-2xl text-[#3a2d25]">
                  The Celebration
                </h3>
              </div>

              <div className="mt-5 space-y-4">
                {events.map((event, index) => (
                  <motion.button
                    key={event.id}
                    type="button"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onClick={() => setSelectedImage(event)}
                    className="w-full overflow-hidden rounded-[1.4rem] border border-[#ead9cd] bg-[#fffaf3] text-left shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
                  >
                    <div className="flex gap-3 p-2">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-24 w-24 flex-none rounded-[1.1rem] object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col justify-center pr-2">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#a5783f]">
                          {event.subtitle}
                        </p>
                        <h4 className="mt-1 truncate font-serif text-lg text-[#3a2d25]">
                          {event.title}
                        </h4>
                        <p className="mt-1 text-xs text-[#6f5b4d]">{event.date}</p>
                        <p className="text-xs text-[#6f5b4d]">{event.time}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/20 bg-white/35 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#a5783f]">
                Wedding Schedule
              </p>
              <h3 className="mt-3 font-serif text-2xl text-[#3a2d25]">
                26 November 2026
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {schedule.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.2rem] border border-[#ecdccf] bg-[#fffaf3] px-4 py-4"
                  >
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#a5783f]">
                      {item.label}
                    </p>
                    <p className="mt-2 font-serif text-sm text-[#3a2d25]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/20 bg-white/35 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#a5783f]">
                Venue
              </p>
              <h3 className="mt-3 font-serif text-2xl text-[#3a2d25]">
                Haldi &amp; Sangeet
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#6f5b4d]">
                Parekh Hall, TD Vora Marg, Malad East, Mumbai, Maharashtra 400097
              </p>
              <a
                href={MAPPLS_URL}
                target="_blank"
                rel="noreferrer"   
                className="mt-4 inline-flex rounded-full border border-[#c9a37b] px-5 py-2 text-xs uppercase tracking-[0.25em] text-[#3a2d25]"
              >
                Open Maps
              </a>
            </section>

            <section className="rounded-[2rem] border border-white/20 bg-white/35 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#a5783f]">
                Lagan
              </p>
              <h3 className="mt-3 font-serif text-2xl text-[#3a2d25]">
                Golden Valley
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#6f5b4d]">
                Chene Creek Resort
              </p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-full border border-[#c9a37b] px-5 py-2 text-xs uppercase tracking-[0.25em] text-[#3a2d25]"
              >
                Open Google Maps
              </a>
            </section>

    <footer className="mt-10 text-center">

  <h2
    className="font-serif text-2xl md:text-2xl "
   
  >
    Harsh Rajesh Shah
  </h2>

  <div
    className="my-2 text-2xl"
    style={{
      color: "#000000",
      textShadow: "0 0 8px rgba(178,34,34,0.35)",
    }}
  >
    &
  </div>

  <h2
    className="font-serif text-2xl md:text-2xl "
    
  >
    Disha Yogesh Chitalia
  </h2>

</footer>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.96, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 10 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1020]"
              >
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="h-[78vh] w-full bg-[#060911] object-contain"
                />
                <div className="border-t border-white/10 p-4 text-white">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#d7b46a]">
                    {selectedImage.subtitle}
                  </p>
                  <h4 className="mt-2 font-serif text-2xl">{selectedImage.title}</h4>
                  <p className="mt-2 text-sm text-white/80">{selectedImage.date}</p>
                  <p className="text-sm text-white/80">{selectedImage.time}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="mt-4 inline-flex rounded-full border border-[#d7b46a] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#d7b46a]"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
       </main>

        </MusicProvider>
  );
}