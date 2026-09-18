import { useState } from 'react';
import projects from '../data/projects';
import PrinterPanel from './PrinterPanel';
import ArchiveModal from './ArchiveModal';
import '../pages/Archive.css';

// The "For Fun" panel — the live 3D printer plus the hands-on stuff made for the
// joy of it (games, hardware, code experiments). Room to grow as more is added.
const abs = (p) => (p ? (p.startsWith('/') || p.startsWith('http') ? p : `/${p}`) : null);
const FUN = projects.filter(p => ['hardware', 'code'].includes(p.category?.toLowerCase()));

export default function FunContent() {
    const [active, setActive] = useState(null);

    return (
        <div className="fun">
            <PrinterPanel />

            {FUN.length > 0 && (
                <section className="fun__more">
                    <span className="about__section-label mono">Made for fun</span>
                    <div className="arch__grid">
                        {FUN.map((p, i) => (
                            <button key={p.title + i} type="button" className="arch__item" onClick={() => setActive(p)}>
                                <div className="arch__thumb">
                                    <img src={abs(p.image)} alt={p.title} loading="lazy" decoding="async" />
                                    {p.category && <span className="arch__cat mono">{p.category}</span>}
                                    <span className="arch__open" aria-hidden="true"><i className="fas fa-plus"></i></span>
                                </div>
                                <span className="arch__name">{p.title}</span>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {active && <ArchiveModal project={active} onClose={() => setActive(null)} />}
        </div>
    );
}
