"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const image = formData.get("image") as string;
  const categoryId = formData.get("categoryId") as string;
  const isFeatured = formData.get("isFeatured") === "true";
  const isActive = formData.get("isActive") !== "false";

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      image: image || null,
      categoryId: categoryId || null,
      isFeatured,
      isActive,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const image = formData.get("image") as string;
  const categoryId = formData.get("categoryId") as string;
  const isFeatured = formData.get("isFeatured") === "true";
  const isActive = formData.get("isActive") !== "false";

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      stock,
      image: image || null,
      categoryId: categoryId || null,
      isFeatured,
      isActive,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/catalog");
}

export async function updateUserRole(userId: string, role: "USER" | "ADMIN") {
  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });
  revalidatePath("/admin/users");
}

export async function deleteUser(userId: string) {
  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin/users");
}

export async function updateOrderStatus(
  orderId: string,
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
  revalidatePath("/admin/orders");
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  await prisma.category.create({
    data: { name, slug },
  });

  revalidatePath("/admin/products");
}
