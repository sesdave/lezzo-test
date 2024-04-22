import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchCategoriesByStoreId, selectCategories, postCategory, updateCategory, deleteCategory } from '../../redux/slice/categorySlice';
import AddCategoryModal from './modals/category';
import DeleteConfirmationModal from './modals/delete';
import Layout from '../../containers/Layout';

const CategoriesPage = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState({})

  useEffect(() => {
    dispatch(fetchCategoriesByStoreId(storeId));
  }, [dispatch]);

  const handleAddCategory = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRowClick = (record) => {
    navigate(`/products/${storeId}/${record.categoryId}`);
  };

  const handleOk = (categoryData) => {
    if (initialValues) {
      dispatch(updateCategory({storeId: initialValues.storeId, categoryId: initialValues.categoryId, categoryData }));
    } else {
      dispatch(postCategory({ storeId, categoryData }));
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
    setCategoryToDelete(record)
    setIsDeleteModalVisible(true);
  }

  const handleDelete = ()=>{
    dispatch(deleteCategory({ storeId:categoryToDelete.storeId, categoryId: categoryToDelete.categoryId }))
    setCategoryToDelete({})
    setIsDeleteModalVisible(false);
  }

  const handleDeleteCancel = ()=>{
    setCategoryToDelete({})
    setIsDeleteModalVisible(false)
  }


  if (!categories) {
    return <div>Categories not found</div>;
  }

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
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
    },
  ];

  return (
    <Layout title="Categories" description="Manage Categories">
      <div className="mt-8">
        <Button onClick={handleAddCategory}>Add New Category</Button>
        <Table
          dataSource={categories}
          columns={columns}
          pagination={false}
          scroll={{ y: 400 }}
          rowClassName={() => 'clickable-row'}
          onRow={(record) => ({
            onClick: () => handleRowClick(record) 
          })}
        />
     
        <AddCategoryModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        mode={initialValues ? "edit" : "add"}
        initialValues={initialValues}
      />
        <DeleteConfirmationModal
        visible={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        onConfirm={handleDelete}
        itemName={categoryToDelete.name}
      />
      </div>
    </Layout>
  );
};

export default CategoriesPage;
