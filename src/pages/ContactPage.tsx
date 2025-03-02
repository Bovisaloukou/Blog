import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here
    alert('Message envoyé avec succès!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  
  return (
    <main className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="font-playfair text-3xl md:text-4xl mb-8 text-center">Me contacter</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <Mail size={24} className="text-primary" />
            </div>
            <h3 className="font-montserrat font-medium mb-2">Email</h3>
            <a href="mailto:contact@monblog.com" className="text-primary hover:underline">
              contact@monblog.com
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <Phone size={24} className="text-primary" />
            </div>
            <h3 className="font-montserrat font-medium mb-2">Téléphone</h3>
            <a href="tel:+33123456789" className="text-primary hover:underline">
              +33 1 23 45 67 89
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <MapPin size={24} className="text-primary" />
            </div>
            <h3 className="font-montserrat font-medium mb-2">Adresse</h3>
            <p>123 Avenue des Blogs<br />75001 Paris, France</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="font-playfair text-2xl mb-6">Envoyez-moi un message</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block mb-2 font-medium">Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="form-input"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;