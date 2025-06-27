import React from 'react';
import Image from 'next/image';

const StickyGlowingLogo = () => {
  return (
    <div className="fixed bottom-0 w-full z-40 pointer-events-none flex justify-center items-end" style={{ minHeight: '80px' }}>
      <div className="flex justify-center items-center mb-2">
        <Image 
          src="/assets/bkinclogo.png"
          alt="BKINC Logo" 
          width={128}
          height={128}
          className="w-32 h-auto"
        />
      </div>
    </div>
  );
};

export default StickyGlowingLogo; 