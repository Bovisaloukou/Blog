import { useQuery } from 'react-query';
import { getCategories } from '../services/api';
import { Category } from '../types';

export const useCategories = () => {
  return useQuery<Category[], Error>('categories', getCategories);
}; 