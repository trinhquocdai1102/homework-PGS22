import dayjs from 'dayjs';
// import { ITransItem } from '../../models/trans';
import { filterTrans } from './redux/transReducer';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export interface InputValidation {
  // (volume_input_in_input_currency): number | string;
  time_created: string;
}

export const filterByDate = (itemData: string, filterData: filterTrans) => {
  if (filterData.value && filterData.payload === '') {
    return dayjs(itemData).isAfter(filterData.value, 'date');
  }
  if (filterData.payload && filterData.value === '') {
    return dayjs(itemData).isBefore(filterData.payload, 'date');
  }
  if (filterData.value && filterData.payload) {
    return dayjs(itemData).isBetween(filterData.value, filterData.payload, 'date');
  }
};

export const validateEmptyField = (fieldValue: string | number) => {
  if (!fieldValue) {
    return 'valueRequire';
  }

  return '';
};
// export const validateItemInput = (value: ITransItem): InputValidation => {
//   return {
//     volume_input_in_input_currency: validateEmptyField(value.volume_input_in_input_currency),
//     time_created: validateEmptyField(value.time_created),
//   };
// };

// export const validItemInput = (values: InputValidation) => {
//   return !values.time_created && !values.volume_input_in_input_currency;
// };
