import fs from "node:fs";
import path from "node:path";
import { npmInstall } from "../utils/shell.js";
import type { WizardContext } from "../utils/types.js";
import { copyFileFromTemplates, templatesRoot } from "../utils/files.js";
import { readJsonLoose, writeJson } from "../utils/json.js";
import { VERSIONS } from "../constants/versions.js";
import { log } from "../utils/log.js";

/**
 * Adds Prettier formatting to the Angular project.
 *
 * @param ctx The wizard context.
 */
export async function addPrettier(ctx: WizardContext): Promise<void> {
  // Install dev deps
  await npmInstall(
    [
      "-D",
      `prettier@${VERSIONS.prettier}`,
      `@trivago/prettier-plugin-sort-imports@${VERSIONS["@trivago/prettier-plugin-sort-imports"]}`,
    ],
    ctx.targetDir
  );

  // Copy template files
  copyFileFromTemplates(
    "prettier/.prettierignore",
    path.join(ctx.targetDir, ".prettierignore")
  );
  copyFileFromTemplates(
    "prettier/prettier.config.js",
    path.join(ctx.targetDir, "prettier.config.js")
  );

  // Update VSCode settings
  const vscodeDir = path.join(ctx.targetDir, ".vscode");
  fs.mkdirSync(vscodeDir, { recursive: true });

  const extPath = path.join(vscodeDir, "extensions.json");
  const settingsPath = path.join(vscodeDir, "settings.json");

  // Merge or create extensions
  const existingExt =
    readJsonLoose<{ recommendations?: string[] }>(extPath) ?? {};
  const recs = new Set([...(existingExt.recommendations ?? [])]);
  recs.add("esbenp.prettier-vscode");
  writeJson(extPath, { recommendations: [...recs] });

  // Merge or create settings
  const existingSettings =
    readJsonLoose<Record<string, unknown>>(settingsPath) ?? {};
  const baseSettings =
    readJsonLoose<Record<string, unknown>>(
      path.join(templatesRoot(), "vscode/settings.json")
    ) ?? {};
  writeJson(settingsPath, { ...baseSettings, ...existingSettings });

  // Update package.json scripts and devDependencies
  const pkgPath = path.join(ctx.targetDir, "package.json");
  const pkg = readJsonLoose<Record<string, any>>(pkgPath) ?? {};
  pkg.devDependencies = {
    ...(pkg.devDependencies ?? {}),
    prettier: pkg.devDependencies?.prettier ?? VERSIONS.prettier,
    "@trivago/prettier-plugin-sort-imports":
      pkg.devDependencies?.["@trivago/prettier-plugin-sort-imports"] ??
      VERSIONS["@trivago/prettier-plugin-sort-imports"],
  };
  pkg.scripts = {
    ...(pkg.scripts ?? {}),
    format: "prettier --write .",
    "format:check": "prettier --check .",
  };
  writeJson(pkgPath, pkg);

  log("Prettier configured.");
}
