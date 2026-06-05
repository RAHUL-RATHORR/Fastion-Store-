"use client";

import { products } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CompleteTheLook } from "@/components/sections/CompleteTheLook";

export function FeaturedCollection() {
  return (
    <section id="new-arrivals" className="section-padding bg-[#0d0d0d]">
      <Container>
        <SectionHeader
          label="Featured"
          title="Featured Collection"
          description="Handpicked pieces that define the Gilzod aesthetic."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              image={product.image}
              index={index}
              badge={"badge" in product ? product.badge : undefined}
            />
          ))}
        </div>

        <CompleteTheLook productId={1} />

        <div className="flex justify-center mt-10 sm:mt-12 md:mt-16">
          <Button variant="secondary" className="w-full sm:w-auto max-w-xs sm:max-w-none">
            View All Products
          </Button>
        </div>
      </Container>
    </section>
  );
}
