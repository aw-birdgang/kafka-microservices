export class TcpRequest<T> {
  headers: object;
  data: T;

  constructor(data: T, headers?: object) {
    this.data = data;
    this.headers = headers;
  }

  toString() {
    return JSON.stringify(this);
  }

  static from<T>(data: T, headers?: object) {
    return new TcpRequest<T>(data, headers);
  }
}

export class TcpPaginationRequest<T1, T2 = Pagination> {
  headers: object;
  data: T1;
  pagination: T2;

  constructor(data: T1, pagination: T2, headers?: object) {
    this.data = data;
    this.pagination = pagination;
    this.headers = headers;
  }

  toString() {
    return JSON.stringify(this);
  }

  static from<T1, T2 = Pagination>(data: T1, pagination: T2, headers?: object) {
    return new TcpPaginationRequest<T1, T2>(data, pagination, headers);
  }
}

/**
 * Pagination
 */
export class Pagination {
  page: number;
  offset: number;

  static from(page: number, offset: number) {
    const pagination = new Pagination();
    pagination.page = page;
    pagination.offset = offset;
    return pagination;
  }
}
