import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Groq from "groq-sdk";
import { prisma } from "@/lib/prisma";

type TxType = "IN" | "OUT";

type Tx = {
  id: number;
  description: string;
  amount: number;
  type: TxType;
  date: Date;
};

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST() {
  try {
    const session = cookies().get("session");
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const userId = Number(session.value);

    const transactions = (await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      select: {
        id: true,
        description: true,
        amount: true,
        type: true,
        date: true,
      },
    })) as Tx[];

    if (transactions.length === 0) {
      return NextResponse.json({
        response: "Você ainda não possui transações suficientes para análise.",
      });
    }

    const resumo = transactions
      .map((t: Tx) => {
        const tipo = t.type === "IN" ? "Entrada" : "Saída";
        return `${tipo} | ${t.description} | R$ ${t.amount.toFixed(2)}`;
      })
      .join("\n");

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ MODELO CORRETO
      messages: [
        {
          role: "system",
          content:
            "Você é um consultor financeiro pessoal. Analise gastos, identifique padrões e dê dicas práticas.",
        },
        {
          role: "user",
          content: `Minhas transações:\n${resumo}\n\nFaça uma análise financeira objetiva.`,
        },
      ],
      temperature: 0.6,
    });

    const resposta =
      completion.choices?.[0]?.message?.content ??
      "Não foi possível gerar uma resposta.";

    return NextResponse.json({ response: resposta });
  } catch (error) {
    console.error("Erro IA:", error);
    return NextResponse.json(
      { error: "Erro ao consultar a IA" },
      { status: 500 }
    );
  }
}
