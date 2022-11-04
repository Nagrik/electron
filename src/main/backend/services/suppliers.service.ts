import { QueryLogger } from '../lib/QueryLogger';
import { Supplier } from '../../../types/supplier';

export class SupplierService {
  pageSize: number = 20;

  logger: QueryLogger<Supplier>;

  constructor() {
    this.logger = new QueryLogger<Supplier>();
  }

  getSupplierInfo = async (id: string) => {
    await this.logger.processQuery(
      'SELECT * FROM suppliers WHERE suppliers."SupplierID" = $1',
      [id]
    );

    return this.logger.retrieveQueries();
  };

  getSuppliersPage = async (page: number) => {
    await this.logger.processQuery('SELECT COUNT(*) FROM suppliers');
    await this.logger.processQuery(
      'SELECT * from suppliers LIMIT $1 OFFSET $2',
      [this.pageSize, (page - 1) * this.pageSize]
    );

    return this.logger.retrieveQueries();
  };
}

export default new SupplierService();
