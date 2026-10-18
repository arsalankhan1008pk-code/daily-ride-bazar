"use client";

import { useState } from "react";

const vehicles = [
  { name: "Lady Bike", icon: "🏍️", use: "Ride" },
  { name: "Man Bike", icon: "🏍️", use: "Ride" },
  { name: "Riksha", icon: "🛺", use: "Both" },
  { name: "Mini Car", icon: "🚗", use: "Both" },
  { name: "Big Car", icon: "🚘", use: "Both" },
  { name: "Hiroof", icon: "🚐", use: "Both" },
  { name: "Hiaxe", icon: "🚐", use: "Both" },
  { name: "Coster", icon: "🚌", use: "Both" },
  { name: "Hino Bus", icon: "🚌", use: "Both" },
  { name: "Truck", icon: "🚚", use: "Goods" },
  { name: "Hino Truck", icon: "🚛", use: "Goods" },
  { name: "Suzuki Every", icon: "🚐", use: "Both" },
  { name: "Nissan", icon: "🚐", use: "Both" },
  { name: "Changan", icon: "🚐", use: "Both" },
  { name: "Suzuki Pickup", icon: "🛻", use: "Goods" },
];

export default function Home() {
  const [mode, setMode] = useState("Ride");
  const [vehicle, setVehicle] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const availableVehicles = vehicles.filter((v) => {
    if (mode === "Ride") {
      return v.use === "Ride" || v.use === "Both";
    }
    return v.use === "Goods" || v.use === "Both";
  });

  function submitBooking(e) {
    e.preventDefault();

    if (!vehicle || !pickup.trim() || !drop.trim() || !phone.trim()) {
      setMessage("Meherbani karke tamam fields bharein.");
      return;
    }

    setMessage(
      "Booking form tayyar hai. Abhi booking server se connect nahi hai, is liye request bheji nahi gayi."
    );
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={{ fontSize: 42 }}>📍🚘</div>
        <h1 style={{ margin: "8px 0" }}>Daily Ride Bazar</h1>
        <p>Ride Booking aur Saman Transport</p>
        <p style={{ fontSize: 14 }}>
          Apni zaroorat ke mutabiq vehicle select karein
        </p>
      </header>

      <section style={styles.section}>
        <h2>Apni Service Chunein</h2>
        <div style={styles.buttonRow}>
          <button
            type="button"
            onClick={() => {
              setMode("Ride");
              setVehicle("");
              setMessage("");
            }}
            style={{
              ...styles.modeButton,
              background: mode === "Ride" ? "#15803d" : "#e5e7eb",
              color: mode === "Ride" ? "white" : "#111827",
            }}
          >
            🚕 Ride Lo
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("Goods");
              setVehicle("");
              setMessage("");
            }}
            style={{
              ...styles.modeButton,
              background: mode === "Goods" ? "#15803d" : "#e5e7eb",
              color: mode === "Goods" ? "white" : "#111827",
            }}
          >
            📦 Saman Bhejo
          </button>
        </div>
      </section>

      <section style={styles.section}>
        <h2>Vehicle Select Karein</h2>
        <div style={styles.grid}>
          {availableVehicles.map((v) => (
            <button
              key={v.name}
              type="button"
              onClick={() => {
                setVehicle(v.name);
                setMessage("");
              }}
              style={{
                ...styles.vehicle,
                border:
                  vehicle === v.name
                    ? "2px solid #15803d"
                    : "1px solid #d1d5db",
                background: vehicle === v.name ? "#dcfce7" : "white",
              }}
            >
              <span style={{ fontSize: 30 }}>{v.icon}</span>
              <strong>{v.name}</strong>
              <span style={{ fontSize: 12 }}>
                {vehicle === v.name ? "Selected ✓" : "Select karein"}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2>{mode === "Ride" ? "Ride Booking Form" : "Goods Booking Form"}</h2>

        <form onSubmit={submitBooking} style={styles.form}>
          <label style={styles.label}>
            Pickup Location
            <input
              style={styles.input}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Jahan se pickup karna hai"
              required
            />
          </label>

          <label style={styles.label}>
            Drop Location
            <input
              style={styles.input}
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="Jahan jana hai"
              required
            />
          </label>

          <label style={styles.label}>
            Contact Number
            <input
              style={styles.input}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Customer ka contact number"
              autoComplete="tel"
              required
            />
          </label>

          <p style={{ fontSize: 13, color: "#64748b" }}>
            Yeh demo form hai. Abhi maloomat server par save ya kisi ko send
            nahi hoti. Testing ke liye asli personal details na likhein.
          </p>

          <button type="submit" style={styles.submit}>
            Booking Details Check Karein
          </button>

          {message && (
            <p role="status" style={styles.message}>
              {message}
            </p>
          )}
        </form>
      </section>

      <footer style={styles.footer}>
        <p>© 2026 Daily Ride Bazar</p>
        <p>Customer aur rider registration ke liye koi fee nahi.</p>
      </footer>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    fontFamily: "Arial, sans-serif",
    padding: "16px",
    boxSizing: "border-box",
  },
  header: {
    background: "#15803d",
    color: "white",
    textAlign: "center",
    padding: "28px 16px",
    borderRadius: 16,
  },
  section: {
    maxWidth: 900,
    margin: "24px auto",
    padding: 18,
    background: "white",
    borderRadius: 14,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  modeButton: {
    flex: "1 1 140px",
    padding: 15,
    border: 0,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))",
    gap: 10,
  },
  vehicle: {
    minHeight: 115,
    padding: 12,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    cursor: "pointer",
    color: "#0f172a",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 13,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    fontSize: 16,
  },
  submit: {
    background: "#15803d",
    color: "white",
    padding: 14,
    border: 0,
    borderRadius: 9,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
  message: {
    background: "#f1f5f9",
    padding: 12,
    borderRadius: 8,
    lineHeight: 1.5,
  },
  footer: {
    textAlign: "center",
    color: "#64748b",
    padding: 20,
    fontSize: 14,
  },
};
