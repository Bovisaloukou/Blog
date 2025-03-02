import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category';

dotenv.config();

const categories = [
  {
    name: 'Technologie',
    slug: 'technologie',
    description: 'Articles sur les dernières innovations technologiques'
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Articles sur le style de vie et le bien-être'
  },
  {
    name: 'Culture',
    slug: 'culture',
    description: 'Articles sur l\'art, la musique et le cinéma'
  },
  {
    name: 'Voyage',
    slug: 'voyage',
    description: 'Découvrez de nouvelles destinations'
  }
];

const seedCategories = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI must be defined');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    await Category.deleteMany({}); // Nettoie les catégories existantes
    await Category.insertMany(categories);
    
    console.log('Categories seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories(); 