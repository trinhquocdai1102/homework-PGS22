import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IListItem } from '../../../models/list';

export interface ListItemState {
  list?: IListItem[];
  pendingList?: IListItem[];
}

export const setListItemData = createCustomAction('list/setListItemData', (data: IListItem[]) => ({
  data,
}));

export const setPendingList = createCustomAction('list/setPendingList', (data: IListItem[]) => ({
  data,
}));

export const setItemValue = createCustomAction('list/setItemValue', (data: { id: number; value: string }) => ({
  data,
}));

const actions = { setListItemData, setPendingList, setItemValue };

type Action = ActionType<typeof actions>;

export default function reducer(state: ListItemState = {}, action: Action) {
  switch (action.type) {
    case getType(setListItemData):
      return { ...state, list: action.data };
    case getType(setPendingList):
      return { ...state, pendingList: action.data };
    case getType(setItemValue): {
      if (state.list) {
        const newItems = [...state.list];
        const { id, value } = action.data;
        const cloneItem = { ...newItems[+id - 1], title: value };
        newItems[+id - 1] = cloneItem;
        return { ...state, list: newItems };
      }
      return { ...state };
    }
    default:
      return state;
  }
}
