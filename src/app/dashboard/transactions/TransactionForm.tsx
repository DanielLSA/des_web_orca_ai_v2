"use client";

import { useState } from "react";

type Props = {
  onCreated: () => void;
};

export default function TransactionForm({ onCreated }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        amount: Number(amount),
      }),
    });

    setDescription("");
    setAmount("");
    onCreated();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nova Transação</h2>

      <input
        placeholder="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />

      <button type="submit">Adicionar</button>
    </form>
  );
}
