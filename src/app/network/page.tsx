'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedGradient } from '@components/AnimatedGradientBackground';

// ===================== TIPOS =====================
type ConnectionTab = 'active' | 'suggestions';
type ExportFormat = 'pdf' | 'csv';

interface User {
  id: string;
  name: string;
  photo: string;
  role: string;
  location: string;
  skills: string[];
  mutualConnections: number;
  connectionDate: string;
}

// ===================== DADOS MOCKADOS =====================
const activeConnections: User[] = [
  {
    id: '1',
    name: 'Carlos Oliveira',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Front-end Developer',
    location: 'São Paulo, SP',
    skills: ['React', 'TypeScript', 'UI Design'],
    mutualConnections: 5,
    connectionDate: '2023-05-15'
  },
  {
    id: '2',
    name: 'Mariana Costa',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'UX Designer',
    location: 'Rio de Janeiro, RJ',
    skills: ['Figma', 'User Research', 'Prototyping'],
    mutualConnections: 3,
    connectionDate: '2023-04-22'
  },
  {
    id: '3',
    name: 'João Santos',
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    role: 'Product Manager',
    location: 'Belo Horizonte, MG',
    skills: ['Agile', 'Scrum', 'Product Strategy'],
    mutualConnections: 7,
    connectionDate: '2023-03-10'
  },
];

const suggestedConnections: User[] = [
  {
    id: 's1',
    name: 'Ana Silva',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Back-end Developer',
    location: 'Curitiba, PR',
    skills: ['Node.js', 'Python', 'API Design'],
    mutualConnections: 2,
    connectionDate: ''
  },
  {
    id: 's2',
    name: 'Pedro Rocha',
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    role: 'DevOps Engineer',
    location: 'Porto Alegre, RS',
    skills: ['AWS', 'Docker', 'CI/CD'],
    mutualConnections: 4,
    connectionDate: ''
  },
];

const allSkills = [...new Set([
  ...activeConnections.flatMap(user => user.skills),
  ...suggestedConnections.flatMap(user => user.skills)
])];

const allLocations = [...new Set([
  ...activeConnections.map(user => user.location),
  ...suggestedConnections.map(user => user.location)
])];

// ===================== COMPONENTES =====================
const ConnectionCard = ({ 
  user, 
  isSuggestion = false,
  onConnect,
  onRemove 
}: {
  user: User;
  isSuggestion?: boolean;
  onConnect?: (id: string) => void;
  onRemove?: (id: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-5">
        <div className="flex items-start">
          <motion.div 
            animate={{ 
              rotate: isHovered ? [0, 5, -5, 0] : 0,
              transition: { duration: 0.6 }
            }}
          >
            <img
              src={user.photo}
              alt={user.name}
              className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-100"
            />
          </motion.div>
          
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{user.name}</h3>
                <p className="text-sm text-indigo-600">{user.role}</p>
              </div>
              {!isSuggestion && (
                <span className="text-xs bg-indigo-50 text-indigo-800 px-2 py-1 rounded-full">
                  Conectado em {new Date(user.connectionDate).toLocaleDateString('pt-BR')}
                </span>
              )}
            </div>
            
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {user.location}
            </div>
            
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {user.mutualConnections} conexões em comum
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            {isSuggestion ? 'Habilidades complementares' : 'Habilidades em comum'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          {isSuggestion ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onConnect?.(user.id)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition"
            >
              Conectar
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRemove?.(user.id)}
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 text-sm font-medium rounded-lg transition"
            >
              Gerenciar
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ExportDropdown = ({ onExport }: { onExport: (format: ExportFormat) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Gerar relatório
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          >
            <div className="py-1">
              <motion.button
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => {
                  onExport('pdf');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700"
              >
                Exportar como PDF
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => {
                  onExport('csv');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700"
              >
                Exportar como CSV
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ===================== PÁGINA PRINCIPAL =====================
const NetworkPage = () => {
  const [activeTab, setActiveTab] = useState<ConnectionTab>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [connections, setConnections] = useState(activeConnections);
  const [suggestions, setSuggestions] = useState(suggestedConnections);

  const handleConnect = (id: string) => {
    const user = suggestions.find(u => u.id === id);
    if (user) {
      setSuggestions(suggestions.filter(u => u.id !== id));
      setConnections([...connections, { ...user, connectionDate: new Date().toISOString() }]);
    }
  };

  const handleRemove = (id: string) => {
    setConnections(connections.filter(u => u.id !== id));
  };

  const handleExport = (format: ExportFormat) => {
    alert(`Relatório gerado como ${format.toUpperCase()} com sucesso!`);
    // Lógica real de exportação iria aqui
  };

  const filteredConnections = connections.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill ? user.skills.includes(selectedSkill) : true;
    const matchesLocation = selectedLocation ? user.location === selectedLocation : true;
    return matchesSearch && matchesSkill && matchesLocation;
  });

  const filteredSuggestions = suggestions.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill ? user.skills.includes(selectedSkill) : true;
    const matchesLocation = selectedLocation ? user.location === selectedLocation : true;
    return matchesSearch && matchesSkill && matchesLocation;
  });

  return (
    <>
      <AnimatedGradient>
        <div className="min-h-screen relative overflow-hidden">
          <div className="relative z-10 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
              {/* Cabeçalho */}
              <motion.header 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <motion.h1 
                      whileHover={{ scale: 1.02 }}
                      className="text-3xl font-bold text-white drop-shadow-lg mb-2"
                    >
                      Minha Rede
                    </motion.h1>
                    <p className="text-indigo-100">
                      {connections.length} conexões ativas • {suggestions.length} sugestões
                    </p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 md:mt-0"
                  >
                    <ExportDropdown onExport={handleExport} />
                  </motion.div>
                </div>
              </motion.header>

              {/* Filtros */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="search"
                        placeholder="Nome, cargo ou habilidades..."
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="skill" className="block text-sm font-medium text-gray-700 mb-1">Habilidade</label>
                    <select
                      id="skill"
                      className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      value={selectedSkill}
                      onChange={(e) => setSelectedSkill(e.target.value)}
                    >
                      <option value="">Todas</option>
                      {allSkills.map(skill => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                    <select
                      id="location"
                      className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">Todas</option>
                      {allLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Abas */}
              <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
                <motion.button
                  onClick={() => setActiveTab('active')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-6 py-3 rounded-xl transition-all flex items-center ${
                    activeTab === 'active'
                      ? 'bg-white text-indigo-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                  Conexões Ativas
                </motion.button>
                
                <motion.button
                  onClick={() => setActiveTab('suggestions')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-6 py-3 rounded-xl transition-all flex items-center ${
                    activeTab === 'suggestions'
                      ? 'bg-white text-indigo-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Sugestões
                </motion.button>
              </div>

              {/* Conteúdo */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
                >
                  {activeTab === 'active' ? (
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Suas Conexões
                      </h2>
                      
                      {filteredConnections.length === 0 ? (
                        <div className="text-center py-10">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma conexão encontrada</h3>
                          <p className="mt-1 text-gray-500">Tente ajustar seus filtros de busca.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredConnections.map(user => (
                            <ConnectionCard 
                              key={user.id} 
                              user={user} 
                              onRemove={handleRemove}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Sugestões para sua Rede
                      </h2>
                      
                      {filteredSuggestions.length === 0 ? (
                        <div className="text-center py-10">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M12 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma sugestão no momento</h3>
                          <p className="mt-1 text-gray-500">Atualize seus interesses para receber sugestões mais relevantes.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredSuggestions.map(user => (
                            <ConnectionCard 
                              key={user.id} 
                              user={user} 
                              isSuggestion 
                              onConnect={handleConnect}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </AnimatedGradient>
    </>
  );
};

export default NetworkPage;