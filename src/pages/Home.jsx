import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // Grab top 3 featured projects
    const featuredProjects = projectsData.filter(p => p.featured).slice(0, 3);
    setFeatured(featuredProjects);
  }, []);

  return (
    <div className="container">
      <header className="hero-spatial">
        <h1 className="massive-title">MULTIMEDIA<br/>ENGINEER</h1>
        <p className="sub-title">Blending cinematic visual storytelling with technical engineering. Based in Ottawa, crafting systems in C#, Unity, and S-Log3.</p>
      </header>

      <section style={{ marginTop: '100px' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '4px', textAlign: 'center' }}>
          Selected Works
        </h2>
        
        <div className="glass-grid">
          {featured.map((p, idx) => <ProjectCard key={idx} project={p} />)}
        </div>
      </section>
    </div>
  );
};

export default Home;