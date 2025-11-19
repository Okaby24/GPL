export class Page {
  size!: number;
  number!: number;
  totalElements!: number;
  totalPages!: number;
}

export class IPaginationResponse<T> {
  data!: {
    content: T[];
    page: Meta;
  };
}

export type Meta = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};
