/**
 * Pagination data shape
 */
export interface IPaginationData<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  pageNumber: number;
  pageSize: number;
}

/**
 * PaginationData class
 */
export class PaginationData<T> implements IPaginationData<T> {
  items: T[];
  total: number;
  hasMore = false;
  pageNumber: number;
  pageSize: number;

  constructor({
    items,
    total,
    hasMore,
    pageNumber,
    pageSize,
  }: {
    items: T[];
    total?: number;
    hasMore?: boolean;
    pageNumber?: number;
    pageSize?: number;
  }) {
    this.items = items;
    this.total = total;
    if (hasMore != null) {
      this.hasMore = hasMore;
    } else {
      if (pageNumber != null && pageSize != null && total != null) {
        this.hasMore = pageNumber * pageSize < total;
      }
    }
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
export class RequestPaginationDTO {
  getAll?: boolean;
  pageNumber?: number;
  pageSize?: number;
}
