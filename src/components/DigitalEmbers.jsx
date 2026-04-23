import { useEffect, useState } from 'react';

const DigitalEmbers = () => {
  const [embers, setEmbers] = useState([]);

  useEffect(() => {
    // Generate 60 floating red embers
    const generatedEmbers = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1, // 1px to 4px
      duration: Math.random() * 12 + 8, // Float speed (8s to 20s)
      delay: Math.random() * -20, // Negative delay so they start already on screen
      opacity: Math.random() * 0.6 + 0.1,
    }));
    setEmbers(generatedEmbers);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -5, pointerEvents: 'none', background: 'var(--bg-void)', overflow: 'hidden' }}>
      {embers.map(ember => (
        <div 
          key={ember.id} 
          style={{ 
            position: 'absolute',
            left: ember.left, 
            bottom: '-10px', 
            width: `${ember.size}px`, 
            height: `${ember.size}px`, 
            backgroundColor: 'var(--accent)',
            boxShadow: '0 0 12px var(--accent)', // Creates the glow
            opacity: ember.opacity,
            animation: `floatUp ${ember.duration}s linear ${ember.delay}s infinite`
          }} 
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-110vh) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default DigitalEmbers;