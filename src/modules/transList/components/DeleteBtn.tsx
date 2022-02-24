import React, { useState } from 'react';
import { deleteItem } from '../redux/transReducer';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ITransItem } from '../../../models/trans';
import { AiOutlineClose } from 'react-icons/ai';
import { AppState } from '../../../redux/reducer';

interface Props {
  item: ITransItem;
}

const DeleteBtn = (props: Props) => {
  const { item } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isOpen, setOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteItem(item.payroll_id));
  };
  return (
    <>
      <div className={isOpen ? 'confirm-modal' : 'displayNone'}>
        <div className="behind-modal" onClick={() => setOpen(false)}></div>
        <div className="confirm-modal-content">
          <p>Bạn có chắc chắn muốn xóa?</p>
          <AiOutlineClose
            className="close-modal-btn"
            onClick={() => {
              setOpen(false);
            }}
          />
          <div className="modal-button">
            <button
              className="modal-button_confirm"
              onClick={() => {
                handleDelete();
                setOpen(false);
              }}
            >
              Đồng ý
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
      <button type="submit" className="btn delete-btn" onClick={() => setOpen(true)}>
        <RiDeleteBin5Line style={{ fontSize: '20px', color: 'red' }} />
      </button>
    </>
  );
};

export default DeleteBtn;
