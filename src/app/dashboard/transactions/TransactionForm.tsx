"use client";

import { useEffect, useMemo, useState } from "react";
import type { Transaction } from "./TransactionsClient";

type TransactionType = "IN" | "OUT";

export default function TransactionForm({
  editing,
  onCancelEdit,
  onCreate,
  onUpdate,
}: {
  editing: Transaction | null;
  onCancelEdit: () => void;
  onCreate: (payload: { description: string; amount: number; type: TransactionType }) => Promise<void>;
  onUpdate: (payload: { id: number; description: string; amount: number; type: TransactionType }) => Promise<void>;
}) {
  const isEditing = !!editing;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<TransactionType>("IN");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editing) {
      setDescription(editing.description ?? "");
      setAmount(String(editing.amount ?? ""));
      setType(editing.type ?? "IN");
      setError(null);
    } else {
      setDescription("");
      setAmount("");
      setType("IN");
      setError(null);
    }
  }, [editing]);

  const canSubmit = useMemo(() => {
    const descOk = description.trim().length > 0;
    const value = Number(amount);
    const amountOk = amount.trim().length > 0 && !Number.isNaN(value);
    return descOk && amountOk && !submitting;
  }, [description, amount, submitting]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError(null);
    const desc = description.trim();
    const value = Number(amount);

    if (!desc || Number.isNaN(value)) {
      setError("Preencha descrição e valor corretamente.");
      return;
    }

    try {
      setSubmitting(true);

      if (isEditing && editing) {
        await onUpdate({
          id: editing.id,
          description: desc,
          amount: value,
          type,
        });
        onCancelEdit();
      } else {
        await onCreate({
          description: desc,
          amount: value,
          type,
        });
        setDescription("");
        setAmount("");
        setType("IN");
      }
    } catch (err: any) {
      setError(err?.message || "Falha ao salvar.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <h2 style={{ fontSize: 22, marginBottom: 8 }}>
        {isEditing ? "Editar Transação" : "Nova Transação"}
      </h2>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: 8, minWidth: 220 }}
        />

        <input
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: 8, width: 160 }}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          style={{ padding: 8 }}
        >
          <option value="IN">Entrada</option>
          <option value="OUT">Saída</option>
        </select>

        <button
          type="submit"
          disabled={!canSubmit}
          style={{ padding: "8px 12px", cursor: canSubmit ? "pointer" : "not-allowed" }}
        >
          {submitting ? "Salvando..." : isEditing ? "Salvar" : "Adicionar"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={{ padding: "8px 12px" }}
          >
            Cancelar
          </button>
        )}
      </div>

      {error && <p style={{ color: "salmon", marginTop: 8 }}>{error}</p>}
    </form>
  );
}
