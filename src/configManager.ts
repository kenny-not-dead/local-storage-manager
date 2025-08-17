import { execSync } from "child_process";
import { dirname, resolve } from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONFIG_PATH = resolve(__dirname, "config.js");

export function configEditCommand(): void {
  if (!existsSync(CONFIG_PATH)) {
    console.error(`Config file not found: ${CONFIG_PATH}`);
    process.exit(1);
  }

  const editor = process.env.EDITOR || "vim";

  try {
    console.log(`Opening ${CONFIG_PATH} in ${editor}...`);
    execSync(`${editor} "${CONFIG_PATH}"`, { stdio: "inherit" });
    console.log("Config saved.");
  } catch (err) {
    console.error("Failed to open editor. Is it installed?");
    process.exit(1);
  }
}