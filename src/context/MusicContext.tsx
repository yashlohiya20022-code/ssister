import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicContextType {
  isPlaying: boolean;
  startMusic: () => void;
  toggleMusic: () => void;
  hasStarted: boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio with a public domain music file
    // You'll need to add your music file to the public folder
    audioRef.current = new Audio('/music/bgm.mp3'); // Changed path to /music/bgm.mp3
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // 40% volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
      setIsPlaying(true);
      setHasStarted(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(error => {
          console.log('Play prevented:', error);
        });
        setIsPlaying(true);
        if (!hasStarted) {
          setHasStarted(true);
        }
      }
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, startMusic, toggleMusic, hasStarted }}>
      {children}
    </MusicContext.Provider>
  );
};

// Separate MusicControl component that will be used outside the provider
export const MusicControl: React.FC = () => {
  const { isPlaying, toggleMusic, hasStarted } = useMusic();

  return (
    <AnimatePresence>
      {hasStarted && (
        <motion.button
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-200/50 hover:bg-white/90 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isPlaying ? (
            <Volume2 className="text-purple-600" size={20} />
          ) : (
            <VolumeX className="text-gray-500" size={20} />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};