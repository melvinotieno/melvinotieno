import { getBlogPosts } from "@/utilities/blog";
import { AUTHOR_NAME, BASE_URL } from "@/utilities/constants";

export async function GET() {
  const blogPosts = await getBlogPosts();

  const xmlItems = blogPosts
    .map((post) => {
      const { slug, metadata } = post;
      const { title, publishedAt, description } = metadata;

      return `
        <item>
          <title>${title}</title>
          <link>${BASE_URL}/blog/${slug}</link>
          <description>${description}</description>
          <pubDate>${new Date(publishedAt).toUTCString()}</pubDate>
        </item>
      `;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${AUTHOR_NAME}</title>
        <link>${BASE_URL}</link>
        <description>My thoughts on technology, software development, and more.</description>
        ${xmlItems}
      </channel>
    </rss>
  `;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
