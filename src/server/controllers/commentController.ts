import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Article from '../models/Article';

export const getCommentsByArticle = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const comments = await Comment.find({ article: articleId })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(500).json({ message });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    const comment = new Comment({
      ...req.body,
      article: articleId
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(400).json({ message });
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find()
      .populate('article', 'title')  // On récupère juste le titre de l'article
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(500).json({ message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }
    res.json({ message: 'Commentaire supprimé avec succès' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(500).json({ message });
  }
}; 