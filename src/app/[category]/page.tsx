
import SidebarFilter from "@/components/products/SidebarFilter";
import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/actions/product";
import Breadcrumb from "@/components/products/Breadcrumb";
import { Product } from "@/types/productTypes";
import { normalizeCategory } from "@/lib/utils";

type ProductsPageProps ={
  category: string;
}

export default async function ProductsPage({ params }: { params : Promise<ProductsPageProps>}) {
  // const pathname = usePathname();
  // const paths = pathname.split("/").filter((p) => p);
  // const response = await getProductsCategory(category);

  const { category } = await params;  
  const response = await getProducts();
  // console.log(response.data[0].variants[0].price);
  const products = response.data;
  // console.log("Allproducts data:", products);

  const filteredProducts = products.filter((data: { category: string; }) => normalizeCategory(data.category) === normalizeCategory(category));
  console.log("category is :", category);

  // console.log("filteredProducts are:", filteredProducts);

  
  return (
    <div className="bg-[#f0ece4] min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb/>

      {/* Main Layout */}
      <div className="flex gap-6 px-6 py-4">
        <div className="hidden lg:block w-1/4">
          <SidebarFilter />
        </div>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-3 gap-4 border rounded-md p-4 min-h-[70vh]">
          {filteredProducts.map((product:Product) => (
            
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
