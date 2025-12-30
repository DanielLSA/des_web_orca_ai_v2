"use client";

import { useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

export default function TransactionClient() {
  const [refresh, setRefresh] = useState(0);

  function reload() {
    setRefresh((r) => r + 1);
  }

  return (
    <section style={{ marginTop: "1rem" }}>
      <TransactionForm onCreated={reload} />
      <TransactionList refresh={refresh} onChanged={reload} />
    </section>
  );
}
