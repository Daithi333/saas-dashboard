import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ItemsFilter } from "./items-filter";

const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => mockSearchParams,
}));

describe("ItemsFilter", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("should render status filter with all options", () => {
    const { getByLabelText } = render(<ItemsFilter />);
    const select = getByLabelText("Filter by status") as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.options).toHaveLength(4);
  });

  it("should render sort select with all options", () => {
    const { getByLabelText } = render(<ItemsFilter />);
    const select = getByLabelText("Sort items") as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.options).toHaveLength(4);
  });

  it("should not show clear button when no filters active", () => {
    const { queryByText } = render(<ItemsFilter />);
    expect(queryByText("Clear filters")).not.toBeInTheDocument();
  });
});
