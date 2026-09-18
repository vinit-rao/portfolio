import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import projects from '../data/projects';
import Logo from './Logo';
import Tile from './Tile';
import Panel from './Panel';
import Intro from './Intro';
import LiveStatusBadge from './LiveStatusBadge';
import FeaturedTile from './FeaturedTile';
import WorkReel from './WorkReel';
import AboutContent from './AboutContent';
import ContactContent from './ContactContent';
import FunContent from './FunContent';
import './Canvas.css';

const seenIntro = () => { try { return !!localStorage.getItem('introSeen'); } catch { return false; } };

const abs = (p) => (p ? (p.startsWith('/') || p.startsWith('http') ? p : `/${p}`) : null);

// Section tiles — each owns a logo primitive + colour identity.
const SECTIONS = {
    work: { section: 'work', area: 'work', shape: 'tri', color: 'accent', tag: '01', label: 'Work', blurb: 'Motion, 3D, code & photography — a few years of making things.' },
    about: { section: 'about', area: 'about', shape: 'bar', color: 'ink', tag: '02', label: 'About', blurb: 'Motion designer & developer. The story so far.' },
    fun: { section: 'fun', area: 'fun', shape: 'circ', color: 'blue', tag: '03', label: 'For Fun', blurb: '3D prints, games & hardware — the stuff I make for me.' },
    contact: { section: 'contact', area: 'contact', shape: 'tri2', color: 'yellow', tag: '04', label: 'Contact', blurb: "Let's build something." },
};

const PANELS = { work: WorkReel, about: AboutContent, fun: FunContent, contact: ContactContent };

export default function Canvas() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const reduce = useReducedMotion();

    const seg = pathname.replace(/^\/+/, '').split('/')[0];
    const open = seg && PANELS[seg] ? seg : null;
    const PanelBody = open ? PANELS[open] : null;

    const go = (key) => navigate(key ? `/${key}` : '/');

    // Intro choreography: skip entirely under reduced-motion or when a panel is
    // deep-linked; full on first visit, quick on return.
    const [introMode] = useState(() => (seenIntro() ? 'quick' : 'full'));
    const [introDone, setIntroDone] = useState(() => reduce || !!open);
    useEffect(() => { try { localStorage.setItem('introSeen', '1'); } catch { /* ignore */ } }, []);

    const featured = projects.filter(p => p.featured && p.image);
    const carousel = featured.length ? featured : projects.filter(p => p.image).slice(0, 6);

    return (
        <div className="cnv">
            <motion.header
                className="cnv__chrome"
                inert={(open || !introDone) ? true : undefined}
                initial={false}
                animate={{ opacity: introDone ? 1 : 0 }}
                transition={{ duration: 0.4 }}
            >
                <button type="button" className="cnv__mark" onClick={() => go(null)} aria-label="Home">
                    <Logo className="cnv__logo" />
                    <span className="cnv__mark-text mono">VINIT RAO</span>
                </button>
                <button type="button" className="cnv__theme mono" onClick={toggleTheme}>
                    {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
            </motion.header>

            <motion.main
                id="main"
                className="cnv__grid"
                inert={(open || !introDone) ? true : undefined}
                initial={false}
                animate={{ opacity: introDone ? 1 : 0 }}
                transition={{ duration: 0.5, delay: introDone ? 0.05 : 0 }}
            >
                {/* hero — the focal tile */}
                <Tile {...SECTIONS.work} big onOpen={() => go('work')}>
                    <span className="tile__stat mono">{projects.length} pieces · motion · 3D · code · photo</span>
                    <span className="tile__cta mono">Explore the reel <i className="fas fa-arrow-right"></i></span>
                </Tile>

                <Tile {...SECTIONS.about} onOpen={() => go('about')}>
                    <span className="tile__note mono">Carleton IMD · Ottawa</span>
                </Tile>

                <Tile {...SECTIONS.fun} onOpen={() => go('fun')}>
                    <LiveStatusBadge />
                </Tile>

                {/* featured carousel — the one moving-image tile */}
                <FeaturedTile items={carousel} onOpen={() => go('work')} />

                <Tile {...SECTIONS.contact} onOpen={() => go('contact')}>
                    <span className="tile__note mono">Ottawa · Open to Winter 2027 co-op</span>
                </Tile>

                {/* résumé — two versions, direct download */}
                <div className="tile mini mini--resume" style={{ gridArea: 'resume' }}>
                    <span className="mini__tag mono">Résumé — two versions</span>
                    <div className="resume__btns">
                        <a href="/Vinit_Rao_Creative_Resume.pdf" download className="resume__btn">
                            <span className="resume__btn-ico" aria-hidden="true"><i className="fas fa-file-arrow-down"></i></span>
                            <span className="resume__btn-main">Creative</span>
                            <span className="resume__btn-sub mono">Motion · 3D · film</span>
                        </a>
                        <a href="/Vinit_Rao_Developer_Resume.pdf" download className="resume__btn">
                            <span className="resume__btn-ico" aria-hidden="true"><i className="fas fa-file-arrow-down"></i></span>
                            <span className="resume__btn-main">Developer</span>
                            <span className="resume__btn-sub mono">Full-stack · systems</span>
                        </a>
                    </div>
                </div>
            </motion.main>

            <AnimatePresence>
                {open && (
                    <Panel
                        key={open}
                        section={open}
                        shape={SECTIONS[open].shape}
                        color={SECTIONS[open].color}
                        title={SECTIONS[open].label}
                        onClose={() => go(null)}
                    >
                        <PanelBody />
                    </Panel>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!introDone && <Intro key="intro" mode={introMode} onDone={() => setIntroDone(true)} />}
            </AnimatePresence>
        </div>
    );
}
