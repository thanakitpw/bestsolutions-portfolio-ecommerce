import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-[var(--primary-foreground)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">LUXE.</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              ร้านค้าออนไลน์พรีเมียมที่คัดสรรสินค้าคุณภาพสูงเพื่อยกระดับไลฟ์สไตล์ของคุณ
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              สินค้า
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/catalog", label: "สินค้าทั้งหมด" },
                { href: "/catalog?category=เครื่องแต่งกาย", label: "เครื่องแต่งกาย" },
                { href: "/catalog?category=กระเป๋า", label: "กระเป๋า" },
                { href: "/catalog?category=รองเท้า", label: "รองเท้า" },
                { href: "/catalog?category=เครื่องประดับ", label: "เครื่องประดับ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              ข้อมูล
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "#", label: "เกี่ยวกับเรา" },
                { href: "#", label: "นโยบายการคืนสินค้า" },
                { href: "#", label: "นโยบายความเป็นส่วนตัว" },
                { href: "#", label: "เงื่อนไขการใช้งาน" },
                { href: "#", label: "ติดต่อเรา" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              ติดต่อเรา
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 ถนนสุขุมวิท แขวงคลองเตย กรุงเทพฯ 10110</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>02-123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>hello@luxestore.th</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-sm text-white/60 mb-2">รับข่าวสารและโปรโมชัน</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="อีเมลของคุณ"
                  className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
                />
                <button className="px-3 py-2 bg-white text-[var(--foreground)] text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
                  สมัคร
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2026 LUXE Store. สงวนลิขสิทธิ์ทุกประการ
          </p>
          <div className="flex items-center gap-2">
            {["VISA", "Mastercard", "PromptPay"].map((p) => (
              <span key={p} className="text-[10px] font-semibold text-white/40 border border-white/20 px-2 py-0.5 rounded">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
