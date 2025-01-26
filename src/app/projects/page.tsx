import type { Metadata } from "next";
import Link from "next/link";

import Heading from "@/components/heading";
import Paginator from "@/components/paginator";
import { SearchParams } from "@/interfaces/params";
import { getPaginatedProjects } from "@/utilities/projects";

const PAGINATOR_LIMIT = 10;

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects I've worked on.",
  keywords: ["projects", "software", "development"],
};

export default async function Page(props: { searchParams: SearchParams }) {
  const page = parseInt((await props.searchParams).page as string, 10) || 1;

  const { projects, total } = await getPaginatedProjects(page, PAGINATOR_LIMIT);

  return (
    <>
      <Heading animate="Projects" />

      <div className="prose prose-li:my-4">
        <ul>
          {projects.map(({ title, description, slug }, index) => (
            <li key={index}>
              {slug ? (
                <div className="flex gap-3">
                  <Link href={`/projects/${slug}`}>{title}</Link>

                  <span className="text-gray-500">&rarr;</span>
                </div>
              ) : (
                <span className="font-medium text-[var(--tw-prose-links)] underline">
                  {title}
                </span>
              )}

              {description && (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </li>
          ))}
        </ul>
      </div>

      <Paginator
        list={{
          slug: "projects",
          page: page,
          total: total,
          limit: PAGINATOR_LIMIT,
        }}
        className="mt-12"
      />
    </>
  );
}
