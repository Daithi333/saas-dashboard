import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/lib/errors";
import type { Item, ItemStats, Status } from "../models/items";
import { toItem } from "../models/items";

export interface GetItemsOptions {
  status?: Status;
  sortField?: "createdAt" | "title";
  sortOrder?: "asc" | "desc";
}

export interface CreateItemInput {
  title: string;
  description: string;
  status: Status;
}

export type UpdateItemInput = CreateItemInput;

export async function getItems(options: GetItemsOptions = {}): Promise<Item[]> {
  const { status, sortField = "createdAt", sortOrder = "desc" } = options;

  const records = await prisma.item.findMany({
    where: status ? { status } : undefined,
    orderBy: { [sortField]: sortOrder },
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

export async function createItem(input: CreateItemInput): Promise<Item> {
  const record = await prisma.item.create({ data: input });
  return toItem(record);
}

export async function updateItem(id: string, input: UpdateItemInput): Promise<Item> {
  const record = await prisma.item.update({ where: { id }, data: input });
  return toItem(record);
}

export async function deleteItem(id: string): Promise<void> {
  await prisma.item.delete({ where: { id } });
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
