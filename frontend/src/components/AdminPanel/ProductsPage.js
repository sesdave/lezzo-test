import React, { useState, useEffect } from 'react';
import Layout from '../../containers/Layout';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { fetchProductCategoriesByStoreId, selectProducts, addProduct, editProduct, deleteProduct } from '../../redux/slice/productSlice';
import AddProductModal from './modals/Product';
import DeleteConfirmationModal from './modals/delete';

const ProductsPage = () => {
  const { storeId, categoryId } = useParams();
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState({})

  useEffect(() => {
    dispatch(fetchProductCategoriesByStoreId(storeId, categoryId));
  }, [dispatch]);

  const handleAddCategory = () => {
    setInitialValues(null);
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = (productData) => {
    if (initialValues) {
      dispatch(editProduct({ productId: initialValues.productId, productData }));
    } else {
      dispatch(addProduct({ storeId, categoryId, productData }));
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
    setProductToDelete(record)
    setIsDeleteModalVisible(true);
  }

  const handleDelete = ()=>{
    dispatch(deleteProduct(productToDelete.productId))
    setProductToDelete({})
    setIsDeleteModalVisible(false);
  }

  const handleDeleteCancel = ()=>{
    setProductToDelete({})
    setIsDeleteModalVisible(false)
  }

  if (!products) {
    return <div>Categories not found</div>;
  }

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
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

  return (
    <Layout title="Products" description="Manage Products">
    <div className="mt-8">
      <Button onClick={handleAddCategory}>Add New Product</Button>
      <Table dataSource={products} columns={columns} pagination={false} />

      <AddProductModal
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
        itemName={productToDelete.name} 
      />
      </div>
    </Layout>
  );
};

export default ProductsPage;
