"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarFilter from "@/components/products/SidebarFilter";
import ProductCard from "@/components/products/ProductCard";

export default function ProductsPage() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((p) => p);

  const products = [
    {
      title: "77 Inch Class LG OLED evo AI C5 4K Smart TV 2025",
      code: "OLED77C5PUA",
      price: 2499.99,
      oldPrice: 3699.99,
      discount: "$1,200 OFF",
      image: "/TVs/image.png",
      rating: 5,
      reviews: 118,
      deliveryDate: "Oct 23",
      pickupDate: "Oct 19",
      description:
        "Experience stunning visuals with LG OLED evo C5 featuring AI upscaling, infinite contrast, and Dolby Vision for cinematic performance.",
      features: [
        "Self-lit OLED pixels for perfect blacks",
        "α9 Gen6 AI Processor 4K",
        "Dolby Vision IQ and Dolby Atmos",
        "120Hz refresh rate for smooth motion",
      ],
      images: ["/TVs/image.png", "/TVs/image2.png"],
    },
    {
      title: "65 Inch Class LG OLED evo AI B4 4K Smart TV 2025",
      code: "OLED65B4PUA",
      price: 1799.99,
      oldPrice: 2299.99,
      discount: "$500 OFF",
      image: "/tv2.png",
      rating: 4,
      reviews: 90,
      deliveryDate: "Oct 24",
      pickupDate: "Oct 20",
      description: "Brilliant 4K OLED picture with vibrant colors and AI processing.",
      features: [
        "AI Picture Pro for enhanced clarity",
        "Dolby Atmos & Vision support",
        "WebOS 24 smart interface",
      ],
      images: ["/tv2.png", "/TVs/image3.png"],
    },
  ];

  return (
    <div className="bg-[#f0ece4] min-h-screen">
      {/* Breadcrumb */}
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

      {/* Main Layout */}
      <div className="flex gap-6 px-6 py-4">
        <div className="hidden lg:block w-1/4">
          <SidebarFilter />
        </div>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-3 gap-4 border rounded-md p-4 min-h-[70vh]">
          {products.map((product) => (
            <Link
              key={product.code}
              href={`/${paths.join("/")}/${product.code}`}
              className="block"
            >
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
