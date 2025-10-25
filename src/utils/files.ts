import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Gets the absolute path to the 'files' directory.
 *
 * @returns The absolute path to the 'files' directory.
 */
export function filesRoot(): string {
  return path.resolve(__dirname, "../files");
}

/**
 * Copies a file from the 'files' directory to a target location.
 *
 * @param relPath The relative path within the 'files' directory
 * @param targetAbsPath The absolute path where the file should be copied to
 */
export function copyFileFromTemplates(relPath: string, targetAbsPath: string) {
  const from = path.join(filesRoot(), relPath);
  fs.mkdirSync(path.dirname(targetAbsPath), { recursive: true });
  fs.copyFileSync(from, targetAbsPath);
}
