import { useState, useCallback, useRef } from 'react';

// Live MJPEG webcam of the home 3D printer (OctoPrint via Tailscale Funnel).
// An <img> renders MJPEG natively but won't auto-reconnect if the stream drops,
// so onError schedules a 5s remount (key bump + cache-buster) to self-heal after
// a printer reboot or network blip.
const STREAM_URL = 'https://m6700.taila01038.ts.net/?action=stream';

export default function PrinterCam() {
    const [offline, setOffline] = useState(false);
    const [retryKey, setRetryKey] = useState(0);
    const retryTimer = useRef(null);

    const scheduleRetry = useCallback(() => {
        clearTimeout(retryTimer.current);
        retryTimer.current = setTimeout(() => {
            setRetryKey((k) => k + 1);
        }, 5000);
    }, []);

    const handleError = useCallback(() => {
        setOffline(true);
        scheduleRetry();
    }, [scheduleRetry]);

    const handleLoad = useCallback(() => {
        setOffline(false);
    }, []);

    return (
        <div className="printer-cam">
            <div className="printer-cam__header mono">
                <span className="plive-dot" data-state={offline ? 'offline' : 'live'} />
                <span>Live feed</span>
            </div>

            <div className="printer-cam__frame">
                {offline && (
                    <div className="printer-cam__fallback mono">Camera offline — retrying…</div>
                )}
                <img
                    key={retryKey}
                    src={`${STREAM_URL}&_=${retryKey}`}
                    alt="Live feed of the 3D printer"
                    onError={handleError}
                    onLoad={handleLoad}
                    style={{ display: offline ? 'none' : 'block' }}
                />
            </div>
        </div>
    );
}
