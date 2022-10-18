import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface LoginState {
  queryResponse: any | null;
}

const initialState: LoginState = {
  queryResponse: null,
};

export class LoginReducer extends ImmerReducer<LoginState> {
  setQueryResponse(queryResponse: any) {
    // get prev state and set new state
    this.draftState.queryResponse = {
      ...this.draftState.queryResponse,
      queryResponse,
    };
  }
}

export default createReducerFunction(LoginReducer, initialState);
