"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/store/cart";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  stock: number;
  category: { name: string } | null;
  description: string | null;
};

export default function AddToCartButton({ product, iconOnly = false }: { product: Product; iconOnly?: boolean }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem({
      id: product.id as unknown as number,
      name: product.name,
      price: product.price,
      image: product.image ?? "",
      category: product.category?.name ?? "",
      description: product.description ?? "",
      rating: 4.8,
      reviewCount: 0,
      inStock: product.stock > 0,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className={`flex items-center justify-center gap-2 transition-all ${
        iconOnly
          ? `p-2 rounded-lg ${added ? "bg-green-600 text-white" : product.stock === 0 ? "bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed" : "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90"}`
          : `w-full py-4 rounded-xl text-sm font-bold ${added ? "bg-green-600 text-white" : product.stock === 0 ? "bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed" : "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90"}`
      }`}
    >
      {iconOnly ? (
        added ? <Check className="h-3.5 w-3.5" /> : <ShoppingBag className="h-3.5 w-3.5" />
      ) : added ? (
        <><Check className="h-4 w-4" /> เพิ่มลงตะกร้าแล้ว</>
      ) : product.stock === 0 ? (
        "สินค้าหมด"
      ) : (
        <><ShoppingBag className="h-4 w-4" /> เพิ่มลงตะกร้า</>
      )}
    </button>
  );
}
