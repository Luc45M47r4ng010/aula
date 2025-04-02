// components/SkillSwapAppBar.tsx
'use client'

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import SkillSwapLogo from '@components/header';
import { useState, useEffect } from 'react';

const userRoutes = [
  '/user',
  '/dashboard',
  '/matches',
  '/settings',
  '/messages',
  '/achievements',
  '/network'
];

export default function SkillSwapAppBar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Verifica se deve mostrar a AppBar
  const shouldShowAppBar = userRoutes.some(route => 
    pathname?.startsWith(route.replace('/johndoe', ''))
  );

  // Efeito de scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!shouldShowAppBar) return null;

  return (
    <AnimatePresence>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm' 
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo com efeito de troca */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkillSwapLogo className="h-8 w-auto" />
              
              <motion.div
                className="ml-3 hidden md:block"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  SkillSwap
                </span>
                <span className="text-xs ml-1 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  PRO
                </span>
              </motion.div>
            </motion.div>

            {/* Indicador de página atual */}
            <motion.div
              className="hidden md:flex items-center space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                {pathname?.split('/')[1] || 'Dashboard'}
              </span>
            </motion.div>

            {/* Efeito de conexão ativa */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <div className="h-2 w-2 absolute -right-0 -top-0 rounded-full bg-green-500 animate-ping opacity-75" />
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-gray-500 hidden sm:inline-block">
                Conectado
              </span>
            </motion.div>
          </div>
        </div>

        {/* Barra de progresso sutil */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-purple-500 to-blue-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.header>
    </AnimatePresence>
  );
}