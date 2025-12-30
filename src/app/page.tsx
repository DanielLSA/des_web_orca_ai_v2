import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Orça.AI</h1>
      <p>Organize suas finanças de forma simples.</p>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </main>
  );
}
