import { prisma } from "@/lib/prisma";
import { Package, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboard() {
  const [totalProducts, totalUsers, totalOrders, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
  ]);

  const revenue = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: { status: { not: "CANCELLED" } },
  });

  const stats = [
    { label: "สินค้าทั้งหมด", value: totalProducts, icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "ผู้ใช้งาน", value: totalUsers, icon: Users, color: "bg-green-50 text-green-600" },
    { label: "คำสั่งซื้อ", value: totalOrders, icon: ShoppingCart, color: "bg-purple-50 text-purple-600" },
    { label: "รายได้รวม", value: formatPrice(revenue._sum.totalAmount ?? 0), icon: TrendingUp, color: "bg-amber-50 text-amber-600" },
  ];

  const statusLabel: Record<string, { label: string; color: string }> = {
    PENDING:    { label: "รอดำเนินการ",    color: "bg-yellow-100 text-yellow-700" },
    PROCESSING: { label: "กำลังดำเนินการ", color: "bg-blue-100 text-blue-700" },
    SHIPPED:    { label: "จัดส่งแล้ว",     color: "bg-purple-100 text-purple-700" },
    DELIVERED:  { label: "ส่งถึงแล้ว",     color: "bg-green-100 text-green-700" },
    CANCELLED:  { label: "ยกเลิก",         color: "bg-red-100 text-red-700" },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ภาพรวมระบบ</h1>
        <p className="text-[var(--muted-foreground)] text-sm mt-1">ข้อมูลสรุปของร้านค้า</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-[var(--border)]">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)]">
          <h2 className="font-semibold">คำสั่งซื้อล่าสุด</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--muted)]">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">หมายเลข</th>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">ลูกค้า</th>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">ยอดรวม</th>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">สถานะ</th>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">วันที่</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[var(--muted-foreground)]">
                    ยังไม่มีคำสั่งซื้อ
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => {
                  const s = statusLabel[order.status] ?? { label: order.status, color: "bg-gray-100 text-gray-700" };
                  return (
                    <tr key={order.id} className="hover:bg-[var(--muted)] transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">
                        #{order.orderNumber.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        {order.firstName} {order.lastName}
                      </td>
                      <td className="px-6 py-4 font-semibold">{formatPrice(order.totalAmount)}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.color}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--muted-foreground)]">
                        {new Date(order.createdAt).toLocaleDateString("th-TH")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
