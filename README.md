## The Repository

This repository stores a desktop copy of [Northwind Traders](https://northwind.d1sql.com/dash) made using electron, react, typescript.

It uses this [template](https://github.com/electron-react-boilerplate/electron-react-boilerplate)

## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/Nagrik/electron.git your-project-name
cd your-project-name
npm install
```

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Docs

You can use existing backend for this application with existing database or provide your own database either adding link to it in **.env** or setting link in dashboard page of the application.

#### Own database

You can use database with our backend **only if** your database is _PostgreSQL_ and have following tables

```sql
CREATE TABLE IF NOT EXISTS Categories (
	"CategoryID" INT PRIMARY KEY,
	"CategoryName" character varying(100),
	"Description" character varying(100)
);

CREATE TABLE IF NOT EXISTS Customers (
	"CustomerID" character varying(20) PRIMARY KEY,
	"CompanyName" character varying(100),
	"ContactName" character varying(100),
	"ContactTitle" character varying(100),
	"Address" character varying(100),
	"City" character varying(100),
	"Region" character varying(100),
	"PostalCode" character varying(100),
	"Country" character varying(100),
	"Phone" character varying(100),
	"Fax" character varying(100)
);

CREATE TABLE IF NOT EXISTS EmployeeTerritories (
	"EmployeeID" INT,
	"TerritoryID" INT
);

CREATE TABLE IF NOT EXISTS Employees (
	"EmployeeID" INT PRIMARY KEY,
	"LastName" character varying(100),
	"FirstName" character varying(100),
	"Title" character varying(100),
	"TitleOfCourtesy" character varying(100),
	"BirthDate" character varying(100),
	"HireDate" character varying(100),
	"Address" character varying(100),
	"City" character varying(100),
	"Region" character varying(100),
	"PostalCode" character varying(100),
	"Country" character varying(100),
	"HomePhone" character varying(100),
	"Extension" INT,
	"Notes" character varying(500),
	"ReportsTo" INT
);

CREATE TABLE IF NOT EXISTS OrderDetails (
	"id" SERIAL PRIMARY KEY,
	"OrderID" INT,
	"ProductID" INT,
	"UnitPrice" numeric,
	"Quantity" INT,
	"Discount" numeric
);

CREATE TABLE IF NOT EXISTS Orders (
	"OrderID" INT PRIMARY KEY,
	"CustomerID" character varying(5),
	"EmployeeID" INT,
	"OrderDate" character varying(100),
	"RequiredDate" character varying(100),
	"ShippedDate" character varying(100),
	"ShipVia" INT,
	"Freight" numeric,
	"ShipName" character varying(100),
	"ShipAddress" character varying(100),
	"ShipCity" character varying(100),
	"ShipRegion" character varying(100),
	"ShipPostalCode" character varying(100),
	"ShipCountry" character varying(100)
);

CREATE TABLE IF NOT EXISTS Products (
	"ProductID" INT PRIMARY KEY,
	"ProductName" character varying(100),
	"SupplierID" INT,
	"CategoryID" INT,
	"QuantityPerUnit" character varying(100),
	"UnitPrice" numeric,
	"UnitsInStock" INT,
	"UnitsOnOrder" INT,
	"ReorderLevel" INT,
	"Discontinued" INT
);

CREATE TABLE IF NOT EXISTS Regions (
	"RegionID" INT PRIMARY KEY,
	"RegionDescription" character varying(30)
);

CREATE TABLE IF NOT EXISTS Shippers (
	"ShipperID" INT PRIMARY KEY,
	"CompanyName" character varying(100),
	"Phone" character varying(50)
);

CREATE TABLE IF NOT EXISTS Suppliers (
	"SupplierID" INT PRIMARY KEY,
	"CompanyName" character varying(100),
	"ContactName" character varying(100),
	"ContactTitle" character varying(100),
	"Address" character varying(100),
	"City" character varying(100),
	"Region" character varying(100),
	"PostalCode" character varying(100),
	"Country" character varying(100),
	"Phone" character varying(100),
	"Fax" character varying(100),
	"HomePage" character varying(100)
);

CREATE TABLE IF NOT EXISTS Territories (
	"TerritoryID" character varying(10) PRIMARY KEY,
	"TerritoryDescription" character varying(50),
	"RegionID" INT
);

ALTER TABLE customers
    ADD COLUMN customers_with_rankings tsvector;
UPDATE customers SET customers_with_rankings =
    setweight(to_tsvector("CustomerID"), 'AA') ||
    setweight(to_tsvector("CompanyName"), 'AB') ||
    setweight(to_tsvector("ContactName"), 'AC') ||
    setweight(to_tsvector("ContactTitle"), 'AD') ||
    setweight(to_tsvector("Address"), 'BA');

ALTER TABLE products
    ADD COLUMN products_ranking tsvector;
UPDATE products SET products_ranking = to_tsvector("ProductName");
```

#### Own API

You can use your own API if has following endpoints:

**queries** field is present on every response

```TEXT
queries: Array[{
      executionTime: number,
      select: number,
      selectWhere: number,
      selectJoin: number,
      query: string // SQL query executed to get response data
    }],
```

```TEXT
GET http://your.own.api/suppliers?page=1 HTTP/1.1

Response {
  queries,
  data: Array[
    { count: number },
    ...{
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
    }
  ]
}
```

```TEXT
GET http://your.own.api/supplier?id=1 HTTP/1.1

Response {
  queries,
  data: [{
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
  }]
}

```

```TEXT
GET http://your.own.api/customers?page=1 HTTP/1.1

Response {
  queries,
  data: Array[
    { count: number },
    ...{
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
    }
  ]
}
```

```TEXT
GET http://your.own.api/customer?id=ALFKI HTTP/1.1

Response {
  queries,
  data: [{
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
  }]
}
```

```TEXT
GET http://your.own.api/searchCustomer?search=Alfred HTTP/1.1

Response {
  queries,
  data: Array[...{
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
  }]
}
```

```TEXT
GET http://your.own.api/products?page=1 HTTP/1.1

Response {
  queries,
  data: Array[
    { count: number },
    ...{
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
    }
  ]
}
```

```TEXT
GET http://your.own.api/product?id=1 HTTP/1.1

Response {
  queries,
  data: [{
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
  }]
}
```

```TEXT
GET http://your.own.api/searchProduct?search=Chai HTTP/1.1

Response {
  queries,
  data: Array[...{
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
  }]
}
```

```TEXT
GET http://your.own.api/employees?page=1 HTTP/1.1

Response {
  queries,
  data: Array[
    { count: number },
    ...{
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
    }
  ]
}
```

```TEXT
GET http://your.own.api/employee?id=1 HTTP/1.1

Response {
  queries,
  data: [{
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
  }]
}
```

```TEXT
GET http://your.own.api/orders?page=1 HTTP/1.1

Response {
  queries,
  data: Array[{
    { count: number},
    ...{
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
    }
  }]
}
```

```TEXT
GET http://your.own.api/order?id=10248 HTTP/1.1

Response {
  queries,
  data: [{
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
    Products: Array[...{
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
    }];
  }]
}
```

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)
