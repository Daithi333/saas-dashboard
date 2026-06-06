"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ValidationError } from "@/lib/errors";
import * as itemsData from "../data/items-data";
import type { ActionState, Status } from "../models/items";

const VALID_STATUSES: Status[] = ["TODO", "IN_PROGRESS", "DONE"];

function validateItemInput(formData: FormData): {
  title: string;
  description: string;
  status: Status;
} {
  const title = formData.get("title")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim() ?? "";
  const status = formData.get("status")?.toString() ?? "";

  const errors: Record<string, string> = {};

  if (!title) {
    errors.title = "Title is required";
  } else if (title.length > 200) {
    errors.title = "Title must be 200 characters or fewer";
  }

  if (description.length > 2000) {
    errors.description = "Description must be 2000 characters or fewer";
  }

  if (!VALID_STATUSES.includes(status as Status)) {
    errors.status = "Invalid status";
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError("Invalid input", errors);
  }

  return { title, description, status: status as Status };
}

export async function createItem(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  let input;
  try {
    input = validateItemInput(formData);
  } catch (error) {
    if (error instanceof ValidationError) {
      return { errors: error.details };
    }
    throw error;
  }

  await itemsData.createItem(input);

  revalidatePath("/");
  redirect("/");
}

export async function updateItem(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  let input;
  try {
    input = validateItemInput(formData);
  } catch (error) {
    if (error instanceof ValidationError) {
      return { errors: error.details };
    }
    throw error;
  }

  await itemsData.updateItem(id, input);

  revalidatePath("/");
  revalidatePath(`/items/${id}`);
  redirect(`/items/${id}`);
}

export async function deleteItem(id: string): Promise<void> {
  await itemsData.deleteItem(id);

  revalidatePath("/");
  redirect("/");
}
