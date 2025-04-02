'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
  { path: '/user/johndoe', name: 'Perfil', icon: '👤', color: 'from-purple-500 to-indigo-500' },
  { path: '/dashboard', name: 'Dashboard', icon: '📊', color: 'from-blue-500 to-cyan-500' },
  { path: '/matches', name: 'Matches', icon: '💞', color: 'from-pink-500 to-red-500' },
  { path: '/settings', name: 'Configurações', icon: '⚙️', color: 'from-gray-500 to-gray-700' },
  { path: '/user/johndoe/reviews', name: 'Avaliações', icon: '⭐', color: 'from-yellow-500 to-amber-500' },
  { path: '/network', name: 'Conexões', icon: '🌐', color: 'from-green-500 to-emerald-500' },
  { path: '/messages', name: 'Mensagens', icon: '💬', color: 'from-sky-500 to-blue-500' },
  { path: '/achievements', name: 'Conquistas', icon: '🏆', color: 'from-yellow-400 to-yellow-600' }
];

const userRoutes = [
  '/user',
  '/dashboard',
  '/matches',
  '/settings',
  '/network',
  '/messages',
  '/achievements'
];

export default function RadialMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const shouldShowMenu = userRoutes.some(route => 
    pathname?.startsWith(route.replace('/[username]', ''))
  );

  const handleLogout = () => {
    // Aqui você adicionaria a lógica de logout (limpar token, etc)
    console.log('Usuário deslogado');
    router.push('/'); // Redireciona para a página inicial
    setIsOpen(false); // Fecha o menu
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  if (!shouldShowMenu) return null;

  return (
    <>
      {/* Botão de ativação */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl flex items-center justify-center text-white text-2xl hover:shadow-2xl transition-all"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isOpen ? 45 : 0,
          background: isOpen 
            ? 'linear-gradient(to bottom right, #ec4899, #8b5cf6)' 
            : 'linear-gradient(to bottom right, #2563eb, #7c3aed)'
        }}
      >
        {isOpen ? '✕' : '☰'}
      </motion.button>

      {/* Menu radial */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-24 bottom-6 z-40 bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map((item) => (
                <Link href={item.path} key={item.path}>
                  <motion.div
                    className={`flex items-center p-3 rounded-lg cursor-pointer bg-gradient-to-br ${item.color} hover:brightness-110 transition-all`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span className="font-medium text-white">{item.name}</span>
                  </motion.div>
                </Link>
              ))}
              
              {/* Botão de Logout */}
              <motion.button
                onClick={handleLogout}
                className={`flex items-center p-3 rounded-lg cursor-pointer bg-gradient-to-br from-red-500 to-pink-600 hover:brightness-110 transition-all`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-2xl mr-3">🚪</span>
                <span className="font-medium text-white">Sair</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}