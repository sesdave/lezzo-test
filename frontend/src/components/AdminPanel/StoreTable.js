import React, { useEffect, useState } from 'react';
import Layout from '../../containers/Layout';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchStores, selectStores, selectLoading, selectError, addStore, updateStoreById, deleteStoreById } from '../../redux/slice/storeSlice';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import  AddStoreModal  from './modals/shop';
import DeleteConfirmationModal from './modals/delete';

const StoreTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const stores = useSelector(selectStores);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState({})

  const handleAddStore = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = (storeData) => {
    if (initialValues) {
      dispatch(updateStoreById({storeId: initialValues.storeId, storeData }));
    } else {
      dispatch(addStore(storeData));
    }
    setIsModalVisible(false);
  };

  const handleRead = ()=>{

  }
  const handleUpdate = (record) => {
    setInitialValues(record); 
    setIsModalVisible(true);
  };
  const handleDeleteAction = (record)=>{
    setStoreToDelete(record)
    setIsDeleteModalVisible(true);
  }

  const handleDelete = ()=>{
    dispatch(deleteStoreById({ storeId:storeToDelete.storeId }))
    setStoreToDelete({})
    setIsDeleteModalVisible(false);
  }

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Location',
      dataIndex: 'location'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={(e) => { e.stopPropagation(); handleRead(record); }}
          >
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={(e) => { e.stopPropagation(); handleUpdate(record); }}
          >
          </Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={(e) => { e.stopPropagation(); handleDeleteAction(record); }}
          >
          </Button>
        </span>
      ),
    }
  ];

  const handleRowClick = (record) => {
    navigate(`/categories/${record.storeId}`);
  };

  const handleDeleteCancel = ()=>{
    setStoreToDelete({})
    setIsDeleteModalVisible(false)
  }

  const renderTable = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className="mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-4">
        <div></div>
        <Button onClick={handleAddStore}>Add New Shop</Button>
      </div>
        <Table
          columns={columns}
          dataSource={stores}
          pagination={true}
          scroll={{ y: 400 }}
          rowClassName={() => 'clickable-row'}
          onRow={(record) => ({
            onClick: () => handleRowClick(record)
          })}
        />
        <AddStoreModal 
          visible={isModalVisible} 
          onCancel={handleCancel} 
          onOk={handleOk} 
          mode={initialValues ? "edit" : "add"}
          initialValues={initialValues} />
        <DeleteConfirmationModal
          visible={isDeleteModalVisible}
          onCancel={handleDeleteCancel}
          onConfirm={handleDelete}
          itemName={storeToDelete.name}
        />
      </div>
    );
  };

  return (
    <Layout title="Stores" description="Manage your stores">
      {renderTable()}
    </Layout>
  );
};

export default StoreTable;
