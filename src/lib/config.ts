interface Config {
  databaseUrl: string;
  nodeEnv: "development" | "production" | "test";
}

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config: Config = {
  databaseUrl: requireEnv("DATABASE_URL"),
  nodeEnv: (process.env.NODE_ENV ?? "development") as Config["nodeEnv"],
};
