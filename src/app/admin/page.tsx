'use client'
import { useEffect, useState } from 'react'

type Service = { id:number; name:string; durationMin:number; price:number; active:boolean }
type Slot = { id:number; start:string; end:string; isActive:boolean }

export default function Admin(){
  const [services,setServices]=useState<Service[]>([])
  const [slots,setSlots]=useState<Slot[]>([])
  const [form,setForm]=useState({ name:'', durationMin:60, price:200 })
  const [gen,setGen]=useState({ date:'', startHour:10, endHour:18, intervalMin:60 })

  const load = async ()=>{
    const s = await fetch('/api/services').then(r=>r.json())
    setServices(s)
    const sl = await fetch('/api/slots').then(r=>r.json())
    setSlots(sl.map((x:any)=>({...x,start:new Date(x.start).toLocaleString(),end:new Date(x.end).toLocaleString()})))
  }
  useEffect(()=>{ load() },[])

  const addService = async (e:React.FormEvent)=>{
    e.preventDefault()
    await fetch('/api/services',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
    setForm({ name:'', durationMin:60, price:200 }); load()
  }

  const genSlots = async (e:React.FormEvent)=>{
    e.preventDefault()
    await fetch('/api/slots',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(gen)})
    load()
  }

  return (
    <div style={{display:'grid',gap:24}}>
      <h2 style={{fontSize:20,fontWeight:600}}>Panel administratora</h2>

      <section style={{display:'grid',gap:12}}>
        <h3 style={{fontWeight:600}}>Zabiegi (cennik)</h3>
        <form onSubmit={addService} style={{display:'grid',gap:8}}>
          <input placeholder="Nazwa zabiegu" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <div style={{display:'grid',gap:8,gridTemplateColumns:'1fr 1fr'}}>
            <input type="number" placeholder="Czas (min)" value={form.durationMin} onChange={e=>setForm({...form, durationMin:Number(e.target.value)})}/>
            <input type="number" placeholder="Cena (zł)" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})}/>
          </div>
          <button style={{padding:'8px 12px',borderRadius:8,background:'#2f7660',color:'#fff'}}>Dodaj zabieg</button>
        </form>
        <ul>{services.map(s=>(<li key={s.id}>{s.name} — {s.durationMin} min — {s.price} zł</li>))}</ul>
      </section>

      <section style={{display:'grid',gap:12}}>
        <h3 style={{fontWeight:600}}>Wolne terminy (sloty)</h3>
        <form onSubmit={genSlots} style={{display:'grid',gap:8}}>
          <input type="date" required value={gen.date} onChange={e=>setGen({...gen, date:e.target.value})}/>
          <div style={{display:'grid',gap:8,gridTemplateColumns:'1fr 1fr 1fr'}}>
            <input type="number" placeholder="Start (godz.)" value={gen.startHour} onChange={e=>setGen({...gen, startHour:Number(e.target.value)})}/>
            <input type="number" placeholder="Koniec (godz.)" value={gen.endHour} onChange={e=>setGen({...gen, endHour:Number(e.target.value)})}/>
            <input type="number" placeholder="Interwał (min)" value={gen.intervalMin} onChange={e=>setGen({...gen, intervalMin:Number(e.target.value)})}/>
          </div>
          <button style={{padding:'8px 12px',borderRadius:8,background:'#2f7660',color:'#fff'}}>Generuj sloty</button>
        </form>
        <ul>{slots.map(s=>(<li key={s.id}>{s.start} — {s.end}</li>))}</ul>
      </section>
    </div>
  )
}
