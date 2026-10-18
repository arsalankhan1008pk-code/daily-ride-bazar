export const metadata = {
  title: "Daily Ride Bazar",
  description: "Daily Ride Bazar - Bike, Car, Auto Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin:0, fontFamily:'sans-serif', background:'#f8fafc'}}>
        {children}
      </body>
    </html>
  );
}
