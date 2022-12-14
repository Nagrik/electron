import { Query } from './query';

export type Employee = {
  count?: number;
  Address: string;
  BirthDate: string;
  City: string;
  Country: string;
  EmployeeID: number;
  Extension: number;
  FirstName: string;
  HireDate: string;
  HomePhone: string;
  LastName: string;
  Notes: string;
  PostalCode: string;
  Region: string;
  ReportsTo: number;
  ReportsToName: string;
  Title: string;
  TitleOfCourtesy: string;
};

export type EmployeeQuery = {
  queries: Query[];
  data: Employee[];
};

export type EmployeePageQuery = {
  queries: Query[];
  data: Employee[];
};
