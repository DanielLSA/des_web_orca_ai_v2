"use client";

import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

type Message = {
  text: string;
  sender: "user" | "ai";
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Olá! Sou seu consultor financeiro. Como posso te ajudar hoje?", sender: "ai" },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll automático sempre que mensagens mudarem
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend(message: string) {
    // Adiciona mensagem do usuário
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);

    // Mostra loading e trava input
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { text: data.reply ?? "Não consegui responder agora.", sender: "ai" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Erro ao se comunicar com o servidor.", sender: "ai" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "420px",
        border: "1px solid #1f2937",
        borderRadius: "12px",
        padding: "16px",
        marginTop: "16px",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "12px" }}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} text={msg.text} sender={msg.sender} />
        ))}

        {isLoading && (
          <MessageBubble text="Digitando..." sender="ai" />
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
