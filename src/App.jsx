import ExternalLinkGuard from './components/ExternalLinkGuard';
import Home from './pages/Home';

// Cinematic dark-studio, single-page: the reel + work lead, everything on one
// scroll (hero · work · toolkit · archive · about · contact).
function App() {
    return (
        <>
            <a href="#work" className="skip-link">Skip to content</a>
            <ExternalLinkGuard />
            <Home />
        </>
    );
}

export default App;
