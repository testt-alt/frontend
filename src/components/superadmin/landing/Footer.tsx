import React from 'react';
import { Calendar, Mail, Phone, MapPin, Heart, Shield, Users, BarChart3 } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">ProBooking</span>
                <div className="text-sm text-red-400">Super Admin Portal</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Comprehensive administrative platform for managing the entire ProBooking ecosystem, 
              users, and business operations.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">admin@probooking.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">Admin Center, NY</span>
              </div>
            </div>
          </div>

          {/* Admin Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Admin Tools</h3>
            <ul className="space-y-3">
              {[
                'User Management',
                'System Analytics',
                'Platform Settings',
                'Security Center',
                'Audit Logs',
                'System Health'
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {[
                'Admin Documentation',
                'System Status',
                'Emergency Contact',
                'Security Reports',
                'Compliance',
                'Legal'
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © {currentYear} ProBooking Super Admin. All rights reserved.
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Secured with</span>
              <Shield className="h-4 w-4 text-red-500" />
              <span>enterprise security</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;