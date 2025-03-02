import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAllComments, deleteComment } from '../../services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';

const AdminComments: React.FC = () => {
  const { data: comments, isLoading } = useQuery('comments', getAllComments);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  });

  if (isLoading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des commentaires</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Auteur</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Contenu</th>
              <th className="text-left p-4">Article</th>
              <th className="text-left p-4">Date</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map(comment => (
              <tr key={comment._id} className="border-b">
                <td className="p-4">{comment.author}</td>
                <td className="p-4">{comment.email}</td>
                <td className="p-4">{comment.content}</td>
                <td className="p-4">{comment.article.title}</td>
                <td className="p-4">
                  {format(new Date(comment.createdAt), 'dd MMM yyyy', { locale: fr })}
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => deleteMutation.mutate(comment._id)}
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
    </div>
  );
};

export default AdminComments; 