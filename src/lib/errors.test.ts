import { describe, it, expect } from "vitest";
import { NotFoundError, ConflictError, ValidationError, AppError } from "./errors";

describe("errors", () => {
  describe("NotFoundError", () => {
    it("should include resource and id in message", () => {
      const error = new NotFoundError("Item", "abc123");
      expect(error.message).toBe('Item with id "abc123" not found');
      expect(error.code).toBe("NOT_FOUND");
      expect(error.statusCode).toBe(404);
    });

    it("should handle missing id", () => {
      const error = new NotFoundError("Item");
      expect(error.message).toBe("Item not found");
    });

    it("should be an instance of AppError", () => {
      const error = new NotFoundError("Item");
      expect(error).toBeInstanceOf(AppError);
    });
  });

  describe("ConflictError", () => {
    it("should set correct code and status", () => {
      const error = new ConflictError("Item already exists");
      expect(error.message).toBe("Item already exists");
      expect(error.code).toBe("CONFLICT");
      expect(error.statusCode).toBe(409);
    });
  });

  describe("ValidationError", () => {
    it("should include field-level details", () => {
      const error = new ValidationError("Invalid input", {
        title: "Title is required",
      });
      expect(error.code).toBe("VALIDATION_ERROR");
      expect(error.statusCode).toBe(422);
      expect(error.details).toEqual({ title: "Title is required" });
    });
  });
});
