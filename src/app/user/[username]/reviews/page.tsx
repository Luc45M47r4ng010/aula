'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedGradient } from '@components/AnimatedGradientBackground';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

// ===================== TIPOS =====================
type ReviewSort = 'recent' | 'relevant' | 'highest' | 'lowest';
type RatingCategory = 'didatica' | 'pontualidade' | 'qualidade' | 'comunicacao' | 'flexibilidade';

interface Review {
  id: string;
  author: {
    name: string;
    photo: string;
    role: string;
  };
  rating: number;
  categories: Record<RatingCategory, number>;
  comment: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  replies?: Reply[];
  isOwner?: boolean;
}

interface Reply {
  id: string;
  author: {
    name: string;
    photo: string;
  };
  comment: string;
  date: string;
}

// ===================== DADOS MOCKADOS =====================
const radarData = [
  { subject: 'Didática', A: 4.7, fullMark: 5 },
  { subject: 'Pontualidade', A: 4.9, fullMark: 5 },
  { subject: 'Qualidade', A: 4.8, fullMark: 5 },
  { subject: 'Comunicação', A: 4.6, fullMark: 5 },
  { subject: 'Flexibilidade', A: 4.5, fullMark: 5 },
];

const reviews: Review[] = [
  {
    id: '1',
    author: {
      name: 'Carlos Oliveira',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'Front-end Developer'
    },
    rating: 5,
    categories: {
      didatica: 5,
      pontualidade: 5,
      qualidade: 5,
      comunicacao: 5,
      flexibilidade: 5,
    },
    comment: 'Excelente profissional! As aulas foram muito bem estruturadas e o conteúdo foi passado de forma clara e objetiva. Super recomendo!',
    date: '2023-06-15',
    likes: 24,
    isLiked: true,
    replies: [
      {
        id: '1-1',
        author: {
          name: 'Você',
          photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        comment: 'Muito obrigada pelo feedback, Carlos! Foi um prazer trabalhar com você.',
        date: '2023-06-16',
      }
    ],
    isOwner: true
  },
  {
    id: '2',
    author: {
      name: 'Mariana Costa',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      role: 'UX Designer'
    },
    rating: 4.5,
    categories: {
      didatica: 5,
      pontualidade: 4,
      qualidade: 5,
      comunicacao: 4,
      flexibilidade: 4,
    },
    comment: 'Ótima didática e domínio do conteúdo. Algumas vezes atrasou uns 10 minutos, mas no geral foi uma ótima experiência de aprendizado.',
    date: '2023-05-20',
    likes: 12
  },
  {
    id: '3',
    author: {
      name: 'João Santos',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg',
      role: 'Product Manager'
    },
    rating: 4.8,
    categories: {
      didatica: 5,
      pontualidade: 5,
      qualidade: 5,
      comunicacao: 4,
      flexibilidade: 5,
    },
    comment: 'Profissional muito competente e flexível com os horários. Adaptou o conteúdo às minhas necessidades específicas.',
    date: '2023-04-10',
    likes: 18
  },
];

// ===================== COMPONENTES =====================
const RatingStars = ({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <motion.svg
          key={`full-${i}`}
          className={`${starSize[size]} text-yellow-400`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          whileHover={{ scale: 1.2, rotate: 15 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
      
      {hasHalfStar && (
        <motion.svg
          className={`${starSize[size]} text-yellow-400`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          whileHover={{ scale: 1.2, rotate: 15 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      )}
      
      {[...Array(emptyStars)].map((_, i) => (
        <motion.svg
          key={`empty-${i}`}
          className={`${starSize[size]} text-gray-300`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          whileHover={{ scale: 1.2, rotate: 15 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
      
      <motion.span 
        className={`ml-1 ${
          size === 'sm' ? 'text-xs' : 
          size === 'md' ? 'text-sm' : 
          'text-base'
        } font-medium text-gray-600`}
        whileHover={{ scale: 1.05 }}
      >
        {rating.toFixed(1)}
      </motion.span>
    </div>
  );
};

const ReviewCard = ({ review, isProfileOwner }: { review: Review; isProfileOwner: boolean }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showReplies, setShowReplies] = useState(false);
  const [likes, setLikes] = useState(review.likes);
  const [isLiked, setIsLiked] = useState(review.isLiked || false);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      setIsReplying(false);
      setReplyText('');
      setShowReplies(true);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-6"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start">
            <motion.div 
              whileHover={{ rotate: 2 }}
              className="relative"
            >
              <img
                src={review.author.photo}
                alt={review.author.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-indigo-100 shadow-sm"
              />
              {review.rating === 5 && (
                <motion.div 
                  className="absolute -bottom-1 -right-1 bg-yellow-400 text-white p-1 rounded-full"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
            <div className="ml-3">
              <h4 className="font-medium text-gray-800">{review.author.name}</h4>
              <p className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1">
                {review.author.role}
              </p>
              <RatingStars rating={review.rating} size="sm" />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString('pt-BR')}
            </span>
            <motion.button
              onClick={handleLike}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center mt-2 text-sm ${isLiked ? 'text-indigo-600' : 'text-gray-500'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill={isLiked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={isLiked ? 0 : 2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {likes}
            </motion.button>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{review.comment}</p>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {Object.entries(review.categories).map(([key, value]) => (
            <motion.div 
              key={key} 
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-indigo-50 px-3 py-1 rounded-full"
            >
              <span className="text-xs font-medium text-indigo-600 capitalize">
                {key}
              </span>
              <div className="ml-2 w-8 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(value / 5) * 100}%` }}
                  transition={{ delay: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {isProfileOwner && !review.isOwner && (
          <div className="flex justify-end">
            <motion.button 
              onClick={() => setIsReplying(!isReplying)}
              whileHover={{ scale: 1.05 }}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
            >
              {isReplying ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancelar
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Responder
                </>
              )}
            </motion.button>
          </div>
        )}
        
        {isReplying && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleReplySubmit}
            className="mt-4"
          >
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Digite sua resposta..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
            />
            <div className="flex justify-end space-x-3 mt-3">
              <motion.button
                type="button"
                onClick={() => setIsReplying(false)}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
              >
                Cancelar
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-sm"
              >
                Enviar Resposta
              </motion.button>
            </div>
          </motion.form>
        )}
        
        {review.replies && review.replies.length > 0 && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <motion.button 
              onClick={() => setShowReplies(!showReplies)}
              whileHover={{ scale: 1.02 }}
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 mb-2"
            >
              {showReplies ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Ocultar respostas
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Ver {review.replies.length} {review.replies.length === 1 ? 'resposta' : 'respostas'}
                </>
              )}
            </motion.button>
            
            <AnimatePresence>
              {showReplies && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pl-6 border-l-2 border-indigo-100"
                >
                  {review.replies.map((reply) => (
                    <motion.div 
                      key={reply.id} 
                      className="pt-4"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <img
                            src={reply.author.photo}
                            alt={reply.author.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-indigo-50"
                          />
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-800">{reply.author.name}</h4>
                            <span className="text-xs text-gray-500">
                              {new Date(reply.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mt-2 ml-11">{reply.comment}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ===================== PÁGINA PRINCIPAL =====================
const UserReviewsPage = () => {
  const [sortBy, setSortBy] = useState<ReviewSort>('recent');
  const [isProfileOwner, setIsProfileOwner] = useState(true);
  const averageRating = 4.8;
  const totalReviews = reviews.length;

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else if (sortBy === 'lowest') {
      return a.rating - b.rating;
    } else {
      // Ordenar por relevância (likes + comentários)
      const aRelevance = a.likes + (a.replies?.length || 0);
      const bRelevance = b.likes + (b.replies?.length || 0);
      return bRelevance - aRelevance;
    }
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
                className="mb-10 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-block"
                >
                  <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">Avaliações</h1>
                </motion.div>
                
                <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-2xl py-4 px-6 max-w-md mx-auto shadow-sm">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-5xl font-bold text-white mb-2"
                  >
                    {averageRating.toFixed(1)}
                  </motion.div>
                  <RatingStars rating={averageRating} size="lg" />
                  <motion.p 
                    whileHover={{ scale: 1.02 }}
                    className="text-white/90 mt-2"
                  >
                    {totalReviews} {totalReviews === 1 ? 'avaliação' : 'avaliações'}
                  </motion.p>
                </div>
              </motion.header>

              {/* Gráfico de Radar */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ 
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  transition: { duration: 0.3 }
                }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-10 border border-white/20"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Desempenho por Categoria
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid gridType="circle" stroke="#e5e7eb" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#4b5563', fontSize: 12 }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 5]} 
                        tickCount={6}
                        tick={{ fill: '#6b7280', fontSize: 10 }}
                      />
                      <Radar
                        name="Avaliação"
                        dataKey="A"
                        stroke="#4f46e5"
                        fill="#4f46e5"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Filtros e Comentários */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Comentários
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">Ordenar por:</span>
                      <motion.button
                        onClick={() => setSortBy('recent')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                          sortBy === 'recent'
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Mais recentes
                      </motion.button>
                      <motion.button
                        onClick={() => setSortBy('relevant')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                          sortBy === 'relevant'
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Mais relevantes
                      </motion.button>
                      <motion.button
                        onClick={() => setSortBy('highest')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                          sortBy === 'highest'
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Melhores notas
                      </motion.button>
                      <motion.button
                        onClick={() => setSortBy('lowest')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                          sortBy === 'lowest'
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Piores notas
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {sortedReviews.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma avaliação ainda</h3>
                      <p className="mt-1 text-gray-500">
                        Este usuário ainda não recebeu avaliações.
                      </p>
                      {isProfileOwner && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Solicitar avaliação
                        </motion.button>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-6"
                    >
                      {sortedReviews.map((review) => (
                        <ReviewCard 
                          key={review.id} 
                          review={review} 
                          isProfileOwner={isProfileOwner} 
                        />
                      ))}
                    </motion.div>
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

export default UserReviewsPage;