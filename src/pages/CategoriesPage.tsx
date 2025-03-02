import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ArticleGrid from '../components/ArticleGrid';
import { useCategories } from '../hooks/useCategories';
import { useArticlesByCategory } from '../hooks/useArticlesByCategory';

const CategoriesPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: articles, isLoading: articlesLoading, error: articlesError } = useArticlesByCategory(slug || '');
  
  // Si on a un slug, on affiche les articles de la catégorie
  if (slug) {
    if (articlesLoading) return <div className="container-custom py-12">Chargement des articles...</div>;
    if (articlesError) return <div className="container-custom py-12 text-red-600">Erreur: {(articlesError as Error).message}</div>;
    
    const category = categories?.find(cat => cat.slug === slug);
    
    if (!category) {
      return (
        <div className="container-custom py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Catégorie non trouvée</h1>
          <p className="mb-6">La catégorie que vous recherchez n'existe pas.</p>
          <Link to="/categories" className="text-primary hover:underline">Voir toutes les catégories</Link>
        </div>
      );
    }
    
    return (
      <main className="py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          {articles && articles.length > 0 ? (
            <ArticleGrid articles={articles} />
          ) : (
            <p className="text-center text-gray-600">Aucun article dans cette catégorie</p>
          )}
        </div>
      </main>
    );
  }
  
  // Affichage de toutes les catégories
  if (categoriesLoading) return <div className="container-custom py-12">Chargement des catégories...</div>;
  if (categoriesError) return <div className="container-custom py-12 text-red-600">Erreur: {(categoriesError as Error).message}</div>;

  return (
    <main className="py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">
          {slug ? `Articles de la catégorie` : 'Toutes les catégories'}
        </h1>

        {!slug && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map(category => (
              <div key={category._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  {category.description || 'Aucune description'}
                </p>
                <Link
                  to={`/categories/${category.slug}`}
                  className="text-primary hover:underline inline-flex items-center"
                >
                  Voir les articles
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoriesPage;