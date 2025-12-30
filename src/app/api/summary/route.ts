import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = cookies().get("session");

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const userId = Number(session.value);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 });
    }

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      select: { amount: true, type: true },
    });

    const income = transactions
      .filter(t => t.type === "IN")
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === "OUT")
      .reduce((acc, t) => acc + t.amount, 0);

    return NextResponse.json({
      income,
      expense,
      balance: income - expense,
    });
  } catch (error) {
    console.error("❌ ERRO SUMMARY:", error);
    return NextResponse.json(
      { error: "Erro ao gerar resumo financeiro" },
      { status: 500 }
    );
  }
}
