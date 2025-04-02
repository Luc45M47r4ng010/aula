'use client';
import { AnimatedGradient } from '@components/AnimatedGradientBackground';
import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

type Exchange = {
  date: string;
  partner: string;
  skills: string[];
  status: 'completed' | 'pending' | 'cancelled';
  rating?: number;
};

const HistoryPage = () => {
  // Dados de exemplo
  const [exchanges, setExchanges] = useState<Exchange[]>([
    {
      date: '2023-10-15',
      partner: 'João Silva',
      skills: ['React', 'TypeScript'],
      status: 'completed',
      rating: 5
    },
    {
      date: '2023-10-18',
      partner: 'Maria Souza',
      skills: ['Node.js', 'MongoDB'],
      status: 'completed',
      rating: 4
    },
    {
      date: '2023-10-20',
      partner: 'Carlos Oliveira',
      skills: ['UI Design', 'Figma'],
      status: 'pending'
    },
    {
      date: '2023-10-22',
      partner: 'Ana Santos',
      skills: ['Python', 'Data Analysis'],
      status: 'completed',
      rating: 5
    },
    {
      date: '2023-10-25',
      partner: 'Pedro Costa',
      skills: ['React Native', 'Firebase'],
      status: 'cancelled'
    }
  ]);

  const [dateFilter, setDateFilter] = useState<string>('all');
  const [skillFilter, setSkillFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');

  // Filtrar trocas
  const filteredExchanges = exchanges.filter(exchange => {
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'month' && new Date(exchange.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === 'year' && new Date(exchange.date) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
    
    const matchesSkill = skillFilter === 'all' || 
      exchange.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));
    
    const matchesRating = ratingFilter === 'all' || 
      (exchange.rating && (
        (ratingFilter === '5' && exchange.rating === 5) ||
        (ratingFilter === '4+' && exchange.rating >= 4) ||
        (ratingFilter === '3+' && exchange.rating >= 3)
      ));
    
    return matchesDate && matchesSkill && matchesRating;
  });

  // Dados para gráficos
  const monthlyData = [
    { name: 'Jan', exchanges: 12 },
    { name: 'Fev', exchanges: 8 },
    { name: 'Mar', exchanges: 15 },
    { name: 'Abr', exchanges: 10 },
    { name: 'Mai', exchanges: 18 },
    { name: 'Jun', exchanges: 14 },
  ];

  const yearlyData = [
    { name: '2020', exchanges: 85 },
    { name: '2021', exchanges: 120 },
    { name: '2022', exchanges: 150 },
    { name: '2023', exchanges: 210 },
  ];

  return (
    <AnimatedGradient>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Histórico Completo</h1>
        
        {/* Filtros */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Período</label>
              <select 
                className="w-full p-2 rounded bg-white/20 text-white border border-white/30"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="month">Últimos 30 dias</option>
                <option value="year">Último ano</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Habilidade</label>
              <select 
                className="w-full p-2 rounded bg-white/20 text-white border border-white/30"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              >
                <option value="all">Todas</option>
                <option value="React">React</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Node.js">Node.js</option>
                <option value="Python">Python</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Avaliação</label>
              <select 
                className="w-full p-2 rounded bg-white/20 text-white border border-white/30"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="all">Todas</option>
                <option value="5">5 estrelas</option>
                <option value="4+">4+ estrelas</option>
                <option value="3+">3+ estrelas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Trocas */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Todas as Trocas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/20">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Data</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Parceiro</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Habilidades</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Avaliação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredExchanges.map((exchange, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{exchange.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{exchange.partner}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      {exchange.skills.join(', ')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        exchange.status === 'completed' ? 'bg-green-500/30 text-green-200' :
                        exchange.status === 'pending' ? 'bg-yellow-500/30 text-yellow-200' :
                        'bg-red-500/30 text-red-200'
                      }`}>
                        {exchange.status === 'completed' ? 'Concluído' : 
                         exchange.status === 'pending' ? 'Pendente' : 'Cancelado'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      {exchange.rating ? '★'.repeat(exchange.rating) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-4">Estatísticas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Trocas Mensais</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                    <XAxis dataKey="name" stroke="#ffffff" />
                    <YAxis stroke="#ffffff" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: '#ffffff30' }}
                      itemStyle={{ color: '#ffffff' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="exchanges" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Trocas Anuais</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                    <XAxis dataKey="name" stroke="#ffffff" />
                    <YAxis stroke="#ffffff" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: '#ffffff30' }}
                      itemStyle={{ color: '#ffffff' }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="exchanges" 
                      fill="#82ca9d" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedGradient>
  );
};

export default HistoryPage;