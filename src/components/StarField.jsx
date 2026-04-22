import { useEffect, useState } from 'react';

const StarField = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Increased to 200 stars for better visibility
    const generatedStars = Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      // Randomized twinkling effect
      duration: Math.random() * 3 + 2, 
      delay: Math.random() * 5
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -5, 
      pointerEvents: 'none',
      background: '#000' // Ensures the base is black
    }}>
      {stars.map(star => (
        <div 
          key={star.id} 
          style={{ 
            position: 'absolute',
            left: star.left, 
            top: star.top, 
            width: `${star.size}px`, 
            height: `${star.size}px`, 
            backgroundColor: '#fff',
            borderRadius: '50%',
            opacity: 0.6,
            animation: `twinkle ${star.duration}s infinite ${star.delay}s`
          }} 
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default StarField;