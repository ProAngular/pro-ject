const FONT_RESET = "\x1b[0m";
const FONT_BOLD = "\x1b[1m";

const COLOR = {
  none: "",
  bold: FONT_BOLD,
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
} as const;

const colorize = (c: string, s: string) =>
  process.stdout.isTTY && c ? c + s + FONT_RESET : s;

export function log(
  message: string,
  colorName: keyof typeof COLOR = "none",
  isHeader = false
): void {
  console.log(
    colorize(COLOR[colorName], isHeader ? getHeader(message) : message)
  );
}

function getHeader(label: string): string {
  const base = "─".repeat(8);
  const text = label ? ` ${label} ` : "";
  return text ? base + text + base : base + base;
}
