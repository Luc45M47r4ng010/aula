'use client'

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animação suave de pulso com easing melhorado
const smoothPulse = keyframes`
  0% { 
    transform: scale(1); 
    opacity: 0.9;
    filter: brightness(1) drop-shadow(0 0 0px rgba(255, 255, 255, 0));
  }
  50% { 
    transform: scale(1.15);
    opacity: 1;
    filter: brightness(1.2) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  }
  100% { 
    transform: scale(1);
    opacity: 0.9;
    filter: brightness(1) drop-shadow(0 0 0px rgba(255, 255, 255, 0));
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 20;
  position: relative;
`;

const Letter = styled.span<{ $delay: number }>`
  display: inline-block;
  animation: ${smoothPulse} 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation-delay: ${props => props.$delay}s;
  will-change: transform, filter, opacity;
  transform-origin: center bottom;
  
  &:nth-child(1) { color: #8b5cf6; } /* S */
  &:nth-child(2) { color: #7c3aed; } /* k */
  &:nth-child(3) { color: #6d28d9; } /* i */
  &:nth-child(4) { color: #5b21b6; } /* l */
  &:nth-child(5) { color: #4f46e5; } /* l */
  &:nth-child(6) { color: #6366f1; } /* S */
  &:nth-child(7) { color: #818cf8; } /* w */
  &:nth-child(8) { color: #a5b4fc; } /* a */
  &:nth-child(9) { color: #c7d2fe; } /* p */
`;

interface SkillSwapLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: '1.5rem',
  md: '2.5rem',
  lg: '3.5rem'
};

const SkillSwapLogo: React.FC<SkillSwapLogoProps> = ({ size = 'md', className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const logoText = 'SkillSwap';
  // Atrasos mais espaçados para evitar sobreposição de animações
  const delays = [0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <LogoContainer className={className} style={{ fontSize: sizeMap[size] }}>
        {logoText}
      </LogoContainer>
    );
  }

  return (
    <LogoContainer className={className} style={{ fontSize: sizeMap[size] }}>
      {Array.from(logoText).map((letter, index) => (
        <Letter key={index} $delay={delays[index % delays.length]}>
          {letter}
        </Letter>
      ))}
    </LogoContainer>
  );
};

export default SkillSwapLogo;