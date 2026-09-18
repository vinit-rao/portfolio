import { usePrinterStatus, num } from '../hooks/usePrinterStatus';

// Live print dashboard — LIVE/OFFLINE badge, progress ring, elapsed/remaining,
// and nozzle/bed temp gauges. Polls via the shared usePrinterStatus hook and
// degrades gracefully when fields are missing.

const fmtDuration = (s) => {
    if (s == null || !Number.isFinite(s) || s < 0) return null;
    const sec = Math.round(s);
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    if (h) return `${h}h ${m}m`;
    if (m) return `${m}m`;
    return `${sec}s`;
};

function ProgressRing({ value }) {
    const r = 34;
    const c = 2 * Math.PI * r;
    const off = c * (1 - Math.max(0, Math.min(100, value)) / 100);
    return (
        <svg className="pring" viewBox="0 0 80 80" role="img" aria-label={`${Math.round(value)} percent complete`}>
            <circle className="pring__track" cx="40" cy="40" r={r} />
            <circle className="pring__bar" cx="40" cy="40" r={r} strokeDasharray={c} strokeDashoffset={off} transform="rotate(-90 40 40)" />
            <text className="pring__pct" x="40" y="40" dominantBaseline="central" textAnchor="middle">{Math.round(value)}%</text>
        </svg>
    );
}

function TempGauge({ label, temp, target }) {
    if (!num(temp)) return null;
    const tgt = num(target) && target > 0 ? target : null;
    const maxScale = tgt ? tgt * 1.25 : Math.max(temp * 1.25, 60);
    const fill = Math.max(0, Math.min(100, (temp / maxScale) * 100));
    const tick = tgt ? Math.min(100, (tgt / maxScale) * 100) : null;
    const atTemp = tgt ? Math.abs(temp - tgt) <= 3 : false;
    return (
        <div className="pgauge">
            <div className="pgauge__top mono">
                <span className="pgauge__label">{label}</span>
                <span className="pgauge__val">{Math.round(temp)}°{tgt ? ` / ${Math.round(tgt)}°` : ''}</span>
            </div>
            <div className="pgauge__track">
                <span className="pgauge__fill" data-at={atTemp} style={{ width: `${fill}%` }} />
                {tick != null && <span className="pgauge__tick" style={{ left: `${tick}%` }} />}
            </div>
        </div>
    );
}

export default function PrintStatus() {
    const { data, error, loading, online, printing, state, progress } = usePrinterStatus(7000);

    const hasTemps = online && (num(data.nozzleTemp) || num(data.bedTemp));
    const elapsed = online ? fmtDuration(data.printTimeSeconds) : null;
    const eta = printing ? fmtDuration(data.printTimeLeftSeconds) : null;
    const dotState = !online ? 'offline' : printing ? 'live' : 'idle';

    return (
        <div className="pstat">
            <div className="pstat__head mono">
                <span className="plive-dot" data-state={dotState} />
                <span className={`pbadge ${online ? 'is-live' : 'is-off'}`}>{online ? 'Live' : 'Offline'}</span>
                <span className="pstat__state">{state}</span>
            </div>

            {loading && !data && !error ? (
                <p className="pstat__muted mono">Connecting…</p>
            ) : !online ? (
                <p className="pstat__muted mono">Printer offline — nothing on the bed right now.</p>
            ) : (
                <>
                    {printing && data.fileName && (
                        <p className="pstat__file mono" title={data.fileName}>{data.fileName}</p>
                    )}

                    {progress != null ? (
                        <div className="pstat__body">
                            <ProgressRing value={progress} />
                            <dl className="pstat__times mono">
                                <div className="pstat__time"><dt>Elapsed</dt><dd>{elapsed || '—'}</dd></div>
                                <div className="pstat__time"><dt>Remaining</dt><dd>{eta || '—'}</dd></div>
                            </dl>
                        </div>
                    ) : (
                        <p className="pstat__muted mono">Online &amp; idle — not printing right now.</p>
                    )}

                    {hasTemps && (
                        <div className="pstat__gauges">
                            <TempGauge label="Nozzle" temp={data.nozzleTemp} target={data.nozzleTarget} />
                            <TempGauge label="Bed" temp={data.bedTemp} target={data.bedTarget} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
