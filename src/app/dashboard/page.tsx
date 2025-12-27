import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";
import TransactionClient from "./transactions/TransactionsClient";
// Se você quiser o chat aqui depois, adiciona novamente: import Chat from "./chat/Chat";

export default function DashboardPage() {
  const session = cookies().get("session");
  if (!session) redirect("/login");

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Usuário autenticado.</p>

      {/* Chat volta depois sem problema */}
      {/* <Chat /> */}

      <TransactionClient />

      <div style={{ marginTop: "1rem" }}>
        <LogoutButton />
      </div>
    </main>
  );
}
