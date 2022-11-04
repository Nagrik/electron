import { QueryResult, QueryParam, Query } from '../../../types/query';
import { QueryProcessor } from './QueryProcessor';

export class QueryLogger<T> {
  queries: QueryResult<T>[] = [];

  processQuery = async (query: string, param?: QueryParam): Promise<void> => {
    if (query) {
      const queryProcessor = new QueryProcessor<T>(query);
      await queryProcessor.countMetrics(param);
      this.queries.push(queryProcessor.getMetrics());
    }
  };

  retrieveQueries = () => {
    const temp = {
      queries: [] as Query[],
      data: [] as T[],
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
