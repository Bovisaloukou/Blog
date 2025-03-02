import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useRecentArticles } from '../hooks/useRecentArticles';

interface SidebarProps {
  categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories = [] }) => {
  const { data: recentArticles, isLoading } = useRecentArticles(5);

  // S'assurer que les données sont des tableaux
  const categoriesArray = Array.isArray(categories) ? categories : [];
  const articlesArray = Array.isArray(recentArticles) ? recentArticles : [];

  return (
    <aside>
      {/* Articles récents */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Articles récents</h2>
        <div className="space-y-4">
          {isLoading ? (
            <div>Chargement...</div>
          ) : (
            articlesArray.map(article => (
              <div key={article._id} className="bg-white p-4 rounded-lg shadow">
                {article.imageUrl && (
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-semibold mb-1">
                  <Link 
                    to={`/article/${article.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(article.date), 'dd MMM yyyy', { locale: fr })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Catégories */}
      <div>
        <h2 className="text-xl font-bold mb-4">Catégories</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <ul className="space-y-2">
            {categoriesArray.map(category => (
              <li key={category._id}>
                <Link 
                  to={`/categories/${category.slug}`}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;