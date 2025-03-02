import axios from 'axios';
import { Article, CommentData, Category, CreateArticleData, Comment } from '../types';

// Créer et exporter l'instance axios
export const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? process.env.CLIENT_URL || 'http://localhost:3000/api'
    : 'http://localhost:3000/api',
  withCredentials: true
});

export const getArticles = () => 
  api.get<Article[]>('/articles').then(response => response.data);

export const getArticle = (slug: string) => 
  api.get<Article>(`/articles/${slug}`).then(response => response.data);

export const createComment = (articleId: string, comment: CommentData) => 
  api.post<Comment>(`/comments/article/${articleId}`, comment)
    .then(response => response.data);

export const getCategories = () => 
  api.get<Category[]>('/categories').then(response => response.data);

export const getArticlesByCategory = (slug: string) => 
  api.get<Article[]>(`/categories/${slug}/articles`).then(response => response.data);

export const createCategory = (category: Omit<Category, '_id'>) =>
  api.post<Category>('/categories', category).then(response => response.data);

export const deleteCategory = (id: string) =>
  api.delete<void>(`/categories/${id}`).then(response => response.data);

export const createArticle = (article: CreateArticleData) =>
  api.post<Article>('/articles', article).then(response => response.data);

export const updateArticle = (slug: string, article: Partial<Article>) =>
  api.put<Article>(`/articles/${slug}`, article).then(response => response.data);

export const deleteArticle = (id: string) =>
  api.delete<void>(`/articles/${id}`).then(response => response.data);

export const getAllComments = () =>
  api.get<Comment[]>('/comments').then(response => response.data);

export const deleteComment = (id: string) =>
  api.delete<void>(`/comments/${id}`).then(response => response.data);

export const getRecentArticles = (limit?: number) => 
  api.get<Article[]>(`/articles/recent${limit ? `?limit=${limit}` : ''}`)
    .then(response => response.data);

export const getCommentsByArticle = (articleId: string) =>
  api.get<Comment[]>(`/comments/article/${articleId}`).then(response => response.data); 