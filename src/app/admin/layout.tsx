import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/");

  const navItems = [
    { href: "/admin", label: "ภาพรวม", icon: LayoutDashboard },
    { href: "/admin/products", label: "สินค้า", icon: Package },
    { href: "/admin/orders", label: "คำสั่งซื้อ", icon: ShoppingCart },
    { href: "/admin/users", label: "ผู้ใช้งาน", icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col bg-white border-r border-[var(--border)] fixed inset-y-0">
        <div className="p-5 border-b border-[var(--border)]">
          <Link href="/" className="text-lg font-bold tracking-tight">
            LUXE<span className="text-[var(--muted-foreground)]">.</span>
          </Link>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-[var(--border)]">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-xl hover:bg-[var(--muted)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> กลับหน้าหลัก
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-[var(--border)] px-4 py-3 flex items-center gap-4">
        <Link href="/" className="text-lg font-bold">LUXE.</Link>
        <div className="flex gap-2 overflow-x-auto">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[var(--muted)] whitespace-nowrap">
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-60 p-6 md:p-8 pt-20 md:pt-8">
        {children}
      </main>
    </div>
  );
}
