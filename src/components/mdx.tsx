import type { MDXComponents as Components } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import Prism from "prismjs";
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
  const props = (children as ReactElement).props;
  const { children: content, className } = props;
  const lang = className.replace(/language-/, "");
  const html = Prism.highlight(content, Prism.languages[lang], lang);

  return (
    <pre className={className}>
      <code className={className} dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}

export const MDXComponents: Components = {
  pre: Pre,
};
