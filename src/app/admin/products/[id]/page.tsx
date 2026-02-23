import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/actions/admin";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  const action = updateProduct.bind(null, id);

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> กลับ
      </Link>
      <h1 className="text-2xl font-bold mb-6">แก้ไขสินค้า</h1>

      <form action={action} className="bg-white border border-[var(--border)] rounded-2xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">ชื่อสินค้า *</label>
          <input name="name" required defaultValue={product.name} className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">คำอธิบาย</label>
          <textarea name="description" rows={3} defaultValue={product.description ?? ""} className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">ราคา (฿) *</label>
            <input name="price" type="number" step="0.01" min="0" required defaultValue={product.price} className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">สต็อก *</label>
            <input name="stock" type="number" min="0" required defaultValue={product.stock} className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">URL รูปภาพ</label>
          <input name="image" type="url" placeholder="https://..." defaultValue={product.image ?? ""} className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">หมวดหมู่</label>
          <select name="categoryId" defaultValue={product.categoryId ?? ""} className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white">
            <option value="">-- ไม่ระบุ --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input name="isActive" type="checkbox" defaultChecked={product.isActive} value="true" className="rounded" />
            เปิดขาย
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input name="isFeatured" type="checkbox" defaultChecked={product.isFeatured} value="true" className="rounded" />
            Featured
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            บันทึกการเปลี่ยนแปลง
          </button>
          <Link
            href="/admin/products"
            className="px-6 py-2.5 border border-[var(--border)] text-sm font-medium rounded-xl hover:bg-[var(--muted)] transition-colors"
          >
            ยกเลิก
          </Link>
        </div>
      </form>
    </div>
  );
}
