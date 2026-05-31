import type { Item as PrismaItem, Status } from "@/generated/prisma/client";

export type { Status } from "@/generated/prisma/client";

export interface Item {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
}

export function toItem(record: PrismaItem): Item {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    status: record.status,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}
