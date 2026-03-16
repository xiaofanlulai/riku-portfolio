"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type WorkImage = { label?: string; pc: string; sp?: string };

type Props = {
  images: WorkImage[];
  title: string;
};

export default function WorkImageGallery({ images, title }: Props) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    if (modalIndex === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalIndex(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalIndex]);

  useEffect(() => {
    document.body.style.overflow = modalIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalIndex]);

  const current = modalIndex !== null ? images[modalIndex] : null;

  const prev = () => setModalIndex((modalIndex! - 1 + images.length) % images.length);
  const next = () => setModalIndex((modalIndex! + 1) % images.length);

  return (
    <>
      {/* サムネイルグリッド */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setModalIndex(i)}
            className="group relative w-full aspect-video overflow-hidden border border-white/10 hover:border-white/30 transition-colors"
          >
            <Image
              src={img.pc}
              alt={img.label ?? `${title} - ${i + 1}`}
              fill
              sizes="33vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            {img.label && (
              <span className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs font-black text-white/70 bg-black/50">
                {img.label}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* モーダル */}
      {modalIndex !== null && current && (
        <div
          className="fixed inset-0 z-50 bg-[#1e1e1e] flex items-center justify-center p-4 md:p-8"
          onClick={() => setModalIndex(null)}
        >
          {/* モーダルパネル */}
          <div
            className="bg-white w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-gray-50 shrink-0">
              {current.label && (
                <span className="text-xs font-black text-gray-500 tracking-widest">
                  {current.label}
                </span>
              )}

              <div className="flex-1" />

              <div className="flex items-center gap-1">
                <button
                  onClick={prev}
                  disabled={images.length <= 1}
                  className="px-2 py-1 text-sm font-bold text-gray-600 hover:text-gray-900 disabled:opacity-20 transition-colors"
                >
                  ←
                </button>
                <span className="text-xs font-bold text-gray-400 px-1">
                  {modalIndex + 1} / {images.length}
                </span>
                <button
                  onClick={next}
                  disabled={images.length <= 1}
                  className="px-2 py-1 text-sm font-bold text-gray-600 hover:text-gray-900 disabled:opacity-20 transition-colors"
                >
                  →
                </button>
              </div>

              <button
                onClick={() => setModalIndex(null)}
                className="ml-1 w-7 h-7 flex items-center justify-center rounded-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-black text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* 画像エリア */}
            <div className="overflow-y-auto">
              <Image
                src={current.pc}
                alt={current.label ?? title}
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
