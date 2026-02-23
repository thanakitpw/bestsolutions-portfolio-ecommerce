"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

// ==================== PRODUCTS ====================

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const originalPrice = formData.get("originalPrice") ? parseFloat(formData.get("originalPrice") as string) : null;
  const image = formData.get("image") as string;
  const stock = parseInt(formData.get("stock") as string);
  const categoryId = formData.get("categoryId") as string;
  const isNew = formData.get("isNew") === "on";
  const isBestSeller = formData.get("isBestSeller") === "on";
  const isActive = formData.get("isActive") === "on";

  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0E00-\u0E7F-]/g, "")
    + "-" + Date.now();

  await prisma.product.create({
    data: {
      name, description, price, originalPrice, image, stock,
      categoryId, isNew, isBestSeller, isActive, slug,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const originalPrice = formData.get("originalPrice") ? parseFloat(formData.get("originalPrice") as string) : null;
  const image = formData.get("image") as string;
  const stock = parseInt(formData.get("stock") as string);
  const categoryId = formData.get("categoryId") as string;
  const isNew = formData.get("isNew") === "on";
  const isBestSeller = formData.get("isBestSeller") === "on";
  const isActive = formData.get("isActive") === "on";

  await prisma.product.update({
    where: { id },
    data: { name, description, price, originalPrice, image, stock, categoryId, isNew, isBestSeller, isActive },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  redirect("/admin/products");
}

// ==================== USERS ====================

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

export async function updateUserRole(id: string, role: "USER" | "ADMIN") {
  await prisma.user.update({ where: { id }, data: { role } });
  revalidatePath("/admin/users");
}

// ==================== ORDERS ====================

export async function updateOrderStatus(id: string, status: string) {
  await prisma.order.update({
    where: { id },
    data: { status: status as "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" },
  });
  revalidatePath("/admin/orders");
}

// ==================== CATEGORIES ====================

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\u0E00-\u0E7F-]/g, "");
  const image = formData.get("image") as string;

  await prisma.category.create({ data: { name, slug, image: image || null } });
  revalidatePath("/admin/products");
}
