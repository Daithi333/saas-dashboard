"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { ActionState, Status } from "../models/items";
import styles from "./item-form.module.css";

interface ItemFormProps {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: {
    title: string;
    description: string;
    status: Status;
  };
  submitLabel: string;
  cancelHref: string;
}

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: "TODO", label: "Todo" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
];

export function ItemForm({
  action,
  defaultValues,
  submitLabel,
  cancelHref,
}: ItemFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.fieldGroup}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={defaultValues?.title}
          className={styles.input}
          required
        />
        {state.errors?.title && (
          <p className={styles.error}>{state.errors.title}</p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description}
          className={styles.textarea}
        />
        {state.errors?.description && (
          <p className={styles.error}>{state.errors.description}</p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="status" className={styles.label}>
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={defaultValues?.status ?? "TODO"}
          className={styles.select}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {state.errors?.status && (
          <p className={styles.error}>{state.errors.status}</p>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          disabled={isPending}
          className={styles.submitButton}
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
        <Link href={cancelHref} className={styles.cancelLink}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
