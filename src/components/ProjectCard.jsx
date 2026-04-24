import { useRef, useState } from 'react';

const ProjectCard = ({ project }) => {
    const videoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const getCategoryColor = (cat) => {
        switch(cat.toLowerCase()) {
            case 'video': return 'var(--cat-video)';
            case 'code': return 'var(--cat-code)';
            case 'graphics': return 'var(--cat-graphics)';
            case 'photos': return 'var(--cat-photos)';
            default: return '#ffffff';
        }
    };

    // Extract tags safely into an array
    const tags = project.badges?.[0]?.split('|').map(b => b.trim()).filter(Boolean) || [];

    return (
        <div 
            className="sharp-project-card" 
            onMouseEnter={() => { setIsHovered(true); videoRef.current?.play(); }} 
            onMouseLeave={() => { setIsHovered(false); videoRef.current?.pause(); if(videoRef.current) videoRef.current.currentTime = 0; }}
            onClick={() => project.link && window.open(project.link, '_blank')}
        >
            {/* FULL BLEED MEDIA */}
            <img src={project.image} alt={project.title} className="card-bg-img" />
            {project.video && (
                <video ref={videoRef} src={project.video} className="card-bg-video" muted loop playsInline />
            )}
            
            {/* TOP LEFT CATEGORY - Now stays permanently and gets scaled up via CSS on hover */}
            <div className="card-category-top">
                <div style={{ width: '8px', height: '8px', backgroundColor: getCategoryColor(project.category), boxShadow: `0 0 8px ${getCategoryColor(project.category)}` }}></div>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#fff', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                    {project.category}
                </span>
            </div>

            {/* IDLE STATE: Title at bottom, floats down and fades out on hover */}
            <div className={`card-idle-info ${isHovered ? 'fade-out' : ''}`}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem, 1.4vw, 1.25rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.2' }}>
                    {project.title}
                </h3>
            </div>

            {/* HOVER OVERLAY */}
            <div className={`card-hover-overlay ${isHovered ? 'active' : ''}`}>
                
                {/* TOP RIGHT TITLE - Appears on hover */}
                <h3 className="hover-title">
                    {project.title}
                </h3>
                
                {/* BOTTOM CONTENT: Description sitting right above the Marquee */}
                <div className="hover-bottom-content">
                    <p className="hover-desc">{project.description}</p>
                    
                    <div className="marquee-wrapper">
                        <div className="marquee-track">
                            {/* Duplicated 4 times for seamless infinite scroll */}
                            {[...tags, ...tags, ...tags, ...tags].map((badge, i) => (
                                <span key={i} className="sharp-tag">{badge}</span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectCard;