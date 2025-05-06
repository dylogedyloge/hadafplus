import React, { useState } from 'react';
import { Drawer, Button, Input, Switch, Space, Alert } from 'antd';

const EditDomainDrawer = ({ 
  visible, 
  onClose, 
  onSave, 
  loading, 
  domainUrl, 
  onDomainChange,
  isActive,
  onActiveChange 
}) => {
  const [error, setError] = useState('');

  const isValidDomain = (domain) => {
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  const handleSave = () => {
    if (!domainUrl.trim()) {
      setError('Please enter a domain');
      return;
    }
    if (!isValidDomain(domainUrl.trim())) {
      setError('Please enter a valid domain (e.g., example.com)');
      return;
    }
    setError('');
    onSave();
  };

  return (
    // Update the width prop
    <Drawer
      title="Edit domain"
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
              onClick={handleSave}
              loading={loading}
            >
              Save
            </Button>
          </Space>
        </div>
      }
    >
      <div className="space-y-4">
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}
        <div>
          <label className="block mb-2">Domain URL</label>
          <Input
            placeholder="Enter domain URL"
            value={domainUrl}
            onChange={(e) => {
              onDomainChange(e);
              setError('');
            }}
            status={error ? 'error' : ''}
          />
        </div>
        <div>
          <label className="block mb-2">Active Status</label>
          <Switch
            checked={isActive}
            onChange={onActiveChange}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default EditDomainDrawer;