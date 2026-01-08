import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#92400e'
    }}>
      <span style={{ marginRight: '0.5rem', fontSize: '1.75rem' }}>🐾</span>
      <span>Aussie Doodle Haven</span>
    </div>
  );
};

