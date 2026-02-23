import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/lib/auth";
import { Package, LogOut, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

type OrderWithItems = {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  orderItems: {
    id: string;
    price: number;
    quantity: number;
    product: { name: string };
  }[];
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  const statusLabel: Record<string, string> = {
    PENDING: "รอดำเนินการ",
    PROCESSING: "กำลังเตรียม",
    SHIPPED: "จัดส่งแล้ว",
    DELIVERED: "ได้รับแล้ว",
    CANCELLED: "ยกเลิก",
  };

  const statusColor: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PROCESSING: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">บัญชีของฉัน</h1>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" /> ออกจากระบบ
            </button>
          </form>
        </div>

        {/* User Info */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 mb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center text-xl font-bold flex-shrink-0">
            {session.user.name?.[0]?.toUpperCase() ?? <User className="h-6 w-6" />}
          </div>
          <div>
            <p className="font-semibold text-lg">{session.user.name}</p>
            <p className="text-sm text-[var(--muted-foreground)]">{session.user.email}</p>
            {session.user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium hover:bg-blue-200 transition-colors"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Orders */}
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Package className="h-5 w-5" /> ประวัติการสั่งซื้อ
        </h2>

        {orders.length === 0 ? (
          <div className="bg-white border border-[var(--border)] rounded-2xl p-10 text-center">
            <Package className="h-10 w-10 text-[var(--muted-foreground)] mx-auto mb-3" />
            <p className="text-[var(--muted-foreground)]">ยังไม่มีประวัติการสั่งซื้อ</p>
            <Link
              href="/catalog"
              className="inline-block mt-4 px-6 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              เริ่มช้อปปิ้ง
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: OrderWithItems) => (
              <div key={order.id} className="bg-white border border-[var(--border)] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      #{order.id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor[order.status] ?? "bg-gray-100 text-gray-700"}`}
                  >
                    {statusLabel[order.status] ?? order.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {order.orderItems.map((item: OrderWithItems["orderItems"][number]) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-[var(--muted-foreground)]">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ฿{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[var(--border)] pt-3 flex justify-between font-semibold text-sm">
                  <span>ยอดรวม</span>
                  <span>฿{order.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
