import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';

interface LetterPageProps {
  onNext: () => void;
}

const LetterPage: React.FC<LetterPageProps> = ({ onNext }) => {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [completedParagraphs, setCompletedParagraphs] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [allTypingComplete, setAllTypingComplete] = useState(false);

  const messages = [
    "My Dearest Sister,",
    "You light up my world with your smile and love. Having you in my life is a true blessing u dont know what you mean to me or tu mere liye kiti khas h bus yahi khaunga ki tu bhot achi h hamesha mera sath diya mujhe samjhaya mujhe pyaar diya n i wish aise hi pyaar hope tu mujhe dete rahe.",
    "This Raksha Bandhan, I promise, no distance or challenge will ever break our bond i will protect you till my last breath."
  ];

  const typeMessage = (paragraphIndex: number) => {
    if (paragraphIndex >= messages.length) {
      setAllTypingComplete(true);
      // Show signature immediately after typing completes
      setTimeout(() => {
        setShowNext(true);
      }, 300);
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    const message = messages[paragraphIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= message.length) {
        setDisplayedText(message.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        // Add to completed paragraphs and clear displayed text
        setCompletedParagraphs(prev => [...prev, message]);
        setDisplayedText('');

        const nextIndex = paragraphIndex + 1;
        setCurrentParagraph(nextIndex);

        // Start typing next message with short delay
        setTimeout(() => {
          if (nextIndex < messages.length) {
            typeMessage(nextIndex);
          } else {
            setAllTypingComplete(true);
            // Show signature immediately after typing completes
            setTimeout(() => {
              setShowNext(true);
            }, 300);
          }
        }, 500); // Slightly longer delay between paragraphs for better readability
      }
    }, 50); // Slightly slower typing for better readability
  };

  useEffect(() => {
    // Start typing the first message after animations begin
    const startTyping = setTimeout(() => {
      typeMessage(0);
    }, 1500); // Delay to let fade-in animations complete

    return () => clearTimeout(startTyping);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-6"
      style={{ 
        background: '#FDF6E3',
        minHeight: '100vh'
      }}
    >
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* Letter Paper */}
        <div className="relative">
          {/* Paper Shadow */}
          <motion.div
            className="absolute inset-0 transform translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 rounded-lg"
            style={{ background: 'rgba(139, 69, 19, 0.2)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />

          {/* Main Paper */}
          <motion.div
            className="relative bg-white rounded-lg overflow-hidden"
            style={{
              background: `
                linear-gradient(90deg, transparent 0%, transparent 30px, #E5E7EB 30px, #E5E7EB 32px, transparent 32px),
                linear-gradient(0deg, transparent 0%, transparent 24px, #F3F4F6 24px, #F3F4F6 26px, transparent 26px),
                #FFFBF0
              `,
              backgroundSize: '100% 26px, 100% 26px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
            initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {/* Paper holes - Hidden on mobile */}
            <div className="hidden md:flex absolute left-4 lg:left-6 top-0 bottom-0 flex-col justify-start pt-12 lg:pt-16 space-y-6 lg:space-y-8">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-gray-200 border border-gray-300"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.7 + (i * 0.05), 
                    ease: "backOut" 
                  }}
                />
              ))}
            </div>

            {/* Letter Content */}
            <div className="pl-6 pr-4 py-8 md:pl-16 lg:pl-20 md:pr-8 lg:pr-12 md:py-12 lg:py-16">
              {/* Letter Header */}
              <motion.div
                className="text-center mb-8 md:mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <div className="flex justify-center items-center gap-2 md:gap-4 mb-4 md:mb-6">
                  <motion.div 
                    className="w-8 md:w-16 h-0.5 bg-gray-400"
                    initial={{ width: 0 }}
                    animate={{ width: 'auto' }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.4, type: "spring" }}
                  >
                    <Heart className="text-pink-500" size={16} fill="currentColor" />
                  </motion.div>
                  <motion.div 
                    className="w-8 md:w-16 h-0.5 bg-gray-400"
                    initial={{ width: 0 }}
                    animate={{ width: 'auto' }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  />
                </div>
                <motion.h2
                  className="text-xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4"
                  style={{ fontFamily: 'serif' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  A Letter from your brother
                </motion.h2>
              </motion.div>

              {/* Letter Body */}
              <motion.div 
                className={`space-y-4 md:space-y-6 ${allTypingComplete ? 'mb-6' : 'min-h-60 md:min-h-80'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                {/* Completed paragraphs - NO fade in animation */}
                {completedParagraphs.map((paragraph, index) => (
                  <div
                    key={index}
                    className={`text-base md:text-lg leading-relaxed text-gray-800 ${
                      index === 0 ? 'text-lg md:text-2xl font-semibold text-center mb-6' : ''
                    }`}
                    style={{
                      fontFamily: 'serif',
                      textIndent: index === 0 ? '0' : '1em'
                    }}
                  >
                    {paragraph}
                  </div>
                ))}

                {/* Currently typing paragraph - only show if not completed */}
                {displayedText && !allTypingComplete && (
                  <div
                    className={`text-base md:text-lg leading-relaxed text-gray-800 ${
                      currentParagraph === 0 ? 'text-lg md:text-2xl font-semibold text-center mb-6' : ''
                    }`}
                    style={{
                      fontFamily: 'serif',
                      textIndent: currentParagraph === 0 ? '0' : '1em'
                    }}
                  >
                    {displayedText}
                    {isTyping && (
                      <motion.span 
                        className="inline-block w-0.5 h-4 md:h-6 bg-purple-500 ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                )}
              </motion.div>

              {/* Letter Signature */}
              <AnimatePresence>
                {showNext && (
                  <motion.div
                    className="text-right"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="space-y-2 md:space-y-3">
                      <motion.p
                        className="text-sm md:text-lg text-gray-700"
                        style={{ fontFamily: 'serif' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        With endless love and warm wishes,
                      </motion.p>
                      <div className="relative">
                        <motion.p
                          className="text-lg md:text-2xl font-bold text-gray-800"
                          style={{
                            fontFamily: 'serif',
                            transform: 'rotate(-1deg)'
                          }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                        >
                          Your Loving Brother Yash❤️
                        </motion.p>
                      </div>

                      {/* Decorative elements */}
                      <motion.div 
                        className="flex justify-end items-center gap-2 md:gap-3 mt-3 md:mt-4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                      >
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-red-500 rounded-full border-2 border-yellow-400 
                                      flex items-center justify-center shadow-md transform rotate-12">
                          <Heart className="text-yellow-200" size={10} fill="currentColor" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative doodles */}
              <motion.div 
                className="absolute top-6 md:top-8 right-6 md:right-8 opacity-30"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 0.3, rotate: 0 }}
                transition={{ delay: 1.9, duration: 0.6 }}
              >
                <Heart className="text-pink-400" size={12} />
              </motion.div>
              <motion.div 
                className="absolute bottom-16 md:bottom-20 left-12 md:left-16 opacity-30 transform rotate-12"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 2.1, duration: 0.6 }}
              >
                <Heart className="text-red-400" size={10} />
              </motion.div>
            </div>

            {/* Paper aging effects */}
            <motion.div 
              className="absolute top-3 md:top-4 right-3 md:right-4 w-6 h-6 md:w-8 md:h-8 bg-yellow-100 rounded-full opacity-40"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            />
            <motion.div 
              className="absolute bottom-6 md:bottom-8 left-8 md:left-12 w-4 h-4 md:w-6 md:h-6 bg-amber-100 rounded-full opacity-30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            />
          </motion.div>
        </div>

        {/* Next Button */}
        <AnimatePresence>
          {showNext && (
            <motion.div
              className="text-center mt-8 md:mt-12"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
            >
              <motion.button
                onClick={onNext}
                className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white 
                         px-8 py-3 md:px-12 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl 
                         hover:scale-105 hover:shadow-2xl transition-all duration-300 
                         relative overflow-hidden"
                style={{ fontFamily: 'Poppins' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  Design Your Rakhi 🎨
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>

                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                              transition-transform duration-1000"></div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LetterPage;