import { QueryLogger } from '../lib/QueryLogger';
import { Order } from '../../../types/order';

export class CustomerService {
  pageSize: number = 20;

  logger: QueryLogger<Order>;

  constructor() {
    this.logger = new QueryLogger<Order>();
  }

  getOrderInfo = async (id: string) => {
    // get order info
    await this.logger.processQuery(
      `SELECT
          orders."OrderID",
          orders."CustomerID",
          orders."EmployeeID",
          orders."OrderDate",
          orders."RequiredDate",
          orders."ShippedDate",
          orders."ShipVia",
          orders."Freight",
          orders."ShipName",
          orders."ShipAddress",
          orders."ShipCity",
          orders."ShipRegion",
          orders."ShipPostalCode",
          orders."ShipCountry",
          shippers."CompanyName" as "ShipVia",
          SUM(orderdetails."UnitPrice" * orderdetails."Discount" * orderdetails."Quantity") AS "TotalDiscount",
          SUM(orderdetails."UnitPrice" * orderdetails."Quantity") AS "TotalPrice",
          SUM(orderdetails."Quantity") AS "TotalQuantity",
          COUNT(orderdetails."OrderID") AS "TotalProducts"
        FROM orders
          LEFT JOIN orderdetails
            ON orders."OrderID" = orderdetails."OrderID"
          LEFT JOIN shippers
            ON orders."ShipVia" = shippers."ShipperID"
              WHERE orders."OrderID" = $1
              GROUP BY orders."OrderID", shippers."CompanyName"`,
      [id]
    );

    // get order products
    await this.logger.processQuery(
      `SELECT
        orderdetails."OrderID",
        orderdetails."Quantity",
        orderdetails."UnitPrice" AS OrderUnitPrice,
        orderdetails."Discount",
        products."ProductID",
        "ProductName",
        "SupplierID",
        "CategoryID",
        "QuantityPerUnit",
        products."UnitPrice" AS ProductUnitPrice,
        "UnitsInStock",
        "UnitsOnOrder",
        "ReorderLevel",
        "Discontinued"
      FROM products
        LEFT JOIN orderdetails
          ON orderdetails."ProductID"=products."ProductID"
            WHERE orderdetails."OrderID"=$1`,
      [id]
    );

    return this.logger.retrieveQueries();
  };

  getOrderPage = async (page: number) => {
    await this.logger.processQuery('SELECT COUNT(*) FROM orders');
    await this.logger.processQuery(
      `SELECT
          orders."OrderID",
          orders."CustomerID",
          orders."EmployeeID",
          orders."OrderDate",
          orders."RequiredDate",
          orders."ShippedDate",
          orders."ShipVia",
          orders."Freight",
          orders."ShipName",
          orders."ShipAddress",
          orders."ShipCity",
          orders."ShipRegion",
          orders."ShipPostalCode",
          orders."ShipCountry",
          SUM(orderdetails."UnitPrice" * orderdetails."Discount" * orderdetails."Quantity") AS "TotalDiscount",
          SUM(orderdetails."UnitPrice" * orderdetails."Quantity") AS "TotalPrice",
          SUM(orderdetails."Quantity") AS "TotalQuantity",
          COUNT(orderdetails."OrderID") AS "TotalProducts"
        FROM orders
          LEFT JOIN orderdetails
            ON orders."OrderID" = orderdetails."OrderID"
              GROUP BY orders."OrderID"
              LIMIT $1 OFFSET $2`,
      [this.pageSize, (page - 1) * this.pageSize]
    );

    return this.logger.retrieveQueries();
  };
}

export default new CustomerService();
