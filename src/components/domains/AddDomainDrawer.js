import React from 'react';
import { Drawer, Button, Input, Space } from 'antd';

const AddDomainDrawer = ({ visible, onClose, onAdd, loading, value, onChange }) => {
  return (
    <Drawer
      title="Add New Domain"
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="primary" 
            onClick={onAdd}
            loading={loading}
          >
            Add
          </Button>
        </Space>
      }
    >
      <Input
        placeholder="Enter domain URL (e.g., example.com)"
        value={value}
        onChange={onChange}
        className="mb-4"
      />
    </Drawer>
  );
};

export default AddDomainDrawer;