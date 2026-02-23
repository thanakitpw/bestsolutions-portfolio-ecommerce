# แผนการพัฒนาเว็บไซต์ E-Commerce (Demo สำหรับนำเสนอลูกค้า)

เว็บไซต์นี้ถูกออกแบบมาเพื่อเป็น Portfolio และ Demo สำหรับนำเสนอลูกค้าของบริษัทเอเจนซี่ โดยจะเน้นที่ความสวยงาม (UI/UX) ทันสมัย รองรับภาษาไทยสมบูรณ์แบบ และมีฟังก์ชันการทำงานพื้นฐานของ E-Commerce ครบถ้วน (จำลองการชำระเงิน)

## 🛠 Tech Stack (เทคโนโลยีที่ใช้)
- **Framework:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS v4
- **Components:** Shadcn UI, Radix UI
- **Animations:** Framer Motion
- **State Management:** Zustand (จัดการระบบตะกร้าสินค้า)
- **Icons:** Lucide React
- **Typography:** Noto Sans Thai (Google Fonts)

---

## 📋 Task Breakdown (แบ่งรายละเอียดงาน)

### Phase 1: Initial Setup (การตั้งค่าโปรเจคเริ่มต้น)
- [ ] 1.1 สร้างโปรเจค Next.js 15 ด้วย `create-next-app`
- [ ] 1.2 ติดตั้ง Dependencies ที่จำเป็น (Framer Motion, Zustand, Lucide React)
- [ ] 1.3 ตั้งค่า Tailwind CSS v4 และตั้งค่า Theme (Colors, Container)
- [ ] 1.4 ติดตั้งและตั้งค่า Font `Noto Sans Thai` ใน `layout.tsx`
- [ ] 1.5 เพิ่มโดเมนรูปภาพ (เช่น `images.unsplash.com`) ใน `next.config.js`

### Phase 2: Mock Data & State Management (ข้อมูลจำลองและระบบจัดการสถานะ)
- [ ] 2.1 สร้างไฟล์ `src/data/mock.ts` สำหรับข้อมูลสินค้าจำลอง (ภาษาไทย)
  - รูปภาพ, ชื่อสินค้า, ราคา, รายละเอียด, หมวดหมู่, ป้ายสินค้าใหม่/ขายดี
- [ ] 2.2 สร้างไฟล์ `src/store/cart.ts` (Zustand)
  - ฟังก์ชัน: เพิ่มลงตะกร้า, ลบออก, อัปเดตจำนวน, ล้างตะกร้า, คำนวณราคารวม

### Phase 3: Global Components (คอมโพเนนต์หลักที่ใช้ทุกหน้า)
- [ ] 3.1 สร้าง `Navbar` (โลโก้, เมนูนำทาง, ไอคอนค้นหา/ผู้ใช้, ปุ่มเปิดตะกร้า)
- [ ] 3.2 สร้าง `Footer` (ข้อมูลติดต่อ, ลิงก์สำคัญ, สมัครรับข่าวสาร, ลิขสิทธิ์)
- [ ] 3.3 สร้าง `CartDrawer` (เมนูด้านข้างแสดงสินค้าในตะกร้า, สรุปยอด, ปุ่มไปหน้าชำระเงิน)

### Phase 4: Core Pages (หน้าหลักของเว็บไซต์)
- [ ] **4.1 Home Page (`/`)**
  - Hero Section: ภาพแบนเนอร์ใหญ่, ข้อความดึงดูด, ปุ่ม Call to Action
  - Featured Categories: แสดงหมวดหมู่สินค้าหลัก
  - Trending Products: แสดงสินค้ายอดนิยม (Grid) พร้อมปุ่มเพิ่มลงตะกร้า
  - Store Benefits: จุดเด่นของร้าน (ส่งฟรี, คืนเงินได้, ซัพพอร์ต 24/7)
- [ ] **4.2 Catalog Page (`/catalog`)**
  - Sidebar Filters: ตัวกรองหมวดหมู่, ตัวกรองช่วงราคา
  - Product Grid: แสดงสินค้าทั้งหมดเรียงตามแถว
  - Sorting: ตัวเลือกการจัดเรียง (ราคาต่ำ-สูง, สินค้าใหม่)
- [ ] **4.3 Product Detail Page (`/product/[id]`)**
  - รูปภาพสินค้าขนาดใหญ่
  - ข้อมูลสินค้า: ชื่อ, ราคา, รายละเอียด, รีวิว
  - ปุ่ม Action: เลือกจำนวน, เพิ่มลงตะกร้า, ซื้อทันที
  - Section: สินค้าที่เกี่ยวข้อง (Related Products)

### Phase 5: Checkout Flow (ระบบชำระเงินจำลอง)
- [ ] 5.1 สร้างหน้า Checkout (`/checkout`)
  - ฟอร์มข้อมูลติดต่อ (อีเมล)
  - ฟอร์มที่อยู่จัดส่ง (ชื่อ, ที่อยู่, จังหวัด, รหัสไปรษณีย์)
  - ฟอร์มจำลองบัตรเครดิต
- [ ] 5.2 ส่วน Order Summary (สรุปคำสั่งซื้อ)
  - แสดงรายการสินค้า, ค่าจัดส่ง, ยอดรวมทั้งหมด
- [ ] 5.3 หน้า Success (หลังจากกดชำระเงิน)
  - ขอบคุณสำหรับคำสั่งซื้อ, ปุ่มกลับไปหน้าแรก

### Phase 6: Polish & Animations (เก็บรายละเอียดและแอนิเมชัน)
- [ ] 6.1 เพิ่ม Framer Motion (Fade in, Slide up, Stagger) ในหน้า Home และ Page transitions
- [ ] 6.2 ตรวจสอบความเข้ากันได้บนมือถือ (Responsive Design) บนทุกหน้า
- [ ] 6.3 ทดสอบการทำงานของระบบ Cart (เพิ่ม/ลด/ลบ) ว่าทำงานได้ถูกต้อง

---

## 🎯 เป้าหมายของ Demo นี้
เพื่อให้ลูกค้าเห็นถึงศักยภาพในการทำเว็บ E-Commerce ที่:
1. โหลดเร็วและลื่นไหล (Next.js + Vercel)
2. สวยงามทันสมัย (Modern UI/UX)
3. ใช้งานง่าย (Cart Drawer, ซื้อสินค้าได้ในไม่กี่คลิก)
4. รองรับการทำงานทุกอุปกรณ์ (Mobile First Responsive)
