import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = cookies().get("session");

    if (!session) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const userId = Number(session.value);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Sessão inválida" },
        { status: 401 }
      );
    }

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("❌ ERRO GET /api/transactions:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar transações" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = cookies().get("session");

    if (!session) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const userId = Number(session.value);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Sessão inválida" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const description = body.description;
    const amount = Number(body.amount);

    if (!description || isNaN(amount)) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        userId,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("❌ ERRO POST /api/transactions:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar transação" },
      { status: 500 }
    );
  }
}
