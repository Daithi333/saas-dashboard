import Link from "next/link";
import { getItems, getItemStats } from "@/features/items/services/items-service";
import { ItemsTable } from "@/features/items/components/items-table";
import { StatsSummary } from "@/features/items/components/stats-summary";
import styles from "./page.module.css";

export default async function DashboardPage() {
  const [items, stats] = await Promise.all([getItems(), getItemStats()]);

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
        <ItemsTable items={items} />
      </div>
    </div>
  );
}
