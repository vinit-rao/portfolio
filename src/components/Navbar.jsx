import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="pill-nav-wrapper">
      <nav className="pill-nav">
        <Link to="/" className="pill-logo">VINIT</Link>
        <Link to="/projects" className={`pill-link ${location.pathname === '/projects' ? 'active' : ''}`}>Work</Link>
        <Link to="/contact" className={`pill-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
      </nav>
    </div>
  );
};

export default Navbar;