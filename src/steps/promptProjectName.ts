import prompts from "prompts";
import path from "node:path";
import { sanitizeToKebab, isValidPackageName } from "../utils/name.js";
import type { WizardContext } from "../utils/types.js";

/**
 * Prompts the user for a project name and returns the wizard context.
 *
 * @param onCancel Callback for when the prompt is canceled.
 * @returns The wizard context.
 */
export async function promptProjectName(
  onCancel: () => never
): Promise<WizardContext> {
  const answers = await prompts(
    [
      {
        type: "text",
        name: "rawName",
        message: "Project name:",
        initial: "my-project",
        validate: (value: string) => {
          const sanitized = sanitizeToKebab(value);
          const res = isValidPackageName(sanitized);
          return res.ok ? true : `Invalid name: ${res.reason}`;
        },
      },
    ],
    { onCancel }
  );

  const projectName = sanitizeToKebab(answers.rawName);
  const { ok, reason } = isValidPackageName(projectName);
  if (!ok) throw new Error(`Invalid project name: ${reason}`);

  return {
    projectName,
    targetDir: path.resolve(process.cwd(), projectName),
  };
}
