import { QueryLogger } from '../lib/QueryLogger';
import { Customer } from '../../../types/customer';

export class CustomerService {
  pageSize: number = 20;

  logger: QueryLogger<Customer>;

  constructor() {
    this.logger = new QueryLogger<Customer>();
  }

  getCustomerInfo = async (id: string) => {
    await this.logger.processQuery(
      'SELECT * FROM customers WHERE customers."CustomerID" = $1',
      [id]
    );

    return this.logger.retrieveQueries();
  };

  getCustomersPage = async (page: number) => {
    await this.logger.processQuery('SELECT COUNT(*) FROM customers');
    await this.logger.processQuery(
      'SELECT * from customers LIMIT $1 OFFSET $2',
      [this.pageSize, (page - 1) * this.pageSize]
    );

    return this.logger.retrieveQueries();
  };

  search = async (search: string) => {
    await this.logger.processQuery(
      'SELECT * FROM customers where customers."customers_with_rankings" @@ to_tsquery($1)',
      [search]
    );

    return this.logger.retrieveQueries();
  };
}

export default new CustomerService();
