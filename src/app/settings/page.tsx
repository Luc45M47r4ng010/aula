'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedGradient } from '@components/AnimatedGradientBackground';

// ===================== TIPOS =====================
type SettingsTab = 'profile' | 'security' | 'privacy' | 'notifications' | 'payment';

interface UserProfile {
  name: string;
  email: string;
  photo: string;
  banner: string;
  bio: string;
  skills: string[];
  isPremium: boolean;
  twoFactorEnabled: boolean;
  lastPasswordUpdate: string;
}

// ===================== ANIMAÇÕES =====================
const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: { opacity: 0, y: -10 }
};

const cardHover = {
  scale: 1.02,
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10
  }
};

// ===================== COMPONENTES =====================
const SettingsTabButton = ({
  active,
  onClick,
  icon,
  children
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className={`flex items-center px-5 py-3 rounded-xl transition-all ${
      active
        ? 'bg-white text-indigo-600 shadow-lg'
        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
    }`}
  >
    <span className="mr-3">{icon}</span>
    <span className="font-medium">{children}</span>
  </motion.button>
);

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

const ToggleSwitch = ({
  enabled,
  onChange,
  label
}: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
}) => (
  <div className="flex items-center justify-between mb-5">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <button
      type="button"
      className={`${
        enabled ? 'bg-indigo-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  </div>
);

const FileUpload = ({
  label,
  onFileChange,
  previewUrl,
  type = 'photo'
}: {
  label: string;
  onFileChange: (file: File) => void;
  previewUrl?: string;
  type?: 'photo' | 'banner';
}) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="flex items-center">
      <label className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition p-4">
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Clique para upload</span> ou arraste e solte
          </p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          onChange={(e) => e.target.files && onFileChange(e.target.files[0])}
          accept="image/*"
        />
      </label>
      {previewUrl && (
        <div className={`ml-4 ${type === 'banner' ? 'w-32 h-16' : 'w-16 h-16'} rounded-md overflow-hidden border border-gray-200`}>
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  </div>
);

// ===================== PÁGINA PRINCIPAL =====================
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Ana Silva',
    email: 'ana.silva@exemplo.com',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    banner: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    bio: 'Designer UX/UI com 5 anos de experiência criando interfaces intuitivas e bonitas para produtos digitais.',
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototipagem'],
    isPremium: true,
    twoFactorEnabled: false,
    lastPasswordUpdate: '2023-05-15'
  });
  const [newPassword, setNewPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [privacySettings, setPrivacySettings] = useState({
    showSkills: true,
    showRatings: true,
    profileVisible: true,
    showEmail: false
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      messages: true,
      matches: true,
      updates: false
    },
    app: {
      messages: true,
      matches: true,
      updates: true
    }
  });

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: 'photo' | 'banner', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfile(prev => ({ ...prev, [field]: e.target?.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <AnimatedGradient>
        <div className="min-h-screen relative overflow-hidden">
          {/* Banner do Perfil */}
          <div className="h-48 w-full relative">
            <img 
              src={profile.banner} 
              alt="Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="relative z-10 px-4 md:px-8 -mt-16">
            <div className="max-w-6xl mx-auto">
              {/* Cabeçalho */}
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8">
                <div className="flex items-end">
                  <div className="relative">
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover border-4 border-white shadow-lg"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </motion.button>
                  </div>
                  <div className="ml-4 mb-2">
                    <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                    <p className="text-indigo-100">{profile.email}</p>
                    {profile.isPremium && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Premium
                      </span>
                    )}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium shadow-sm mt-4 md:mt-0"
                >
                  Salvar Alterações
                </motion.button>
              </div>

              {/* Abas */}
              <div className="flex space-x-3 overflow-x-auto pb-2 mb-8">
                <SettingsTabButton
                  active={activeTab === 'profile'}
                  onClick={() => setActiveTab('profile')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                >
                  Perfil
                </SettingsTabButton>
                <SettingsTabButton
                  active={activeTab === 'security'}
                  onClick={() => setActiveTab('security')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                >
                  Segurança
                </SettingsTabButton>
                <SettingsTabButton
                  active={activeTab === 'privacy'}
                  onClick={() => setActiveTab('privacy')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  }
                >
                  Privacidade
                </SettingsTabButton>
                <SettingsTabButton
                  active={activeTab === 'notifications'}
                  onClick={() => setActiveTab('notifications')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  }
                >
                  Notificações
                </SettingsTabButton>
                <SettingsTabButton
                  active={activeTab === 'payment'}
                  onClick={() => setActiveTab('payment')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  }
                >
                  Pagamento
                </SettingsTabButton>
              </div>

              {/* Conteúdo das Abas */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-6 md:p-8"
                  >
                    {/* Aba Perfil */}
                    {activeTab === 'profile' && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Editar Perfil</h2>
                        
                        <FileUpload 
                          label="Foto do Perfil" 
                          onFileChange={(file) => handleFileUpload('photo', file)}
                          previewUrl={profile.photo}
                        />
                        
                        <FileUpload 
                          label="Banner do Perfil" 
                          onFileChange={(file) => handleFileUpload('banner', file)}
                          previewUrl={profile.banner}
                          type="banner"
                        />
                        
                        <InputField 
                          label="Nome" 
                          value={profile.name} 
                          onChange={(value) => handleProfileChange('name', value)} 
                        />
                        
                        <InputField 
                          label="Email" 
                          type="email"
                          value={profile.email} 
                          onChange={(value) => handleProfileChange('email', value)} 
                        />
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
                          <textarea
                            value={profile.bio}
                            onChange={(e) => handleProfileChange('bio', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Habilidades</label>
                          <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                              >
                                {skill}
                                <button className="ml-1 text-indigo-500 hover:text-indigo-700">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </motion.div>
                            ))}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Adicionar
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Aba Segurança */}
                    {activeTab === 'security' && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Configurações de Segurança</h2>
                        
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-yellow-700">
                                Sua senha foi atualizada pela última vez em {new Date(profile.lastPasswordUpdate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <InputField 
                          label="Senha Atual" 
                          type="password"
                          value={newPassword.current} 
                          onChange={(value) => setNewPassword(prev => ({ ...prev, current: value }))} 
                          placeholder="Digite sua senha atual"
                        />
                        
                        <InputField 
                          label="Nova Senha" 
                          type="password"
                          value={newPassword.new} 
                          onChange={(value) => setNewPassword(prev => ({ ...prev, new: value }))} 
                          placeholder="Digite sua nova senha"
                        />
                        
                        <InputField 
                          label="Confirmar Nova Senha" 
                          type="password"
                          value={newPassword.confirm} 
                          onChange={(value) => setNewPassword(prev => ({ ...prev, confirm: value }))} 
                          placeholder="Confirme sua nova senha"
                        />
                        
                        <ToggleSwitch 
                          enabled={profile.twoFactorEnabled}
                          onChange={(enabled) => setProfile(prev => ({ ...prev, twoFactorEnabled: enabled }))}
                          label="Autenticação de Dois Fatores (2FA)"
                        />
                        
                        {profile.twoFactorEnabled && (
                          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                  A autenticação de dois fatores está ativada. Use seu aplicativo autenticador para gerar códigos de acesso.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Aba Privacidade */}
                    {activeTab === 'privacy' && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Configurações de Privacidade</h2>
                        
                        <ToggleSwitch 
                          enabled={privacySettings.profileVisible}
                          onChange={(enabled) => setPrivacySettings(prev => ({ ...prev, profileVisible: enabled }))}
                          label="Perfil visível para outros usuários"
                        />
                        
                        <ToggleSwitch 
                          enabled={privacySettings.showSkills}
                          onChange={(enabled) => setPrivacySettings(prev => ({ ...prev, showSkills: enabled }))}
                          label="Mostrar minhas habilidades no perfil"
                        />
                        
                        <ToggleSwitch 
                          enabled={privacySettings.showRatings}
                          onChange={(enabled) => setPrivacySettings(prev => ({ ...prev, showRatings: enabled }))}
                          label="Mostrar avaliações recebidas"
                        />
                        
                        <ToggleSwitch 
                          enabled={privacySettings.showEmail}
                          onChange={(enabled) => setPrivacySettings(prev => ({ ...prev, showEmail: enabled }))}
                          label="Mostrar email no perfil público"
                        />
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Visibilidade do Perfil</label>
                          <div className="space-y-2">
                            {['Público', 'Conectados', 'Privado'].map((option) => (
                              <div key={option} className="flex items-center">
                                <input
                                  id={`visibility-${option}`}
                                  name="visibility"
                                  type="radio"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label htmlFor={`visibility-${option}`} className="ml-3 block text-sm font-medium text-gray-700">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Aba Notificações */}
                    {activeTab === 'notifications' && (
                      <div className="space-y-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Configurações de Notificação</h2>
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 mb-4">Notificações por Email</h3>
                          <div className="space-y-4">
                            <ToggleSwitch 
                              enabled={notificationSettings.email.messages}
                              onChange={(enabled) => setNotificationSettings(prev => ({
                                ...prev,
                                email: { ...prev.email, messages: enabled }
                              }))}
                              label="Novas mensagens"
                            />
                            
                            <ToggleSwitch 
                              enabled={notificationSettings.email.matches}
                              onChange={(enabled) => setNotificationSettings(prev => ({
                                ...prev,
                                email: { ...prev.email, matches: enabled }
                              }))}
                              label="Novos matches"
                            />
                            
                            <ToggleSwitch 
                              enabled={notificationSettings.email.updates}
                              onChange={(enabled) => setNotificationSettings(prev => ({
                                ...prev,
                                email: { ...prev.email, updates: enabled }
                              }))}
                              label="Atualizações e novidades"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 mb-4">Notificações no Aplicativo</h3>
                          <div className="space-y-4">
                            <ToggleSwitch 
                              enabled={notificationSettings.app.messages}
                              onChange={(enabled) => setNotificationSettings(prev => ({
                                ...prev,
                                app: { ...prev.app, messages: enabled }
                              }))}
                              label="Novas mensagens"
                            />
                            
                            <ToggleSwitch 
                              enabled={notificationSettings.app.matches}
                              onChange={(enabled) => setNotificationSettings(prev => ({
                                ...prev,
                                app: { ...prev.app, matches: enabled }
                              }))}
                              label="Novos matches"
                            />
                            
                            <ToggleSwitch 
                              enabled={notificationSettings.app.updates}
                              onChange={(enabled) => setNotificationSettings(prev => ({
                                ...prev,
                                app: { ...prev.app, updates: enabled }
                              }))}
                              label="Atualizações e novidades"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Aba Pagamento */}
                    {activeTab === 'payment' && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Assinatura e Pagamento</h2>
                        
                        <motion.div 
                          whileHover={cardHover}
                          className="border rounded-xl overflow-hidden"
                        >
                          <div className={`p-6 ${profile.isPremium ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-gray-100'}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-bold text-white">{profile.isPremium ? 'Plano Premium' : 'Plano Básico'}</h3>
                                <p className="text-amber-100 mt-1">
                                  {profile.isPremium ? 'Assinatura ativa' : 'Atualize para desbloquear recursos premium'}
                                </p>
                              </div>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-amber-800">
                                {profile.isPremium ? 'Ativo' : 'Grátis'}
                              </span>
                            </div>
                          </div>
                          <div className="bg-white p-6">
                            <ul className="space-y-3">
                              {[
                                'Perfil destacado',
                                'Matches ilimitados',
                                'Mensagens prioritárias',
                                'Estatísticas avançadas',
                                'Suporte 24/7'
                              ].map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <svg
                                    className={`h-5 w-5 flex-shrink-0 ${profile.isPremium ? 'text-amber-500' : 'text-gray-300'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className={`ml-3 ${profile.isPremium ? 'text-gray-800' : 'text-gray-400'}`}>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="mt-6">
                              {profile.isPremium ? (
                                <>
                                  <p className="text-sm text-gray-500 mb-3">Próxima cobrança: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition">
                                    Gerenciar Assinatura
                                  </button>
                                  <button 
                                    className="w-full mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
                                    onClick={() => setProfile(prev => ({ ...prev, isPremium: false }))}
                                  >
                                    Cancelar Assinatura
                                  </button>
                                </>
                              ) : (
                                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2 px-4 rounded-lg font-medium shadow-md transition">
                                  Assinar Plano Premium - R$29,90/mês
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                        
                        {profile.isPremium && (
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-3">Método de Pagamento</h3>
                            <div className="border rounded-xl p-4 bg-gray-50">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <img className="h-8 w-8" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" />
                                </div>
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-800">Visa terminando em 4242</p>
                                  <p className="text-sm text-gray-500">Expira em 12/24</p>
                                </div>
                                <div className="ml-auto">
                                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                    Alterar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </AnimatedGradient>
    </>
  );
};

export default SettingsPage;