import path from "node:path";
import { readJsonLoose } from "./json.js";
import { VERSIONS } from "../constants/versions.js";

/**
 * Returns the @angular/core version from the created workspace if available.
 * Falls back to VERSIONS["@angular/cli"] major if not resolvable.
 *
 * @param targetDir The target directory of the Angular workspace.
 * @returns The Angular version string.
 */
export function getWorkspaceAngularVersion(targetDir: string): string {
  const pkgPath = path.join(targetDir, "package.json");
  const pkg = readJsonLoose<Record<string, any>>(pkgPath);
  const core = pkg?.dependencies?.["@angular/core"] as string | undefined;
  if (core) return core;

  // Fallback: use ng CLI major
  const cli = VERSIONS["@angular/cli"];

  // Example "^20.1.7" -> "^20"
  const major = cli.replace(/^\^?(\d+).*/, "^$1");
  return major || "^20";
}
