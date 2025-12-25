import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";

export default function DashboardPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Usuário autenticado.</p>
      <LogoutButton />
    </main>
  );
}

