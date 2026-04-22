const FloatingEcoBtn = ({ isOptimized, toggleOptimization }) => {
  return (
    <button 
      className={`floating-eco-btn ${isOptimized ? 'active' : ''}`}
      onClick={toggleOptimization}
    >
      {isOptimized ? (
        <><i className="fas fa-leaf"></i> ECO: ON</>
      ) : (
        <><i className="fas fa-bolt"></i> ECO: OFF</>
      )}
    </button>
  );
};

export default FloatingEcoBtn;