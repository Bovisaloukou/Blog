import { useQuery } from 'react-query';
import { getArticles } from '../services/api';
import { Article } from '../types';

export const useArticles = () => {
  return useQuery<Article[], Error>('articles', getArticles);
}; 