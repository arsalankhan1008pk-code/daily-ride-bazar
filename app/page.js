"use client";
import { useState } from "react";
const APP_NAME="Daily Ride Bazar";
const VEHICLES=[
{name:"Bike",price:200,seats:"1 Person",img:"/bike.png",tag:"Honda 125"},
{name:"Rickshaw",price:250,seats:"3 Persons",img:"/rickshaw.png",tag:"Auto"},
{name:"Mini Car",price:300,seats:"4 Persons",img:"/minicar.png",tag:"Suzuki Alto"},
{name:"Big Car",price:500,seats:"4 AC",img:"/bigcar.png",tag:"Toyota Corolla"},
{name:"Every",price:1250,seats:"7 Persons",img:"/every.png",tag:"Suzuki Every"},
{name:"Changan",price:2000,seats:"8 AC",img:"/changan.png",tag:"Changan Karvaan"},
];
export default function Page(){
const [sel,setSel]=useState(null);
const [step,setStep]=useState(1);
const [pickup,setPickup]=useState("");
const [drop,setDrop]=useState("");
const [name,setName]=useState("");
const [phone,setPhone]=useState("");
const [gps,setGps]=useState(null);
const [calling,setCalling]=useState(false);
const getGPS=()=>{
navigator.geolocation.getCurrentPosition(p=>{
setGps({lat:p.coords.latitude,lng:p.coords.longitude});
setPickup(`${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`);
});
};
return(
<div style={{maxWidth:480,margin:"0 auto",background:"#f8fafc",minHeight:"100vh",fontFamily:"system-ui"}}>
<div style={{background:"#000",color:"#fff",padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontSize:20,fontWeight:900}}>{APP_NAME}</div><div style={{fontSize:11,opacity:0.6}}>Karachi • Uber System</div></div>
<div style={{background:"#16a34a",padding:"6px 12px",borderRadius:20,fontSize:10,fontWeight:800}}>UBER ● LIVE</div>
</div>
{step===1 && (
<div style={{padding:12}}>
<div style={{background:"#000",color:"#fff",textAlign:"center",padding:"10px",borderRadius:12,marginBottom:12,fontSize:13,fontWeight:700}}>{APP_NAME} - 6 GAARIYAN - REAL PICS</div>
{VEHICLES.map(v=>(
<div key={v.id} onClick={()=>{setSel(v);setStep(2)}} style={{background:"#fff",borderRadius:16,padding:12,marginBottom:10,display:"flex",gap:12,alignItems:"center",border:"1px solid #e2e8f0"}}>
<div style={{width:92,height:68,background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #f1f5f9",display:"flex",alignItems:"center",justifyContent:"center"}}>
<img src={v.img} alt={v.name} style={{width:"100%",height:"100%",objectFit:"contain"}}/>
</div>
<div style={{flex:1}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:15}}>{v.name}</b><b style={{fontSize:16}}>Rs {v.price}</b></div>
<div style={{fontSize:11,color:"#64748b"}}>{v.tag} • {v.seats}</div>
<div style={{marginTop:5}}><span style={{background:"#dcfce7",color:"#166534",fontSize:10,padding:"2px 8px",borderRadius:10,fontWeight:700}}>Available</span><span style={{marginLeft:6,background:"#000",color:"#fff",fontSize:10,padding:"2px 8px",borderRadius:10}}>BOOK</span></div>
</div>
</div>
))}
</div>
)}
{step===2 && sel && (
<div style={{padding:16}}>
<button onClick={()=>setStep(1)} style={{background:"#e2e8f0",border:"none",padding:"8px 14px",borderRadius:20}}>← {APP_NAME}</button>
<div style={{background:"#fff",borderRadius:16,padding:16,marginTop:12,border:"1px solid #eee"}}>
<div style={{display:"flex",gap:12,alignItems:"center"}}>
<img src={sel.img} alt={sel.name} style={{width:90,height:68,objectFit:"contain",background:"#f8fafc",borderRadius:10,border:"1px solid #f1f5f9"}}/>
<div><b style={{fontSize:16}}>{sel.name} - Rs {sel.price}</b><div style={{fontSize:12,color:"#64748b"}}>{APP_NAME} • {sel.tag}</div></div>
</div>
<div style={{display:"grid",gap:10,marginTop:16}}>
<div style={{display:"flex",gap:8}}><input value={pickup} onChange={e=>setPickup(e.target.value)} placeholder="📍 Pickup" style={{flex:1,padding:14,borderRadius:12,border:"1px solid #e2e8f0"}}/><button onClick={getGPS} style={{background:"#000",color:"#fff",border:"none",borderRadius:12,padding:"0 16px",fontWeight:700}}>GPS 📍</button></div>
<input value={drop} onChange={e=>setDrop(e.target.value)} placeholder="🏁 Drop Kahan?" style={{padding:14,borderRadius:12,border:"1px solid #e2e8f0"}}/>
<input value={name} onChange={e=>setName(e.target.value)} placeholder="👤 Naam" style={{padding:14,borderRadius:12,border:"1px solid #e2e8f0"}}/>
<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="📱 Phone 03XX" style={{padding:14,borderRadius:12,border:"1px solid #e2e8f0"}}/>
<button onClick={()=>{if(!pickup||!drop||!name||!phone)return alert("Sab bharein!");setStep(3);}} style={{background:"#000",color:"#fff",padding:16,borderRadius:14,border:"none",fontWeight:800,fontSize:16}}>Confirm - {APP_NAME} - Rs {sel.price}</button>
</div>
</div>
</div>
)}
{step===3 && (
<div style={{padding:16}}>
<div style={{background:"#fff",borderRadius:20,padding:24,textAlign:"center",border:"1px solid #eee"}}>
<div style={{fontSize:50}}>✅</div><h2 style={{margin:"8px 0"}}>{APP_NAME} Booking Done!</h2>
<div style={{background:"#f8fafc",padding:12,borderRadius:12,marginTop:12,fontSize:13,textAlign:"left"}}><b>{sel.name}</b> Rs {sel.price}<br/>👤 {name} - {phone}<br/>📍 {pickup} → 🏁 {drop}</div>
{!calling?<button onClick={()=>setCalling(true)} style={{width:"100%",background:"#0ea5e9",color:"#fff",padding:15,borderRadius:14,border:"none",fontWeight:800,marginTop:14}}>📞 Call Driver - In-App (Number Hide)</button>:
<div style={{background:"#ecfdf5",padding:14,borderRadius:14,marginTop:14}}><b>🔒 {APP_NAME} Private Call - 00:31</b><div style={{fontSize:11}}>Number hide - Uber jaisa</div><button onClick={()=>setCalling(false)} style={{background:"#ef4444",color:"#fff",border:"none",padding:"8px 18px",borderRadius:20,marginTop:8}}>End Call</button></div>}
<button onClick={()=>{setStep(1);setCalling(false);setSel(null);}} style={{width:"100%",marginTop:10,padding:12,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>New Booking - {APP_NAME}</button>
</div>
</div>
)}
</div>
)
}
