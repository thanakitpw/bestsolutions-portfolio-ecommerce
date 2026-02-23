import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { deleteProduct } from "@/actions/admin";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">สินค้าทั้งหมด</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> เพิ่มสินค้า
        </Link>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
        {products.length === 0 ? (
          <div className="p-10 text-center text-[var(--muted-foreground)]">
            ยังไม่มีสินค้า{" "}
            <Link href="/admin/products/new" className="text-[var(--foreground)] font-semibold underline">
              เพิ่มสินค้าแรก
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                  <th className="text-left px-5 py-3 font-medium text-[var(--muted-foreground)]">สินค้า</th>
                  <th className="text-left px-5 py-3 font-medium text-[var(--muted-foreground)]">หมวดหมู่</th>
                  <th className="text-left px-5 py-3 font-medium text-[var(--muted-foreground)]">ราคา</th>
                  <th className="text-left px-5 py-3 font-medium text-[var(--muted-foreground)]">สต็อก</th>
                  <th className="text-left px-5 py-3 font-medium text-[var(--muted-foreground)]">สถานะ</th>
                  <th className="text-right px-5 py-3 font-medium text-[var(--muted-foreground)]">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-[var(--muted)]"
                          />
                        )}
                        <div>
                          <p className="font-medium">{product.name}</p>
                          {product.isFeatured && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[var(--muted-foreground)]">
                      {product.category?.name ?? "-"}
                    </td>
                    <td className="px-5 py-4 font-semibold">฿{product.price.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={product.stock <= 5 ? "text-red-600 font-medium" : ""}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {product.isActive ? "เปิดขาย" : "ปิดขาย"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
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
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors text-[var(--muted-foreground)] hover:text-red-600"
                            onClick={(e) => {
                              if (!confirm("ต้องการลบสินค้านี้?")) e.preventDefault();
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                            </svg>
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
