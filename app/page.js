"use client";
import { useState } from "react";
const APP="Daily Ride Bazar";
const RIDES=[
{id:1,name:"Bike",price:200,time:"3 min",icon:"🏍️"},
{id:2,name:"Rickshaw",price:250,time:"4 min",icon:"🛺"},
{id:3,name:"Mini",price:300,time:"5 min",icon:"🚗"},
{id:4,name:"Big Car",price:500,time:"6 min",icon:"🚙"},
{id:5,name:"Every Van",price:1250,time:"8 min",icon:"🚐"},
{id:6,name:"Changan",price:2000,time:"10 min",icon:"🚐"},
];
export default function Page(){
const [pickup,setPickup]=useState("");
const [drop,setDrop]=useState("");
const [sel,setSel]=useState(RIDES[2]);
return(
<div style={{fontFamily:"sans-serif",background:"#f5f5f5",minHeight:"100vh"}}>
<div style={{height:"50vh",background:"#e5e7eb",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
<div style={{position:"absolute",top:15,left:15,right:15,background:"white",padding:12,borderRadius:12,boxShadow:"0 4px 12px rgba(0,0,0,0.15)"}}>
<input value={pickup} onChange={e=>setPickup(e.target.value)} placeholder="📍 Pickup" style={{width:"100%",padding:10,border:"1px solid #ddd",borderRadius:8,marginBottom:8}}/>
<input value={drop} onChange={e=>setDrop(e.target.value)} placeholder="🏁 Where to?" style={{width:"100%",padding:10,border:"1px solid #ddd",borderRadius:8}}/>
</div>
<div style={{textAlign:"center"}}><div style={{fontSize:50}}>🗺️</div><b>{APP}</b><p>Karachi Live</p></div>
</div>
<div style={{background:"white",borderTopLeftRadius:24,borderTopRightRadius:24,marginTop:-20,padding:20,position:"relative"}}>
<div style={{width:40,height:5,background:"#ddd",borderRadius:10,margin:"0 auto 15px"}}></div>
<h3 style={{margin:"0 0 15px"}}>Choose a ride</h3>
<div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:10}}>
{RIDES.map(r=>(
<div key={r.id} onClick={()=>setSel(r)} style={{minWidth:110,padding:14,borderRadius:16,border:sel.id===r.id?"2px solid black":"1px solid #eee",background:sel.id===r.id?"#f9f9f9":"white",cursor:"pointer",textAlign:"center"}}>
<div style={{fontSize:28}}>{r.icon}</div>
<div style={{fontWeight:"bold",marginTop:5}}>{r.name}</div>
<div style={{fontSize:12,color:"#666"}}>{r.time}</div>
<div style={{fontWeight:"bold",marginTop:5}}>Rs {r.price}</div>
</div>
))}
</div>
<button style={{width:"100%",padding:16,background:"black",color:"white",border:"none",borderRadius:12,fontSize:18,fontWeight:"bold",marginTop:20}}>
Confirm {sel.name} - Rs {sel.price}
</button>
<p style={{textAlign:"center",marginTop:10,color:"#666",fontSize:13}}>{APP} - Karachi</p>
</div>
</div>
);
}
