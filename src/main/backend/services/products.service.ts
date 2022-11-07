import { QueryLogger } from '../lib/QueryLogger';
import { Product } from '../../../types/product';

export class CustomerService {
  pageSize: number = 20;

  logger: QueryLogger<Product, void>;

  constructor() {
    this.logger = new QueryLogger<Product, void>();
  }

  getProductInfo = async (id: string) => {
    await this.logger.processQuery(
      `SELECT
        products."ProductID",
        products."ProductName",
        products."SupplierID",
        products."CategoryID",
        products."QuantityPerUnit",
        products."UnitPrice",
        products."UnitsInStock",
        products."UnitsOnOrder",
        products."ReorderLevel",
        products."Discontinued",
        "suppliers"."CompanyName" AS "Supplier"
      FROM products
        LEFT JOIN suppliers
          ON products."SupplierID" = suppliers."SupplierID"
            WHERE products."ProductID" = $1`,
      [id]
    );

    return this.logger.retrieveQueries();
  };

  getProductPage = async (page: number) => {
    await this.logger.processQuery('SELECT COUNT(*) FROM products');
    await this.logger.processQuery(
      'SELECT * from products LIMIT $1 OFFSET $2',
      [this.pageSize, (page - 1) * this.pageSize]
    );

    return this.logger.retrieveQueries();
  };

  search = async (search: string) => {
    await this.logger.processQuery(
      'SELECT * FROM products WHERE products."products_ranking" @@ to_tsquery($1)',
      [search]
    );

    return this.logger.retrieveQueries();
  };
}

export default new CustomerService();
