import React from 'react';
import { Table, Button, Tag, Space, Popconfirm } from 'antd';

const DomainTable = ({ domains, isLoading, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Domain URLs',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: 'Active Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Verification Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          verified: 'green',
          pending: 'gold',
          failed: 'red',
        };
        const displayStatus = status || 'unknown';
        return (
          <Tag color={colors[displayStatus] || 'default'}>
            {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
          </Tag>
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button className='rounded-sm' 
            type="primary" 
            size="small"
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Domain"
            description="Are you sure you want to delete this domain?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button className='rounded-sm' type="default" danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      dataSource={domains} 
      columns={columns} 
      pagination={{ pageSize: 10 }}
      className="shadow-md"
      loading={isLoading}
    />
  );
};

export default DomainTable;