import React from 'react';
import { motion } from 'framer-motion';

const GlowingLogo = () => {
  return (
    <motion.div
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative group flex justify-center items-center">
        {/* Glow effects */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-[-30px] bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-[-15px] bg-cyan-500/20 rounded-full blur-2xl"></div>
        </div>
        
        {/* Logo */}
        <img 
          src="/assets/bkinclogo.png"
          alt="BKINC Logo" 
          width="112"
          height="112"
          className="w-28 h-auto relative z-10 transition-all duration-500 
                   group-hover:brightness-125 group-hover:contrast-125
                   filter drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]"
        />
      </div>
    </motion.div>
  );
};

export default GlowingLogo; 