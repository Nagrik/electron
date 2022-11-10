import { Query } from './query';

export type Supplier = {
  count?: number;
  SupplierID: number;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
  Address: string;
  City: string;
  Region: string;
  PostalCode: string;
  Country: string;
  Phone: string;
  Fax: string;
  HomePage: string;
};

export type SupplierQuery = {
  queries: Query[];
  data: Supplier[];
};

export type SupplierPageQuery = {
  queries: Query[];
  data: Supplier[];
};
