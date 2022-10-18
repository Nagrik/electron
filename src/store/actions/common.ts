import { ThunkAction } from 'redux-thunk';
import { CallHistoryMethodAction } from 'connected-react-router';
import { Actions, State } from '../index';

type HistoryActions =
  | CallHistoryMethodAction<[string, unknown?]>
  | CallHistoryMethodAction<[]>;

export type AsyncAction<R = void> = ThunkAction<
  R,
  State,
  Actions | HistoryActions,
  any
>;
