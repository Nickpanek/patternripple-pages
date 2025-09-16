export default function Cancelled() {
  return (
    <main className="max-w-xl mx-auto p-8 text-center">
      <h1 className="text-2xl mb-3">Checkout cancelled</h1>
      <p className="mb-6">No charge was made.</p>
      <a className="inline-block px-4 py-2 rounded bg-black text-white" href="/">
        Back to catalog
      </a>
    </main>
  );
}
