"use client";

import type { Transaction } from "./TransactionsClient";

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: {
  transactions: Transaction[];
  onEdit: (t: Transaction) => void;
  onDelete: (id: number) => Promise<void>;
}) {
  async function handleDelete(id: number) {
    const ok = confirm("Deseja excluir esta transação?");
    if (!ok) return;
    await onDelete(id);
  }

  if (!transactions.length) {
    return <p>Nenhuma transação cadastrada.</p>;
  }

  return (
    <ul style={{ marginTop: 8 }}>
      {transactions.map((t) => (
        <li
          key={t.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 12px",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 10,
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontWeight: 600 }}>
              {t.description} — {t.type} — R$ {Number(t.amount).toFixed(2)}
            </div>
            <div style={{ opacity: 0.75, fontSize: 12 }}>
              {t.date ? new Date(t.date).toLocaleString("pt-BR") : ""}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onEdit(t)} style={{ padding: "6px 10px" }}>
              Editar
            </button>
            <button
              onClick={() => handleDelete(t.id)}
              style={{ padding: "6px 10px" }}
            >
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
