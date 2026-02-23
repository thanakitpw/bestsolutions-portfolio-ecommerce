import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Categories
  const categoryNames = [
    "เครื่องแต่งกาย",
    "กระเป๋า",
    "รองเท้า",
    "เครื่องประดับ",
    "ของตกแต่งบ้าน",
    "อุปกรณ์อิเล็กทรอนิกส์",
  ];

  const categoryMap: Record<string, string> = {};

  for (const name of categoryNames) {
    const slug = name
      .replace(/\s+/g, "-")
      .replace(/[^\u0E00-\u0E7Fa-zA-Z0-9-]/g, "");
    const cat = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
    categoryMap[name] = cat.id;
  }

  console.log("✅ Categories seeded");

  // Products
  const products = [
    {
      name: "กระเป๋าหนังแท้ทรงโท้ต",
      price: 3990,
      category: "กระเป๋า",
      description:
        "กระเป๋าหนังแท้คุณภาพสูง ทรงโท้ตคลาสสิก ดีไซน์เรียบหรู เหมาะสำหรับทุกโอกาส ภายในมีช่องแบ่งสัดส่วนอย่างลงตัว รองรับของใช้ประจำวันได้ครบครัน",
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      stock: 50,
      isFeatured: true,
      isActive: true,
    },
    {
      name: "นาฬิกาข้อมือมินิมอล",
      price: 4590,
      category: "เครื่องประดับ",
      description:
        "นาฬิกาข้อมือดีไซน์มินิมอล สายหนังแท้สีน้ำตาล หน้าปัดสีขาวสะอาด กระจก Sapphire กันรอยขีดข่วน กันน้ำได้ 50 เมตร เหมาะกับทุกสไตล์การแต่งตัว",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
      stock: 30,
      isFeatured: true,
      isActive: true,
    },
    {
      name: "รองเท้าผ้าใบพรีเมียม",
      price: 2890,
      category: "รองเท้า",
      description:
        "รองเท้าผ้าใบสไตล์มินิมอล วัสดุผ้าใบคุณภาพสูง พื้นรองเท้า EVA นุ่มสบาย ระบายอากาศได้ดี เหมาะสำหรับใส่ในชีวิตประจำวัน ทั้งทำงานและออกกำลังกายเบาๆ",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
      stock: 80,
      isFeatured: true,
      isActive: true,
    },
    {
      name: "เสื้อเชิ้ตลินินพรีเมียม",
      price: 1490,
      category: "เครื่องแต่งกาย",
      description:
        "เสื้อเชิ้ตผ้าลินินแท้ 100% ระบายอากาศได้ดีเยี่ยม ทรงหลวมสบาย เหมาะกับอากาศร้อนของไทย ดูแลรักษาง่าย ซักเครื่องได้ มีให้เลือกหลายสี",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
      stock: 100,
      isFeatured: false,
      isActive: true,
    },
    {
      name: "โคมไฟตั้งโต๊ะดีไซน์เนอร์",
      price: 2290,
      category: "ของตกแต่งบ้าน",
      description:
        "โคมไฟตั้งโต๊ะดีไซน์สวยงาม โครงอลูมิเนียมคุณภาพสูง หลอด LED ประหยัดพลังงาน ปรับความสว่างได้ 3 ระดับ เหมาะสำหรับห้องทำงานและห้องนอน",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
      stock: 25,
      isFeatured: false,
      isActive: true,
    },
    {
      name: "หูฟังไร้สาย Noise Cancelling",
      price: 5990,
      category: "อุปกรณ์อิเล็กทรอนิกส์",
      description:
        "หูฟังไร้สายคุณภาพเสียงระดับ Hi-Fi ระบบตัดเสียงรบกวน Active Noise Cancelling แบตเตอรี่ใช้งานได้นาน 30 ชั่วโมง เชื่อมต่อ Bluetooth 5.3 น้ำหนักเบาสวมใส่สบาย",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      stock: 40,
      isFeatured: true,
      isActive: true,
    },
    {
      name: "กระเป๋าเป้สะพายหลังแล็ปท็อป",
      price: 2190,
      category: "กระเป๋า",
      description:
        "กระเป๋าเป้สะพายหลังสำหรับแล็ปท็อปขนาด 15.6 นิ้ว วัสดุกันน้ำ ช่องเก็บของหลายช่อง สายสะพายปรับได้ รองรับการเดินทางและทำงานในชีวิตประจำวัน",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
      stock: 60,
      isFeatured: false,
      isActive: true,
    },
    {
      name: "แว่นตากันแดดโพลาไรซ์",
      price: 1890,
      category: "เครื่องประดับ",
      description:
        "แว่นตากันแดดเลนส์โพลาไรซ์ป้องกัน UV400 กรอบอะซิเตทน้ำหนักเบา ดีไซน์ทันสมัย เหมาะกับทุกรูปหน้า มาพร้อมกล่องใส่และผ้าเช็ดเลนส์",
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
      stock: 45,
      isFeatured: false,
      isActive: true,
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        price: p.price,
        description: p.description,
        image: p.image,
        stock: p.stock,
        isFeatured: p.isFeatured,
        isActive: p.isActive,
        categoryId: categoryMap[p.category],
      },
    });
  }

  console.log("✅ Products seeded");
  console.log("🎉 Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
