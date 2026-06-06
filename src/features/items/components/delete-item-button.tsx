"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { deleteItem } from "../actions/item-actions";

interface DeleteItemButtonProps {
  id: string;
}

export function DeleteItemButton({ id }: DeleteItemButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    toast("Are you sure you want to delete this item?", {
      action: {
        label: "Delete",
        onClick: () => {
          startTransition(() => {
            deleteItem(id);
          });
          toast.success("Item deleted");
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
