"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function Manufacturing() {
  const [video01Poster, setVideo01Poster] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const generatePoster = async (src: string, captureAtSeconds: number) => {
      const video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.src = src;

      await new Promise<void>((resolve, reject) => {
        const onLoadedMetadata = () => resolve();
        const onError = () => reject(new Error("Failed to load video"));
        video.addEventListener("loadedmetadata", onLoadedMetadata, {
          once: true,
        });
        video.addEventListener("error", onError, { once: true });
      });

      const safeTime = Math.min(
        Math.max(0, captureAtSeconds),
        Math.max(0, (video.duration || 0) - 0.1),
      );

      await new Promise<void>((resolve) => {
        const onSeeked = () => resolve();
        video.addEventListener("seeked", onSeeked, { once: true });
        video.currentTime = safeTime;
      });

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.85);
    };

    generatePoster("/video-01.mp4", 1)
      .then((dataUrl) => {
        if (cancelled) return;
        if (dataUrl) setVideo01Poster(dataUrl);
      })
      .catch(() => {
        if (cancelled) return;
        setVideo01Poster(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const videos = useMemo(
    () => [
      {
        label: "Machine Overview",
        caption: "A closer look at the precision-engineered systems powering efficient, high-quality tissue paper production.",
        src: "/Manufacturing.mp4",
      },
      {
        label: "Converting & Packaging",
        caption: "Finishing, cutting, rolling, and packing",
        src: "/hero-video.mp4",
      },
      {
        label: "Pulp & Stock Prep",
        caption: "Material preparation and feed consistency",
        src: "/video-01.mp4",
        poster: video01Poster || undefined,
      },
      {
        label: "Drying & Creping",
        caption: "Dryer section and sheet formation finish",
        src: "/video-02.mp4",
      },
    ],
    [video01Poster],
  );

  const [active, setActive] = useState(0);
  

  return (
    <section id="manufacturing" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary">
            Process
          </p>
          <h2 className="mt-4 text-5xl font-semibold text-dark">
            How Tissue Is Manufactured
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-muted">
            Follow the journey from raw material preparation to forming, pressing,
            drying, creping, and converting. This behind-the-scenes video shows the
            core steps used in modern tissue production lines.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="glass mt-12 overflow-hidden rounded-4xl p-4 shadow-glow"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border bg-white/50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-dark">Select a process view</p>
                <p className="mt-0.5 text-xs text-muted">Choose a clip to review the manufacturing stage</p>
              </div>

              <div className="min-w-[260px]">
                <label className="sr-only" htmlFor="manufacturing-video">
                  Manufacturing video
                </label>
                <select
                  id="manufacturing-video"
                  value={active}
                  onChange={(e) => setActive(Number(e.target.value))}
                  className="w-full cursor-pointer rounded-2xl border border-border bg-white px-4 py-3 text-sm text-dark shadow-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                >
                  {videos.map((v, idx) => (
                    <option key={v.src} value={idx}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-white/40">
              <div className="relative aspect-video w-full">
                <motion.video
                  key={videos[active]?.src}
                  className="h-full w-full object-cover"
                  controls
                  preload="metadata"
                  poster={videos[active]?.poster}
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <source src={videos[active]?.src} type="video/mp4" />
                </motion.video>
              </div>
            </div>

            <p className="px-1 text-sm text-muted">
              <span className="font-semibold text-dark">{videos[active]?.label}:</span> {videos[active]?.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
