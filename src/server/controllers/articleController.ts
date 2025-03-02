import { Request, Response } from 'express';
import Article from '../models/Article';

export const getArticles = async (req: Request, res: Response) => {
  try {
    console.log('Fetching articles...');
    const articles = await Article.find()
      .populate('category')
      .sort({ createdAt: -1 });
    console.log('Articles found:', articles.length);
    res.json(articles);
  } catch (error: unknown) {
    console.error('Error fetching articles:', error);
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(500).json({ message });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  try {
    const article = new Article(req.body);
    await article.save();
    // Peupler la catégorie après la création
    const populatedArticle = await Article.findById(article._id).populate('category');
    res.status(201).json(populatedArticle);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(400).json({ message });
  }
};

// Obtenir un article par son slug
export const getArticleBySlug = async (req: Request, res: Response) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug })
      .populate('category');
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json(article);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(500).json({ message });
  }
};

// Mettre à jour un article
export const updateArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    ).populate('category');
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json(article);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(400).json({ message });
  }
};

// Supprimer un article
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json({ message: 'Article supprimé avec succès' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(500).json({ message });
  }
};

// Ajouter cette nouvelle méthode
export const getRecentArticles = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const articles = await Article.find()
      .populate('category')
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(articles);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(500).json({ message });
  }
}; 