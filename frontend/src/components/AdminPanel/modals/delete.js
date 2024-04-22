import React from 'react';
import { Modal, Button } from 'antd';

const DeleteConfirmationModal = ({ visible, onCancel, onConfirm, itemName }) => {
  return (
    <Modal
      title={`Delete ${itemName}`}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete {itemName}?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
