export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
};

export const categories = [
  "ทั้งหมด",
  "เครื่องแต่งกาย",
  "กระเป๋า",
  "รองเท้า",
  "เครื่องประดับ",
  "ของตกแต่งบ้าน",
  "อุปกรณ์อิเล็กทรอนิกส์",
];

export const products: Product[] = [
  {
    id: 1,
    name: "กระเป๋าหนังแท้ทรงโท้ต",
    price: 3990,
    originalPrice: 5500,
    category: "กระเป๋า",
    description:
      "กระเป๋าหนังแท้คุณภาพสูง ทรงโท้ตคลาสสิก ดีไซน์เรียบหรู เหมาะสำหรับทุกโอกาส ภายในมีช่องแบ่งสัดส่วนอย่างลงตัว รองรับของใช้ประจำวันได้ครบครัน",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 124,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 2,
    name: "นาฬิกาข้อมือมินิมอล",
    price: 4590,
    category: "เครื่องประดับ",
    description:
      "นาฬิกาข้อมือดีไซน์มินิมอล สายหนังแท้สีน้ำตาล หน้าปัดสีขาวสะอาด กระจก Sapphire กันรอยขีดข่วน กันน้ำได้ 50 เมตร เหมาะกับทุกสไตล์การแต่งตัว",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 89,
    isNew: true,
    inStock: true,
  },
  {
    id: 3,
    name: "รองเท้าผ้าใบพรีเมียม",
    price: 2890,
    originalPrice: 3500,
    category: "รองเท้า",
    description:
      "รองเท้าผ้าใบสไตล์มินิมอล วัสดุผ้าใบคุณภาพสูง พื้นรองเท้า EVA นุ่มสบาย ระบายอากาศได้ดี เหมาะสำหรับใส่ในชีวิตประจำวัน ทั้งทำงานและออกกำลังกายเบาๆ",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 203,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 4,
    name: "เสื้อเชิ้ตลินินพรีเมียม",
    price: 1490,
    category: "เครื่องแต่งกาย",
    description:
      "เสื้อเชิ้ตผ้าลินินแท้ 100% ระบายอากาศได้ดีเยี่ยม ทรงหลวมสบาย เหมาะกับอากาศร้อนของไทย ดูแลรักษาง่าย ซักเครื่องได้ มีให้เลือกหลายสี",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 156,
    isNew: true,
    inStock: true,
  },
  {
    id: 5,
    name: "โคมไฟตั้งโต๊ะดีไซน์เนอร์",
    price: 2290,
    originalPrice: 2990,
    category: "ของตกแต่งบ้าน",
    description:
      "โคมไฟตั้งโต๊ะดีไซน์สวยงาม โครงอลูมิเนียมคุณภาพสูง หลอด LED ประหยัดพลังงาน ปรับความสว่างได้ 3 ระดับ เหมาะสำหรับห้องทำงานและห้องนอน",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: 6,
    name: "หูฟังไร้สาย Noise Cancelling",
    price: 5990,
    category: "อุปกรณ์อิเล็กทรอนิกส์",
    description:
      "หูฟังไร้สายคุณภาพเสียงระดับ Hi-Fi ระบบตัดเสียงรบกวน Active Noise Cancelling แบตเตอรี่ใช้งานได้นาน 30 ชั่วโมง เชื่อมต่อ Bluetooth 5.3 น้ำหนักเบาสวมใส่สบาย",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 312,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 7,
    name: "กระเป๋าเป้สะพายหลังแล็ปท็อป",
    price: 2190,
    category: "กระเป๋า",
    description:
      "กระเป๋าเป้สะพายหลังสำหรับแล็ปท็อปขนาด 15.6 นิ้ว วัสดุกันน้ำ ช่องเก็บของหลายช่อง สายสะพายปรับได้ รองรับการเดินทางและทำงานในชีวิตประจำวัน",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 178,
    isNew: true,
    inStock: true,
  },
  {
    id: 8,
    name: "แว่นตากันแดดโพลาไรซ์",
    price: 1890,
    originalPrice: 2500,
    category: "เครื่องประดับ",
    description:
      "แว่นตากันแดดเลนส์โพลาไรซ์ป้องกัน UV400 กรอบอะซิเตทน้ำหนักเบา ดีไซน์ทันสมัย เหมาะกับทุกรูปหน้า มาพร้อมกล่องใส่และผ้าเช็ดเลนส์",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    rating: 4.4,
    reviewCount: 95,
    inStock: true,
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((p) => p.isBestSeller || p.isNew).slice(0, limit);
}
