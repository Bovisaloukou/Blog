import { Request, Response } from 'express';
import Category from '../models/Category';
import Article from '../models/Article';

export const getCategories = async (req: Request, res: Response) => {
  try {
    console.log('Fetching categories...');
    const categories = await Category.find().sort({ name: 1 });
    console.log('Categories found:', categories.length);
    res.json(categories);
  } catch (error: unknown) {
    console.error('Error fetching categories:', error);
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(500).json({ message });
  }
};

export const getArticlesByCategory = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    // Trouver d'abord la catégorie
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    // Trouver tous les articles de cette catégorie
    const articles = await Article.find({ category: category._id })
      .populate('category')
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(500).json({ message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(400).json({ message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Vérifier si des articles utilisent cette catégorie
    const articlesCount = await Article.countDocuments({ category: id });
    if (articlesCount > 0) {
      return res.status(400).json({ 
        message: 'Impossible de supprimer cette catégorie car elle est utilisée par des articles' 
      });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue';
    res.status(500).json({ message });
  }
}; 