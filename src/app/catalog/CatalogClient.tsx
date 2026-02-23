"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  isFeatured: boolean;
  stock: number;
  category: { name: string } | null;
};

type Category = { id: string; name: string };

type Props = {
  products: Product[];
  categories: Category[];
  currentCategory: string;
  currentSort: string;
  query: string;
};

export default function CatalogClient({
  products,
  categories,
  currentCategory,
  currentSort,
  query,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(query);
  const { addItem } = useCartStore();

  const allCategories = [{ id: "all", name: "ทั้งหมด" }, ...categories];

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value && value !== "ทั้งหมด" && value !== "featured") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/catalog?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (search) params.set("q", search);
    else params.delete("q");
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">สินค้าทั้งหมด</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              {products.length} รายการ
            </p>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาสินค้า..."
              className="w-full pl-9 pr-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
            />
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-white border border-[var(--border)] rounded-2xl p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="font-semibold text-sm">กรองสินค้า</span>
              </div>

              <div className="mb-5">
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                  หมวดหมู่
                </p>
                <div className="space-y-1">
                  {allCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateParams("category", cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentCategory === cat.name ||
                        (cat.name === "ทั้งหมด" && currentCategory === "ทั้งหมด")
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-medium"
                          : "hover:bg-[var(--muted)] text-[var(--muted-foreground)]"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                  เรียงตาม
                </p>
                <div className="space-y-1">
                  {[
                    { value: "featured", label: "แนะนำ" },
                    { value: "newest", label: "ใหม่ล่าสุด" },
                    { value: "price-asc", label: "ราคา: ต่ำ → สูง" },
                    { value: "price-desc", label: "ราคา: สูง → ต่ำ" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateParams("sort", opt.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentSort === opt.value
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-medium"
                          : "hover:bg-[var(--muted)] text-[var(--muted-foreground)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <ShoppingBag className="h-12 w-12 text-[var(--muted-foreground)] mb-4" />
                <p className="text-lg font-semibold mb-2">ไม่พบสินค้า</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  ลองเปลี่ยนคำค้นหาหรือหมวดหมู่
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className="relative aspect-square bg-[var(--muted)] overflow-hidden">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">
                            <ShoppingBag className="h-8 w-8" />
                          </div>
                        )}
                        {product.isFeatured && (
                          <span className="absolute top-2 left-2 bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                            แนะนำ
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="p-3">
                      <p className="text-xs text-[var(--muted-foreground)] mb-1">
                        {product.category?.name ?? ""}
                      </p>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-sm font-medium line-clamp-2 hover:text-[var(--primary)] transition-colors leading-snug mb-2">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-[var(--muted-foreground)]">4.8</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm">{formatPrice(product.price)}</span>
                        <button
                          onClick={() =>
                            addItem({
                              id: product.id as unknown as number,
                              name: product.name,
                              price: product.price,
                              image: product.image ?? "",
                              category: product.category?.name ?? "",
                              description: "",
                              rating: 4.8,
                              reviewCount: 0,
                              inStock: product.stock > 0,
                            })
                          }
                          disabled={product.stock === 0}
                          className="p-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                        </button>
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
  );
}
