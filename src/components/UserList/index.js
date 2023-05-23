import React, { useReducer, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Modal, Form, Input, Tag } from 'antd';
import './index.css';

const editReducer = (state, action) => {
  switch (action.type) {
    case 'editName':
      return { ...state, editedName: action.value };

    case 'editEmail':
      return { ...state, editedEmail: action.value };

    case 'editRole':
      return { ...state, editedRole: action.value };

    default:
      return { editedName: '', editedEmail: '', editedRole: '' };
  }
};

const UserList = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, dispatch] = useReducer(editReducer, {
    editedName: '',
    editedEmail: '',
    editedRole: '',
  });
  const { userItem, deleteUser, editUser, selectedUsers, handleUserSelects } =
    props;
  const { id, name, email, role } = userItem;

  const confirm = () => {
    deleteUser(id);
    message.success(`User with id-${id} deleted successfully!`);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFormFinish = () => {
    editUser(id, editedUser);
    dispatch({ type: 'default' });
    setIsModalOpen(false);
    message.success('User Edited Successfully!');
  };

  const handleCancel = () => {
    dispatch({ type: 'default' });
    setIsModalOpen(false);
  };

  return (
    <>
      <hr className='hr' />

      <li className='list-item'>
        <input
          onChange={() => handleUserSelects(id)}
          checked={selectedUsers.includes(id)}
          type='checkbox'
          className='list-item-checkbox'
        />
        <p className='table-row-name'>{name}</p>
        <p className='table-row-email'>{email}</p>
        <p className='table-row-role'>{role}</p>
        <div className='btns-container'>
          <button className='edit-btn' onClick={showModal}>
            <EditOutlined />
          </button>
          <Popconfirm
            title='Are you sure you want to delete this user?'
            onConfirm={confirm}
            okText='Yes'
            cancelText='No'
          >
            <button className='delete-btn' type='link'>
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
        <Modal
          title='Edit User'
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onFinish={handleFormFinish}>
            <Tag className='tag' color='red'>
              Leave Fields blank if you dont wish to update
            </Tag>
            <Form.Item label='Name'>
              <Input
                onChange={(e) =>
                  dispatch({ type: 'editName', value: e.target.value })
                }
                placeholder={name}
              />
            </Form.Item>
            <Form.Item label='Email'>
              <Input
                onChange={(e) =>
                  dispatch({ type: 'editEmail', value: e.target.value })
                }
                placeholder={email}
              />
            </Form.Item>
            <Form.Item label='Role'>
              <Input
                onChange={(e) =>
                  dispatch({ type: 'editRole', value: e.target.value })
                }
                placeholder={role}
              />
            </Form.Item>
            <Form.Item className='modal-btn'>
              <Button type='primary' htmlType='submit'>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </li>
    </>
  );
};

export default UserList;
