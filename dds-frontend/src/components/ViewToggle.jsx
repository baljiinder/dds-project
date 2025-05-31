import React from 'react';

export default function ViewToggle({ selected, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      {['school', 'hospital', 'retail', 'corporate'].map(view => (
        <button
          key={view}
          onClick={() => onChange(view)}
          style={{
            padding: '8px 16px',
            background: selected === view ? '#444' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {view.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
