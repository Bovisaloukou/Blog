import React from 'react';
import { useArticles } from '../../hooks/useArticles';
import { useCategories } from '../../hooks/useCategories';

const AdminDashboard: React.FC = () => {
  const { data: articles } = useArticles();
  const { data: categories } = useCategories();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Articles</h2>
          <p className="text-3xl font-bold text-primary">{articles?.length || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Catégories</h2>
          <p className="text-3xl font-bold text-primary">{categories?.length || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Commentaires</h2>
          <p className="text-3xl font-bold text-primary">0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 