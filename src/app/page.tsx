import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "radial-gradient(circle at top, #0b1220, #05080f)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "3rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* LADO ESQUERDO — TEXTO + CARDS */}
        <div>
          <h1
            style={{
              fontSize: 52,
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            Orça.AI
          </h1>

          <p
            style={{
              fontSize: 18,
              opacity: 0.9,
              marginBottom: 28,
              maxWidth: 520,
            }}
          >
            Organize suas finanças de forma simples, clara e inteligente.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              maxWidth: 520,
            }}
          >
            {/* CARD EXPLICATIVO */}
            <div
              style={{
                padding: 18,
                borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <strong style={{ fontSize: 15 }}>
                Controle financeiro sem complicação
              </strong>

              <ul
                style={{
                  marginTop: 10,
                  paddingLeft: 18,
                  fontSize: 14,
                  lineHeight: 1.6,
                  opacity: 0.85,
                }}
              >
                <li>Entradas e saídas rápidas</li>
                <li>Saldo em tempo real</li>
                <li>Edição simples</li>
                <li>Análises com IA</li>
              </ul>
            </div>

            {/* CARD CTA */}
            <div
              style={{
                padding: 18,
                borderRadius: 14,
                background:
                  "linear-gradient(180deg, rgba(37,99,235,0.35), rgba(0,0,0,0.3))",
                border: "1px solid rgba(37,99,235,0.5)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontSize: 13, opacity: 0.8 }}>
                  Comece agora
                </span>

                <p style={{ marginTop: 6, fontSize: 15 }}>
                  Tenha clareza total sobre seu dinheiro
                </p>
              </div>

              <Link
                href="/login"
                style={{
                  marginTop: 14,
                  textAlign: "center",
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Acessar minha conta
              </Link>
            </div>
          </div>
        </div>

        {/* LADO DIREITO — IMAGEM */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/hero.png"
            alt="Dashboard financeiro"
            style={{
              width: "100%",
              maxWidth: 520,
              borderRadius: 18,
            }}
          />
        </div>
      </section>
    </main>
  );
}
