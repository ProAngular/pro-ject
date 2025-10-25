import validate from "validate-npm-package-name";

/**
 * Validates if a string is a valid npm package name.
 *
 * @param name The package name to validate
 * @returns An object indicating if the name is valid and the reason if not
 */
export function isValidPackageName(name: string): {
  ok: boolean;
  reason?: string;
} {
  const res = validate(name);
  if (!res.validForNewPackages) {
    const problems = [...(res.errors ?? []), ...(res.warnings ?? [])].join(
      "; "
    );
    return { ok: false, reason: problems || "Invalid package name" };
  }
  // Angular CLI also forbids some characters in project names used as directory names
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    return {
      ok: false,
      reason:
        "Use lowercase letters, numbers, and hyphens only. Must start with a letter.",
    };
  }
  if (name.length > 214) {
    return { ok: false, reason: "Name too long" };
  }
  return { ok: true };
}

/**
 * Kebab for Angular prefixes and project names.
 *
 * @param input The input string to sanitize
 * @returns A sanitized kebab-case string suitable for Angular project names
 */
export function sanitizeToKebab(input: string): string {
  let kebab = toKebab(input);
  if (!kebab) return "my-project";
  if (!/^[a-z]/.test(kebab)) kebab = `a-${kebab}`;
  return kebab;
}

/**
 * Basic kebab-case normalizer.
 *
 * @param input The input string to convert
 * @returns The kebab-case version of the input string
 */
export function toKebab(input: string): string {
  return input
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}
