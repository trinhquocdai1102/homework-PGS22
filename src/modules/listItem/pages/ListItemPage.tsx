import React, { useState } from 'react';
import logo from '../../../logo-420-x-108.png';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { getErrorMessageResponse } from '../../../utils';
import ListItemForm from '../components/ListItemForm';
import { setListItemData } from '../redux/listReducer';

const ListItemPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const listItem = useSelector((state: AppState) => state.list.list);
  const [errorMessage, setErrorMessage] = useState('');
  const [templateListItem, setTemplateListItem] = useState(useSelector((state: AppState) => state.list.list));

  const fetchListItem = React.useCallback(async () => {
    setErrorMessage('');
    setLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.listItem, 'get'));

    setLoading(false);
    if (json) {
      dispatch(setListItemData(json));
      return;
    }
    setErrorMessage(getErrorMessageResponse(json));
  }, [dispatch]);

  React.useEffect(() => {
    fetchListItem();
  }, [fetchListItem]);

  React.useEffect(() => {
    if (!templateListItem) {
      setTemplateListItem(listItem);
    }
  }, [listItem, templateListItem]);

  return (
    <div
      className="container"
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {loading === false && (
        <>
          <div className="submit-item-btn container">
            <button
              className="btn btn-confirm"
              type="submit"
              onClick={() => {
                if (templateListItem) {
                  setTemplateListItem(listItem);
                }
              }}
            >
              Confirm
            </button>
            <button
              className="btn btn-reset"
              type="submit"
              onClick={() => {
                if (templateListItem) {
                  dispatch(setListItemData([...templateListItem]));
                }
              }}
            >
              Reset
            </button>
          </div>
          <ListItemForm listItem={listItem} isLoading={loading} errorMessage={errorMessage} />
        </>
      )}
    </div>
  );
};

export default ListItemPage;
