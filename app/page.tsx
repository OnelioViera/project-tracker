'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X, Filter, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Project, ProductType, STATUSES } from '@/types';

export default function ProjectTracker() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [showProductManager, setShowProductManager] = useState(false);
  const [newProductType, setNewProductType] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    client: '',
    productTypes: [],
    deadline: '',
    status: 'Draft',
    notes: ''
  });

  // Fetch projects and product types on mount
  useEffect(() => {
    fetchProjects();
    fetchProductTypes();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched projects:', data);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Failed to fetch projects. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductTypes = async () => {
    try {
      const response = await fetch('/api/product-types');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched product types:', data);
      setProductTypes(data);
    } catch (error) {
      console.error('Error fetching product types:', error);
      alert('Failed to fetch product types. Check console for details.');
    }
  };

  const handleAdd = async () => {
    if (formData.name && formData.client) {
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const newProject = await response.json();
        setProjects([...projects, newProject]);
        resetForm();
      } catch (error) {
        console.error('Error adding project:', error);
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project._id || null);
    setFormData(project);
    setIsAdding(false);
  };

  const handleUpdate = async () => {
    if (editingId) {
      try {
        const response = await fetch(`/api/projects/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const updatedProject = await response.json();
        setProjects(projects.map(p => p._id === editingId ? updatedProject : p));
        resetForm();
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        setProjects(projects.filter(p => p._id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', client: '', productTypes: [], deadline: '', status: 'Draft', notes: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const toggleProductType = (type: string) => {
    const current = formData.productTypes || [];
    if (current.includes(type)) {
      setFormData({ ...formData, productTypes: current.filter(t => t !== type) });
    } else {
      setFormData({ ...formData, productTypes: [...current, type] });
    }
  };

  const addProductType = async () => {
    if (newProductType.trim() && !productTypes.find(pt => pt.name === newProductType.trim())) {
      try {
        const response = await fetch('/api/product-types', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newProductType.trim() }),
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to add product type');
        }
        
        const newType = await response.json();
        console.log('Added product type:', newType);
        setProductTypes([...productTypes, newType].sort((a, b) => a.name.localeCompare(b.name)));
        setNewProductType('');
      } catch (error) {
        console.error('Error adding product type:', error);
        alert(error instanceof Error ? error.message : 'Failed to add product type');
      }
    }
  };

  const deleteProductType = async (id: string) => {
    if (confirm('Are you sure? This will remove this product type from all projects.')) {
      try {
        const response = await fetch(`/api/product-types/${id}`, { method: 'DELETE' });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to delete product type');
        }
        
        console.log('Deleted product type:', id);
        const deletedType = productTypes.find(pt => pt._id === id);
        setProductTypes(productTypes.filter(pt => pt._id !== id));
        
        // Update projects in local state
        if (deletedType) {
          setProjects(projects.map(p => ({
            ...p,
            productTypes: p.productTypes.filter(pt => pt !== deletedType.name)
          })));
        }
      } catch (error) {
        console.error('Error deleting product type:', error);
        alert(error instanceof Error ? error.message : 'Failed to delete product type');
      }
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Draft': 'bg-gray-100 text-gray-700',
      'In Review': 'bg-blue-100 text-blue-700',
      'Revision Needed': 'bg-yellow-100 text-yellow-700',
      'Approved': 'bg-green-100 text-green-700',
      'Complete': 'bg-purple-100 text-purple-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredProjects = filterStatus === 'All' 
    ? projects 
    : projects.filter(p => p.status === filterStatus);

  const sortedProjects = [...filteredProjects].sort((a, b) => 
    new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-lg text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">AutoCAD Project Tracker</CardTitle>
                <CardDescription className="mt-1">Lindsay Precast Design Projects</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowProductManager(!showProductManager)}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <Settings size={20} />
                  Manage Products
                </Button>
                <Button
                  onClick={() => setIsAdding(!isAdding)}
                  className="flex items-center gap-2"
                >
                  <Plus size={20} />
                  New Project
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={18} className="text-slate-600" />
              <span className="text-sm text-slate-600">Filter:</span>
              {['All', ...STATUSES].map(status => (
                <Button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                >
                  {status}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {showProductManager && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Manage Product Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  type="text"
                  value={newProductType}
                  onChange={(e) => setNewProductType(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addProductType()}
                  placeholder="Enter new product type..."
                />
                <Button
                  onClick={addProductType}
                  className="flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {productTypes.length === 0 ? (
                  <p className="text-sm text-slate-500">No product types yet. Add one above to get started.</p>
                ) : (
                  productTypes.map(type => (
                    <Badge key={type._id} variant="secondary" className="flex items-center gap-2 px-3 py-2">
                      <span>{type.name}</span>
                      <button
                        onClick={() => type._id && deleteProductType(type._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={16} />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {(isAdding || editingId) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Project' : 'Add New Project'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., BESS Foundation - ABC Site"
                  />
                </div>
                <div>
                  <Label htmlFor="client">Client *</Label>
                  <Input
                    id="client"
                    type="text"
                    value={formData.client || ''}
                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                    placeholder="e.g., ABC Energy Company"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Product Types (select multiple)</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {productTypes.map(type => (
                      <Button
                        key={type._id}
                        type="button"
                        onClick={() => toggleProductType(type.name)}
                        variant={(formData.productTypes || []).includes(type.name) ? 'default' : 'outline'}
                        size="sm"
                      >
                        {type.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline || ''}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({...formData, status: value as any})}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    type="text"
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Special requirements, notes..."
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={editingId ? handleUpdate : handleAdd}
                  className="flex items-center gap-2"
                >
                  <Check size={18} />
                  {editingId ? 'Update' : 'Add'}
                </Button>
                <Button
                  onClick={resetForm}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {sortedProjects.map(project => (
            <Card key={project._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-600 mb-2">
                      <div><span className="font-medium">Client:</span> {project.client}</div>
                      <div>
                        <span className="font-medium">Deadline:</span>{' '}
                        {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Not set'}
                      </div>
                    </div>
                    {project.productTypes && project.productTypes.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.productTypes.map(type => (
                          <Badge key={type} variant="secondary" className="bg-blue-50 text-blue-700">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {project.notes && (
                      <div className="text-sm text-slate-600">
                        <span className="font-medium">Notes:</span> {project.notes}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEdit(project)}
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      <Edit2 size={18} />
                    </Button>
                    <Button
                      onClick={() => project._id && handleDelete(project._id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {sortedProjects.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-slate-500 text-lg">No projects found. Click &quot;New Project&quot; to get started!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

