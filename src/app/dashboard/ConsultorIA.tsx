"use client";

import { useEffect, useState } from "react";

export default function ConsultorIA() {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  async function fetchAdvice() {
    setLoading(true);
    const res = await fetch("/api/ai/consultor", {
      method: "POST",
    });
    const data = await res.json();
    setAdvice(data.advice);
    setLoading(false);
  }

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div
      style={{
        marginTop: 24,
        padding: 20,
        borderRadius: 14,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h3 style={{ marginBottom: 8 }}>💡 Consultor Financeiro</h3>

      {loading && <p>Analisando sua situação financeira...</p>}

      {!loading && advice && (
        <p style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>{advice}</p>
      )}

      <button
        onClick={fetchAdvice}
        style={{
          marginTop: 12,
          padding: "8px 14px",
          borderRadius: 8,
          background: "#2563eb",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        Atualizar análise
      </button>
    </div>
  );
}
