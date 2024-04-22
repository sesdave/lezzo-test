import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AddStoreModal = ({ visible, onCancel, onOk, mode, initialValues }) => {
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
    const formData = new FormData();
      const values = await form.validateFields();
      formData.set('name', values.name);
      formData.set('location', values.location);
      formData.set('image', fileList[0]?.originFileObj);
      onOk(formData);
      form.resetFields();
      setFileList([]);
  };


  return (
    <Modal title={`${mode === 'add' ? 'Add' : 'Edit'} Shop`} open={visible} onOk={handleOk} onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleOk} initialValues={initialValues}>
        <Form.Item name="name" label="Shop Name" rules={[{ required: true, message: 'Please enter Store name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="location" label="Shop Address" rules={[{ required: true, message: 'Please enter Store Address' }]}>
          <Input />
        </Form.Item>
        <Form.Item
            name='image'
            label='Store Logo'
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

export default AddStoreModal;
