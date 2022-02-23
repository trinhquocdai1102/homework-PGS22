import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AuthToken, IUser } from '../../../models/user';

export interface AuthState {
  auth?: AuthToken;
  user?: IUser;
}

export const setAuthorization = createCustomAction('auth/setAuthorization', (data: AuthToken) => ({
  data,
}));

export const setUserInfo = createCustomAction('auth/setUserInfo', (data: IUser) => ({
  data,
}));

export const resetData = createCustomAction('auth/resetData', () => ({}));

// const changNameUser = createCustomAction('user/changNameUser', (data: IUser) => {
//   data;
// });

export const deleteTransItem = createCustomAction('auth/deleteItem', (data) => ({
  type: 'DELETE_ITEM',
  item: data,
}));

const actions = { setAuthorization, setUserInfo, resetData, deleteTransItem };

type Action = ActionType<typeof actions>;

export default function reducer(state: AuthState = {}, action: Action) {
  switch (action.type) {
    case getType(setAuthorization):
      return { ...state, auth: action.data };
    case getType(setUserInfo):
      return { ...state, user: action.data };
    case getType(resetData):
      return {};
    case getType(deleteTransItem):
      return { ...state, item: action.item };
    default:
      return state;
  }
}
