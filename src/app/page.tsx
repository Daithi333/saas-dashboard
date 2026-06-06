import Link from "next/link";
import { getItems, getItemStats } from "@/features/items/data/items-data";
import { ItemsTable } from "@/features/items/components/items-table";
import { StatsSummary } from "@/features/items/components/stats-summary";
import { ItemsFilter } from "@/features/items/components/items-filter";
import type { Status } from "@/features/items/models/items";
import styles from "./page.module.css";

interface DashboardPageProps {
  searchParams: Promise<{
    status?: string;
    sort?: string;
  }>;
}

const VALID_STATUSES: Status[] = ["TODO", "IN_PROGRESS", "DONE"];
const VALID_SORT_FIELDS = ["createdAt", "title"] as const;
const VALID_SORT_ORDERS = ["asc", "desc"] as const;

function parseSort(sort?: string) {
  if (!sort) return { sortField: "createdAt" as const, sortOrder: "desc" as const };
  const [field, order] = sort.split(":");
  const sortField = VALID_SORT_FIELDS.includes(field as typeof VALID_SORT_FIELDS[number])
    ? (field as "createdAt" | "title")
    : "createdAt";
  const sortOrder = VALID_SORT_ORDERS.includes(order as typeof VALID_SORT_ORDERS[number])
    ? (order as "asc" | "desc")
    : "desc";
  return { sortField, sortOrder };
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const status = VALID_STATUSES.includes(params.status as Status)
    ? (params.status as Status)
    : undefined;
  const { sortField, sortOrder } = parseSort(params.sort);

  const [items, stats] = await Promise.all([
    getItems({ status, sortField, sortOrder }),
    getItemStats(),
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <Link href="/items/new" className={styles.newItemLink}>
          New Item
        </Link>
      </div>
      <div className={styles.content}>
        <StatsSummary stats={stats} />
        <ItemsFilter />
        <ItemsTable items={items} />
      </div>
    </div>
  );
}
