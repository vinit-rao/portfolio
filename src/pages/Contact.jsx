import Footer from '../components/Footer';

const Contact = () => {
  const socials = [
    { label: 'LinkedIn', link: 'https://linkedin.com/in/vinitrao1/', icon: 'fab fa-linkedin' },
    { label: 'GitHub', link: 'https://github.com/vinit-rao', icon: 'fab fa-github' },
    { label: 'Instagram', link: 'https://instagram.com/officialvinitrao', icon: 'fab fa-instagram' },
    { label: 'YouTube', link: 'https://youtube.com/@OfficialVinitRao', icon: 'fab fa-youtube' }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="container" style={{ paddingTop: '150px', flexGrow: 1 }}>
            <h1 className="massive-title" style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', textAlign: 'center', marginBottom: '60px' }}>CONNECT</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', margin: '0 auto', paddingBottom: '80px' }}>
                
                {/* COLUMN 1: SOCIAL LINKS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '2px' }}>Social Links</h3>
                    {socials.map((s, i) => (
                        <a key={i} href={s.link} target="_blank" rel="noreferrer" className="glass-card" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '20px', padding: '25px' }}>
                            <i className={s.icon} style={{ color: 'var(--accent)', fontSize: '1.4rem' }}></i>
                            <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</span>
                        </a>
                    ))}
                </div>

                {/* COLUMN 2: CONTACT FORM */}
                <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '25px', letterSpacing: '2px' }}>Send a Message</h3>
                    <form action="https://formspree.io/f/mojnppzg" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1 }}>
                        <input type="text" name="name" placeholder="Name" required style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '15px', color: '#fff', fontFamily: 'var(--font-body)' }} />
                        <input type="email" name="email" placeholder="Email" required style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '15px', color: '#fff', fontFamily: 'var(--font-body)' }} />
                        <textarea name="message" rows="6" placeholder="Message" required style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '15px', color: '#fff', fontFamily: 'var(--font-body)', flexGrow: 1, resize: 'none' }}></textarea>
                        <button type="submit" className="glass-btn" style={{ width: '100%' }}>SEND MESSAGE</button>
                    </form>
                </div>
            </div>
        </div>
        
        <Footer />
    </div>
  );
};

export default Contact;