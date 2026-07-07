"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const MapPicker = dynamic(
  () => import("./MapPicker"),
  {
    ssr: false,
  }
);

export default function LocationModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (lat: number, lng: number) => void;
}) {
  console.log("LocationModal Render", open);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm">

      <div
        ref={modalRef}
        className="absolute inset-8 rounded-3xl bg-white shadow-2xl overflow-hidden"
      >

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-semibold">
            Select Delivery Location
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
          >
            Close
          </button>

        </div>

        <div className="h-[calc(100%-72px)]">
          <MapPicker
            onSelect={onSelect}
            onDone={onClose}
          />
        </div>

      </div>

    </div>
  );
}
