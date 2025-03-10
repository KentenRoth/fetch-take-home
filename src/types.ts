export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Filters {
  minAge: number | undefined;
  maxAge: number | undefined;
  sort: string;
}
