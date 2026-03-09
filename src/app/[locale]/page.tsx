import HeroSection from "@/components/HeroSection";
import ProductGallery from "@/components/ProductGallery";
import { client } from "@/sanity/lib/client";
import { ALL_PRODUCTS_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const products = await client.fetch(ALL_PRODUCTS_QUERY).catch(() => []);
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection product={products[0]} />
      <ProductGallery initialProducts={products} />
    </div>
  );
}
