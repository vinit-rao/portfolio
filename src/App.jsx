import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProjectsArchive from './pages/ProjectsArchive';
import About from './pages/About';
import Contact from './pages/Contact';
import StarField from './components/StarField';

function App() {
  return (
    <Router>
    <StarField />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsArchive />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;