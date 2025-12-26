"use client";

import { useState } from "react";
import LogoutButton from "./logout-button";
import Chat from "./chat/Chat";
import TransactionForm from "./transactions/TransactionForm";
import TransactionList from "./transactions/TransactionList";

export default function DashboardClient() {
  const [refresh, setRefresh] = useState(0);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Usuário autenticado.</p>

      <section style={{ marginTop: "2rem" }}>
        <Chat />
      </section>

      <section style={{ marginTop: "2rem" }}>
        <TransactionForm onCreated={() => setRefresh(v => v + 1)} />
      </section>

      <section style={{ marginTop: "2rem" }}>
        <TransactionList refresh={refresh} />
      </section>

      <div style={{ marginTop: "2rem" }}>
        <LogoutButton />
      </div>
    </main>
  );
}
