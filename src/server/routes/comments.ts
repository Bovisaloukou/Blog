import express from 'express';
import { 
  getCommentsByArticle, 
  createComment, 
  getAllComments,
  deleteComment 
} from '../controllers/commentController';

const router = express.Router();

router.get('/', getAllComments);
router.get('/article/:articleId', getCommentsByArticle);
router.post('/article/:articleId', createComment);
router.delete('/:id', deleteComment);

export default router; 