import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './Panel.css';

const FOCUSABLE = 'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])';

// Full-screen section panel. Dissolves + gently scales in over the grid (clean
// crossfade, no cut/flash); the section's primitive still flies to the bar via a
// shared `layoutId` (same shape both sides, so that part is seamless). Content
// mounts just after so the entrance stays light. Esc/close, scroll-lock,
// focus-return, and a Tab focus-trap included.
export default function Panel({ section, shape, color, title, onClose, children }) {
    const reduce = useReducedMotion();
    const rootRef = useRef(null);
    const bodyRef = useRef(null);
    const prevFocus = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        prevFocus.current = document.activeElement;
        document.body.style.overflow = 'hidden';
        const mount = setTimeout(() => setReady(true), 90);

        const onKey = (e) => {
            if (e.key === 'Escape') { onClose(); return; }
            if (e.key !== 'Tab') return;
            const nodes = rootRef.current?.querySelectorAll(FOCUSABLE);
            if (!nodes || !nodes.length) return;
            const list = [...nodes].filter(n => n.offsetParent !== null || n === document.activeElement);
            if (!list.length) return;
            const first = list[0];
            const last = list[list.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        };
        document.addEventListener('keydown', onKey);
        bodyRef.current?.focus();

        return () => {
            clearTimeout(mount);
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
            if (prevFocus.current instanceof HTMLElement) prevFocus.current.focus();
        };
    }, [onClose]);

    return (
        <motion.div
            ref={rootRef}
            className="panel"
            data-color={color}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={reduce ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="panel__bar">
                <span className="panel__id">
                    <motion.span layoutId={`shape-${section}`} className={`tile__shape--${shape} panel__shape`} aria-hidden="true" />
                    <span className="panel__title mono">{title}</span>
                </span>
                <button type="button" className="panel__close mono" onClick={onClose} aria-label="Close section">
                    Close <span aria-hidden="true">×</span>
                </button>
            </div>

            <motion.div
                className="panel__body"
                ref={bodyRef}
                tabIndex={-1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.05 } }}
            >
                <div className="wrap">{ready ? children : null}</div>
            </motion.div>
        </motion.div>
    );
}
