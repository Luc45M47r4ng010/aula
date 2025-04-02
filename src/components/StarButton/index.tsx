'use client'

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation';

// Animação das estrelas
const twinkle = keyframes`
  0% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.3; transform: scale(0.8); }
`;

const float = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(-2px, -2px); }
  50% { transform: translate(0, -3px); }
  75% { transform: translate(2px, -2px); }
  100% { transform: translate(0, 0); }
`;

// Efeito de clique
const clickEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const ButtonContainer = styled.button`
  position: relative;
  padding: 12px 28px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(135deg, rgb(44, 75, 119), rgb(61, 123, 137));
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  outline: none;
  z-index: 1;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }
  
  &:active {
    animation: ${clickEffect} 0.3s ease;
  }
`;

const Star = styled.span<{ 
  $size: number; 
  $left: number; 
  $top: number; 
  $delay: number; 
  $duration: number 
}>`
  position: absolute;
  display: block;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  left: ${props => props.$left}%;
  top: ${props => props.$top}%;
  opacity: 0;
  animation: ${twinkle} ${props => props.$duration}s infinite ease-in-out,
             ${float} ${props => props.$duration * 2}s infinite ease-in-out;
  animation-delay: ${props => props.$delay}s;
  filter: blur(${props => props.$size > 1.5 ? '0.5px' : '0px'});
  will-change: transform, opacity;
`;

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  text, 
  onClick, 
  className 
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [stars, setStars] = useState<Array<{
    id: number;
    size: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
  }>>([]);
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push('/login'); // Redireciona para /login se nenhum onClick for fornecido
    }
  };

  useEffect(() => {
    setIsMounted(true);
    // Gerar estrelas apenas no cliente
    setStars(Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: Math.random() * 1.5 + 0.5
    })));
  }, []);

  // Renderização simplificada para SSR
  if (!isMounted) {
    return (
      <ButtonContainer 
        onClick={handleClick} 
        className={className}
        aria-label={text}
      >
        <span style={{ position: 'relative', zIndex: 2 }}>{text}</span>
      </ButtonContainer>
    );
  }

  // Renderização completa no cliente
  return (
    <ButtonContainer 
      onClick={handleClick} 
      className={className}
      aria-label={text}
    >
      {stars.map(star => (
        <Star
          key={`star-${star.id}`}
          $size={star.size}
          $left={star.left}
          $top={star.top}
          $delay={star.delay}
          $duration={star.duration}
        />
      ))}
      <span style={{ position: 'relative', zIndex: 2 }}>{text}</span>
    </ButtonContainer>
  );
};

export default AnimatedButton;