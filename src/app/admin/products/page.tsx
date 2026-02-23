import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { deleteProduct } from "@/actions/admin";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">จัดการสินค้า</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{products.length} รายการ</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> เพิ่มสินค้า
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--muted)]">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">สินค้า</th>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">หมวดหมู่</th>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">ราคา</th>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">สต็อก</th>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">สถานะ</th>
                <th className="text-right px-6 py-3 font-medium text-[var(--muted-foreground)]">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-[var(--muted-foreground)]">
                    ยังไม่มีสินค้า{" "}
                    <Link href="/admin/products/new" className="underline underline-offset-4">
                      เพิ่มสินค้าแรก
                    </Link>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[var(--muted)] flex-shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <span className="font-medium line-clamp-1 max-w-[180px]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--muted-foreground)]">{product.category.name}</td>
                    <td className="px-6 py-4 font-semibold">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4">
                      <span className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {product.isActive ? "เผยแพร่" : "ซ่อน"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <form action={deleteProduct.bind(null, product.id)}>
                          <button
                            type="submit"
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors text-[var(--muted-foreground)] hover:text-red-500"
                            onClick={(e) => {
                              if (!confirm(`ลบสินค้า "${product.name}" ใช่หรือไม่?`)) e.preventDefault();
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
