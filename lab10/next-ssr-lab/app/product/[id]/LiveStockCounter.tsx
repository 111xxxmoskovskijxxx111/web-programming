'use client'; 

import { useState, useEffect } from 'react';

export default function LiveStockCounter({ initialStock }: { initialStock: number }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [stock, setStock] = useState(initialStock);

  useEffect(() => setIsHydrated(true), []);

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Керування запасами</h3>
      <p>Залишок на складі: {stock} шт.</p>
      
      <button
        disabled={!isHydrated || stock === 0}
        onClick={() => setStock(s => s - 1)}
        style={{ 
          padding: '10px 15px', 
          background: isHydrated && stock > 0 ? '#007bff' : '#ccc', 
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: isHydrated && stock > 0 ? 'pointer' : 'not-allowed'
        }}
      >
        {!isHydrated ? 'Завантаження...' : stock === 0 ? 'Немає в наявності' : 'Замовити'}
      </button>
    </div>
  );
}