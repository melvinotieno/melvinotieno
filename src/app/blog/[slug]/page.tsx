import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Heading from "@/components/heading";
import MDX from "@/components/mdx";
import Paginator from "@/components/paginator";
import { SlugParam } from "@/interfaces/params";
import { getAdjacentBlogPosts, getBlogPost } from "@/utilities/blog";
import { AUTHOR_NAME, BASE_URL, TWITTER_HANDLE } from "@/utilities/constants";
import { formatDate } from "@/utilities/date";
import { resolveImage } from "@/utilities/image";

export async function generateMetadata(props: {
  params: SlugParam;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const post = await getBlogPost(params.slug);

  if (!post) return;

  const { title, publishedAt, description, keywords, image } = post.metadata;

  const resolvedImage = resolveImage(title, image);

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "article",
      publishedTime: publishedAt,
      url: `${BASE_URL}/blog/${params.slug}`,
      authors: AUTHOR_NAME,
      tags: keywords,
      images: [{ url: resolvedImage }],
    },
    twitter: {
      card: "summary_large_image",
      creator: TWITTER_HANDLE,
      images: [resolvedImage],
    },
  };
}

export default async function Blog(props: { params: SlugParam }) {
  const params = await props.params;
  const post = await getBlogPost(params.slug);

  if (!post) return notFound();

  const { metadata, content } = post;
  const { title, publishedAt, description, image } = metadata;

  const paginator = await getAdjacentBlogPosts(params.slug);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            datePublished: publishedAt,
            dateModified: publishedAt,
            description: description,
            image: resolveImage(title, image),
            url: `${BASE_URL}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: AUTHOR_NAME,
            },
          }),
        }}
      />

      <Heading inanimate={title} className="mb-2" />

      <p className="mb-6 font-mono">{formatDate(publishedAt)}</p>

      <MDX content={content} className="mb-12" />

      <Paginator page={{ ...paginator }} />
    </>
  );
}
