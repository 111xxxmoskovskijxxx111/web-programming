import { notFound } from 'next/navigation';
import LiveStockCounter from './LiveStockCounter';
import Link from 'next/link';

async function fetchEquipmentDetails(id: string) {
  const db: Record<string, { title: string, desc: string, stock: number }> = {
    '1': { title: 'Дозатор корму автоматичний', desc: 'Забезпечує точну видачу корму за розкладом.', stock: 15 },
    '2': { title: 'Датчик рівня води v2', desc: 'Високоточний сенсор для контролю поїлок.', stock: 0 },
  };
  return db[id] || null;
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; 
  const product = await fetchEquipmentDetails(resolvedParams.id);

  if (!product) notFound(); 

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', color: 'black' }}>
      <Link href="/" style={{ color: '#007bff', textDecoration: 'none' }}>← На головну</Link>
      <h1 style={{ marginTop: '20px' }}>{product.title}</h1>
      <p>{product.desc}</p>
      
      <LiveStockCounter initialStock={product.stock} />
    </div>
  );
}