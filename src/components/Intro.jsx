import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import './Intro.css';

// Signature intro: the four VR-logo primitives orbit in, assemble into the
// monogram, pulse, then the overlay bursts away to reveal the bento grid.
// `mode`: 'full' (first visit) | 'quick' (return visit). Click / Esc / Enter /
// Space skips. (Reduced-motion callers just don't mount this at all.)

const DUR = { full: 2100, quick: 650 };

// Each primitive + where it flies in from (scattered → assembled).
const SHAPES = [
    { key: 'tri', el: 'path', props: { d: 'M0 0L400 600H0.000330749L0 0Z' }, fill: 'var(--accent)', from: { x: -340, y: -160, rotate: -45 } },
    { key: 'bar', el: 'rect', props: { x: 400, y: 0.001, width: 200, height: 600 }, fill: 'var(--text)', from: { y: -380 } },
    { key: 'circ', el: 'ellipse', props: { cx: 801, cy: 200, rx: 200, ry: 200 }, fill: 'var(--bau-blue)', from: { x: 380, y: -190, scale: 0.15 } },
    { key: 'tri2', el: 'path', props: { d: 'M1000 599.999L600 399.999H1000L1000 599.999Z' }, fill: 'var(--bau-yellow)', from: { x: 300, y: 210, rotate: 60 } },
];

export default function Intro({ mode = 'full', onDone }) {
    const done = useRef(false);
    const finish = useCallback(() => {
        if (done.current) return;
        done.current = true;
        onDone();
    }, [onDone]);

    useEffect(() => {
        const t = setTimeout(finish, DUR[mode] ?? DUR.full);
        const onKey = (e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish();
        };
        document.addEventListener('keydown', onKey);
        return () => { clearTimeout(t); document.removeEventListener('keydown', onKey); };
    }, [mode, finish]);

    const quick = mode === 'quick';
    const stagger = quick ? 0.04 : 0.12;

    return (
        <motion.div
            className="intro"
            onClick={finish}
            role="presentation"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.12, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
        >
            <motion.svg
                className="intro__logo"
                viewBox="0 0 1001 600"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Vinit Rao"
                animate={quick ? {} : { scale: [1, 1.05, 1], transition: { delay: 0.95, duration: 0.6, ease: 'easeInOut' } }}
            >
                {SHAPES.map((s, i) => {
                    const M = motion[s.el];
                    return (
                        <M
                            key={s.key}
                            {...s.props}
                            fill={s.fill}
                            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                            initial={quick ? { opacity: 0 } : { opacity: 0, ...s.from }}
                            animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                            transition={quick
                                ? { delay: i * stagger, duration: 0.3 }
                                : { delay: 0.1 + i * stagger, type: 'spring', stiffness: 170, damping: 17 }}
                        />
                    );
                })}
            </motion.svg>

            {!quick && (
                <motion.span
                    className="intro__skip mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 1.3 } }}
                >
                    click to enter
                </motion.span>
            )}
        </motion.div>
    );
}
