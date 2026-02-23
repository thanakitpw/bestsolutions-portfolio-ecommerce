# แผนการพัฒนาเว็บไซต์ E-Commerce (ระบบจริงแบบ Full-Stack)

เว็บไซต์นี้ถูกออกแบบมาเพื่อเป็น E-Commerce ที่สามารถใช้งานได้จริงในระดับ Production สมบูรณ์แบบ รองรับภาษาไทย มีระบบฐานข้อมูล, การยืนยันตัวตน (Authentication), และระบบจัดการหลังบ้าน (Admin Dashboard)

## 🛠 Tech Stack (เทคโนโลยีที่ใช้)
- **Frontend Framework:** Next.js 15 (App Router), React 19
- **Styling & UI:** Tailwind CSS v4, Shadcn UI, Radix UI
- **Animations:** Framer Motion
- **State Management:** Zustand (จัดการระบบตะกร้าสินค้า)
- **Database & ORM:** PostgreSQL + Prisma ORM
- **Authentication:** Auth.js (NextAuth.js v5)
- **Image Upload:** UploadThing หรือ Cloudinary
- **Icons & Typography:** Lucide React, Noto Sans Thai (Google Fonts)

---

## 📋 Task Breakdown (แบ่งรายละเอียดงาน)

### Phase 1: Initial Setup (การตั้งค่าโปรเจคเริ่มต้น)
- [x] 1.1 สร้างโปรเจค Next.js 15 ด้วย `create-next-app`
- [x] 1.2 ติดตั้ง Dependencies ที่จำเป็น (Framer Motion, Zustand, Lucide React)
- [x] 1.3 ตั้งค่า Tailwind CSS v4 และตั้งค่า Theme (Colors, Container)
- [x] 1.4 ติดตั้งและตั้งค่า Font `Noto Sans Thai` ใน `layout.tsx`
- [x] 1.5 เพิ่มโดเมนรูปภาพ (เช่น `images.unsplash.com`) ใน `next.config.js`

### Phase 2: Mock Data & State Management (ข้อมูลจำลองและระบบจัดการสถานะ)
- [x] 2.1 สร้างไฟล์ `src/data/mock.ts` สำหรับข้อมูลสินค้าจำลอง (ภาษาไทย)
- [x] 2.2 สร้างไฟล์ `src/store/cart.ts` (Zustand)

### Phase 3: Global Components (คอมโพเนนต์หลักที่ใช้ทุกหน้า)
- [x] 3.1 สร้าง `Navbar` (โลโก้, เมนูนำทาง, ไอคอนค้นหา/ผู้ใช้, ปุ่มเปิดตะกร้า)
- [x] 3.2 สร้าง `Footer` (ข้อมูลติดต่อ, ลิงก์สำคัญ, สมัครรับข่าวสาร, ลิขสิทธิ์)
- [x] 3.3 สร้าง `CartDrawer` (เมนูด้านข้างแสดงสินค้าในตะกร้า, สรุปยอด, ปุ่มไปหน้าชำระเงิน)

### Phase 4: Core Pages (หน้าหลักของเว็บไซต์)
- [x] **4.1 Home Page (`/`)**
- [x] **4.2 Catalog Page (`/catalog`)**
- [x] **4.3 Product Detail Page (`/product/[id]`)**

### Phase 5: Checkout Flow (ระบบชำระเงินจำลอง - UI)
- [x] 5.1 สร้างหน้า Checkout (`/checkout`) แบบ UI
- [x] 5.2 ส่วน Order Summary (สรุปคำสั่งซื้อ)
- [x] 5.3 หน้า Success UI (หลังจากกดชำระเงิน)

### Phase 6: Database & Authentication (ระบบฐานข้อมูลและยืนยันตัวตน)
- [x] 6.1 ติดตั้ง Prisma ORM และเชื่อมต่อ PostgreSQL (เช่น Vercel Postgres / Supabase)
- [x] 6.2 ออกแบบ Database Schema (`User`, `Product`, `Category`, `Order`, `OrderItem`)
- [x] 6.3 ติดตั้งและตั้งค่า NextAuth.js (Auth.js) สำหรับระบบ Login/Register (Credentials / Google)
- [x] 6.4 สร้างหน้า Login (`/login`) และ Register (`/register`)

### Phase 7: Backend & Data Integration (เชื่อมต่อข้อมูลจริง)
- [x] 7.1 สร้าง Server Actions สำหรับ Auth, Admin, Order
- [ ] 7.2 เปลี่ยนข้อมูล Mock ในหน้า Home, Catalog, Product Detail เป็นข้อมูลจริง (หลัง Supabase setup)
- [ ] 7.3 ตั้งค่าระบบอัปโหลดรูปภาพ (UploadThing/Cloudinary) สำหรับอัปโหลดรูปสินค้า

### Phase 8: Admin Dashboard (ระบบหลังบ้าน)
- [x] 8.1 สร้าง Layout สำหรับ Admin (`/admin`) ป้องกันสิทธิ์ให้เข้าได้เฉพาะ Admin (Role-based)
- [x] 8.2 ระบบจัดการสินค้า (Product CRUD): ดูรายการ, เพิ่ม, แก้ไข, ลบสินค้า
- [x] 8.3 ระบบจัดการผู้ใช้งาน (User Management): ดูรายการผู้ใช้, จัดการสิทธิ์ (Admin/User), ลบผู้ใช้
- [x] 8.4 ระบบจัดการคำสั่งซื้อ (Order Management): ดูรายการสั่งซื้อ, อัปเดตสถานะ

### Phase 9: Real Checkout & Orders (ระบบสั่งซื้อจริง)
- [x] 9.1 ปรับปรุงหน้า Checkout ให้ดึงข้อมูล User ปัจจุบัน
- [x] 9.2 บันทึกข้อมูล Order ลง Database เมื่อทำการสั่งซื้อสำเร็จ
- [x] 9.3 สร้างหน้า Profile (`/profile`) สำหรับดูประวัติการสั่งซื้อของลูกค้า
- [ ] 9.4 (Optional) ผูกระบบชำระเงินจริง เช่น Stripe / Omise หรือ ระบบแนบสลิปโอนเงิน

### Phase 10: Polish & Deployment (เก็บรายละเอียดและขึ้นระบบจริง)
- [ ] 10.1 เพิ่ม Framer Motion (Fade in, Slide up, Stagger) และแอนิเมชันต่างๆ
- [ ] 10.2 ⚠️ **ต้องทำก่อน**: ตั้งค่า Supabase → ใส่ DATABASE_URL ใน .env → รัน `prisma migrate dev` → `prisma generate`
- [ ] 10.3 เปลี่ยนหน้า Home/Catalog/Product ให้ดึงข้อมูลจาก Database จริง
- [ ] 10.4 Deploy ระบบทั้งหมดขึ้น Vercel พร้อมเชื่อม Database Production

---

## 🎯 เป้าหมายของโปรเจคนี้
เพื่อให้ได้เว็บไซต์ E-Commerce แบบ Full-Stack ที่สมบูรณ์แบบ:
1. รองรับการทำงานจริง มีระบบหลังบ้านให้เจ้าของร้านจัดการสต็อกและผู้ใช้ได้
2. โหลดเร็ว ปลอดภัย และดึงข้อมูลแบบไดนามิก (Next.js App Router + Server Actions)
3. ดีไซน์สวยงาม ทันสมัย ใช้งานง่ายทั้งผู้ซื้อและผู้ดูแลระบบ
4. พร้อมต่อยอดระบบชำระเงินและการส่งแจ้งเตือนในอนาคต
