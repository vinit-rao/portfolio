import { useEffect, useState } from 'react';

// Polls the public OctoPrint status endpoint and returns a normalized snapshot.
// Force-first fetch (runs even if the tab is hidden), pauses repeat polls when
// hidden, per-request timeout, and a mount watchdog so a hung/blocked connection
// resolves to "offline" instead of hanging on "Connecting".
const STATUS_URL = 'https://m6700.taila01038.ts.net/print-status';

const num = (n) => typeof n === 'number' && Number.isFinite(n);

export function usePrinterStatus(pollMs = 7000) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        let timer;
        let settled = false;

        const watchdog = setTimeout(() => {
            if (!cancelled && !settled) { setError(true); setLoading(false); }
        }, 9000);

        const tick = async (force = false) => {
            if (!force && typeof document !== 'undefined' && document.hidden) {
                timer = setTimeout(tick, pollMs);
                return;
            }
            const ctrl = new AbortController();
            const to = setTimeout(() => ctrl.abort(), 6000);
            try {
                const r = await fetch(STATUS_URL, { cache: 'no-store', signal: ctrl.signal });
                const j = await r.json();
                if (!cancelled) { setData(j); setError(false); }
            } catch {
                if (!cancelled) { setError(true); setData(null); }
            } finally {
                clearTimeout(to);
                settled = true;
                if (!cancelled) { setLoading(false); timer = setTimeout(tick, pollMs); }
            }
        };

        tick(true);
        return () => { cancelled = true; clearTimeout(timer); clearTimeout(watchdog); };
    }, [pollMs]);

    const online = !error && data && data.online !== false;
    const printing = online && (data.printing === true || data.state === 'Printing');
    const state = data?.state || (error ? 'Unreachable' : 'Connecting');
    const progress = printing && num(data.progress) ? Math.max(0, Math.min(100, data.progress)) : null;

    return { data, error, loading, online, printing, state, progress };
}

export { num };
