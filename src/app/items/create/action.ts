"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createItem = async (formData: FormData) => {
  const session = await auth();

  const user = session?.user;
  const userId = session?.user?.id;

  if (!session || !user || !userId) {
    throw new Error("Unauthorized");
  }

  const startingPrice = formData.get("startingPrice") as string;

  const priceAsCents = parseFloat(startingPrice) * 100;

  await database.insert(items).values({
    name: formData.get("name") as string,
    startingPrice: priceAsCents,
    userId,
  });
  revalidatePath("/");
  redirect("/");
};
