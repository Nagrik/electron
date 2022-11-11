import { OrderPageQuery, OrderQuery } from '../types/order';
import { EmployeePageQuery, EmployeeQuery } from '../types/employee';
import { ProductPageQuery, ProductQuery } from '../types/product';
import { CustomerPageQuery, CustomerQuery } from '../types/customer';
import { SupplierQuery, SupplierPageQuery } from '../types/supplier';

declare global {
  interface Window {
    api: {
      removeAllListeners(channel: string): void;

      suppliers: {
        getSupplier(id: string): Promise<SupplierQuery>;
        getSupplierPage(page: number): Promise<SupplierPageQuery>;
      };
      customers: {
        getCustomer(id: string): Promise<CustomerQuery>;
        getCustomerPage(page: number): Promise<CustomerPageQuery>;
        searchCustomer(search: string): Promise<CustomerQuery>;
      };

      products: {
        getProduct(id: string): Promise<ProductQuery>;
        getProductPage(page: number): Promise<ProductPageQuery>;
        searchProduct(search: string): Promise<ProductQuery>;
      };

      employees: {
        getEmployee(id: string): Promise<EmployeeQuery>;
        getEmployeePage(page: number): Promise<EmployeePageQuery>;
      };

      orders: {
        getOrder(id: string): Promise<OrderQuery>;
        getOrderPage(page: number): Promise<OrderPageQuery>;
      };
    };
  }
}

export {};
