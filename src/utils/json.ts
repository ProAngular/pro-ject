import fs from "node:fs";

export function readJsonLoose<T = any>(file: string): T | null {
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  try {
    // Remove // line comments
    let txt = raw.replace(/^\s*\/\/.*$/gm, "");
    // Remove /* block comments */
    txt = txt.replace(/\/\*[\s\S]*?\*\//g, "");
    // Remove trailing commas before } or ]
    txt = txt.replace(/,\s*([}\]])/g, "$1");
    return JSON.parse(txt) as T;
  } catch {
    // If it's not parseable, treat as missing instead of crashing
    return null;
  }
}

export function writeJson(file: string, data: unknown) {
  const out = JSON.stringify(data, null, 2) + "\n";
  fs.writeFileSync(file, out, "utf8");
}
