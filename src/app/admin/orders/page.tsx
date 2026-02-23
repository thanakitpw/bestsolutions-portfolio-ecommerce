import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "@/actions/admin";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

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

  const statusOptions = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">คำสั่งซื้อทั้งหมด</h1>

      {orders.length === 0 ? (
        <div className="bg-white border border-[var(--border)] rounded-2xl p-10 text-center text-[var(--muted-foreground)]">
          ยังไม่มีคำสั่งซื้อ
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-[var(--border)] rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-semibold">
                    {order.firstName} {order.lastName}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">{order.email}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5 font-mono">
                    #{order.id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">฿{order.total.toLocaleString()}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {new Date(order.createdAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="text-sm text-[var(--muted-foreground)] mb-4">
                {order.address}, {order.district}, {order.province} {order.postalCode}
              </div>

              <div className="space-y-1 mb-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span className="font-medium">฿{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border)]">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor[order.status] ?? "bg-gray-100 text-gray-700"}`}>
                  {statusLabel[order.status] ?? order.status}
                </span>
                <form className="flex items-center gap-2">
                  <select
                    name="status"
                    defaultValue={order.status}
                    className="text-sm px-3 py-1.5 border border-[var(--border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    onChange={() => {}}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{statusLabel[s]}</option>
                    ))}
                  </select>
                  <UpdateStatusButton orderId={order.id} />
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UpdateStatusButton({ orderId }: { orderId: string }) {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const status = formData.get("status") as "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
        await updateOrderStatus(orderId, status);
      }}
    >
      <button
        type="submit"
        className="px-3 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        อัปเดต
      </button>
    </form>
  );
}
