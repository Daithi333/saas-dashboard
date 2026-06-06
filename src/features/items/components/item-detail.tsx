import Link from "next/link";
import type { Item } from "../models/items";
import { StatusBadge } from "./status-badge";
import { DeleteItemButton } from "./delete-item-button";
import styles from "./item-detail.module.css";

interface ItemDetailProps {
  item: Item;
}

export function ItemDetail({ item }: ItemDetailProps) {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        &larr; Back to Dashboard
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>{item.title}</h1>
        <div className="flex items-center gap-3">
          <StatusBadge status={item.status} />
          <Link
            href={`/items/${item.id}/edit`}
            className="rounded-md border px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit
          </Link>
          <DeleteItemButton id={item.id} />
        </div>
      </div>

      <div className={styles.meta}>
        <div>
          <p className={styles.metaLabel}>Status</p>
          <p className={styles.metaValue}>{item.status.replace("_", " ")}</p>
        </div>
        <div>
          <p className={styles.metaLabel}>Created</p>
          <p className={styles.metaValue}>
            {item.createdAt.toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className={styles.metaLabel}>Updated</p>
          <p className={styles.metaValue}>
            {item.updatedAt.toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className={styles.descriptionSection}>
        <p className={styles.descriptionLabel}>Description</p>
        {item.description ? (
          <p className={styles.descriptionText}>{item.description}</p>
        ) : (
          <p className={styles.descriptionEmpty}>No description provided.</p>
        )}
      </div>
    </div>
  );
}
