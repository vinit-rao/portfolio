import '../pages/About.css';

// About section body — rendered inside the About panel. (No page chrome/footer;
// the printer lives in its own Live tile now, so it's not included here.)
const FOCUS = [
    { label: 'Motion', tools: 'After Effects · Premiere Pro · DaVinci Resolve' },
    { label: '3D', tools: 'Blender · Maya · Houdini · Fusion 360' },
    { label: 'Craft', tools: 'Cinematography · Color grading · VFX / compositing' },
    { label: 'Build', tools: 'Python · Java · C# · Django · Unity · Arduino' },
];

const EXPERIENCE = [
    { role: 'Systems Analyst Co-op', org: 'Marcan Pharma', period: '2026' },
    { role: 'Motion Graphics / UX Designer', org: 'CU Hacking', period: '2025–26' },
    { role: 'Multimedia Designer / Cinematographer', org: 'Sachin Rao', period: '2020–26' },
    { role: 'Video Editor', org: 'WhyDNA', period: '2024' },
    { role: 'AV Technician', org: 'Ottawa Tamil Sangam', period: '2019–21' },
];

export default function AboutContent() {
    return (
        <div className="about about--panel">
            <div className="about__top">
                <div className="about__intro">
                    <h1 className="about__title display">Who am I?</h1>
                    <div className="about__bio">
                        <p>
                            Vinit is a third-year Interactive Multimedia &amp; Design student at Carleton
                            University, working in motion design and 3D. He keeps coming back to the same
                            two things — a typographic edit cut tight in After Effects, and a car animated
                            through a scene in Blender.
                        </p>
                        <p>
                            He also writes the code and wires the hardware behind his projects — full-stack
                            apps, game systems, custom Arduino controllers. The goal is simple: make work
                            that's worth pausing on, and keep leveling up.
                        </p>
                    </div>
                </div>

                <figure className="about__portrait">
                    <img src="/images/vinit.jpg" alt="Vinit Rao" loading="lazy" decoding="async" />
                    <figcaption className="mono">Vinit Rao · Ottawa, CA</figcaption>
                </figure>
            </div>

            <section className="about__focus">
                <span className="about__section-label mono">Focus</span>
                {FOCUS.map(f => (
                    <div className="about__focus-row" key={f.label}>
                        <span className="about__focus-label">{f.label}</span>
                        <span className="about__focus-tools mono">{f.tools}</span>
                    </div>
                ))}
            </section>

            <section className="about__exp">
                <span className="about__section-label mono">Experience</span>
                <ul className="about__exp-list">
                    {EXPERIENCE.map(e => (
                        <li className="about__exp-row" key={e.role + e.org}>
                            <span className="about__exp-role">{e.role}</span>
                            <span className="about__exp-org mono">{e.org}</span>
                            <span className="about__exp-period mono">{e.period}</span>
                        </li>
                    ))}
                </ul>
                <p className="about__edu mono">
                    Carleton University × Algonquin College — B.IT, Interactive Multimedia &amp; Design ·
                    2024–2029 · GPA 3.7/4.0
                </p>
            </section>

            <section className="about__resumes">
                <span className="mono about__resumes-label">Résumé — two versions</span>
                <div className="about__resume-btns">
                    <a href="/Vinit_Rao_Creative_Resume.pdf" download className="btn">
                        <i className="fas fa-download"></i> Creative resume
                    </a>
                    <a href="/Vinit_Rao_Developer_Resume.pdf" download className="btn">
                        <i className="fas fa-download"></i> Developer resume
                    </a>
                </div>
            </section>
        </div>
    );
}
