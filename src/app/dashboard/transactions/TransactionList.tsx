"use client";

import { Transaction } from "../DashboardClient";

type Props = {
  transactions: Transaction[];
  onEdit: (t: Transaction) => void;
  onDelete: (id: number) => void;
};

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: Props) {
  if (transactions.length === 0) {
    return <p style={{ opacity: 0.7 }}>Nenhuma transação registrada.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {transactions.map((t) => (
        <li
          key={t.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 14px",
            marginBottom: 8,
            borderRadius: 10,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div>
            <strong>{t.description}</strong>
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              {t.type === "IN" ? "Entrada" : "Saída"} — R$ {t.amount.toFixed(2)}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              title="Editar"
              onClick={() => onEdit(t)}
              style={iconButton}
            >
              ✏️
            </button>

            <button
              title="Excluir"
              onClick={() => onDelete(t.id)}
              style={{ ...iconButton, color: "#ff6b6b" }}
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

const iconButton: React.CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: 16,
};
