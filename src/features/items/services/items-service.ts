import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/lib/errors";
import type { Item, ItemStats } from "../models/items";
import { toItem } from "../models/items";

export async function getItems(): Promise<Item[]> {
  const records = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
  });
  return records.map(toItem);
}

export async function getItem(id: string): Promise<Item> {
  const record = await prisma.item.findUnique({ where: { id } });
  if (!record) {
    throw new NotFoundError("Item", id);
  }
  return toItem(record);
}

export async function getItemStats(): Promise<ItemStats> {
  const [total, todo, inProgress, done] = await Promise.all([
    prisma.item.count(),
    prisma.item.count({ where: { status: "TODO" } }),
    prisma.item.count({ where: { status: "IN_PROGRESS" } }),
    prisma.item.count({ where: { status: "DONE" } }),
  ]);
  return { total, todo, inProgress, done };
}
