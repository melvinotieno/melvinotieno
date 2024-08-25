import { promises as fs } from "fs";
import path from "path";

import { PagePaginator } from "@/interfaces/paginator";

type Metadata = {
  title: string;
  publishedAt: string;
  description?: string;
  keywords?: string;
  image?: string;
};

type BlogPost = {
  slug: string;
  metadata: Metadata;
  content: string;
};

function getBlogPostsPath(): string {
  return path.join(process.cwd(), "src", "app", "blog", "posts");
}

async function readBlogFile(filePath: string): Promise<BlogPost | null> {
  try {
    const fileContent = await fs.readFile(filePath, { encoding: "utf-8" });
    const regex = /---\s*([\s\S]*?)\s*---/;
    const match = regex.exec(fileContent);

    if (!match) {
      // We return null here to mean the blog post is in draft state.
      return null;
    }

    const frontmatter = match[1].trim().split("\n");

    // Generate the slug from the file name.
    const slug = path.basename(filePath, path.extname(filePath));

    // Parse the frontmatter into a metadata object.
    const metadata = frontmatter.reduce((acc, line) => {
      const [key, ...valueArr] = line.split(":");

      // Join the value array, trim it, and remove any surrounding quotes.
      let value = valueArr.join(":").trim();
      value = value.replace(/^['"](.*)['"]$/, "$1");

      return {
        ...acc,
        [key.trim() as keyof Metadata]: value,
      };
    }, {} as Metadata);

    if (!metadata.title || !metadata.publishedAt) {
      throw new Error(`Blog post ${slug} is missing required metadata.`);
    }

    // If publishedAt is not a valid date, throw an error.
    if (isNaN(Date.parse(metadata.publishedAt))) {
      throw new Error(
        `Blog post ${slug} has an invalid publishedAt date: ${metadata.publishedAt}`,
      );
    }

    // If the publishedAt date is a future date, return null.
    if (new Date(metadata.publishedAt).getTime() > Date.now()) {
      return null;
    }

    // Get the blog post content by removing the frontmatter.
    const content = fileContent.replace(regex, "").trim();

    return { slug, metadata, content };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const dir = getBlogPostsPath();

    const files = (await fs.readdir(dir)).filter(
      (file) => path.extname(file) === ".mdx",
    );

    const posts: BlogPost[] = [];

    for (const file of files) {
      const filePath = path.join(dir, file);
      const post = await readBlogFile(filePath);

      // We only push the post if it's not null (not in draft state).
      if (post) posts.push(post);
    }

    // Sort posts by publishedAt date in descending order.
    posts.sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    );

    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(getBlogPostsPath(), `${slug}.mdx`);
  return readBlogFile(filePath);
}

export async function getAdjacentBlogPosts(
  slug: string,
): Promise<PagePaginator> {
  const posts = await getBlogPosts();
  const currentIndex = posts.findIndex((post) => post.slug === slug);
  const prev = posts[currentIndex + 1];
  const next = posts[currentIndex - 1];

  return {
    prev: prev && {
      link: `/blog/${prev.slug}`,
      title: prev.metadata.title,
    },
    next: next && {
      link: `/blog/${next.slug}`,
      title: next.metadata.title,
    },
  };
}

export async function getPaginatedBlogPosts(
  page: number,
  limit: number,
): Promise<{ posts: BlogPost[]; total: number }> {
  const posts = await getBlogPosts();

  const paginated = posts.slice((page - 1) * limit, page * limit);

  return { posts: paginated, total: posts.length };
}
