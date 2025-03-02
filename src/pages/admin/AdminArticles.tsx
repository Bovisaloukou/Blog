import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useArticles } from '../../hooks/useArticles';
import { useMutation, useQueryClient } from 'react-query';
import { deleteArticle } from '../../services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminArticles: React.FC = () => {
  const { data: articles, isLoading } = useArticles();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
      setDeleteId(null);
    }
  });

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Articles</h1>
        <Link
          to="/admin/articles/new"
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-opacity-90"
        >
          <Plus size={20} className="mr-2" />
          Nouvel Article
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {articles?.map(article => (
              <tr key={article._id}>
                <td className="px-6 py-4">
                  <Link 
                    to={`/article/${article.slug}`}
                    className="text-primary hover:underline"
                  >
                    {article.title}
                  </Link>
                </td>
                <td className="px-6 py-4">{article.category?.name || 'Sans catégorie'}</td>
                <td className="px-6 py-4">
                  {format(new Date(article.date), 'dd MMM yyyy', { locale: fr })}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link
                    to={`/admin/articles/${article.slug}/edit`}
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    <Pencil size={16} className="mr-1" />
                    Éditer
                  </Link>
                  <button
                    onClick={() => setDeleteId(article._id)}
                    className="text-red-600 hover:text-red-800 inline-flex items-center ml-2"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmation de suppression */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-4">Confirmer la suppression</h3>
            <p className="mb-6">Êtes-vous sûr de vouloir supprimer cet article ?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (deleteId) deleteMutation.mutate(deleteId);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticles; 