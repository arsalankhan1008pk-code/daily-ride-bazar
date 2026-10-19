"use client";
import { useState } from "react";

export default function Home() {
  const [ride, setRide] = useState("Mini");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [booked, setBooked] = useState(false);

  const rides = [
    { name: "Bike", price: "Rs 150", time: "2 min", icon: "🏍️" },
    { name: "Rickshaw", price: "Rs 250", time: "3 min", icon: "🛺" },
    { name: "Mini", price: "Rs 400", time: "4 min", icon: "🚗" },
    { name: "Sedan", price: "Rs 600", time: "5 min", icon: "🚙" },
    { name: "Van", price: "Rs 800", time: "6 min", icon: "🚐" },
  ];

  const selectedRide = rides.find(r => r.name === ride);

  if (booked) {
    return (
      <div style={{background:"#000", color:"#fff", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px", textAlign:"center"}}>
        <div style={{fontSize:"60px"}}>✅</div>
        <h1>Ride Booked!</h1>
        <h2 style={{color:"#25D366"}}>{ride} - {selectedRide.price}</h2>
        <p>{pickup} → {drop}</p>
        <p style={{background:"#222", padding:"10px", borderRadius:"10px", marginTop:"20px"}}>Driver: Arsalan • 5⭐ • 2 min away<br/>Car: Suzuki Alto - R-1234</p>
        <button onClick={()=>setBooked(false)} style={{marginTop:"20px", background:"#fff", color:"#000", border:"none", padding:"12px 30px", borderRadius:"25px", fontWeight:"bold"}}>Book Another Ride</button>
        <button onClick={()=>window.open(`https://wa.me/923000000000?text=My ${ride} ride from ${pickup} to ${drop} booked!`)} style={{marginTop:"10px", background:"#25D366", color:"#fff", border:"none", padding:"12px 30px", borderRadius:"25px", fontWeight:"bold", width:"80%"}}>Share on WhatsApp</button>
      </div>
    );
  }

  return (
    <div style={{background:"#f5f5f5", minHeight:"100vh", fontFamily:"sans-serif"}}>
      <div style={{background:"#000", color:"#fff", padding:"15px", textAlign:"center"}}>
        <h1 style={{margin:0, fontSize:"22px"}}>🚗 Daily Ride Bazar 2026</h1>
        <p style={{margin:"5px 0 0", fontSize:"12px", opacity:0.7}}>Karachi - Uber Jesa System</p>
      </div>

      <div style={{height:"220px", background:"#ddd", position:"relative", backgroundImage:"url(https://maps.googleapis.com/maps/api/staticmap?center=Karachi&zoom=12&size=600x300&key=demo)", backgroundSize:"cover", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <div style={{background:"rgba(255,255,255,0.9)", padding:"10px 20px", borderRadius:"20px", fontWeight:"bold"}}>📍 Karachi Live Map</div>
        <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize:"30px"}}>📍</div>
      </div>

      <div style={{background:"#fff", margin:"-20px 10px", borderRadius:"15px", padding:"15px", boxShadow:"0 4px 15px rgba(0,0,0,0.1)", position:"relative"}}>
        <input value={pickup} onChange={e=>setPickup(e.target.value)} placeholder="📍 Pickup - Kahan se?" style={{width:"100%", padding:"12px", borderRadius:"10px", border:"1px solid #ddd", marginBottom:"10px"}} />
        <input value={drop} onChange={e=>setDrop(e.target.value)} placeholder="🏁 Drop - Kahan jana hai?" style={{width:"100%", padding:"12px", borderRadius:"10px", border:"1px solid #ddd"}} />
      </div>

      <div style={{background:"#fff", margin:"10px", borderRadius:"15px", padding:"10px"}}>
        <h3 style={{margin:"5px 10px"}}>Ride Select Karo:</h3>
        {rides.map(r=>(
          <div key={r.name} onClick={()=>setRide(r.name)} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px", borderRadius:"10px", background: ride===r.name ? "#000" : "#f9f9f9", color: ride===r.name ? "#fff" : "#000", marginBottom:"8px", border: ride===r.name ? "2px solid #000" : "1px solid #eee"}}>
            <div style={{display:"flex", alignItems:"center", gap:"10px"}}><span style={{fontSize:"22px"}}>{r.icon}</span><div><b>{r.name}</b><div style={{fontSize:"11px", opacity:0.6}}>{r.time} away</div></div></div>
            <b>{r.price}</b>
          </div>
        ))}
      </div>

      <div style={{padding:"10px", position:"sticky", bottom:0, background:"#fff"}}>
        <button disabled={!pickup || !drop} onClick={()=>setBooked(true)} style={{width:"100%", background: (!pickup || !drop) ? "#ccc" : "#000", color:"#fff", border:"none", padding:"15px", borderRadius:"12px", fontSize:"16px", fontWeight:"bold"}}>
          Book {ride} - {selectedRide.price} ➔
        </button>
      </div>
    </div>
  );
}
