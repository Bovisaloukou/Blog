import axios from 'axios';
import { Article, CommentData, Category, CreateArticleData, Comment } from '../types';

// Créer et exporter l'instance axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL_PROD || import.meta.env.VITE_BACKEND_URL_DEV,
  withCredentials: true
});

export const getArticles = () => 
  api.get<Article[]>('/articles')
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des articles :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const getArticle = (slug: string) => 
  api.get<Article>(`/articles/${slug}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération de l\'article :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const createComment = (articleId: string, comment: CommentData) => 
  api.post<Comment>(`/comments/article/${articleId}`, comment)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la création du commentaire :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const getCategories = () => 
  api.get<Category[]>('/categories')
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des catégories :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
});
export const getArticlesByCategory = (slug: string) => 
  api.get<Article[]>(`/categories/${slug}/articles`)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des articles par catégorie :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const createCategory = (category: Omit<Category, '_id'>) =>
  api.post<Category>('/categories', category)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la création de la catégorie :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const deleteCategory = (id: string) =>
  api.delete<void>(`/categories/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la suppression de la catégorie :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const createArticle = (article: CreateArticleData) =>
  api.post<Article>('/articles', article)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la création de l\'article :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const updateArticle = (slug: string, article: Partial<Article>) =>
  api.put<Article>(`/articles/${slug}`, article)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la mise à jour de l\'article :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const deleteArticle = (id: string) =>
  api.delete<void>(`/articles/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'article :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const getAllComments = () =>
  api.get<Comment[]>('/comments')
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des commentaires :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const deleteComment = (id: string) =>
  api.delete<void>(`/comments/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la suppression du commentaire :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const getRecentArticles = (limit?: number) => 
  api.get<Article[]>(`/articles/recent${limit ? `?limit=${limit}` : ''}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des articles récents :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });

export const getCommentsByArticle = (articleId: string) =>
  api.get<Comment[]>(`/comments/article/${articleId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des commentaires par article :', error);
      throw error; // Relance l'erreur pour la gérer ailleurs
    });
