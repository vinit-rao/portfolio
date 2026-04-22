import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects';
import StarField from '../components/StarField';

const Home = () => {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        // Restoring the Featured Showcase logic
        const randomized = projectsData.filter(p => p.featured).sort(() => 0.5 - Math.random()).slice(0, 4);
        setFeatured(randomized);
    }, []);

    return (
        <div className="container" style={{ paddingTop: '80px' }}>
            <StarField />
            
            {/* HERO */}
            <header style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <div className="spline-container" style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '110%', zIndex: 1, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent 98%)' }}>
                    <spline-viewer url="https://prod.spline.design/vyQWyAKaGzlKQJKm/scene.splinecode" loading-reveal="hidden" style={{ width: '100%', height: '100%' }}></spline-viewer>
                </div>
                <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
                    <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '4px', marginBottom: '15px' }}>INTERACTIVE DESIGNER</h2>
                    <h1 className="massive-title">HELLO,<br />I'M VINIT.</h1>
                    <p style={{ marginTop: '20px', color: '#ccc', maxWidth: '450px', lineHeight: '1.6' }}>Multimedia engineer based in Ottawa. Specializing in cinematic visual storytelling and technical systems.</p>
                </div>
            </header>

            {/* VISUAL RESUME (ABOUT ME) */}
            {/* VISUAL RESUME (ABOUT ME) */}
<section style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)' }}>
    <h2 className="massive-title" style={{ fontSize: '4rem', marginBottom: '40px' }}>ABOUT ME</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px' }}>
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                 <h3 style={{ fontSize: '1.5rem', color: '#fff', fontFamily: 'var(--font-display)' }}>VINIT RAO</h3>
                 <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>GPA: 3.7 / 4.0</span>
            </div>
            <p style={{ color: '#eee', lineHeight: '1.8', marginBottom: '30px' }}>
                Interactive Multimedia and Design student at Carleton University. I architect digital experiences through end-to-end UX/UI design and custom hardware-to-engine integration.
            </p>
            <div className="glass-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="glass-card">
                    <span className="card-label">CURRENT_ROLE</span>
                    <p><b>CU Hacking</b><br/>UX/UI Designer & Motion Animator</p>
                </div>
                <div className="glass-card">
                    <span className="card-label">CORE_PROJECT</span>
                    <p><b>QueueUp</b><br/>Django Full-Stack Application</p>
                </div>
            </div>
            <a href="/Vinit_Rao_Resume.pdf" download className="glass-btn" style={{ marginTop: '30px' }}>Download Resume</a>
        </div>

        <div className="glass-card" style={{ height: 'fit-content' }}>
            <span className="card-label">TECHNICAL_STACK</span>
            <ul style={{ listStyle: 'none', color: '#ccc', fontSize: '0.85rem', lineHeight: '2.5' }}>
                <li><b style={{ color: '#fff' }}>LANGUAGES:</b> Python, Java, C++, C#, JS, SQL</li>
                <li><b style={{ color: '#fff' }}>DEV TOOLS:</b> Unity, Unreal, Django, Git, Arch Linux</li>
                <li><b style={{ color: '#fff' }}>CREATIVE:</b> After Effects, Premiere, Figma, Blender</li>
            </ul>
        </div>
    </div>
</section>

{/* FEATURED WORK */}
<section style={{ paddingBottom: '100px' }}>
    <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#888', letterSpacing: '4px' }}>SELECTED_WORKS</h2>
    <div className="accordion-wrapper">
        {featured.map((p, idx) => (
            <div key={idx} className="accordion-panel" onClick={() => window.open(p.link, '_blank')}>
                <img src={p.image} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                <video src={p.video} className="accordion-video" muted loop playsInline onMouseEnter={(e)=>e.target.play()} onMouseLeave={(e)=>e.target.pause()} />
                <div className="accordion-content">
                    <h3 className="accordion-title" style={{ fontSize: '1.2rem', color: '#fff' }}>{p.title}</h3>
                </div>
            </div>
        ))}
    </div>
</section>

            {/* SOCIALS */}
            <footer className="social-footer">
                <h2 className="massive-title" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>STAY CONNECTED</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '40px' }}>
                    <a href="https://github.com/vinit-rao" className="social-pill">GITHUB</a>
                    <a href="https://instagram.com/officialvinitrao" className="social-pill">INSTAGRAM</a>
                    <a href="https://linkedin.com/in/vinitrao1/" className="social-pill">LINKEDIN</a>
                </div>
            </footer>
        </div>
    );
};

export default Home;