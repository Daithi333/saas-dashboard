import { notFound } from "next/navigation";
import { getItem } from "@/features/items/data/items-data";
import { ItemDetail } from "@/features/items/components/item-detail";
import { NotFoundError } from "@/lib/errors";

interface ItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
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

  return <ItemDetail item={item} />;
}
