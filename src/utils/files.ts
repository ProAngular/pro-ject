import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TEMPLATES_DIR } from "../constants/templates-dir.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Copies a file from the `TEMPLATES_DIR` directory to a target location.
 *
 * @param relPath The relative path within the TEMPLATES_DIR directory
 * @param targetAbsPath The absolute path where the file should be copied to
 */
export function copyFileFromTemplates(
  relPath: string,
  targetAbsPath: string
): void {
  const from = path.join(templatesRoot(), relPath);
  fs.mkdirSync(path.dirname(targetAbsPath), { recursive: true });
  fs.copyFileSync(from, targetAbsPath);
}

/**
 * Copies a template file from the TEMPLATES_DIR directory to a target location,
 * replacing placeholders with actual values.
 *
 * @param relPath The relative path to the template file
 * @param targetAbsPath The absolute path where the file should be copied to
 * @param replacements An object mapping placeholder strings to their replacement values
 */
export function copyTemplateAndReplace(
  relPath: string,
  targetAbsPath: string,
  replacements: Record<string, string>
): void {
  const from = path.join(templatesRoot(), relPath);
  const raw = fs.readFileSync(from, "utf8");
  const out = Object.entries(replacements).reduce(
    (acc, [key, value]) => acc.split(key).join(value),
    raw
  );
  fs.mkdirSync(path.dirname(targetAbsPath), { recursive: true });
  fs.writeFileSync(targetAbsPath, out, "utf8");
}

/**
 * Gets the absolute path to the TEMPLATES_DIR directory.
 *
 * @returns The absolute path to the TEMPLATES_DIR directory.
 */
export function templatesRoot(): string {
  return path.resolve(__dirname, `../${TEMPLATES_DIR}`);
}
