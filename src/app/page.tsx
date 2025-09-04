'use client'
import { useEffect, useState } from 'react'

type Service = { id:number; name:string; durationMin:number; price:number }
type Slot = { id:number; start:string }

export default function Page(){
  const [services,setServices]=useState<Service[]>([])
  const [slots,setSlots]=useState<Slot[]>([])
  const [form,setForm]=useState({ serviceId:'', slotId:'', name:'', email:'', phone:'', notes:'' })
  const [msg,setMsg]=useState<string|undefined>()

  useEffect(()=>{
    fetch('/api/services').then(r=>r.json()).then(setServices)
    fetch('/api/slots').then(r=>r.json()).then((s)=>setSlots(s.map((x:any)=>({...x,start:new Date(x.start).toLocaleString()}))))
  },[])

  const submit = async (e:React.FormEvent)=>{
    e.preventDefault(); setMsg('Wysyłam...')
    const res = await fetch('/api/bookings', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
      serviceId:Number(form.serviceId), slotId:Number(form.slotId), name:form.name, email:form.email, phone:form.phone||undefined, notes:form.notes||undefined
    })})
    const data = await res.json()
    if (res.ok) setMsg('Rezerwacja przyjęta! Sprawdź e‑mail.')
    else setMsg(data.error || 'Błąd')
  }

  return (
    <div style={{display:'grid',gap:16}}>
      <section>
        <h2 style={{fontSize:20,fontWeight:600}}>Zarezerwuj wizytę</h2>
        <p>Wybierz zabieg i wolny termin, podaj dane i potwierdź.</p>
      </section>
      <form onSubmit={submit} style={{display:'grid',gap:12,background:'#fff',padding:16,borderRadius:12,boxShadow:'0 1px 4px rgba(0,0,0,.06)'}}>
        <label>Usługa<br/>
          <select required value={form.serviceId} onChange={e=>setForm(f=>({...f,serviceId:e.target.value}))}>
            <option value="">— wybierz —</option>
            {services.map(s=><option key={s.id} value={s.id}>{s.name} — {s.price} zł</option>)}
          </select>
        </label>
        <label>Termin<br/>
          <select required value={form.slotId} onChange={e=>setForm(f=>({...f,slotId:e.target.value}))}>
            <option value="">— wybierz —</option>
            {slots.map(s=><option key={s.id} value={s.id}>{s.start}</option>)}
          </select>
        </label>
        <div style={{display:'grid',gap:8,gridTemplateColumns:'1fr 1fr'}}>
          <label>Imię i nazwisko<br/><input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></label>
          <label>E‑mail<br/><input type="email" required value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></label>
        </div>
        <label>Telefon (SMS)<br/><input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></label>
        <label>Uwagi<br/><textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/></label>
        <button type="submit" style={{padding:'10px 16px',borderRadius:10,background:'#2f7660',color:'#fff'}}>Rezerwuj</button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
  )
}
