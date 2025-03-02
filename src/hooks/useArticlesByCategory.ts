import { useQuery } from 'react-query';
import { getArticlesByCategory } from '../services/api';
import { Article } from '../types';

export const useArticlesByCategory = (slug: string) => {
  return useQuery<Article[], Error>(
    ['articles', 'category', slug],
    () => getArticlesByCategory(slug),
    {
      enabled: !!slug
    }
  );
}; 