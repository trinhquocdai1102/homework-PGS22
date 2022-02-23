import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IListItem } from '../../../models/list';
import Items from './Items';

interface Props {
  isLoading: boolean;
  errorMessage: string;
  listItem?: IListItem[];
}

const ListItemForm = (props: Props) => {
  const { listItem } = props;

  return (
    <>
      <title>
        <FormattedMessage id="listItem" />
      </title>
      <div>
        {listItem?.map((item, index) => {
          return <Items key={index} item={item} />;
        })}
      </div>
    </>
  );
};

export default ListItemForm;
