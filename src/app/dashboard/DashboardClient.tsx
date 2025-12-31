"use client";

import { useEffect, useMemo, useState } from "react";
import TransactionForm from "./transactions/TransactionForm";
import TransactionList from "./transactions/TransactionList";
import LogoutButton from "./logout-button";
import AIConsultant from "./AIConsultant";

export type TransactionType = "IN" | "OUT";

export type Transaction = {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
};

export default function DashboardClient() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadTransactions() {
    try {
      setLoading(true);
      const res = await fetch("/api/transactions", { cache: "no-store" });
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  async function createTransaction(payload: {
    description: string;
    amount: number;
    type: TransactionType;
  }) {
    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    loadTransactions();
  }

  async function updateTransaction(payload: {
    id: number;
    description: string;
    amount: number;
    type: TransactionType;
  }) {
    await fetch("/api/transactions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setEditing(null);
    loadTransactions();
  }

  async function deleteTransaction(id: number) {
    await fetch("/api/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadTransactions();
  }

  const summary = useMemo(() => {
    const entradas = transactions
      .filter((t) => t.type === "IN")
      .reduce((s, t) => s + Number(t.amount), 0);

    const saidas = transactions
      .filter((t) => t.type === "OUT")
      .reduce((s, t) => s + Number(t.amount), 0);

    return {
      entradas,
      saidas,
      saldo: entradas - saidas,
    };
  }, [transactions]);

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: 980,
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ marginBottom: 8, fontSize: 34, fontWeight: 800 }}>
          Dashboard
        </h1>

        <div
          style={{
            padding: "14px 16px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            maxWidth: 820,
          }}
        >
          <div style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.4 }}>
            Bem-vindo! Registre suas entradas e saídas e acompanhe seu saldo em
            tempo real. Pequenos ajustes consistentes fazem o dinheiro render
            mais.
          </div>
        </div>
      </header>

      {/* RESUMO (cards alinhados e centralizados) */}
      <section style={{ marginBottom: 18 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 14,
            maxWidth: 760,
          }}
        >
          <SummaryCard title="Entradas" value={summary.entradas} />
          <SummaryCard title="Saídas" value={summary.saidas} />
          <SummaryCard title="Saldo" value={summary.saldo} />
        </div>
      </section>

      {/* FORM */}
      <section style={{ marginBottom: 18, maxWidth: 820 }}>
        <TransactionForm
          editing={editing}
          onCreate={createTransaction}
          onUpdate={updateTransaction}
          onCancel={() => setEditing(null)}
        />
      </section>

      {/* LISTA */}
      <section style={{ marginBottom: 22, maxWidth: 820 }}>
        {loading ? (
          <p style={{ opacity: 0.85 }}>Carregando...</p>
        ) : (
          <TransactionList
            transactions={transactions}
            onEdit={setEditing}
            onDelete={deleteTransaction}
          />
        )}
      </section>

      {/* IA CONSULTOR */}
      <section style={{ marginBottom: 22, maxWidth: 820 }}>
        <AIConsultant />
      </section>

      {/* LOGOUT (por último) */}
      <footer style={{ marginTop: 18 }}>
        <LogoutButton />
      </footer>
    </main>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  const isSaldo = title.toLowerCase().includes("saldo");

  return (
    <div
      style={{
        padding: "14px 18px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        minWidth: 180,
      }}
    >
      <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 6 }}>
        {title}
      </div>

      <strong style={{ fontSize: 18, letterSpacing: 0.2 }}>
        R$ {value.toFixed(2)}
      </strong>

      {isSaldo && (
        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
          {value >= 0
            ? "Saldo positivo — mantenha a consistência."
            : "Saldo negativo — vale revisar suas saídas."}
        </div>
      )}
    </div>
  );
}
