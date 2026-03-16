"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  src: string;
  alt: string;
};

export default function ImageLightbox({ src, alt }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-3 ml-5 block w-full max-w-lg cursor-zoom-in overflow-hidden border border-white/10 group relative"
        aria-label="画像を拡大表示"
      >
        <img src={src} alt={alt} className="w-full object-cover object-top h-48" />
        <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-black/50 text-xs text-white/70 font-bold text-right">
          クリックして全体を表示 ↗
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-[#1e1e1e] flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-end px-4 py-3 border-b border-gray-200 bg-gray-50 shrink-0">
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-black text-sm transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto">
              <Image
                src={src}
                alt={alt}
                width={0}
                height={0}
                sizes="90vw"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
