import React from 'react';
import { Table, Button, Tag, Space, Popconfirm } from 'antd';
import { useMediaQuery } from 'react-responsive';

const DomainTable = ({ domains, isLoading, onEdit, onDelete }) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const columns = [
    {
      title: 'Domain URLs',
      dataIndex: 'domain',
      key: 'domain',
      ellipsis: true,
    },
    {
      title: 'Active Status',
      dataIndex: 'isActive',
      key: 'isActive',
      responsive: ['sm'],
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
      responsive: ['md'],
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
      responsive: ['lg'],
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small" wrap>
          <Button className='rounded-sm' 
            type="primary" 
            size={isMobile ? 'small' : 'middle'}
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
            <Button 
              className='rounded-sm' 
              type="default" 
              danger 
              size={isMobile ? 'small' : 'middle'}
            >
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
      pagination={{ 
        pageSize: 10,
        className: 'rounded-sm',
        size: isMobile ? 'small' : 'default'
      }}
      className="shadow-md rounded-sm"
      loading={isLoading}
      scroll={{ x: true }}
      size={isMobile ? 'small' : 'middle'}
    />
  );
};

export default DomainTable;