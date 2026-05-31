import Link from "next/link";
import type { Item } from "../models/items";
import { StatusBadge } from "./status-badge";
import styles from "./items-table.module.css";

interface ItemsTableProps {
  items: Item[];
}

export function ItemsTable({ items }: ItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        No items yet. Create one to get started.
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={styles.headerCell}>Title</th>
            <th className={styles.headerCell}>Status</th>
            <th className={styles.headerCell}>Created</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {items.map((item) => (
            <tr key={item.id} className={styles.row}>
              <td className={styles.cell}>
                <Link href={`/items/${item.id}`} className={styles.titleLink}>
                  {item.title}
                </Link>
              </td>
              <td className={styles.cell}>
                <StatusBadge status={item.status} />
              </td>
              <td className={styles.timestamp}>
                {item.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
