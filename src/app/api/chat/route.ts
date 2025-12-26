import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { message } = body;

  if (!message) {
    return NextResponse.json(
      { error: "Mensagem não enviada" },
      { status: 400 }
    );
  }

  // 👉 MOCK da IA (resposta simulada)
  const response = `Entendi sua mensagem: "${message}". Em breve vou analisar sua situação financeira com dados reais.`;

  return NextResponse.json({
    reply: response,
  });
}
