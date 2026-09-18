import { useState, useEffect, useCallback } from 'react';
import './ExternalLinkGuard.css';

// Intercepts clicks on any external, new-tab link (`<a target="_blank" href="http...">`)
// and asks the user to confirm before leaving the site.
const ExternalLinkGuard = () => {
    const [href, setHref] = useState(null);

    useEffect(() => {
        const onClick = (e) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
            const a = e.target.closest?.('a');
            if (!a) return;
            const url = a.getAttribute('href') || '';
            if (a.getAttribute('target') === '_blank' && /^https?:\/\//i.test(url)) {
                e.preventDefault();
                setHref(url);
            }
        };
        document.addEventListener('click', onClick, true);
        return () => document.removeEventListener('click', onClick, true);
    }, []);

    const close = useCallback(() => setHref(null), []);
    const proceed = useCallback(() => {
        if (href) window.open(href, '_blank', 'noopener,noreferrer');
        setHref(null);
    }, [href]);

    useEffect(() => {
        if (!href) return;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'Enter') proceed();
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [href, close, proceed]);

    if (!href) return null;

    let domain = href;
    try { domain = new URL(href).hostname.replace(/^www\./, ''); } catch { /* keep raw */ }

    return (
        <div className="elg" role="dialog" aria-modal="true" aria-label="Leaving the site" onClick={close}>
            <div className="elg__panel" onClick={(e) => e.stopPropagation()}>
                <span className="mono elg__eyebrow">External link</span>
                <p className="elg__lead">You're about to leave for <strong>{domain}</strong>.</p>
                <p className="elg__url mono">{href}</p>
                <div className="elg__actions">
                    <button type="button" className="btn" onClick={close}>Stay here</button>
                    <button type="button" className="btn btn-accent" onClick={proceed} autoFocus>
                        Continue <i className="fas fa-arrow-up-right-from-square"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExternalLinkGuard;
