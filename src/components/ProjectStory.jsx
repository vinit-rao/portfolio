import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const abs = (p) => (p ? (p.startsWith('/') || p.startsWith('http') ? p : `/${p}`) : null);
const ACCENTS = ['var(--accent)', 'var(--bau-blue)', 'var(--bau-yellow)'];
const LINK_LABEL = { youtube: 'Watch', github: 'Source', photo: 'Gallery', live: 'Live view' };

// One project as a full alternating media/info section. Media autoplays (muted,
// looped) only while in view; the section reveals on scroll. Index cycles the
// Bauhaus tri-colour for accent rhythm.
export default function ProjectStory({ project, index }) {
    const reduce = useReducedMotion();
    const vidRef = useRef(null);

    const accent = ACCENTS[index % 3];
    const num = String(index + 1).padStart(2, '0');

    // autoplay only while on screen
    useEffect(() => {
        const v = vidRef.current;
        if (!v) return;
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) v.play?.().catch(() => {}); else v.pause?.(); },
            { threshold: 0.35 }
        );
        io.observe(v);
        return () => io.disconnect();
    }, []);

    const tools = (project.badges || []).flatMap(b => String(b).split('|')).map(s => s.trim()).filter(Boolean);
    const links = [];
    if (project.link) links.push({ href: project.link, label: LINK_LABEL[project.linkType] || 'View' });
    if (project.github && project.github !== project.link) links.push({ href: project.github, label: 'Source' });

    return (
        <motion.section
            id={`story-${index}`}
            className="story"
            data-side={index % 2 === 0 ? 'left' : 'right'}
            initial={reduce ? false : { opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="story__media">
                {project.video
                    ? <video ref={vidRef} src={abs(project.video)} poster={abs(project.image)} muted loop playsInline preload="none" />
                    : <img src={abs(project.image || project.images?.[0])} alt={project.title} loading="lazy" decoding="async" />}
            </div>

            <div className="story__info">
                <span className="story__num display" style={{ color: accent }}>{num}</span>
                {project.category && <span className="story__cat mono">{project.category}</span>}
                <h3 className="story__title display">{project.title}</h3>
                <p className="story__desc">{project.longDescription || project.description}</p>

                {tools.length > 0 && (
                    <div className="story__tools mono">
                        {tools.map((t, i) => <span key={i} className="story__tool">{t}</span>)}
                    </div>
                )}

                {links.length > 0 && (
                    <div className="story__links">
                        {links.map((l, i) => (
                            <a key={i} href={l.href} target="_blank" rel="noreferrer" className="story__link mono" style={{ '--lc': accent }}>
                                {l.label} <i className="fas fa-arrow-up-right-from-square"></i>
                            </a>
                        ))}
                    </div>
                )}

                <span className="story__rule" style={{ background: accent }} aria-hidden="true" />
            </div>
        </motion.section>
    );
}
