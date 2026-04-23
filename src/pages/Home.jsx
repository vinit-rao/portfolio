import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects';
import DigitalEmbers from '../components/DigitalEmbers'; // <-- NEW BACKGROUND

const Home = () => {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        const randomized = projectsData.filter(p => p.featured).sort(() => 0.5 - Math.random()).slice(0, 4);
        setFeatured(randomized);
    }, []);

    return (
        <div className="container" style={{ paddingTop: '80px' }}>
            <DigitalEmbers />
            
            {/* HERO */}
            <header style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <div className="spline-container" style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '110%', zIndex: 1, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent 98%)' }}>
                    <spline-viewer url="https://prod.spline.design/vyQWyAKaGzlKQJKm/scene.splinecode" loading-reveal="hidden" style={{ width: '100%', height: '100%' }}></spline-viewer>
                </div>
                <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
                    <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '4px', marginBottom: '10px' }}>INTERACTIVE DESIGNER</h2>
                    {/* MASSIVE RESPONSIVE TITLE */}
                    <h1 className="massive-title" style={{ fontSize: 'clamp(4rem, 16vw, 12rem)', lineHeight: '0.85', letterSpacing: '-0.02em' }}>
                        VINIT<br />RAO.
                    </h1>
                    <p style={{ marginTop: '25px', color: '#ccc', maxWidth: '450px', lineHeight: '1.6' }}>Multimedia engineer based in Ottawa. Specializing in cinematic visual storytelling and technical systems.</p>
                </div>
            </header>

            {/* VISUAL RESUME (ABOUT ME) */}
            <section style={{ padding: '120px 0', borderTop: '1px solid var(--glass-border)' }}>
                <h2 className="massive-title" style={{ fontSize: '3.5rem', marginBottom: '50px' }}>ABOUT ME</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'stretch' }}>
                    
                    {/* Left Column: Bio & Tech Stack - USING SPACE-BETWEEN FOR ALIGNMENT */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '40px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '15px' }}>
                                 <h3 style={{ fontSize: '1.5rem', color: '#fff', fontFamily: 'var(--font-display)' }}>VINIT RAO</h3>
                                 <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '0.9rem' }}>GPA: 3.7 / 4.0</span>
                            </div>
                            <p style={{ fontSize: '1rem', color: '#ccc', lineHeight: '1.8' }}>
                                Interactive Multimedia and Design student at Carleton University. I architect digital experiences through end-to-end UX/UI design and custom hardware-to-engine integration. Based in Ottawa, I bridge the gap between creative vision and technical execution.
                            </p>
                        </div>
                        
                        {/* ACCURATE TECH STACK */}
                        <div className="glass-card" style={{ padding: '30px' }}>
                            <span className="card-label">TECHNICAL_PROFICIENCY</span>
                            <ul style={{ listStyle: 'none', color: '#888', fontSize: '0.85rem', lineHeight: '1.8' }}>
                                <li style={{ marginBottom: '12px' }}><b style={{ color: '#fff' }}>LANGUAGES:</b> Python, Java, C++, C#, HTML, CSS, JavaScript, SQL, Swift</li>
                                <li style={{ marginBottom: '12px' }}><b style={{ color: '#fff' }}>CREATIVE:</b> Adobe CC, Figma, Final Cut, Blender, Maya</li>
                                <li style={{ marginBottom: '12px' }}><b style={{ color: '#fff' }}>DEV TOOLS:</b> Arch Linux, Hyprland WM, Git, Unity, Unreal, Django, VS Code</li>
                                <li><b style={{ color: '#fff' }}>MANAGEMENT:</b> Jira, Notion, Trello, Miro, Scrum/Agile</li>
                            </ul>
                        </div>
                        
                        {/* THIS BUTTON NOW ANCHORS TO THE BOTTOM */}
                        <div>
                            <a href="/Vinit_Rao_Resume.pdf" download className="glass-btn">Download Resume</a>
                        </div>
                    </div>

                    {/* Right Column: Portrait Image - MATCHES LEFT COLUMN HEIGHT */}
                    <div className="glass-card" style={{ padding: 0, overflow: 'hidden', height: '100%', minHeight: '400px', position: 'relative' }}>
                        <img 
                            src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1000&auto=format&fit=crop" 
                            alt="Vinit Rao" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover',
                                filter: 'grayscale(100%) contrast(1.1) brightness(0.8)', 
                                transition: 'filter 0.5s ease'
                            }} 
                            onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) contrast(1.1) brightness(1)'}
                            onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%) contrast(1.1) brightness(0.8)'}
                        />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '30%', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', pointerEvents: 'none' }}></div>
                        <div style={{ position: 'absolute', bottom: '20px', left: '20px', pointerEvents: 'none' }}>
                             <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '2px' }}>[ SYSTEM_OPERATOR ]</span>
                        </div>
                    </div>
                    
                </div>
            </section>

            {/* FEATURED WORK */}
            <section style={{ paddingBottom: '100px', marginTop: '60px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontFamily: 'var(--font-mono)', color: '#fff', fontSize: '1rem', letterSpacing: '2px' }}>FEATURED_SHOWCASE</h2>
                    <Link to="/projects" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.8rem' }}>ALL_ARCHIVE →</Link>
                </div>
                <div className="accordion-wrapper">
                    {featured.map((p, idx) => (
                        <div key={idx} className="accordion-panel" onClick={() => window.open(p.link, '_blank')}>
                            <img src={p.image} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} alt={p.title} />
                            <video src={p.video} className="accordion-video" muted loop playsInline onMouseEnter={(e) => e.target.play()} onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }} />
                            <div className="accordion-content">
                                <h3 className="accordion-title" style={{ fontSize: '1.2rem' }}>{p.title}</h3>
                                <p className="accordion-desc" style={{ opacity: 1, transform: 'none' }}>{p.category} // {p.badges?.[0]?.split('|')[1] || 'PROJ'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SOCIALS */}
            <footer className="social-footer">
                <h2 className="massive-title" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>STAY CONNECTED</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '40px', flexWrap: 'wrap' }}>
                    <a href="https://github.com/vinit-rao" target="_blank" rel="noreferrer" className="social-pill">GITHUB</a>
                    <a href="https://instagram.com/officialvinitrao" target="_blank" rel="noreferrer" className="social-pill">INSTAGRAM</a>
                    <a href="https://youtube.com/@OfficialVinitRao" target="_blank" rel="noreferrer" className="social-pill">YOUTUBE</a>
                    <a href="https://linkedin.com/in/vinitrao1/" target="_blank" rel="noreferrer" className="social-pill">LINKEDIN</a>
                </div>
            </footer>
        </div>
    );
};

export default Home;