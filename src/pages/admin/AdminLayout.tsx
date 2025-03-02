import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, FolderOpen, MessageSquare } from 'lucide-react';

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <ul className="flex space-x-6">
            <li>
              <NavLink 
                to="/admin" 
                end
                className={({ isActive }) => 
                  `flex items-center ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`
                }
              >
                <LayoutDashboard size={20} className="mr-2" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/articles" 
                className={({ isActive }) => 
                  `flex items-center ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`
                }
              >
                <FileText size={20} className="mr-2" />
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/categories" 
                className={({ isActive }) => 
                  `flex items-center ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`
                }
              >
                <FolderOpen size={20} className="mr-2" />
                Catégories
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/comments" 
                className={({ isActive }) => 
                  `flex items-center ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`
                }
              >
                <MessageSquare size={20} className="mr-2" />
                Commentaires
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <main className="container-custom py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 