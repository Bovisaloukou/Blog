import express from 'express';
import { getArticles, getArticleBySlug, createArticle, updateArticle, deleteArticle, getRecentArticles } from '../controllers/articleController';

const router = express.Router();

router.get('/', getArticles);
router.get('/recent', getRecentArticles);
router.post('/', createArticle);
router.get('/:slug', getArticleBySlug);
router.put('/:slug', updateArticle);
router.delete('/:id', deleteArticle);

export default router; 