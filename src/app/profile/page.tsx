import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, User, LogOut } from "lucide-react";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatPrice } from "@/lib/utils";

const statusLabel: Record<string, { label: string; color: string }> = {
  PENDING:    { label: "รอดำเนินการ",  color: "bg-yellow-100 text-yellow-700" },
  PROCESSING: { label: "กำลังดำเนินการ", color: "bg-blue-100 text-blue-700" },
  SHIPPED:    { label: "จัดส่งแล้ว",   color: "bg-purple-100 text-purple-700" },
  DELIVERED:  { label: "ส่งถึงแล้ว",   color: "bg-green-100 text-green-700" },
  CANCELLED:  { label: "ยกเลิก",       color: "bg-red-100 text-red-700" },
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--muted)] flex items-center justify-center text-xl font-bold">
                {session.user.name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div>
                <h1 className="text-xl font-bold">{session.user.name}</h1>
                <p className="text-sm text-[var(--muted-foreground)]">{session.user.email}</p>
              </div>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[var(--border)] rounded-xl hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)]"
              >
                <LogOut className="h-4 w-4" /> ออกจากระบบ
              </button>
            </form>
          </div>

          {/* Orders */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Package className="h-5 w-5" />
              <h2 className="text-lg font-semibold">ประวัติการสั่งซื้อ</h2>
              <span className="text-sm text-[var(--muted-foreground)]">({orders.length} รายการ)</span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 bg-[var(--muted)] rounded-2xl">
                <Package className="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-3" />
                <p className="font-medium">ยังไม่มีประวัติการสั่งซื้อ</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">เริ่มช้อปปิ้งเพื่อดูประวัติที่นี่</p>
                <Link
                  href="/catalog"
                  className="inline-block mt-4 px-6 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  ช้อปเลย
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const status = statusLabel[order.status] ?? { label: order.status, color: "bg-gray-100 text-gray-700" };
                  return (
                    <div key={order.id} className="bg-white border border-[var(--border)] rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <p className="text-xs text-[var(--muted-foreground)]">หมายเลขคำสั่งซื้อ</p>
                          <p className="text-sm font-mono font-medium mt-0.5 truncate max-w-[200px]">
                            #{order.orderNumber.slice(-8).toUpperCase()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
                            {status.label}
                          </span>
                          <p className="text-xs text-[var(--muted-foreground)] mt-1.5">
                            {new Date(order.createdAt).toLocaleDateString("th-TH", {
                              year: "numeric", month: "long", day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-sm">
                            <span className="text-[var(--muted-foreground)] line-clamp-1 flex-1 mr-4">
                              {item.product.name} × {item.quantity}
                            </span>
                            <span className="font-medium flex-shrink-0">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-[var(--border)] pt-3 flex items-center justify-between">
                        <span className="text-sm text-[var(--muted-foreground)]">ยอดรวม</span>
                        <span className="font-bold">{formatPrice(order.totalAmount)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
