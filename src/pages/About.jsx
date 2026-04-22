import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="full-width-section" style={{ borderTop: 'none', marginTop: '60px', marginBottom: '80px' }}>
      <div className="container">
        <div className="bento-grid">
          
          <div className="bento-item bento-bio">
            <h2>ABOUT ME</h2>
            <p>I am an Interactive Multimedia and Design student at Carleton University, blending cinematic visual storytelling with technical engineering. My background spans from S-Log video production and motion graphics to C# systems in Unity and physical computing with Arduino.</p>
            <p>I specialize in bridging the gap between high-fidelity aesthetic design and functional, interactive code. Currently seeking a Summer 2026 Co-op placement where I can apply my range in multimedia design and development.</p>
          </div>

          <div className="bento-item bento-academic">
            <div className="bento-title">Education</div>
            <h3>BIT, IMD</h3>
            <p>Carleton University<br/>Algonquin College<br/>Class of 2029 // GPA 9.73/12</p>
          </div>

          <div className="bento-item bento-status">
            <h3>Active</h3>
            <p>Based in Ottawa, ON<br/>Summer '26 Co-op Search</p>
          </div>

          <Link to="/contact" className="bento-item bento-contact">
            <h3>SEND A MESSAGE <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i></h3>
          </Link>

          <div className="bento-item bento-ticker">
            <div className="ticker-wrap">
              C# <span>•</span> Python <span>•</span> Java <span>•</span> Swift <span>•</span> SQL <span>•</span> HTML/CSS/JS <span>•</span> Unity <span>•</span> Unreal Engine <span>•</span> Godot <span>•</span> Django <span>•</span> After Effects <span>•</span> Premiere Pro <span>•</span> Blender <span>•</span> Figma <span>•</span> C# <span>•</span> Python <span>•</span> Java <span>•</span> Swift <span>•</span> SQL <span>•</span> HTML/CSS/JS <span>•</span> Unity <span>•</span> Unreal Engine <span>•</span> Godot <span>•</span> Django <span>•</span> After Effects <span>•</span> Premiere Pro <span>•</span> Blender <span>•</span> Figma
            </div>
          </div>

          <div className="bento-item bento-experience">
            <div className="bento-title">Selected Experience</div>
            <ul className="experience-list">
              <li>
                <div className="exp-top">
                  <span className="exp-role">UX/UI Designer & Motion Animator</span>
                  <span className="exp-date">2025 — PRES</span>
                </div>
                <span className="exp-company">CU Hacking</span>
              </li>
              <li>
                <div className="exp-top">
                  <span className="exp-role">Multimedia Designer & Videographer</span>
                  <span className="exp-date">2020 — PRES</span>
                </div>
                <span className="exp-company">Sachin Rao</span>
              </li>
              <li>
                <div className="exp-top">
                  <span className="exp-role">Freelance Video Editor</span>
                  <span className="exp-date">2024 — 2024</span>
                </div>
                <span className="exp-company">WhyDNA</span>
              </li>
            </ul>
          </div>

          <div className="bento-item bento-analog">
            <div className="bento-title">Core Disciplines</div>
            <div className="skill-tags">
              <span className="skill-tag">Full-Stack Dev</span>
              <span className="skill-tag">Game Design</span>
              <span className="skill-tag">Motion Graphics</span>
              <span className="skill-tag">UI/UX Layout</span>
              <span className="skill-tag">Videography</span>
            </div>
            <div className="bento-title" style={{ marginTop: '10px' }}>Hardware / Analog Specs</div>
            <ul>
              <li>Arduino / Physical Computing</li>
              <li>Custom Hardware Controllers</li>
              <li>Sony Cameras (FX30, A7III, A7RIII)</li>
              <li>Canon FTb QL (35mm Film)</li>
              <li>YoloBox Pro (Live Streaming)</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;