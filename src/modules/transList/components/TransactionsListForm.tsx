import React, { memo } from 'react';
import { ITransItem } from '../../../models/trans';
import FilterForm from '../../transList/components/FilterForm';
import TransItem from '../components/TransItem';
import { BsChevronCompactDown } from 'react-icons/bs';
import { BsInfoCircleFill } from 'react-icons/bs';
import { AiFillCaretDown } from 'react-icons/ai';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import moment from 'moment';

interface Props {
  data: ITransItem[];
  sortDateAll(): void;
  sortDatePerPage(): void;
}

const TransactionsListForm = (props: Props) => {
  const { data, sortDateAll } = props;
  const dataExport = useSelector((state: AppState) => state.trans.initialItem);

  const headers = [
    { label: 'Status', key: 'status' },
    { label: 'Date', key: 'date' },
    { label: 'Funding Method', key: 'method' },
    { label: 'Payroll Currency', key: 'currency' },
    { label: 'Total', key: 'total' },
    { label: 'Order', key: 'order' },
  ];

  const dataCSV = dataExport
    ? dataExport.map((item) => {
        return {
          status: item.status,
          date: moment(item.time_created).format('MM/DD/YYYY'),
          method: item.payment_type,
          currency: item.currency,
          total: +(item.volume_input_in_input_currency + item.fees).toFixed(2),
          order: `'${item.payroll_id}`,
        };
      })
    : [];
  const csvLink = {
    headers: headers,
    data: dataCSV,
    filename: 'my-file.csv',
  };

  return (
    <div className="trans-list-page">
      <div className="trans-title">
        <h2>Payroll Transactions List</h2>
        <CSVLink {...csvLink}>
          <button type="button" className="btn btn-primary">
            Export CSV <BsChevronCompactDown />
          </button>
        </CSVLink>
      </div>
      <FilterForm />
      <table style={{ width: '100%', margin: '2% 0 0', borderSpacing: ' 0 16px', borderCollapse: 'separate' }}>
        <thead>
          <tr className="trans-table-header">
            <th style={{ position: 'relative', cursor: 'pointer' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                Status <BsInfoCircleFill />
              </span>
              <small className="status-detail">Trạng thái giao dịch</small>
            </th>
            <th onClick={sortDateAll} style={{ cursor: 'pointer' }}>
              Date <AiFillCaretDown />
            </th>
            <th>Funding Method</th>
            <th>Payroll Currency</th>
            <th>Total</th>
            <th style={{ width: '20%' }}>Order #</th>
            <th style={{ minWidth: '160px' }}></th>
            <th style={{ width: '6%' }}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return <TransItem key={index} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default memo(TransactionsListForm);
