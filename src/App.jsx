import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import FloatingEcoBtn from './components/FloatingEcoBtn';

import Home from './pages/Home';
import ProjectsArchive from './pages/ProjectsArchive';

function App() {
  const [isOptimized, setIsOptimized] = useState(() => {
    return localStorage.getItem('vinit_optimized') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('vinit_optimized', isOptimized);
  }, [isOptimized]);

  return (
    <Router>
      <BackgroundEffects isOptimized={isOptimized} />
      <Navbar />
      <FloatingEcoBtn isOptimized={isOptimized} toggleOptimization={() => setIsOptimized(!isOptimized)} />

      <Routes>
        <Route path="/" element={<Home isOptimized={isOptimized} />} />
        <Route path="/projects" element={<ProjectsArchive />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;