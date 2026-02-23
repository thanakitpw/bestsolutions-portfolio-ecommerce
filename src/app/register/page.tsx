"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { register } from "@/actions/auth";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await register(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
        setTimeout(() => router.push("/login"), 1500);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold tracking-tight">
            LUXE<span className="text-[var(--muted-foreground)]">.</span>
          </Link>
          <h1 className="text-xl font-semibold mt-4">สมัครสมาชิก</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            สร้างบัญชีเพื่อเริ่มช้อปปิ้งกับเรา
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8">
          {/* Google */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 py-3 border border-[var(--border)] rounded-xl text-sm font-medium hover:bg-[var(--muted)] transition-colors mb-6"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            สมัครด้วย Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-[var(--muted-foreground)]">หรือสมัครด้วยอีเมล</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl">
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">ชื่อ-นามสกุล</label>
              <input
                name="name"
                type="text"
                required
                placeholder="ชื่อของคุณ"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">อีเมล</label>
              <input
                name="email"
                type="email"
                required
                placeholder="example@email.com"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">รหัสผ่าน</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                  className="w-full px-4 py-2.5 pr-11 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              {isPending ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
          มีบัญชีอยู่แล้ว?{" "}
          <Link href="/login" className="font-semibold text-[var(--foreground)] hover:underline underline-offset-4">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}
