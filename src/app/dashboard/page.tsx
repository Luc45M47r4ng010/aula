'use client';

import React from 'react';
import { Card, Progress, List, Avatar, Badge, Typography, Tooltip } from 'antd';
import { motion, useAnimation } from 'framer-motion';
import { AnimatedGradient } from '@components/AnimatedGradientBackground';
import { useInView } from 'react-intersection-observer';

const { Title, Text } = Typography;

interface Meta {
  progresso: number;
  total: number;
  badge: string;
}

interface Notificacao {
  id: number;
  texto: string;
  lida: boolean;
  icone?: string;
}

interface Atividade {
  id: number;
  acao: string;
  data: string;
  icone?: string;
}

interface Dados {
  trocasConcluidas: number;
  horasAprendizado: number;
  skills: string[];
  notificacoes: Notificacao[];
  metas: Meta;
  atividades: Atividade[];
}

const dados: Dados = {
  trocasConcluidas: 5,
  horasAprendizado: 32,
  skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'UI/UX', 'GraphQL'],
  notificacoes: [
    { id: 1, texto: 'Novo match com Maria para React', lida: false, icone: '💡' },
    { id: 2, texto: 'João enviou uma mensagem', lida: true, icone: '✉️' },
    { id: 3, texto: 'Sua skill TypeScript foi avaliada como 5 estrelas', lida: false, icone: '⭐' },
  ],
  metas: {
    progresso: 3,
    total: 5,
    badge: 'Colaborador Ouro'
  },
  atividades: [
    { id: 1, acao: 'Você ensinou JavaScript para Ana', data: '10/05', icone: '👩‍🏫' },
    { id: 2, acao: 'Aprendeu UI Design com Pedro', data: '08/05', icone: '🎨' },
    { id: 3, acao: 'Completou desafio de algoritmos', data: '05/05', icone: '🏆' },
  ]
};

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      when: "beforeChildren",
      delayChildren: 0.2
    } 
  }
};

const cardVariants = {
  initial: { 
    opacity: 0,
    y: 0
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.17, 0.67, 0.13, 0.99],
    }
  },
  hover: {
    y: -5,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "backOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

const GlassCard: React.FC<React.PropsWithChildren<{ 
  title?: React.ReactNode; 
  style?: React.CSSProperties; 
  hoverEffect?: boolean 
}>> = ({ title, children, style, hoverEffect = true }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  React.useEffect(() => {
    if (inView) {
      controls.start("animate");
    } else {
      controls.start("initial");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      whileHover={hoverEffect ? "hover" : {}}
      variants={cardVariants}
      style={{ height: '100%' }}
    >
      <Card
        title={title}
        style={{ 
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          height: '100%',
          transition: 'all 0.3s ease',
          ...style
        }}
        styles={{
          header: { 
            color: '#fff',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '1.2rem',
            fontWeight: 500,
            padding: '16px 24px'
          },
          body: { 
            color: '#fff',
            padding: '20px 24px'
          }
        }}
      >
        {children}
      </Card>
    </motion.div>
  );
};

const StatNumber: React.FC<{ value: string | number; description?: string }> = ({ value, description }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Text strong style={{ 
      fontSize: '3rem', 
      color: '#fff',
      lineHeight: 1,
      background: 'linear-gradient(90deg, #fff, #c2c2c2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 700
    }}>
      {value}
    </Text>
    {description && (
      <Text style={{ 
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.9rem',
        marginTop: '4px'
      }}>
        {description}
      </Text>
    )}
  </div>
);

const DashboardPage: React.FC = () => {
  return (
    <AnimatedGradient>
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
        style={{
          padding: '2.5rem',
          maxWidth: '1600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Header */}
        <motion.div variants={cardVariants}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <Title level={1} style={{ 
                color: '#fff',
                margin: 0,
                fontWeight: 700,
                fontSize: '2.5rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                lineHeight: 1.2
              }}>
                Bem-vindo de volta!
              </Title>
              <Text style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.1rem'
              }}>
                Aqui está seu progresso atual
              </Text>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                minWidth: 'fit-content',
                padding: '6px',
                background: 'rgba(255,215,0,0.15)',
                borderRadius: '28px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,215,0,0.5)',
                boxShadow: '0 4px 20px rgba(255,215,0,0.25)'
              }}
            >
              <Text style={{ 
                color: '#FFD700',
                padding: '10px 24px',
                fontSize: '16px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                display: 'inline-block',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}>
                {dados.metas.badge}
              </Text>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}
          variants={pageVariants}
        >
          <GlassCard title="Trocas Concluídas">
            <StatNumber value={dados.trocasConcluidas} description="este mês" />
            <Progress 
              percent={70}
              showInfo={false}
              strokeColor="rgba(255, 255, 255, 0.7)"
              trailColor="rgba(255, 255, 255, 0.1)"
              style={{ marginTop: '20px' }}
            />
          </GlassCard>
          
          <GlassCard title="Horas de Aprendizado">
            <StatNumber value={dados.horasAprendizado} description="desde o início" />
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              marginTop: '12px'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>+12h</span>
              <Text style={{ color: 'rgba(255, 255, 255, 0.5)' }}>que o mês passado</Text>
            </div>
          </GlassCard>
          
          <GlassCard title="Progresso de Metas">
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
              <StatNumber value={`${dados.metas.progresso}/${dados.metas.total}`} />
              <Text style={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px'
              }}>
                metas concluídas
              </Text>
            </div>
            <Progress 
              percent={(dados.metas.progresso / dados.metas.total) * 100}
              strokeColor={{
                '0%': '#36d1dc',
                '50%': '#5b86e5',
                '100%': '#ff8a00',
              }}
              trailColor="rgba(255, 255, 255, 0.1)"
              size="small"
              style={{ marginTop: '20px' }}
            />
          </GlassCard>
        </motion.div>

        {/* Seção inferior */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '2rem',
          alignItems: 'flex-start'
        }}>
          {/* Coluna esquerda */}
          <div style={{ display: 'grid', gap: '2rem' }}>
            <GlassCard title="Minhas Skills">
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '0.8rem',
                marginTop: '8px'
              }}>
                {dados.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Tooltip title={`Clique para ver mais sobre ${skill}`}>
                      <Badge 
                        count={skill} 
                        style={{ 
                          backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.2)`,
                          color: '#fff',
                          padding: '10px 18px',
                          borderRadius: '24px',
                          fontSize: '14px',
                          fontWeight: 500,
                          border: `1px solid hsla(${index * 60}, 70%, 50%, 0.5)`,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }} 
                      />
                    </Tooltip>
                  </motion.div>
                ))}
              </div>
              <div style={{ 
                marginTop: '20px',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px dashed rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                cursor: 'pointer'
              }}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  + Adicionar nova skill
                </Text>
              </div>
            </GlassCard>

            <GlassCard title="Atividades Recentes">
              <List
                dataSource={dados.atividades}
                renderItem={(item) => (
                  <motion.div variants={itemVariants}>
                    <List.Item style={{ 
                      padding: '14px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '20px', opacity: 0.8 }}>
                          {item.icone}
                        </span>
                        <Text style={{ color: '#fff' }}>{item.acao}</Text>
                      </div>
                      <Text style={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontStyle: 'italic',
                        fontSize: '0.9rem'
                      }}>
                        {item.data}
                      </Text>
                    </List.Item>
                  </motion.div>
                )}
                style={{ marginTop: '-10px' }}
              />
              <div style={{ textAlign: 'right', marginTop: '12px' }}>
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}>
                  Ver todas as atividades
                </Text>
              </div>
            </GlassCard>
          </div>

          {/* Coluna direita */}
          <div>
            <GlassCard title="Notificações">
              <List
                dataSource={dados.notificacoes}
                renderItem={(item) => (
                  <motion.div variants={itemVariants}>
                    <List.Item 
                      style={{ 
                        background: !item.lida ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                        borderRadius: '12px',
                        marginBottom: '10px',
                        padding: '14px 20px',
                        transition: 'all 0.3s ease',
                        borderLeft: !item.lida ? '3px solid #5b86e5' : '3px solid transparent'
                      }}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar 
                            style={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              color: '#fff',
                              fontSize: '18px',
                              width: '42px',
                              height: '42px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {item.icone || item.texto.charAt(0)}
                          </Avatar>
                        }
                        title={
                          <Text style={{ 
                            color: '#fff', 
                            margin: 0,
                            fontWeight: !item.lida ? 500 : 400
                          }}>
                            {item.texto}
                          </Text>
                        }
                        description={!item.lida && (
                          <Text style={{ 
                            color: 'rgba(255, 255, 255, 0.7)', 
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <span>●</span> Nova notificação
                          </Text>
                        )}
                      />
                    </List.Item>
                  </motion.div>
                )}
              />
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '16px'
              }}>
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer'
                }}>
                  Marcar todas como lidas
                </Text>
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer'
                }}>
                  Ver histórico
                </Text>
              </div>
            </GlassCard>

            <GlassCard title="Próximos Passos" style={{ marginTop: '2rem' }}>
              <List
                dataSource={[
                  'Complete seu perfil (80%)',
                  'Encontre um mentor para React Avançado',
                  'Participe do desafio de TypeScript',
                  'Avalie suas últimas trocas'
                ]}
                renderItem={(item, index) => (
                  <motion.div variants={itemVariants}>
                    <List.Item style={{ 
                      padding: '14px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {index + 1}
                      </div>
                      <Text style={{ color: '#fff' }}>{item}</Text>
                    </List.Item>
                  </motion.div>
                )}
              />
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </AnimatedGradient>
  );
};

export default DashboardPage;