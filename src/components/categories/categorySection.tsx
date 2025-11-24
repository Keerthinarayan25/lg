import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";

  const categories = [
    { name: "Air purifiers", image: "/aircare/image.png" },
    { name: "Air Conditioner", image: "/airConditioner/image.png" },
    { name: "Cooking", image: "/cooking/image.png" },
    { name: "Dish Washer", image: "/dishwasher/image.png" },
    { name: "Earbuds", image: "/earbuds/image.png" },
    { name: "Laptop", image: "/laptop/image.png" },
    { name: "Laundry", image: "/laundry/image.png" },
    { name: "Monitor", image: "/monitor/image.png" },
    { name: "Refrigerators", image: "/refrigerators/image.png" },
    { name: "Soundbaars", image: "/soundbars/image.png" },
    { name: "Tv", image: "/TVs/image.png" },
    { name: "Vacuums", image: "/vacuums/image.png" }

  ]


function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-"); // "Air Conditioner" -> "air-conditioner"
}

export default function CategorySection() {

  
  return (
    <section className="min-h-[540px] py-24 px-4 bg-[#f0ece4] w-full">
      <div className="text-center">
        <h1 className="text-[36px] font-bold pb-30">Shop top appliances and electronics</h1>
      </div>
      <div className="w-full px-30 h-100 items-center">
        <Carousel>
          <CarouselContent>
            {categories.map((product, index) => (
              <CarouselItem
                key={index}
                className="flex items-center basis-1/4"
              >
                <div className="p-2 w-70">
                  <Link href={`/${toSlug(product.name)}`}>
                    <Card className="rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
                      <CardContent className="flex flex-col items-center p-4">
                        <div className="relative w-34 h-34 items-center">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="mt-3 text-center font-semibold text-3xl">{product.name}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}