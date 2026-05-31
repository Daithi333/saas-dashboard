import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ItemDetail } from "./item-detail";
import type { Item } from "../models/items";

const mockItem: Item = {
  id: "test-123",
  title: "Test Item",
  description: "A test description",
  status: "IN_PROGRESS",
  createdAt: new Date("2025-01-15"),
  updatedAt: new Date("2025-01-20"),
};

describe("ItemDetail", () => {
  it("should render the item title", () => {
    const { getByText } = render(<ItemDetail item={mockItem} />);
    expect(getByText("Test Item")).toBeInTheDocument();
  });

  it("should render the description", () => {
    const { getByText } = render(<ItemDetail item={mockItem} />);
    expect(getByText("A test description")).toBeInTheDocument();
  });

  it("should render the status badge", () => {
    const { getByText } = render(<ItemDetail item={mockItem} />);
    expect(getByText("In Progress")).toBeInTheDocument();
  });

  it("should show placeholder when description is empty", () => {
    const itemWithoutDescription = { ...mockItem, description: "" };
    const { getByText } = render(<ItemDetail item={itemWithoutDescription} />);
    expect(getByText("No description provided.")).toBeInTheDocument();
  });

  it("should render a link back to the dashboard", () => {
    const { getByRole } = render(<ItemDetail item={mockItem} />);
    const link = getByRole("link", { name: /back to dashboard/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
