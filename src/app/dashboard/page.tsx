import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  const session = cookies().get("session");

  if (!session) {
    redirect("/login");
  }

  return <DashboardClient />;
}

