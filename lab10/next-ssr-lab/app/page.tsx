import { headers } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SystemStatus() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || 'Unknown Device';
  const serverTime = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Моніторинг ферми</h1>
      
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginTop: '20px', border: '1px solid #eee' }}>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#d32f2f' }} suppressHydrationWarning>{serverTime}</p>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}><b>Сесія:</b> {userAgent}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px' }}>
        <Link href="/product/1" style={{ padding: '15px', background: '#007bff', color: 'white', borderRadius: '8px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>
          Обладнання
        </Link>
        <Link href="/search" style={{ padding: '15px', background: '#28a745', color: 'white', borderRadius: '8px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>
          Пошук
        </Link>
      </div>
    </div>
  );
}