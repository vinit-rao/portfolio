const About = () => {
  return (
    <div className="container" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      
      <header style={{ marginBottom: '80px' }}>
        <h1 className="massive-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', textAlign: 'left' }}>MULTIMEDIA<br/>ENGINEER</h1>
        <p className="sub-title" style={{ textAlign: 'left', maxWidth: '800px', fontSize: '1rem', color: '#ccc', textTransform: 'none', letterSpacing: 'normal' }}>
          I am an Interactive Multimedia and Design student at Carleton University, blending cinematic visual storytelling with technical engineering. My background spans from S-Log video production and motion graphics to C# systems in Unity and physical computing with Arduino. Currently seeking a Summer 2026 Co-op placement.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        
        <div className="glass-card" style={{ padding: '40px', cursor: 'default' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '30px', letterSpacing: '2px' }}>Experience</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff' }}>CU Hacking</h4>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>UX/UI Designer & Motion Animator // 2025 - PRES</p>
            </li>
            <li>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff' }}>Sachin Rao</h4>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>Multimedia Designer & Videographer // 2020 - PRES</p>
            </li>
            <li>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff' }}>WhyDNA</h4>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>Freelance Video Editor // 2024</p>
            </li>
          </ul>
        </div>

        <div className="glass-card" style={{ padding: '40px', cursor: 'default' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '30px', letterSpacing: '2px' }}>Disciplines & Hardware</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
            {['Full-Stack Dev', 'Game Design', 'Motion Graphics', 'UI/UX Layout', 'Videography'].map((skill, i) => (
              <span key={i} style={{ padding: '8px 16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '100px', fontSize: '0.75rem', color: '#ccc' }}>{skill}</span>
            ))}
          </div>
          <ul style={{ listStyle: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#888', lineHeight: '2' }}>
            <li><span style={{ color: 'var(--accent)' }}>›</span> Arduino / Physical Computing</li>
            <li><span style={{ color: 'var(--accent)' }}>›</span> Custom Hardware Controllers</li>
            <li><span style={{ color: 'var(--accent)' }}>›</span> Sony Cameras (FX30, A7III)</li>
            <li><span style={{ color: 'var(--accent)' }}>›</span> Canon FTb QL (35mm Film)</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default About;