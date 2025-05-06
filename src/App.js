import React, { useState } from 'react';
import { Button, message, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';  // Add SearchOutlined to imports
import MainLayout from './components/Layout';
import { 
  useGetDomainsQuery, 
  useAddDomainMutation, 
  useUpdateDomainMutation, 
  useDeleteDomainMutation 
} from './features/api/domainApiSlice';
import { useDebounce } from './hooks/useDebounce';
import DomainTable from './components/domains/DomainTable';
import AddDomainDrawer from './components/domains/AddDomainDrawer';
import EditDomainDrawer from './components/domains/EditDomainDrawer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [newDomain, setNewDomain] = useState('');
  const [editingDomain, setEditingDomain] = useState(null);
  const [editDomainUrl, setEditDomainUrl] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm);
  const { data: domains, isLoading } = useGetDomainsQuery();
  const [addDomain, { isLoading: isAdding }] = useAddDomainMutation();
  const [updateDomain, { isLoading: isUpdating }] = useUpdateDomainMutation();
  const [deleteDomain] = useDeleteDomainMutation();

  const filteredDomains = domains?.filter(domain => 
    domain.domain.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const handleAddDomain = async () => {
    if (!newDomain) {
      message.error('Please enter a domain');
      return;
    }

    try {
      await addDomain({
        domain: newDomain,
        createdDate: Date.now(),
        status: 'pending',
        isActive: true
      }).unwrap();
      message.success('Domain added successfully');
      setNewDomain('');
      setDrawerVisible(false);
    } catch (error) {
      message.error('Failed to add domain');
    }
  };

  const handleEdit = (record) => {
    setEditingDomain(record);
    setEditDomainUrl(record.domain);
    setEditIsActive(record.isActive);
    setEditDrawerVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editDomainUrl) {
      message.error('Please enter a domain');
      return;
    }

    try {
      await updateDomain({
        id: editingDomain.id,
        domain: editDomainUrl,
        isActive: editIsActive
      }).unwrap();
      message.success('Domain updated successfully');
      setEditDrawerVisible(false);
    } catch (error) {
      message.error('Failed to update domain');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDomain(id).unwrap();
      message.success('Domain deleted successfully');
    } catch (error) {
      message.error('Failed to delete domain');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Button className='rounded-sm' 
            type="primary" 
            onClick={() => setDrawerVisible(true)}
            icon={<PlusOutlined />}
          >
            Add Domain
          </Button>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
            allowClear
          />
        </div>
        
        <DomainTable 
          domains={filteredDomains}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <AddDomainDrawer 
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          onAdd={handleAddDomain}
          loading={isAdding}
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
        />

        <EditDomainDrawer 
          visible={editDrawerVisible}
          onClose={() => setEditDrawerVisible(false)}
          onSave={handleSaveEdit}
          loading={isUpdating}
          domainUrl={editDomainUrl}
          onDomainChange={(e) => setEditDomainUrl(e.target.value)}
          isActive={editIsActive}
          onActiveChange={setEditIsActive}
        />
      </div>
    </MainLayout>
  );
}

export default App;
