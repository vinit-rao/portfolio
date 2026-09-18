import { useState, useMemo, useEffect } from 'react';
import projects from '../data/projects';
import ArchiveModal from './ArchiveModal';
import '../pages/Archive.css';

// The full archive — filter + paginated grid + in-place detail modal.
// Rendered inside the Work panel of the bento canvas.
const abs = (p) => (p ? (p.startsWith('/') || p.startsWith('http') ? p : `/${p}`) : null);

const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'graphics', label: 'Graphics' },
    { id: 'video', label: 'Video' },
    { id: 'code', label: 'Code' },
    { id: 'photos', label: 'Photos' },
    { id: 'hardware', label: 'Hardware' },
];

const PAGE_SIZE = 12;

export default function WorkGrid() {
    const [filter, setFilter] = useState('all');
    const [active, setActive] = useState(null);
    const [page, setPage] = useState(1);

    const counts = useMemo(() => {
        const c = { all: projects.length };
        projects.forEach(p => { const k = p.category?.toLowerCase(); if (k) c[k] = (c[k] || 0) + 1; });
        return c;
    }, []);

    const shown = useMemo(
        () => (filter === 'all' ? projects : projects.filter(p => p.category?.toLowerCase() === filter)),
        [filter]
    );

    const pageCount = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
    const safePage = Math.min(page, pageCount);
    const start = (safePage - 1) * PAGE_SIZE;
    const paged = shown.slice(start, start + PAGE_SIZE);

    useEffect(() => { setPage(1); }, [filter]);
    useEffect(() => {
        if (safePage === 1) return;
        document.getElementById('work-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [safePage]);

    return (
        <div className="workgrid">
            <div className="arch__filter" role="group" aria-label="Filter by type">
                {FILTERS.map(f => (
                    <button
                        key={f.id}
                        type="button"
                        className={`arch__chip mono ${filter === f.id ? 'is-active' : ''}`}
                        onClick={() => setFilter(f.id)}
                        aria-pressed={filter === f.id}
                    >
                        {f.label} <span className="arch__chip-n">{counts[f.id] || 0}</span>
                    </button>
                ))}
            </div>

            <div className="arch__grid" id="work-grid">
                {paged.map((p, i) => (
                    <button key={p.title + start + i} type="button" className="arch__item" onClick={() => setActive(p)}>
                        <div className="arch__thumb">
                            <img src={abs(p.image)} alt={p.title} loading="lazy" decoding="async" />
                            {p.category && <span className="arch__cat mono">{p.category}</span>}
                            <span className="arch__open" aria-hidden="true"><i className="fas fa-plus"></i></span>
                        </div>
                        <span className="arch__name">{p.title}</span>
                    </button>
                ))}
            </div>

            {pageCount > 1 && (
                <nav className="arch__pager" aria-label="Work pages">
                    <button
                        type="button" className="arch__page-btn mono"
                        onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1}
                    >
                        <i className="fas fa-arrow-left"></i> Prev
                    </button>
                    <div className="arch__page-nums">
                        {Array.from({ length: pageCount }, (_, idx) => idx + 1).map(n => (
                            <button
                                key={n} type="button"
                                className={`arch__page-num mono ${n === safePage ? 'is-active' : ''}`}
                                onClick={() => setPage(n)}
                                aria-current={n === safePage ? 'page' : undefined}
                            >
                                {String(n).padStart(2, '0')}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button" className="arch__page-btn mono"
                        onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={safePage === pageCount}
                    >
                        Next <i className="fas fa-arrow-right"></i>
                    </button>
                </nav>
            )}

            {active && <ArchiveModal project={active} onClose={() => setActive(null)} />}
        </div>
    );
}
