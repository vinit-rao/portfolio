import { usePrinterStatus } from '../hooks/usePrinterStatus';

// Compact real-time printer status shown on the face of the Live tile.
// Polls gently (20s) so the grid tile stays live without hammering the printer.
export default function LiveStatusBadge() {
    const { online, printing, state, progress } = usePrinterStatus(20000);
    const dot = !online ? 'offline' : printing ? 'printing' : 'idle';
    const label = !online
        ? 'Offline'
        : printing
            ? `Printing${progress != null ? ` · ${Math.round(progress)}%` : ''}`
            : (state === 'Operational' ? 'Idle' : state);

    return (
        <span className="tile__live mono">
            <span className="tile__live-dot" data-state={dot} /> {label}
        </span>
    );
}
