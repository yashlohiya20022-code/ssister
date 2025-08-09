import React, { useEffect, useState, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const EndingPage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const motionRef = useRef<HTMLDivElement>(null);

  // Single simple message
  const message = "Thank you for being the most amazing sister in the world! May our bond continue to grow stronger with each passing year n tum aise hi meree sir pe chadke tandav karti raho.";

  useEffect(() => {
    // Create splash effects
    createSplashEffects();
    
    // Start showing messages
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (motionRef.current) {
        motionRef.current.innerHTML = '';
      }
    };
  }, []);

  const createSplashEffects = () => {
    if (!motionRef.current) return;

    // Clear any existing elements
    motionRef.current.innerHTML = '';

    // Create gentle splash circles
    createGentleSplashCircles();
  };

  const createGentleSplashCircles = () => {
    const screenDiagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
    
    // Soft, minimalist splash circles
    const splashConfig = [
      { 
        x: window.innerWidth * 0.15, 
        y: window.innerHeight * 0.25, 
        color: 'rgba(167, 139, 250, 0.03)', // Soft purple
        maxSize: screenDiagonal * 1.2,
        duration: 8
      },
      { 
        x: window.innerWidth * 0.85, 
        y: window.innerHeight * 0.75, 
        color: 'rgba(236, 72, 153, 0.02)', // Soft pink
        maxSize: screenDiagonal * 1.4,
        duration: 10
      },
      { 
        x: window.innerWidth * 0.5, 
        y: window.innerHeight * 0.1, 
        color: 'rgba(129, 140, 248, 0.025)', // Soft blue
        maxSize: screenDiagonal * 1.3,
        duration: 9
      },
      { 
        x: window.innerWidth * 0.3, 
        y: window.innerHeight * 0.8, 
        color: 'rgba(110, 231, 183, 0.02)', // Soft green
        maxSize: screenDiagonal * 1.5,
        duration: 11
      },
      { 
        x: window.innerWidth * 0.7, 
        y: window.innerHeight * 0.3, 
        color: 'rgba(251, 191, 36, 0.015)', // Soft yellow
        maxSize: screenDiagonal * 1.1,
        duration: 7
      }
    ];

    splashConfig.forEach((config, index) => {
      const circle = document.createElement('div');
      circle.className = 'absolute pointer-events-none';
      
      circle.style.width = '80px';
      circle.style.height = '80px';
      circle.style.backgroundColor = config.color;
      circle.style.borderRadius = '50%';
      circle.style.left = (config.x - 40) + 'px';
      circle.style.top = (config.y - 40) + 'px';
      circle.style.filter = 'blur(4px)';
      
      motionRef.current?.appendChild(circle);
      
      // Initial setup
      gsap.set(circle, { opacity: 0, scale: 0 });
      
      // Very slow, gentle splash effect
      const splashTl = gsap.timeline({ 
        repeat: -1, 
        delay: index * 2
      });
      
      splashTl
        .to(circle, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power1.out"
        })
        .to(circle, {
          scale: config.maxSize / 80,
          opacity: 0,
          duration: config.duration,
          ease: "power1.out"
        })
        .to(circle, {
          scale: 0,
          duration: 0.1
        });

      // Gentle floating motion
      gsap.to(circle, {
        x: `+=${Math.random() * 40 - 20}`,
        y: `+=${Math.random() * 40 - 20}`,
        duration: 6 + (index * 1),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 2
      });
    });
  };

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, #fdfbf7 0%, #f9f7f4 25%, #f5f3f0 50%, #f1efec 75%, #ede8e0 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Gentle Splash Effects Background */}
      <div ref={motionRef} className="absolute inset-0 pointer-events-none z-0"></div>

      {/* Properly Animated Floating Balloons */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => {
          const randomDelay = Math.random() * 10;
          const randomDuration = 20 + Math.random() * 15;
          const randomX = 5 + Math.random() * 90;
          
          return (
            <motion.div
              key={`balloon-${i}`}
              className="absolute"
              style={{
                left: `${randomX}%`,
              }}
              initial={{
                y: window.innerHeight + 100,
                x: 0,
                rotate: 0
              }}
              animate={{
                y: -200,
                x: [0, Math.sin(i * 1.5) * 80, Math.cos(i * 1.2) * 60, 0],
                rotate: [0, 10, -10, 5, 0]
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "linear",
                x: {
                  duration: randomDuration,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <div className="relative">
                {/* Balloon */}
                <div
                  className="w-8 h-10 rounded-full opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${
                      i % 5 === 0 ? '#fbbf24' : 
                      i % 5 === 1 ? '#f472b6' : 
                      i % 5 === 2 ? '#a78bfa' : 
                      i % 5 === 3 ? '#34d399' : '#60a5fa'
                    } 0%, ${
                      i % 5 === 0 ? '#f59e0b' : 
                      i % 5 === 1 ? '#ec4899' : 
                      i % 5 === 2 ? '#8b5cf6' : 
                      i % 5 === 3 ? '#10b981' : '#3b82f6'
                    } 100%)`,
                    boxShadow: `0 4px 12px ${
                      i % 5 === 0 ? '#fbbf2420' : 
                      i % 5 === 1 ? '#f472b620' : 
                      i % 5 === 2 ? '#a78bfa20' : 
                      i % 5 === 3 ? '#34d39920' : '#60a5fa20'
                    }`,
                    filter: 'blur(0.5px)'
                  }}
                />
                {/* String */}
                <div 
                  className="w-0.5 h-12 bg-gray-400 mx-auto opacity-30"
                  style={{ marginTop: '2px' }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#d4a574' : i % 3 === 1 ? '#c4956c' : '#b8956a'
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Single Vintage Message Card */}
        <div className="space-y-8">
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="text-center"
              >
                <div 
                  className="max-w-4xl mx-auto p-12 md:p-16 relative"
                  style={{
                    background: `
                      linear-gradient(145deg, #faf8f5 0%, #f5f2ee 100%),
                      radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.02) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.02) 0%, transparent 50%)
                    `,
                    borderRadius: '24px',
                    border: '2px solid rgba(139, 69, 19, 0.1)',
                    boxShadow: `
                      0 25px 50px rgba(139, 69, 19, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.8),
                      inset 0 -1px 0 rgba(139, 69, 19, 0.05)
                    `,
                    transform: 'perspective(1000px) rotateX(2deg)',
                    position: 'relative'
                  }}
                >
                  {/* Vintage paper texture overlay */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.03) 1px, transparent 1px),
                        radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.02) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px, 25px 25px'
                    }}
                  />
                  
                  {/* Vintage corners */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-amber-800 opacity-20 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-amber-800 opacity-20 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-amber-800 opacity-20 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-amber-800 opacity-20 rounded-br-lg" />

                  {/* Vintage header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent opacity-30" />
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="text-amber-700 opacity-60" size={16} />
                      </motion.div>
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent opacity-30" />
                    </div>
                    
                    <motion.h2 
                      className="text-2xl md:text-3xl font-bold text-amber-900 mb-4"
                      style={{ 
                        fontFamily: 'Dancing Script, cursive',
                        textShadow: '0 2px 4px rgba(139, 69, 19, 0.1)'
                      }}
                      animate={{
                        textShadow: [
                          '0 2px 4px rgba(139, 69, 19, 0.1)',
                          '0 4px 8px rgba(139, 69, 19, 0.15)',
                          '0 2px 4px rgba(139, 69, 19, 0.1)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      A Message From Your Brother
                    </motion.h2>
                  </div>

                  {/* Single Main Message */}
                  <div className="relative mb-8">
                    <motion.p 
                      className="text-xl md:text-2xl leading-relaxed text-amber-900 font-medium"
                      style={{ 
                        fontFamily: 'serif',
                        lineHeight: '1.8',
                        textShadow: '0 1px 2px rgba(139, 69, 19, 0.05)'
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      {message}
                    </motion.p>
                  </div>

                  {/* Vintage signature */}
                  <motion.div 
                    className="text-right"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <div className="flex items-center justify-end gap-3 mb-4">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-800 opacity-30" />
                      <Heart className="text-rose-600 opacity-70" size={12} fill="currentColor" />
                      <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-800 opacity-30" />
                    </div>
                    
                    <p 
                      className="text-lg md:text-xl font-medium text-amber-800 mb-2"
                      style={{ 
                        fontFamily: 'serif',
                        fontStyle: 'italic'
                      }}
                    >
                      With endless love and warm wishes,
                    </p>
                    
                    <motion.p
                      className="text-xl md:text-2xl font-bold text-amber-900"
                      style={{
                        fontFamily: 'Dancing Script, cursive',
                        transform: 'rotate(-1deg)',
                        textShadow: '0 2px 4px rgba(139, 69, 19, 0.1)'
                      }}
                      animate={{ 
                        rotate: [-1, 1, -1],
                        textShadow: [
                          '0 2px 4px rgba(139, 69, 19, 0.1)',
                          '0 4px 8px rgba(139, 69, 19, 0.2)',
                          '0 2px 4px rgba(139, 69, 19, 0.1)'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      Your Loving Brother Yash❤️
                    </motion.p>
                  </motion.div>

                  {/* Vintage decorative elements */}
                  <div className="absolute top-1/2 left-6 transform -translate-y-1/2 opacity-10">
                    <div className="w-8 h-8 border-2 border-amber-800 rounded-full" />
                  </div>
                  <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-10">
                    <div className="w-6 h-6 border-2 border-amber-800 rounded-full" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default EndingPage;