import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { createProduct } from "@/actions/admin";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">เพิ่มสินค้าใหม่</h1>
        </div>
      </div>

      <form action={createProduct} className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">ชื่อสินค้า <span className="text-red-500">*</span></label>
            <input name="name" required placeholder="ชื่อสินค้า" className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">รายละเอียด <span className="text-red-500">*</span></label>
            <textarea name="description" required rows={4} placeholder="รายละเอียดสินค้า" className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">ราคา (บาท) <span className="text-red-500">*</span></label>
            <input name="price" type="number" required min="0" step="0.01" placeholder="0.00" className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">ราคาเดิม (ถ้ามีส่วนลด)</label>
            <input name="originalPrice" type="number" min="0" step="0.01" placeholder="0.00" className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">จำนวนสต็อก <span className="text-red-500">*</span></label>
            <input name="stock" type="number" required min="0" defaultValue="0" className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">หมวดหมู่ <span className="text-red-500">*</span></label>
            <select name="categoryId" required className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white">
              <option value="">เลือกหมวดหมู่</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">URL รูปภาพ <span className="text-red-500">*</span></label>
            <input name="image" required placeholder="https://images.unsplash.com/..." className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-5 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input name="isNew" type="checkbox" className="w-4 h-4 rounded accent-[var(--primary)]" />
            สินค้าใหม่
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input name="isBestSeller" type="checkbox" className="w-4 h-4 rounded accent-[var(--primary)]" />
            สินค้าขายดี
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input name="isActive" type="checkbox" defaultChecked className="w-4 h-4 rounded accent-[var(--primary)]" />
            เผยแพร่สินค้า
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity">
            บันทึกสินค้า
          </button>
          <Link href="/admin/products" className="px-6 py-2.5 border border-[var(--border)] text-sm font-medium rounded-xl hover:bg-[var(--muted)] transition-colors">
            ยกเลิก
          </Link>
        </div>
      </form>
    </div>
  );
}
