import Link from 'next/link';

const products = [
  {
    slug: "vibrant-wildflower-faux-embroidery-rose",
    title: "Vibrant Wildflower Faux Embroidery",
    subtitle: "Dusty Rose Collection",
    price: 125,
    sku: "PR-flo-20250916-001",
    stripePriceId: "price_1S7wFfBB8R6OUfKVYDvR9B5T", // UPDATE THIS
    exclusive: true,
    available: true
  }
];

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      paddingBottom: '2rem'
    }}>
      {/* Hero Section */}
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '3rem 1rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem',
          fontWeight: '300',
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          PatternRipple
        </h1>
        <p style={{ 
          fontSize: '1.25rem',
          color: '#4a5568',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Exclusive digital patterns that no one else will have.
          <span style={{ 
            display: 'block',
            marginTop: '0.5rem',
            color: '#764ba2',
            fontWeight: '500'
          }}>
            Once sold, it's yours forever.
          </span>
        </p>
      </header>

      {/* Products Grid */}
      <main style={{ 
        maxWidth: '1200px',
        margin: '3rem auto',
        padding: '0 1rem'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {products.map((product) => (
            <article 
              key={product.sku}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: '3px solid #fbbf24',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 25px 30px -5px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Exclusive Badge */}
              {product.exclusive && (
                <div style={{
                  background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                  color: 'white',
                  padding: '0.5rem',
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.1em'
                }}>
                  EXCLUSIVE PATTERN
                </div>
              )}
              
              {/* Pattern Preview */}
              <div style={{
                height: '300px',
                background: 'linear-gradient(135deg, #fde2e4, #fad2e1, #e2ece9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '5rem'
              }}>
                🌸
              </div>
              
              {/* Product Info */}
              <div style={{ padding: '1.5rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '300',
                  marginBottom: '0.5rem',
                  color: '#1a202c'
                }}>
                  {product.title}
                </h2>
                <p style={{
                  color: '#718096',
                  marginBottom: '1.5rem'
                }}>
                  {product.subtitle}
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  <span style={{
                    fontSize: '2rem',
                    fontWeight: '300'
                  }}>
                    ${product.price}
                  </span>
                  <span style={{
                    color: '#48bb78',
                    fontSize: '0.875rem'
                  }}>
                    Available
                  </span>
                </div>
                
                <Link 
                  href={`/p/${product.slug}`}
                  style={{
                    display: 'block',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textAlign: 'center',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  View Pattern
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* VIP Section */}
        <section style={{
          marginTop: '5rem',
          background: 'white',
          borderRadius: '16px',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '300',
            marginBottom: '1rem'
          }}>
            More Exclusive Patterns Coming Daily
          </h2>
          <p style={{
            color: '#718096',
            marginBottom: '2rem',
            fontSize: '1.125rem'
          }}>
            Join our VIP list to get notified the moment new exclusive patterns drop.
            Once they're sold, they're gone forever.
          </p>
          <button style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            border: 'none',
            fontSize: '1.125rem',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}>
            Join VIP List →
          </button>
        </section>
      </main>
    </div>
  );
}
