"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, Star, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { products, categories } from "@/data/mock";
import { formatPrice } from "@/lib/utils";

const sortOptions = [
  { value: "default", label: "แนะนำ" },
  { value: "price-asc", label: "ราคา: ต่ำ → สูง" },
  { value: "price-desc", label: "ราคา: สูง → ต่ำ" },
  { value: "rating", label: "คะแนนสูงสุด" },
  { value: "newest", label: "สินค้าใหม่" },
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showFilter, setShowFilter] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== "ทั้งหมด") {
      list = list.filter((p) => p.category === selectedCategory);
    }
    list = list.filter((p) => p.price <= maxPrice);
    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return list;
  }, [selectedCategory, sortBy, maxPrice]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-[#f8f6f3] py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">สินค้าทั้งหมด</h1>
            <p className="text-[var(--muted-foreground)] mt-2">
              {filtered.length} รายการ
              {selectedCategory !== "ทั้งหมด" && ` ใน ${selectedCategory}`}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className={`
              fixed inset-y-0 left-0 z-40 w-72 bg-white p-6 overflow-y-auto shadow-xl transition-transform duration-300
              lg:static lg:z-auto lg:w-60 lg:shadow-none lg:p-0 lg:translate-x-0 lg:block lg:flex-shrink-0
              ${showFilter ? "translate-x-0" : "-translate-x-full"}
            `}>
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="font-semibold">ตัวกรอง</h3>
                <button onClick={() => setShowFilter(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
                  หมวดหมู่
                </h3>
                <ul className="space-y-1">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => { setSelectedCategory(cat); setShowFilter(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === cat
                            ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-medium"
                            : "hover:bg-[var(--muted)] text-[var(--muted-foreground)]"
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
                  ราคาสูงสุด
                </h3>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[var(--primary)]"
                />
                <div className="flex justify-between text-xs text-[var(--muted-foreground)] mt-1">
                  <span>฿500</span>
                  <span className="font-semibold text-[var(--foreground)]">{formatPrice(maxPrice)}</span>
                </div>
              </div>
            </aside>

            {/* Overlay for mobile */}
            {showFilter && (
              <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setShowFilter(false)} />
            )}

            {/* Products */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <button
                  onClick={() => setShowFilter(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-[var(--muted)] transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4" /> ตัวกรอง
                </button>

                <div className="ml-auto flex items-center gap-2">
                  <span className="text-sm text-[var(--muted-foreground)] hidden sm:block">จัดเรียงโดย:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-[var(--border)] rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  >
                    {sortOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20 text-[var(--muted-foreground)]">
                  <p className="text-lg font-medium">ไม่พบสินค้าในหมวดหมู่นี้</p>
                  <button
                    onClick={() => { setSelectedCategory("ทั้งหมด"); setMaxPrice(10000); }}
                    className="mt-4 text-sm underline underline-offset-4"
                  >
                    ล้างตัวกรอง
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                  {filtered.map((product) => (
                    <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[var(--border)]">
                      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-[var(--muted)]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 flex gap-1">
                          {product.isNew && (
                            <span className="bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold px-2 py-0.5 rounded-full">ใหม่</span>
                          )}
                          {product.isBestSeller && (
                            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">ขายดี</span>
                          )}
                          {product.originalPrice && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                              ลด {Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </span>
                          )}
                        </div>
                      </Link>
                      <div className="p-3">
                        <Link href={`/product/${product.id}`}>
                          <p className="text-[10px] text-[var(--muted-foreground)] mb-0.5">{product.category}</p>
                          <h3 className="text-sm font-semibold line-clamp-2 leading-snug hover:underline underline-offset-2">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-[11px] text-[var(--muted-foreground)]">
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2.5">
                          <div>
                            <span className="text-sm font-bold">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                              <span className="text-[11px] text-[var(--muted-foreground)] line-through ml-1">
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
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
