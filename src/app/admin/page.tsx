import { prisma } from "@/lib/prisma";

export default async function Admin(){
  const services = await prisma.service.findMany({ orderBy: { id: "asc" } });
  return (
    <div>
      <h2>Panel</h2>
      <p>{services.length ? "Dane z bazy Supabase:" : "Brak danych — uruchom supabase_init.sql"}</p>
      <ul>{services.map(s => <li key={s.id}>{s.name} — {s.durationMin} min — {s.price} zł</li>)}</ul>
    </div>
  );
}
