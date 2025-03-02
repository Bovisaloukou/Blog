import React from 'react';
import HeroSection from '../components/HeroSection';
import ArticleGrid from '../components/ArticleGrid';

const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <ArticleGrid title="Derniers Articles" />
    </main>
  );
};

export default HomePage;