import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ITransItem } from '../../../models/trans';
import { AppState } from '../../../redux/reducer';
import { mockData } from '../../../configs/mockData';
import TransactionsListForm from '../components/TransactionsListForm';
import { setTransData, setTransInitialData, sortDateData } from '../redux/transReducer';
import Pagination from '../components/Pagination';

const TransactionsListPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const data = useSelector((state: AppState) => {
    return state.trans.initialItem;
  });
  const [dataTrans, setDataTrans] = useState<ITransItem[]>();
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    currentItem: 0,
    itemPerPage: 5,
    totalItem: mockData.length,
  });

  const handleChangePage = (number: number) => {
    if (dataTrans) {
      if (number === 0 || number === Math.ceil(pageInfo.totalItem / pageInfo.itemPerPage) + 1) return;
      setPageInfo((prev) => {
        return { ...prev, page: number, currentItem: number * pageInfo.itemPerPage };
      });
    }
  };

  const handleChangeRowPerPage = (number: number) => {
    setPageInfo((prev) => {
      return { ...prev, itemPerPage: number, page: 1, currentItem: 0 };
    });
  };

  const sortDate = () => {
    if (data) {
      dispatch(sortDateData());
      setPageInfo((prev) => {
        return { ...prev };
      });
    }
  };

  React.useEffect(() => {
    dispatch(setTransData(mockData));
    dispatch(setTransInitialData(mockData));
  }, [dispatch]);

  React.useEffect(() => {
    if (data) {
      setDataTrans(
        data.slice(pageInfo.page * pageInfo.itemPerPage - pageInfo.itemPerPage, pageInfo.page * pageInfo.itemPerPage),
      );
    }
  }, [data, pageInfo]);

  React.useEffect(() => {
    if (data) {
      if (data.length != pageInfo.totalItem) {
        setPageInfo({ page: 1, currentItem: 0, itemPerPage: 5, totalItem: data.length });
      }
    }
  }, [data, pageInfo.totalItem, pageInfo.currentItem, pageInfo.page, pageInfo.itemPerPage]);
  return (
    <div>
      {dataTrans && <TransactionsListForm data={dataTrans} sortDate={sortDate} />}
      {dataTrans && (
        <Pagination
          currentPage={+pageInfo.page}
          totalPage={+(pageInfo.totalItem / pageInfo.itemPerPage)}
          itemPerPage={+pageInfo.itemPerPage}
          onChangePage={handleChangePage}
          onChangeRowPerPage={handleChangeRowPerPage}
        />
      )}
    </div>
  );
};

export default TransactionsListPage;
