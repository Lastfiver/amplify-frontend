import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'blue' }}>🎉 IT WORKS!</h1>
      <p>Amplify Campaign Manager is live!</p>
      <p>Backend URL: {process.env.REACT_APP_API_URL || 'Not set'}</p>
      <div style={{ 
        background: '#green', 
        padding: '10px', 
        border: '1px solid #ccc',
        marginTop: '20px'
      }}>
        ✅ Frontend deployed successfully!
      </div>
    </div>
  );
}

export default App;
