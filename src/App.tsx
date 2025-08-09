import React, { useState } from 'react';
import EnvelopePage from './components/EnvelopePage';
import LetterPage from './components/LetterPage';
import RakhiDesigner from './components/RakhiDesigner';
import Gallery from './components/Gallery';
import EndingPage from './components/EndingPage';
import { MusicProvider, MusicControl } from './context/MusicContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <EnvelopePage onNext={nextPage} />;
      case 1:
        return <LetterPage onNext={nextPage} />;
      case 2:
        return <RakhiDesigner onNext={nextPage} />;
      case 3:
        return <Gallery onNext={nextPage} />;
      case 4:
        return <EndingPage />;
      default:
        return <EnvelopePage onNext={nextPage} />;
    }
  };

  return (
    <MusicProvider>
      <div className="App">
        {renderPage()}
        <MusicControl />
      </div>
    </MusicProvider>
  );
}

export default App;