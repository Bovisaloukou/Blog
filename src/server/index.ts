import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { requireAuth, requireAdmin } from './middleware/auth';
import articleRoutes from './routes/articles';
import categoryRoutes from './routes/categories';
import commentRoutes from './routes/comments';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'https://blog-chi-three-61.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}));

// Log des requêtes
app.use((req, _res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.path}`);
  next();
});

// Routes publiques
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);

// Routes protégées (admin)
app.use('/api/admin/articles', requireAuth, requireAdmin, articleRoutes);
app.use('/api/admin/categories', requireAuth, requireAdmin, categoryRoutes);
app.use('/api/admin/comments', requireAuth, requireAdmin, commentRoutes);

// Gestion des erreurs (doit être après toutes les routes)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Erreur:', err.stack);
  res.status(500).json({ message: 'Une erreur est survenue' });
});

// Connexion à MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog';
mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
})
.then(() => {
  console.log('Connecté à MongoDB');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
})
.catch(err => {
  console.error('Erreur de connexion à MongoDB:', err);
  process.exit(1);
});

// Export pour Vercel
export default app;