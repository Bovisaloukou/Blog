import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <main className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="font-playfair text-3xl md:text-4xl mb-8 text-center">À propos de Mon Blog</h1>
        
        <div className="mb-8 flex justify-center">
          <img 
            src="/blaze-echo-favicon.svg"
            alt="Logo Blaze & Echo"
            className="w-48 h-48 rounded-full object-contain shadow-md" 
          />
        </div>
        
        <div className="space-y-6 font-opensans text-lg leading-reading">
          <p>
            Bienvenue sur Mon Blog, un espace dédié au partage de connaissances, d'idées et d'inspirations sur des sujets variés qui me passionnent. Créé en 2025, ce blog est né de mon désir de partager mes réflexions et découvertes avec une communauté curieuse et ouverte d'esprit.
          </p>
          
          <p>
            Je m'appelle Sophie Martin, et je suis journaliste de formation avec une passion pour l'écriture, la technologie, le bien-être et les voyages. À travers ce blog, j'explore ces différents domaines en proposant des articles approfondis, des guides pratiques et des réflexions personnelles.
          </p>
          
          <p>
            Mon objectif est de créer un contenu de qualité qui informe, inspire et parfois provoque la réflexion. Je crois fermement au pouvoir des mots et des histoires pour connecter les gens et élargir nos horizons. Chaque article publié sur ce blog est le fruit d'une recherche minutieuse et d'une volonté sincère de partager des connaissances utiles.
          </p>
          
          <p>
            Je vous invite à explorer les différentes catégories, à participer aux discussions dans les commentaires et à me contacter si vous avez des suggestions de sujets ou des questions. Ce blog est aussi le vôtre, et c'est grâce à vos retours qu'il continuera d'évoluer et de s'améliorer.
          </p>
          
          <p>
            Merci de faire partie de cette aventure !
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;