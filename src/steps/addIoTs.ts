import path from "node:path";
import type { WizardContext } from "../utils/types.js";
import { npmInstall } from "../utils/shell.js";
import { readJsonLoose, writeJson } from "../utils/json.js";
import { VERSIONS } from "../utils/versions.js";

export async function addIoTs(ctx: WizardContext): Promise<void> {
  // Install
  await npmInstall([`io-ts@${VERSIONS["io-ts"]}`], ctx.targetDir);

  // Update package.json
  const pkgPath = path.join(ctx.targetDir, "package.json");
  const pkg = readJsonLoose<Record<string, any>>(pkgPath) ?? {};
  pkg.dependencies = {
    ...(pkg.dependencies ?? {}),
    "io-ts": pkg.dependencies?.["io-ts"] ?? VERSIONS["io-ts"],
  };
  writeJson(pkgPath, pkg);

  console.log("io-ts installed.");
}
