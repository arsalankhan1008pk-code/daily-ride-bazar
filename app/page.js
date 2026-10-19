"use client";
import { useState } from "react";

const APP_NAME="Daily Ride Bazar";

const RIDES=[
{id:1,name:"Bike",price:200,time:"3 min",icon:"🏍️",desc:"Fast • 1 Person"},
{id:2,name:"Rickshaw",price:250,time:"4 min",icon:"🛺",desc:"Auto • 3 Persons"},
{id:3,name:"Mini Car",price:300,time:"5 min",icon:"🚗",desc:"Alto • 4 Persons"},
{id:4,name:"Big Car",price:500,time:"6 min",icon:"🚘",desc:"Corolla • AC • 4"},
{id:5,name:"Every",price:1250,time:"8 min",icon:"🚐",desc:"Every • 7 Persons"},
{id:6,name:"Changan",price:2000,time:"10 min",icon:"🚐",desc:"Karvaan • 8 AC"},
];

export default function Page(){
const [sel,setSel]=useState(RIDES[2]);
const [step,setStep]=useState(1);
const [pickup,setPickup]=useState("Current Location");
const [drop,setDrop]=useState("");
const [gps,setGps]=useState(null);

const getGPS=()=>{
navigator.geolocation.getCurrentPosition(p=>{
setGps({lat:p.coords.latitude,lng:p.coords.longitude});
setPickup(`${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`);
});
};

return(
<div style={{maxWidth:480,margin:"0 auto",background:"#fff",minHeight:"100vh",fontFamily:"system-ui",position:"relative"}}>

{/* UBER MAP DASHBOARD */}
<div style={{height: step===1 ? "42vh" : "22vh", background:"#e5e7eb", position:"relative", transition:"all 0.3s", overflow:"hidden"}}>
{/* Fake Map - Uber Style */}
<div style={{width:"100%",height:"100%",background:"linear-gradient(135deg,#e0f2fe 0%,#bae6fd 50%,#f0fdf4 100%)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
<div style={{background:"#fff",padding:"8px 14px",borderRadius:20,boxShadow:"0 2px 10px rgba(0,0,0,0.1)",fontSize:12,fontWeight:700}}>📍 Karachi, Pakistan</div>
<div style={{marginTop:10,fontSize:40}}>🗺️</div>
{gps && <div style={{marginTop:8,background:"#000",color:"#fff",padding:"6px 12px",borderRadius:20,fontSize:10}}>GPS: {gps.lat.toFixed(3)}, {gps.lng.toFixed(3)}</div>}
</div>
{/* Map Pin Center */}
<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-100%)",fontSize:32}}>📍</div>
{/* Top Bar - Uber Style */}
<div style={{position:"absolute",top:0,left:0,right:0,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{background:"#fff",width:40,height:40,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.15)",fontWeight:900}}>☰</div>
<div style={{background:"#fff",padding:"6px 14px",borderRadius:20,boxShadow:"0 2px 8px rgba(0,0,0,0.15)",fontSize:11,fontWeight:800}}>{APP_NAME}</div>
<div style={{background:"#fff",width:40,height:40,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>👤</div>
</div>
{/* GPS Button - Uber Style */}
<button onClick={getGPS} style={{position:"absolute",bottom:16,right:16,background:"#fff",border:"none",width:48,height:48,borderRadius:"50%",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",fontSize:20}}>📍</button>
</div>

{/* UBER BOTTOM SHEET - DASHBOARD */}
<div style={{background:"#fff",borderTopLeftRadius:24,borderTopRightRadius:24,marginTop:-20,position:"relative",zIndex:5,boxShadow:"0 -4px 20px rgba(0,0,0,0.08)",minHeight:"58vh",padding:"16px"}}>

{step===1 && (
<>
{/* Where To - Uber Style */}
<div style={{display:"flex",gap:12,alignItems:"center",marginBottom:16}}>
<div style={{width:40,height:40,background:"#000",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>●</div>
<div style={{flex:1}}>
<div style={{fontSize:20,fontWeight:900}}>Where to?</div>
<div style={{fontSize:12,color:"#64748b"}}>{APP_NAME} • 6 rides available</div>
</div>
</div>

<div style={{background:"#f3f4f6",borderRadius:14,padding:"4px 12px",display:"grid",gap:2}}>
<div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #e5e7eb"}}>
<span>●</span><input value={pickup} onChange={e=>setPickup(e.target.value)} placeholder="Pickup location" style={{flex:1,background:"transparent",border:"none",outline:"none",fontSize:14,fontWeight:600}}/>
</div>
<div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0"}}>
<span style={{color:"#ef4444"}}>■</span><input value={drop} onChange={e=>setDrop(e.target.value)} placeholder="Where to? Drop location" style={{flex:1,background:"transparent",border:"none",outline:"none",fontSize:14,fontWeight:600}}/>
</div>
</div>

{/* Uber Ride Options - Horizontal Scroll */}
<div style={{marginTop:18}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
<b style={{fontSize:15}}>Choose a ride • {APP_NAME}</b><span style={{fontSize:11,color:"#64748b"}}>Swipe →</span>
</div>
<div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>
{RIDES.map(r=>(
<div key={r.id} onClick={()=>setSel(r)} style={{minWidth:110,background: sel.id===r.id ? "#000" : "#fff",color: sel.id===r.id ? "#fff" : "#000",borderRadius:16,padding:"12px 10px",border: sel.id===r.id ? "2px solid #000" : "1px solid #e5e7eb",cursor:"pointer",textAlign:"center"}}>
<div style={{fontSize:28}}>{r.icon}</div>
<div style={{fontSize:13,fontWeight:800,marginTop:4}}>{r.name}</div>
<div style={{fontSize:10,opacity:0.7}}>{r.time} away</div>
<div style={{fontSize:12,fontWeight:800,marginTop:6,background: sel.id===r.id ? "#fff" : "#000",color: sel.id===r.id ? "#000" : "#fff",padding:"3px 8px",borderRadius:10}}>Rs {r.price}</div>
</div>
))}
</div>
</div>

{/* Selected Ride Detail - Uber Style */}
<div style={{marginTop:16,background:"#f8fafc",borderRadius:16,padding:14,border:"1px solid #e2e8f0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{display:"flex",gap:12,alignItems:"center"}}>
<div style={{fontSize:32}}>{sel.icon}</div>
<div><div style={{fontWeight:800,fontSize:15}}>{sel.name} • {sel.desc}</div><div style={{fontSize:11,color:"#16a34a"}}>● {sel.time} away • Available now</div></div>
</div>
<div style={{fontWeight:900,fontSize:18}}>Rs {sel.price}</div>
</div>

<button disabled={!drop} onClick={()=>{if(!drop)return alert("Drop kahan jana hai likho!");setStep(2);}} style={{width:"100%",background: drop ? "#000" : "#e5e7eb",color: drop ? "#fff" : "#9ca3af",padding:"16px",borderRadius:14,border:"none",fontWeight:900,fontSize:16,marginTop:14}}>Confirm {sel.name} - Rs {sel.price}</button>
<div style={{textAlign:"center",fontSize:10,color:"#9ca3af",marginTop:8}}>{APP_NAME} • Karachi • Fixed Rates • No Extra Charges</div>
</>
)}

{step===2 && (
<div>
<button onClick={()=>setStep(1)} style={{background:"#f3f4f6",border:"none",padding:"8px 14px",borderRadius:20,fontSize:12,fontWeight:700}}>← Back to Dashboard</button>
<div style={{marginTop:14,textAlign:"center"}}>
<div style={{width:80,height:80,background:"#f3f4f6",borderRadius:"50%",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40}}>{sel.icon}</div>
<h2 style={{margin:"12px 0 4px 0"}}>Driver is on the way!</h2>
<div style={{fontSize:13,color:"#16a34a",fontWeight:700}}>{sel.name} • Rs {sel.price} • {sel.time} away</div>
<div style={{background:"#f8fafc",padding:12,borderRadius:12,marginTop:14,fontSize:13,textAlign:"left",border:"1px solid #e2e8f0"}}>
<b>{APP
