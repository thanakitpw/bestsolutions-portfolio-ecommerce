import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getFeaturedProducts, categories, products } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/ui/AddToCartButton";

export default function Home() {
  const featured = getFeaturedProducts(4);

  const heroCategories = [
    {
      name: "กระเป๋า",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
      href: "/catalog?category=กระเป๋า",
    },
    {
      name: "เครื่องประดับ",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
      href: "/catalog?category=เครื่องประดับ",
    },
    {
      name: "รองเท้า",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
      href: "/catalog?category=รองเท้า",
    },
  ];

  const benefits = [
    {
      icon: Truck,
      title: "จัดส่งฟรีทั่วประเทศ",
      desc: "สั่งซื้อขั้นต่ำ 500 บาท จัดส่งฟรีทุกออเดอร์",
    },
    {
      icon: RotateCcw,
      title: "คืนสินค้าได้ใน 30 วัน",
      desc: "ไม่พอใจยินดีคืนเงินเต็มจำนวนภายใน 30 วัน",
    },
    {
      icon: ShieldCheck,
      title: "ชำระเงินปลอดภัย 100%",
      desc: "ระบบชำระเงินเข้ารหัส SSL มาตรฐานสากล",
    },
    {
      icon: Star,
      title: "สินค้าคุณภาพพรีเมียม",
      desc: "คัดสรรสินค้าจากแบรนด์ชั้นนำ รับประกันของแท้",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-[#f8f6f3] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="inline-block bg-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--border)]">
                  คอลเลกชันใหม่ 2026
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  ยกระดับ
                  <br />
                  <span className="text-[var(--muted-foreground)]">ไลฟ์สไตล์</span>
                  <br />
                  ของคุณ
                </h1>
                <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-md">
                  ค้นพบสินค้าพรีเมียมที่คัดสรรมาเพื่อเพิ่มความสวยงามและความเรียบหรูให้กับชีวิตประจำวัน
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/catalog"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
                  >
                    ช้อปเลย <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/catalog"
                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--border)] text-sm font-semibold rounded-full hover:bg-[var(--muted)] transition-colors"
                  >
                    ดูคอลเลกชัน
                  </Link>
                </div>
                <div className="flex items-center gap-6 pt-2 text-sm text-[var(--muted-foreground)]">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span>4.9/5</span>
                  </div>
                  <span>•</span>
                  <span>ลูกค้ากว่า 10,000 ราย</span>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
                    alt="Hero"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--muted)] rounded-xl flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">รับประกันของแท้</p>
                    <p className="text-xs text-[var(--muted-foreground)]">100% Authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">หมวดหมู่สินค้า</h2>
                <p className="text-[var(--muted-foreground)] mt-1 text-sm">เลือกช้อปตามหมวดหมู่ที่คุณชื่นชอบ</p>
              </div>
              <Link href="/catalog" className="text-sm font-medium hover:underline underline-offset-4 flex items-center gap-1">
                ดูทั้งหมด <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {heroCategories.map((cat) => (
                <Link key={cat.name} href={cat.href} className="group relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold text-lg">{cat.name}</p>
                    <p className="text-white/70 text-sm flex items-center gap-1 mt-0.5">
                      ดูสินค้า <ArrowRight className="h-3 w-3" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-20 bg-[var(--muted)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">สินค้ายอดนิยม</h2>
                <p className="text-[var(--muted-foreground)] mt-1 text-sm">สินค้าที่ได้รับความนิยมสูงสุดในขณะนี้</p>
              </div>
              <Link href="/catalog" className="text-sm font-medium hover:underline underline-offset-4 flex items-center gap-1">
                ดูทั้งหมด <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-[var(--muted)]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {product.isNew && (
                        <span className="bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ใหม่
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ขายดี
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/product/${product.id}`}>
                      <p className="text-xs text-[var(--muted-foreground)] mb-1">{product.category}</p>
                      <h3 className="font-semibold text-sm leading-snug line-clamp-2 hover:underline underline-offset-2">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="font-bold text-sm">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-[var(--muted-foreground)] line-through ml-1.5">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Products Preview */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">สินค้าทั้งหมด</h2>
                <p className="text-[var(--muted-foreground)] mt-1 text-sm">เลือกชมสินค้าคุณภาพพรีเมียมของเรา</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {products.map((product) => (
                <div key={product.id} className="group">
                  <Link href={`/product/${product.id}`} className="block relative aspect-square rounded-xl overflow-hidden bg-[var(--muted)] mb-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.originalPrice && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ลด {Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </Link>
                  <Link href={`/product/${product.id}`}>
                    <p className="text-xs text-[var(--muted-foreground)]">{product.category}</p>
                    <h3 className="text-sm font-medium mt-0.5 line-clamp-1 hover:underline underline-offset-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-bold mt-1">{formatPrice(product.price)}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[var(--primary)] text-sm font-semibold rounded-full hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors"
              >
                ดูสินค้าทั้งหมด <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20 bg-[var(--foreground)] text-[var(--primary-foreground)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b) => (
                <div key={b.title} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <b.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm">{b.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
