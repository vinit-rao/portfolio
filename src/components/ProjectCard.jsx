import { useRef, useState } from 'react';

const ProjectCard = ({ project }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="glass-card" onClick={() => project.link && window.open(project.link, '_blank')} style={{ cursor: 'pointer' }}>
      <div className="glass-media" 
           onMouseEnter={() => { setIsHovered(true); videoRef.current?.play(); }} 
           onMouseLeave={() => { setIsHovered(false); videoRef.current?.pause(); videoRef.current.currentTime = 0; }}>
        
        <img src={project.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={project.title} />
        
        <video 
            ref={videoRef} 
            src={project.video} 
            className="card-video" 
            muted loop playsInline 
            style={{ opacity: isHovered ? 1 : 0 }} 
        />
      </div>
      
      <div style={{ marginTop: '25px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {project.title}
        </h3>
        <p style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '10px', lineHeight: '1.6' }}>
            {project.description}
        </p>
        
        {/* FIXED TAGS: Filters out empty strings to prevent blank boxes */}
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
           <span className="project-tag category-tag">{project.category}</span>
           
           {project.badges?.[0]?.split('|')
             .map(b => b.trim())
             .filter(b => b !== '') /* This kills the empty boxes */
             .map((badge, i) => (
               <span key={i} className="project-tag">{badge}</span>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;