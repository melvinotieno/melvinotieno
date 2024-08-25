import type { MetadataRoute } from "next";

import { getBlogPosts } from "@/utilities/blog";
import { BASE_URL } from "@/utilities/constants";
import { getProjects } from "@/utilities/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/blog", "/projects"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const blogs = (await getBlogPosts()).map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: blog.metadata.publishedAt,
  }));

  const projects = (await getProjects(true)).map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...projects];
}
