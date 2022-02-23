import React from 'react';
import { GrNext } from 'react-icons/gr';
import { GrPrevious } from 'react-icons/gr';
import { GiPreviousButton } from 'react-icons/gi';
import { GiNextButton } from 'react-icons/gi';

interface Props {
  totalPage: number;
  itemPerPage: number;
  currentPage: number;
  onChangePage(number: number): void;
  onChangeRowPerPage(number: number): void;
}

const Pagination = (props: Props) => {
  const lastPage = Math.ceil(props.totalPage);
  const [displayPage, setDisplayPage] = React.useState({ start: 0, end: 4 });
  const totalPage = Array.from(Array(lastPage).keys()).slice(displayPage.start, displayPage.end);
  const pages = [5, 10, 15, 20, 25];
  const changeDisplayPage = React.useCallback(() => {
    if (lastPage < 4) return;
    if (props.currentPage === 1) {
      setDisplayPage({ start: 0, end: 4 });
    }
    if (props.currentPage === displayPage.end) {
      setDisplayPage((prev) => {
        return { start: prev.start + 3, end: prev.end + 3 };
      });
    }
    if (props.currentPage === displayPage.start && props.currentPage !== 1) {
      setDisplayPage((prev) => {
        return { start: prev.start - 3, end: prev.end - 3 };
      });
    }
    return;
  }, [props.currentPage, lastPage, displayPage.end, displayPage.start]);

  const lastItemIsShow = () => {
    if (props.currentPage === lastPage) {
      return props.totalPage * props.itemPerPage;
    } else {
      return props.currentPage * props.itemPerPage;
    }
  };

  React.useEffect(() => {
    changeDisplayPage();
  }, [changeDisplayPage]);
  return (
    <div className="pagination">
      <div className="pagination-left">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'blue' }}>Rows per page:</span>
          <select
            name="rowsPerPage"
            id="rowsPerPage"
            form="rowsPerPage"
            onChange={(e) => props.onChangeRowPerPage(+e.target.value)}
          >
            {pages.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <p>
          {(props.currentPage - 1) * props.itemPerPage + 1}-{lastItemIsShow()}
          {''} of {''}
          {props.totalPage * props.itemPerPage}
        </p>
      </div>
      <ul className="pagination-right">
        <li
          className={`${props.currentPage === 1 ? 'displayNone' : ''} pagination-list`}
          onClick={() => {
            props.onChangePage(1);
          }}
        >
          <p className="pagination-item" aria-label="Previous">
            <GiPreviousButton />
          </p>
        </li>
        <li
          className={`${props.currentPage === 1 ? 'displayNone' : ''} pagination-list`}
          onClick={() => {
            if (props.currentPage === 1) return;
            props.onChangePage(props.currentPage - 1);
          }}
        >
          <p className="pagination-item" aria-label="Previous">
            <GrPrevious />
          </p>
        </li>
        {totalPage.map((num) => {
          return (
            <li key={num} className={`${num + 1 === props.currentPage ? 'active' : ''} pagination-list`}>
              <p
                className="pagination-item"
                onClick={() => {
                  props.onChangePage(num + 1);
                }}
              >
                {+num + 1}
              </p>
            </li>
          );
        })}
        <li
          className={`${props.currentPage === lastPage ? 'displayNone' : ''} pagination-list`}
          onClick={() => {
            if (props.currentPage === lastPage) return;
            props.onChangePage(props.currentPage + 1);
          }}
        >
          <p className="pagination-item" aria-label="Next">
            <GrNext />
          </p>
        </li>
        <li
          className={`${props.currentPage === lastPage ? 'displayNone' : ''} pagination-list`}
          onClick={() => {
            props.onChangePage(lastPage);
            setDisplayPage({ start: lastPage - 4, end: lastPage });
          }}
        >
          <p className="pagination-item" aria-label="Next">
            <GiNextButton />
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
