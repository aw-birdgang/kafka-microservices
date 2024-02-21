export class TcpResponse<T> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }

  toString() {
    return JSON.stringify(this);
  }

  static from<T>(data: T) {
    return new TcpResponse<T>(data);
  }
}

export class TcpPaginationResponse<T1, T2 = PaginationMeta> {
  data: T1;
  pagination: T2;

  constructor(data: T1, pagination: T2) {
    this.data = data;
    this.pagination = pagination;
  }

  toString() {
    return JSON.stringify(this);
  }

  static from<T1, T2 = PaginationMeta>(data: T1, pagination: T2) {
    return new TcpPaginationResponse<T1, T2>(data, pagination);
  }
}

export class PaginationMeta {
  total: number;
  page: number;
  lastPage: number;

  static from(total: number, page: number, lastPage: number) {
    const paginationMeta = new PaginationMeta();
    paginationMeta.total = total;
    paginationMeta.page = page;
    paginationMeta.lastPage = lastPage;
    return paginationMeta;
  }
}
