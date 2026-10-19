export const metadata = {
  title: "Daily Ride Bazar",
  description: "Daily Ride Bazar - Pakistan ka ride aur transport platform"
}

export default function RootLayout({ children }) {
  return (
    <html lang="ur">
      <body style={{ margin: 0, fontFamily: 'system-ui', background: '#f8fafc' }}>
        {children}
      </body>
    </html>
  )
}
