import { describe, it, expect, vi, beforeEach } from "vitest";

describe("config", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("should throw when DATABASE_URL is missing", async () => {
    vi.stubEnv("DATABASE_URL", "");

    await expect(
      import("./config")
    ).rejects.toThrow("Missing required environment variable: DATABASE_URL");
  });

  it("should parse valid config when DATABASE_URL is set", async () => {
    vi.stubEnv("DATABASE_URL", "postgresql://user:pass@localhost:5432/db");
    vi.stubEnv("NODE_ENV", "test");

    const { config } = await import("./config");

    expect(config.databaseUrl).toBe("postgresql://user:pass@localhost:5432/db");
    expect(config.nodeEnv).toBe("test");
  });
});
