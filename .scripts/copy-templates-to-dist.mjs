import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = "templates"; // Keep in sync with src/constants/templates-dir.ts

const src = path.resolve(__dirname, `../src/${TEMPLATES_DIR}`);
const dst = path.resolve(__dirname, `../dist/${TEMPLATES_DIR}`);

function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const srcPath = path.join(from, e.name);
    const dstPath = path.join(to, e.name);
    if (e.isDirectory()) copyDir(srcPath, dstPath);
    else fs.copyFileSync(srcPath, dstPath);
  }
}

copyDir(src, dst);
