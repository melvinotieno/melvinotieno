import type { MDXComponents as Components } from "mdx/types";

import { MDXComponents } from "./components/mdx";

export function useMDXComponents(components: Components): Components {
  return {
    ...components,
    ...MDXComponents,
  };
}
