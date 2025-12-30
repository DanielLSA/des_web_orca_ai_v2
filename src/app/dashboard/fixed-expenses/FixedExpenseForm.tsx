"use client";

import { useState } from "react";

export default function FixedExpenseForm({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/fixed-expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        amount: Number(amount),
      }),
    });

    setName("");
    setAmount("");
    onCreated();
  }

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Despesa fixa"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Valor"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit">Adicionar</button>
    </form>
  );
}
