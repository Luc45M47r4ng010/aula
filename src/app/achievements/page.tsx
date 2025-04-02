'use client';

import { AnimatedGradient } from '@components/AnimatedGradientBackground';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: {
    current: number;
    total: number;
  };
  dateUnlocked?: Date;
};

const AchievementsPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const badges: Badge[] = [
    {
      id: '1',
      name: 'Iniciante',
      description: 'Complete sua primeira troca de habilidades',
      icon: '🌟',
      unlocked: true,
      rarity: 'common',
      dateUnlocked: new Date('2023-09-15')
    },
    {
      id: '2',
      name: 'Socializador',
      description: 'Conecte-se com 5 parceiros diferentes',
      icon: '🤝',
      unlocked: true,
      rarity: 'common',
      dateUnlocked: new Date('2023-10-01')
    },
    {
      id: '3',
      name: 'Mestre em React',
      description: 'Complete 10 trocas envolvendo React',
      icon: '⚛️',
      unlocked: false,
      rarity: 'rare',
      progress: { current: 8, total: 10 }
    },
    {
      id: '4',
      name: 'Poliglota Tech',
      description: 'Troque habilidades em 3 linguagens diferentes',
      icon: '🌐',
      unlocked: false,
      rarity: 'epic',
      progress: { current: 1, total: 3 }
    },
    {
      id: '5',
      name: 'SkillSwap Master',
      description: 'Top 1% dos usuários mais ativos da plataforma',
      icon: '🏆',
      unlocked: false,
      rarity: 'legendary'
    },
    {
      id: '6',
      name: 'Mentor',
      description: 'Ajude 3 iniciantes em suas primeiras trocas',
      icon: '🧑‍🏫',
      unlocked: true,
      rarity: 'rare',
      dateUnlocked: new Date('2023-10-10')
    },
    {
      id: '7',
      name: 'Full Stack',
      description: 'Troque habilidades em frontend e backend',
      icon: '💻',
      unlocked: true,
      rarity: 'epic',
      dateUnlocked: new Date('2023-10-18')
    },
    {
      id: '8',
      name: 'Maratona Tech',
      description: 'Complete 5 trocas em uma semana',
      icon: '🏃‍♂️',
      unlocked: false,
      rarity: 'rare',
      progress: { current: 3, total: 5 }
    }
  ];

  const filteredBadges = badges.filter(badge => {
    if (activeTab === 'unlocked') return badge.unlocked;
    if (activeTab === 'locked') return !badge.unlocked;
    return true;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-300';
      case 'rare': return 'from-blue-400 to-blue-300';
      case 'epic': return 'from-purple-500 to-purple-400';
      case 'legendary': return 'from-yellow-500 to-yellow-300';
      default: return 'from-gray-400 to-gray-300';
    }
  };

  const getRarityName = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Comum';
      case 'rare': return 'Raro';
      case 'epic': return 'Épico';
      case 'legendary': return 'Lendário';
      default: return '';
    }
  };

  return (
    <AnimatedGradient>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Badges e Conquistas</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Desbloqueie badges especiais ao completar trocas e alcançar marcas importantes na plataforma
          </p>
        </motion.div>

        {/* Destaque - Badge raro */}
        {badges.find(b => b.id === '5') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-xl p-6 mb-10 shadow-lg border border-yellow-300/50 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 text-8xl opacity-20">🏆</div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="text-6xl mb-4 md:mb-0 md:mr-6">🏆</div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">SkillSwap Master</h2>
                <p className="text-white/90 mb-3">Conquista lendária para os top 1% de usuários</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-black/20 rounded-full text-sm text-white">
                    Lendário
                  </span>
                  <span className="px-3 py-1 bg-black/20 rounded-full text-sm text-white">
                    Apenas 1% dos usuários
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-white/10 rounded-full p-1 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'all' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveTab('unlocked')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'unlocked' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Desbloqueados
            </button>
            <button
              onClick={() => setActiveTab('locked')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'locked' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Bloqueados
            </button>
          </div>
        </motion.div>

        {/* Grid de Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {filteredBadges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedBadge(badge)}
              className={`rounded-xl p-4 text-center cursor-pointer transition-all ${
                badge.unlocked ? 'bg-white/5 hover:bg-white/10' : 'bg-white/3 hover:bg-white/5'
              } ${badge.unlocked ? '' : 'opacity-70'}`}
            >
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-3 ${
                badge.unlocked 
                  ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} shadow-md`
                  : 'bg-white/5'
              }`}>
                {badge.icon}
              </div>
              <h3 className={`font-medium mb-1 ${
                badge.unlocked ? 'text-white' : 'text-white/70'
              }`}>
                {badge.name}
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                badge.unlocked 
                  ? badge.rarity === 'common' ? 'bg-gray-500/30 text-gray-200' :
                    badge.rarity === 'rare' ? 'bg-blue-500/30 text-blue-200' :
                    badge.rarity === 'epic' ? 'bg-purple-500/30 text-purple-200' :
                    'bg-yellow-500/30 text-yellow-200'
                  : 'bg-white/5 text-white/50'
              }`}>
                {getRarityName(badge.rarity)}
              </span>
              
              {!badge.unlocked && badge.progress && (
                <div className="mt-3">
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${(badge.progress.current / badge.progress.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-white/70">
                    Faltam {badge.progress.total - badge.progress.current} para desbloquear
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Modal de detalhes do badge */}
        <AnimatePresence>
          {selectedBadge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedBadge(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={`bg-gradient-to-br ${getRarityColor(selectedBadge.rarity)} rounded-2xl p-8 max-w-md w-full relative overflow-hidden shadow-2xl`}
              >
                <div className="absolute -right-10 -top-10 text-8xl opacity-20">{selectedBadge.icon}</div>
                <div className="text-center">
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl mb-4 bg-white/20`}>
                    {selectedBadge.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedBadge.name}</h2>
                  <span className="inline-block px-3 py-1 bg-black/20 rounded-full text-sm text-white mb-4">
                    {getRarityName(selectedBadge.rarity)}
                  </span>
                  <p className="text-white/90 mb-6">{selectedBadge.description}</p>
                  
                  {selectedBadge.unlocked ? (
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-sm text-white/80">Desbloqueado em:</p>
                      <p className="text-white font-medium">
                        {selectedBadge.dateUnlocked?.toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  ) : selectedBadge.progress ? (
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-sm text-white/80 mb-1">Progresso:</p>
                      <div className="w-full bg-white/30 rounded-full h-2 mb-2">
                        <div 
                          className="bg-white h-2 rounded-full" 
                          style={{ width: `${(selectedBadge.progress.current / selectedBadge.progress.total) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-white text-sm">
                        {selectedBadge.progress.current} de {selectedBadge.progress.total} completos
                      </p>
                    </div>
                  ) : (
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-sm text-white/80">Continue usando a plataforma para desbloquear</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedGradient>
  );
};

export default AchievementsPage;