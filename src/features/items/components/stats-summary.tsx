import type { ItemStats } from "../models/items";
import styles from "./stats-summary.module.css";

interface StatsSummaryProps {
  stats: ItemStats;
}

interface StatCardProps {
  label: string;
  value: number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

export function StatsSummary({ stats }: StatsSummaryProps) {
  return (
    <div className={styles.grid}>
      <StatCard label="Total" value={stats.total} />
      <StatCard label="Todo" value={stats.todo} />
      <StatCard label="In Progress" value={stats.inProgress} />
      <StatCard label="Done" value={stats.done} />
    </div>
  );
}
