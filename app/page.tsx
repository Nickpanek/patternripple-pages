type Item = {
  _id: string;
  title: string;
  slug: { current: string };
  priceCents: number;
  preview?: { asset: { url: string } };
  file?: { asset: { url: string } };
};

async function getData() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  const q = `*[_type=="pattern" && defined(publishedAt)]|order(publishedAt desc){
    _id,title,slug,priceCents,
    "preview": preview.asset->{"url": url},
    "file": file.asset->{"url": url}
  }`;

  const url = `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${encodeURIComponent(q)}`;
  const r = await fetch(url, { next: { revalidate: 60 } });
  const { result } = await r.json();
  return (result as Item[]) || [];
}

export default async function Page() {
  const items = await getData();

  return (
    <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
      {items.map(p => (
        <article key={p._id} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 12 }}>
          {p.preview?.asset?.url && (
            <img src={p.preview.asset.url} alt={p.title} style={{ width: '100%', borderRadius: 8 }} />
          )}
          <h3 style={{ margin: '12px 0 4px' }}>{p.title}</h3>
          <p>${((p.priceCents || 0) / 100).toFixed(2)}</p>
          {p.file?.asset?.url ? (
            <a href={p.file.asset.url}>Download (MVP)</a>
          ) : (
            <span style={{ opacity: 0.5 }}>No file yet</span>
          )}
        </article>
      ))}
    </main>
  );
}
