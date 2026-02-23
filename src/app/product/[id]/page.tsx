import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, RotateCcw, ShieldCheck, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { getProductById, getRelatedProducts, products } from "@/data/mock";
import { formatPrice } from "@/lib/utils";

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-8">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">หน้าแรก</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-[var(--foreground)] transition-colors">สินค้าทั้งหมด</Link>
            <span>/</span>
            <Link href={`/catalog?category=${product.category}`} className="hover:text-[var(--foreground)] transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[var(--foreground)] line-clamp-1">{product.name}</span>
          </nav>

          {/* Product Detail */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--muted)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.isNew && (
                    <span className="bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold px-3 py-1 rounded-full">
                      สินค้าใหม่
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ขายดี
                    </span>
                  )}
                  {discount && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ลด {discount}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <Link
                  href={`/catalog?category=${product.category}`}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {product.category}
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-1 leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  ({product.reviewCount} รีวิว)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-[var(--muted-foreground)] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discount && (
                  <span className="text-sm font-semibold text-red-500">ประหยัด {discount}%</span>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-[var(--border)] pt-5">
                <h3 className="text-sm font-semibold mb-2">รายละเอียดสินค้า</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3 pt-2">
                <AddToCartButton product={product} variant="full" />
                <Link
                  href="/checkout"
                  className="block w-full py-3.5 text-center border-2 border-[var(--primary)] text-sm font-semibold rounded-xl hover:bg-[var(--muted)] transition-colors"
                >
                  ซื้อทันที
                </Link>
              </div>

              {/* Guarantees */}
              <div className="border-t border-[var(--border)] pt-5 grid grid-cols-3 gap-4">
                {[
                  { icon: Truck, label: "จัดส่งฟรี" },
                  { icon: RotateCcw, label: "คืนได้ 30 วัน" },
                  { icon: ShieldCheck, label: "รับประกันของแท้" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
                    <div className="w-9 h-9 rounded-xl bg-[var(--muted)] flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-[var(--muted-foreground)]" />
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section className="mt-16 md:mt-20">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">
                สินค้าในหมวดหมู่เดียวกัน
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {related.map((p) => (
                  <div key={p.id} className="group">
                    <Link
                      href={`/product/${p.id}`}
                      className="block relative aspect-square rounded-xl overflow-hidden bg-[var(--muted)] mb-3"
                    >
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <Link href={`/product/${p.id}`}>
                      <p className="text-xs text-[var(--muted-foreground)]">{p.category}</p>
                      <h3 className="text-sm font-medium mt-0.5 line-clamp-1 hover:underline underline-offset-2">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-sm font-bold mt-1">{formatPrice(p.price)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Back link */}
          <div className="mt-12">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> กลับไปยังสินค้าทั้งหมด
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
