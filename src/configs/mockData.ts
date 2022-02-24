import { LIST_PAYROLL } from '../../src/modules/auth/data/mock_data';

export const mockData = LIST_PAYROLL.payrolls.map((item) => {
  if (item.date_fulfilled) {
    return { ...item, status: 'Fulfilled', color: 'green' };
  } else if (item.date_processed) {
    return { ...item, status: 'Processed', color: 'orange' };
  } else if (item.date_received) {
    return { ...item, status: 'Received', color: 'blue' };
  } else if (item.date_canceled) {
    return { ...item, status: 'Canceled', color: 'red' };
  } else return { ...item, status: 'Pending', color: '#ccc' };
});
