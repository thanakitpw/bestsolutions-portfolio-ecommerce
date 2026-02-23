"use client";

import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/data/mock";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  className?: string;
  variant?: "icon" | "full";
};

export default function AddToCartButton({ product, className, variant = "icon" }: Props) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (variant === "full") {
    return (
      <button
        onClick={handleAdd}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all",
          added
            ? "bg-green-600 text-white"
            : "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90",
          className
        )}
      >
        {added ? (
          <>
            <Check className="h-4 w-4" /> เพิ่มลงตะกร้าแล้ว
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" /> เพิ่มลงตะกร้า
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
        added
          ? "bg-green-600 text-white"
          : "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90",
        className
      )}
    >
      {added ? <Check className="h-3.5 w-3.5" /> : <ShoppingBag className="h-3.5 w-3.5" />}
    </button>
  );
}
