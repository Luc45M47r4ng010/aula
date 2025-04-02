'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiCalendar, FiCheckCircle, FiArrowRight, FiStar, FiUser } from 'react-icons/fi';
import { AnimatedGradient } from '@components/AnimatedGradientBackground';

const staticProfile = {
  username: 'johndoe',
  name: 'John Doe',
  bannerImage: 'https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: 'Designer gráfico e desenvolvedor front-end com paixão por criar experiências incríveis para os usuários. Especializado em UI/UX e branding digital.',
  location: 'São Paulo, Brasil',
  skillsOffered: [
    { id: '1', name: 'Design Gráfico', level: 3 },
    { id: '2', name: 'UI/UX Design', level: 4 },
    { id: '3', name: 'React', level: 2 },
    { id: '4', name: 'TypeScript', level: 2 },
    { id: '5', name: 'Figma', level: 4 },
    { id: '6', name: 'Adobe Illustrator', level: 3 },
  ],
  skillsWanted: [
    { id: 'w1', name: 'Motion Design', level: 0 },
    { id: 'w2', name: 'Node.js', level: 0 },
    { id: 'w3', name: 'Illustrator Avançado', level: 0 },
    { id: 'w4', name: 'Marketing Digital', level: 0 },
  ],
  averageRating: 4.2,
  reviews: [
    {
      id: 'r1',
      author: 'mariasilva',
      authorPhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      comment: 'Trabalho excepcional! John entregou um design que superou todas as expectativas. A comunicação foi clara e o prazo foi cumprido rigorosamente.',
      date: '15/03/2023',
    },
    {
      id: 'r2',
      author: 'carloslima',
      authorPhoto: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4,
      comment: 'Ótima experiência de troca. As habilidades de UI/UX são impressionantes. Recomendo!',
      date: '28/02/2023',
    },
    {
      id: 'r3',
      author: 'anarodrigues',
      authorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 3,
      comment: 'O trabalho foi bom, mas houve um pequeno atraso na entrega. De qualquer forma, o resultado final foi satisfatório.',
      date: '10/01/2023',
    },
  ],
  exchangeHistory: [
    {
      id: 'e1',
      partner: 'mariasilva',
      partnerPhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
      skill: 'Design Gráfico por Fotografia',
      date: '15/03/2023',
      status: 'completed'
    },
    {
      id: 'e2',
      partner: 'carloslima',
      partnerPhoto: 'https://randomuser.me/api/portraits/men/22.jpg',
      skill: 'UI Design por Copywriting',
      date: '28/02/2023',
      status: 'completed'
    },
    {
      id: 'e3',
      partner: 'anarodrigues',
      partnerPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',
      skill: 'React por Edição de Vídeo',
      date: '10/01/2023',
      status: 'completed'
    },
    {
      id: 'e4',
      partner: 'pedrosouza',
      partnerPhoto: 'https://randomuser.me/api/portraits/men/75.jpg',
      skill: 'TypeScript por Marketing Digital',
      date: '05/12/2022',
      status: 'completed'
    },
  ],
  joinedDate: 'Junho 2021'
};

const StarRating = ({ rating, max = 5 }: { rating: number; max?: number }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="flex gap-1"><FiStar className="text-gray-300" /></div>;

  return (
    <div className="flex items-center">
      {Array.from({ length: max }).map((_, i) => (
        <motion.span
          key={i}
          className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
        >
          {i < Math.floor(rating) ? '★' : 
           (i === Math.floor(rating) && rating % 1 >= 0.5) ? '½' : '☆'}
        </motion.span>
      ))}
    </div>
  );
};

const SkillLevel = ({ level }: { level: number }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="flex gap-1"><FiStar className="text-gray-300 text-sm" /></div>;

  return (
    <div className="flex items-center">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.span
          key={i}
          className={`text-sm ${i < level ? 'text-blue-500' : 'text-gray-300'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 500 }}
        >
          {i < level ? '★' : '☆'}
        </motion.span>
      ))}
    </div>
  );
};

const ExchangeStatus = ({ status }: { status: string }) => {
  const statusMap: any = {
    'completed': { text: 'Concluída', color: 'bg-green-100 text-green-800' },
    'in-progress': { text: 'Em andamento', color: 'bg-blue-100 text-blue-800' },
    'cancelled': { text: 'Cancelada', color: 'bg-red-100 text-red-800' }
  };
  
  return (
    <motion.span 
      className={`text-xs px-2 py-1 rounded-full ${statusMap[status].color}`}
      whileHover={{ scale: 1.05 }}
    >
      {statusMap[status].text}
    </motion.span>
  );
};

const PublicProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (!isClient) {
    return (
      <AnimatedGradient>
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-md mt-16">
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-200 rounded-xl"></div>
            <div className="flex justify-center -mt-16">
              <div className="h-32 w-32 rounded-full bg-gray-300 border-4 border-white"></div>
            </div>
            <div className="text-center mt-4 space-y-2">
              <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-12 bg-gray-100 rounded-lg"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedGradient>
    );
  }

  return (
    <AnimatedGradient>
      {/* Header with reduced height */}
      <motion.div 
        className="relative h-64 w-full overflow-hidden" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src={staticProfile.bannerImage}
          alt="Banner do perfil"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Avatar container adjusted higher */}
        <div className="absolute top-16 left-0 right-0 flex justify-center"> {/* Changed from top-1/4 */}
          <motion.div 
            className="relative text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="relative mx-auto">
              <motion.img
                src={staticProfile.profileImage}
                alt={`Foto de ${staticProfile.username}`}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" 
                whileHover={{ scale: 1.05 }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <FiCheckCircle className="h-5 w-5" /> {/* Reduced icon size */}
              </motion.div>
            </div>
            <motion.h1 
              className="mt-3 text-2xl font-bold text-white drop-shadow-lg" 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {staticProfile.name}
            </motion.h1>
            <motion.p 
              className="text-white/90 text-md" 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              @{staticProfile.username}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main content moved higher with reduced top padding */}
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
        >
          {/* About section */}
          <motion.div 
            className="p-8 border-b"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-4 md:mb-0">
                <motion.h2 
                  className="text-2xl font-bold text-gray-800"
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                >
                  Sobre
                </motion.h2>
                <motion.p 
                  className="text-gray-600 mt-2 max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {staticProfile.bio}
                </motion.p>
              </div>
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="flex items-center text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <FiMapPin className="w-5 h-5 mr-2" />
                  <span>{staticProfile.location}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <FiCalendar className="w-5 h-5 mr-2" />
                  <span>Membro desde {staticProfile.joinedDate}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {/* Skills Offered */}
            <div className="p-8">
              <motion.h2 
                className="text-xl font-semibold text-gray-800 mb-4"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
              >
                Habilidades Oferecidas
              </motion.h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {staticProfile.skillsOffered.map((skill) => (
                    <motion.div
                      key={skill.id}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                        <div className="flex items-center">
                          <SkillLevel level={skill.level} />
                          <span className="ml-2 text-xs text-gray-500">{skill.level}/4</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.h2 
                className="text-xl font-semibold text-gray-800 mt-8 mb-4"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Habilidades Buscadas
              </motion.h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {staticProfile.skillsWanted.map((skill) => (
                    <motion.div
                      key={skill.id}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                        <div className="flex items-center">
                          <SkillLevel level={skill.level} />
                          <span className="ml-2 text-xs text-gray-500">{skill.level}/4</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Reviews */}
            <div className="p-8">
              <motion.div 
                className="flex justify-between items-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-gray-800">Avaliações</h2>
                <div className="flex items-center">
                  <div className="mr-2">
                    <StarRating rating={staticProfile.averageRating} />
                  </div>
                  <span className="text-gray-700 font-medium">{staticProfile.averageRating.toFixed(1)}/5</span>
                </div>
              </motion.div>

              <div className="space-y-6">
                <AnimatePresence>
                  {staticProfile.reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      className="border-b pb-6 last:border-b-0 last:pb-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-start">
                        <motion.img 
                          src={review.authorPhoto} 
                          alt={`Foto de ${review.author}`} 
                          className="w-10 h-10 rounded-full mr-3"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium text-gray-800">@{review.author}</span>
                              <div className="flex items-center mt-1">
                                <StarRating rating={review.rating} />
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                          </div>
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Exchange History */}
            <div className="p-8">
              <motion.h2 
                className="text-xl font-semibold text-gray-800 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Histórico de Trocas
              </motion.h2>
              <div className="space-y-4">
                <AnimatePresence>
                  {staticProfile.exchangeHistory.map((exchange) => (
                    <motion.div
                      key={exchange.id}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center">
                        <motion.img 
                          src={exchange.partnerPhoto} 
                          alt={`Foto de ${exchange.partner}`} 
                          className="w-10 h-10 rounded-full mr-3"
                          whileHover={{ rotate: 5 }}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-800">@{exchange.partner}</span>
                            <span className="text-sm text-gray-500">{formatDate(exchange.date)}</span>
                          </div>
                          <p className="mt-1 text-gray-600">{exchange.skill}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <ExchangeStatus status={exchange.status} />
                            <motion.button 
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                              whileHover={{ x: 3 }}
                            >
                              Detalhes <FiArrowRight className="ml-1" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h3 
              className="text-xl font-semibold text-gray-800 mb-3"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              viewport={{ once: true }}
            >
              Interessado em trocar habilidades?
            </motion.h3>
            <motion.p 
              className="text-gray-600 mb-6 max-w-2xl mx-auto"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Envie uma solicitação para trocar suas habilidades com {staticProfile.name} e comece uma colaboração mutuamente benéfica.
            </motion.p>
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center mx-auto"
              whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiUser className="mr-2" /> Solicitar Troca
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatedGradient>
  );
};

export default PublicProfilePage;