import React from 'react';
import ArticleCard from './ArticleCard';
import { useArticles } from '../hooks/useArticles';

interface ArticleGridProps {
  title?: string;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ title }) => {
  const { data: articles, isLoading, error } = useArticles();

  if (isLoading) return (
    <div className="py-12 text-center">
      <p>Chargement des articles...</p>
    </div>
  );

  if (error) return (
    <div className="py-12 text-center text-red-600">
      <p>Erreur: {(error as Error).message}</p>
      <p>Vérifiez que le serveur backend est démarré sur le port 3000</p>
    </div>
  );

  if (!articles?.length) return (
    <div className="py-12 text-center">
      <p>Aucun article trouvé</p>
    </div>
  );

  return (
    <section className="py-12">
      <div className="container-custom">
        {title && (
          <h2 className="font-playfair text-3xl mb-8 text-center">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard 
              key={article._id}
              article={article} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleGrid;