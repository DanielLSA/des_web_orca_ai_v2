import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = cookies().get("session");
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const { description, amount, type } = body;

    const transaction = await prisma.transaction.update({
      where: { id: Number(params.id) },
      data: {
        description,
        amount: Number(amount),
        type,
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("❌ ERRO PUT /transactions:", error);
    return NextResponse.json(
      { error: "Erro ao editar transação" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = cookies().get("session");
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    await prisma.transaction.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ ERRO DELETE /transactions:", error);
    return NextResponse.json(
      { error: "Erro ao excluir transação" },
      { status: 500 }
    );
  }
}
