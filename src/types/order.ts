import { Product } from './product';
import { Query } from './query';

export type OrderType = {
  count?: number;
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
  Products?: Array<OrderProduct>;
};

export type OrderQuery = {
  queries: Query[];
  data: OrderType[];
};

export type OrderPageQuery = {
  queries: Query[];
  data: OrderType[];
};

export type OrderProduct = {
  CategoryID: number;
  Discontinued: number;
  Discount: string;
  OrderID: number;
  OrderUnitPrice: string;
  ProductID: number;
  ProductName: string;
  ProductUnitPrice: string;
  Quantity: number;
  QuantityPerUnit: string;
  ReorderLevel: number;
  SupplierID: number;
  UnitsInStock: number;
  UnitsOnOrder: number;
};
