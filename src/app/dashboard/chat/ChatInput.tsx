"use client";

import { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (disabled) return;
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  }

  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
      <input
        type="text"
        placeholder={disabled ? "Aguarde a resposta..." : "Digite sua mensagem..."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
        disabled={disabled}
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          opacity: disabled ? 0.7 : 1,
        }}
      />

      <button
        onClick={handleSend}
        disabled={disabled}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        Enviar
      </button>
    </div>
  );
}
