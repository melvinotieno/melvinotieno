export interface ListPaginator {
  slug: string;
  page: number;
  total: number;
  limit: number;
}

export interface PagePaginator {
  prev?: {
    link: string;
    title: string;
  };
  next?: {
    link: string;
    title: string;
  };
}
