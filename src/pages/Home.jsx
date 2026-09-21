import { useMemo, useState, useEffect } from 'react';
import projects from '../data/projects';
import ArchiveModal from '../components/ArchiveModal';
import PrinterPanel from '../components/PrinterPanel';
import Logo from '../components/Logo';
import './Home.css';

const abs = (p) => (p ? (p.startsWith('/') || p.startsWith('http') ? p : `/${p}`) : null);

const NAVLINKS = [
    { href: '#work', label: 'Work' },
    { href: '#toolkit', label: 'Toolkit' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
];

// Curated hero reel — the exact clips Vinit wants, cycled one after another.
const REEL_VIDS = [
    'videos/blender-car-animation.mp4', // Blender Car Animation
    'videos/renault5-drift.mp4',        // Renault 5 Drift
    'videos/project_25.mp4',            // Benny's Frozen Adventure
    'videos/project_15.mp4',            // Mad Typography Edit
    'videos/project_34.mp4',            // WhyDNA Edit
    'videos/project_20.mp4',            // Retro Adventure Trailer
    'videos/project_18.mp4',            // Wedding Reception Highlight
    'videos/project_17.mp4',            // Forest Animation
    'videos/project_23.mp4',            // Beach Diorama
    'videos/project_13.mp4',            // CU Hacking Animation
    'videos/project_32.mp4',            // Heartless Edit
    'videos/project_1.mp4',             // Introducing RAVO
    'videos/project_7.mp4',             // Wendy's Commercial
    'videos/project_29.mp4',            // Soupcan Test
    'videos/project_14.mp4',            // AE Exercises #1
    'videos/project_30.mp4',            // Bubblz Animation
];

// Two-column toolkit. `s` = simpleicons.org slug (null → falls back to the
// lettered monogram). `core` tools get the red badge.
const TOOLKIT = [
    { group: 'Creative', sub: 'Motion · Design · 3D', items: [
        // motion / video
        { lg: 'adobe-after-effects', m: 'Ae', n: 'After Effects' },
        { lg: 'adobe-premiere', m: 'Pr', n: 'Premiere Pro' },
        { s: 'davinciresolve', ic: 'AEC6E0', m: 'Dv', n: 'DaVinci Resolve' },
        // design
        { lg: 'adobe-photoshop', m: 'Ps', n: 'Photoshop' },
        { lg: 'adobe-illustrator', m: 'Ai', n: 'Illustrator' },
        { lg: 'adobe-indesign', m: 'Id', n: 'InDesign' },
        { lg: 'figma', m: 'Fg', n: 'Figma' },
        // 3d
        { lg: 'blender', m: 'Bl', n: 'Blender' },
        { s: 'autodeskmaya', m: 'Ma', n: 'Maya' },
        { s: 'houdini', m: 'Ho', n: 'Houdini' },
        { dv: 'fusion', m: 'F3', n: 'Fusion 360' },
    ] },
    { group: 'Developer', sub: 'Languages · Web · Engines · Data', items: [
        // languages
        { lg: 'python', m: 'Py', n: 'Python' },
        { lg: 'c-sharp', m: 'C#', n: 'C#' },
        { lg: 'java', m: 'Jv', n: 'Java' },
        { lg: 'c-plusplus', m: 'C+', n: 'C / C++' },
        { lg: 'javascript', m: 'Js', n: 'JavaScript' },
        // web
        { lg: 'html-5', m: 'Ht', n: 'HTML5' },
        { lg: 'css-3', m: 'Cs', n: 'CSS3' },
        { s: 'django', ic: '4FC99B', m: 'Dj', n: 'Django' },
        { lg: 'postgresql', m: 'Sq', n: 'SQL' },
        // engines / interactive
        { s: 'unity', ic: 'ECECE7', m: 'Un', n: 'Unity' },
        { s: 'unrealengine', ic: 'ECECE7', m: 'Ue', n: 'Unreal' },
        { lg: 'arduino', m: 'Ar', n: 'Arduino' },
        // tools / data
        { lg: 'git-icon', m: 'Gt', n: 'Git' },
        { lg: 'microsoft-power-bi', m: 'Bi', n: 'Power BI' },
        { lg: 'databricks-icon', m: 'Db', n: 'Databricks' },
        { lg: 'sap', m: 'Sp', n: 'SAP' },
    ] },
];

const EXPERIENCE = [
    { role: 'Systems Analyst Co-op', org: 'Marcan Pharma', period: '2026' },
    { role: 'Motion Graphics / UX Designer', org: 'CU Hacking', period: '2025–26' },
    { role: 'Multimedia Designer / Cinematographer', org: 'Sachin Rao', period: '2020–26' },
    { role: 'Video Editor', org: 'WhyDNA', period: '2024' },
    { role: 'AV Technician', org: 'Ottawa Tamil Sangam', period: '2019–21' },
];

const FACTS = [
    { k: 'Based in', v: 'Ottawa, ON · Canada' },
    { k: 'Availability', v: 'Winter 2027 · 4 / 8 / 12-month' },
    { k: 'Work model', v: 'On-site · Hybrid · Remote' },
    { k: 'Eligibility', v: 'US & Canadian citizen' },
];

const FILTERS = ['all', 'graphics', 'video', 'code', 'photos', 'hardware'];
const PAGE = 18;

const glow = (e) => { const el = e.currentTarget; el.classList.remove('glow'); void el.offsetWidth; el.classList.add('glow'); };

// One toolkit tile — official icon in its real brand color, with a graceful
// (brand-tinted) monogram fallback for tools with no free icon (Adobe, Power BI).
// Icons sit on a fixed dark chip. Source per tool: `lg` = Iconify full-colour
// logo, `dv` = Iconify devicon, `s` = Simple Icons (with optional `ic` colour
// for logos too dark on the chip). Falls back to a lettered monogram.
function ToolTile({ lg, dv, s, ic, m, c, n }) {
    const url = lg ? `https://api.iconify.design/logos/${lg}.svg`
        : dv ? `https://api.iconify.design/devicon/${dv}.svg`
        : s ? `https://cdn.simpleicons.org/${s}${ic ? '/' + ic : ''}`
        : null;
    const [ok, setOk] = useState(!!url);
    return (
        <div className="tk__tile">
            <span className="tk__badge">
                {ok
                    ? <img src={url} alt="" loading="lazy" onError={() => setOk(false)} />
                    : <span className="tk__mono" style={c ? { color: c } : undefined}>{m}</span>}
            </span>
            <span className="tk__name">{n}</span>
        </div>
    );
}

export default function Home() {
    const [active, setActive] = useState(null);
    const [filter, setFilter] = useState('all');
    const [shown, setShown] = useState(PAGE);
    const [menu, setMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [resPop, setResPop] = useState(false);
    const [printerPop, setPrinterPop] = useState(false);
    const [heroIdx, setHeroIdx] = useState(0);
    const [intro, setIntro] = useState(() => {
        if (typeof window === 'undefined') return false;
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
        try { return !sessionStorage.getItem('vr-intro'); } catch { return true; }
    });

    useEffect(() => {
        const f = () => setScrolled(window.scrollY > 12);
        f(); window.addEventListener('scroll', f, { passive: true });
        return () => window.removeEventListener('scroll', f);
    }, []);

    // Logo intro — plays once per session, then dissolves into the site.
    useEffect(() => {
        if (!intro) return;
        document.body.style.overflow = 'hidden';
        try { sessionStorage.setItem('vr-intro', '1'); } catch { /* private mode */ }
        const t = setTimeout(() => { setIntro(false); document.body.style.overflow = ''; }, 2100);
        return () => { clearTimeout(t); document.body.style.overflow = ''; };
    }, [intro]);

    // Close popups on Escape.
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') { setResPop(false); setPrinterPop(false); } };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const withImg = useMemo(() => projects.filter(p => p.image), []);
    const featured = useMemo(() => projects.filter(p => p.featured && (p.image || p.video)), []);

    const heroReel = useMemo(
        () => REEL_VIDS.map(v => projects.find(p => p.video === v)).filter(Boolean),
        []
    );
    const current = heroReel[heroIdx % (heroReel.length || 1)] || featured[0] || withImg[0];

    const bigFeat = featured[0] || withImg[0];
    const cuHack = useMemo(() => projects.find(p => p.title === 'CU Hacking Animation'), []);
    const spotlight = [bigFeat, cuHack].filter(Boolean);
    const spotTitles = new Set(spotlight.map(p => p.title));
    const gridFeat = useMemo(() => [
        ...featured.filter(p => !spotTitles.has(p.title)),
        ...withImg.filter(p => !spotTitles.has(p.title) && !p.featured),
    ].slice(0, 4), [featured, withImg]); // eslint-disable-line react-hooks/exhaustive-deps

    const counts = useMemo(() => {
        const c = { all: withImg.length };
        withImg.forEach(p => { const k = p.category?.toLowerCase(); if (k) c[k] = (c[k] || 0) + 1; });
        return c;
    }, [withImg]);

    const archiveList = useMemo(
        () => (filter === 'all' ? withImg : withImg.filter(p => p.category?.toLowerCase() === filter)),
        [filter, withImg]
    );
    const archiveShown = archiveList.slice(0, shown);
    const pick = (f) => { setFilter(f); setShown(PAGE); };

    return (
        <>
            {/* logo intro */}
            {intro && (
                <div className="intro" aria-hidden="true">
                    <Logo className="intro__logo" />
                </div>
            )}

            {/* grain */}
            <svg className="grain" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>

            {/* nav */}
            <header className={`cnav ${scrolled ? 'is-scrolled' : ''}`}>
                <div className="wrap cnav__inner">
                    <a className="cnav__brand" href="#top" onClick={() => setMenu(false)} aria-label="Vinit Rao — top">
                        <Logo className="cnav__logo" />
                        <span className="cnav__id"><b>VINIT RAO</b><span className="mono">CG GENERALIST</span></span>
                    </a>
                    <nav className={`cnav__links ${menu ? 'is-open' : ''}`} aria-label="Primary">
                        {NAVLINKS.map(l => <a key={l.href} href={l.href} onClick={() => setMenu(false)}>{l.label}</a>)}
                        <button type="button" className="res" onClick={() => { setResPop(true); setMenu(false); }}>Résumé</button>
                    </nav>
                    <button className={`cnav__burger ${menu ? 'is-open' : ''}`} onClick={() => setMenu(m => !m)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
                        <span></span><span></span>
                    </button>
                </div>
            </header>

            {/* hero — cycling reel */}
            <header className="chero" id="top">
                <div className="chero__media">
                    {current?.video
                        ? <video
                            key={current.video}
                            src={abs(current.video)}
                            poster={abs(current.image)}
                            muted playsInline autoPlay preload="auto"
                            loop={heroReel.length <= 1}
                            onEnded={() => setHeroIdx(i => (i + 1) % heroReel.length)} />
                        : current?.image ? <img src={abs(current.image)} alt="" /> : null}
                    <div className="chero__grade" aria-hidden="true"></div>
                    <div className="chero__vig" aria-hidden="true"></div>
                </div>
                <div className="wrap chero__id">
                    <p className="mono chero__eyebrow">Ottawa, CA · Portfolio 2026</p>
                    <h1 className="display chero__name">VINIT&nbsp;RAO</h1>
                    <p className="chero__role">CG Generalist <span>—</span> Motion, 3D &amp; VFX, and the code behind it.</p>
                    <div className="chero__meta mono">
                        <span className="live"><span className="dot"></span> Open to Winter 2027 co-op</span>
                        <span>US &amp; Canadian citizen</span>
                    </div>
                    <div className="chero__cta">
                        <a href="#contact" className="btn btn-accent">Contact me <i className="fas fa-arrow-right"></i></a>
                        <a href="#work" className="btn">See the work</a>
                    </div>
                    <button className="chero__play" onClick={() => current && setActive(current)} aria-label={`Watch ${current?.title || 'the reel'}`}>
                        <span className="chero__playbtn"><i className="fas fa-play"></i></span>
                        <span className="chero__rl mono">Reel · {current?.title || 'Selected work'}</span>
                    </button>
                </div>
                {heroReel.length > 1 && (
                    <div className="chero__dots" aria-hidden="true">
                        {heroReel.map((p, i) => (
                            <button key={p.title + i} type="button" className={`chero__dot ${i === heroIdx ? 'on' : ''}`} onClick={() => setHeroIdx(i)} tabIndex={-1} aria-label={p.title} />
                        ))}
                    </div>
                )}
            </header>

            <main id="main">
                {/* selected work */}
                <section id="work" className="wrap sec">
                    <div className="sechead">
                        <h2 className="display">Selected work</h2>
                        <a className="sechead__link mono" href="#archive">Full archive — {withImg.length} pieces →</a>
                    </div>

                    <div className="spot">
                        {spotlight.map((p, i) => (
                            <button key={p.title} type="button" className="spotcard" onClick={() => setActive(p)}>
                                <div className="spotcard__media">
                                    {p.video
                                        ? <video src={abs(p.video)} poster={abs(p.image)} muted loop autoPlay playsInline preload="metadata" />
                                        : <img src={abs(p.image)} alt={p.title} loading="lazy" />}
                                    {p.category && <span className="spotcard__badge mono">{p.category}</span>}
                                    <span className="spotcard__num display">{String(i + 1).padStart(2, '0')}</span>
                                </div>
                                <div className="spotcard__body">
                                    <div>
                                        <h3 className="display">{p.title}</h3>
                                        <p className="spotcard__desc">{p.description}</p>
                                    </div>
                                    <span className="spotcard__watch mono">Look closer ↗</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="cgrid">
                        {gridFeat.map((p, i) => (
                            <button key={p.title + i} type="button" className="ccard" onClick={() => setActive(p)}>
                                <div className="ccard__media">
                                    <img src={abs(p.image)} alt={p.title} loading="lazy" />
                                    {p.category && <span className="ccard__cat mono">{p.category}</span>}
                                </div>
                                <div className="ccard__foot">
                                    <h3>{p.title}</h3>
                                    <span className="ccard__disc mono">{String(i + 3).padStart(2, '0')}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* toolkit */}
                <section id="toolkit" className="wrap sec">
                    <div className="sechead"><h2 className="display">The toolkit</h2><span className="sechead__link mono" style={{ pointerEvents: 'none' }}>What I actually work in</span></div>
                    <p className="tk__lede">Comfortable across the whole pipeline — from a tight edit, to a lit 3D scene, to the app that ships it.</p>
                    <div className="tk__cols">
                        {TOOLKIT.map(col => (
                            <div className="tk__col" key={col.group}>
                                <div className="tk__colhd">
                                    <h3>{col.group}</h3>
                                    <span className="mono">{col.sub}</span>
                                </div>
                                <div className="tk__grid">
                                    {col.items.map(it => <ToolTile key={it.n} {...it} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* full archive */}
                <section id="archive" className="wrap sec">
                    <div className="sechead"><h2 className="display">The full archive</h2><span className="sechead__link mono" style={{ pointerEvents: 'none' }}>{withImg.length} pieces · 2019–26</span></div>
                    <div className="arch__filters">
                        {FILTERS.map(f => (
                            <button key={f} type="button" className={`chip mono ${filter === f ? 'on' : ''}`} onClick={() => pick(f)} aria-pressed={filter === f}>
                                {f === 'all' ? 'All' : f} <span className="chip__n">{counts[f] || 0}</span>
                            </button>
                        ))}
                    </div>
                    <div className="arch__grid">
                        {archiveShown.map((p, i) => (
                            <button key={p.title + i} type="button" className="athumb" onClick={() => setActive(p)} aria-label={`${p.title} — open`}>
                                <img src={abs(p.image)} alt="" loading="lazy" />
                                <span className="athumb__t mono">{p.title}<span className="athumb__c">{p.category}</span></span>
                            </button>
                        ))}
                    </div>
                    {archiveShown.length < archiveList.length && (
                        <div className="arch__more">
                            <button type="button" className="btn" onClick={() => setShown(s => s + PAGE)}>
                                Load more — {archiveList.length - archiveShown.length} to go ↓
                            </button>
                        </div>
                    )}
                </section>

                {/* about */}
                <section id="about" className="wrap sec cabout">
                    <div className="cabout__top">
                        <div className="cabout__intro">
                            <p className="cabout__stmt">Third-year Interactive Multimedia &amp; Design student at Carleton, working across motion, 3D, and the code and hardware behind it — <span className="hl">always learning as I go.</span></p>
                            <ul className="cabout__facts">
                                {FACTS.map(f => (
                                    <li key={f.k}><span className="mono cabout__fk">{f.k}</span><span className="cabout__fv">{f.v}</span></li>
                                ))}
                            </ul>
                        </div>
                        <figure className="cabout__portrait">
                            <div className="cabout__imgwrap"><img src="/images/vinit.jpg" alt="Vinit Rao" loading="lazy" /></div>
                            <figcaption className="mono">Vinit Rao · Ottawa, CA</figcaption>
                        </figure>
                    </div>
                    <ul className="cabout__exp">
                        {EXPERIENCE.map(e => (
                            <li key={e.role + e.org}>
                                <span className="cabout__role">{e.role}</span>
                                <span className="cabout__org mono">{e.org}</span>
                                <span className="cabout__yr mono">{e.period}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="cabout__edu mono">Carleton University × Algonquin College — B.IT, Interactive Multimedia &amp; Design · 2024–2029 · GPA 3.7/4.0</p>
                </section>

                {/* contact */}
                <section id="contact" className="wrap sec ccontact">
                    <p className="mono mono-accent">Get in touch</p>
                    <h2 className="display ccontact__big">Let's build<br />something.</h2>
                    <div className="ccontact__grid">
                        <div className="ccontact__info">
                            <a className="ccontact__mail" href="mailto:vinitrao@gmail.com">vinitrao@gmail.com</a>
                            <a className="ccontact__line ulink" href="tel:+16135010749">613 501 0749</a>
                            <p className="ccontact__muted">Ottawa, ON · Canada — US &amp; Canadian citizen. Open to relocating anywhere in North America.</p>
                            <div className="rescards">
                                <a className="rescard" data-res data-kind="creative" href="/Vinit_Rao_Creative_Resume.pdf" download onClick={glow}>
                                    <span className="rescard__fx" aria-hidden="true"></span>
                                    <span className="rescard__k mono">Download · PDF</span>
                                    <span className="rescard__t">Creative résumé</span>
                                    <span className="rescard__s mono">Motion · 3D · film</span>
                                </a>
                                <a className="rescard" data-res data-kind="dev" href="/Vinit_Rao_Developer_Resume.pdf" download onClick={glow}>
                                    <span className="rescard__fx" aria-hidden="true"></span>
                                    <span className="rescard__k mono">Download · PDF</span>
                                    <span className="rescard__t">Developer résumé</span>
                                    <span className="rescard__s mono">Full-stack · systems</span>
                                </a>
                            </div>
                        </div>
                        <form className="ccontact__form" action="https://formspree.io/f/mojnppzg" method="POST">
                            <input type="text" name="name" placeholder="Name" aria-label="Your name" className="field" required />
                            <input type="email" name="email" placeholder="Email" aria-label="Your email" className="field" required />
                            <textarea name="message" placeholder="Message" aria-label="Your message" className="field ccontact__msg" rows="4" required></textarea>
                            <button type="submit" className="btn btn-accent">Send message <i className="fas fa-arrow-right"></i></button>
                        </form>
                    </div>
                </section>

                <footer className="wrap cfoot">
                    <span className="mono cfoot__id">
                        2027 Vinit Rao
                        <button className="cfoot__star" onClick={() => setPrinterPop(true)} aria-label="Secret — open the live workshop" title="✦">✦</button>
                    </span>
                    <div className="cfoot__soc mono">
                        <a href="https://github.com/vinit-rao" target="_blank" rel="noreferrer">GitHub</a>
                        <a href="https://linkedin.com/in/vinitrao1/" target="_blank" rel="noreferrer">LinkedIn</a>
                        <a href="https://youtube.com/@OfficialVinitRao" target="_blank" rel="noreferrer">YouTube</a>
                        <a href="https://instagram.com/instavinitgram" target="_blank" rel="noreferrer">Instagram</a>
                    </div>
                    <span className="mono">Ottawa, CA · CG Generalist</span>
                </footer>
            </main>

            {/* résumé chooser */}
            {resPop && (
                <div className="respop" role="dialog" aria-modal="true" aria-label="Download résumé" onClick={() => setResPop(false)}>
                    <div className="respop__box" onClick={e => e.stopPropagation()}>
                        <span className="respop__fx respop__fx--creative" aria-hidden="true"></span>
                        <span className="respop__fx respop__fx--dev" aria-hidden="true"></span>
                        <button className="respop__x" onClick={() => setResPop(false)} aria-label="Close">×</button>
                        <p className="mono mono-accent">Download résumé</p>
                        <h3 className="display respop__h">Pick the right one.</h3>
                        <div className="respop__cards">
                            <a className="rescard" data-kind="creative" href="/Vinit_Rao_Creative_Resume.pdf" download onClick={(e) => { glow(e); setTimeout(() => setResPop(false), 450); }}>
                                <span className="rescard__fx" aria-hidden="true"></span>
                                <span className="rescard__k mono">Download · PDF</span>
                                <span className="rescard__t">Creative résumé</span>
                                <span className="rescard__s mono">Motion · 3D · film</span>
                            </a>
                            <a className="rescard" data-kind="dev" href="/Vinit_Rao_Developer_Resume.pdf" download onClick={(e) => { glow(e); setTimeout(() => setResPop(false), 450); }}>
                                <span className="rescard__fx" aria-hidden="true"></span>
                                <span className="rescard__k mono">Download · PDF</span>
                                <span className="rescard__t">Developer résumé</span>
                                <span className="rescard__s mono">Full-stack · systems</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* secret workshop — live 3D printer */}
            {printerPop && (
                <div className="printerpop" role="dialog" aria-modal="true" aria-label="Live 3D printer" onClick={() => setPrinterPop(false)}>
                    <div className="printerpop__box" onClick={e => e.stopPropagation()}>
                        <button className="respop__x" onClick={() => setPrinterPop(false)} aria-label="Close">×</button>
                        <p className="mono mono-accent">Off the clock · you found it</p>
                        <h3 className="display respop__h">The workshop.</h3>
                        <PrinterPanel />
                    </div>
                </div>
            )}

            {active && <ArchiveModal project={active} onClose={() => setActive(null)} />}
        </>
    );
}
