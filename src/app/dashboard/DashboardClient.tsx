"use client";

import { useEffect, useMemo, useState } from "react";
import TransactionForm from "./transactions/TransactionForm";
import TransactionList from "./transactions/TransactionList";
import LogoutButton from "./logout-button";

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
    setLoading(true);
    const res = await fetch("/api/transactions", { cache: "no-store" });
    const data = await res.json();
    setTransactions(Array.isArray(data) ? data : []);
    setLoading(false);
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
      .reduce((s, t) => s + t.amount, 0);

    const saidas = transactions
      .filter((t) => t.type === "OUT")
      .reduce((s, t) => s + t.amount, 0);

    return {
      entradas,
      saidas,
      saldo: entradas - saidas,
    };
  }, [transactions]);

  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>Dashboard</h1>

      {/* 🔹 RESUMO FINANCEIRO */}
      <h2 style={{ fontSize: 20, marginBottom: 10 }}>Resumo Financeiro</h2>

      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <SummaryCard title="Entradas" value={summary.entradas} />
        <SummaryCard title="Saídas" value={summary.saidas} />
        <SummaryCard title="Saldo" value={summary.saldo} highlight />
      </div>

      {/* 🔹 FORMULÁRIO */}
      <TransactionForm
        editing={editing}
        onCreate={createTransaction}
        onUpdate={updateTransaction}
        onCancel={() => setEditing(null)}
      />

      {/* 🔹 LISTA */}
      <div style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Transações</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <TransactionList
            transactions={transactions}
            onEdit={setEditing}
            onDelete={deleteTransaction}
          />
        )}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <LogoutButton />
      </div>
    </main>
  );
}

/* =========================
   COMPONENTE DE CARD
========================= */

function SummaryCard({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        padding: "16px 20px",
        borderRadius: 14,
        background: highlight
          ? "rgba(0, 180, 120, 0.15)"
          : "rgba(255,255,255,0.05)",
        border: highlight
          ? "1px solid rgba(0,180,120,0.4)"
          : "1px solid rgba(255,255,255,0.1)",
        minWidth: 180,
      }}
    >
      <div style={{ fontSize: 13, opacity: 0.8 }}>{title}</div>
      <strong style={{ fontSize: 20 }}>
        R$ {value.toFixed(2)}
      </strong>
    </div>
  );
}

