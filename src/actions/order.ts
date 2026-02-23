"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

type CartItem = {
  product: {
    id: string;
    price: number;
  };
  quantity: number;
};

export async function createOrder(
  formData: FormData,
  cartItems: CartItem[]
) {
  const session = await auth();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const district = formData.get("district") as string;
  const province = formData.get("province") as string;
  const postalCode = formData.get("postalCode") as string;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 500 ? 0 : 50;
  const totalAmount = subtotal + shippingFee;

  const order = await prisma.order.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      address,
      district,
      province,
      postalCode,
      totalAmount,
      shippingFee,
      userId: session?.user?.id ?? null,
      items: {
        create: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath("/profile");

  return { success: true, orderId: order.id };
}
