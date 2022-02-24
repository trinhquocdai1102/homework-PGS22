import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ITransItem } from '../../../models/trans';
import { filterByDate } from '../utils';

export interface TransState {
  item?: ITransItem[];
  initialItem?: ITransItem[];
}

export interface filterTrans {
  type: 'status' | 'payroll_id' | 'time_created';
  value: string | number;
  payload?: string;
}

export const setTransData = createCustomAction('trans/setTransData', (data: ITransItem[]) => ({ data }));

export const setTransInitialData = createCustomAction('trans/setTransInitialData', (data: ITransItem[]) => ({ data }));

export const filterTransData = createCustomAction('trans/filterTransData', (data: filterTrans[]) => ({ data }));

export const setSingleItem = createCustomAction('trans/setSingleItem', (data: ITransItem) => ({ data }));

export const deleteItem = createCustomAction('trans/deleteItem', (id: string) => ({ id }));

export const sortDateData = createCustomAction('trans/sortDateData', () => ({}));

const actions = { setTransData, setTransInitialData, filterTransData, setSingleItem, deleteItem, sortDateData };

type Action = ActionType<typeof actions>;

export default function reducer(state: TransState = {}, action: Action) {
  switch (action.type) {
    case getType(setTransData):
      return { ...state, item: action.data };
    case getType(setTransInitialData):
      return { ...state, initialItem: action.data };
    case getType(filterTransData):
      {
        const filterData = action.data;
        const newData = state.item?.filter((item) => {
          const result = [];
          for (let i = 0; i < filterData.length; i++) {
            const check = filterData[i].payload === '' && filterData[i].value === '';
            if (check) {
              result.push(true);
              continue;
            }
            if (filterData[i].value === '' && filterData[i].payload === undefined) {
              result.push(true);
              continue;
            }
            if (filterData[i].type === 'status' && item[`${filterData[i].type}`] === filterData[i].value) {
              result.push(true);
            }
            if (filterData[i].type === 'payroll_id' && item[`payroll_id`].includes(filterData[i].value.toString())) {
              result.push(true);
            }
            if (filterData[i].type === 'time_created' && filterByDate(item.time_created, filterData[i])) {
              result.push(true);
            }
          }
          return result.length == 3;
        });
        return { ...state, initialItem: newData };
      }
      return {};
    case getType(setSingleItem): {
      const newData = state.item?.map((item) => {
        if (item.payroll_id === action.data.payroll_id) {
          item = { ...action.data };
        }
        return item;
      });
      return { ...state, item: newData, initialItem: newData };
    }
    case getType(deleteItem): {
      const newData = state.item?.filter((item) => {
        return item.payroll_id !== action.id;
      });
      return { state, item: newData, initialItem: newData };
    }

    case getType(sortDateData): {
      const newData = state.initialItem?.sort((a, b) => {
        return +new Date(a.time_created) - +new Date(b.time_created);
      });
      return { ...state, item: newData, tempItem: newData };
    }
    default:
      return state;
  }
}
