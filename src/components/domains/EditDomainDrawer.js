import React from 'react';
import { Drawer, Button, Input, Switch, Space } from 'antd';

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
  return (
    <Drawer
      title="Edit domain"
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
              onClick={onSave}
              loading={loading}
            >
              Save
            </Button>
          </Space>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Domain URL</label>
          <Input
            placeholder="Enter domain URL"
            value={domainUrl}
            onChange={onDomainChange}
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