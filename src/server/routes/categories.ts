import express from 'express';
import { 
  getCategories, 
  getArticlesByCategory, 
  createCategory,
  deleteCategory 
} from '../controllers/categoryController';

const router = express.Router();

router.get('/', getCategories);
router.get('/:slug/articles', getArticlesByCategory);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export default router; 