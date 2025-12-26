"use client";

import { useEffect, useState } from "react";

type Props = {
  refresh: number;
};

type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

export default function TransactionList({ refresh }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function loadTransactions() {
    setError(null);

    const res = await fetch("/api/transactions", {
      method: "GET",
      credentials: "include", // garante envio do cookie
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    // Se não for OK, tente ler texto (pode ser HTML/erro) e mostrar
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      setError(`Erro ao carregar transações: ${res.status} ${res.statusText}${text ? ` | ${text.slice(0, 120)}` : ""}`);
      setTransactions([]);
      return;
    }

    // Se vier vazio, evita json() explodir
    const raw = await res.text();
    if (!raw) {
      setTransactions([]);
      return;
    }

    try {
      const data = JSON.parse(raw);
      setTransactions(Array.isArray(data) ? data : []);
    } catch {
      setError("Resposta inválida da API (não é JSON).");
      setTransactions([]);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, [refresh]);

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>Transações</h2>

      {error && (
        <p style={{ color: "salmon" }}>
          {error}
        </p>
      )}

      {transactions.length === 0 && !error ? (
        <p>Nenhuma transação encontrada.</p>
      ) : (
        <ul>
          {transactions.map((t) => (
            <li key={t.id}>
              {t.description} — R$ {t.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
