import type { Status } from "../models/items";
import styles from "./status-badge.module.css";

interface StatusBadgeProps {
  status: Status;
}

const config: Record<Status, { label: string; variant: string }> = {
  TODO: { label: "Todo", variant: styles.todo },
  IN_PROGRESS: { label: "In Progress", variant: styles.inProgress },
  DONE: { label: "Done", variant: styles.done },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, variant } = config[status];
  return (
    <span className={`${styles.badge} ${variant}`}>
      {label}
    </span>
  );
}
