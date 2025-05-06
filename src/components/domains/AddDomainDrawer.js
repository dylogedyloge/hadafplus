import React from 'react';
import { Drawer, Button, Input, Space } from 'antd';

const AddDomainDrawer = ({ visible, onClose, onAdd, loading, value, onChange }) => {
  return (
    <Drawer
      title="Add domain"
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Space>
            <Button className='rounded-sm' onClick={onClose}>Cancel</Button>
            <Button className='rounded-sm' 
              type="primary" 
              onClick={onAdd}
              loading={loading}
            >
              Add
            </Button>
          </Space>
        </div>
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