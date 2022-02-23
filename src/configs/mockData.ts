import { LIST_PAYROLL } from '../../src/modules/auth/data/mock_data';

export const mockData = LIST_PAYROLL.payrolls.map((item) => {
  if (item.date_fulfilled) {
    return { ...item, status: 'Fulfilled' };
  } else if (item.date_processed) {
    return { ...item, status: 'Processed' };
  } else if (item.date_received) {
    return { ...item, status: 'Received' };
  } else if (item.date_canceled) {
    return { ...item, status: 'Canceled' };
  } else return { ...item, status: 'Pending' };
});
