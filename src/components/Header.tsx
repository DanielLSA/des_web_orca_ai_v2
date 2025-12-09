export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <img src="/logo-orcaai.png" alt="Orça.AI" className="logo" />
        <span>Orça.AI</span>
      </div>
      <nav className="nav" aria-label="principal">
        <a href="/">Home</a>
        <a href="/(app)/dashboard">Dashboard</a>
      </nav>
    </header>
  );
}
