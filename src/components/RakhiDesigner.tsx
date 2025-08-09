import React, { useState, useRef } from 'react';
import { Download, Palette, Heart, Star, ArrowRight, RotateCcw, Sparkles, Circle, Hexagon, Diamond, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';

interface RakhiDesignerProps {
  onNext: () => void;
}

const RakhiDesigner: React.FC<RakhiDesignerProps> = ({ onNext }) => {
  const [selectedColors, setSelectedColors] = useState({
    base: '#FF6B9D',
    accent: '#FFD93D',
    center: '#6BCF7F',
    thread: '#D4AF37'
  });
  const [selectedPattern, setSelectedPattern] = useState('hearts');
  const [selectedShape, setSelectedShape] = useState('circle');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [activeTab, setActiveTab] = useState('colors');
  const [expandedSection, setExpandedSection] = useState<string | null>('colors');
  const rakhiRef = useRef<HTMLDivElement>(null);

  const colorPalettes = [
    { name: 'Sunset', colors: ['#FF6B9D', '#FFD93D', '#6BCF7F', '#D4AF37'] },
    { name: 'Ocean', colors: ['#4A90E2', '#7ED321', '#50E3C2', '#B8E986'] },
    { name: 'Royal', colors: ['#9013FE', '#E91E63', '#FF9800', '#FFC107'] },
    { name: 'Earth', colors: ['#8D6E63', '#A1887F', '#BCAAA4', '#D7CCC8'] },
    { name: 'Fire', colors: ['#F44336', '#FF5722', '#FF9800', '#FFC107'] },
    { name: 'Garden', colors: ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B'] }
  ];

  const individualColors = [
    '#FF6B9D', '#FFD93D', '#6BCF7F', '#D4AF37', '#4A90E2', '#9013FE',
    '#E91E63', '#FF9800', '#8D6E63', '#4CAF50', '#673AB7', '#03DAC6',
    '#F44336', '#795548', '#607D8B', '#9E9E9E', '#FF5722', '#3F51B5'
  ];

  const patterns = [
    { name: 'hearts', icon: Heart, label: 'Hearts' },
    { name: 'stars', icon: Star, label: 'Stars' },
    { name: 'sparkles', icon: Sparkles, label: 'Sparkles' },
    { name: 'dots', icon: Circle, label: 'Dots' }
  ];

  const shapes = [
    { name: 'circle', label: 'Classic Circle' },
    { name: 'flower', label: 'Flower Petals' },
    { name: 'hexagon', label: 'Hexagon' },
    { name: 'star', label: 'Star Shape' }
  ];

  const styles = [
    { name: 'modern', label: 'Modern Minimal' },
    { name: 'traditional', label: 'Traditional Rich' },
    { name: 'elegant', label: 'Elegant Luxury' },
    { name: 'playful', label: 'Playful Fun' }
  ];

  const sizes = [
    { name: 'small', label: 'Delicate', size: 120 },
    { name: 'medium', label: 'Classic', size: 160 },
    { name: 'large', label: 'Bold', size: 200 }
  ];

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'shape', label: 'Shape', icon: Circle },
    { id: 'pattern', label: 'Pattern', icon: Heart },
    { id: 'style', label: 'Style', icon: Star }
  ];

  const downloadRakhi = async () => {
    if (rakhiRef.current) {
      try {
        const canvas = await html2canvas(rakhiRef.current, {
          backgroundColor: null,
          scale: 3,
          useCORS: true
        });
        
        const link = document.createElement('a');
        link.download = `custom-rakhi-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error downloading rakhi:', error);
      }
    }
  };

  const resetDesign = () => {
    setSelectedColors({
      base: '#FF6B9D',
      accent: '#FFD93D',
      center: '#6BCF7F',
      thread: '#D4AF37'
    });
    setSelectedPattern('hearts');
    setSelectedShape('circle');
    setSelectedSize('medium');
    setSelectedStyle('modern');
  };

  const applyColorPalette = (palette: string[]) => {
    setSelectedColors({
      base: palette[0],
      accent: palette[1],
      center: palette[2],
      thread: palette[3]
    });
  };

  const getCurrentSize = () => sizes.find(s => s.name === selectedSize)?.size || 160;

  const renderPattern = () => {
    const PatternIcon = patterns.find(p => p.name === selectedPattern)?.icon;
    const currentSize = getCurrentSize();
    
    // Calculate pattern container size based on shape and style
    const getPatternContainerSize = () => {
      switch (selectedShape) {
        case 'flower':
          return currentSize * 0.5;
        case 'hexagon':
          return currentSize * 0.6;
        case 'star':
          return currentSize * 0.4;
        default: // circle
          return currentSize * 0.5;
      }
    };

    const containerSize = getPatternContainerSize();
    
    const styleProps = {
      modern: { 
        iconSize: containerSize * 0.25, 
        gridCols: 2, 
        spacing: 'gap-2',
        dotSize: containerSize * 0.08
      },
      traditional: { 
        iconSize: containerSize * 0.22, 
        gridCols: 3, 
        spacing: 'gap-1',
        dotSize: containerSize * 0.06
      },
      elegant: { 
        iconSize: containerSize * 0.28, 
        gridCols: 2, 
        spacing: 'gap-3',
        dotSize: containerSize * 0.05
      },
      playful: { 
        iconSize: containerSize * 0.24, 
        gridCols: 2, 
        spacing: 'gap-2',
        dotSize: containerSize * 0.09
      }
    };
    
    const currentStyle = styleProps[selectedStyle as keyof typeof styleProps] || styleProps.modern;
    
    // Container for proper centering
    const containerStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const
    };
    
    if (selectedPattern === 'dots') {
      const dotCount = selectedStyle === 'traditional' ? 9 : selectedStyle === 'playful' ? 8 : 6;
      const gridCols = selectedStyle === 'traditional' ? 3 : 2;
      
      return (
        <div style={containerStyle}>
          <div 
            className={`grid grid-cols-${gridCols} ${currentStyle.spacing} items-center justify-items-center`}
            style={{ 
              width: 'fit-content',
              height: 'fit-content'
            }}
          >
            {[...Array(dotCount)].map((_, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{ 
                  width: currentStyle.dotSize,
                  height: currentStyle.dotSize,
                  backgroundColor: selectedColors.accent,
                  flexShrink: 0
                }}
              />
            ))}
          </div>
        </div>
      );
    }
    
    if (PatternIcon) {
      const iconCount = selectedStyle === 'traditional' ? 6 : selectedStyle === 'playful' ? 4 : 4;
      const gridCols = selectedStyle === 'traditional' ? 3 : 2;
      
      return (
        <div style={containerStyle}>
          <div 
            className={`grid grid-cols-${gridCols} ${currentStyle.spacing} items-center justify-items-center`}
            style={{ 
              width: 'fit-content',
              height: 'fit-content'
            }}
          >
            {[...Array(iconCount)].map((_, i) => (
              <div 
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: currentStyle.iconSize,
                  height: currentStyle.iconSize
                }}
              >
                <PatternIcon 
                  size={currentStyle.iconSize * 0.8} 
                  style={{ 
                    color: selectedColors.accent,
                    opacity: selectedStyle === 'elegant' ? 0.8 : 1,
                    filter: selectedStyle === 'traditional' ? `drop-shadow(0 1px 2px ${selectedColors.base}40)` : 'none',
                    flexShrink: 0
                  }} 
                  fill="currentColor" 
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderRakhiShape = () => {
    const size = getCurrentSize();
    const baseStyle = {
      width: size,
      height: size,
      position: 'relative' as const,
      margin: '0 auto'
    };

    // Style-based modifications
    const getStyleModifications = () => {
      switch (selectedStyle) {
        case 'traditional':
          return {
            borderWidth: '6px',
            decorativeRings: 3,
            shadowIntensity: '60',
            patternScale: 1.2,
            hasGoldAccents: true
          };
        case 'elegant':
          return {
            borderWidth: '2px',
            decorativeRings: 1,
            shadowIntensity: '30',
            patternScale: 0.8,
            hasGoldAccents: false
          };
        case 'playful':
          return {
            borderWidth: '4px',
            decorativeRings: 2,
            shadowIntensity: '50',
            patternScale: 1.4,
            hasGoldAccents: true
          };
        default: // modern
          return {
            borderWidth: '4px',
            decorativeRings: 1,
            shadowIntensity: '40',
            patternScale: 1.0,
            hasGoldAccents: false
          };
      }
    };

    const styleProps = getStyleModifications();

    switch (selectedShape) {
      case 'flower':
        return (
          <div style={baseStyle}>
            {/* Flower petals */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size * 0.4,
                  height: size * 0.4,
                  backgroundColor: selectedColors.base,
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${size * 0.2}px)`,
                  boxShadow: `0 8px 32px ${selectedColors.base}${styleProps.shadowIntensity}`,
                  border: selectedStyle === 'traditional' ? `3px solid ${selectedColors.accent}` : 'none'
                }}
              />
            ))}
            
            {/* Traditional style: Additional decorative rings */}
            {selectedStyle === 'traditional' && [...Array(2)].map((_, ring) => (
              <div
                key={`ring-${ring}`}
                className="absolute rounded-full border-2"
                style={{
                  width: size * (0.7 + ring * 0.1),
                  height: size * (0.7 + ring * 0.1),
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: selectedColors.accent,
                  opacity: 0.6 - ring * 0.2
                }}
              />
            ))}
            
            {/* Center pattern container */}
            <div
              className="absolute rounded-full flex items-center justify-center"
              style={{
                width: size * 0.5,
                height: size * 0.5,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: selectedColors.center,
                boxShadow: `inset 0 4px 16px rgba(0,0,0,0.2)`,
                border: selectedStyle === 'elegant' ? `1px solid ${selectedColors.accent}30` : 'none'
              }}
            >
              {renderPattern()}
            </div>
          </div>
        );

      case 'hexagon':
        return (
          <div style={baseStyle}>
            <div
              className="absolute flex items-center justify-center"
              style={{
                width: size,
                height: size,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: selectedColors.base,
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                boxShadow: `0 12px 40px ${selectedColors.base}${styleProps.shadowIntensity}`,
                border: selectedStyle === 'traditional' ? `4px solid ${selectedColors.accent}` : 'none'
              }}
            >
              {/* Style-specific decorative elements */}
              {selectedStyle === 'playful' && (
                <div className="absolute inset-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: selectedColors.accent,
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-${size * 0.35}px)`
                      }}
                    />
                  ))}
                </div>
              )}
              
              {/* Center pattern container */}
              <div
                className="absolute rounded-full flex items-center justify-center"
                style={{
                  width: size * 0.6,
                  height: size * 0.6,
                  backgroundColor: selectedColors.center,
                  boxShadow: `inset 0 4px 16px rgba(0,0,0,0.2)`,
                  border: selectedStyle === 'elegant' ? `2px solid ${selectedColors.accent}40` : 'none'
                }}
              >
                {renderPattern()}
              </div>
            </div>
          </div>
        );

      case 'star':
        return (
          <div style={baseStyle}>
            <div
              className="absolute flex items-center justify-center"
              style={{
                width: size,
                height: size,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: selectedColors.base,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                boxShadow: `0 12px 40px ${selectedColors.base}${styleProps.shadowIntensity}`,
                filter: selectedStyle === 'elegant' ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' : 'none'
              }}
            >
              {/* Traditional style: Golden edges */}
              {selectedStyle === 'traditional' && (
                <div
                  className="absolute inset-1"
                  style={{
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                    border: `3px solid ${selectedColors.thread}`,
                    backgroundColor: 'transparent'
                  }}
                />
              )}
              
              {/* Center pattern container */}
              <div
                className="absolute rounded-full flex items-center justify-center"
                style={{
                  width: size * 0.4,
                  height: size * 0.4,
                  backgroundColor: selectedColors.center,
                  boxShadow: `inset 0 4px 16px rgba(0,0,0,0.2)`,
                  border: selectedStyle === 'playful' ? `3px solid ${selectedColors.accent}` : 'none'
                }}
              >
                {renderPattern()}
              </div>
            </div>
          </div>
        );

      default: // circle
        return (
          <div style={baseStyle}>
            <div
              className="rounded-full relative flex items-center justify-center"
              style={{
                width: size,
                height: size,
                backgroundColor: selectedColors.base,
                boxShadow: `0 12px 40px ${selectedColors.base}${styleProps.shadowIntensity}, inset 0 2px 8px rgba(255,255,255,0.3)`,
                border: selectedStyle === 'traditional' ? `4px solid ${selectedColors.thread}` : 'none'
              }}
            >
              {/* Multiple decorative rings for traditional style */}
              {selectedStyle === 'traditional' && [...Array(2)].map((_, ring) => (
                <div
                  key={`ring-${ring}`}
                  className="absolute rounded-full border-2"
                  style={{
                    top: `${8 + ring * 8}px`,
                    left: `${8 + ring * 8}px`,
                    right: `${8 + ring * 8}px`,
                    bottom: `${8 + ring * 8}px`,
                    borderColor: selectedColors.accent,
                    opacity: 0.8 - ring * 0.3
                  }}
                />
              ))}
              
              {/* Single elegant ring for elegant style */}
              {selectedStyle === 'elegant' && (
                <div
                  className="absolute inset-6 rounded-full border-2"
                  style={{
                    borderColor: `${selectedColors.accent}60`,
                    borderStyle: 'dashed'
                  }}
                />
              )}
              
              {/* Main accent ring */}
              <div
                className="absolute rounded-full flex items-center justify-center"
                style={{
                  top: `${parseInt(styleProps.borderWidth)}px`,
                  left: `${parseInt(styleProps.borderWidth)}px`,
                  right: `${parseInt(styleProps.borderWidth)}px`,
                  bottom: `${parseInt(styleProps.borderWidth)}px`,
                  border: `${styleProps.borderWidth} solid ${selectedColors.accent}`,
                  boxShadow: `inset 0 2px 8px ${selectedColors.accent}30`
                }}
              >
                {/* Center pattern container */}
                <div
                  className="absolute inset-4 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: selectedColors.center,
                    boxShadow: `inset 0 2px 12px rgba(0,0,0,0.2)`,
                    border: selectedStyle === 'playful' ? `2px solid ${selectedColors.accent}80` : 'none'
                  }}
                >
                  {renderPattern()}
                </div>
              </div>
              
              {/* Decorative dots around the circle */}
              {[...Array(selectedStyle === 'traditional' ? 16 : selectedStyle === 'playful' ? 20 : 12)].map((_, i) => {
                const totalDots = selectedStyle === 'traditional' ? 16 : selectedStyle === 'playful' ? 20 : 12;
                return (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: selectedStyle === 'traditional' ? '4px' : selectedStyle === 'playful' ? '6px' : '3px',
                      height: selectedStyle === 'traditional' ? '4px' : selectedStyle === 'playful' ? '6px' : '3px',
                      backgroundColor: selectedStyle === 'traditional' ? selectedColors.thread : selectedColors.accent,
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * (360 / totalDots)}deg) translateY(-${size / 2 + (selectedStyle === 'elegant' ? 8 : 12)}px)`,
                      boxShadow: `0 2px 8px ${selectedColors.accent}50`,
                      opacity: selectedStyle === 'elegant' ? 0.7 : 1
                    }}
                  />
                );
              })}
              
              {/* Additional playful elements */}
              {selectedStyle === 'playful' && (
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`sparkle-${i}`}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: selectedColors.thread,
                        top: `${20 + Math.sin(i * 0.8) * 20}%`,
                        left: `${20 + Math.cos(i * 0.8) * 20}%`,
                        animation: `twinkle 2s ease-in-out infinite ${i * 0.25}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Design your rakhi
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Create a unique, personalized rakhi for me and send it to me.
          </p>
        </motion.div>

        {/* Mobile/Desktop Layout */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Rakhi Preview */}
          <motion.div 
            className="lg:col-span-1 mb-6 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="lg:sticky lg:top-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center">Your Rakhi</h3>
                
                <div ref={rakhiRef} className="relative">
                  {/* Thread */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-48 md:w-64 h-3 md:h-4 rounded-full shadow-lg"
                      style={{
                        backgroundColor: selectedColors.thread,
                        boxShadow: `0 4px 20px ${selectedColors.thread}40`
                      }}
                    />
                  </div>
                  
                  {/* Rakhi Shape */}
                  <motion.div 
                    className="flex justify-center"
                    key={`${selectedShape}-${selectedSize}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {renderRakhiShape()}
                  </motion.div>
                  
                  {/* Thread continuation */}
                  <div className="flex justify-center mt-6">
                    <div
                      className="w-48 md:w-64 h-3 md:h-4 rounded-full shadow-lg"
                      style={{
                        backgroundColor: selectedColors.thread,
                        boxShadow: `0 4px 20px ${selectedColors.thread}40`
                      }}
                    />
                  </div>
                </div>

                {/* Download Button */}
                <motion.button
                  onClick={downloadRakhi}
                  className="w-full mt-6 md:mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 md:py-4 rounded-2xl font-semibold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={20} />
                  Download Rakhi
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Customization Panel */}
          <div className="lg:col-span-2">
            {/* Mobile Tabs */}
            <div className="lg:hidden mb-6">
              <div className="grid grid-cols-4 gap-1 bg-gray-100 p-1 rounded-2xl">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`p-3 rounded-xl font-medium text-sm transition-all duration-200 flex flex-col items-center gap-1 ${
                      activeTab === tab.id
                        ? 'bg-white text-purple-700 shadow-lg'
                        : 'text-gray-600'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mobile Tab Content */}
            <div className="lg:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
                >
                  {activeTab === 'colors' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                        <Palette className="text-purple-500" />
                        Colors
                      </h3>
                      
                      {/* Color Palettes */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Palettes</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {colorPalettes.map((palette) => (
                            <motion.button
                              key={palette.name}
                              onClick={() => applyColorPalette(palette.colors)}
                              className="group p-3 rounded-xl border-2 border-gray-100 hover:border-purple-300 transition-all duration-200"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="flex gap-1 mb-1">
                                {palette.colors.map((color, i) => (
                                  <div
                                    key={i}
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              <span className="text-xs font-medium text-gray-700">
                                {palette.name}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Individual Colors */}
                      <div className="space-y-4">
                        {(['base', 'accent', 'center', 'thread'] as const).map((colorType) => (
                          <div key={colorType}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                              {colorType} Color
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {individualColors.slice(0, 12).map((color) => (
                                <motion.button
                                  key={`${colorType}-${color}`}
                                  onClick={() => setSelectedColors(prev => ({ ...prev, [colorType]: color }))}
                                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                                    selectedColors[colorType] === color 
                                      ? 'border-gray-800 ring-2 ring-gray-300' 
                                      : 'border-gray-200'
                                  }`}
                                  style={{ backgroundColor: color }}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'shape' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Shape & Size</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Shape</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {shapes.map((shape) => (
                              <motion.button
                                key={shape.name}
                                onClick={() => setSelectedShape(shape.name)}
                                className={`p-4 rounded-xl font-medium transition-all duration-200 ${
                                  selectedShape === shape.name
                                    ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                                    : 'bg-gray-50 text-gray-700'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {shape.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Size</h4>
                          <div className="grid grid-cols-3 gap-3">
                            {sizes.map((size) => (
                              <motion.button
                                key={size.name}
                                onClick={() => setSelectedSize(size.name)}
                                className={`p-3 rounded-xl font-medium transition-all duration-200 ${
                                  selectedSize === size.name
                                    ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                                    : 'bg-gray-50 text-gray-700'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {size.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'pattern' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Pattern</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {patterns.map((pattern) => (
                          <motion.button
                            key={pattern.name}
                            onClick={() => setSelectedPattern(pattern.name)}
                            className={`p-4 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${
                              selectedPattern === pattern.name
                                ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                                : 'bg-gray-50 text-gray-700'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <pattern.icon size={20} />
                            {pattern.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'style' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Style</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {styles.map((style) => (
                          <motion.button
                            key={style.name}
                            onClick={() => setSelectedStyle(style.name)}
                            className={`p-4 rounded-xl font-medium transition-all duration-200 ${
                              selectedStyle === style.name
                                ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                                : 'bg-gray-50 text-gray-700'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {style.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop Layout - All sections visible */}
            <div className="hidden lg:block space-y-6">
              {/* Colors Section */}
              <motion.div 
                className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Palette className="text-purple-500" />
                  Color Palettes
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {colorPalettes.map((palette) => (
                    <motion.button
                      key={palette.name}
                      onClick={() => applyColorPalette(palette.colors)}
                      className="group p-4 rounded-2xl border-2 border-gray-100 hover:border-purple-300 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex gap-1 mb-2">
                        {palette.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">
                        {palette.name}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <div className="space-y-4">
                  {(['base', 'accent', 'center', 'thread'] as const).map((colorType) => (
                    <div key={colorType}>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 capitalize">
                        {colorType} Color
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {individualColors.map((color) => (
                          <motion.button
                            key={`${colorType}-${color}`}
                            onClick={() => setSelectedColors(prev => ({ ...prev, [colorType]: color }))}
                            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                              selectedColors[colorType] === color 
                                ? 'border-gray-800 ring-2 ring-gray-300' 
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                            style={{ backgroundColor: color }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Shape, Pattern, Size, Style */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Shape</h3>
                  <div className="space-y-3">
                    {shapes.map((shape) => (
                      <motion.button
                        key={shape.name}
                        onClick={() => setSelectedShape(shape.name)}
                        className={`w-full p-4 rounded-xl font-medium transition-all duration-200 ${
                          selectedShape === shape.name
                            ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {shape.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Pattern</h3>
                  <div className="space-y-3">
                    {patterns.map((pattern) => (
                      <motion.button
                        key={pattern.name}
                        onClick={() => setSelectedPattern(pattern.name)}
                        className={`w-full p-4 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${
                          selectedPattern === pattern.name
                            ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <pattern.icon size={20} />
                        {pattern.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Size</h3>
                  <div className="space-y-3">
                    {sizes.map((size) => (
                      <motion.button
                        key={size.name}
                        onClick={() => setSelectedSize(size.name)}
                        className={`w-full p-4 rounded-xl font-medium transition-all duration-200 ${
                          selectedSize === size.name
                            ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {size.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Style</h3>
                  <div className="space-y-3">
                    {styles.map((style) => (
                      <motion.button
                        key={style.name}
                        onClick={() => setSelectedStyle(style.name)}
                        className={`w-full p-4 rounded-xl font-medium transition-all duration-200 ${
                          selectedStyle === style.name
                            ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {style.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="flex gap-4 mt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                onClick={resetDesign}
                className="bg-gray-100 text-gray-700 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-200 shadow-lg flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw size={18} />
                Reset
              </motion.button>
              
              <motion.button
                onClick={onNext}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 md:px-10 py-3 md:py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Gallery
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RakhiDesigner;

// Add CSS for playful twinkle animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
`;
document.head.appendChild(styleSheet);