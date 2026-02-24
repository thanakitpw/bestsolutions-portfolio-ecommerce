"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart";
import CartDrawer from "@/components/cart/CartDrawer";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
};

export default function NavbarClient({ user }: { user: SessionUser | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = mounted ? getTotalItems() : 0;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/catalog", label: "สินค้าทั้งหมด" },
    { href: "/catalog?category=เครื่องแต่งกาย", label: "เครื่องแต่งกาย" },
    { href: "/catalog?category=กระเป๋า", label: "กระเป๋า" },
    { href: "/catalog?category=เครื่องประดับ", label: "เครื่องประดับ" },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold tracking-tight">
              LUXE<span className="text-[var(--muted-foreground)]">.</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                <Search className="h-5 w-5" />
              </button>

              <button
                onClick={openCart}
                className="relative p-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>


              {/* User Menu */}
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center text-xs font-bold">
                      {user.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[var(--border)] rounded-xl shadow-lg py-1.5 z-50">
                      <div className="px-4 py-2.5 border-b border-[var(--border)]">
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)] truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-[var(--muted)] transition-colors"
                      >
                        <User className="h-4 w-4" /> โปรไฟล์ของฉัน
                      </Link>
                      {user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-[var(--muted)] transition-colors text-blue-600"
                        >
                          <LayoutDashboard className="h-4 w-4" /> จัดการระบบ
                        </Link>
                      )}
                      <div className="border-t border-[var(--border)] mt-1 pt-1">
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-[var(--muted)] transition-colors w-full text-left text-red-500"
                        >
                          <LogOut className="h-4 w-4" /> ออกจากระบบ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors"
                >
                  <User className="h-4 w-4" /> เข้าสู่ระบบ
                </Link>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <nav className="md:hidden border-t border-[var(--border)] py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-2 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-2 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors"
                >
                  เข้าสู่ระบบ / สมัครสมาชิก
                </Link>
              )}
            </nav>
          )}
        </div>
      </header>

      <CartDrawer />
    </>
  );
}
