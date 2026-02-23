"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type CartItem = {
  product: { id: string; price: number };
  quantity: number;
};

export async function createOrder(formData: FormData, cartItems: CartItem[]) {
  const session = await auth();

  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const address = formData.get("address") as string;
  const district = formData.get("district") as string;
  const province = formData.get("province") as string;
  const postalCode = formData.get("postalCode") as string;

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = total >= 500 ? 0 : 50;

  const order = await prisma.order.create({
    data: {
      userId: session?.user?.id ?? null,
      email,
      phone,
      firstName,
      lastName,
      address,
      district,
      province,
      postalCode,
      total: total + shipping,
      orderItems: {
        create: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  return { success: true, orderId: order.id };
}
