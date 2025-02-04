import { promises as fs } from "node:fs";
import path from "node:path";

async function writeEnvFile(envVars: Record<string, string>) {
  console.log("Writing environment variables to .env");
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  await fs.writeFile(path.join(process.cwd(), ".env"), envContent);
  console.log(".env file created with the necessary variables.");
}

async function main() {
  await writeEnvFile({ DB_FILE_NAME: "file:local.db" });

  console.log("🎉 Setup completed successfully!");
}

void main();
