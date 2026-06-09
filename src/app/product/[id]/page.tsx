import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/product/ProductDetailPage";
import { getAllProductIds, getProductDetail } from "@/lib/product-details";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllProductIds().map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductDetail(Number(id));

  if (!product) {
    return { title: "Product | GILZOD" };
  }

  return {
    title: `${product.name} | GILZOD`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductDetail(Number(id));

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
