import { Query } from './query';

export type Product = {
  count?: number;
  CategoryID: number;
  Discontinued: number;
  ProductID: number;
  ProductName: string;
  QuantityPerUnit: string;
  ReorderLevel: number;
  Supplier: string;
  SupplierID: number;
  UnitPrice: number;
  UnitsInStock: number;
  UnitsOnOrder: number;
};

export type ProductQuery = {
  queries: Query[];
  data: Product[];
};

export type ProductPageQuery = {
  queries: Query[];
  data: Product[];
};
