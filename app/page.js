"use client";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState("Gulshan, Karachi");
  const [drop, setDrop] = useState("");
  const [ride, setRide] = useState("Mini");
  
  const rides = [
    { id: "Bike", name: "Moto", icon: "🏍️", price: "152", time: "3 min", desc: "Affordable bike rides" },
    { id: "Rickshaw", name: "Auto", icon: "🛺", price: "248", time: "2 min", desc: "3-wheelers" },
    { id: "Mini", name: "Go Mini", icon: "🚗", price: "385", time: "4 min", desc: "Affordable compact" },
    { id: "Sedan", name: "Go Sedan", icon: "🚙", price: "520", time: "5 min", desc: "Comfy sedans" },
    { id: "Van", name: "Go Van", icon: "🚐", price: "750", time: "6 min", desc: "For large groups" },
  ];

  const sel = rides.find(r=>r.id===ride);

  if(step===3){
    return(
      <div style={{background:"#000", color:"#fff", minHeight:"100vh", padding:"20px"}}>
        <h1 style={{textAlign:"center"}}>Driver on the way! 🚗</h1>
        <div style={{background:"#111", borderRadius:"20px", padding:"15px", marginTop:"20px"}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <div><h3 style={{margin:0}}>Arsalan - 4.9 ⭐</h3><p style={{margin:"5px 0", opacity:0.6}}>Suzuki Alto - R-1234 White</p></div>
            <div style={{fontSize:"30px"}}>🚗</div>
          </div>
          <div style={{background:"#222", height:"150px", borderRadius:"15px", marginTop:"15px", display:"flex", alignItems:"center", justifyContent:"center"}}>📍 LIVE MAP - Driver 2 min away</div>
          <p style={{marginTop:"15px"}}>📍 {pickup} → 🏁 {drop}</p>
          <p style={{color:"#25D366", fontSize:"20px", fontWeight:"bold"}}>Rs {sel.price} - {ride}</p>
          <button onClick={()=>setStep(1)} style={{width:"100%", background:"#fff", color:"#000", padding:"15px", borderRadius:"12px", border:"none", fontWeight:"bold", marginTop:"15px"}}>Cancel Ride</button>
        </div>
      </div>
    )
  }

  return(
    <div style={{background:"#fff", minHeight:"100vh", fontFamily:"sans-serif", display:"flex", flexDirection:"column"}}>
      <div style={{background:"#000", color:"#fff", padding:"15px", display:"flex", justifyContent:"space-between"}}>
        <b>☰ daily ride bazar</b><b>👤</b>
      </div>
      
      <div style={{flex:1, background:"#e5e3df", position:"relative", minHeight:"300px", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <div style={{position:"absolute", top:"20px", background:"#fff", padding:"8px 15px", borderRadius:"20px", boxShadow:"0 2px 10px rgba(0,0,0,0.2)"}}>📍 Karachi • Live</div>
        <div style={{fontSize:"50px"}}>📍</div>
        <div style={{position:"absolute", bottom:"20px", background:"#000", color:"#fff", padding:"8px 15px", borderRadius:"20px", fontSize:"12px"}}>Driver nearby: 5 available</div>
      </div>

      <div style={{background:"#fff", borderTopLeftRadius:"25px", borderTopRightRadius:"25px", padding:"20px", boxShadow:"0 -5px 20px rgba(0,0,0,0.1)", marginTop:"-20px"}}>
        {step===1 && (
          <>
            <h2 style={{margin:"0 0 15px"}}>Where to?</h2>
            <input value={pickup} onChange={e=>setPickup(e.target.value)} placeholder="Pickup location" style={{width:"100%", padding:"14px", borderRadius:"12px", border:"1px solid #ddd", marginBottom:"10px", background:"#f5f5f5"}} />
            <input value={drop} onChange={e=>setDrop(e.target.value)} placeholder="Where to?" autoFocus style={{width:"100%", padding:"14px", borderRadius:"12px", border:"2px solid #000", background:"#fff"}} />
            <button disabled={!drop} onClick={()=>setDrop && setStep(2)} style={{width:"100%", background: drop ? "#000" : "#ccc", color:"#fff", padding:"15px", borderRadius:"12px", border:"none", fontWeight:"bold", marginTop:"15px"}}>Confirm Destination</button>
          </>
        )}
        {step===2 && (
          <>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><h3 style={{margin:0}}>{pickup} → {drop}</h3><span onClick={()=>setStep(1)} style={{color:"#666"}}>Edit</span></div>
            <div style={{marginTop:"15px"}}>
              {rides.map(r=>(
                <div key={r.id} onClick={()=>setRide(r.id)} style={{display:"flex", justifyContent:"space-between", padding:"12px", borderRadius:"12px", background: ride===r.id ? "#f0f0f0" : "#fff", border: ride===r.id ? "2px solid #000" : "1px solid #eee", marginBottom:"8px"}}>
                  <div style={{display:"flex", gap:"10px"}}><span style={{fontSize:"28px"}}>{r.icon}</span><div><b>{r.name}</b><div style={{fontSize:"11px", color:"#666"}}>{r.desc} • {r.time} away</div></div></div>
                  <b>Rs {r.price}</b>
                </div>
              ))}
            </div>
            <button onClick={()=>setStep(3)} style={{width:"100%", background:"#000", color:"#fff", padding:"16px", borderRadius:"12px", border:"none", fontWeight:"bold", marginTop:"10px", fontSize:"16px"}}>Confirm {sel.name} • Rs {sel.price}</button>
          </>
        )}
      </div>
    </div>
  )
}
