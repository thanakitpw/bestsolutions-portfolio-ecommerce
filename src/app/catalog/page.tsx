import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CatalogClient from "./CatalogClient";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
}) {
  const params = await searchParams;

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        isActive: true,
        ...(params.category && params.category !== "ทั้งหมด"
          ? { category: { name: params.category } }
          : {}),
        ...(params.q
          ? { name: { contains: params.q, mode: "insensitive" } }
          : {}),
      },
      include: { category: true },
      orderBy:
        params.sort === "price-asc"
          ? { price: "asc" }
          : params.sort === "price-desc"
            ? { price: "desc" }
            : params.sort === "newest"
              ? { createdAt: "desc" }
              : { isFeatured: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CatalogClient
        products={products}
        categories={categories}
        currentCategory={params.category ?? "ทั้งหมด"}
        currentSort={params.sort ?? "featured"}
        query={params.q ?? ""}
      />
      <Footer />
    </div>
  );
}
