import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserSection from "./navbar/userSection";

export default function Navbar() {

  return (
    <nav className="border-b border-gray-200  bg-[#f0ece4]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/*Logo*/}
          <div className="hidden md:flex gap-10 text-gray-800 font-medium">
            <Link href="/" className="text-xl font-bold">
              <Image
                src="LG.svg"
                alt="LG LOGO"
                width={70}
                height={70}
              />
            </Link>

            <p>Shop</p>
            <Link href="/support">Support</Link>
            <Link href="/business">Business</Link>
          </div>

          <div className="flex  items-center justify-between gap-10 h-14 font-medium">
            <Search />
            <UserSection/>
            
            <Link href="/checkout">
              <ShoppingCart />
            </Link>

          </div>


        </div>
      </div>
    </nav >
  );
}