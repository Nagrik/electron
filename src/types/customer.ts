import { Query } from './query';

export type Customer = {
  count?: number;
  Address: string;
  City: string;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
  Country: string;
  CustomerID: string;
  Fax: string;
  Phone: string;
  PostalCode: string;
  Region: string;
};

export type CustomerQuery = {
  queries: Query[];
  data: Customer[];
};

export type CustomerPageQuery = {
  queries: Query[];
  data: Customer[];
};
