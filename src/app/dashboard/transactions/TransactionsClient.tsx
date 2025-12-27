"use client";

import { useEffect, useMemo, useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

type TransactionType = "IN" | "OUT";

export type Transaction = {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  date: string; // vem como ISO do backend
};

export default function TransactionClient() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<Transaction | null>(null);

  async function loadTransactions() {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("/api/transactions", { cache: "no-store" });
      const text = await res.text();

      if (!res.ok) {
        const msg = text ? `${res.status} ${res.statusText} | ${text}` : `${res.status} ${res.statusText}`;
        setError(msg);
        setTransactions([]);
        return;
      }

      const data = JSON.parse(text) as Transaction[];
      setTransactions(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Falha ao carregar transações.");
      setTransactions([]);
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
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const t = await res.text();
      throw new Error(t || "Erro ao criar transação");
    }

    await loadTransactions();
  }

  async function updateTransaction(payload: {
    id: number;
    description: string;
    amount: number;
    type: TransactionType;
  }) {
    const res = await fetch("/api/transactions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const t = await res.text();
      throw new Error(t || "Erro ao atualizar transação");
    }

    await loadTransactions();
  }

  async function deleteTransaction(id: number) {
    const res = await fetch("/api/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      const t = await res.text();
      throw new Error(t || "Erro ao excluir transação");
    }

    // se deletar a que estava em edição, limpa
    setEditing((cur) => (cur?.id === id ? null : cur));
    await loadTransactions();
  }

  const summary = useMemo(() => {
    const totalIn = transactions
      .filter((t) => t.type === "IN")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const totalOut = transactions
      .filter((t) => t.type === "OUT")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    return {
      totalIn,
      totalOut,
      balance: totalIn - totalOut,
    };
  }, [transactions]);

  return (
    <section style={{ marginTop: "1.25rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontSize: 22, marginBottom: 8 }}>Resumo</h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ padding: 12, border: "1px solid rgba(255,255,255,.12)", borderRadius: 10 }}>
            Entradas: <strong>R$ {summary.totalIn.toFixed(2)}</strong>
          </div>
          <div style={{ padding: 12, border: "1px solid rgba(255,255,255,.12)", borderRadius: 10 }}>
            Saídas: <strong>R$ {summary.totalOut.toFixed(2)}</strong>
          </div>
          <div style={{ padding: 12, border: "1px solid rgba(255,255,255,.12)", borderRadius: 10 }}>
            Saldo: <strong>R$ {summary.balance.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <TransactionForm
        editing={editing}
        onCancelEdit={() => setEditing(null)}
        onCreate={createTransaction}
        onUpdate={updateTransaction}
      />

      <div style={{ marginTop: "1rem" }}>
        <h2 style={{ fontSize: 22, marginBottom: 8 }}>Transações</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p style={{ color: "salmon" }}>Erro ao carregar transações: {error}</p>
        ) : (
          <TransactionList
            transactions={transactions}
            onEdit={(t) => setEditing(t)}
            onDelete={deleteTransaction}
          />
        )}
      </div>
    </section>
  );
}
