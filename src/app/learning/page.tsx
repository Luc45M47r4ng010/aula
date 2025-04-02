'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedGradient } from '@components/AnimatedGradientBackground';

// ===================== TIPOS =====================
type ResourceType = 'video' | 'pdf' | 'link' | 'document';
type ResourceStatus = 'not-started' | 'in-progress' | 'completed';

interface LearningResource {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
  dateShared: string;
  studentsCompleted: number;
  totalStudents: number;
  status?: ResourceStatus;
}

interface Feedback {
  id: string;
  student: {
    name: string;
    photo: string;
  };
  comment: string;
  rating: number;
  date: string;
  resourceId: string;
}

// ===================== DADOS MOCKADOS =====================
const learningResources: LearningResource[] = [
  {
    id: '1',
    title: 'Introdução ao React Hooks',
    type: 'video',
    url: 'https://youtube.com/watch?v=example1',
    dateShared: '2023-06-15',
    studentsCompleted: 8,
    totalStudents: 12,
    status: 'completed'
  },
  {
    id: '2',
    title: 'Guia Avançado de TypeScript',
    type: 'pdf',
    url: 'https://example.com/typescript-guide.pdf',
    dateShared: '2023-06-10',
    studentsCompleted: 5,
    totalStudents: 12,
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Projeto Prático: CRUD com Firebase',
    type: 'link',
    url: 'https://github.com/example/crud-firebase',
    dateShared: '2023-06-05',
    studentsCompleted: 3,
    totalStudents: 12,
    status: 'not-started'
  },
  {
    id: '4',
    title: 'Design Systems na Prática',
    type: 'document',
    url: 'https://figma.com/design-system-example',
    dateShared: '2023-05-28',
    studentsCompleted: 10,
    totalStudents: 12,
    status: 'completed'
  },
];

const feedbacks: Feedback[] = [
  {
    id: '1',
    student: {
      name: 'Carlos Oliveira',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    comment: 'O vídeo foi muito esclarecedor! Finalmente entendi o useContext na prática.',
    rating: 5,
    date: '2023-06-18',
    resourceId: '1'
  },
  {
    id: '2',
    student: {
      name: 'Mariana Costa',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    comment: 'O guia de TypeScript está ótimo, mas senti falta de exemplos mais complexos.',
    rating: 4,
    date: '2023-06-12',
    resourceId: '2'
  },
  {
    id: '3',
    student: {
      name: 'João Santos',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    comment: 'Material excelente! Me ajudou muito no meu projeto atual.',
    rating: 5,
    date: '2023-06-20',
    resourceId: '4'
  },
];

// ===================== COMPONENTES =====================
const ResourceIcon = ({ type }: { type: ResourceType }) => {
  const icons = {
    video: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    pdf: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    link: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    document: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  };

  return icons[type];
};

const ProgressBar = ({ completed, total }: { completed: number; total: number }) => {
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <motion.div 
        className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1 }}
      />
      <div className="text-xs text-gray-500 mt-1">
        {completed} de {total} ({percentage}%) alunos completaram
      </div>
    </div>
  );
};

const ResourceCard = ({ resource }: { resource: LearningResource }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const resourceFeedbacks = feedbacks.filter(f => f.resourceId === resource.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-6"
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <ResourceIcon type={resource.type} />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-gray-800">{resource.title}</h3>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {resource.type === 'video' ? 'Vídeo' : 
                   resource.type === 'pdf' ? 'PDF' : 
                   resource.type === 'link' ? 'Link' : 'Documento'}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  Compartilhado em {new Date(resource.dateShared).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        <div className="mt-4">
          <ProgressBar completed={resource.studentsCompleted} total={resource.totalStudents} />
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Acessar recurso
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {resourceFeedbacks.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Feedback dos Alunos</h4>
                    <div className="space-y-3">
                      {resourceFeedbacks.map(feedback => (
                        <div key={feedback.id} className="flex items-start">
                          <img
                            src={feedback.student.photo}
                            alt={feedback.student.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-indigo-100"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-800">{feedback.student.name}</span>
                              <span className="text-xs text-gray-500 ml-2">
                                {new Date(feedback.date).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-3 w-3 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-sm text-gray-700 mt-1">{feedback.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const AddResourceForm = ({ onAdd }: { onAdd: (resource: Omit<LearningResource, 'id' | 'studentsCompleted' | 'totalStudents'>) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'video' as ResourceType,
    url: '',
    dateShared: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setIsOpen(false);
    setFormData({
      title: '',
      type: 'video',
      url: '',
      dateShared: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="mb-6">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Adicionar Recurso
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compartilhar Novo Recurso</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select
                    id="type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ResourceType })}
                    required
                  >
                    <option value="video">Vídeo</option>
                    <option value="pdf">PDF</option>
                    <option value="link">Link</option>
                    <option value="document">Documento</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    id="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Data de Compartilhamento</label>
                  <input
                    type="date"
                    id="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.dateShared}
                    onChange={(e) => setFormData({ ...formData, dateShared: e.target.value })}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <motion.button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm"
                  >
                    Compartilhar
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ===================== PÁGINA PRINCIPAL =====================
const LearningPage = () => {
  const [resources, setResources] = useState(learningResources);
  const [activeTab, setActiveTab] = useState<'resources' | 'feedback'>('resources');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddResource = (newResource: Omit<LearningResource, 'id' | 'studentsCompleted' | 'totalStudents'>) => {
    setResources([
      ...resources,
      {
        ...newResource,
        id: `new-${Date.now()}`,
        studentsCompleted: 0,
        totalStudents: 12
      }
    ]);
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-2">Aprendizado</h1>
                <p className="text-indigo-100">Gerencie recursos educacionais e acompanhe o progresso dos alunos</p>
              </motion.header>

              {/* Conteúdo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Abas */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('resources')}
                    className={`px-6 py-4 text-sm font-medium flex items-center ${activeTab === 'resources' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Materiais Compartilhados
                  </button>
                  <button
                    onClick={() => setActiveTab('feedback')}
                    className={`px-6 py-4 text-sm font-medium flex items-center ${activeTab === 'feedback' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Feedback dos Alunos
                  </button>
                </div>

                {/* Barra de Busca */}
                <div className="p-6 border-b border-gray-200">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder={`Buscar ${activeTab === 'resources' ? 'materiais' : 'feedbacks'}...`}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Conteúdo das Abas */}
                <div className="p-6">
                  {activeTab === 'resources' ? (
                    <>
                      <AddResourceForm onAdd={handleAddResource} />

                      {filteredResources.length === 0 ? (
                        <div className="text-center py-10">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum material encontrado</h3>
                          <p className="mt-1 text-gray-500">Compartilhe seu primeiro recurso educacional!</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {filteredResources.map(resource => (
                            <ResourceCard key={resource.id} resource={resource} />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {filteredFeedbacks.length === 0 ? (
                        <div className="text-center py-10">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum feedback encontrado</h3>
                          <p className="mt-1 text-gray-500">Os feedbacks dos alunos aparecerão aqui.</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {filteredFeedbacks.map(feedback => {
                            const resource = resources.find(r => r.id === feedback.resourceId);
                            return (
                              <motion.div
                                key={feedback.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -3 }}
                                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                              >
                                <div className="p-5">
                                  <div className="flex items-start">
                                    <img
                                      src={feedback.student.photo}
                                      alt={feedback.student.name}
                                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                                    />
                                    <div className="ml-4 flex-1">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h3 className="font-bold text-gray-800">{feedback.student.name}</h3>
                                          <p className="text-sm text-gray-500">
                                            {new Date(feedback.date).toLocaleDateString('pt-BR')}
                                          </p>
                                        </div>
                                        <div className="flex">
                                          {[...Array(5)].map((_, i) => (
                                            <svg
                                              key={i}
                                              className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                            >
                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                          ))}
                                        </div>
                                      </div>
                                      <p className="text-gray-700 mt-2">{feedback.comment}</p>
                                      {resource && (
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                          <div className="flex items-center text-sm text-gray-500">
                                            <ResourceIcon type={resource.type} />
                                            <span className="ml-2">{resource.title}</span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedGradient>
    </>
  );
};

export default LearningPage;