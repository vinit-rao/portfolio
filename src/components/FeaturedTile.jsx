import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const abs = (p) => (p ? (p.startsWith('/') || p.startsWith('http') ? p : `/${p}`) : null);

// A compact auto-cycling carousel of featured pieces — the grid's living element.
// Crossfades through featured images; clicking opens Work.
export default function FeaturedTile({ items, onOpen }) {
    const [i, setI] = useState(0);
    const reduce = useReducedMotion();

    useEffect(() => {
        if (reduce || items.length < 2) return;
        const t = setInterval(() => setI(v => (v + 1) % items.length), 3600);
        return () => clearInterval(t);
    }, [items.length, reduce]);

    if (!items.length) return null;
    const cur = items[i];

    return (
        <button
            type="button"
            className="tile mini feat"
            style={{ gridArea: 'featured' }}
            onClick={onOpen}
            aria-label={`Featured work: ${cur.title}. Open Work.`}
        >
            <AnimatePresence initial={false}>
                <motion.img
                    key={cur.image}
                    className="feat__img"
                    src={abs(cur.image)}
                    alt=""
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                />
            </AnimatePresence>
            <span className="feat__scrim" aria-hidden="true" />
            <span className="feat__tag mono">Featured</span>
            <span className="feat__title">{cur.title}</span>
            <span className="feat__dots" aria-hidden="true">
                {items.map((_, d) => <span key={d} className={`feat__dot ${d === i ? 'is-on' : ''}`} />)}
            </span>
        </button>
    );
}
