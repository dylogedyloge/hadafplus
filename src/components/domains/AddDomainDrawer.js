import React, { useState } from 'react';
import { Drawer, Button, Input, Space, Alert } from 'antd';

const AddDomainDrawer = ({ visible, onClose, onAdd, loading, value, onChange }) => {
  const [error, setError] = useState('');

  const isValidDomain = (domain) => {
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  const handleAdd = () => {
    if (!value.trim()) {
      setError('Please enter a domain');
      return;
    }
    if (!isValidDomain(value.trim())) {
      setError('Please enter a valid domain (e.g., example.com)');
      return;
    }
    setError('');
    onAdd();
  };

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
              onClick={handleAdd}
              loading={loading}
            >
              Add
            </Button>
          </Space>
        </div>
      }
    >
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          className="mb-4"
        />
      )}
      <Input
        placeholder="Enter domain URL (e.g., example.com)"
        value={value}
        onChange={(e) => {
          onChange(e);
          setError('');
        }}
        status={error ? 'error' : ''}
        className="mb-4"
      />
    </Drawer>
  );
};

export default AddDomainDrawer;