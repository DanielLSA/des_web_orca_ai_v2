"use client";

import { useState } from "react";

export default function AIConsultant() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const res = await fetch("/api/ai/consultor", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Erro ao consultar a IA");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setError("Não foi possível obter a análise agora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <h2 style={{ fontSize: 22, marginBottom: 12 }}>
        🤖 Consultor Financeiro
      </h2>

      <p style={{ opacity: 0.8, marginBottom: 16 }}>
        Analise automática dos seus gastos e sugestões para melhorar sua saúde
        financeira.
      </p>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          padding: "10px 18px",
          borderRadius: 10,
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          background: "#4f46e5",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        {loading ? "Analisando..." : "Gerar análise"}
      </button>

      {error && (
        <p style={{ color: "salmon", marginTop: 16 }}>{error}</p>
      )}

      {response && (
        <div
          style={{
            marginTop: 20,
            padding: "1rem",
            borderRadius: 10,
            background: "rgba(0,0,0,0.35)",
            whiteSpace: "pre-line",
            lineHeight: 1.6,
          }}
        >
          {response}
        </div>
      )}
    </section>
  );
}
