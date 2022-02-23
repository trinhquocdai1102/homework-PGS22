import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../configs/routes';
import { IListItem } from '../../../models/list';
import { AppState } from '../../../redux/reducer';
import { setItemValue } from '../redux/listReducer';

interface Props {
  item: IListItem;
  // changeTitle(id: number, value: string): void;
}

const Items = (prop: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isTag, setTag] = useState(true);
  const { id, title, thumbnailUrl } = prop.item;

  const [text, setText] = React.useState(title);
  const onBlur = React.useCallback(
    (text: string) => {
      if (id && text) {
        dispatch(setItemValue({ id: +id, value: text }));
        setTag(true);
      }
    },
    [dispatch, id],
  );

  React.useEffect(() => {
    setText(title);
  }, [title]);
  return (
    <div className="list-item">
      <Link to={`${ROUTES.detailItem}/${id}`} className="list-item-image">
        <img src={thumbnailUrl} alt="" />
      </Link>
      <div className="list-item-content">
        {isTag ? (
          <h4 onClick={() => setTag(false)}>{text}</h4>
        ) : (
          <input
            autoFocus
            onBlur={(e) => {
              setTag(false);
              onBlur(e.target.value);
            }}
            type="text"
            value={text}
            className="form-control input-item-content"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        )}
        <p className="item-date">{Date.now()}</p>
      </div>
    </div>
  );
};

export default memo(Items);
