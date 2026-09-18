import { Link } from 'react-router-dom';
import './Footer.css';

const SOCIALS = [
    { label: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/vinit-rao' },
    { label: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/vinitrao1/' },
    { label: 'YouTube', icon: 'fab fa-youtube', url: 'https://youtube.com/@OfficialVinitRao' },
    { label: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com/instavinitgram' },
];

const Footer = () => {
    return (
        <footer className="foot">
            <div className="wrap">
                <div className="foot__cta">
                    <span className="mono">Have something in mind?</span>
                    <Link to="/contact" className="foot__big display">
                        Let's build something <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>

                <div className="foot__resumes">
                    <div className="foot__resume-btns">
                        <a href="/Vinit_Rao_Creative_Resume.pdf" download className="btn">
                            <i className="fas fa-download"></i> Creative resume
                        </a>
                        <a href="/Vinit_Rao_Developer_Resume.pdf" download className="btn">
                            <i className="fas fa-download"></i> Developer resume
                        </a>
                    </div>
                </div>

                <div className="foot__bottom">
                    <span className="mono">© 2026 Vinit Rao</span>
                    <div className="foot__social">
                        {SOCIALS.map(s => (
                            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="foot__social-link">
                                <i className={s.icon} aria-hidden="true"></i>
                            </a>
                        ))}
                    </div>
                    <span className="mono">Ottawa, CA · CG Generalist</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
