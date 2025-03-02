import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { createArticle, updateArticle } from '../../services/api';
import { useCategories } from '../../hooks/useCategories';
import { Article, CreateArticleData } from '../../types';
import { slugify } from '../../utils/slugify';

interface ArticleFormProps {
  article?: Article;
  isEditing?: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, isEditing }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categories } = useCategories();
  
  const [formData, setFormData] = useState<CreateArticleData>({
    title: article?.title || '',
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    category: article?.category._id || '',
    author: article?.author || '',
    imageUrl: article?.imageUrl || '',
    slug: article?.slug || ''
  });

  const mutation = useMutation(
    (data: CreateArticleData) => isEditing 
      ? updateArticle(article!.slug, data)
      : createArticle(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles');
        navigate('/admin/articles');
      }
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      slug: slugify(formData.title)
    };
    mutation.mutate(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2">Titre</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Catégorie</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          {categories?.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2">Image URL</label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-2">Extrait</label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          className="w-full p-2 border rounded h-24"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Contenu</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded h-64"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Auteur</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/admin/articles')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

export default ArticleForm; 