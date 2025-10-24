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
 * Sanitize a string to a kebab-case format.
 *
 * @param input The input string
 * @returns The sanitized kebab-case string
 */
export function sanitizeToKebab(input: string): string {
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();
  // Replace any run of invalid chars with a single hyphen
  // Keep only a-z 0-9 - and start with letter
  let kebab = lower
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
  if (!/^[a-z]/.test(kebab) && kebab.length > 0) {
    kebab = `a-${kebab}`;
  }
  return kebab || "my-project";
}
