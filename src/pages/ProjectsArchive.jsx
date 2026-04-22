import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects';

const ProjectsArchive = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = projectsData.filter(p => {
    return filter === 'all' || p.category === filter;
  });

  return (
    <div className="container" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 className="massive-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '40px' }}>ARCHIVE</h1>
        
        <div className="spatial-filters">
          {['all', 'graphics', 'video', 'code', 'photos'].map(f => (
            <button 
              key={f}
              className={`spatial-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-grid">
        {filteredProjects.map((p, idx) => <ProjectCard key={idx} project={p} />)}
      </div>

    </div>
  );
};

export default ProjectsArchive;