import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";
import Chat from "./chat/Chat"; 

export default function DashboardPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/login");
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Usuário autenticado.</p>

      <Chat />

      <div style={{ marginTop: "1rem" }}>
        <LogoutButton />
      </div>
    </main>
  );
}
