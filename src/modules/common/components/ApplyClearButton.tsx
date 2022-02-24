import React from 'react';

interface Props {
  onClear(): void;
}

const ApplyClearButton = (props: Props) => {
  const { onClear } = props;
  return (
    <ul className="trans-header-btn trans-header-content">
      <li>
        <button type="submit" className="btn apply-btn">
          Apply
        </button>
      </li>
      <li>
        <button
          type="submit"
          className="btn clear-btn"
          onClick={() => {
            onClear();
          }}
        >
          Clear
        </button>
      </li>
    </ul>
  );
};

export default ApplyClearButton;
