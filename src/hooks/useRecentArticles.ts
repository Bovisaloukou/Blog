import { useQuery } from 'react-query';
import { getRecentArticles } from '../services/api';
import { Article } from '../types';

export const useRecentArticles = (limit?: number) => {
  return useQuery<Article[], Error>(
    ['recentArticles', limit],
    () => getRecentArticles(limit)
  );
}; 