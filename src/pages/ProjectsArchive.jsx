import { useState, useEffect, useRef, useMemo } from 'react';
import projectsData from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const ProjectsArchive = () => {
    const [filter, setFilter] = useState('all');
    const [selectedId, setSelectedId] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);
    const contentRef = useRef(null);

    const categories = ['all', 'graphics', 'video', 'code', 'photos'];
    
    const filtered = useMemo(() => {
        return projectsData.filter(p => filter === 'all' || p.category === filter);
    }, [filter]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 950);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile && filtered.length > 0) {
            setSelectedId(filtered[0].title);
        }
    }, [filter, isMobile]); 

    const selectedProject = filtered.find(p => p.title === selectedId) || filtered[0];

    const getCategoryClass = (cat) => {
        switch(cat.toLowerCase()) {
            case 'video': return 'tag-video';
            case 'code': return 'tag-code';
            case 'graphics': return 'tag-graphics';
            case 'photos': return 'tag-photos';
            default: return 'tag-default';
        }
    };

    const getCategoryColor = (cat) => {
        switch(cat.toLowerCase()) {
            case 'video': return 'var(--cat-video)';
            case 'code': return 'var(--cat-code)';
            case 'graphics': return 'var(--cat-graphics)';
            case 'photos': return 'var(--cat-photos)';
            default: return '#ffffff';
        }
    };

    return (
        <div className="container" style={{ paddingTop: '140px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '50px' }}>
                    <h1 className="massive-title">ARCHIVE</h1>
                    
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        {categories.map(c => (
                            <button 
                                key={c} 
                                onClick={() => setFilter(c)}
                                className={`filter-btn ${filter === c ? `active-${c}` : ''}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
                
                {isMobile ? (
                    <div className="glass-grid">
                        {filtered.map((p, idx) => <ProjectCard key={idx} project={p} />)}
                    </div>
                ) : (
                    <div className="archive-layout">
                        
                        <div className="archive-sidebar">
                            {filtered.map((p, idx) => {
                                const isActive = selectedId === p.title;
                                return (
                                    <button 
                                        key={idx} 
                                        className={`archive-mini-card ${isActive ? 'active' : ''}`}
                                        onClick={() => setSelectedId(p.title)}
                                        style={{
                                            borderLeftColor: isActive ? getCategoryColor(p.category) : 'var(--glass-border)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', width: '100%' }}>
                                            <div style={{ width: '80px', height: '45px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden', position: 'relative', background: '#000', border: '1px solid var(--glass-border)' }}>
                                                <img 
                                                    src={p.image} 
                                                    alt={p.title} 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isActive && p.video ? 0 : 1 }} 
                                                />
                                                {isActive && p.video && (
                                                    <video src={p.video} autoPlay muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                                )}
                                            </div>
                                            
                                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <h4 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '0.95rem', textTransform: 'uppercase', margin: 0 }}>{p.title}</h4>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: getCategoryColor(p.category), boxShadow: `0 0 8px ${getCategoryColor(p.category)}` }}></div>
                                                </div>
                                                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontSize: '0.6rem', textTransform: 'uppercase' }}>{p.category}</span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {selectedProject && (
                            <div className="archive-content" ref={contentRef}>
                                <div className="glass-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                    <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', position: 'relative' }}>
                                        <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        {selectedProject.video && (
                                            <video src={selectedProject.video} autoPlay muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                        )}
                                    </div>
                                    <div style={{ padding: '40px' }}>
                                        <h2 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '2.5rem', textTransform: 'uppercase', marginBottom: '15px' }}>{selectedProject.title}</h2>
                                        <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.8', marginBottom: '30px' }}>{selectedProject.description}</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '35px' }}>
                                            <span className={`project-tag ${getCategoryClass(selectedProject.category)}`}>{selectedProject.category}</span>
                                            {selectedProject.badges?.[0]?.split('|').map(b => b.trim()).filter(Boolean).map((badge, i) => (
                                                <span key={i} className="project-tag tag-default">{badge}</span>
                                            ))}
                                        </div>
                                        {selectedProject.link && <a href={selectedProject.link} target="_blank" rel="noreferrer" className="glass-btn">VIEW ARCHIVE</a>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <footer className="social-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <a href="https://github.com/vinit-rao" target="_blank" rel="noreferrer" className="social-pill">GH</a>
                        <a href="https://linkedin.com/in/vinitrao1/" target="_blank" rel="noreferrer" className="social-pill">LI</a>
                        <a href="https://youtube.com/@OfficialVinitRao" target="_blank" rel="noreferrer" className="social-pill">YT</a>
                        <a href="https://instagram.com/officialvinitrao" target="_blank" rel="noreferrer" className="social-pill">IG</a>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontSize: '0.7rem', letterSpacing: '2px' }}>VINIT RAO // 2026</span>
                </div>
                <div className="footer-accent-bar"></div>
            </footer>
        </div>
    );
};

export default ProjectsArchive;