import type { Metadata } from "next";
import Link from "next/link";

import Heading from "@/components/heading";
import { getBlogPosts } from "@/utilities/blog";
import { BLOG_DESCRIPTION } from "@/utilities/constants";
import { formatDate } from "@/utilities/date";

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG_DESCRIPTION,
  keywords: ["blog", "technology", "software", "development"],
};

export default async function Page() {
  const posts = await getBlogPosts();

  return (
    <>
      <Heading animate="Blog" />

      <div className="prose prose-p:m-0 prose-p:font-mono prose-p:text-sm prose-li:my-4">
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>

              <p>{formatDate(post.metadata.publishedAt)}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
