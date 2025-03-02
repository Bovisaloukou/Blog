import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-accent py-4">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="font-montserrat text-2xl font-bold text-secondary">
          Blaze & Echo
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-secondary"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 items-center">
            <li><Link to="/" className="nav-link">Accueil</Link></li>
            <li><Link to="/about" className="nav-link">À propos</Link></li>
            <li><Link to="/categories" className="nav-link">Catégories</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
            {isAdmin && (
              <>
                <li>
                  <Link 
                    to="/admin" 
                    className="flex items-center nav-link text-primary hover:text-primary-dark"
                  >
                    <LayoutDashboard size={20} className="mr-1" />
                    Admin
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center nav-link text-red-600 hover:text-red-700"
                  >
                    <LogOut size={20} className="mr-1" />
                    Déconnexion
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 shadow-md">
            <nav className="container-custom py-4">
              <ul className="flex flex-col space-y-4">
                <li><Link to="/" className="nav-link block py-2" onClick={toggleMenu}>Accueil</Link></li>
                <li><Link to="/about" className="nav-link block py-2" onClick={toggleMenu}>À propos</Link></li>
                <li><Link to="/categories" className="nav-link block py-2" onClick={toggleMenu}>Catégories</Link></li>
                <li><Link to="/contact" className="nav-link block py-2" onClick={toggleMenu}>Contact</Link></li>
                {isAdmin && (
                  <>
                    <li>
                      <Link 
                        to="/admin" 
                        className="flex items-center nav-link block py-2 text-primary hover:text-primary-dark"
                        onClick={toggleMenu}
                      >
                        <LayoutDashboard size={20} className="mr-1" />
                        Admin
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          toggleMenu();
                        }}
                        className="flex items-center w-full nav-link block py-2 text-red-600 hover:text-red-700"
                      >
                        <LogOut size={20} className="mr-1" />
                        Déconnexion
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;