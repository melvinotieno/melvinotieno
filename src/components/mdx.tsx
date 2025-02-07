import type { MDXComponents as Components } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export default function MDX({
  className,
  content,
  children,
}: Readonly<{
  className?: string;
  content?: string;
  children?: React.ReactNode;
}>) {
  return (
    <div className={`prose${className ? " " + className : ""}`}>
      {content ? (
        <MDXRemote source={content} components={{ ...MDXComponents }} />
      ) : (
        children
      )}
    </div>
  );
}

export function Pre({
  children,
}: Readonly<
  DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
>) {
  const { children: content, className } = (children as ReactElement).props as {
    children: string;
    className: string;
  };

  const lang = className.replace(/language-/, "");
  const html = Prism.highlight(content, Prism.languages[lang], lang);

  return (
    <pre className={className}>
      <code className={className} dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}

export const MDXComponents: Components = { pre: Pre };
