import path from "node:path";
import fs from "node:fs";
import type { WizardContext } from "../utils/types.js";
import { npmInstall } from "../utils/shell.js";
import { readJsonLoose, writeJson } from "../utils/json.js";
import { VERSIONS } from "../constants/versions.js";
import { log } from "../utils/log.js";

/**
 * Adds Luxon and the Angular Material Luxon adapter to the project.
 *
 * @param ctx The wizard context containing the target directory.
 */
export async function addLuxon(ctx: WizardContext): Promise<void> {
  // Install packages
  await npmInstall(
    [
      `luxon@${VERSIONS.luxon}`,
      `@angular/material-luxon-adapter@${VERSIONS["@angular/material-luxon-adapter"]}`,
    ],
    ctx.targetDir
  );

  // Install dev packages
  await npmInstall(
    ["-D", `@types/luxon@${VERSIONS["@types/luxon"]}`],
    ctx.targetDir
  );

  // Merge into package.json
  const pkgPath = path.join(ctx.targetDir, "package.json");
  const pkg = readJsonLoose<Record<string, any>>(pkgPath) ?? {};
  pkg.dependencies = {
    ...(pkg.dependencies ?? {}),
    luxon: pkg.dependencies?.luxon ?? VERSIONS.luxon,
    "@angular/material-luxon-adapter":
      pkg.dependencies?.["@angular/material-luxon-adapter"] ??
      VERSIONS["@angular/material-luxon-adapter"],
  };
  pkg.devDependencies = {
    ...(pkg.devDependencies ?? {}),
    "@types/luxon":
      pkg.devDependencies?.["@types/luxon"] ?? VERSIONS["@types/luxon"],
  };
  writeJson(pkgPath, pkg);

  // If Angular Material is used, wire MatLuxonDateModule into `app.config.ts`
  const hasMaterial =
    !!pkg.dependencies?.["@angular/material"] ||
    !!pkg.devDependencies?.["@angular/material"]; // just in case

  if (hasMaterial) {
    const appConfigPath = path.join(
      ctx.targetDir,
      "src",
      "app",
      "app.config.ts"
    );
    if (fs.existsSync(appConfigPath)) {
      let text = fs.readFileSync(appConfigPath, "utf8");

      // Ensure import of importProvidersFrom
      if (
        !/import\s*\{\s*importProvidersFrom\s*\}\s*from\s*'@angular\/core'/.test(
          text
        )
      ) {
        // If @angular/core import exists, extend it or else add a new one
        if (/from '@angular\/core'/.test(text)) {
          text = text.replace(
            /import\s*\{([^}]*)\}\s*from\s*'@angular\/core';?/,
            (m, g1) => {
              const names = g1
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean);
              if (!names.includes("importProvidersFrom"))
                names.push("importProvidersFrom");
              return `import { ${Array.from(new Set(names)).join(", ")} } from '@angular/core';`;
            }
          );
        } else {
          text =
            `import { importProvidersFrom } from '@angular/core';\n` + text;
        }
      }

      // Ensure MatLuxonDateModule import
      if (!/from '@angular\/material-luxon-adapter'/.test(text)) {
        text =
          `import { MatLuxonDateModule } from '@angular/material-luxon-adapter';\n` +
          text;
      }

      // Inject importProvidersFrom(MatLuxonDateModule) into providers array
      // Look for providers: [ ... ] in the export default applicationConfig
      if (/providers\s*:\s*\[([\s\S]*?)\]/m.test(text)) {
        if (!/importProvidersFrom\(\s*MatLuxonDateModule\s*\)/.test(text)) {
          text = text.replace(/providers\s*:\s*\[([\s\S]*?)\]/m, (m, inner) => {
            const trimmed = inner.trim();
            const prefix =
              trimmed.length && !/[,]\s*$/.test(trimmed)
                ? `${inner.trimEnd()}, `
                : inner;
            return `providers: [${prefix}importProvidersFrom(MatLuxonDateModule)]`;
          });
        }
      } else {
        // Add a providers array to the config object
        text = text.replace(
          /export\s+const\s+appConfig\s*=\s*{\s*/m,
          `export const appConfig = {\n  providers: [importProvidersFrom(MatLuxonDateModule)],\n`
        );
      }

      fs.writeFileSync(appConfigPath, text, "utf8");
      log("Wired MatLuxonDateModule into app.config.ts");
    } else {
      console.warn(
        "[luxon] Could not find src/app/app.config.ts to wire MatLuxonDateModule. Skipping."
      );
    }
  } else {
    log(
      "Angular Material not detected; installed Luxon + adapter but did not wire MatLuxonDateModule."
    );
  }

  log("Luxon configured.");
}
