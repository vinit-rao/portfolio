import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <div className="sharp-nav-wrapper">
            <nav className="sharp-nav container">
                <Link to="/" className="nav-brand">VINIT RAO</Link>
                
                <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                    <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}>WORK</Link>
                    <span className="nav-divider">|</span>
                    <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>CONTACT</Link>
                    <span className="nav-divider">|</span>
                    <Link to="/resume" className={`nav-link ${location.pathname === '/resume' ? 'active' : ''}`}>RESUME</Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;