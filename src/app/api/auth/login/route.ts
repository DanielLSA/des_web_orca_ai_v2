import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Dados inválidos" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 401 }
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    return NextResponse.json(
      { error: "Senha incorreta" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    message: "Login realizado com sucesso",
  });

  // 🍪 Cookie de sessão
  response.cookies.set("session", String(user.id), {
    httpOnly: true,
    path: "/",
  });

  return response;
}
