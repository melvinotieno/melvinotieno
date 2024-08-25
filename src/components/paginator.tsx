import Link from "next/link";

import { PagePaginator } from "@/interfaces/paginator";

export default function Paginator({
  page,
}: Readonly<{ page?: PagePaginator }>) {
  if (!page) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8">
      {page.prev && (
        <Link
          href={page.prev.link}
          className="space-y-1 rounded-lg border border-zinc-300 px-4 py-4 transition-all hover:bg-zinc-100 md:px-6"
        >
          <div className="text-xs tracking-wider text-zinc-500">
            &larr; Previous
          </div>

          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {page.prev.title}
          </div>
        </Link>
      )}

      {page.next && (
        <Link
          href={page.next.link}
          className="space-y-1 rounded-lg border border-zinc-300 px-4 py-4 text-right transition-all hover:bg-zinc-100 md:px-6"
        >
          <div className="text-xs tracking-wider text-zinc-500">
            Next &rarr;
          </div>

          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {page.next.title}
          </div>
        </Link>
      )}
    </div>
  );
}
