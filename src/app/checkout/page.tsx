"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, CreditCard, Lock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { createOrder } from "@/actions/order";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const cartItems = items.map(({ product, quantity }) => ({
        product: { id: String(product.id), price: product.price },
        quantity,
      }));
      await createOrder(formData, cartItems);
      setSuccess(true);
      clearCart();
    });
  };

  if (success) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-3">สั่งซื้อสำเร็จแล้ว!</h1>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-2">
              ขอบคุณสำหรับการสั่งซื้อ เราได้รับคำสั่งซื้อของคุณแล้ว
            </p>
            <p className="text-[var(--muted-foreground)] text-sm mb-8">
              เราจะส่งอีเมลยืนยันและอัปเดตสถานะการจัดส่งให้คุณทราบ
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="px-7 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                กลับหน้าแรก
              </Link>
              <Link
                href="/catalog"
                className="px-7 py-3 border border-[var(--border)] text-sm font-semibold rounded-xl hover:bg-[var(--muted)] transition-colors"
              >
                ช้อปต่อ
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-sm">
            <h1 className="text-xl font-bold mb-3">ตะกร้าว่างเปล่า</h1>
            <p className="text-[var(--muted-foreground)] text-sm mb-6">
              กรุณาเพิ่มสินค้าลงในตะกร้าก่อนดำเนินการชำระเงิน
            </p>
            <Link
              href="/catalog"
              className="px-7 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              เลือกซื้อสินค้า
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Back */}
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> กลับไปช้อปต่อ
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">ชำระเงิน</h1>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact */}
              <div className="bg-white border border-[var(--border)] rounded-2xl p-6 space-y-4">
                <h2 className="font-semibold text-base">ข้อมูลติดต่อ</h2>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    อีเมล <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@email.com"
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08X-XXX-XXXX"
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white border border-[var(--border)] rounded-2xl p-6 space-y-4">
                <h2 className="font-semibold text-base">ที่อยู่จัดส่ง</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      ชื่อ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ชื่อจริง"
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="นามสกุล"
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    ที่อยู่ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="บ้านเลขที่ ถนน ซอย"
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      เขต/อำเภอ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="เขต/อำเภอ"
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      จังหวัด <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="จังหวัด"
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      รหัสไปรษณีย์ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="10110"
                      maxLength={5}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white border border-[var(--border)] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-base">ข้อมูลบัตรเครดิต</h2>
                  <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                    <Lock className="h-3 w-3" /> ปลอดภัย SSL
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    หมายเลขบัตร <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-2.5 pl-11 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      วันหมดอายุ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    ชื่อบนบัตร <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ชื่อ-นามสกุล ภาษาอังกฤษ"
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    กำลังดำเนินการ...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    ยืนยันการชำระเงิน {formatPrice(total)}
                  </>
                )}
              </button>
            </form>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sticky top-24">
                <h2 className="font-semibold text-base mb-5">สรุปคำสั่งซื้อ</h2>

                <ul className="space-y-4 mb-5">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[var(--muted)] flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                          {quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2 leading-snug">{product.name}</p>
                        <p className="text-sm font-semibold mt-1">{formatPrice(product.price * quantity)}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[var(--border)] pt-4 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">ยอดสินค้า</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">ค่าจัดส่ง</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "ฟรี" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="border-t border-[var(--border)] pt-2.5 flex justify-between font-bold">
                    <span>ยอดรวมทั้งหมด</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {shipping === 0 && (
                  <p className="mt-3 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    🎉 คุณได้รับสิทธิ์จัดส่งฟรี!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
