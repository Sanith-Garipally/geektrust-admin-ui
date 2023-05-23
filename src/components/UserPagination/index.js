import React from 'react';
import {
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';
import './index.css';

const UserPagination = (props) => {
  const { onPageChange, currentPage, pageSize, totalUsers } = props;
  let buttonsArray = [];
  const totalPages = Math.ceil(totalUsers / pageSize);
  for (let index = 1; index < totalPages + 1; index++) {
    buttonsArray.push(index);
  }
  return (
    <ul className='pagination-list-container'>
      <li>
        <button
          className={`pg-btn ${currentPage === 1 && 'disabled'}`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          <DoubleLeftOutlined />
        </button>
      </li>
      <li>
        <button
          className={`pg-btn ${currentPage === 1 && 'disabled'}`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <LeftOutlined />
        </button>
      </li>
      {buttonsArray.map((id) => (
        <li key={id}>
          <button
            onClick={() => onPageChange(id)}
            className={`pg-btn ${id === currentPage && 'active-page'}`}
          >
            {id}
          </button>
        </li>
      ))}
      <li>
        <button
          className={`pg-btn ${currentPage === totalPages && 'disabled'}`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <RightOutlined />
        </button>
      </li>
      <li>
        <button
          className={`pg-btn ${currentPage === totalPages && 'disabled'}`}
          onClick={() => onPageChange(totalPages)}
        >
          <DoubleRightOutlined />
        </button>
      </li>
    </ul>
  );
};

export default UserPagination;
