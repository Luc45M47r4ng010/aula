'use client'

import React, { useEffect, useState } from 'react'
import StarButton from "../components/StarButton"
import SkillSwapLogo from "../components/header"
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

const HomePage = () => {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <Head>
        <title>Compartilhe Conhecimento | SkillSwap</title>
        <meta name="description" content="Aprenda e ensine em uma comunidade colaborativa" />
      </Head>

      {/* Container principal */}
      <div className="min-h-screen flex flex-col items-center p-4 relative overflow-hidden">
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-fuchsia-700 opacity-90 animate-gradient-x" />
        </div>

        {/* Conteúdo (renderizado condicionalmente após montagem) */}
        {isMounted && (
          <>
            {/* Logo */}
            <div className="w-full flex justify-center pt-6 z-20">
              <SkillSwapLogo size="lg" />
            </div>

            {/* Card principal */}
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10 max-w-4xl w-full mx-auto text-center p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl backdrop-blur-sm"
            >
              <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
                Conhecimento Compartilhado
              </h1>
              
              <div className="mb-10 space-y-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-700 hover:text-purple-800 transition-colors"
                >
                  Imagine um mundo onde cada pessoa pode ensinar algo único e aprender algo novo todos os dias.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-gray-600 hover:text-violet-800 transition-colors"
                >
                  Aqui, você encontra a oportunidade de compartilhar seu conhecimento com quem não sabe, 
                  enquanto aprende com quem domina habilidades que você ainda não possui.
                </motion.p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <StarButton text="Quero Aprender" />
              </div>

              {/* Link "Saiba mais" com animação segura */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
              >
                <Link 
                  href="/about-us" 
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors group font-medium"
                >
                  <span className="mr-2">Conheça mais sobre nosso propósito</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                    animate={{ 
                      x: [0, 4, 0],
                      transition: {
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                      } 
                    }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </Link>
              </motion.div>
            </motion.main>

            <footer className="z-10 mt-12 text-white text-opacity-80">
              <p className="text-sm sm:text-base">
                Juntos, podemos construir uma rede de conhecimento sem limites.
              </p>
            </footer>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 12s ease infinite;
        }
      `}</style>
    </>
  )
}

export default HomePage