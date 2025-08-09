import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { useMusic } from '../context/MusicContext';

// Custom Rakhi Icon Component
const RakhiIcon = ({ className, ...props }) => (
  <svg
    className={className}
    {...props}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Rakhi Icon"
  >
    <line x1="0" y1="50" x2="35" y2="50" stroke="#e1ad01" strokeWidth="4" strokeLinecap="round" />
    <line x1="65" y1="50" x2="100" y2="50" stroke="#e1ad01" strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="50" r="18" fill="#c87f85" />
    <circle cx="50" cy="50" r="12" fill="none" stroke="#e1ad01" strokeWidth="3" />
    <circle cx="50" cy="50" r="6" fill="#fff0f5" />
  </svg>
);

const EnvelopePage = ({ onNext }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const motionRef = useRef<HTMLDivElement>(null);
  const { startMusic } = useMusic();

  useEffect(() => {
    // Create dynamic motion graphics on component mount
    createDynamicMotionGraphics();
    
    // Cleanup on unmount
    return () => {
      if (motionRef.current) {
        motionRef.current.innerHTML = '';
      }
    };
  }, []);

  const createDynamicMotionGraphics = () => {
    if (!motionRef.current) return;

    // Clear any existing elements first
    motionRef.current.innerHTML = '';

    // Reduce the number of splash circles for better performance
    createContinuousSplashCircles();
  };

  const createContinuousSplashCircles = () => {
    // Calculate screen diagonal for full coverage
    const screenDiagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
    
    // Reduced splash circles for better performance
    const splashConfig = [
      { 
        x: window.innerWidth * 0.2, 
        y: window.innerHeight * 0.3, 
        color: 'rgba(255, 107, 157, 0.05)',
        maxSize: screenDiagonal * 1.0,
        duration: 4
      },
      { 
        x: window.innerWidth * 0.8, 
        y: window.innerHeight * 0.7, 
        color: 'rgba(255, 217, 61, 0.05)',
        maxSize: screenDiagonal * 1.1,
        duration: 4.5
      },
      { 
        x: window.innerWidth * 0.5, 
        y: window.innerHeight * 0.1, 
        color: 'rgba(139, 69, 19, 0.04)',
        maxSize: screenDiagonal * 1.05,
        duration: 4.2
      },
      { 
        x: window.innerWidth * 0.3, 
        y: window.innerHeight * 0.8, 
        color: 'rgba(212, 175, 55, 0.04)',
        maxSize: screenDiagonal * 1.15,
        duration: 4.8
      }
    ];

    splashConfig.forEach((config, index) => {
      const circle = document.createElement('div');
      circle.className = 'absolute pointer-events-none';
      
      circle.style.width = '40px';
      circle.style.height = '40px';
      circle.style.backgroundColor = config.color;
      circle.style.borderRadius = '50%';
      circle.style.left = (config.x - 20) + 'px';
      circle.style.top = (config.y - 20) + 'px';
      circle.style.filter = 'blur(2px)';
      circle.style.willChange = 'transform, opacity'; // GPU acceleration
      
      motionRef.current?.appendChild(circle);
      
      // Initial setup
      gsap.set(circle, { opacity: 0, scale: 0 });
      
      // Simplified splash effect
      const splashTl = gsap.timeline({ 
        repeat: -1, 
        delay: (index * 1) // Increased delay for less overlap
      });
      
      splashTl
        .to(circle, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(circle, {
          scale: config.maxSize / 40,
          opacity: 0,
          duration: config.duration,
          ease: "power1.out"
        })
        .set(circle, { scale: 0 });
    });
  };

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    
    setIsOpening(true);
    
    // Start music when envelope opens
    startMusic();
    
    // Show letter after flap opens
    setTimeout(() => {
      setShowLetter(true);
    }, 800);
    
    // Complete animation and move to next page
    setTimeout(() => {
      setIsComplete(true);
      setTimeout(onNext, 1200);
    }, 2800);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#fdf6e3' }}
    >
      {/* Motion Graphics Background with Continuous Splash Effects */}
      <div ref={motionRef} className="absolute inset-0 pointer-events-none z-0"></div>

      {/* Simplified floating particles for better performance */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              willChange: 'transform'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Title - Remove text shadow animation */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -50 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ 
              fontFamily: 'Dancing Script, cursive',
              color: '#a52a2a',
              textShadow: '0 0 20px rgba(255, 107, 157, 0.3)'
            }}
          >
            Happy Raksha Bandhan
          </h1>
          <motion.p
            className="text-2xl text-amber-800/80"
            style={{ fontFamily: 'Garamond, serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            To my Dearest Sister💕
          </motion.p>
        </motion.div>

        {/* Envelope Container */}
        <div 
          className="relative cursor-pointer"
          onClick={handleOpenEnvelope}
          style={{
            filter: isOpening ? "none" : "drop-shadow(0 10px 30px rgba(139, 69, 19, 0.2))",
            transform: "scale(1)",
            transition: "transform 0.3s ease-out"
          }}
          onMouseEnter={(e) => {
            if (!isOpening) {
              e.currentTarget.style.transform = "scale(1.02)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isOpening) {
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
        >
          {/* Envelope Body */}
          <motion.div
            className="relative w-80 h-56 mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            <div 
              className="w-full h-full rounded-lg shadow-2xl border-2 border-amber-800/10 relative overflow-hidden flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(145deg, #f7f2e9 0%, #ede4d3 100%)',
                boxShadow: '0 10px 30px rgba(139, 69, 19, 0.1)'
              }}
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-transparent rounded-lg"></div>
            </div>

            {/* Envelope Flap */}
            <motion.div
              className="absolute top-0 left-0 w-full h-32 shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #e6b4b8 0%, #d89a9e 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transformOrigin: 'bottom center',
                zIndex: 10,
                boxShadow: isOpening 
                  ? '0 20px 40px rgba(214, 154, 158, 0.4)'
                  : '0 10px 20px rgba(214, 154, 158, 0.2)'
              }}
              animate={{
                rotateX: isOpening ? -150 : 0,
                y: isOpening ? -10 : 0,
              }}
              transition={{ 
                duration: 1, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
            
            {/* Rakhi on top */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ 
                zIndex: 11,
                opacity: isOpening ? 0 : 1,
                transform: isOpening ? 'scale(0.8)' : 'scale(1)',
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
              }}
            >
              <RakhiIcon className="w-24 h-24" />
            </div>

            {/* Letter inside envelope */}
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  className="absolute top-8 left-4 w-72 h-44 bg-rose-50 rounded shadow-xl border border-gray-200 p-4"
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  animate={{ y: -30, opacity: 1, scale: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ zIndex: 5, fontFamily: 'Garamond, serif' }}
                >
                  <div className="text-center mb-4">
                    <div className="flex justify-center items-center gap-2 mb-2">
                      <div className="w-8 h-px bg-rose-800/20"></div>
                      <Heart className="text-rose-400" size={12} fill="currentColor" />
                      <div className="w-8 h-px bg-rose-800/20"></div>
                    </div>
                    <div className="text-sm text-rose-900/70 font-medium">A Letter From Your Brother</div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="w-full h-1.5 bg-gray-300/70 rounded"></div>
                    <div className="w-5/6 h-1.5 bg-gray-300/70 rounded"></div>
                    <div className="w-4/5 h-1.5 bg-gray-300/70 rounded"></div>
                    <div className="w-3/4 h-1.5 bg-gray-300/70 rounded"></div>
                  </div>
                  <div className="text-center mt-4">
                    <Heart className="mx-auto text-rose-400 animate-pulse" size={16} fill="currentColor" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Instructions Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpening ? 0 : 1 }}
          transition={{ duration: 0.5, delay: isOpening ? 0 : 1.8 }}
        >
          <div
            className="inline-block bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-amber-200/30"
            style={{
              boxShadow: '0 8px 25px rgba(139, 69, 19, 0.1)'
            }}
          >
            <p className="text-amber-900/80 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
              👆 Click to open your surprise
            </p>
          </div>
        </motion.div>

        {/* Enhanced Floating Hearts/Sparkles Animation */}
        <AnimatePresence>
          {isOpening && (
            <>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 600,
                    y: -250 - Math.random() * 200,
                    scale: 1,
                    opacity: [0, 1, 0.8, 0],
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: 3,
                    delay: i * 0.1 + 0.3,
                    ease: "easeOut"
                  }}
                  style={{ left: '50%', top: '50%' }}
                >
                  <Heart 
                    className={i % 3 === 0 ? 'text-rose-400' : i % 3 === 1 ? 'text-amber-400' : 'text-pink-300'}
                    size={8 + Math.random() * 12} 
                    fill="currentColor" 
                  />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Page transition overlay */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="fixed inset-0 z-50"
            style={{
              background: '#FDF6E3' // Match LetterPage background
            }}
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnvelopePage;