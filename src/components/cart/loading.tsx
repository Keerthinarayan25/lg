"use client";
import { Loader2 } from "lucide-react";

export default function LoadCart({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="bg-white p-6 rounded-full shadow-lg flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
      </div>
    </div>
  );
}
