import fs from "node:fs";
import path from "node:path";
import type { WizardContext } from "../utils/types.js";
import { npmInstall } from "../utils/shell.js";
import { readJsonLoose, writeJson } from "../utils/json.js";
import { execa } from "execa";
import { mergeScript } from "../utils/scripts.js";

export async function addHusky(ctx: WizardContext): Promise<void> {
  console.log("Adding Husky pre-commit hooks...");

  await npmInstall(["-D", "husky@^9.1.7", "is-ci@^3.0.1"], ctx.targetDir);

  const pkgPath = path.join(ctx.targetDir, "package.json");
  const pkg = readJsonLoose<Record<string, any>>(pkgPath) ?? {};

  const scripts = pkg.scripts ?? {};
  scripts.prepare = mergeScript(scripts.prepare, "husky install");
  scripts.postinstall = mergeScript(
    scripts.postinstall,
    "is-ci || husky install"
  );

  pkg.scripts = scripts;
  pkg.devDependencies = {
    ...(pkg.devDependencies ?? {}),
    husky: pkg.devDependencies?.husky ?? "^9.1.7",
    "is-ci": pkg.devDependencies?.["is-ci"] ?? "^3.0.1",
  };
  writeJson(pkgPath, pkg);

  let inGitRepo = false;
  try {
    const { stdout } = await execa(
      "git",
      ["rev-parse", "--is-inside-work-tree"],
      {
        cwd: ctx.targetDir,
        stdio: "pipe",
      }
    );
    inGitRepo = stdout.trim() === "true";
  } catch {
    inGitRepo = false;
  }

  if (!inGitRepo) {
    console.warn(
      "[husky] This directory is not a Git repository. Initializing Git..."
    );
    try {
      await execa("git", ["init"], { cwd: ctx.targetDir, stdio: "inherit" });
      inGitRepo = true;
    } catch {
      console.warn(
        "[husky] Could not init Git. Hooks will be copied but not installed."
      );
    }
  }

  if (inGitRepo) {
    try {
      await execa("npx", ["--yes", "husky", "install"], {
        cwd: ctx.targetDir,
        stdio: "inherit",
      });
    } catch {
      try {
        await execa("npm", ["run", "prepare"], {
          cwd: ctx.targetDir,
          stdio: "inherit",
        });
      } catch {
        console.warn("[husky] Failed to run husky install. Continuing...");
      }
    }
  }

  const huskyDir = path.join(ctx.targetDir, ".husky");
  fs.mkdirSync(huskyDir, { recursive: true });

  const targetHook = path.join(huskyDir, "pre-commit");

  const hasPrettier =
    fs.existsSync(path.join(ctx.targetDir, "prettier.config.js")) ||
    fs.existsSync(path.join(ctx.targetDir, ".prettierrc")) ||
    fs.existsSync(path.join(ctx.targetDir, ".prettierrc.js")) ||
    fs.existsSync(path.join(ctx.targetDir, ".prettierrc.cjs")) ||
    fs.existsSync(path.join(ctx.targetDir, ".prettierrc.json")) ||
    !!pkg.devDependencies?.prettier ||
    !!pkg.scripts?.format ||
    !!pkg.scripts?.["format:check"];

  const hasEslint =
    fs.existsSync(path.join(ctx.targetDir, "eslint.config.js")) ||
    !!pkg.devDependencies?.eslint ||
    !!pkg.scripts?.lint;

  const lines: string[] = [
    "#!/usr/bin/env sh",
    "set -e",
    '. "$(dirname -- "$0")/_/husky.sh"',
    "",
  ];

  if (hasPrettier) {
    lines.push(
      pkg.scripts?.["format:check"]
        ? "npm run format:check"
        : "npx prettier --check ."
    );
  }

  if (hasEslint) {
    lines.push(pkg.scripts?.lint ? "npm run lint" : "npx eslint . --cache");
  }

  lines.push("git add --update", "");

  const existed = fs.existsSync(targetHook);
  let content: string;

  if (existed) {
    const current = fs.readFileSync(targetHook, "utf8").split("\n");
    const merged = [...current];

    for (const ln of lines) {
      if (!current.includes(ln)) {
        const insertAt = merged.length > 0 ? merged.length : 0;
        merged.splice(insertAt, 0, ln);
      }
    }
    content = merged.join("\n");
  } else {
    content = lines.join("\n");
  }

  content = content.replace(/\r\n/g, "\n");
  fs.writeFileSync(targetHook, content, "utf8");

  try {
    await fs.promises.chmod(targetHook, 0o755);
  } catch {
    // ignore on platforms where chmod is a no-op
  }

  console.log("Husky configured.");
}
