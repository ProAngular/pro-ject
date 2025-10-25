import path from "node:path";
import { readJsonLoose, writeJson } from "../utils/json.js";
import type { WizardContext } from "../utils/types.js";

/**
 * Ensures that the Angular project has a 'serve' target in angular.json.
 *
 * @param ctx The wizard context.
 * @returns Promise that resolves when the operation is complete.
 */
export async function ensureServeTarget(ctx: WizardContext): Promise<void> {
  const ngPath = path.join(ctx.targetDir, "angular.json");
  const ng = readJsonLoose<any>(ngPath);
  if (!ng?.projects) return;

  const projectName = Object.keys(ng.projects)[0];
  const project = ng.projects[projectName];
  if (!project) return;

  const targets = project.targets ?? project.architect ?? {};
  const hasServe = Boolean(targets.serve);

  if (!hasServe) {
    targets.serve = {
      builder: "@angular/build:dev-server",
      options: { buildTarget: `${projectName}:build` },
    };
    if (project.targets) project.targets = targets;
    else project.architect = targets;

    ng.cli = ng.cli ?? {};
    ng.cli.defaultProject = ng.cli.defaultProject ?? projectName;

    writeJson(ngPath, ng);
    console.log(`Added 'serve' target to ${projectName}.`);
  }
}
