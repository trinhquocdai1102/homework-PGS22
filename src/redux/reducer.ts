import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import listReducer, { ListItemState } from '../modules/listItem/redux/listReducer';
import transReducer, { TransState } from '../modules/transList/redux/transReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  list: ListItemState;
  trans: TransState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    list: listReducer,
    trans: transReducer,
  });
}
