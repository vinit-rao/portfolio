const Contact = () => {
  const socials = [
    { label: 'LinkedIn', link: 'https://linkedin.com/in/vinitrao1/', icon: 'fab fa-linkedin' },
    { label: 'GitHub', link: 'https://github.com/vinit-rao', icon: 'fab fa-github' },
    { label: 'Instagram', link: 'https://instagram.com/officialvinitrao', icon: 'fab fa-instagram' },
    { label: 'YouTube', link: 'https://youtube.com/@OfficialVinitRao', icon: 'fab fa-youtube' }
  ];

  return (
    <div className="container" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      <h1 className="massive-title" style={{ fontSize: '5rem', textAlign: 'center', marginBottom: '60px' }}>CONNECT</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {socials.map((s, i) => (
            <a key={i} href={s.link} target="_blank" className="glass-card" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <i className={s.icon} style={{ color: 'var(--accent)', fontSize: '1.2rem' }}></i>
              <span style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>{s.label}</span>
            </a>
          ))}
        </div>

        <div className="glass-card" style={{ padding: '30px' }}>
          <form action="https://formspree.io/f/mojnppzg" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input type="text" name="name" placeholder="NAME" required style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '15px', color: '#fff' }} />
            <input type="email" name="email" placeholder="EMAIL" required style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '15px', color: '#fff' }} />
            <textarea name="message" rows="4" placeholder="MESSAGE" required style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '15px', color: '#fff' }}></textarea>
            <button type="submit" className="glass-btn">SEND TRANSMISSION</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;