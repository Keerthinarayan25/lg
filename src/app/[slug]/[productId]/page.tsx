"use client";
import ProductDetails from "@/components/products/productDetails";
import Link from "next/link";

export default function ProductDetailsPage({
  params,
}: {
  params: { slug: string; productId: string };
}) {
  const { slug, productId } = params;

  // Same product data (can later come from API or DB)
  const products = [
    {
      name: "77 Inch Class LG OLED evo AI C5 4K Smart TV 2025",
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
        "Experience stunning visuals with LG OLED evo C5 featuring AI upscaling, infinite contrast, and Dolby Vision.",
      features: [
        "World's No.1 OLED TV Brand¹, Celebrating 12 years of perfecting award-winning OLED TV technology",
        "Brightness Booster magnifies each individual pixel for remarkably luminous detail",
        "Bright Room Ready performs great no matter the room or the lighting",
        "Alpha 9 AI Processor Gen8 provides smooth, crisp picture and sound with AI Picture Pro and AI Super Upscaling²",
        "With OLED’s over 8.3 million self- lit smart pixels see perfect black and perfect color¹¹",
        "Enjoy movie magic from home with Dolby Vision®, Dolby Atmos® & FILMMAKER MODE™³",
        "Ultimate Gaming with 144Hz Refresh Rate⁴, NVIDIA G - Sync, AMD FreeSync Premium and 0.1ms response time",
        "LG’s Award - winning Smart TV platform powered by webOS.Get access to apps & view over 350 free LG Channels.Plus get software updates with webOS Re:New⁵",
      ],
      images: ["/TVs/image.png", "/TVs/image2.png"],

      // ✅ 👇 Add THIS section 👇
      specifications: {
        "Picture (Panel)": [
          { label: "Display Resolution", value: "4K UHD (3,840 x 2,160)" },
          { label: "Refresh Rate", value: "120Hz (144Hz VRR)" },
          { label: "Wide Color Gamut", value: "Yes" },
        ],
        "Smart TV": [
          { label: "Operating System", value: "webOS 24" },
          { label: "Voice Control", value: "Yes" },
        ],
        "Gaming": [
          { label: "Response Time", value: "0.1ms" },
          { label: "FreeSync / G-Sync", value: "Yes / Yes" },
        ],
      }
    },
  ];


  const product = products.find((p) => p.code === productId);

  if (!product)
    return <div className="p-8 text-red-600 text-center">Product not found.</div>;

  return (
    <div className="bg-[#f0ece4] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#f5f3ef] py-3 px-8 border-b border-[#d8d5cf] sticky top-0 z-20">
        <nav className="flex items-center space-x-1 text-sm text-gray-700">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="text-gray-500">/</span>
          <Link href={`/${slug}`} className="hover:underline capitalize">{slug}</Link>
          <span className="text-gray-500">/</span>
          <span className="font-semibold text-gray-900">{product.code}</span>
        </nav>
      </div>

      <ProductDetails product={product} />
    </div>
  );
}
