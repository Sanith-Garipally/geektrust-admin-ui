import React, { useEffect, useState } from 'react';
import { Popconfirm } from 'antd';
import Header from '../Header';
import UserList from '../UserList';
import UserPagination from '../UserPagination';
import './index.css';

const apiUrl =
  'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isSelectAllActive, setSelectAllActive] = useState(false);
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getUsers();
  }, []);

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const editUser = (id, payload) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name: payload.editedName,
          email: payload.editedEmail,
          role: payload.editedRole,
        };
      }
      return { ...user };
    });
    setUsers(updatedUsers);
  };

  const handleFilterUsers = (e) => {
    setSearchText(e.target.value);
  };

  const handlePagination = (page) => {
    setPage(page);
  };

  const filteredData = users.filter((user) => {
    const { name, email, role } = user;
    const searchQuery = searchText.toLowerCase();
    return (
      name.toLowerCase().includes(searchQuery) ||
      email.toLowerCase().includes(searchQuery) ||
      role.toLowerCase().includes(searchQuery)
    );
  });

  let paginatedData;
  if (page === 1) {
    paginatedData = filteredData.slice(0, page * usersPerPage);
  } else {
    paginatedData = filteredData.slice(
      (page - 1) * usersPerPage,
      page * usersPerPage
    );
  }

  const handleUserSelects = (id) => {
    if (selectedUsers.includes(id)) {
      const updatedList = selectedUsers.filter((userId) => userId !== id);
      setSelectedUsers(updatedList);
    } else {
      setSelectedUsers((prevList) => [...prevList, id]);
    }
  };

  const handleSelectAll = () => {
    if (isSelectAllActive) {
      setSelectAllActive(false);
      setSelectedUsers([]);
    } else {
      const idArray = paginatedData.map((user) => user.id);
      setSelectAllActive(true);
      setSelectedUsers(idArray);
    }
  };

  const deleteSelected = () => {
    if (selectedUsers.length === 0) return null;
    const updatedUsers = users.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectAllActive(false);
  };

  return (
    <>
      <Header />
      <div className='dashboard-container'>
        <div className='dsh-content-container'>
          <input
            className='input-search'
            value={searchText}
            onChange={handleFilterUsers}
            type='search'
            placeholder='Search by name, email or role'
          />
          <ul className='user-list-container'>
            <li className='list-header'>
              <input
                className='checkbox-input'
                checked={isSelectAllActive}
                onChange={handleSelectAll}
                type='checkbox'
              />
              <h3 className='header-table-name'>Name</h3>
              <h3 className='header-table-email'>Email</h3>
              <h3 className='header-table-role'>Role</h3>
              <h3 className='header-table-actions'>Actions</h3>
            </li>
            {paginatedData.map((user) => (
              <UserList
                handleUserSelects={handleUserSelects}
                selectedUsers={selectedUsers}
                key={user.id}
                userItem={user}
                deleteUser={deleteUser}
                editUser={editUser}
              />
            ))}
          </ul>
          <div className='pagination-container'>
            <Popconfirm
              title='Are you sure you want to delete selected users?'
              onConfirm={deleteSelected}
              okText='Yes'
              cancelText='No'
            >
              <button className='delete-all-btn'>Delete Selected</button>
            </Popconfirm>
            <UserPagination
              onPageChange={handlePagination}
              currentPage={page}
              pageSize={usersPerPage}
              totalUsers={users.length}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
