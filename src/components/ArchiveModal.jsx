import { useEffect, useRef } from 'react';
import './ArchiveModal.css';

const abs = (p) => (p ? (p.startsWith('/') || p.startsWith('http') ? p : `/${p}`) : null);
const ytId = (url = '') => {
    const m = url.match(/(?:v=|youtu\.be\/|\/shorts\/|\/embed\/)([\w-]{11})/);
    return m ? m[1] : null;
};

const actionLabel = (p) => {
    switch (p.linkType) {
        case 'youtube': return 'Watch on YouTube';
        case 'github': return 'Source code';
        case 'photo': return 'Full gallery';
        default: return 'View project';
    }
};

const ArchiveModal = ({ project, onClose }) => {
    const panelRef = useRef(null);
    const closeRef = useRef(null);
    const lastFocused = useRef(null);

    useEffect(() => {
        lastFocused.current = document.activeElement;
        document.body.style.overflow = 'hidden';
        const t = setTimeout(() => closeRef.current?.focus(), 0);
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab' && panelRef.current) {
                const f = panelRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
                if (!f.length) return;
                const first = f[0], last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            clearTimeout(t);
            document.body.style.overflow = '';
            lastFocused.current?.focus?.();
        };
    }, [onClose]);

    const p = project;
    const id = p.linkType === 'youtube' || /youtu/.test(p.link || '') ? ytId(p.link) : null;
    const badges = (p.badges || []).flatMap(b => b.split('|')).map(b => b.trim()).filter(Boolean);
    const sections = p.sections || [];

    return (
        <div className="amod" role="dialog" aria-modal="true" aria-labelledby="amod-title" onClick={onClose}>
            <div className="amod__panel" ref={panelRef} onClick={(e) => e.stopPropagation()}>
                <div className="amod__head">
                    <span className="amod__cat mono">{p.category}</span>
                    <button className="amod__close" ref={closeRef} onClick={onClose} aria-label="Close">
                        <i className="fas fa-xmark"></i>
                    </button>
                </div>

                <div className="amod__scroll">
                    <h2 className="amod__title" id="amod-title">{p.title}</h2>

                    <div className="amod__media">
                        {id ? (
                            <div className="amod__video">
                                <iframe src={`https://www.youtube.com/embed/${id}`} title={p.title}
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                            </div>
                        ) : p.video ? (
                            <div className="amod__video">
                                <video src={abs(p.video)} controls playsInline preload="metadata" poster={abs(p.image)}></video>
                            </div>
                        ) : p.iframe ? (
                            <div className="amod__video">
                                <iframe src={p.iframe} title={p.title} allowFullScreen loading="lazy"></iframe>
                            </div>
                        ) : p.images?.length ? (
                            <div className="amod__gallery">
                                {p.images.map((im, i) => <img key={i} src={abs(im)} alt={`${p.title} ${i + 1}`} loading="lazy" />)}
                            </div>
                        ) : (
                            <img className="amod__img" src={abs(p.image)} alt={p.title} loading="lazy" />
                        )}
                    </div>

                    <p className="amod__desc">{p.longDescription || p.description}</p>

                    {sections.map((s, i) => (
                        <div className="amod__section" key={i}>
                            <h3>{s.heading}</h3>
                            <p>{s.body}</p>
                        </div>
                    ))}

                    {badges.length > 0 && (
                        <div className="amod__tags">
                            {badges.map((b, i) => <span key={i} className="amod__tag mono">{b}</span>)}
                        </div>
                    )}

                    <div className="amod__actions">
                        {p.link && p.link !== '#' && (
                            <a href={p.link} target="_blank" rel="noreferrer" className="btn btn-accent">
                                {actionLabel(p)} <i className="fas fa-arrow-up-right-from-square"></i>
                            </a>
                        )}
                        {p.github && (
                            <a href={p.github} target="_blank" rel="noreferrer" className="btn">
                                Source code <i className="fab fa-github"></i>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchiveModal;
