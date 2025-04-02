'use client'

import React, { useEffect, useRef, useState } from 'react'
import SkillSwapLogo from '@components/header'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  // Efeito de scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacityBg = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Dados premium
  const features = [
    {
      title: "Troca Inteligente",
      description: "Algoritmo que conecta habilidades complementares",
      icon: "🧠",
      color: "from-indigo-500 to-purple-600"
    },
    {
      title: "Aprendizado em Rede",
      description: "Estrutura em cadeia onde cada um ensina e aprende",
      icon: "🕸️",
      color: "from-purple-600 to-fuchsia-600"
    },
    {
      title: "Gamificação",
      description: "Sistema de conquistas e progressão",
      icon: "🎮",
      color: "from-fuchsia-600 to-pink-600"
    },
    {
      title: "Comunidade Global",
      description: "Conexões sem fronteiras geográficas",
      icon: "🌍",
      color: "from-pink-600 to-rose-600"
    }
  ]

  // Efeito de partículas interativas
  useEffect(() => {
    const particles: HTMLDivElement[] = []
    const colors = ['#8b5cf6', '#7c3aed', '#6d28d9', '#4f46e5']
    
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      particles.forEach(particle => {
        const { left, top, width, height } = container.getBoundingClientRect()
        const x = e.clientX - left
        const y = e.clientY - top
        const distance = Math.sqrt(
          Math.pow(x - parseFloat(particle.style.left), 2) + 
          Math.pow(y - parseFloat(particle.style.top), 2)
        )
        
        if (distance < 150) {
          const angle = Math.atan2(
            y - parseFloat(particle.style.top),
            x - parseFloat(particle.style.left)
          )
          const newX = parseFloat(particle.style.left) - Math.cos(angle) * 5
          const newY = parseFloat(particle.style.top) - Math.sin(angle) * 5
          
          particle.style.transform = `translate(${newX}px, ${newY}px)`
        }
      })
    }

    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full opacity-20 pointer-events-none'
      particle.style.width = `${Math.random() * 12 + 6}px`
      particle.style.height = particle.style.width
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.transition = 'transform 0.3s ease-out'
      particle.style.willChange = 'transform'
      particle.style.animation = `float ${Math.random() * 20 + 10}s linear infinite`
      particle.style.animationDelay = `${Math.random() * 5}s`
      
      container.appendChild(particle)
      particles.push(particle)
    }

    container.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      particles.forEach(p => p.remove())
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-violet-900 to-fuchsia-900"
    >
      {/* Botão de seta para voltar à página inicial */}
      <Link href="/" className="absolute top-6 left-6 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </motion.div>
      </Link>

      {/* Efeito de fundo dinâmico */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 bg-[url('/pattern.svg')] bg-cover opacity-10"
      />

      {/* Luz de destaque */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600 rounded-full filter blur-[100px] opacity-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-fuchsia-600 rounded-full filter blur-[100px] opacity-10" />

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Cabeçalho com efeito de texto brilhante */}
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center mb-8"
          >
            <SkillSwapLogo/>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300">
              Revolucionando
            </span> a troca de conhecimentos
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed"
          >
            Uma plataforma onde cada habilidade compartilhada cria uma rede de aprendizado contínuo e colaborativo
          </motion.p>
        </motion.header>

        {/* Seção de valor com efeito de gradiente flutuante */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative mb-32"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl opacity-20 blur-xl" />
          
          <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/10 overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600 rounded-full filter blur-[80px] opacity-20" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-fuchsia-600 rounded-full filter blur-[80px] opacity-20" />
            
            <motion.div
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300">
                  Nosso Propósito
                </span>
              </h2>
              
              <div className="space-y-6 text-lg text-purple-50">
                <p>
                  No <strong className="text-white">SkillSwap</strong>, transformamos a maneira como as pessoas compartilham conhecimento. 
                  Somos mais que uma plataforma - somos um movimento que acredita no poder das trocas colaborativas.
                </p>
                
                <p>
                  Em um mundo onde o acesso à educação ainda é desigual, criamos um ecossistema onde 
                  <span className="text-white font-medium"> todo conhecimento tem valor</span>, independente de diplomas ou credenciais.
                </p>
                
                <p>
                  Nossa tecnologia conecta não apenas habilidades, mas também paixões e propósitos, criando 
                  relações de aprendizado que transformam vidas.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Cards de features com efeito 3D */}
        <motion.section className="mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300">
              Tecnologia
            </span> que Conecta
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -15,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`relative rounded-2xl p-8 overflow-hidden transition-all duration-300 ${hoveredCard === index ? 'shadow-2xl' : 'shadow-lg'}`}
                style={{
                  background: `linear-gradient(to bottom right, ${hoveredCard === index ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.05)'}, ${hoveredCard === index ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0)'})`,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Efeito de gradiente no hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-500 ${hoveredCard === index ? 'opacity-20' : ''}`} />
                
                <div 
                  className="relative z-10"
                  style={{
                    transform: hoveredCard === index ? 'translateZ(20px)' : 'translateZ(0)',
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-purple-100 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline interativa */}
        <motion.section className="mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300">Jornada</span>
          </motion.h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Linha da timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/30 to-fuchsia-500/30" />
            
            {[
              {
                year: "2023",
                title: "Fundação",
                description: "Ideia inicial e desenvolvimento do conceito"
              },
              {
                year: "2024",
                title: "Lançamento Beta",
                description: "Primeiros 1.000 usuários"
              },
              {
                year: "2025",
                title: "Expansão Global",
                description: "Disponível em 5 idiomas"
              },
              {
                year: "Futuro",
                title: "Visão",
                description: "Revolucionar a educação mundial"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                viewport={{ once: true }}
                className="relative pl-24 pb-16 group"
              >
                {/* Ponto da timeline */}
                <div className="absolute left-0 top-1 w-16 h-16 flex items-center justify-center">
                  <div className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 group-hover:w-6 group-hover:h-6 transition-all" />
                  <div className="absolute w-5 h-5 rounded-full bg-purple-500/20 group-hover:w-8 group-hover:h-8 transition-all" />
                </div>
                
                <div className="text-purple-300 font-mono text-lg mb-1">{item.year}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-purple-100 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Chamada para ação premium */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-transparent" />
          
          <div className="relative z-10 py-20 px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-8"
            >
              Pronto para <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300">se juntar</span> à revolução?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-purple-100 max-w-2xl mx-auto mb-12"
            >
              Milhares de pessoas já estão trocando conhecimento e transformando vidas
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                href="/register"
                className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-medium hover:shadow-2xl transition-all overflow-hidden group"
              >
                <span className="relative z-10">Começar Agora</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <Link
                href="/login"
                className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-medium hover:shadow-2xl transition-all overflow-hidden group"
              >
                <span className="relative z-10">Faça o Login</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Rodapé premium */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
        className="bg-black/30 border-t border-white/10 py-12 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <SkillSwapLogo size="md" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-4">Navegação</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-purple-100 hover:text-white transition">Início</Link></li>
                  <li><Link href="/about" className="text-purple-100 hover:text-white transition">Sobre</Link></li>
                  <li><Link href="/features" className="text-purple-100 hover:text-white transition">Recursos</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="text-purple-100 hover:text-white transition">Privacidade</Link></li>
                  <li><Link href="/terms" className="text-purple-100 hover:text-white transition">Termos</Link></li>
                  <li><Link href="/cookies" className="text-purple-100 hover:text-white transition">Cookies</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-4">Contato</h4>
                <ul className="space-y-2">
                  <li><Link href="mailto:contato@skillswap.com" className="text-purple-100 hover:text-white transition">E-mail</Link></li>
                  <li><Link href="/support" className="text-purple-100 hover:text-white transition">Suporte</Link></li>
                  <li><Link href="/contact" className="text-purple-100 hover:text-white transition">Formulário</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-purple-100/80">
              © {new Date().getFullYear()} SkillSwap. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Estilos globais */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(10px) rotate(3deg); }
          50% { transform: translateY(5px) translateX(-5px) rotate(-2deg); }
          75% { transform: translateY(-10px) translateX(5px) rotate(1deg); }
        }
      `}</style>
    </div>
  )
}

export default AboutPage