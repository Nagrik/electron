import shared from '../ipcMain';
import { QueryResult, QueryParam } from '../../../types/query';

export class QueryProcessor<T> {
  queryResult: T[] = [];

  query: string;

  select: number = 0;

  selectWhere: number = 0;

  selectJoin: number = 0;

  executionTime?: number = 0;

  startTime: [number, number] = [0, 0];

  endTime: [number, number] = [0, 0];

  constructor(query: string) {
    this.query = query;
  }

  private readonly isEmptyString = (str: string): boolean => {
    return str.length === 0;
  };

  readonly countMetrics = async (param?: QueryParam): Promise<void> => {
    if (!this.isEmptyString(this.query)) {
      this.setStart();
      this.queryResult = (await shared.connection?.query(this.query, param))
        ?.rows as T[];
      this.setEnd();
      this.countSQLMetrics();
    }
  };

  readonly countSQLMetrics = (): void => {
    this.select = this.countOccurences(this.query, 'SELECT');
    this.selectWhere = this.countOccurences(this.query, 'WHERE');
    this.selectJoin = this.countOccurences(this.query, 'JOIN');
  };

  readonly countOccurences = (str: string, subStr: string): number => {
    return (str.match(new RegExp(subStr, 'g')) || []).length;
  };

  private readonly resetCounter = (): void => {
    this.startTime = [0, 0];
    this.endTime = [0, 0];
  };

  readonly setStart = (): void => {
    this.startTime = process.hrtime();
  };

  readonly setEnd = (): void => {
    this.endTime = process.hrtime(this.startTime);
    this.executionTime = this.endTime[1] / 1_000_000;
    this.resetCounter();
  };

  readonly getMetrics = (): QueryResult<T> => {
    return {
      query: {
        select: this.select,
        selectWhere: this.selectWhere,
        selectJoin: this.selectJoin,
        query: this.query,
        executionTime: this.executionTime,
      },
      data: this.queryResult,
    };
  };
}

export default {};
