import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Convertir la chaîne de date en objet Date
  const date = article.date ? new Date(article.date) : new Date();

  return (
    <article className="article-card">
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {format(date, 'dd MMMM yyyy', { locale: fr })}
        </p>
        <p className="text-gray-700 mb-4">{article.excerpt}</p>
        <Link 
          to={`/article/${article.slug}`} 
          className="text-primary font-medium hover:underline"
        >
          Lire la suite
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;