import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AddProductModal = ({ visible, onCancel, onOk, mode, initialValues }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (mode === 'edit') {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [mode, initialValues]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const formFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleOk = async() => {
    try {
      const formData = new FormData();
      const values = await form.validateFields();
      formData.set('name', values.name);
      formData.set('price', values.price);
      formData.set('quantity', values.quantity);
      formData.set('photo', fileList[0]?.originFileObj);
      onOk(formData);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal title={`${mode === 'add' ? 'Add' : 'Edit'} Product`} open={visible} onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleOk} initialValues={initialValues}>
        <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please enter Product name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter Quantity' }]}>
          <Input type='Number'/>
        </Form.Item>
        <Form.Item name="price" label="Product Price" rules={[{ required: true, message: 'Please enter Product Price' }]}>
          <Input type='Number' />
        </Form.Item>
        <Form.Item
            name='logo'
            label='Upload'
            valuePropName='fileList'
            getValueFromEvent={formFile}
          >
            <Upload listType="picture"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleFileChange}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
