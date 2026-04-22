import { useRef } from 'react';

const ProjectCard = ({ project }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // THIS IS THE FIX: Forces the browser to look in the root public folder
  const getMediaPath = (path) => {
    if (!path) return '';
    return path.startsWith('/') ? path : `/${path}`;
  };

  return (
    <div 
      className="glass-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(project.link, project.linkType === 'internal' ? '_self' : '_blank')}
    >
      <div className="glass-media">
        {project.video ? (
          <>
            <img src={getMediaPath(project.image)} alt={project.title} loading="lazy" />
            <video 
              ref={videoRef}
              src={getMediaPath(project.video)} 
              muted loop playsInline 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </>
        ) : (
          <img src={getMediaPath(project.image)} alt={project.title} loading="lazy" />
        )}
      </div>
      
      <div className="glass-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div style={{ marginTop: '15px', display: 'flex', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {project.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;