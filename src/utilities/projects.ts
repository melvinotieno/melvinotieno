import { promises as fs } from "fs";
import path from "path";

type Project = {
  title: string;
  description?: string;
  slug?: string;
};

function getProjectsPath(): string {
  return path.join(process.cwd(), "src", "app", "projects");
}

async function readProjectsFile(): Promise<any[]> {
  try {
    const filePath = path.join(getProjectsPath(), "projects.json");
    const fileContent = await fs.readFile(filePath, "utf-8");

    return JSON.parse(fileContent);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function projectExists(slug: string): Promise<boolean> {
  try {
    await fs.access(path.join(getProjectsPath(), slug, "page.mdx"));
    return true;
  } catch {
    console.error(`Project with slug ${slug} does not exist`);
    return false;
  }
}

export async function getProjects(slugs: boolean = false): Promise<Project[]> {
  const data = await readProjectsFile();

  return await data.reduce(
    async (accPromise, project: Project) => {
      const acc = await accPromise;

      if (project.title) {
        if (project.slug && (await projectExists(project.slug))) {
          acc.push(project);
        } else if (!slugs) {
          const { slug, ...rest } = project;
          acc.push(rest);
        }
      } else {
        let message = "Project is missing required title.";

        const { slug, description } = project;

        if (slug) message += `\n\nSlug: ${slug}`;
        if (!slug && description) message += `\n\nDescription: ${description}`;

        console.error(message);
      }

      return acc;
    },
    Promise.resolve([] as Project[]),
  );
}
