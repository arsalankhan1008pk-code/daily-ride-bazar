"use client";
import { useState, useEffect } from "react";

function PakMap({ pickup, drop, setPickup, setDrop }) {
  const [L, setL] = useState(null);
  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    });
  }, []);
  useEffect(() => {
    if (!L) return;
    const pakBounds = L.latLngBounds(L.latLng(23.0, 60.5), L.latLng(37.5, 80.0));
    const map = L.map("main-map", {
      center: [24.8607, 67.0011], // Karachi start
      zoom: 12,
      minZoom: 5,
      maxBounds: pakBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "© Daily Ride Bazar PK",
      subdomains: "abcd",
    }).addTo(map);
    map.on("click", (e) => {
      if (!pickup) setPickup([e.latlng.lat, e.latlng.lng]);
      else setDrop([e.latlng.lat, e.latlng.lng]);
    });
    if (pickup) L.marker(pickup, { icon: L.divIcon({ html: "<div style='background:#000;color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;border:2px solid white'>A</div>" }) }).addTo(map);
    if (drop) L.marker(drop, { icon: L.divIcon({ html: "<div style='background:red;color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;border:2px solid white'>B</div>" }) }).addTo(map);
    if (pickup && drop) L.polyline([pickup, drop], { color: "black", weight: 5 }).addTo(map);
    return () => map.remove();
  }, [L, pickup, drop]);
  return <div id="main-map" style={{ height: "50vh", width: "100%" }}></div>;
}

const VEHICLES = [
  { id: 1, name: "Bike", price: 200, img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400", seats: "1 Person", num: "Fast" },
  { id: 2, name: "Rickshaw", price: 250, img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400", seats: "3 Persons", num: "Economy" },
  { id: 3, name: "Mini Car", price: 350, img: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400", seats: "4 Persons", num: "Comfort" },
  { id: 4, name: "Every Van", price: 1250, img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400", seats: "7 Persons", num: "Family" },
  { id: 5, name: "Changan Karvaan", price: 2000, img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400", seats: "12 Persons", num: "Loader" },
];

export default function Page() {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [sel, setSel] = useState(VEHICLES[2]);
  const [tab, setTab] = useState("ride"); // ride, driver, service
  const [driver, setDriver] = useState({ name: "", phone: "", vehicle: "Bike", plate: "" });
  const [myLoc, setMyLoc] = useState(null);

  const getGPS = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const loc = [pos.coords.latitude, pos.coords.longitude];
      if (loc[0] >= 23 && loc[0] <= 37.5 && loc[1] >= 60.5 && loc[1] <= 80) {
        setPickup(loc);
        setMyLoc(loc);
        alert("✅ Live Location Mil Gayi - Pakistan!");
      } else {
        alert("Pakistan Only Map hai!");
      }
    }, () => alert("GPS ON karo!"));
  };

  const bookRide = () => {
    if (!pickup || !drop) return alert("Map pe 2 dafa tap karo - A aur B!");
    const text = `*Daily Ride Bazar - New Booking*%0A📍 Pickup: ${pickup[0].toFixed(4)}, ${pickup[1].toFixed(4)}%0A🏁 Drop: ${drop[0].toFixed(4)}, ${drop[1].toFixed(4)}%0A🚗 Gari: ${sel.name} - Rs ${sel.price}%0A👤 Customer Location: https://maps.google.com/?q=${pickup[0]},${pickup[1]}`;
    window.open(`https://wa.me/923001234567?text=${text}`, "_blank");
  };

  const registerDriver = () => {
    if (!driver.name || !driver.phone || !driver.plate) return alert("Sari details bharo!");
    localStorage.setItem("driver_" + driver.phone, JSON.stringify(driver));
    alert(`Mubarak ho ${driver.name}! Aap ${driver.vehicle} ${driver.plate} ke sath register ho gaye!`);
    setDriver({ name: "", phone: "", vehicle: "Bike", plate: "" });
  };

  return (
    <div style={{ fontFamily: "system-ui", background: "#f8f9fa", minHeight: "100vh", maxWidth: 500, margin: "0 auto", position: "relative", boxShadow: "0 0 30px rgba(0,0,0,0.1)" }}>
      {/* Header */}
      <div style={{ background: "black", color: "white", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: "900", fontSize: 18 }}>DAILY RIDE BAZAR 🇵🇰</div>
        <div style={{ fontSize: 11, background: "#222", padding: "4px 8px", borderRadius: 20 }}>● LIVE GPS</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "white", borderBottom: "1px solid #eee" }}>
        {[{ id: "ride", t: "🚖 Ride Book" }, { id: "driver", t: "🧑‍✈️ Driver Join" }, { id: "service", t: "📞 Help" }].map((tb) => (
          <div key={tb.id} onClick={() => setTab(tb.id)} style={{ flex: 1, padding: 14, textAlign: "center", fontWeight: "bold", fontSize: 13, borderBottom: tab === tb.id ? "3px solid black" : "3px solid transparent", background: tab === tb.id ? "#f5f5f5" : "white" }}>{tb.t}</div>
        ))}
      </div>

      {tab === "ride" && (
        <>
          <PakMap pickup={pickup} drop={drop} setPickup={setPickup} setDrop={setDrop} />
          <div style={{ position: "absolute", top: 110, left: 12, right: 12, zIndex: 1000, display: "flex", gap: 8 }}>
            <button onClick={getGPS} style={{ flex: 1, padding: 13, background: "black", color: "white", borderRadius: 12, border: "none", fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>📍 Live GPS Location</button>
            <button onClick={() => { setPickup(null); setDrop(null); }} style={{ padding: 13, background: "white", borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>Clear</button>
          </div>

          <div style={{ background: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20, padding: 18, position: "relative", zIndex: 1001 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <div style={{ flex: 1, background: pickup ? "#000" : "#eee", color: pickup ? "#fff" : "#666", padding: 10, borderRadius: 10, fontSize: 12, textAlign: "center" }}>{pickup ? "✅ Pickup SET" : "A - Tap Map"}</div>
              <div style={{ flex: 1, background: drop ? "red" : "#eee", color: drop ? "#fff" : "#666", padding: 10, borderRadius: 10, fontSize: 12, textAlign: "center" }}>{drop ? "✅ Drop SET" : "B - Tap Map"}</div>
            </div>

            <div style={{ fontWeight: "900", marginBottom: 12 }}>Choose Gari - 5 Options:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {VEHICLES.map((v) => (
                <div key={v.id} onClick={() => setSel(v)} style={{ display: "flex", gap: 12, padding: 12, borderRadius: 16, border: sel.id === v.id ? "2px solid black" : "1px solid #eee", background: sel.id === v.id ? "#f0f0f0" : "white" }}>
                  <img src={v.img} style={{ width: 70, height: 50, objectFit: "cover", borderRadius: 10 }} alt={v.name} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold" }}>{v.name} <span style={{ fontSize: 10, background: "#eee", padding: "2px 6px", borderRadius: 10 }}>{v.num}</span></div>
                    <div style={{ fontSize: 11, color: "#666" }}>{v.seats} • Live GPS • Pakistan Only</div>
                  </div>
                  <div style={{ fontWeight: "900" }}>Rs {v.price}</div>
                </div>
              ))}
            </div>

            <button onClick={bookRide} style={{ width: "100%", padding: 18, background: "black", color: "white", border: "none", borderRadius: 16, fontSize: 18, fontWeight: "900", marginTop: 16 }}>Confirm {sel.name} → Rs {sel.price}</button>
            <div style={{ textAlign: "center", fontSize: 10, color: "#999", marginTop: 8 }}>Clean Map • No Fake Marks • Pakistan Lock • Live GPS</div>
          </div>
        </>
      )}

      {tab === "driver" && (
        <div style={{ padding: 20, background: "white" }}>
          <h2 style={{ fontWeight: "900" }}>🧑‍✈️ Driver Registration</h2>
          <p style={{ fontSize: 13, color: "#666" }}>Gari ki registration yahan karo - Free</p>
          <input value={driver.name} onChange={(e) => setDriver({ ...driver, name: e.target.value })} placeholder="Apna Naam" style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #ddd", marginTop: 12 }} />
          <input value={driver.phone} onChange={(e) => setDriver({ ...driver, phone: e.target.value })} placeholder="WhatsApp Number 03XX" style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #ddd", marginTop: 12 }} />
          <select value={driver.vehicle} onChange={(e) => setDriver({ ...driver, vehicle: e.target.value })} style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #ddd", marginTop: 12 }}>
            {VEHICLES.map((v) => <option key={v.id} value={v.name}>{v.name}</option>)}
          </select>
          <input value={driver.plate} onChange={(e) => setDriver({ ...driver, plate: e.target.value })} placeholder="Number Plate - LEA-1234" style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #ddd", marginTop: 12 }} />
          <button onClick={registerDriver} style={{ width: "100%", padding: 16, background: "black", color: "white", border: "none", borderRadius: 12, fontWeight: "bold", marginTop: 16 }}>Register as Driver ✅</button>
          <div style={{ marginTop: 20, background: "#f5f5f5", padding: 14, borderRadius: 12, fontSize: 12 }}>🔒 Data apke mobile me save hoga - GPS live rahega - Customer aapko direct call karega</div>
        </div>
      )}

      {tab === "service" && (
        <div style={{ padding: 20, background: "white", minHeight: "70vh" }}>
          <h2 style={{ fontWeight: "900" }}>📞 Customer Service</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            <a href="https://wa.me/923001234567" style={{ padding: 16, background: "#25D366", color: "white", borderRadius: 12, textDecoration: "none", fontWeight: "bold", textAlign: "center" }}>💬 WhatsApp Help - 24/7</a>
            <div style={{ padding: 16, background: "#f5f5f5", borderRadius: 12 }}>
              <div style={{ fontWeight: "bold" }}>🆘 Emergency?</div>
              <div style={{ fontSize: 13, marginTop: 6 }}>Call: 0300-1234567<br />Email: help@dailyridebazar.com<br />Timing: 24 Hours Pakistan</div>
            </div>
            <div style={{ padding: 16, background: "black", color: "white", borderRadius: 12 }}>
              <div style={{ fontWeight: "bold" }}>📍 Live Tracking</div>
              <div style={{ fontSize: 12, marginTop: 6 }}>GPS ON hai - Aapki location driver ko live dikhegi. Map sirf Pakistan tak lock hai. Saaf map hai koi farzi nishan nahi.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
