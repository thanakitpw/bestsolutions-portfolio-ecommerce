"use client";

import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-base font-semibold">ตะกร้าสินค้า</h2>
            {items.length > 0 && (
              <span className="bg-[var(--primary)] text-[var(--primary-foreground)] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-md hover:bg-[var(--muted)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="h-16 w-16 text-[var(--muted-foreground)]" />
              <div>
                <p className="font-medium text-[var(--foreground)]">ตะกร้าว่างเปล่า</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  เพิ่มสินค้าที่คุณชอบลงในตะกร้าได้เลย
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                เลือกซื้อสินค้า
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[var(--muted)] flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2 leading-snug">
                      {product.name}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      {formatPrice(product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 rounded-md border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-5 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 rounded-md border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="ml-auto p-1.5 text-[var(--muted-foreground)] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--border)] px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
              <span>ค่าจัดส่ง</span>
              <span className="text-green-600 font-medium">ฟรี</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-base">
              <span>ยอดรวมทั้งหมด</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold text-center rounded-lg hover:opacity-90 transition-opacity"
            >
              ดำเนินการชำระเงิน
            </Link>
            <button
              onClick={closeCart}
              className="block w-full py-2.5 text-sm font-medium text-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              ซื้อสินค้าต่อ
            </button>
          </div>
        )}
      </div>
    </>
  );
}
