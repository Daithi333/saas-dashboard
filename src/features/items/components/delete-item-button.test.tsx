import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { DeleteItemButton } from "./delete-item-button";

vi.mock("../actions/item-actions", () => ({
  deleteItem: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: Object.assign(vi.fn(), { success: vi.fn() }),
}));

describe("DeleteItemButton", () => {
  it("should render with correct text", () => {
    const { getByText } = render(<DeleteItemButton id="test-123" />);
    expect(getByText("Delete")).toBeInTheDocument();
  });

  it("should render as a button element", () => {
    const { getByRole } = render(<DeleteItemButton id="test-123" />);
    expect(getByRole("button")).toBeInTheDocument();
  });
});
