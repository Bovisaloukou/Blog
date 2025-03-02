import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-custom text-center">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-secondary">
          Bienvenue sur Mon Blog
        </h1>
        <p className="font-opensans text-xl md:text-2xl mb-8 text-textSecondary max-w-2xl mx-auto">
          Des histoires qui inspirent
        </p>
        <Link to="/categories" className="btn-primary inline-block">
          Découvrir les articles
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;