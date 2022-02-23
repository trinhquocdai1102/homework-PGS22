import React from 'react';
import { filterTrans, filterTransData } from '../redux/transReducer';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import ApplyClearButton from '../../common/components/ApplyClearButton';
import { BsCalendarCheck } from 'react-icons/bs';

const FilterForm = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isType, setType] = React.useState('text');
  const [display, setDisplay] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState<filterTrans[]>([
    { type: 'status', value: '' },
    { type: 'time_created', value: '', payload: '' },
    { type: 'payroll_id', value: '' },
  ]);

  const onFocus = () => {
    setType('date');
    setDisplay(false);
  };

  const onBlur = () => {
    setType('text');
    setDisplay(true);
  };

  const filterByField = React.useCallback((data: filterTrans) => {
    setFilterValue((prev) => {
      const newValue = prev?.map((item) => {
        if (item.type === data.type) {
          item.value = data.value;
          item.payload = data.payload;
        } else {
          return item;
        }
        return item;
      });
      return newValue;
    });
  }, []);

  const clearFilter = React.useCallback(() => {
    setFilterValue((prev) => {
      return prev.map((item) => {
        return { ...item, value: '' };
      });
    });
  }, []);

  React.useEffect(() => {
    dispatch(filterTransData(filterValue));
  }, [filterValue, dispatch]);
  return (
    <ul className="trans-header">
      <ul className="trans-header-content trans-header-content-left ">
        <li>
          <select
            name="status"
            id="status"
            form="statusForm"
            className="btn"
            onChange={(e) => filterByField({ type: 'status', value: e.target.value })}
          >
            <option value={''}>Status</option>
            <option value="Fulfilled">Fulfilled</option>
            <option value="Processed">Processing</option>
            <option value="Received">Received</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>
        </li>
        <li className="date-form">
          <input
            type={isType}
            className="date-input btn"
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="From"
            onChange={(e) => {
              filterByField({ ...filterValue[1], value: e.target.value });
            }}
          />
          <BsCalendarCheck className={display ? 'date-input-icon' : 'displayNone'} onClick={onFocus} />
        </li>
        <li className="date-form">
          <input
            type={isType}
            className="date-input btn"
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="To"
            onChange={(e) => {
              filterByField({ ...filterValue[1], payload: e.target.value });
            }}
          />
          <BsCalendarCheck className={display ? 'date-input-icon' : 'displayNone'} onClick={onFocus} />
        </li>
        <li>
          <input
            className="trans-header-item btn"
            type="text"
            placeholder="Order #"
            onChange={(e) => filterByField({ type: 'payroll_id', value: e.target.value })}
          />
        </li>
      </ul>
      <ApplyClearButton onClear={clearFilter} />
    </ul>
  );
};

export default FilterForm;
