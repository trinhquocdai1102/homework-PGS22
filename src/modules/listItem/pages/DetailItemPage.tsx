import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { useParams } from 'react-router';
import { fetchThunk } from '../../common/redux/thunk';
import Items from '../components/Items';
import { IListItem } from '../../../models/list';
import { API_PATHS } from '../../../configs/api';

const DetailItemPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { id } = useParams<{ id: string | undefined }>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IListItem>();

  const fetchDataItem = useCallback(async () => {
    setLoading(true);
    const resp = await dispatch(fetchThunk(`${API_PATHS.listItem}/${id}`, 'get'));
    if (resp) {
      setData(resp);
    }
    setLoading(false);
  }, [dispatch, id]);

  useEffect(() => {
    fetchDataItem();
  }, [fetchDataItem]);
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }
  return <div style={{ display: 'flex', justifyContent: 'center' }}>{data && <Items item={data} />}</div>;
};

export default DetailItemPage;
