"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  // const pathname = usePathname();
  // const paths = pathname.split("/").filter(Boolean);

  const pathname = usePathname();
  const paths = pathname.split("/").filter((p) => p);

  return (
    <div className="bg-[#e6e1d6] py-2 px-6 border border-[#CBC8C2]">
      <nav className="flex items-center space-x-1 text-lg text-gray-700">
        <Link href="/" className="hover:underline">Home</Link>
        {paths.map((segment, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;
          const label = segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
          return (
            <span key={href} className="flex items-center space-x-1">
              <span className="text-gray-500">/</span>
              {isLast ? (
                <span className="font-semibold text-black">{label}</span>
              ) : (
                <Link href={href} className="text-gray-700 hover:underline">
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
