import { Product } from './product';
import { Query } from './query';

export type Order = {
  CustomerID: string;
  EmployeeID: number;
  Freight: number;
  OrderDate: string;
  OrderID: number;
  RequiredDate: string;
  ShipAddress: string;
  ShipCity: string;
  ShipCountry: string;
  ShipName: string;
  ShipPostalCode: string;
  ShipRegion: string;
  ShipVia: string;
  ShippedDate: string;
  TotalPrice: number;
  TotalQuantity: number;
  TotalDiscount: number;
  TotalProducts: number;
  // Products: Array<Product>;
};

export type OrderQuery = {
  queries: Query[];
  data: Order[];
};

export type OrderPageQuery = {
  queries: Query[];
  data: [{ count: number }, Order, Product[]];
};
