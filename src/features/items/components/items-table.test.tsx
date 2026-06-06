import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ItemsTable } from "./items-table";
import type { Item } from "../models/items";

const mockItems: Item[] = [
  {
    id: "1",
    title: "First item",
    description: "Description one",
    status: "TODO",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
  },
  {
    id: "2",
    title: "Second item",
    description: "Description two",
    status: "DONE",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
];

describe("ItemsTable", () => {
  it("should render empty state when no items", () => {
    const { getByText } = render(<ItemsTable items={[]} />);
    expect(getByText("No items yet. Create one to get started.")).toBeInTheDocument();
  });

  it("should render all items", () => {
    const { getByText } = render(<ItemsTable items={mockItems} />);
    expect(getByText("First item")).toBeInTheDocument();
    expect(getByText("Second item")).toBeInTheDocument();
  });

  it("should render status badges for each item", () => {
    const { getByText } = render(<ItemsTable items={mockItems} />);
    expect(getByText("Todo")).toBeInTheDocument();
    expect(getByText("Done")).toBeInTheDocument();
  });

  it("should link item titles to detail pages", () => {
    const { getByText } = render(<ItemsTable items={mockItems} />);
    const link = getByText("First item").closest("a");
    expect(link).toHaveAttribute("href", "/items/1");
  });

  it("should render table headers", () => {
    const { getByText } = render(<ItemsTable items={mockItems} />);
    expect(getByText("Title")).toBeInTheDocument();
    expect(getByText("Status")).toBeInTheDocument();
    expect(getByText("Created")).toBeInTheDocument();
  });
});
