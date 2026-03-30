import Link from 'next/link';

const allEquipment = [
  { id: '1', title: 'Дозатор корму автоматичний' },
  { id: '2', title: 'Датчик рівня води v2' },
  { id: '3', title: 'Мережевий хаб управління' },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q?.toLowerCase() || '';

  const results = allEquipment.filter(item =>
    item.title.toLowerCase().includes(query)
  );

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', color: 'black' }}>
      <Link href="/" style={{ color: '#007bff', textDecoration: 'none' }}>← На головну</Link>
      <h1 style={{ marginTop: '20px' }}>Пошук обладнання</h1>

      <form method="GET" action="/search" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Введіть назву..."
          style={{ padding: '10px', flex: 1, borderRadius: '4px', border: '1px solid #ccc', color: 'black' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Шукати
        </button>
      </form>

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {results.length > 0 ? (
            results.map(item => (
              <li key={item.id} style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
                <Link href={`/product/${item.id}`} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                  {item.title}
                </Link>
              </li>
            ))
          ) : (
            <p style={{ margin: 0, color: '#666' }}>Нічого не знайдено</p>
          )}
        </ul>
      </div>
    </div>
  );
}