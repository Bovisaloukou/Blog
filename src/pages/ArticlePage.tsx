import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getArticle } from '../services/api';
import Sidebar from '../components/Sidebar';
import CommentSection from '../components/CommentSection';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeft } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import { useCategories } from '../hooks/useCategories';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const { data: article, isLoading, error } = useQuery(
    ['article', slug],
    () => getArticle(slug || '')
  );

  const { data: articles } = useArticles();
  const { data: categories } = useCategories();
  
  const recentArticles = articles?.slice(0, 5) || [];
  
  if (isLoading) return <div className="container-custom py-12">Chargement...</div>;
  if (error) return <div className="container-custom py-12">Erreur de chargement</div>;
  if (!article) return <div className="container-custom py-12">Article non trouvé</div>;
  
  return (
    <main className="py-12">
      <div className="container-custom">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-primary mb-6 hover:underline"
        >
          <ArrowLeft size={16} className="mr-1" /> Retour
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <article>
              <h1 className="font-playfair text-3xl md:text-4xl mb-4">{article.title}</h1>
              <div className="mb-6 text-textSecondary">
                <p>
                  Publié le {format(new Date(article.date), 'dd MMMM yyyy', { locale: fr })} par {article.author}
                </p>
                <p>
                  Catégorie: {typeof article.category === 'object' && (
                    <Link 
                      to={`/categories/${article.category.slug}`} 
                      className="text-primary hover:underline"
                    >
                      {article.category.name}
                    </Link>
                  )}
                </p>
              </div>
              
              {article.imageUrl && (
                <div className="mb-8">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              
              <div className="prose prose-lg max-w-none mb-12 font-opensans leading-reading">
                {article.content}
              </div>
              
              <CommentSection articleId={article._id} />
            </article>
          </div>
          
          <div className="lg:col-span-1">
            <Sidebar recentArticles={recentArticles} categories={categories || []} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArticlePage;