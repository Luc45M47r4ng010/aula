'use client';
import { AnimatedGradient } from '@components/AnimatedGradientBackground';
import { useState, useRef, useEffect } from 'react';
import { 
  FiPaperclip, 
  FiVideo, 
  FiCheckCircle, 
  FiSend, 
  FiChevronLeft,
  FiMoreVertical,
  FiSmile,
  FiMic,
  FiMaximize2,
  FiMinimize2,
  FiSearch
} from 'react-icons/fi';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

type Message = {
  id: string;
  sender: 'me' | 'them';
  text: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'pdf' | 'audio';
    url: string;
    name?: string;
    duration?: number;
  }[];
};

type Chat = {
  id: string;
  partner: string;
  partnerAvatar: string;
  skill: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  isOnline: boolean;
  typing?: boolean;
  messages: Message[];
};

const MessagesPage = () => {
  // Dados de exemplo
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      partner: 'João Silva',
      partnerAvatar: 'https://i.pravatar.cc/150?img=3',
      skill: 'React & TypeScript',
      lastMessage: 'Vamos marcar a sessão para amanhã?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      unread: 2,
      isOnline: true,
      typing: true,
      messages: [
        {
          id: '101',
          sender: 'them',
          text: 'Olá! Estou interessado na troca de habilidades',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          status: 'read'
        },
        {
          id: '102',
          sender: 'me',
          text: 'Oi João! Claro, o que você precisa saber sobre React?',
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          status: 'read'
        },
        {
          id: '103',
          sender: 'them',
          text: 'Queria entender melhor sobre hooks customizados',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          status: 'read'
        },
        {
          id: '104',
          sender: 'them',
          text: 'Vamos marcar a sessão para amanhã?',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          status: 'read',
          attachments: [
            {
              type: 'pdf',
              url: '/sample.pdf',
              name: 'roteiro.pdf'
            }
          ]
        },
      ],
    },
    {
      id: '2',
      partner: 'Maria Souza',
      partnerAvatar: 'https://i.pravatar.cc/150?img=5',
      skill: 'UI/UX Design',
      lastMessage: 'Enviei os wireframes para revisão',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 120),
      unread: 0,
      isOnline: false,
      messages: [
        {
          id: '201',
          sender: 'them',
          text: 'Oi! Podemos conversar sobre o projeto?',
          timestamp: new Date(Date.now() - 1000 * 60 * 180),
          status: 'read'
        },
        {
          id: '202',
          sender: 'me',
          text: 'Claro! Que aspectos do UI/Design você quer discutir?',
          timestamp: new Date(Date.now() - 1000 * 60 * 150),
          status: 'read'
        },
        {
          id: '203',
          sender: 'them',
          text: 'Enviei os wireframes para revisão',
          timestamp: new Date(Date.now() - 1000 * 60 * 120),
          status: 'read',
          attachments: [
            {
              type: 'image',
              url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
            }
          ]
        },
      ],
    },
    {
      id: '3',
      partner: 'Carlos Oliveira',
      partnerAvatar: 'https://i.pravatar.cc/150?img=8',
      skill: 'Node.js Backend',
      lastMessage: 'Obrigado pela ajuda com o MongoDB!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unread: 0,
      isOnline: true,
      messages: [
        {
          id: '301',
          sender: 'me',
          text: 'Oi Carlos, como vai o projeto?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26),
          status: 'read'
        },
        {
          id: '302',
          sender: 'them',
          text: 'Estou com um problema nas queries do MongoDB',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
          status: 'read'
        },
        {
          id: '303',
          sender: 'me',
          text: 'Posso te ajudar com isso, vamos fazer uma chamada?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          status: 'read',
          attachments: [
            {
              type: 'image',
              url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            }
          ]
        },
        {
          id: '304',
          sender: 'them',
          text: 'Obrigado pela ajuda com o MongoDB!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          status: 'read'
        },
      ],
    },
  ]);

  const [activeChat, setActiveChat] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Efeito para rolar para baixo e simular digitação
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    if (activeChat === '1' && chats[0].typing) {
      const timer = setTimeout(() => {
        setChats(prev => prev.map(chat => 
          chat.id === '1' ? {...chat, typing: false} : chat
        ));
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [activeChat, chats]);

  const handleSendMessage = () => {
    if (!activeChat || (!newMessage.trim() && attachments.length === 0)) return;

    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat) {
        const newMsg: Message = {
          id: Date.now().toString(),
          sender: 'me',
          text: newMessage.trim(),
          timestamp: new Date(),
          status: 'sent',
          attachments: attachments.map(file => ({
            type: file.type.includes('image') ? 'image' : 
                  file.type.includes('pdf') ? 'pdf' : 'audio',
            url: URL.createObjectURL(file),
            name: file.name,
            duration: file.type.includes('audio') ? 120 : undefined
          })),
        };

        return {
          ...chat,
          lastMessage: newMessage.trim() || (attachments.length ? 'Arquivo enviado' : chat.lastMessage),
          lastMessageTime: new Date(),
          messages: [...chat.messages, newMsg],
          unread: 0,
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setNewMessage('');
    setAttachments([]);
    
    // Simula resposta após 2 segundos
    if (activeChat === '1') {
      setTimeout(() => {
        setChats(prev => prev.map(chat => {
          if (chat.id === '1') {
            const replyMsg: Message = {
              id: Date.now().toString(),
              sender: 'them',
              text: 'Perfeito! Amanhã às 15h funciona para você?',
              timestamp: new Date(),
              status: 'delivered'
            };
            
            return {
              ...chat,
              lastMessage: replyMsg.text,
              lastMessageTime: new Date(),
              messages: [...chat.messages, replyMsg],
              typing: false
            };
          }
          return chat;
        }));
      }, 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...files]);
    }
  };

  const startVideoCall = () => {
    alert('Iniciando chamada de vídeo via WebRTC com ' + currentChat?.partner);
  };

  const markAsCompleted = (chatId: string) => {
    if (window.confirm('Deseja marcar esta troca como concluída?')) {
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? {...chat, skill: chat.skill + ' (Concluído)'} : chat
      ));
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleDrag = (event: any, info: any) => {
    const newWidth = Math.min(Math.max(240, info.point.x), 500);
    setSidebarWidth(newWidth);
  };

  const currentChat = chats.find(chat => chat.id === activeChat);

  return (
    <AnimatedGradient>
      <div className="flex h-screen text-white overflow-hidden">
        {/* Sidebar - Lista de conversas */}
        <motion.div 
          className={`bg-white/5 backdrop-blur-lg border-r border-white/10 relative flex-shrink-0 h-full overflow-hidden ${
            sidebarCollapsed ? 'w-20' : ''
          }`}
          style={{ width: sidebarCollapsed ? 80 : sidebarWidth }}
          animate={{ width: sidebarCollapsed ? 80 : sidebarWidth }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Handle para redimensionar */}
          {!sidebarCollapsed && (
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize z-20 hover:bg-white/20 active:bg-white/30"
              onPan={handleDrag}
              drag="x"
              dragConstraints={{ left: 240, right: 500 }}
              dragElastic={0}
              dragMomentum={false}
              dragControls={dragControls}
            />
          )}

          {/* Cabeçalho da sidebar */}
          <div className="p-4 border-b border-white/10 h-20 flex items-center">
            {sidebarCollapsed ? (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-white/10 mx-auto"
              >
                <FiMaximize2 size={20} />
              </button>
            ) : (
              <>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Mensagens
                </h1>
                <button
                  onClick={toggleSidebar}
                  className="p-1 ml-auto rounded-full hover:bg-white/10"
                >
                  <FiMinimize2 size={18} />
                </button>
              </>
            )}
          </div>
          
          {/* Campo de busca (apenas quando expandido) */}
          {!sidebarCollapsed && (
            <div className="px-4 pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar conversas..."
                  className="w-full bg-white/10 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-white/20"
                />
                <FiSearch className="absolute left-3 top-2.5 text-white/50" size={16} />
              </div>
            </div>
          )}

          {/* Lista de chats */}
          <div className="overflow-y-auto h-[calc(100%-112px)] custom-scrollbar">
            {chats.map((chat) => (
              <div 
                key={chat.id}
                className={`p-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors flex items-center ${
                  activeChat === chat.id ? 'bg-white/10' : ''
                }`}
                onClick={() => {
                  setActiveChat(chat.id);
                  if (window.innerWidth < 768) setSidebarCollapsed(true);
                }}
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src={chat.partnerAvatar} 
                    alt={chat.partner}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                  />
                  {chat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white/50"></div>
                  )}
                </div>
                
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-3 overflow-hidden flex-1 min-w-0"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{chat.partner}</h3>
                      <span className="text-xs opacity-50 whitespace-nowrap ml-2">
                        {new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <p className="text-xs opacity-70 truncate">
                        {chat.typing ? (
                          <span className="text-blue-400 flex items-center">
                            <span className="flex mr-1">
                              <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </span>
                            Digitando...
                          </span>
                        ) : (
                          chat.lastMessage.substring(0, 20) + (chat.lastMessage.length > 20 ? '...' : '')
                        )}
                      </p>
                      {chat.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center ml-2 flex-shrink-0">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Área principal do chat */}
        <div className={`flex-1 flex flex-col ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
          {currentChat ? (
            <>
              {/* Cabeçalho do chat */}
              <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button 
                    className="md:hidden p-1 hover:bg-white/10 rounded-full transition-colors"
                    onClick={() => setActiveChat(null)}
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <div className="relative">
                    <img 
                      src={currentChat.partnerAvatar} 
                      alt={currentChat.partner}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                    />
                    {currentChat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white/50"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold">{currentChat.partner}</h2>
                    <div className="flex items-center">
                      <p className="text-xs opacity-70">{currentChat.skill}</p>
                      {currentChat.typing && (
                        <span className="text-xs italic opacity-70 ml-2 flex items-center">
                          <span className="flex mr-1">
                            <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </span>
                          digitando
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    onClick={startVideoCall}
                    title="Chamada de vídeo"
                  >
                    <FiVideo size={20} />
                  </button>
                  <button 
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    onClick={() => markAsCompleted(currentChat.id)}
                    title="Marcar como concluído"
                  >
                    <FiCheckCircle size={20} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <FiMoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Área de mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white/5 to-transparent custom-scrollbar">
                <AnimatePresence>
                  {currentChat.messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs md:max-w-md rounded-2xl p-4 relative ${
                          message.sender === 'me' 
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 rounded-br-none' 
                            : 'bg-white/10 rounded-bl-none'
                        }`}
                      >
                        {message.text && <p className="text-sm">{message.text}</p>}
                        
                        {message.attachments?.map((attachment, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-2"
                          >
                            {attachment.type === 'image' ? (
                              <img 
                                src={attachment.url} 
                                alt="Anexo" 
                                className="max-w-full h-auto rounded-xl cursor-pointer hover:opacity-90 transition-opacity shadow-lg"
                                onClick={() => window.open(attachment.url, '_blank')}
                              />
                            ) : attachment.type === 'pdf' ? (
                              <a 
                                href={attachment.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors shadow"
                              >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="truncate max-w-xs">
                                  {attachment.name || 'Documento PDF'}
                                </span>
                              </a>
                            ) : (
                              <div className="flex items-center px-4 py-2 bg-white/10 rounded-xl">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{attachment.name || 'Gravação de áudio'}</div>
                                  <div className="text-xs opacity-70">{attachment.duration}s</div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}

                        <div className="flex items-center justify-end mt-1 space-x-1">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.sender === 'me' && message.status && (
                            <span className="text-xs opacity-70">
                              {message.status === 'sent' && '✓'}
                              {message.status === 'delivered' && '✓✓'}
                              {message.status === 'read' && (
                                <span className="text-blue-300">✓✓</span>
                              )}
                            </span>
                          )}
                        </div>

                        {/* Balão de mensagem */}
                        <div className={`absolute top-0 ${message.sender === 'me' ? '-right-1' : '-left-1'}`}>
                          <svg 
                            width="12" 
                            height="16" 
                            viewBox="0 0 12 16" 
                            fill="none"
                            className={`${message.sender === 'me' ? 'text-blue-500' : 'text-white/10'}`}
                          >
                            <path d="M12 0V16L0 0H12Z" fill="currentColor"/>
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Área de composição de mensagem */}
              <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-lg">
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {attachments.map((file, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center bg-white/10 rounded-lg px-3 py-1.5 text-xs shadow"
                      >
                        <span className="truncate max-w-[120px]">
                          {file.name}
                        </span>
                        <button 
                          className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                          onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    title="Anexar arquivo"
                  >
                    <FiPaperclip size={20} />
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      multiple
                      accept="image/*,.pdf,audio/*"
                    />
                  </button>
                  
                  <button 
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    title="Emojis"
                  >
                    <FiSmile size={20} />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      className="w-full bg-white/10 rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    {!newMessage && (
                      <button
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ${
                          isRecording ? 'bg-red-500 animate-pulse' : 'bg-white/10'
                        }`}
                        onClick={toggleRecording}
                        title="Gravar áudio"
                      >
                        <FiMic size={16} className={isRecording ? 'text-white' : ''} />
                      </button>
                    )}
                  </div>
                  
                  <button 
                    className={`p-3 rounded-full ${
                      newMessage.trim() || attachments.length > 0 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-white/10'
                    } transition-colors`}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() && attachments.length === 0}
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <div className="text-center p-6 max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Nenhum chat selecionado</h2>
                <p className="opacity-80 mb-6">
                  Selecione uma conversa da lista ao lado para começar a trocar mensagens
                </p>
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
                  onClick={() => setSidebarCollapsed(false)}
                >
                  Mostrar conversas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estilos personalizados para scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </AnimatedGradient>
  );
};

export default MessagesPage;