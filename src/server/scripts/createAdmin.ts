import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog');
    
    const adminUser = new User({
      email: 'admin@example.com',
      password: 'votreMotDePasse123!',
      isAdmin: true
    });

    await adminUser.save();
    console.log('Utilisateur admin créé avec succès');
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Erreur lors de la création de l\'admin:', error);
  }
};

createAdmin(); 