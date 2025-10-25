import { promises as fs } from "node:fs";
import * as path from "node:path";
import type { WizardContext } from "../utils/types.js";
import { log } from "../utils/log.js";

type FolderDef = {
  description: string;
  dir: string;
  title: string;
};

const FOLDERS: FolderDef[] = [
  {
    description: "Standalone, reusable Angular UI components.",
    dir: "components",
    title: "components",
  },
  {
    description: "Constant values used across the Angular app.",
    dir: "constants",
    title: "constants",
  },
  {
    description: "Custom TypeScript and Angular decorators.",
    dir: "decorators",
    title: "decorators",
  },
  {
    description: "Attribute and structural directives for DOM behavior.",
    dir: "directives",
    title: "directives",
  },
  {
    description: "Enum definitions for shared values and states.",
    dir: "enums",
    title: "enums",
  },
  {
    description: "Route guards for access control and navigation logic.",
    dir: "guards",
    title: "guards",
  },
  {
    description:
      "Layout components and templates such as header, footer, and nav.",
    dir: "layout",
    title: "layout",
  },
  {
    description: "Frontend data models and interfaces.",
    dir: "models",
    title: "models",
  },
  {
    description: "Routed page components for the application.",
    dir: "pages",
    title: "pages",
  },
  {
    description: "Custom Angular pipes for data transformation.",
    dir: "pipes",
    title: "pipes",
  },
  {
    description:
      "Angular providers such as interceptors and app-wide injection tokens.",
    dir: "providers",
    title: "providers",
  },
  {
    description:
      "Route config, route-level helpers, and feature route definitions.",
    dir: "routing",
    title: "routing",
  },
  {
    description: "Injectable services for HTTP, state, and storage.",
    dir: "services",
    title: "services",
  },
  {
    description: "Angular signal stores and reactive state utilities.",
    dir: "signals",
    title: "signals",
  },
  {
    description: "Global and component-level SCSS partials.",
    dir: "styles",
    title: "styles",
  },
  {
    description: "Shared TypeScript type definitions for the UI.",
    dir: "types",
    title: "types",
  },
  {
    description: "General purpose helpers and utility functions.",
    dir: "utilities",
    title: "utilities",
  },
];

function readmeMarkdown(title: string, description: string): string {
  return `# ${title}\n\n${description}\n\n> This placeholder file explains the purpose of \`${title}/\`.\n`;
}

export async function addOpinionatedStructure(
  ctx: WizardContext
): Promise<void> {
  const appRoot = path.join(ctx.targetDir, "src", "app");
  await fs.mkdir(appRoot, { recursive: true });

  for (const f of FOLDERS) {
    const dirPath = path.join(appRoot, f.dir);
    const readmePath = path.join(dirPath, "README.md");
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(
      readmePath,
      readmeMarkdown(f.title, f.description),
      "utf8"
    );
  }

  log("Created opinionated src/app structure with README placeholders.");
}
