import React from 'react';
import moment from 'moment';
import { ITransItem } from '../../../models/trans';
import DeleteBtn from '../components/DeleteBtn';
import DetailBtn from '../components/DetailBtn';

interface Props {
  item: ITransItem;
}

const TransItem = (props: Props) => {
  const { item } = props;
  return (
    <tr key={item.payroll_id} className="trans-table-content">
      <td>
        <div style={{ color: item.color }}>{item.status}</div>
      </td>
      <td>
        <div>{moment(item.time_created).format('MM/DD/YYYY')}</div>
      </td>
      <td>
        <div>{item.payment_type}</div>
      </td>
      <td>
        <div>{item.currency}</div>{' '}
      </td>
      <td>
        <div>{(item.volume_input_in_input_currency + item.fees).toFixed(2)}</div>
      </td>
      <td>
        <div>{item.payroll_id}</div>
      </td>
      <td style={{ textAlign: 'center' }}>
        <DetailBtn item={item} />
      </td>
      <td style={{ textAlign: 'center' }}>
        <DeleteBtn item={item} />
      </td>
    </tr>
  );
};

export default TransItem;
