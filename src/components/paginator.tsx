import clsx from "clsx";
import Link from "next/link";

import { ListPaginator, PagePaginator } from "@/interfaces/paginator";

export default function Paginator({
  list,
  page,
  className,
}: Readonly<{
  list?: ListPaginator;
  page?: PagePaginator;
  className?: string;
}>) {
  if (!list && !page) return null;

  if (list) {
    // Do not render paginator if there is only one page.
    if (list.total <= list.limit) return null;

    return (
      <div className={clsx("flex justify-between", className)}>
        {list.page !== 1 ? (
          <Link href={`/${list.slug}/?page=${list.page - 1}`}>
            &larr; &nbsp; Previous
          </Link>
        ) : (
          <div></div>
        )}

        <div className="text-sm">
          {list.page} of {Math.ceil(list.total / list.limit)}
        </div>

        {list.limit * list.page < list.total ? (
          <Link href={`/${list.slug}/?page=${list.page + 1}`}>
            Next &nbsp; &rarr;
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  if (page) {
    return (
      <div
        className={clsx(
          "grid gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8",
          className,
        )}
      >
        {page.prev && (
          <Link
            href={page.prev.link}
            className="space-y-1 rounded-lg border border-zinc-300 px-4 py-4 transition-all hover:bg-zinc-100 md:px-6"
          >
            <div className="text-xs tracking-wider text-zinc-500">
              &larr; Previous
            </div>

            <div className="overflow-hidden text-sm text-ellipsis whitespace-nowrap">
              {page.prev.title}
            </div>
          </Link>
        )}

        {!page.prev && page.next && <div></div>}

        {page.next && (
          <Link
            href={page.next.link}
            className="space-y-1 rounded-lg border border-zinc-300 px-4 py-4 text-right transition-all hover:bg-zinc-100 md:px-6"
          >
            <div className="text-xs tracking-wider text-zinc-500">
              Next &rarr;
            </div>

            <div className="overflow-hidden text-sm text-ellipsis whitespace-nowrap">
              {page.next.title}
            </div>
          </Link>
        )}
      </div>
    );
  }
}
