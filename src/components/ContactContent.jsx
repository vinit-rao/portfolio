import '../pages/Contact.css';

// Contact section body — rendered inside the Contact panel.
export default function ContactContent() {
    return (
        <div className="contact contact--panel">
            <header className="contact__head">
                <h1 className="contact__title display">Let's build something</h1>
                <p className="contact__coop mono mono-accent">Available for a Winter 2027 co-op — open to 4, 8, or 12-month terms</p>
            </header>

            <div className="contact__grid">
                <div className="contact__info">
                    <a href="mailto:vinitrao@gmail.com" className="contact__line ulink">vinitrao@gmail.com</a>
                    <a href="tel:+16135010749" className="contact__line ulink">613 501 0749</a>
                    <span className="contact__line contact__muted">Ottawa, ON · Canada — US &amp; Canadian citizen</span>
                    <span className="contact__line contact__muted">Open to relocating anywhere in North America (Canada&nbsp;+&nbsp;US)</span>

                    <div className="contact__socials">
                        <a href="https://github.com/vinit-rao" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
                        <a href="https://linkedin.com/in/vinitrao1/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                        <a href="https://youtube.com/@OfficialVinitRao" target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                        <a href="https://instagram.com/instavinitgram" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>

                <form className="contact__form" action="https://formspree.io/f/mojnppzg" method="POST">
                    <input type="text" name="name" placeholder="Name" aria-label="Your name" className="field" required />
                    <input type="email" name="email" placeholder="Email" aria-label="Your email" className="field" required />
                    <textarea name="message" placeholder="Message" aria-label="Your message" className="field contact__message" rows="4" required></textarea>
                    <button type="submit" className="btn btn-accent contact__send">
                        Send message <i className="fas fa-arrow-right"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}
