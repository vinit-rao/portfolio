const Contact = () => {
  return (
    <section className="full-width-section" style={{ borderTop: 'none', marginTop: '60px', marginBottom: '80px' }}>
      <div className="container">
        <div className="bento-grid">
          
          <div className="bento-item bento-bio" style={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
            <h2 style={{ marginBottom: '15px' }}>CONTACT</h2>
            <p style={{ marginBottom: 0 }}>Currently open to new opportunities, freelance projects, or collaborations. Reach out via the terminal below or directly at <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>vinitrao@gmail.com</span>.</p>
          </div>

          <div className="bento-item" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
            <div className="bento-title">Network Protocols</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', flexGrow: 1 }}>
              <a href="https://linkedin.com/in/vinitrao1/" target="_blank" rel="noreferrer" className="bento-contact" style={{ gridColumn: 'span 1', padding: '15px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '0.9rem' }}><i className="fab fa-linkedin" style={{ marginRight: '8px' }}></i> LinkedIn</h3>
              </a>
              <a href="https://github.com/vinit-rao" target="_blank" rel="noreferrer" className="bento-contact" style={{ gridColumn: 'span 1', padding: '15px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '0.9rem' }}><i className="fab fa-github" style={{ marginRight: '8px' }}></i> GitHub</h3>
              </a>
              <a href="https://youtube.com/@OfficialVinitRao" target="_blank" rel="noreferrer" className="bento-contact" style={{ gridColumn: 'span 1', padding: '15px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '0.9rem' }}><i className="fab fa-youtube" style={{ marginRight: '8px' }}></i> YouTube</h3>
              </a>
              <a href="https://instagram.com/instavinitgram/" target="_blank" rel="noreferrer" className="bento-contact" style={{ gridColumn: 'span 1', padding: '15px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '0.9rem' }}><i className="fab fa-instagram" style={{ marginRight: '8px' }}></i> Instagram</h3>
              </a>
            </div>
          </div>

          <div className="bento-item" style={{ gridColumn: 'span 4' }}>
            <form action="https://formspree.io/f/mojnppzg" method="POST" className="inquiry-form">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                <input type="text" name="name" placeholder="NAME" required style={{ gridColumn: 'span 1' }} />
                <input type="email" name="email" placeholder="EMAIL" required style={{ gridColumn: 'span 1' }} />
              </div>
              <textarea name="message" rows="6" placeholder="MESSAGE" required style={{ marginTop: '15px' }}></textarea>
              <button type="submit" className="submit-btn" style={{ marginTop: '15px' }}>SEND</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;