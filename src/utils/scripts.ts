/**
 * Merge a script into an existing script, avoiding duplicates.
 *
 * @param existing The existing script
 * @param inject The script to inject
 * @returns The merged script
 */
export function mergeScript(
  existing: string | undefined,
  inject: string
): string {
  if (!existing) {
    return inject;
  }

  // Avoid duplicate injection
  if (existing.includes(inject)) {
    return existing;
  }

  return `${existing} && ${inject}`;
}
