import { createItem } from "@/features/items/actions/item-actions";
import { ItemForm } from "@/features/items/components/item-form";

export default function NewItemPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Create New Item
      </h1>
      <ItemForm
        action={createItem}
        submitLabel="Create Item"
        cancelHref="/"
      />
    </div>
  );
}
