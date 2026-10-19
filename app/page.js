"use client";
import { useState } from "react";

const RIDES = [
  { id: 1, name: "Suzuki Alto", type: "Mini", price: "Rs 800", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500", loc: "Gulshan, Karachi", seats: "4 Seats" },
  { id: 2, name: "Toyota Corolla", type: "Sedan", price: "Rs 1500", img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500", loc: "Clifton, Karachi", seats: "4 Seats" },
  { id: 3, name: "Honda BR-V", type: "SUV", price: "Rs 2500", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500", loc: "Defence, Karachi", seats: "7 Seats" },
  { id: 4, name: "Toyota Hiace", type: "Van", price: "Rs 3000", img: "https://images.unsplash.com/photo-1464219789935-c2d9aba644?w=500", loc: "Saddar, Karachi", seats: "12 Seats" },
  { id: 5, name: "Suzuki Bolan", type: "Mini Van", price: "Rs 1200", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500", loc: "Nazimabad, Karachi", seats: "7 Seats" },
];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? RIDES : RIDES.filter(r => r.type === filter);

  return (
    <div style={{background:"#f5f5f5", minHeight:"100vh", fontFamily:"sans-serif"}}>
      <header style={{background:"#000", color:"#fff", padding:"15px", textAlign:"center", position:"sticky", top:0, zIndex:10}}>
        <h1 style={{margin:0}}>🚗 Daily Ride Bazar 2026</h1>
        <p style={{margin:"5px 0 0", fontSize:"14px", opacity:0.8}}>Karachi's #1 Ride Marketplace</p>
      </header>

      <div style={{padding:"10px", display:"flex", gap:"8px", overflowX:"auto"}}>
        {["All","Mini","Sedan","SUV","Van","Mini Van"].map(t=>(
          <button key={t} onClick={()=>setFilter(t)} style={{padding:"8px 16px", borderRadius:"20px", border:"none", background: filter===t?"#000":"#fff", color: filter===t?"#fff":"#000", whiteSpace:"nowrap"}}>{t}</button>
        ))}
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", padding:"10px"}}>
        {filtered.map(ride=>(
          <div key={ride.id} style={{background:"#fff", borderRadius:"12px", overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>
            <img src={ride.img} alt={ride.name} style={{width:"100%", height:"120px", objectFit:"cover"}} />
            <div style={{padding:"10px"}}>
              <h3 style={{margin:"0", fontSize:"14px"}}>{ride.name}</h3>
              <p style={{margin:"2px 0", fontSize:"11px", color:"#666"}}>{ride.loc} • {ride.seats}</p>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"6px"}}>
                <b style={{color:"#00a651", fontSize:"14px"}}>{ride.price}</b>
                <button onClick={()=>window.open(`https://wa.me/923000000000?text=I want ${ride.name} at ${ride.loc}`)} style={{background:"#25D366", color:"#fff", border:"none", padding:"5px 10px", borderRadius:"6px", fontSize:"11px"}}>WhatsApp</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{textAlign:"center", padding:"20px", fontSize:"12px", color:"#888"}}>
        MASHALLAH! 5 Rides Live - Owner Arsalan Khan
      </div>
    </div>
  );
}
