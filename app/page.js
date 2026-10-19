
"use client";

import { useState } from "react";

const vehicles = [
  { name: "Lady Bike", use: "Ride", image: "https://cdn-icons-png.flaticon.com/512/2972/2972210.png" },
  { name: "Man Bike", use: "Ride", image: "https://cdn-icons-png.flaticon.com/512/2972/2972210.png" },
  { name: "Riksha", use: "Both", image: "https://cdn-icons-png.flaticon.com/512/3774/3774080.png" },
  { name: "Mini Car", use: "Both", image: "https://cdn-icons-png.flaticon.com/512/3774/3774278.png" },
  { name: "Big Car", use: "Both", image: "https://cdn-icons-png.flaticon.com/512/3774/3774278.png" },
  { name: "Hiroof", use: "Both", image: "https://cdn-icons-png.flaticon.com/512/3774/3774086.png" },
  { name: "Hiaxe", use: "Both", image: "https://cdn-icons-png.flaticon.com/512/3774/3774086.png" },
  { name: "Coster", use: "Both", image: "https://cdn-icons-png.flaticon.com/512/3774/3774090.png" },
  { name: "Hino Bus", use: "Both", image: "https://cdn-icons-png.flaticon.com/512/3774/3774090.png" },
  { name: "Truck", use: "Goods", image: "https://cdn-icons-png.flaticon.com/512/3774/3774105.png" },
  { name: "Hino Truck", use: "Goods", image: "https://cdn-icons-png.flaticon.com/512/3774/3774105.png" },
  { name: "Suzuki Every", use: "Both", image: "https://cdn-icons-png.flaticon.com/512/3774/3774086.png" },
  { name: "Nissan", use: "Both", image: "https://cdn-icons-png.flaticon.com/512/3774/3774086.png" },
  { name: "Changan", use: "Both", image: "https://cdn-icons-png.flaticon.com/512/3774/3774086.png" },
  { name: "Suzuki Pickup", use: "Goods", image: "https://cdn-icons-png.flaticon.com/512/3774/3774273.png" },
];

const money = (n) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(n);

export default function Home() {
  const [mode, setMode] = useState("Ride");
  const [vehicle, setVehicle] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [phone, setPhone] = useState("");
  const [fare, setFare] = useState("500");
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("Customer");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const availableVehicles = vehicles.filter((v) =>
    mode === "Ride"
      ? v.use === "Ride" || v.use === "Both"
      : v.use === "Goods" || v.use === "Both"
  );

  const amount = Math.max(0, Number(fare) || 0);
  const commission = Math.round(amount * 0.10);
  const riderAmount = amount - commission;

  function getLocation() {
    if (!navigator.geolocation) {
      setMessage("Is browser mein GPS support nahi hai.");
      return;
    }

    setLoadingLocation(true);
    setMessage("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(coords);
        setPickup(`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
        setLoadingLocation(false);
        setMessage("GPS location mil gayi. Map par check karein.");
      },
      (err) => {
        setLoadingLocation(false);
        setMessage(
          err.code === 1
            ? "Location permission allow karein, phir dobara koshish karein."
            : "Location nahi mili. GPS on karke dobara koshish karein."
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }

  function openMap() {
    const query = location
      ? `${location.lat},${location.lng}`
      : pickup.trim() || "Karachi, Pakistan";

    window.open(
      `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function submitBooking(e) {
    e.preventDefault();

    if (!vehicle || !pickup.trim() || !drop.trim() || !phone.trim()) {
      setMessage("Vehicle, pickup, destination aur contact number bharna zaroori hai.");
      return;
    }

    setMessage(
      `Test successful! ${vehicle} select hai. Kiraya ${money(amount)}, ` +
      `10% commission ${money(commission)}. Abhi booking server par save nahi hui.`
    );
  }

  return (
    <main style={s.page}>
      <header style={s.hero}>
        <div style={s.logo}>DRB</div>
        <h1>Daily Ride Bazar</h1>
        <p>Safar bhi, Saman Transport bhi</p>
        <p style={s.smallLight}>Asaan booking • Munasib commission</p>
      </header>

      <nav style={s.nav}>
        <a href="#booking">Booking</a>
        <a href="#map">Map & GPS</a>
        <a href="#fare">Kiraya</a>
        <a href="#account">Account</a>
      </nav>

      <section style={s.section}>
        <h2>Apni Service Chunein</h2>
        <div style={s.row}>
          {["Ride", "Goods"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setVehicle("");
                setMessage("");
              }}
              style={s.modeBtn(mode === m)}
            >
              {m === "Ride" ? "🚕 Ride Lo" : "📦 Saman Bhejo"}
            </button>
          ))}
        </div>
      </section>

      <section style={s.section}>
        <h2>Vehicle Select Karein</h2>
        <p style={s.muted}>
          {availableVehicles.length} options. Apni zaroorat ke mutabiq chunein.
        </p>
        <div style={s.grid}>
          {availableVehicles.map((v) => (
            <button
              type="button"
              key={v.name}
              onClick={() => setVehicle(v.name)}
              style={s.vehicle(vehicle === v.name)}
            >
              <img
                src={v.image}
                alt={v.name}
                width="72"
                height="58"
                loading="lazy"
                style={s.vehicleImage}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "block";
                }}
              />
              <span style={{ display: "none", fontSize: 30 }}>🚘</span>
              <strong>{v.name}</strong>
              <span style={s.vehicleType}>
                {v.use === "Both" ? "Ride / Goods" : v.use}
              </span>
              {vehicle === v.name && <span style={s.selected}>✓ Selected</span>}
            </button>
          ))}
        </div>
      </section>

      <section id="map" style={s.section}>
        <h2>Map aur GPS Location</h2>
        <p style={s.muted}>
          GPS button se phone ki location lene ki koshish karein.
          Location permission zaroori hai.
        </p>

        <div style={s.mapFrame}>
          <iframe
            title="OpenStreetMap Pakistan"
            src="https://www.openstreetmap.org/export/embed.html?bbox=66.85%2C24.75%2C67.20%2C25.10&layer=mapnik"
            loading="lazy"
            style={s.map}
          />
        </div>

        <div style={s.row}>
          <button
            type="button"
            style={s.primaryBtn}
            onClick={getLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? "Location mil rahi hai..." : "📍 Meri Location Lo"}
          </button>
          <button type="button" style={s.secondaryBtn} onClick={openMap}>
            Map Kholein
          </button>
        </div>

        {location && (
          <div style={s.info}>
            <strong>GPS coordinates</strong>
            <p>{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
            <a
              href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=16/${location.lat}/${location.lng}`}
              target="_blank"
              rel="noreferrer"
            >
              Location map par dekhein
            </a>
          </div>
        )}
      </section>

      <section id="booking" style={s.section}>
        <h2>{mode === "Ride" ? "Ride Booking" : "Saman Transport Booking"}</h2>
        <form onSubmit={submitBooking} style={s.form}>
          <label style={s.label}>
            Pickup Location
            <input
              style={s.input}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Pickup address ya GPS location"
              required
            />
          </label>

          <label style={s.label}>
            Destination / Drop Location
            <input
              style={s.input}
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="Jahan jana hai"
              required
            />
          </label>

          <button type="button" style={s.secondaryBtn} onClick={getLocation}>
            📍 Pickup ke liye GPS use karein
          </button>

          <label style={s.label}>
            Contact Number
            <input
              style={s.input}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Test ke liye number"
              autoComplete="tel"
              required
            />
          </label>

          <label style={s.label}>
            Test Kiraya (Rs.)
            <input
              style={s.input}
              type="number"
              min="1"
              value={fare}
              onChange={(e) => setFare(e.target.value)}
              required
            />
          </label>

          <button type="submit" style={s.primaryBtn}>
            Booking Form Test Karein
          </button>
        </form>

        {message && <p role="status" style={s.message}>{message}</p>}
        <p style={s.warning}>
          Test version: yeh form booking ko database mein save ya rider ko
          dispatch nahi karta.
        </p>
      </section>

      <section id="fare" style={s.section}>
        <h2>10% Commission Calculator</h2>
        <label style={s.label}>
          Kiraya (Rs.)
          <input
            style={s.input}
            type="number"
            min="0"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
          />
        </label>

        <div style={s.moneyCard}>
          <div><span>Test kiraya</span><strong>{money(amount)}</strong></div>
          <div><span>Owner commission (10%)</span><strong>{money(commission)}</strong></div>
          <div><span>Rider ka baqi hissa</span><strong>{money(riderAmount)}</strong></div>
        </div>
        <p style={s.muted}>
          Yeh sirf hisaab hai. Abhi koi payment transfer ya commission wasool nahi hota.
        </p>
      </section>

      <section id="account" style={s.section}>
        <h2>Account Registration — Test</h2>
        <p style={s.muted}>
          Registration ka demo form. Abhi account create ya verify nahi hota.
        </p>
        <div style={s.row}>
          {["Customer", "Rider"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              style={s.modeBtn(role === r)}
            >
              {r}
            </button>
          ))}
        </div>
        <p style={s.info}>
          {role === "Rider"
            ? "Rider ke liye agle marhale mein vehicle documents, driving licence aur payment-provider verification jorenge."
            : "Customer ke liye agle marhale mein secure sign-in aur booking history jorenge."}
        </p>
      </section>

      <footer style={s.footer}>
        <strong>Daily Ride Bazar</strong>
        <p>Har safar, asaan tareeqe se.</p>
        <small>Initial test version — production app nahi.</small>
      </footer>
    </main>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    color: "#0f172a",
    fontFamily: "Arial, sans-serif",
    padding: "0 0 28px",
  },
  hero: {
    background: "linear-gradient(135deg,#14532d,#15803d,#0f766e)",
    color: "white",
    textAlign: "center",
    padding: "32px 16px",
  },
  logo: {
    margin: "0 auto 12px",
    width: 64,
    height: 64,
    borderRadius: 18,
    display: "grid",
    placeItems: "center",
    background: "white",
    color: "#166534",
    fontSize: 22,
    fontWeight: 900,
  },
  smallLight: { fontSize: 13, opacity: 0.9 },
  nav: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
    padding: 14,
    background: "white",
  },
  section: {
    maxWidth: 900,
    margin: "20px auto",
    padding: 18,
    background: "white",
    borderRadius: 16,
    boxShadow: "0 3px 12px rgba(15,23,42,.06)",
    boxSizing: "border-box",
    width: "calc(100% - 24px)",
  },
  row: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 },
  modeBtn: (active) => ({
    flex: "1 1 130px",
    padding: 14,
    borderRadius: 10,
    border: active ? "2px solid #15803d" : "1px solid #cbd5e1",
    background: active ? "#15803d" : "white",
    color: active ? "white" : "#0f172a",
    fontWeight: 700,
    fontSize: 15,
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(125px,1fr))",
    gap: 10,
    marginTop: 14,
  },
  vehicle: (active) => ({
    minHeight: 130,
    padding: 12,
    borderRadius: 12,
    border: active ? "2px solid #15803d" : "1px solid #dbe3ec",
    background: active ? "#f0fdf4" : "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    color: "#0f172a",
  }),
  vehicleImage: { objectFit: "contain", maxWidth: "100%" },
  vehicleType: { fontSize: 11, color: "#64748b" },
  selected: { fontSize: 12, color: "#15803d", fontWeight: 700 },
  mapFrame: {
    width: "100%",
    height: 320,
    border: "1px solid #cbd5e1",
    borderRadius: 12,
    overflow: "hidden",
    margin: "12px 0",
  },
  map: { width: "100%", height: "100%", border: 0 },
  primaryBtn: {
    flex: "1 1 170px",
    padding: 14,
    background: "#15803d",
    color: "white",
    border: 0,
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 15,
  },
  secondaryBtn: {
    flex: "1 1 150px",
    padding: 13,
    background: "#eff6ff",
    color: "#1d4ed8",
    border: "1px solid #bfdbfe",
    borderRadius: 10,
    fontWeight: 700,
  },
  form: { display: "flex", flexDirection: "column", gap: 15, marginTop: 12 },
  label: { display: "flex", flexDirection: "column", gap: 7, fontWeight: 700 },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 13,
    border: "1px solid #cbd5e1",
    borderRadius: 9,
    fontSize: 16,
    background: "white",
    color: "#0f172a",
  },
  muted: { color: "#64748b", fontSize: 14, lineHeight: 1.6 },
  info: {
    marginTop: 12,
    padding: 13,
    background: "#f0fdf4",
    borderRadius: 10,
    lineHeight: 1.7,
    overflowWrap: "anywhere",
  },
  message: {
    padding: 14,
    background: "#ecfdf5",
    color: "#166534",
    borderRadius: 10,
    lineHeight: 1.6,
    overflowWrap: "anywhere",
  },
  warning: { fontSize: 12, color: "#92400e", lineHeight: 1.6 },
  moneyCard: {
    display: "grid",
    gap: 12,
    padding: 16,
    marginTop: 14,
    background: "#f8fafc",
    borderRadius: 12,
  },
  footer: { textAlign: "center", padding: 24, color: "#64748b" },
};
