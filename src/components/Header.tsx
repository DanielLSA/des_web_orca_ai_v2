"use client";

import Link from "next/link";

const linkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.78)", // cor base mais elegante
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
  padding: "8px 10px",
  borderRadius: 10,
  transition: "all 180ms ease",
};

const linkHoverStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.95)",
  background: "rgba(59,130,246,0.12)", // azul discreto (combina com o tema)
  border: "1px solid rgba(59,130,246,0.18)",
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={linkStyle}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyle)}
      onMouseLeave={(e) => {
        // volta para o estilo base
        e.currentTarget.removeAttribute("style");
        Object.assign(e.currentTarget.style, linkStyle);
      }}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 20, color: "rgba(255,255,255,0.92)" }}>
          Orça.AI
        </span>
      </div>

      {/* MENU */}
      <nav style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/login">Login</NavLink>
        <NavLink href="/cadastro">Cadastro</NavLink>
      </nav>
    </header>
  );
}
