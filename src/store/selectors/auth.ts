import { createSelector, Selector } from 'reselect';
import { State } from '../index';

const selectLogin = (state: State) => state.loginReducer;

export const selectQuery: Selector<State, any | null> = createSelector(
  selectLogin,
  ({ queryResponse }) => queryResponse
);
