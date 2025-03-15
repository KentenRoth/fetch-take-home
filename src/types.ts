export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Filters {
  ageMin: number | undefined;
  ageMax: number | undefined;
  sort: string;
}
