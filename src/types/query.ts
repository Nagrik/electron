// import { Metrics } from '../lib/QueryProcessor';

// export type QueryStats = {
//   query: string;
//   data: any;
//   metrics: typeof Metrics;
// };
export type Query = {
  select: number;
  selectWhere: number;
  selectJoin: number;
  query: string;
  executionTime?: number;
};

export type QueryParam = string[] | number[] | string[][] | number[][];

export interface QueryResult<T> {
  query: Query;
  data: T[];
}
