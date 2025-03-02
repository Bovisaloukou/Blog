import React, { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { useMutation, useQueryClient } from 'react-query';
import { createCategory, deleteCategory } from '../../services/api';
import { Plus, Trash2, Edit } from 'lucide-react';

const AdminCategories: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });
  const { data: categories, isLoading } = useCategories();
  const queryClient = useQueryClient();

  const createMutation = useMutation(createCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      setIsModalOpen(false);
      setNewCategory({ name: '', slug: '', description: '' });
    }
  });

  const deleteMutation = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(newCategory);
  };

  if (isLoading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des catégories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Nouvelle catégorie
        </button>
      </div>

      {/* Liste des catégories */}
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Nom</th>
              <th className="text-left p-4">Slug</th>
              <th className="text-left p-4">Description</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map(category => (
              <tr key={category._id} className="border-b">
                <td className="p-4">{category.name}</td>
                <td className="p-4">{category.slug}</td>
                <td className="p-4">{category.description}</td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => deleteMutation.mutate(category._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal d'ajout */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nouvelle catégorie</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Nom</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={e => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Slug</label>
                <input
                  type="text"
                  value={newCategory.slug}
                  onChange={e => setNewCategory({...newCategory, slug: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={e => setNewCategory({...newCategory, description: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories; 