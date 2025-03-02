import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getCommentsByArticle, createComment } from '../services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CommentSectionProps {
  articleId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const [newComment, setNewComment] = useState({
    content: '',
    author: '',
    email: ''
  });

  const queryClient = useQueryClient();
  const { data: comments, isLoading } = useQuery(
    ['comments', articleId],
    () => getCommentsByArticle(articleId)
  );

  const createMutation = useMutation(
    (comment: typeof newComment) => createComment(articleId, comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', articleId]);
        setNewComment({ content: '', author: '', email: '' });
      }
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(newComment);
  };

  if (isLoading) return <div>Chargement des commentaires...</div>;

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Commentaires</h2>
      
      {/* Liste des commentaires */}
      <div className="space-y-6 mb-8">
        {comments?.map(comment => (
          <div key={comment._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{comment.author}</h3>
              <span className="text-sm text-gray-500">
                {format(new Date(comment.createdAt), 'dd MMM yyyy', { locale: fr })}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>

      {/* Formulaire de commentaire */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Ajouter un commentaire</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Nom</label>
            <input
              type="text"
              value={newComment.author}
              onChange={e => setNewComment({...newComment, author: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={newComment.email}
              onChange={e => setNewComment({...newComment, email: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Commentaire</label>
          <textarea
            value={newComment.content}
            onChange={e => setNewComment({...newComment, content: e.target.value})}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90"
        >
          Publier
        </button>
      </form>
    </div>
  );
};

export default CommentSection;