import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Package } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AddToCartButton from "@/components/product/AddToCartButton";
import { formatPrice } from "@/lib/utils";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product || !product.isActive) notFound();

  const related = await prisma.product.findMany({
    where: { isActive: true, categoryId: product.categoryId, id: { not: product.id } },
    take: 4,
    include: { category: true },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> กลับไปยังสินค้าทั้งหมด
          </Link>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--muted)]">
              {product.image ? (
                <Image src={product.image} alt={product.name} fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">
                  <Package className="h-16 w-16" />
                </div>
              )}
              {product.isFeatured && (
                <span className="absolute top-4 left-4 bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold px-3 py-1 rounded-full">แนะนำ</span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="text-sm text-[var(--muted-foreground)] mb-2">{product.category?.name ?? ""}</p>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className={`h-4 w-4 ${i <= 4 ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <span className="text-sm text-[var(--muted-foreground)]">4.8 (124 รีวิว)</span>
              </div>

              <p className="text-3xl font-bold mb-6">{formatPrice(product.price)}</p>

              {product.description && (
                <p className="text-[var(--muted-foreground)] leading-relaxed mb-6 text-sm">{product.description}</p>
              )}

              <div className="flex items-center gap-2 mb-6 text-sm">
                <Package className="h-4 w-4 text-[var(--muted-foreground)]" />
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">มีสินค้า ({product.stock} ชิ้น)</span>
                ) : (
                  <span className="text-red-500 font-medium">สินค้าหมด</span>
                )}
              </div>

              <AddToCartButton product={product} />
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold mb-6">สินค้าที่เกี่ยวข้อง</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} className="group bg-white border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-square bg-[var(--muted)] overflow-hidden">
                      {p.image && <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium line-clamp-2 leading-snug mb-1">{p.name}</p>
                      <p className="text-sm font-bold">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
