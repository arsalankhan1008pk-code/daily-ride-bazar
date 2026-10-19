
"use client";

import { useMemo, useState } from "react";

const vehicles = [
  { name: "Man Bike", use: "Ride", min: 200, photo: "photo-1558981806-ec527fa84c39" },
  { name: "Riksha", use: "Ride", min: 250, photo: "photo-1558618666-fcd25c85cd64" },
  { name: "Mini Car", use: "Ride", min: 300, photo: "photo-1503376780353-7e6692767b70" },
  { name: "Big Car", use: "Ride", min: 500, photo: "photo-1492144534655-ae79c964c9d7" },
  { name: "Hiroof", use: "Both", min: 500, photo: "photo-1511919884226-fd3cad34687c" },
  { name: "Hiaxe", use: "Both", min: 700, photo: "photo-1549317661-bd32c8ce0db2" },
  { name: "Coster", use: "Both", min: 1200, photo: "photo-1507136566006-cfc505b114fc" },
  { name: "Hino Bus", use: "Ride", min: 2500, photo: "photo-1570125909232-eb263c188f7e" },
  { name: "Truck", use: "Goods", min: 1500, photo: "photo-1601584115197-04ecc0da31d7" },
  { name: "Hino Truck", use: "Goods", min: 2500, photo: "photo-1519003722824-194d4455a60c" },
  { name: "Suzuki Every", use: "Both", min: 500, photo: "photo-1503736334956-4c8f8e92946d" },
  { name: "Nissan", use: "Both", min: 600, photo: "photo-1486262715619-67b85e0b08d3" },
  { name: "Changan", use: "Both", min: 500, photo: "photo-1552519507-da3b142c6e3d" },
  { name: "Suzuki Loading", use: "Goods", min: 700, photo: "photo-1566933293069-b55c7f326dd4" },
];

export default function Home() {
  const [mode, setMode] = useState("Ride");
  const [selected, setSelected] = useState("Man Bike");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("500");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const available = useMemo(
    () => vehicles.filter((v) =>
      mode === "Ride"
        ? v.use === "Ride" || v.use === "Both"
        : v.use === "Goods" || v.use === "Both"
    ),
    [mode]
  );

  const vehicle = vehicles.find((v) => v.name === selected);
  const amount = Math.max(Number(fare) || 0, vehicle?.min || 0);
  const commission = Math.round(amount * 0.10);
  const riderGets = amount - commission;

  function changeMode(nextMode) {
    setMode(nextMode);
    const list = vehicles.filter((v) =>
      nextMode === "Ride"
        ? v.use === "Ride" || v.use === "Both"
        : v.use === "Goods" || v.use === "Both"
    );
    if (list.length) {
      setSelected(list[0].name);
      setFare(String(list[0].min));
    }
    setMessage("");
  }

  function selectVehicle(v) {
    setSelected(v.name);
    setFare(String(v.min));
    setMessage("");
  }

  function useMyLocation() {
    setMessage("");
    if (!navigator.geolocation) {
      setMessage("Is phone mein location ki sahulat available nahi.");
      return;
    }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPickup(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        setBusy(false);
        setMessage("GPS location mil gayi. Pakistan ke andar hone ki tasdeeq abhi server se nahi hoti.");
      },
      () => {
        setBusy(false);
        setMessage("Location nahi mili. Phone ki Location permission on karein.");
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }

  function requestBooking() {
    if (!pickup.trim() || !destination.trim()) {
      setMessage("Meherbani karke pickup aur destination dono likhein.");
      return;
    }
    if (amount <= 0 || !Number.isFinite(amount)) {
      setMessage("Sahi fare enter karein.");
      return;
    }
    setMessage(
      "Yeh abhi demo hai: booking server par save nahi hui aur koi rider assign nahi hua. Agle marhalay mein database aur rider matching jorenge."
    );
  }

  return (
    <main className="page">
      <header className="header">
        <div className="logo">DRB</div>
        <div>
          <h1>Daily Ride Bazar</h1>
          <p>Apna safar, apni sahulat</p>
        </div>
      </header>

      <section className="welcome">
        <span className="eyebrow">PAKISTAN</span>
        <h2>Safar kahan ka hai?</h2>
        <p>Apni sawari select karein aur booking ki tafseel bharein.</p>
      </section>

      <div className="tabs">
        <button
          className={mode === "Ride" ? "tab active" : "tab"}
          onClick={() => changeMode("Ride")}
        >
          Passenger Ride
        </button>
        <button
          className={mode === "Goods" ? "tab active" : "tab"}
          onClick={() => changeMode("Goods")}
        >
          Goods Transport
        </button>
      </div>

      <section className="section">
        <div className="section-heading">
          <h2>{mode === "Ride" ? "Apni sawari chunein" : "Samaan ke liye gari chunein"}</h2>
          <span>{available.length} options</span>
        </div>

        <div className="vehicles">
          {available.map((v) => (
            <button
              type="button"
              key={v.name}
              onClick={() => selectVehicle(v)}
              className={selected === v.name ? "vehicle chosen" : "vehicle"}
              aria-pressed={selected === v.name}
            >
              <img
                src={`https://images.unsplash.com/${v.photo}?auto=format&fit=crop&w=500&q=75`}
                alt={v.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling.style.display = "flex";
                }}
              />
              <div className="photo-fallback">{v.name}</div>
              <div className="vehicle-info">
                <strong>{v.name}</strong>
                <span>Minimum Rs. {v.min.toLocaleString("en-PK")}</span>
              </div>
              <span className="check">{selected === v.name ? "✓" : "+"}</span>
            </button>
          ))}
        </div>
        <p className="note">
          Vehicle photos filhal sample hain. Launch se pehle har category ki
          sahi, istemal ki ijazat wali photo lagani hogi.
        </p>
      </section>

      <section className="section booking">
        <h2>Booking ki tafseel</h2>

        <label htmlFor="pickup">Pickup kahan se?</label>
        <input
          id="pickup"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder="Area, road ya pickup address"
        />
        <button type="button" className="location-btn" onClick={useMyLocation} disabled={busy}>
          {busy ? "Location li ja rahi hai..." : "◎ Meri current GPS location"}
        </button>

        <label htmlFor="destination">Manzil kahan hai?</label>
        <input
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination ka address"
        />

        <label htmlFor="fare">Andazay ka fare (Rs.)</label>
        <input
          id="fare"
          type="number"
          min={vehicle?.min || 1}
          value={fare}
          onChange={(e) => setFare(e.target.value)}
          inputMode="numeric"
        />

        <div className="fare-box">
          <div><span>Selected vehicle</span><strong>{selected}</strong></div>
          <div><span>Fare</span><strong>Rs. {amount.toLocaleString("en-PK")}</strong></div>
          <div><span>Rider commission (10%)</span><strong>Rs. {commission.toLocaleString("en-PK")}</strong></div>
          <div><span>Rider ka hissa, commission se pehle ke fare ke baad</span><strong>Rs. {riderGets.toLocaleString("en-PK")}</strong></div>
        </div>

        <button type="button" className="book-btn" onClick={requestBooking}>
          Booking ki tafseel check karein
        </button>

        {message && <div className="message" role="status">{message}</div>}
        <p className="note">
          Fare abhi aap khud enter karte hain. Distance-based fare, driver
          matching aur real booking backend agle marhalon mein banenge.
        </p>
      </section>

      <footer>
        <strong>Daily Ride Bazar</strong>
        <p>Har safar mein asani</p>
        <small>Customer demo • Abhi live booking service nahi</small>
      </footer>

      <style jsx>{`
        * { box-sizing: border-box; }
        .page {
          min-height: 100vh; background: #f4f7f6; color: #172a32;
          font-family: Arial, Helvetica, sans-serif; padding-bottom: 32px;
        }
        .header {
          display: flex; align-items: center; gap: 12px; padding: 18px 16px;
          background: #092f35; color: white;
        }
        .logo {
          width: 48px; height: 48px; border-radius: 14px; display: grid;
          place-items: center; background: #20b77a; color: #062c31;
          font-weight: 900; font-size: 17px;
        }
        h1 { margin: 0; font-size: 20px; }
        .header p { margin: 4px 0 0; color: #c8e3dd; font-size: 12px; }
        .welcome { padding: 25px 16px 18px; }
        .eyebrow { color: #16845b; font-weight: 800; font-size: 11px; letter-spacing: 2px; }
        h2 { margin: 7px 0; font-size: 19px; }
        .welcome p { margin: 7px 0 0; color: #63737a; font-size: 13px; line-height: 1.5; }
        .tabs { display: flex; gap: 8px; padding: 0 16px 16px; }
        button { cursor: pointer; font: inherit; }
        .tab {
          flex: 1; border: 1px solid #d5e1dd; border-radius: 12px;
          background: white; padding: 12px 7px; font-weight: 700; font-size: 12px;
        }
        .tab.active { background: #0b5147; color: white; border-color: #0b5147; }
        .section {
          background: white; border-radius: 18px; padding: 17px 14px;
          margin: 0 12px 16px; box-shadow: 0 3px 15px #153f3510;
        }
        .section-heading { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
        .section-heading h2 { font-size: 16px; }
        .section-heading span { color: #16845b; font-size: 12px; white-space: nowrap; }
        .vehicles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 13px; }
        .vehicle {
          min-width: 0; text-align: left; padding: 0; overflow: hidden; position: relative;
          border: 2px solid #e6eeeb; border-radius: 13px; background: #fff;
        }
        .vehicle.chosen { border-color: #17a66b; background: #f2fff8; }
        .vehicle img { display: block; width: 100%; height: 105px; object-fit: cover; background: #e6eeeb; }
        .photo-fallback {
          display: none; height: 105px; background: linear-gradient(135deg,#d9eee5,#eef4f2);
          color: #315a50; align-items: center; justify-content: center; font-weight: 700;
        }
        .vehicle-info { display: flex; flex-direction: column; gap: 5px; padding: 10px 8px; }
        .vehicle-info strong { font-size: 13px; }
        .vehicle-info span { color: #60716c; font-size: 11px; }
        .check {
          position: absolute; right: 7px; top: 7px; width: 25px; height: 25px;
          display: grid; place-items: center; border-radius: 50%; background: white;
          color: #0b7853; font-weight: 900; box-shadow: 0 1px 5px #0002;
        }
        .note { color: #73817c; font-size: 11px; line-height: 1.5; margin: 13px 1px 0; }
        .booking h2 { margin-bottom: 18px; }
        label { display: block; margin: 15px 0 7px; font-weight: 700; font-size: 13px; }
        input {
          width: 100%; border: 1px solid #d4e0dc; background: #fff; border-radius: 10px;
          padding: 13px 12px; font-size: 14px; color: #172a32; outline-color: #149a67;
        }
        .location-btn {
          width: 100%; padding: 11px; margin-top: 8px; border: 1px solid #bfe4d3;
          background: #effaf4; color: #08784c; border-radius: 10px; font-weight: 700; font-size: 12px;
        }
        .location-btn:disabled { opacity: .6; }
        .fare-box {
          background: #f2f7f5; border-radius: 12px; padding: 12px; margin-top: 17px;
        }
        .fare-box div { display: flex; justify-content: space-between; gap: 12px; padding: 8px 0; border-bottom: 1px solid #dce7e2; }
        .fare-box div:last-child { border: 0; }
        .fare-box span { color: #63736d; font-size: 12px; line-height: 1.4; }
        .fare-box strong { text-align: right; font-size: 12px; }
        .book-btn {
          width: 100%; margin-top: 16px; padding: 15px 10px; border: 0; border-radius: 12px;
          background: #13a76a; color: white; font-weight: 800; font-size: 14px;
        }
        .message {
          margin-top: 12px; padding: 12px; background: #fff8e7; border: 1px solid #f0dfae;
          border-radius: 10px; color: #604a13; font-size: 12px; line-height: 1.5;
        }
        footer { text-align: center; padding: 12px; color: #6d7c76; font-size: 12px; }
        footer strong { color: #0b5147; }
        footer p { margin: 5px; }
        footer small { font-size: 10px; }
        @media (min-width: 650px) {
          .page { max-width: 760px; margin: 0 auto; }
          .vehicles { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .vehicle img, .photo-fallback { height: 130px; }
        }
      `}</style>
    </main>
  );
}
