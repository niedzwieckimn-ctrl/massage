export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="pl"><body style={{fontFamily:'system-ui,Segoe UI,Roboto'}}>
      <main style={{maxWidth:900,margin:'0 auto',padding:24}}>
        <header style={{display:'flex',justifyContent:'space-between',marginBottom:16}}>
          <h1>Massage & SPA</h1>
          <nav><a href="/">Home</a> · <a href="/admin">Admin</a></nav>
        </header>
        {children}
      </main>
    </body></html>
  );
}
