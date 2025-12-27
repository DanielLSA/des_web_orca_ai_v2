import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

function getUserIdFromSession() {
  const session = cookies().get("session");
  if (!session) return null;

  const userId = Number(session.value);
  if (Number.isNaN(userId)) return null;

  return userId;
}

export async function GET() {
  try {
    const userId = getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
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
    const userId = getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();

    const description = String(body.description ?? "").trim();
    const amount = Number(body.amount);
    const type = body.type; // "IN" | "OUT"
    const date = body.date ? new Date(body.date) : undefined;

    if (!description || Number.isNaN(amount) || (type !== "IN" && type !== "OUT")) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        type,
        userId,
        ...(date ? { date } : {}),
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

export async function PUT(req: Request) {
  try {
    const userId = getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();

    const id = Number(body.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    // garante que é do usuário
    const existing = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Transação não encontrada" }, { status: 404 });
    }

    const description =
      body.description !== undefined ? String(body.description).trim() : undefined;

    const amount = body.amount !== undefined ? Number(body.amount) : undefined;

    const type = body.type !== undefined ? body.type : undefined;

    const date = body.date !== undefined ? new Date(body.date) : undefined;

    if (description !== undefined && !description) {
      return NextResponse.json({ error: "Descrição inválida" }, { status: 400 });
    }
    if (amount !== undefined && Number.isNaN(amount)) {
      return NextResponse.json({ error: "Valor inválido" }, { status: 400 });
    }
    if (type !== undefined && type !== "IN" && type !== "OUT") {
      return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
    }
    if (date !== undefined && Number.isNaN(date.getTime())) {
      return NextResponse.json({ error: "Data inválida" }, { status: 400 });
    }

    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        ...(description !== undefined ? { description } : {}),
        ...(amount !== undefined ? { amount } : {}),
        ...(type !== undefined ? { type } : {}),
        ...(date !== undefined ? { date } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ ERRO PUT /api/transactions:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar transação" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const id = Number(body.id);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    // garante que é do usuário
    const existing = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Transação não encontrada" }, { status: 404 });
    }

    await prisma.transaction.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ ERRO DELETE /api/transactions:", error);
    return NextResponse.json(
      { error: "Erro interno ao excluir transação" },
      { status: 500 }
    );
  }
}
