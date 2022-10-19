import { createActionCreators } from 'immer-reducer';
import { LoginReducer } from '../reducers/auth';
import { AsyncAction } from './common';

export const loginActions = createActionCreators(LoginReducer);

export type LoginActions = ReturnType<typeof loginActions.setQueryResponse>;

export const setQuery =
  (response: any): AsyncAction =>
  async (dispatch: any) => {
    try {
      dispatch(loginActions.setQueryResponseDashboard(response));
    } catch (e) {
      // console.log(e);
    }
  };
