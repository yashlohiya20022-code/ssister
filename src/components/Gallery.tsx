import React, { useState } from 'react';
import { ArrowRight, Heart, X, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Img1 from '../imgs/img1.jpg'
import Img2 from '../imgs/img2.jpg'
import Img3 from '../imgs/img3.jpg'

interface GalleryProps {
  onNext: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ onNext }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const photos = [
    {
      url: Img1,
      caption: "Every moment with you is a treasure that I hold close to my heart",
      handwriting: "Me & My Cututu"
    },
    {
      url: Img2,
      caption: "Himawari like sister",
      handwriting: "Always laughing together"
    },
    {
      url: Img3,
      caption: "OK OK",
      handwriting: "Happy Rakhi!"
    }
  ];

  // Random rotation angles for polaroids
  const getRandomRotation = (index: number) => {
    const rotations = [-5, 3, -2];
    return rotations[index % rotations.length];
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-6 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #F5F1E8 0%, #E8DDD4 30%, #D4C5B9 70%, #C7B299 100%)' 
      }}
    >
      {/* Vintage Background Texture */}
      <div className="absolute inset-0 opacity-30" 
           style={{ 
             backgroundImage: `
               radial-gradient(circle at 25px 25px, rgba(139, 69, 19, 0.1) 2px, transparent 2px),
               radial-gradient(circle at 75px 75px, rgba(160, 82, 45, 0.08) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px, 25px 25px'
           }} 
      />

      {/* Vintage Film Strips */}
      <div className="absolute top-0 left-10 w-8 h-full bg-gradient-to-b from-amber-800/20 to-amber-900/20 opacity-40"></div>
      <div className="absolute top-0 right-10 w-8 h-full bg-gradient-to-b from-amber-800/20 to-amber-900/20 opacity-40"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <div className="inline-block mb-6">
            <Camera className="text-amber-700 mx-auto mb-4" size={48} />
            <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
          </div> */}
          
          <h1 
            className="text-5xl md:text-7xl font-bold text-amber-900 mb-6 tracking-wide"
            style={{ 
              fontFamily: 'serif',
              textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)'
            }}
          >
            Gallery
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 font-medium">
            "Some memories with my best sis"
          </p>
          
          {/* Vintage decorative line */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <div className="w-16 h-0.5 bg-amber-600"></div>
            <Heart className="text-amber-600" size={16} fill="currentColor" />
            <div className="w-16 h-0.5 bg-amber-600"></div>
          </div>
        </motion.div>

        {/* Polaroid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mb-20">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              style={{
                transform: `rotate(${getRandomRotation(index)}deg)`,
              }}
              initial={{ opacity: 0, y: 50, rotate: getRandomRotation(index) }}
              animate={{ opacity: 1, y: 0, rotate: getRandomRotation(index) }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedImage(index)}
            >
              {/* Polaroid Frame */}
              <div className="bg-white p-4 pb-16 rounded-lg shadow-2xl relative overflow-hidden
                            hover:shadow-3xl transition-all duration-300">
                
                {/* Vintage aging effects */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-yellow-100 rounded-full opacity-60"></div>
                <div className="absolute bottom-20 left-2 w-6 h-6 bg-amber-100 rounded-full opacity-40"></div>
                <div className="absolute top-1/2 right-1 w-3 h-12 bg-amber-200 opacity-30 rounded-full"></div>
                
                {/* Photo */}
                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                  <img 
                    src={photo.url} 
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover filter sepia-[0.2] contrast-[1.1] brightness-[0.95]
                             transition-all duration-500 group-hover:sepia-0 group-hover:contrast-100 group-hover:brightness-100"
                  />
                  
                  {/* Vintage overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-amber-100/20
                                pointer-events-none"></div>
                  
                  {/* Photo corner effect */}
                  <div className="absolute top-0 right-0 w-6 h-6 bg-white transform rotate-45 translate-x-3 -translate-y-3
                                opacity-80"></div>
                </div>
                
                {/* Handwritten Caption Area */}
                <div className="mt-4 space-y-2">
                  {/* Handwritten note */}
                  <p 
                    className="text-amber-900 text-lg leading-relaxed font-medium"
                    style={{ 
                      fontFamily: 'cursive',
                      transform: 'rotate(-1deg)',
                      textShadow: '0 1px 2px rgba(139, 69, 19, 0.1)'
                    }}
                  >
                    {photo.handwriting}
                  </p>
                </div>
                
                {/* Tape effect */}
                <div className="absolute -top-2 left-1/4 w-16 h-8 bg-yellow-100 opacity-70 rounded-sm
                              transform -rotate-12 shadow-sm"></div>
                <div className="absolute -bottom-2 right-1/4 w-12 h-6 bg-yellow-100 opacity-70 rounded-sm
                              transform rotate-6 shadow-sm"></div>
                
                {/* Heart stamp */}
                <div className="absolute bottom-4 right-4 opacity-60">
                  <Heart className="text-red-400" size={16} fill="currentColor" />
                </div>
              </div>
              
              {/* Subtle shadow beneath polaroid */}
              <div className="absolute -bottom-2 left-2 right-2 h-6 bg-amber-900/20 rounded-full blur-sm -z-10"></div>
            </motion.div>
          ))}
        </div>

        {/* Next Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <button
            onClick={onNext}
            className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 to-pink-600 
                     text-white px-12 py-5 rounded-full font-semibold text-lg shadow-2xl 
                     hover:scale-105 hover:shadow-3xl transition-all duration-300 relative overflow-hidden
                     border-2 border-purple-500"
            style={{ fontFamily: 'sans-serif' }}
          >
            <span className="relative z-10 flex items-center gap-4">
              Final Surprise
              <ArrowRight size={24} />
            </span>
            
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          transform -skew-x-12 -translate-x-full hover:translate-x-full 
                          transition-transform duration-1000"></div>
          </button>
        </motion.div>
      </div>

      {/* Enhanced Modal for enlarged image */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 bg-white/90 hover:bg-white text-amber-800 
                         w-12 h-12 rounded-full flex items-center justify-center shadow-lg
                         transition-all duration-200 hover:scale-110 border-2 border-amber-200"
              >
                <X size={24} />
              </button>

              {/* Polaroid-style modal */}
              <div className="p-8 pb-20">
                {/* Image */}
                <div className="aspect-video overflow-hidden rounded-lg shadow-xl relative">
                  <img 
                    src={photos[selectedImage].url} 
                    alt={`Memory ${selectedImage + 1}`}
                    className="w-full h-full object-cover filter sepia-[0.1] contrast-[1.05]"
                  />
                  
                  {/* Vintage overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-amber-100/10"></div>
                </div>

                {/* Modal caption area */}
                <div className="mt-8 space-y-4">
                  {/* Handwritten style caption */}
                  <p 
                    className="text-amber-900 text-2xl leading-relaxed text-center font-medium"
                    style={{ 
                      fontFamily: 'cursive'
                    }}
                  >
                    {photos[selectedImage].handwriting}
                  </p>
                  
                  {/* Full caption */}
                  <div className="flex items-start gap-4 justify-center mt-6">
                    <Heart className="text-amber-600 mt-1 flex-shrink-0" size={24} fill="currentColor" />
                    <p className="text-amber-800 text-lg leading-relaxed font-medium text-center max-w-2xl"
                       style={{ fontFamily: 'sans-serif' }}>
                      {photos[selectedImage].caption}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Vintage aging effects for modal */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-yellow-100 rounded-full opacity-40"></div>
              <div className="absolute bottom-24 right-4 w-4 h-4 bg-amber-100 rounded-full opacity-30"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;