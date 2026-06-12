"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProductsByCategory, type CatalogProduct } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { Container } from "@/components/ui/Container";

type CategoryPageProps = {
  slug: string;
  title: string;
  image: string;
};

export function CategoryPage({ slug, title, image }: CategoryPageProps) {
  const items = getProductsByCategory(slug);

  return (
    <div className="min-h-screen-safe bg-white pb-16">
      <div className="relative h-[220px] sm:h-[280px] md:h-[320px] overflow-hidden border-b border-[#e5e5e5]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <Container className="relative h-full flex flex-col justify-end pb-8 sm:pb-10 pt-[calc(5rem+env(safe-area-inset-top))]">
          <Link
            href="/#collection"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-xs uppercase tracking-[0.15em] mb-4 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Link>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/80 mb-2">Category</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl text-white">
            {title}
          </h1>
          <p className="text-white/80 text-sm mt-2">{items.length} products</p>
        </Container>
      </div>

      <Container className="section-padding">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {items.map((product: CatalogProduct, index: number) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              image={product.image}
              index={index}
              badge={product.badge}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
