import Link from "next/link";
import { LayoutDashboard, Package, Users, ShoppingCart, ArrowLeft } from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "ภาพรวม", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "จัดการสินค้า", icon: Package },
  { href: "/admin/orders", label: "คำสั่งซื้อ", icon: ShoppingCart },
  { href: "/admin/users", label: "จัดการผู้ใช้", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--muted)]">
      {/* Sidebar */}
      <aside className="w-60 bg-[var(--foreground)] text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <Link href="/" className="text-xl font-bold tracking-tight">
            LUXE<span className="text-white/50">.</span>
          </Link>
          <p className="text-xs text-white/50 mt-0.5">Admin Dashboard</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> กลับหน้าเว็บ
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden bg-[var(--foreground)] text-white px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold">LUXE.</Link>
          <div className="flex items-center gap-3">
            {adminLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/70 hover:text-white">
                <link.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
