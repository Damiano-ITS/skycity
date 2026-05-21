import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      textAlign: 'center'
    }}>
      <h1>Skycity 🚀</h1>
      <p style={{ color: '#aaa' }}>Il progetto è ripartito senza errori di asset.</p>
      
      <button 
        onClick={() => setCount((c) => c + 1)}
        style={{
          padding: '0.6em 1.2em',
          fontSize: '1em',
          fontWeight: 600,
          borderRadius: '8px',
          border: '1px solid #646cff',
          cursor: 'pointer',
          backgroundColor: '#242424',
          color: '#fff',
          marginTop: '1rem',
          transition: 'border-color 0.25s'
        }}
      >
        Click totali: {count}
      </button>
    </div>
  );
}

export default App;