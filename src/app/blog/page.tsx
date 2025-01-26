import type { Metadata } from "next";
import Link from "next/link";

import Heading from "@/components/heading";
import Paginator from "@/components/paginator";
import { SearchParams } from "@/interfaces/params";
import { getPaginatedBlogPosts } from "@/utilities/blog";
import { formatDate } from "@/utilities/date";

const PAGINATOR_LIMIT = 15;

export const metadata: Metadata = {
  title: "Blog",
  description: "My thoughts on technology, software development, and more.",
  keywords: ["blog", "technology", "software", "development", "programming"],
};

export default async function Page(props: { searchParams: SearchParams }) {
  const page = parseInt((await props.searchParams).page as string, 10) || 1;

  const { posts, total } = await getPaginatedBlogPosts(page, PAGINATOR_LIMIT);

  return (
    <>
      <Heading animate="Blog" />

      <div className="prose prose-p:m-0 prose-p:font-mono prose-p:text-sm prose-li:my-4">
        <ul>
          {posts.map(({ slug, metadata }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>{metadata.title}</Link>

              <p>{formatDate(metadata.publishedAt)}</p>
            </li>
          ))}
        </ul>
      </div>

      <Paginator
        list={{
          slug: "blog",
          page: page,
          total: total,
          limit: PAGINATOR_LIMIT,
        }}
        className="mt-12"
      />
    </>
  );
}
