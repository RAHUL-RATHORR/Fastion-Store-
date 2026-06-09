import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/category/CategoryPage";
import { categories, getCategoryBySlug } from "@/lib/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category | GILZOD" };
  }

  return {
    title: `${category.title} | GILZOD`,
    description: `Shop premium ${category.title.toLowerCase()} from GILZOD.`,
  };
}

export default async function Category({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <CategoryPage slug={category.id} title={category.title} image={category.image} />
  );
}
