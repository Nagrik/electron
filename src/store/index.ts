import { createMemoryHistory } from 'history';

import thunk from 'redux-thunk';
import {
  applyMiddleware,
  combineReducers,
  compose,
  configureStore,
} from '@reduxjs/toolkit';
import loginReducer from './reducers/auth';

export const history = createMemoryHistory();

// const rootReducer = combineReducers({
//   router: connectRouter(history),
//   loginReducer,
// });

const reducers = combineReducers({
  loginReducer,
});

export default configureStore({
  reducer: reducers,
});
