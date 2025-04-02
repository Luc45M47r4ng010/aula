'use client'

import React, { useState, useEffect, useRef } from 'react'
import SkillSwapLogo from '@components/header'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const particlesContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Particle animation effect
  useEffect(() => {
    const particles: HTMLDivElement[] = []
    const colors = ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4f46e5']
    
    if (!particlesContainerRef.current) return

    // Create 15 floating particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full opacity-20'
      particle.style.width = `${Math.random() * 10 + 5}px`
      particle.style.height = particle.style.width
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`
      particle.style.animationDelay = `${Math.random() * 5}s`
      
      particlesContainerRef.current.appendChild(particle)
      particles.push(particle)
    }

    // Cleanup function
    return () => particles.forEach(p => p.remove())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email
    if (!email) {
      setError('Por favor, insira seu e-mail')
      return
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Por favor, insira um e-mail válido')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError('Ocorreu um erro. Por favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = () => {
    setSuccess(false)
    setEmail('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-purple-900 via-violet-800 to-fuchsia-700">
      {/* Background effects */}
      <div ref={particlesContainerRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-radial-gradient from-purple-500/10 via-transparent to-transparent opacity-30" />

      {/* Main card */}
      <div className="w-full max-w-md z-10">
        {/* Logo with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-center"
        >
          <SkillSwapLogo size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 rounded-2xl shadow-2xl p-8 backdrop-blur-lg border border-white/20"
        >
          {/* Title with gradient text */}
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-fuchsia-500"
          >
            Recuperar Senha
          </motion.h2>

          {/* Instruction text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-center mb-6"
          >
            {success 
              ? "Verifique sua caixa de entrada para redefinir sua senha" 
              : "Digite seu e-mail para receber o link de recuperação"}
          </motion.p>

          {/* Error/Success messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 bg-red-100/90 text-red-700 rounded-lg text-sm border border-red-200"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 bg-green-100/90 text-green-700 rounded-lg text-sm border border-green-200"
              >
                ✔️ E-mail enviado com sucesso! Verifique sua caixa de entrada.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form - only shows if not successful */}
          {!success && (
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300/90 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                    placeholder="seu@email.com"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all ${
                    isLoading ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    'Enviar Link de Recuperação'
                  )}
                </button>
              </motion.div>
            </motion.form>
          )}

          {/* Additional options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center text-sm text-gray-500"
          >
            {success ? (
              <button 
                onClick={handleResend}
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
              >
                ↻ Reenviar e-mail
              </button>
            ) : (
              <Link 
                href="/login" 
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
              >
                ← Voltar para o login
              </Link>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-4 text-center"
          >
            <Link 
              href="/register" 
              className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              Não tem uma conta? <span className="text-purple-600">Cadastre-se</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
          50% { transform: translateY(0px) translateX(-10px) rotate(0deg); }
          75% { transform: translateY(-10px) translateX(0px) rotate(-5deg); }
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle at 20% 30%, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to));
        }
      `}</style>
    </div>
  )
}

export default ForgotPasswordPage