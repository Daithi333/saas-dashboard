import { notFound } from "next/navigation";
import { getItem } from "@/features/items/data/items-data";
import { updateItem } from "@/features/items/actions/item-actions";
import { ItemForm } from "@/features/items/components/item-form";
import { NotFoundError } from "@/lib/errors";

interface EditItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditItemPage({ params }: EditItemPageProps) {
  const { id } = await params;

  let item;
  try {
    item = await getItem(id);
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }

  const boundUpdateItem = updateItem.bind(null, id);

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Edit Item</h1>
      <ItemForm
        action={boundUpdateItem}
        defaultValues={{
          title: item.title,
          description: item.description,
          status: item.status,
        }}
        submitLabel="Save Changes"
        cancelHref={`/items/${id}`}
      />
    </div>
  );
}
