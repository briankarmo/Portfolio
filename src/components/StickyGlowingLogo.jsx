import React from 'react';
import { motion } from 'framer-motion';

const StickyGlowingLogo = () => {
  return (
    <div className="fixed bottom-0 w-full z-40 pointer-events-none flex justify-center items-end" style={{ minHeight: '80px' }}>
      <div className="relative flex justify-center items-center">
        <img 
          src="/assets/bkinclogo.png"
          alt="BKINC Logo Sticky" 
          width="128"
          height="128"
          className="w-32 h-auto relative z-10"
        />
      </div>
    </div>
  );
};

export default StickyGlowingLogo; 