import { useRef, useState } from 'react';

const ProjectCard = ({ project }) => {
  const videoRef = useRef(null);

  return (
    <div className="glass-card" onClick={() => project.link && window.open(project.link, '_blank')}>
      <div className="glass-media">
        <img src={project.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <video ref={videoRef} src={project.video} className="card-video" muted loop playsInline 
               onMouseEnter={(e)=>e.target.play()} onMouseLeave={(e)=>e.target.pause()} />
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{project.title}</h3>
        <p style={{ marginBottom: '15px' }}>{project.description}</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
           <span className="project-tag" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>{project.category}</span>
           {project.badges?.[0]?.split('|').map((badge, i) => (
               <span key={i} className="project-tag">{badge.trim()}</span>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;