export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
      <header style={{ background: 'white', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, color: '#16a34a', fontSize: '22px', fontWeight: 'bold' }}>Daily Ride Bazar</h1>
        <span style={{ background: '#16a34a', color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>Pakistan</span>
      </header>

      <main style={{ padding: '40px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '28px', color: '#14532d', margin: '0 0 12px' }}>Assalamu Alaikum! 🇵🇰</h2>
          <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.6' }}>
            Daily Ride Bazar me khush amdeed! Yahan aap bike, rickshaw aur gari ki sawariyan asaani se dhoond sakte hain.
          </p>
          
          <div style={{ display: 'grid', gap: '12px', marginTop: '24px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '12px' }}>🏍️ Bike Ride - Sasti aur Tez</div>
            <div style={{ background: '#fefce8', border: '1px solid #fde68a', padding: '16px', borderRadius: '12px' }}>🛺 Rickshaw - Family ke liye behtareen</div>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '16px', borderRadius: '12px' }}>🚗 Car Ride - AC aur Araam deh</div>
          </div>

          <p style={{ marginTop: '24px', color: '#16a34a', fontWeight: 'bold' }}>✅ Website Live Ho Rahi Hai!</p>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: '13px' }}>
        © 2026 Daily Ride Bazar - Made with 💚 for Pakistan
      </footer>
    </div>
  )
}
