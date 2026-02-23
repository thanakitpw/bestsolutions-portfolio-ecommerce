import { prisma } from "@/lib/prisma";
import { ShoppingCart, Package, Users, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const [productCount, userCount, orderCount, orders] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.count(),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { orderItems: true },
    }),
  ]);

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  const statusColor: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PROCESSING: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const statusLabel: Record<string, string> = {
    PENDING: "รอดำเนินการ",
    PROCESSING: "กำลังเตรียม",
    SHIPPED: "จัดส่งแล้ว",
    DELIVERED: "ได้รับแล้ว",
    CANCELLED: "ยกเลิก",
  };

  const stats = [
    { label: "สินค้าทั้งหมด", value: productCount, icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "ผู้ใช้งาน", value: userCount, icon: Users, color: "bg-purple-50 text-purple-600" },
    { label: "คำสั่งซื้อ", value: orderCount, icon: ShoppingCart, color: "bg-orange-50 text-orange-600" },
    { label: "รายได้รวม", value: `฿${revenue.toLocaleString()}`, icon: TrendingUp, color: "bg-green-50 text-green-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">ภาพรวม</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-[var(--border)] rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
        <h2 className="font-semibold mb-4">คำสั่งซื้อล่าสุด</h2>
        {orders.length === 0 ? (
          <p className="text-sm text-[var(--muted-foreground)]">ยังไม่มีคำสั่งซื้อ</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)]">
                  <th className="text-left pb-3 font-medium">Order ID</th>
                  <th className="text-left pb-3 font-medium">ลูกค้า</th>
                  <th className="text-left pb-3 font-medium">ยอดรวม</th>
                  <th className="text-left pb-3 font-medium">สถานะ</th>
                  <th className="text-left pb-3 font-medium">วันที่</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3 font-mono text-xs">#{order.id.slice(-8).toUpperCase()}</td>
                    <td className="py-3">{order.firstName} {order.lastName}</td>
                    <td className="py-3 font-semibold">฿{order.total.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[order.status] ?? "bg-gray-100 text-gray-700"}`}>
                        {statusLabel[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="py-3 text-[var(--muted-foreground)]">
                      {new Date(order.createdAt).toLocaleDateString("th-TH")}
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
