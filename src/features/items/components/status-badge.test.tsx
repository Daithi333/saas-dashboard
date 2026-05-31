import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { StatusBadge } from "./status-badge";

describe("StatusBadge", () => {
  it("should render the correct label for TODO status", () => {
    const { getByText } = render(<StatusBadge status="TODO" />);
    expect(getByText("Todo")).toBeInTheDocument();
  });

  it("should render the correct label for IN_PROGRESS status", () => {
    const { getByText } = render(<StatusBadge status="IN_PROGRESS" />);
    expect(getByText("In Progress")).toBeInTheDocument();
  });

  it("should render the correct label for DONE status", () => {
    const { getByText } = render(<StatusBadge status="DONE" />);
    expect(getByText("Done")).toBeInTheDocument();
  });
});
