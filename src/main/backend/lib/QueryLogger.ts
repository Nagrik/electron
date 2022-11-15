import {
  QueryResult,
  QueryParam,
  ProcessedQueryResult,
} from '../../../types/query';
import { QueryProcessor } from './QueryProcessor';

export class QueryLogger<T, S> {
  queries: QueryResult<T>[] = [];

  processQuery = async (query: string, param?: QueryParam): Promise<void> => {
    if (query) {
      const queryProcessor = new QueryProcessor<T>(query);
      await queryProcessor.countMetrics(param);
      this.queries.push(queryProcessor.getMetrics());
    }
  };

  retrieveQueries = (): ProcessedQueryResult<T, S> => {
    const temp: ProcessedQueryResult<T, S> = {
      queries: [],
      data: [],
    };

    this.queries.forEach((el) => {
      temp.queries.push(el.query);
      temp.data.push(...el.data);
    });

    this.queries = [];

    return temp;
  };
}

export default {};
