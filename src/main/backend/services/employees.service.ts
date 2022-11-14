import { QueryLogger } from '../lib/QueryLogger';
import { Employee } from '../../../types/employee';

export class CustomerService {
  pageSize: number = 20;

  logger: QueryLogger<Employee, void>;

  constructor() {
    this.logger = new QueryLogger<Employee, void>();
  }

  getEmployeeInfo = async (id: string) => {
    await this.logger.processQuery(
      `SELECT \
        employees."EmployeeID", \
        employees."LastName", \
        employees."FirstName", \
        employees."Title", \
        employees."TitleOfCourtesy", \
        employees."BirthDate", \
        employees."HireDate", \
        employees."Address", \
        employees."City", \
        employees."Region", \
        employees."PostalCode", \
        employees."Country", \
        employees."HomePhone", \
        employees."Extension", \
        employees."Notes", \
        employees."ReportsTo", \
        CONCAT(reports."LastName", ' ', reports."FirstName") as "ReportsToName" \
      FROM employees \
        LEFT JOIN employees AS reports \
          ON employees."ReportsTo"=reports."EmployeeID" \
            WHERE employees."EmployeeID"=$1`,
      [id]
    );

    return this.logger.retrieveQueries();
  };

  getEmployeePage = async (page: number) => {
    await this.logger.processQuery('SELECT COUNT(*) FROM employees');
    await this.logger.processQuery(
      'SELECT * FROM employees LIMIT $1 OFFSET $2',
      [this.pageSize, (page - 1) * this.pageSize]
    );

    return this.logger.retrieveQueries();
  };
}

export default new CustomerService();
