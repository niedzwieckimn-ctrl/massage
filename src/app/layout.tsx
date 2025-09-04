export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="pl"><body style={{fontFamily:'system-ui,Segoe UI,Roboto'}}>
      <main style={{maxWidth:960,margin:'0 auto',padding:24}}>
        <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
          <h1 style={{fontSize:24,fontWeight:600}}>Massage & SPA</h1>
          <nav style={{fontSize:14}}>
            <a href="/" style={{textDecoration:'underline'}}>Rezerwacja</a> · <a href="/admin" style={{textDecoration:'underline'}}>Admin</a>
          </nav>
        </header>
        {children}
      </main>
    </body></html>
  );
}
