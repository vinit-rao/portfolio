import { useEffect, useState } from 'react';

const BackgroundEffects = ({ isOptimized }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let glowOpacity = 1 - ((scrollY - 200) / 500);
  glowOpacity = Math.max(0, Math.min(1, glowOpacity));

  return (
    <>
      <div id="bg-glow" style={{ opacity: glowOpacity }}></div>
      {!isOptimized && (
        <div id="night-sky" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className="star" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 0.5}px`,
                height: `${Math.random() * 2 + 0.5}px`,
                opacity: Math.random()
              }}
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

export default BackgroundEffects;