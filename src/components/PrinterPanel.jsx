import PrinterCam from './PrinterCam';
import PrintStatus from './PrintStatus';
import './Printer.css';

// The "live printer" panel: webcam feed + live print stats, side by side.
// Drop-in section — used on the About page.
export default function PrinterPanel() {
    return (
        <section className="printer" aria-label="Live 3D printer">
            <div className="printer__head">
                <span className="mono">Live from the desk</span>
                <h2 className="printer__title display">On the printer.</h2>
                <p className="printer__sub">
                    A webcam pointed at the home 3D printer. If it's mid-job you'll see it
                    running live below — otherwise it's resting between prints.
                </p>
            </div>

            <div className="printer__grid">
                <PrinterCam />
                <PrintStatus />
            </div>
        </section>
    );
}
