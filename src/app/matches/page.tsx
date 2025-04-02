'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedGradient } from '@components/AnimatedGradientBackground';

// ===================== TIPOS =====================
type MatchStatus = 'new' | 'in-progress' | 'completed';

interface Match {
  id: string;
  partnerName: string;
  partnerPhoto: string;
  yourSkills: string[];
  partnerSkills: string[];
  compatibility: number;
  status: MatchStatus;
  lastInteraction?: string;
  bio?: string;
  sharedInterests?: string[];
}

interface SuggestedMatch {
  id: string;
  partnerName: string;
  partnerPhoto: string;
  yourMissingSkills: string[];
  partnerMissingSkills: string[];
  potentialCompatibility: number;
  mutualConnections?: number;
}

// ===================== ANIMAÇÕES =====================
const pageVariants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" }
  },
  exit: { opacity: 0 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const cardHover = {
  scale: 1.03,
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.05)",
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10
  }
};

// ===================== COMPONENTES =====================
const FilterButton = ({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05, backgroundColor: active ? '#4f46e5' : '#e0e7ff' }}
    whileTap={{ scale: 0.95 }}
    className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
      active
        ? 'bg-indigo-600 text-white shadow-lg'
        : 'bg-white/90 text-indigo-600 border border-indigo-200 hover:bg-indigo-50 backdrop-blur-sm'
    }`}
  >
    {children}
  </motion.button>
);

const CompatibilityIndicator = ({ percentage }: { percentage: number }) => (
  <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
    <motion.div
      className={`absolute top-0 left-0 h-full ${
        percentage > 80 ? 'bg-emerald-500' : 
        percentage > 60 ? 'bg-amber-400' : 'bg-rose-500'
      }`}
      initial={{ width: 0 }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 1, delay: 0.3 }}
    />
  </div>
);

const SkillPill = ({ skill, type }: { skill: string; type: 'you' | 'partner' }) => (
  <motion.span
    className={`text-xs font-medium px-3 py-1.5 rounded-full ${
      type === 'you' 
        ? 'bg-indigo-100 text-indigo-800' 
        : 'bg-purple-100 text-purple-800'
    }`}
    whileHover={{ scale: 1.05 }}
  >
    {skill}
  </motion.span>
);

const MatchCard = ({
  match,
  isSelected,
  onSelect
}: {
  match: Match;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={cardHover}
      whileTap={{ scale: 0.98 }}
      className={`bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all border-2 ${
        isSelected ? 'border-indigo-500 scale-[1.02]' : 'border-white/20'
      }`}
      onClick={onSelect}
      layout
    >
      <div className="p-6">
        <div className="flex items-start mb-5">
          <motion.div 
            className="relative"
            whileHover={{ rotate: 2 }}
          >
            <img
              src={match.partnerPhoto}
              alt={match.partnerName}
              className="w-16 h-16 rounded-xl object-cover border-2 border-indigo-100 shadow-sm"
            />
            <motion.div 
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
              style={{
                backgroundColor:
                  match.compatibility > 80
                    ? '#10B981'
                    : match.compatibility > 60
                    ? '#F59E0B'
                    : '#EF4444',
              }}
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs font-bold text-white">
                {match.compatibility}%
              </span>
            </motion.div>
          </motion.div>
          
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{match.partnerName}</h3>
                <p className="text-xs text-gray-500 mb-2">
                  {match.status === 'in-progress' && match.lastInteraction && (
                    <>Última interação: {match.lastInteraction}</>
                  )}
                  {match.status === 'completed' && 'Projeto concluído'}
                  {match.status === 'new' && 'Novo match!'}
                </p>
              </div>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="text-gray-400 hover:text-indigo-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {expanded ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>
            </div>
            
            <CompatibilityIndicator percentage={match.compatibility} />
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {match.bio && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Bio</h4>
                  <p className="text-sm text-gray-600">{match.bio}</p>
                </div>
              )}
              
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Habilidades</h4>
                <div className="space-y-3">
                  {match.yourSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <SkillPill skill={skill} type="you" />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <SkillPill skill={match.partnerSkills[index]} type="partner" />
                    </div>
                  ))}
                </div>
              </div>

              {match.sharedInterests && match.sharedInterests.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Interesses em comum</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.sharedInterests.map((interest, index) => (
                      <span key={index} className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex space-x-3 mt-6">
          <motion.button 
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg transition flex items-center justify-center shadow-md"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Iniciar Chat
          </motion.button>
          
          {match.status === 'new' && (
            <motion.button 
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2.5 px-4 rounded-lg transition flex items-center justify-center shadow-sm"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Recusar
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SuggestedMatchCard = ({ suggestion }: { suggestion: SuggestedMatch }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={cardHover}
      className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20"
    >
      <div className="p-6">
        <div className="flex items-start mb-5">
          <motion.div 
            className="relative"
            whileHover={{ rotate: 2 }}
          >
            <img
              src={suggestion.partnerPhoto}
              alt={suggestion.partnerName}
              className="w-16 h-16 rounded-xl object-cover border-2 border-purple-100 shadow-sm"
            />
            <motion.div 
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center bg-purple-500"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs font-bold text-white">
                {suggestion.potentialCompatibility}%
              </span>
            </motion.div>
          </motion.div>
          
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{suggestion.partnerName}</h3>
                {suggestion.mutualConnections && (
                  <p className="text-xs text-gray-500 mb-2">
                    {suggestion.mutualConnections} conexões em comum
                  </p>
                )}
              </div>
              <motion.button
                onClick={() => setExpanded(!expanded)}
                className="text-gray-400 hover:text-purple-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {expanded ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>
            </div>
            
            <CompatibilityIndicator percentage={suggestion.potentialCompatibility} />
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Habilidades complementares</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <SkillPill skill={suggestion.yourMissingSkills[0]} type="you" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <SkillPill skill={suggestion.partnerMissingSkills[0]} type="partner" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2.5 px-4 rounded-lg transition flex items-center justify-center shadow-md mt-4"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Conectar
        </motion.button>
      </div>
    </motion.div>
  );
};

// ===================== PÁGINA PRINCIPAL =====================
const MatchesPage = () => {
  const [activeFilter, setActiveFilter] = useState<MatchStatus>('new');
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  // Dados mockados
  const matches: Match[] = [
    {
      id: '1',
      partnerName: 'Ana Silva',
      partnerPhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
      yourSkills: ['Design', 'UI/UX'],
      partnerSkills: ['Front-end', 'React'],
      compatibility: 85,
      status: 'new',
      bio: 'Designer com 5 anos de experiência em produtos digitais, apaixonada por criar interfaces intuitivas e bonitas.',
      sharedInterests: ['Design Systems', 'Acessibilidade', 'Figma']
    },
    {
      id: '2',
      partnerName: 'Carlos Oliveira',
      partnerPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
      yourSkills: ['Back-end', 'Node.js'],
      partnerSkills: ['DevOps', 'Cloud'],
      compatibility: 72,
      status: 'in-progress',
      lastInteraction: '2 dias atrás',
      bio: 'Engenheiro de DevOps com experiência em AWS e arquitetura de sistemas escaláveis.',
      sharedInterests: ['Microserviços', 'Typescript']
    },
    {
      id: '3',
      partnerName: 'Mariana Costa',
      partnerPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',
      yourSkills: ['Marketing', 'Redes Sociais'],
      partnerSkills: ['Copywriting', 'Branding'],
      compatibility: 91,
      status: 'completed',
      lastInteraction: '1 semana atrás',
      bio: 'Especialista em Marketing Digital e Growth Hacking, com cases de sucesso em startups.',
      sharedInterests: ['Growth', 'Conteúdo', 'Métricas']
    },
  ];

  const suggestedMatches: SuggestedMatch[] = [
    {
      id: 's1',
      partnerName: 'João Santos',
      partnerPhoto: 'https://randomuser.me/api/portraits/men/75.jpg',
      yourMissingSkills: ['Mobile Development'],
      partnerMissingSkills: ['UI Design'],
      potentialCompatibility: 78,
      mutualConnections: 3
    },
    {
      id: 's2',
      partnerName: 'Beatriz Rocha',
      partnerPhoto: 'https://randomuser.me/api/portraits/women/90.jpg',
      yourMissingSkills: ['Data Science'],
      partnerMissingSkills: ['Product Management'],
      potentialCompatibility: 82,
      mutualConnections: 2
    },
  ];

  const filteredMatches = matches.filter(match => match.status === activeFilter);

  return (
    <>
      <AnimatedGradient>
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          className="min-h-screen relative overflow-hidden"
        >
          <div className="relative z-10 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <motion.header 
                className="mb-10 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">Seus Matches</h1>
                <p className="text-indigo-100/90 text-lg max-w-2xl mx-auto">
                  Encontre os parceiros perfeitos para seus projetos com base em habilidades complementares
                </p>
              </motion.header>

              {/* Filtros */}
              <motion.div 
                className="flex justify-center space-x-3 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <FilterButton
                  active={activeFilter === 'new'}
                  onClick={() => setActiveFilter('new')}
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Novos
                  </span>
                </FilterButton>
                <FilterButton
                  active={activeFilter === 'in-progress'}
                  onClick={() => setActiveFilter('in-progress')}
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Em andamento
                  </span>
                </FilterButton>
                <FilterButton
                  active={activeFilter === 'completed'}
                  onClick={() => setActiveFilter('completed')}
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Concluídos
                  </span>
                </FilterButton>
              </motion.div>

              {/* Lista de Matches */}
              <motion.section 
                className="mb-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="flex justify-between items-center mb-6"
                  variants={itemVariants}
                >
                  <h2 className="text-2xl font-bold text-white drop-shadow-md">
                    {activeFilter === 'new' && 'Novos Matches'}
                    {activeFilter === 'in-progress' && 'Matches em Andamento'}
                    {activeFilter === 'completed' && 'Matches Concluídos'}
                  </h2>
                  <span className="text-sm bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                    {filteredMatches.length} {filteredMatches.length === 1 ? 'match' : 'matches'}
                  </span>
                </motion.div>

                {filteredMatches.length === 0 ? (
                  <motion.div 
                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg border border-white/10"
                    variants={itemVariants}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-white/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-medium text-white mb-2">Nenhum match encontrado</h3>
                    <p className="text-white/80 max-w-md mx-auto">
                      {activeFilter === 'new' && 'Parece que você ainda não tem novos matches. Continue explorando!'}
                      {activeFilter === 'in-progress' && 'Você não tem matches em andamento no momento.'}
                      {activeFilter === 'completed' && 'Nenhum projeto concluído ainda.'}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                  >
                    {filteredMatches.map(match => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        isSelected={selectedMatch === match.id}
                        onSelect={() => setSelectedMatch(match.id === selectedMatch ? null : match.id)}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.section>

              {/* Sugestões */}
              <motion.section 
                className="mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white drop-shadow-md">Sugestões para você</h2>
                  <span className="text-sm bg-purple-500/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                    Baseado no seu perfil
                  </span>
                </div>

                <p className="text-indigo-100/90 mb-8 max-w-3xl">
                  Estas são recomendações de perfis que complementam suas habilidades e podem ser ótimos parceiros para projetos futuros.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {suggestedMatches.map(suggestion => (
                    <SuggestedMatchCard
                      key={suggestion.id}
                      suggestion={suggestion}
                    />
                  ))}
                </div>
              </motion.section>
            </div>
          </div>

          {/* Footer */}
          <motion.footer 
            className="text-center pb-8 pt-4 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-white/60 text-sm">
              Atualizado agora • {filteredMatches.length + suggestedMatches.length} perfis disponíveis
            </p>
          </motion.footer>
        </motion.div>
      </AnimatedGradient>
    </>
  );
};

export default MatchesPage;