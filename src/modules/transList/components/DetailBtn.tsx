import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ITransItem } from '../../../models/trans';
import { AppState } from '../../../redux/reducer';
import { AiOutlineClose } from 'react-icons/ai';
import moment from 'moment';
import { setSingleItem } from '../redux/transReducer';

interface Props {
  item: ITransItem;
}

const DetailBtn = (props: Props) => {
  const { item } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isOpen, setOpen] = useState(false);
  const [isType, setType] = useState('text');
  const [changeData, setChangeData] = useState(item);

  const onFocus = () => {
    setType('date');
  };

  const onBlur = () => {
    setType('text');
  };

  const handleSave = () => {
    if (changeData) {
      dispatch(setSingleItem(changeData));
    }
  };

  useEffect(() => {
    if (item) {
      setChangeData(item);
    }
  }, [item]);
  return (
    <>
      <div className={isOpen ? 'trans-modal' : 'displayNone'}>
        <div className="behind-modal" onClick={() => setOpen(false)}></div>
        <div className="trans-modal-content">
          <p>Thông tin chi tiết</p>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="row g-1 needs-validation trans-modal-form"
          >
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="statusModal">Status</label>
                <select
                  name="statusModal"
                  form="statusModal"
                  id="statusModal"
                  className="form-control"
                  defaultValue={item.status}
                  onChange={(e) => {
                    setChangeData({ ...item, status: e.target.value });
                  }}
                >
                  <option value="Fulfilled">Fulfilled</option>
                  <option value="Processed">Processing</option>
                  <option value="Received">Received</option>
                  <option value="Pending">Pending</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="dateModal">Date</label>
                <input
                  type={isType}
                  className="form-control"
                  id="dateModal"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  defaultValue={moment(item.time_created).format('MM/DD/YYYY')}
                  placeholder={moment(item.time_created).format('MM/DD/YYYY')}
                  onChange={(e) => {
                    setChangeData({ ...item, time_created: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="totalModal">Total</label>
                <input
                  type="number"
                  className="form-control"
                  id="totalModal"
                  defaultValue={(item.volume_input_in_input_currency + item.fees).toFixed(2)}
                  onChange={(e) => {
                    setChangeData({ ...item, volume_input_in_input_currency: +e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="orderModal">Order #</label>
                <input type="text" defaultValue={item.payroll_id} className="form-control" id="orderModal" disabled />
              </div>
            </div>
          </form>
          <AiOutlineClose
            className="close-modal-btn"
            onClick={() => {
              setOpen(false);
            }}
          />
          <div className="modal-button" style={{ bottom: '32px' }}>
            <button
              className="modal-button_save"
              onClick={() => {
                handleSave();
                setOpen(false);
              }}
            >
              Lưu lại
            </button>
            <button
              className="modal-button_cancel"
              onClick={() => {
                setOpen(false);
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className="view-detail" onClick={() => setOpen(true)}>
        View Details
      </button>
    </>
  );
};

export default DetailBtn;
