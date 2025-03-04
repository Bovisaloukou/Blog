import React, { useState } from 'react';
import { Twitter, Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { data } = useCategories();
  const categories = Array.isArray(data) ? data : [];

  console.log("Valeur de categories :", categories);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Merci de vous être inscrit avec l'email: ${email}`);
    setEmail('');
  };
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-gray-400">Navigation</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-gray-300 hover:text-white transition-all duration-200">Accueil</Link></li>
              <li><Link to="/categories" className="text-sm text-gray-300 hover:text-white transition-all duration-200">Catégories</Link></li>
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-white transition-all duration-200">À propos</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-all duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Catégories */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-gray-400">Catégories</h3>
            <ul className="space-y-3">
              {categories.map(category => (
                <li key={category._id}>
                  <Link 
                    to={`/categories/${category.slug}`} 
                    className="text-sm text-gray-300 hover:text-white transition-all duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-gray-400">Légal</h3>
            <ul className="space-y-3">
              <li><Link to="/mentions-legales" className="text-sm text-gray-300 hover:text-white transition-all duration-200">Mentions légales</Link></li>
              <li><Link to="/confidentialite" className="text-sm text-gray-300 hover:text-white transition-all duration-200">Confidentialité</Link></li>
              <li><Link to="/cgv" className="text-sm text-gray-300 hover:text-white transition-all duration-200">CGV</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold mb-4 text-gray-400">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Restez informé de nos dernières publications
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="flex-grow px-4 py-2 text-sm rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-gray-500 transition-all duration-200"
                required
              />
              <button 
                type="submit"
                className="px-6 py-2 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Séparateur */}
        <hr className="border-gray-800 my-8" />

        {/* Bas de page */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Blaze & Echo. Tous droits réservés.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
