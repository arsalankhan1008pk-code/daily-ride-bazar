
"use client";

import { useState } from "react";

const VEHICLES = [
  { id: "bike", name: "Bike", icon: "🏍️", min: 200, rate: 25 },
  { id: "riksha", name: "Riksha", icon: "🛺", min: 250, rate: 35 },
  { id: "mini-car", name: "Mini Car", icon: "🚗", min: 300, rate: 45 },
  { id: "big-car", name: "Big Car", icon: "🚘", min: 400, rate: 60 },
  { id: "every", name: "Suzuki Every", icon: "🚐", min: 500, rate: 75 },
  { id: "changan", name: "Changan", icon: "🚙", min: 600, rate: 85 },
];

const SERVICES = [
  { id: "ride", name: "Ride", icon: "🚕" },
  { id: "delivery", name: "Delivery", icon: "📦" },
  { id: "event", name: "Picnic / Shadi / Party", icon: "🎉" },
];

const money = (amount) =>
  "Rs. " + Math.round(amount).toLocaleString("en-PK");

export default function Home() {
  const [service, setService] = useState("ride");
  const [vehicle, setVehicle] = useState("bike");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [details, setDetails] = useState("");
  const [pickupTime, setPickupTime] = useState("now");
  const [distance, setDistance] = useState("5");
  const [notice, setNotice] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);

  const selectedVehicle =
    VEHICLES.find((item) => item.id === vehicle) || VEHICLES[0];

  const km = Math.max(1, Number(distance) || 1);
  const fare = Math.max(
    selectedVehicle.min,
    selectedVehicle.min + Math.max(0, km - 1) * selectedVehicle.rate
  );
  const commission = Math.round(fare * 0.1);
  const riderEarning = fare - commission;

  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("Is browser mein GPS available nahi hai.");
      return;
    }

    setLocationStatus("Location permission ka intezar hai...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lng = position.coords.longitude.toFixed(5);

        setPickup(`GPS: ${lat}, ${lng}`);
        setLocationStatus("GPS location mil gayi. Address verify karein.");
      },
      () => {
        setLocationStatus(
          "Location nahi mili. Browser settings mein location allow karein."
        );
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }

  function calculateFare(event) {
    event.preventDefault();

    if (!pickup.trim() || !destination.trim()) {
      setNotice("Pickup aur destination dono likhna zaroori hai.");
      setShowEstimate(false);
      return;
    }

    if (pickup.trim().toLowerCase() === destination.trim().toLowerCase()) {
      setNotice("Pickup aur destination alag hone chahiye.");
      setShowEstimate(false);
      return;
    }

    setNotice("");
    setShowEstimate(true);
  }

  function requestBooking() {
    setNotice(
      "Fare estimate tayyar hai, lekin live booking abhi connected nahi. " +
      "Asal driver ko request bhejne ke liye secure backend aur driver system " +
      "connect karna baqi hai."
    );
  }

  return (
    <main className="app">
      <header className="topbar">
        <button
          className="menuButton"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
        <div className="brand">
          <span className="brandMark">DR</span>
          <div>
            <strong>Daily Ride Bazar</strong>
            <small>Safar asaan, kiraya munasib</small>
          </div>
        </div>
        <button
          className="profileButton"
          onClick={() =>
            setNotice("Customer aur driver login abhi banana baqi hai.")
          }
          aria-label="Profile"
        >
          👤
        </button>
      </header>

      {menuOpen && (
        <nav className="menuPanel">
          {["Home", "My Rides", "Become a Driver", "Help", "Login"].map(
            (item) => (
              <button
                key={item}
                onClick={() => {
                  setMenuOpen(false);
                  setNotice(
                    item === "Home"
                      ? ""
                      : `${item}: is feature ko backend se connect karna baqi hai.`
                  );
                }}
              >
                {item} →
              </button>
            )
          )}
        </nav>
      )}

      <section className="hero">
        <div className="heroText">
          <span className="eyebrow">PAKISTAN • LOCAL SERVICES</span>
          <h1>Aap kahan jana chahte hain?</h1>
          <p>
            Ride, parcel delivery aur khaas mauqon ke liye gaari
            book karne ka asaan tareeqa.
          </p>
        </div>
        <div className="heroIllustration" aria-hidden="true">
          <span>📍</span>
          <div className="road"></div>
          <span>🚕</span>
        </div>
      </section>

      <div className="content">
        <section className="bookingCard">
          <div className="cardHeading">
            <div>
              <span className="eyebrow">NAYI BOOKING</span>
              <h2>Apna safar chunein</h2>
            </div>
            <span className="commissionBadge">10% commission</span>
          </div>

          <div className="serviceTabs">
            {SERVICES.map((item) => (
              <button
                key={item.id}
                className={
                  service === item.id ? "serviceTab active" : "serviceTab"
                }
                onClick={() => {
                  setService(item.id);
                  setShowEstimate(false);
                  setNotice("");
                }}
              >
                <span>{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>

          <form onSubmit={calculateFare}>
            <label htmlFor="pickup">Pickup kahan se?</label>
            <div className="inputRow">
              <span className="inputIcon green">●</span>
              <input
                id="pickup"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Misal: Gulshan, Karachi"
                required
              />
            </div>

            <button
              type="button"
              className="locationButton"
              onClick={useMyLocation}
            >
              📍 Meri current GPS location lein
            </button>
            {locationStatus && (
              <p className="smallMessage">{locationStatus}</p>
            )}

            <label htmlFor="destination">Manzil kahan hai?</label>
            <div className="inputRow">
              <span className="inputIcon red">●</span>
              <input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Misal: Clifton, Karachi"
                required
              />
            </div>

            <label htmlFor="distance">Andazay ka fasla (kilometre)</label>
            <input
              id="distance"
              className="distanceInput"
              type="number"
              min="1"
              max="300"
              value={distance}
              onChange={(e) => {
                setDistance(e.target.value);
                setShowEstimate(false);
              }}
              required
            />
            <p className="smallMessage">
              Filhal aap fasla khud enter karein. Asal road distance ke liye
              routing service connect karni hogi.
            </p>

            <label>Gaari select karein</label>
            <div className="vehicleGrid">
              {VEHICLES.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={
                    vehicle === item.id ? "vehicle activeVehicle" : "vehicle"
                  }
                  onClick={() => {
                    setVehicle(item.id);
                    setShowEstimate(false);
                  }}
                >
                  <span className="vehicleIcon">{item.icon}</span>
                  <strong>{item.name}</strong>
                  <small>Minimum {money(item.min)}</small>
                  {vehicle === item.id && <span className="check">✓</span>}
                </button>
              ))}
            </div>

            {service === "event" && (
              <>
                <label htmlFor="time">Booking ka waqt</label>
                <select
                  id="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                >
                  <option value="now">Abhi</option>
                  <option value="later">Baad mein / schedule</option>
                </select>
              </>
            )}

            {service === "delivery" && (
              <>
                <label htmlFor="details">Parcel ki tafseel</label>
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Parcel kya hai aur kitna bara hai?"
                  rows={3}
                />
              </>
            )}

            <button className="primaryButton" type="submit">
              Kiraya calculate karein →
            </button>
          </form>

          {notice && (
            <div className="notice" role="status">
              {notice}
            </div>
          )}

          {showEstimate && (
            <section className="estimate">
              <div className="estimateHeader">
                <span>ESTIMATED FARE</span>
                <strong>{money(fare)}</strong>
              </div>
              <div className="fareLine">
                <span>Gaari</span>
                <strong>{selectedVehicle.name}</strong>
              </div>
              <div className="fareLine">
                <span>Andazay ka fasla</span>
                <strong>{km} km</strong>
              </div>
              <div className="fareLine">
                <span>Platform commission (10%)</span>
                <strong>{money(commission)}</strong>
              </div>
              <div className="fareLine">
                <span>Rider ki raqam, commission ke baad</span>
                <strong>{money(riderEarning)}</strong>
              </div>
              <p className="smallMessage">
                Ye demo estimate hai, final fare nahi. Asal fare traffic,
                road distance aur service policy se mukhtalif ho sakta hai.
              </p>
              <button
                className="primaryButton"
                type="button"
                onClick={requestBooking}
              >
                Booking ke liye aage barhein →
              </button>
            </section>
          )}
        </section>

        <aside className="infoCard">
          <h2>Daily Ride Bazar kyun?</h2>
          <div className="infoItem">
            <span>💚</span>
            <div>
              <strong>Rider se sirf 10%</strong>
              <p>Rs. 500 kiraye par Rs. 50 commission ka hisaab.</p>
            </div>
          </div>
          <div className="infoItem">
            <span>📍</span>
            <div>
              <strong>Local safar</strong>
              <p>Shehar ke andar pickup aur destination ki sahulat.</p>
            </div>
          </div>
          <div className="infoItem">
            <span>📦</span>
            <div>
              <strong>Delivery aur events</strong>
              <p>Parcel, picnic, shadi aur party ke liye booking ka plan.</p>
            </div>
          </div>
          <div className="securityNote">
            🔒 Asal booking, driver verification aur payments ko live karne
            se pehle secure backend zaroori hai.
          </div>
        </aside>
      </div>

      <footer className="footer">
        <strong>Daily Ride Bazar</strong>
        <p>Har safar mein asaani.</p>
        <small>© {new Date().getFullYear()} Daily Ride Bazar</small>
      </footer>

      <style jsx>{`
        * { box-sizing: border-box; }
        .app {
          min-height: 100vh;
          background: #f3f7f5;
          color: #182b28;
          font-family: Arial, Helvetica, sans-serif;
        }
        button, input, select, textarea { font: inherit; }
        button { cursor: pointer; }
        .topbar {
          min-height: 76px;
          padding: 12px clamp(14px, 4vw, 48px);
          display: flex;
          align-items: center;
          gap: 14px;
          background: #102c2a;
          color: white;
        }
        .brand { display: flex; align-items: center; gap: 10px; flex: 1; }
        .brandMark {
          width: 44px; height: 44px; display: grid; place-items: center;
          border-radius: 13px; background: #13b99d; color: #092e29;
          font-size: 18px; font-weight: 900;
        }
        .brand strong { display: block; font-size: 17px; }
        .brand small { display: block; margin-top: 4px; color: #b6d2cb; }
        .menuButton, .profileButton {
          border: 0; background: transparent; color: white; font-size: 25px;
          padding: 8px;
        }
        .menuPanel {
          background: #fff; padding: 8px 20px; display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 6px; box-shadow: 0 4px 12px #0001;
        }
        .menuPanel button {
          border: 0; background: #edf7f3; border-radius: 8px;
          text-align: left; padding: 12px;
        }
        .hero {
          background: linear-gradient(120deg, #103e38, #087f71);
          color: white; padding: 32px clamp(18px, 6vw, 72px);
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; min-height: 220px; overflow: hidden;
        }
        .heroText { max-width: 570px; }
        .eyebrow { color: #13a98e; font-weight: 800; font-size: 11px; letter-spacing: 1.3px; }
        .hero .eyebrow { color: #a4f2dc; }
        h1 { font-size: clamp(27px, 5vw, 42px); line-height: 1.15; margin: 12px 0; }
        .hero p { color: #d6ebe5; line-height: 1.6; max-width: 480px; margin-bottom: 0; }
        .heroIllustration {
          min-width: 170px; height: 130px; display: flex; align-items: center;
          justify-content: center; gap: 8px; font-size: 34px;
        }
        .road { width: 55px; height: 5px; border-radius: 8px; background: #f7d57a; transform: rotate(-25deg); }
        .content {
          max-width: 1100px; margin: -14px auto 0; padding: 0 16px 36px;
          display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(250px, .8fr);
          gap: 20px; align-items: start; position: relative;
        }
        .bookingCard, .infoCard {
          background: white; border-radius: 18px; padding: clamp(17px, 3vw, 28px);
          box-shadow: 0 8px 30px #153e3010; border: 1px solid #e5eeea;
        }
        .cardHeading { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
        h2 { font-size: 21px; margin: 7px 0 18px; }
        .commissionBadge {
          background: #e3f8ef; color: #08775e; border-radius: 30px;
          padding: 8px 11px; font-size: 12px; font-weight: 800; white-space: nowrap;
        }
        .serviceTabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 22px; }
        .serviceTab {
          border: 1px solid #dce8e3; border-radius: 11px; padding: 12px 5px;
          background: #fff; color: #405a54; font-size: 12px; font-weight: 700;
        }
        .serviceTab span { display: block; font-size: 22px; margin-bottom: 6px; }
        .serviceTab.active { border: 2px solid #079b80; background: #e9faf4; color: #08725e; }
        label { display: block; margin: 18px 0 8px; font-weight: 700; font-size: 13px; }
        .inputRow { display: flex; align-items: center; border: 1px solid #dbe5e0; border-radius: 10px; padding: 0 12px; background: #fbfdfc; }
        .inputIcon { font-size: 13px; margin-right: 10px; }
        .green { color: #079b80; } .red { color: #e05c55; }
        input, select, textarea {
          width: 100%; min-width: 0; border: 1px solid #dbe5e0; border-radius: 10px;
          background: #fbfdfc; color: #18332d; padding: 13px 12px; outline-color: #079b80;
        }
        .inputRow input { border: 0; background: transparent; padding: 15px 0; outline: none; }
        .distanceInput { max-width: 180px; }
        .locationButton {
          border: 0; background: transparent; color: #087e6a; font-weight: 700;
          padding: 10px 0 0; font-size: 12px;
        }
        .smallMessage { color: #71837c; font-size: 12px; line-height: 1.5; }
        .vehicleGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
        .vehicle {
          position: relative; display: flex; flex-direction: column; align-items: flex-start;
          border: 1px solid #dfe9e4; background: #fff; border-radius: 12px;
          padding: 12px 9px; text-align: left; min-height: 110px; color: #28433c;
        }
        .vehicle.activeVehicle { border: 2px solid #079b80; background: #effbf6; padding: 11px 8px; }
        .vehicleIcon { font-size: 28px; margin-bottom: 9px; }
        .vehicle strong { font-size: 12px; }
        .vehicle small { color: #70817b; font-size: 10px; margin-top: 5px; }
        .check { position: absolute; right: 7px; top: 7px; color: #079b80; font-weight: 900; }
        .primaryButton {
          width: 100%; border: 0; border-radius: 11px; background: #079b80; color: white;
          font-weight: 800; padding: 15px; margin-top: 22px;
        }
        .primaryButton:hover { background: #087e6a; }
        .notice { margin-top: 16px; background: #fff6df; border: 1px solid #f0dfad; color: #72541a; padding: 13px; border-radius: 10px; line-height: 1.5; font-size: 13px; }
        .estimate { margin-top: 20px; padding: 17px; border-radius: 13px; border: 1px solid #cde9dc; background: #f4fcf8; }
        .estimateHeader { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 15px; }
        .estimateHeader span { font-size: 11px; font-weight: 800; color: #52766a; }
        .estimateHeader strong { font-size: 24px; color: #08775e; }
        .fareLine { display: flex; justify-content: space-between; gap: 10px; padding: 10px 0; border-bottom: 1px solid #dfede6; font-size: 12px; }
        .fareLine strong { text-align: right; }
        .infoCard { margin-top: 18px; }
        .infoCard h2 { margin-top: 0; }
        .infoItem { display: flex; gap: 12px; padding: 15px 0; border-bottom: 1px solid #edf1ef; }
        .infoItem > span { font-size: 25px; }
        .infoItem strong { font-size: 13px; }
        .infoItem p { margin: 6px 0 0; color: #71817b; line-height: 1.5; font-size: 12px; }
        .securityNote { margin-top: 18px; border-radius: 10px; padding: 13px; background: #eff7f3; color: #44665a; font-size: 12px; line-height: 1.6; }
        .footer { background: #102c2a; color: white; padding: 24px; text-align: center; }
        .footer p { color: #b6d2cb; margin: 7px; font-size: 13px; }
        .footer small { color: #9dbab1; }
        @media (max-width: 760px) {
          .content { grid-template-columns: 1fr; }
          .infoCard { margin-top: 0; }
          .heroIllustration { min-width: 75px; font-size: 24px; gap: 2px; }
          .road { width: 25px; }
        }
        @media (max-width: 390px) {
          .brand strong { font-size: 14px; }
          .brand small { font-size: 10px; }
          .brandMark { width: 38px; height: 38px; }
          .heroIllustration { display: none; }
          .vehicleGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .commissionBadge { font-size: 10px; padding: 7px; }
        }
      `}</style>
    </main>
  );
}
