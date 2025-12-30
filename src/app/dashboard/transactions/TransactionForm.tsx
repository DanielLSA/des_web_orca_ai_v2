"use client";

import { useEffect, useState } from "react";
import { Transaction, TransactionType } from "../DashboardClient";

type Props = {
  editing: Transaction | null;
  onCreate: (data: {
    description: string;
    amount: number;
    type: TransactionType;
  }) => void;
  onUpdate: (data: Transaction) => void;
  onCancel: () => void;
};

export default function TransactionForm({
  editing,
  onCreate,
  onUpdate,
  onCancel,
}: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("IN");

  useEffect(() => {
    if (editing) {
      setDescription(editing.description);
      setAmount(String(editing.amount));
      setType(editing.type);
    }
  }, [editing]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      description,
      amount: Number(amount),
      type,
    };

    if (editing) {
      onUpdate({ ...payload, id: editing.id, date: editing.date });
    } else {
      onCreate(payload);
    }

    setDescription("");
    setAmount("");
    setType("IN");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: 10,
        marginBottom: "1.2rem",
        flexWrap: "wrap",
      }}
    >
      <input
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={input}
      />

      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        style={input}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value as TransactionType)}
        style={input}
      >
        <option value="IN">Entrada</option>
        <option value="OUT">Saída</option>
      </select>

      <button type="submit" style={primaryButton}>
        {editing ? "Salvar" : "Adicionar"}
      </button>

      {editing && (
        <button type="button" onClick={onCancel} style={secondaryButton}>
          Cancelar
        </button>
      )}
    </form>
  );
}

const input: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
};

const primaryButton: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  background: "#2563eb",
  color: "#fff",
};

const secondaryButton: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.3)",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
};
