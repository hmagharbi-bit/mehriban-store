import HeroSection from "@/components/HeroSection";
import ProductGallery from "@/components/ProductGallery";
import { client } from "@/sanity/lib/client";
import { ALL_PRODUCTS_QUERY, HOME_PAGE_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const products = await client.fetch(ALL_PRODUCTS_QUERY).catch(() => []);
  const homeData = await client.fetch(HOME_PAGE_QUERY).catch(() => null);
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection homeData={homeData} />
      <ProductGallery initialProducts={products} />
    </div>
  );
}
