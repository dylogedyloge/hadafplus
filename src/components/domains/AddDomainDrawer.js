import React, { useState } from 'react';
import { Drawer, Button, Input, Space, Alert, Select } from 'antd';

const AddDomainDrawer = ({ visible, onClose, onAdd, loading, value, onChange, status, onStatusChange }) => {
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
    // Update the width prop
    <Drawer
      title="Add domain"
      placement="right"
      onClose={onClose}
      open={visible}
      width={window.innerWidth > 640 ? 400 : '100%'}
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
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Domain URL</label>
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
        </div>
        <div>
          <label className="block mb-2">Verification Status</label>
          <Select
            value={status}
            onChange={onStatusChange}
            className="w-full"
          >
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="verified">Verified</Select.Option>
            <Select.Option value="rejected">Rejected</Select.Option>
          </Select>
        </div>
      </div>
    </Drawer>
  );
};

export default AddDomainDrawer;