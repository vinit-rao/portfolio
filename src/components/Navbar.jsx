import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <div className="pill-nav-wrapper">
            <nav className="pill-nav">
                <Link 
                    to="/projects" 
                    className={`pill-link ${location.pathname === '/projects' ? 'active' : ''}`}
                >
                    WORK
                </Link>

                <Link to="/" className="pill-logo" style={{ margin: '0 15px' }}>
                    VINIT RAO
                </Link>

                <Link 
                    to="/contact" 
                    className={`pill-link ${location.pathname === '/contact' ? 'active' : ''}`}
                >
                    CONTACT
                </Link>
            </nav>
        </div>
    );
};

export default Navbar;