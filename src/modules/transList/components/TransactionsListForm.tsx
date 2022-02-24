import React from 'react';
import { ITransItem } from '../../../models/trans';
import FilterForm from '../../transList/components/FilterForm';
import TransItem from '../components/TransItem';
import { BsChevronCompactDown } from 'react-icons/bs';
import { BsInfoCircleFill } from 'react-icons/bs';
import { AiFillCaretDown } from 'react-icons/ai';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
interface Props {
  data: ITransItem[];
  sortDate(): void;
}

const TransactionsListForm = (props: Props) => {
  const { data, sortDate } = props;
  const dataExport = useSelector((state: AppState) => state.trans.item);

  const headers = [
    { label: 'Status', key: 'status' },
    { label: 'Date', key: 'date' },
    { label: 'Funding Method', key: 'method' },
    { label: 'Payroll Currency', key: 'currency' },
    { label: 'Total', key: 'total' },
    { label: 'Order', key: 'order' },
  ];

  const dataCSV = dataExport?.map((item) => {
    return {
      status: item.status,
      date: item.time_created,
      method: item.payment_type,
      currency: item.currency,
      total: +(item.volume_input_in_input_currency + item.fees),
      order: item.payroll_id,
    };
  });

  const csvLink = {
    headers: headers,
    data: dataCSV,
  };

  return (
    <div className="trans-list-page">
      <div className="trans-title">
        <h2>Payroll Transactions List</h2>
        {/* <CSVLink {...csvLink}> */}
        <button type="button" className="btn btn-primary">
          Export CSV <BsChevronCompactDown />
        </button>
        {/* </CSVLink> */}
      </div>
      <FilterForm />
      <table style={{ width: '100%', margin: '40px 0 0', borderSpacing: ' 0 16px', borderCollapse: 'separate' }}>
        <thead>
          <tr className="trans-table-header">
            <th style={{ position: 'relative', cursor: 'pointer' }}>
              Status <BsInfoCircleFill />
              <small className="status-detail">Trạng thái giao dịch</small>
            </th>
            <th onClick={sortDate} style={{ cursor: 'pointer' }}>
              Date <AiFillCaretDown />
            </th>
            <th>Funding Method</th>
            <th>Payroll Currency</th>
            <th>Total</th>
            <th style={{ width: '25%' }}>Order #</th>
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

export default React.memo(TransactionsListForm);
