import fs from "node:fs";
import path from "node:path";
import { addAnimationsCompat } from "../utils/shell.js";
import type { WizardContext } from "../utils/types.js";
import { log } from "../utils/log.js";

/**
 * Adds Angular Animations to the project.
 *
 * @param ctx The wizard context.
 */
export async function addAnimations(ctx: WizardContext): Promise<void> {
  await addAnimationsCompat(ctx.targetDir);

  const appConfigPath = path.join(ctx.targetDir, "src", "app", "app.config.ts");
  if (!fs.existsSync(appConfigPath)) {
    console.warn(
      `Skipped wiring animations (missing ${path.relative(
        ctx.targetDir,
        appConfigPath
      )}).`
    );
    return;
  }

  let src = fs.readFileSync(appConfigPath, "utf8");

  // Add import
  const importStmt = `import { provideAnimations } from '@angular/platform-browser/animations';`;
  if (!src.includes(`from '@angular/platform-browser/animations'`)) {
    // insert after last import
    const lastImportIdx =
      [...src.matchAll(/^\s*import .*?;$/gm)].pop()?.index ?? 0;
    const insertAt =
      lastImportIdx > 0 ? src.indexOf("\n", lastImportIdx)! + 1 : 0;
    src = src.slice(0, insertAt) + importStmt + "\n" + src.slice(insertAt);
  }

  // Make sure providers array exists and includes provideAnimations()
  if (
    !src.includes("provideAnimations(") &&
    !src.includes("provideAnimations()")
  ) {
    // Try to insert before the closing `]` of the providers array
    src = src.replace(
      /(providers\s*:\s*\[\s*)((?:.|\n)*?)(\])/m, // match providers array
      (_m, start, mid, end) => {
        const trimmedMid = mid.trim();
        const needsComma = trimmedMid && !/[,]\s*$/.test(trimmedMid);
        const comma = needsComma ? ", " : "";
        return `${start}${trimmedMid}${comma}provideAnimations()${end}`;
      }
    );

    // If no providers array matched, add one to the config object
    if (!/provideAnimations\(\)/.test(src)) {
      src = src.replace(
        /(export\s+const\s+\w+\s*:\s*ApplicationConfig\s*=\s*\{\s*)([^]*?)(\}\s*;)/m,
        (_m, start, mid, end) => {
          // If there is already a providers property elsewhere, don't duplicate.
          if (/providers\s*:/.test(mid)) return start + mid + end;
          return `${start}providers: [provideAnimations()], ${mid}${end}`;
        }
      );
    }
  }

  fs.writeFileSync(appConfigPath, src, "utf8");
  log("Animations configured.");
}
