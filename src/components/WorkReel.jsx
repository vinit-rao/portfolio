import { useState, useEffect } from 'react';
import projects from '../data/projects';
import ProjectStory from './ProjectStory';
import WorkGrid from './WorkGrid';
import './WorkReel.css';

const ACCENTS = ['var(--accent)', 'var(--bau-blue)', 'var(--bau-yellow)'];
// Curated heroes = featured projects with media; the rest live in the archive grid.
const STORIES = projects.filter(p => p.featured && (p.image || p.video)).slice(0, 8);

export default function WorkReel() {
    const [active, setActive] = useState(0);

    // highlight the rail dot for whichever story is centred
    useEffect(() => {
        const secs = [...document.querySelectorAll('.reel .story')];
        if (!secs.length) return;
        const io = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) setActive(Number(e.target.id.replace('story-', '')));
            }),
            { threshold: 0.5 }
        );
        secs.forEach(s => io.observe(s));
        return () => io.disconnect();
    }, []);

    const jump = (i) => (e) => {
        e.preventDefault();
        document.getElementById(`story-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="reel">
            {STORIES.length > 1 && (
                <nav className="reel__rail" aria-label="Jump to project">
                    {STORIES.map((p, i) => (
                        <a
                            key={p.title + i}
                            href={`#story-${i}`}
                            onClick={jump(i)}
                            className={`reel__dot ${i === active ? 'is-active' : ''}`}
                            style={{ '--dc': ACCENTS[i % 3] }}
                            aria-label={`${String(i + 1).padStart(2, '0')} — ${p.title}`}
                            aria-current={i === active ? 'true' : undefined}
                        >
                            <span className="reel__dot-num mono">{String(i + 1).padStart(2, '0')}</span>
                        </a>
                    ))}
                </nav>
            )}

            <div className="reel__stories">
                {STORIES.map((p, i) => <ProjectStory key={p.title + i} project={p} index={i} />)}
            </div>

            <section className="reel__archive">
                <span className="about__section-label mono">The rest of the archive</span>
                <WorkGrid />
            </section>
        </div>
    );
}
