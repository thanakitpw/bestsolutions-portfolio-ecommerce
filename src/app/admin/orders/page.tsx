import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { updateOrderStatus } from "@/actions/admin";

const statusOptions = [
  { value: "PENDING",    label: "รอดำเนินการ" },
  { value: "PROCESSING", label: "กำลังดำเนินการ" },
  { value: "SHIPPED",    label: "จัดส่งแล้ว" },
  { value: "DELIVERED",  label: "ส่งถึงแล้ว" },
  { value: "CANCELLED",  label: "ยกเลิก" },
];

const statusColor: Record<string, string> = {
  PENDING:    "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED:    "bg-purple-100 text-purple-700",
  DELIVERED:  "bg-green-100 text-green-700",
  CANCELLED:  "bg-red-100 text-red-700",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } }, user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">คำสั่งซื้อทั้งหมด</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">{orders.length} รายการ</p>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[var(--border)] p-10 text-center text-[var(--muted-foreground)]">
            ยังไม่มีคำสั่งซื้อ
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-[var(--border)] p-5">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">หมายเลขคำสั่งซื้อ</p>
                  <p className="font-mono font-semibold text-sm mt-0.5">
                    #{order.orderNumber.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">
                    {order.firstName} {order.lastName} · {order.phone}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">{order.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[order.status] ?? "bg-gray-100 text-gray-700"}`}>
                    {statusOptions.find((s) => s.value === order.status)?.label ?? order.status}
                  </span>
                  <form action={async (formData: FormData) => {
                    "use server";
                    const status = formData.get("status") as string;
                    await updateOrderStatus(order.id, status);
                  }}>
                    <select
                      name="status"
                      defaultValue={order.status}
                      onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}
                      className="text-xs border border-[var(--border)] rounded-lg px-2 py-1.5 bg-white focus:outline-none"
                    >
                      {statusOptions.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <button type="submit" className="sr-only">บันทึก</button>
                  </form>
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-4 space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-[var(--muted-foreground)] line-clamp-1 flex-1 mr-4">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--border)] mt-3 pt-3 flex items-center justify-between">
                <div className="text-xs text-[var(--muted-foreground)]">
                  {new Date(order.createdAt).toLocaleDateString("th-TH", {
                    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </div>
                <div className="font-bold">{formatPrice(order.totalAmount)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
