import { HashRouter as Router } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import ExternalLinkGuard from './components/ExternalLinkGuard';
import Canvas from './components/Canvas';

// Bento Canvas architecture: the whole site is one full-screen canvas.
// Canvas is ALWAYS mounted (not swapped between routes) so Framer's
// AnimatePresence + layoutId morphs stay continuous. It reads the current
// hash path to decide which section panel (if any) is open — "/" = grid,
// "/work" | "/about" | "/live" | "/contact" = that panel morphed open.
function App() {
    return (
        <ThemeProvider>
            <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 260, damping: 32 }}>
                <Router>
                    <a href="#main" className="skip-link">Skip to content</a>
                    <ExternalLinkGuard />
                    <Canvas />
                </Router>
            </MotionConfig>
        </ThemeProvider>
    );
}

export default App;
